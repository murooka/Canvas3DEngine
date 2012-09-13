import "./vector.jsx";
import "./matrix.jsx";
import "./quaternion.jsx";
import "./list.jsx";
import "./util.jsx";
import "js/web.jsx";
import "timer.jsx";



/***
 * 座標系は左手座標系
 * ポリゴンの座標は、視点から見て反時計回りに指定する
 */



/**
 * 擬似3Dを実現するためのゲームエンジンクラス
 *
 * @property {HTMLCanvasElement} canvas 描画するキャンバスへの参照
 * @property {CanvasRenderingContext2D} context キャンバスのコンテキストへの参照
 * @property {number}  width   キャンバスの横幅
 * @property {number}  height  キャンバスの縦幅
 * @property {Camera}  camera  視点管理用のカメラ
 * @property {Matrix}  screenMatrix スクリーン変換行列
 */
class Engine {

    var _isMobile : boolean;

    var context : CanvasRenderingContext2D;
    var _width : number;
    var _height : number;

    var camera : Camera;
    var screenMatrix : Matrix;

    var onUpdate : function(:number):void;
    var onRender : function(:Context3D, :number):void;
    
    var _skyImageSrc : Nullable.<string>;
    var _skyImage : Nullable.<HTMLImageElement>;

    /**
     * @param canvas_id 利用するcanvas(DOM)のid
     */
    function constructor(canvasId:string) {
        this._isMobile = /iPhone/.test(dom.window.navigator.userAgent);

        var canvas = dom.id(canvasId) as HTMLCanvasElement;
        this.context = canvas.getContext('2d') as CanvasRenderingContext2D;

        this._width  = canvas.width;
        this._height = canvas.height;
        this.setScreenMatrix(this._width, this._height);

        this._skyImageSrc = null;
        this._skyImage = null;


        var viewPosition   = new Vector(0,  0,-90);
        var targetPosition = new Vector(0,  0,  0);
        var upperVector    = new Vector(0,  1,  0);
        var fovyX          = Math.PI / 3;
        var nearZ          = 0;
        var farZ           = 500;
        var aspectRatio    = 1.0 * this._height / this._width;

        this.camera = new Camera(
            viewPosition,
            targetPosition,
            upperVector,
            fovyX,
            nearZ,
            farZ,
            aspectRatio
        );

        this.updateMatrix();
    }

    function isMobile() : boolean { return this._isMobile; }

    static var images = {} : Map.<HTMLImageElement>;
    static var imageDatas = {} : Map.<ImageData>;
    static var isLoadedImage = {} : Map.<boolean>;

    static function loadImages(srcs:string[]) : void {
        var canvas = dom.id('tmp_canvas') as HTMLCanvasElement;
        var context = canvas.getContext('2d') as CanvasRenderingContext2D;

        var setOnload = (src:string):void -> {
            Engine.images[src].onload = (e:Event):void -> {
                var image = Engine.images[src];
                Engine.isLoadedImage[src] = true;
                context.drawImage(image, 0, 0);
                Engine.imageDatas[src] = context.getImageData(0, 0, image.width, image.height);
            };
        };

        for (var i=0; i<srcs.length; i++) {
            var src = srcs[i];

            var image = dom.createElement('img') as HTMLImageElement;
            image.src = src;
            Engine.isLoadedImage[src] = false;
            Engine.images[src] = image;
            setOnload(src);
        }
    }

    function setSkyImage(src:string) : void {
        this._skyImageSrc = src;
        this._skyImage = Engine.images[src];
    }

    function start() : void {
        var fpsManager = new FpsManager('fps');
        fpsManager.start();

        var update = ():void -> {
            fpsManager.update();

            var lap = fpsManager.lastLap();
            this.onUpdate(lap);

            var context = new Context3D(this.camera);

            if (this._skyImage && Engine.isLoadedImage[this._skyImageSrc]) {
                this.context.fillStyle = '#' + context.backgroundColor.toHexString();;
                this.context.fillRect(0, 0, this._width, this._height);
                this.renderSkyImage();
            } else {
                this.context.fillStyle = '#' + context.backgroundColor.toHexString();;
                this.context.fillRect(0, 0, this._width, this._height);
            }

            this.onRender(context, lap);

            context.modelList5.forEach((model) -> { model.draw(this); });
            context.modelList4.forEach((model) -> { model.draw(this); });
            context.modelList3.forEach((model) -> { model.draw(this); });
            context.modelList2.forEach((model) -> { model.draw(this); });
            context.modelList1.forEach((model) -> { model.draw(this); });

            Timer.setTimeout(update, 0);
        };

        Timer.setTimeout(():void -> {
            dom.window.scrollTo(0, 1);
        }, 500);

        Timer.setTimeout(update, 0);
    }

    // upperVectorが(0, 1, 0)の場合にしか対応できないかもしれない
    function renderSkyImage() : void {
        // image上の座標系の値はiを、screen上の座標系の値はsを、prefixとしてつける
        // TODO: 計算式を綺麗にする 一度割合を求めると楽になる

        var lookingVec = this.camera.target.sub(this.camera.view);
        var x = lookingVec.x;
        var y = - lookingVec.y;
        var z = lookingVec.z;

        var horRad = Math.atan2(x, z);
        var verRad = Math.atan2(y, Math.sqrt(x*x+z*z));

        var imgWidth  = this._skyImage.width;
        var imgHeight = this._skyImage.height;

        var iCenterX = ((horRad / Math.PI / 2) + 0.5) * imgWidth;
        var iCenterY = ((verRad / Math.PI) + 0.5) * imgHeight;

        var iWidth  = this.camera.fovyX / Math.PI / 2 * imgWidth;
        var iHeight = iWidth * this.camera.aspectRatio;

        var sx = iCenterX - iWidth/2;
        var sy = iCenterY - iHeight/2;
        if (sx < 0) sx += imgWidth;
        if (sy < 0) sy += imgHeight;
        var sw = iWidth;
        var sh = iHeight;

        var overflowingRight = (sx + sw >= imgWidth);  // 画像の右側がはみ出る
        var overflowingBelow = (sy + sh >= imgHeight); // 画像の下側がはみ出る
        if (overflowingRight && overflowingBelow) {
            var perHor = (imgWidth-sx)  / sw; // 描画する横幅のうち、はみ出ずに描画できる幅の割当費
            var perVer = (imgHeight-sy) / sh; // 描画する縦幅のうち、はみ出ずに描画できる幅の割当費
            this.context.drawImage(this._skyImage, ~~sx, ~~sy,    ~~(imgWidth-sx), ~~(imgHeight-sy),                     0, 0,     ~~(this._width*perHor), ~~(this._height*perVer));
            if (~~(sx+sw-imgWidth) != 0) this.context.drawImage(this._skyImage,    0, ~~sy, ~~(sx+sw-imgWidth), ~~(imgHeight-sy), ~~(this._width*perHor), 0, ~~(this._width*(1-perHor)), ~~(this._height*perVer));
        } else if (overflowingRight) {
            var per = (imgWidth-sx) / sw; // 描画する幅のうち、はみ出ずに描画できる幅の割当費
            if (~~(imgWidth-sx) != 0 && ~~(this._width*per) != 0) {
                this.context.drawImage(this._skyImage, ~~sx, ~~sy,    ~~(imgWidth-sx), ~~sh,                  0, 0,     ~~(this._width*per), this._height);
            }
            if (~~(sx+sw-imgWidth) != 0 && ~~(this._width*(1-per)) != 0) {
                this.context.drawImage(this._skyImage,    0, ~~sy, ~~(sx+sw-imgWidth), ~~sh, ~~(this._width*per), 0, ~~(this._width*(1-per)), this._height);
            }
        } else if (overflowingBelow) {
            var per = (imgHeight-sy) / sh; // 描画する幅のうち、はみ出ずに描画できる幅の割当費
            this.context.drawImage(this._skyImage, ~~sx, ~~sy, ~~sw,    ~~(imgHeight-sy), 0, 0, this._width, ~~(this._height*per));
        } else {
            this.context.drawImage(this._skyImage, ~~sx, ~~sy, ~~sw, ~~sh, 0, 0, this._width, this._height);
        }

    }
    

    function setScreenMatrix(width:number, height:number) : void {
        this.screenMatrix =
            Matrix.translating(width/2, height/2, 0).composeSelf(
                Matrix.scaling(width/2,-height/2, 1));
    }

    function updateMatrix() : void {
        this.camera.updateMatrix();
    }

}



/**
 * 3DのRenderingContextクラス
 */
class Context3D {

    var _worldMatrix : Matrix;
    var _matrixStack : List.<Matrix>;

    var camera : Camera;
    var _depth : int;
    var modelList1 = List.<Renderable>;
    var modelList2 = List.<Renderable>;
    var modelList3 = List.<Renderable>;
    var modelList4 = List.<Renderable>;
    var modelList5 = List.<Renderable>;

    var _polygonList : List.<Polygon>;
    var _groupCenter : Vector;
    var _ignoringZHidden : boolean;

    var backgroundColor : Color;

    function constructor(camera:Camera) {
        this._worldMatrix = new Matrix;
        this._matrixStack = new List.<Matrix>;
        this.camera = camera;
        this._depth = 3;
        this.modelList1 = new List.<Renderable>;
        this.modelList2 = new List.<Renderable>;
        this.modelList3 = new List.<Renderable>;
        this.modelList4 = new List.<Renderable>;
        this.modelList5 = new List.<Renderable>;

        this.backgroundColor = new Color(90, 135, 158);
    }


    function setDepth(depth:int) : void {
        assert 1 <= depth && depth <= 5;
        this._depth = depth;
    }

    function getDepth() : int {
        return this._depth;
    }

    function setBackgroundColor(color:Color) : void {
        this.backgroundColor = color;
    }


    /**
     * ワールド変換行列を操作するための関数群
     */
    function pushMatrix() : void {
        this._matrixStack.prepend(this._worldMatrix.copy());
    }

    function popMatrix() : void {
        this._worldMatrix = this._matrixStack.removeFirst();
    }

    function resetMatrix() : void {
        this._worldMatrix = new Matrix;
    }

    function translate(x:number, y:number, z:number) : void {
        this._worldMatrix.composeSelf(Matrix.translating(x, y, z));
    }

    function scale(x:number, y:number, z:number) : void {
        this._worldMatrix.composeSelf(Matrix.scaling(x, y, z));
    }

    function rotate(q:Quaternion) : void {
        this._worldMatrix.composeSelf(q.toMatrix());
    }


    /**
     * 複数のPolygonをグルーピングするための関数群
     */
    function beginGroup(center:Vector) : void {
        this.beginGroup(center, false);
    }

    function beginGroup(center:Vector, ignoringZHidden:boolean) : void {
        this._polygonList = new List.<Polygon>;
        this._groupCenter = center;
        this._ignoringZHidden = ignoringZHidden;
    }

    function renderPolygonGroup(vertices:Vector[], color:Color) : void {
        var polygon = new Polygon(vertices, color);
        polygon.applyWorldMatrix(this._worldMatrix);
        polygon.applyViewMatrix(this.camera.viewMatrix);
        if (polygon.isHidden(this.camera)) return;

        this._polygonList.prepend(polygon);
    }

    function endGroup() : void {
        if (this._polygonList.length != 0) {
            this.renderModel(new PolygonGroup(this._polygonList, this._groupCenter, this._ignoringZHidden));
        }
    }


    /**
     * 描画モデルを生成するための関数群
     * この関数を呼ぶことで描画されるわけではないが、ライブラリの利用者がそのことを意識せず使えるようにするため、renderXxxという関数名にしている
     */
    function renderPolygon(vertices:Vector[], color:Color) : void {
        this.renderModel(new Polygon(vertices, color));
    }

    function renderBillboard(center:Vector, width:int, height:int, src:string) : void {
        this.renderModel(new Billboard(center, width, height, src));
    }

    function renderTexture(vertices:Vector[], src:string, maxHorDiv:int, maxVerDiv:int, maxDiv:int, minDiv:int) : void {
        this.renderModel(new SmoothTexture(vertices, src, maxHorDiv, maxVerDiv, maxDiv, minDiv));
    }

    function renderTexture(vertices:Vector[], src:string) : void {
        this.renderModel(new SmoothTexture(vertices, src));
    }

    function renderModel(model:Renderable) : void {
        model.applyWorldMatrix(this._worldMatrix);
        model.applyViewMatrix(this.camera.viewMatrix);
        if (model.isHidden(this.camera)) return;

        switch (this._depth) {
            case 1: this.insertModelByZValue(this.modelList1, model); break;
            case 2: this.insertModelByZValue(this.modelList2, model); break;
            case 3: this.insertModelByZValue(this.modelList3, model); break;
            case 4: this.insertModelByZValue(this.modelList4, model); break;
            case 5: this.insertModelByZValue(this.modelList5, model); break;
        }
    }

    function insertModelByZValue(list:List.<Renderable>, model:Renderable) : void {
        var inserted = false;
        for (var n=list.head; n!=null; n=n.next()) {
            if (n.value.vCenter.z < model.vCenter.z) {
                list.insertBefore(n, model);
                inserted = true;
                break;
            }
        }

        if (!inserted) list.append(model);
    }
}



/**
 * ワールド座標系上での物の見方を表すカメラクラス
 *
 * @property viewMatrix       ビュー変換行列
 * @property projectionMatrix 透視変換行列
 * @property matrix           ビュー変換と透視変換行列を合成した変換行列
 */
class Camera {

    var rotatingMatrix : Matrix;
    var viewMatrix : Matrix;
    var projectionMatrix : Matrix;
    var matrix : Matrix;

    var view : Vector;
    var target : Vector;
    var upper : Vector;
    var fovyX : number;
    var nearZ : number;
    var farZ : number;
    var aspectRatio : number;

    /**
     * @param view   視点座標
     * @param target 注視点座標
     * @param upper  上方向ベクトル
     * @param fovyX  横方向の視野角
     * @param nearZ  物が見える範囲のうち、最も近い距離
     * @param farZ   物が見える範囲のうち、最も遠い距離
     * @param apect_ratio カメラ画面のheight/widthの値
     */
    function constructor(view:Vector, target:Vector, upper:Vector, fovyX:number, nearZ:number, farZ:number, aspectRatio:number) {
        this.view   = view;
        this.target = target;
        this.upper  = upper;
        this.fovyX  = fovyX;
        this.nearZ  = nearZ;
        this.farZ   = farZ;
        this.aspectRatio = aspectRatio;

        this.rotatingMatrix = new Matrix();

        this.updateMatrix();
    }

    /**
     * カメラの位置を移動させる
     * @param v 移動させる方向ベクトル
     */
    function move(v:Vector) : void {
        var vector = this.rotatingMatrix.mul(v);
        this.view.addSelf(vector);
        this.target.addSelf(vector);
    }

    /**
     * Y軸を中心にカメラの向きを反時計回りに回転させる
     * @param rad 回転量
     */
    function rotateY(rad:number) : void {
        var lookingVec =  this.target.sub(this.view);
        lookingVec = Matrix.rotatingY(rad).mul(lookingVec);
        this.target = lookingVec.addSelf(this.view);

        this.rotatingMatrix = Matrix.rotatingY(rad).composeSelf(this.rotatingMatrix);
    }

    /**
     * カメラ情報に基づいて変換行列を更新する
     * 変換行列はビュー変換->透視変換を行う
     */
    function updateMatrix() : void {
        var view = this.view;
        var target = this.target;
        var upper  = this.upper;
        var fovyX  = this.fovyX;
        var nearZ  = this.nearZ;
        var farZ   = this.farZ;
        var aspectRatio = this.aspectRatio;

        var viewMatrix = (function () : Matrix {
            var zaxis = target.sub(view).unitSelf();
            var xaxis = upper.cross(zaxis).unitSelf();
            var yaxis = zaxis.cross(xaxis).unitSelf();

            return new Matrix([
                xaxis.x, xaxis.y, xaxis.z, -xaxis.dot(view),
                yaxis.x, yaxis.y, yaxis.z, -yaxis.dot(view),
                zaxis.x, zaxis.y, zaxis.z, -zaxis.dot(view),
                      0,       0,       0,                1
            ]);
        })();

        var projectionMatrix = (function () : Matrix {
            var sx = 1 / Math.tan(fovyX/2);
            var sy = sx / aspectRatio;
            var sz = farZ / (farZ-nearZ);
            var mz = -sz*nearZ;

            return new Matrix([
                sx,  0,  0,  0,
                 0, sy,  0,  0,
                 0,  0, sz, mz,
                 0,  0,  1,  0
            ]);
        })();

        this.viewMatrix = viewMatrix;
        this.projectionMatrix = projectionMatrix;
        this.matrix = projectionMatrix.compose(viewMatrix);
    }

}



/**
 * @class RGB表現の色クラス
 */
class Color {
    
    var r : int;
    var g : int;
    var b : int;
    
    /**
     * @constructor
     * @param r rgbのr要素
     * @param g rgbのg要素
     * @param b rgbのb要素
     */
    function constructor(r:int, g:int, b:int) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    function _to2DigitHex(value:int) : string {
        var str = Math.floor(value).toString(16);
        if (str.length==1) str = '0' + str;
        return str;
    }

    function toHexString() : string {
        return this._to2DigitHex(this.r) + this._to2DigitHex(this.g) + this._to2DigitHex(this.b);
    }

    override function toString() : string {
        return '#' + this._to2DigitHex(this.r) + this._to2DigitHex(this.g) + this._to2DigitHex(this.b);
    }

}



/**
 * Engine上で描画する3Dオブジェクトの抽象クラス
 * このクラスを継承するクラスは、draw関数、applyViewMatrix関数、isHidden関数、centerプロパティ、vCenterプロパティ、depthプロパティを実装する必要がある
 * @property center  Zソートを行うためのモデルの中心座標
 * @property vCenter view変換を行ったあとのcenter
 * @property depth   centerとは無関係に描画順序を決定するための値
 *                            小さいほど手前に表示され、大きいほど奥に表示される
 *                            デフォルトで値は3とする
 */
abstract class Renderable {

    var center : Vector;
    var vCenter : Vector;

    /**
     * 引数に渡されたworldMatrixを用いて、モデリングオブジェクトをワールド座標系に移動させる
     * この関数を実装する場合は、verticesやcenterの値を直接書き換える
     * @param worldMatrix ワールド変換行列
     */
    abstract function applyWorldMatrix(worldMatrix:Matrix) : void;

    /**
     * 引数に渡されたviewMatrixを用いて、ビュー座標系でのcenter(vCenter)を更新する
     * @param viewMatrix ビュー変換行列
     */
    abstract function applyViewMatrix(viewMatrix:Matrix) : void;

    /**
     * 透視変換後の座標を用いて、Zvalueが見える範囲にあるか(nearZ以上farZ以下か)を確認する
     * @param camera Zvalueの範囲情報を持つCamera
     */
    abstract function isHidden(camera:Camera) : boolean;

    /**
     * 渡されたcanvasにモデルを描画する
     * 描画を行った場合はtrueを、行う必要がなかった場合はfalseを返す
     */
    abstract function draw(engine:Engine) : boolean;

    /**
     * スクリーン座標系の頂点がcanvas内に描画する必要があるかどうかを確認する
     * 描画する必要がないならばtrueを返す
     * TODO: 下側の判定を緩くする or 全体的に少し緩くする
     */
    static function isHiddenXY(vertices:Vector[], engine:Engine) : boolean {
        var margin = 100;
        for (var i=0; i<vertices.length; i++) {
            var v = vertices[i];
            if (-margin < v.x && v.x < engine._width  + margin &&
                      0 < v.y && v.y < engine._height + margin   ) return false;
        }
        return true;
    }

}



/**
 * Engineで利用する多角形クラス
 * @property enabledLighting 環境光、拡散光の有効無効を切り替えるフラグ
 */
class Polygon extends Renderable {

    var vertices : Vector[];
    var vVertices : Vector[];
    var _color : Color;
    var _enabledLighting : boolean;

    /**
     * 1つの面に対して1つの色情報を持つ
     * NOTICE: 引数のverticesは同一平面上に無いと歪む可能性がある
     * NOTICE: verticesは反時計回りに指定する
     * @param vertices 多角形の頂点座標の配列
     * @param color    多角形の色
     */
    function constructor(vertices:Vector[], color:Color) {
        this.vertices = vertices;
        this._color = color;
        this._enabledLighting = true;
        this.updateCenter();
    }

    override function applyWorldMatrix(worldMatrix:Matrix) : void {
        for (var i=0; i<this.vertices.length; i++) {
            this.vertices[i] = worldMatrix.mul(this.vertices[i]);
        }
        this.updateCenter();
    }

    override function applyViewMatrix(viewMatrix:Matrix) : void {
        var vVertices = [] : Vector[];
        var vSumPos = new Vector(0, 0, 0);
        for (var i=0; i<this.vertices.length; i++) {
            var vVertex = viewMatrix.mul(this.vertices[i]);
            vVertices.push(vVertex);
            vSumPos.addSelf(vVertex);
        }
        this.vCenter = vSumPos.div(this.vertices.length);
        this.vVertices = vVertices;
    }

    override function isHidden(camera:Camera) : boolean {
        if (camera.nearZ < this.vCenter.z && this.vCenter.z < camera.farZ) return false;
        return true;
    }

    function move(v:Vector) : void {
        for (var i=0; i<this.vertices.length; i++) {
            this.vertices[i].addSelf(v);
        }
        this.updateCenter();
    }

    function updateCenter() : void {
        var sumVector = new Vector(0,0,0);
        for (var i=0; i<this.vertices.length; i++) {
            sumVector.addSelf(this.vertices[i]);
        }
        this.center = sumVector.div(this.vertices.length);
    }

    override function toString() : string {
        var str = '[';
        for (var i=0; i<this.vertices.length; i++) str += this.vertices[i].toString() + ',';
        str += ']';
        return str;
    }

    override function draw(engine:Engine) : boolean {
        var context = engine.context;
        var len = this.vertices.length;
        var verts = this.vVertices;


        // 透視変換の前に光の計算をしておく
        var color = this._color;
        if (this._enabledLighting) {
            color = (():Color -> {
                var center = this.vCenter;

                // calc normal vector
                var v1 = verts[0].sub(center);
                var v2 = verts[1].sub(center);
                var norm = v2.cross(v1).unit();

                var lightPower = norm.dot(center.unit());
                var diffusePower = 0.7;
                var diffuseCoefficient = 0.8;
                var ambientPower = 0.5;

                var r = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * color.r);
                var g = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * color.g);
                var b = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * color.b);

                return new Color(r, g, b);
            })();
        }


        // 透視変換
        for (var i=0; i<len; i++) {
            verts[i] = engine.camera.projectionMatrix.mul(verts[i]);
        }

        // スクリーン変換
        for (var i=0; i<len; i++) {
            verts[i] = engine.screenMatrix.mul(verts[i]);
        }

        // canvasの外側に位置する場合は表示しない

        var isHiddenXY = Renderable.isHiddenXY(verts, engine);
        if (isHiddenXY) return false;

        // 裏側から見たポリゴンは表示しない
        for (var i=0; i<verts.length; i++) {
            var i1 = (i+1) % verts.length;
            var i2 = (i+2) % verts.length;
            if (Math2D.cross(verts[i1].x-verts[i].x,
                        verts[i1].y-verts[i].y,
                        verts[i2].x-verts[i].x,
                        verts[i2].y-verts[i].y) < 0) {
                return false;
            }
        }



        var colorStr = '#' + color.toHexString();

        context.strokeStyle = colorStr;
        for (var i=0; i<len; i++) {
            context.beginPath();
            context.moveTo(verts[i].x, verts[i].y);
            context.lineTo(verts[(i+1)%len].x, verts[(i+1)%len].y);
            context.stroke();
        }

        context.fillStyle = colorStr;
        context.beginPath();
        for (var i=0; i<len; i++) {
            var x = verts[i].x;
            var y = verts[i].y;
            context.lineTo(x, y);
        }
        context.closePath();
        context.fill();

        return true;
    }

}



/**
 * 複数のPolygonを内包するオブジェクトモデルクラス
 * このクラスは、Z-sortを行う必要の無い、1つのまとまりとして扱うことのできるPolygonの集合のクラスである
 * 例えば立方体や球などでは、裏側のPolygonは隠面消去するため、Z-sortを行わなくても自然に描画できる
 * そのような3Dオブジェクトの場合、このクラスを利用することにより高速化ができる
 * 大きな3Dオブジェクトの場合、適切なcenter座標を指定できず、一部のPolygonを表示したい場合でもisHidden関数により描画されない場合がある
 * その場合は、ignoringZHiddenをtrueにすることで全てのPolygonの描画を試みるが、前後関係が正しく表示されない可能性がある
 * TODO: クラス名を変更する
 */
class PolygonGroup extends Renderable {

    var polygons : List.<Polygon>;
    var _ignoringZHidden : boolean;

    /*
     * @param  polygons Polygonの配列
     * @param  center   world座標系での原点からの相対ベクトル
     */
    function constructor(polygons:List.<Polygon>, center:Vector) {
        this(polygons, center, false);
    }

    function constructor(polygons:List.<Polygon>, center:Vector, ignoringZHidden:boolean) {
        this.polygons = polygons;
        this.center = center;
        this._ignoringZHidden = ignoringZHidden;
    }

    override function applyWorldMatrix(worldMatrix:Matrix) : void {
        this.center = worldMatrix.mul(this.center);
    }

    override function applyViewMatrix(viewMatrix:Matrix) : void {
        this.vCenter = viewMatrix.mul(this.center);
    }

    override function isHidden(camera:Camera) : boolean {
        if (this._ignoringZHidden) return false;
        if (camera.nearZ < this.vCenter.z && this.vCenter.z < camera.farZ) return false;
        return true;
    }

    override function draw(engine:Engine) : boolean {
        var polygons = this.polygons;

        polygons.forEach((polygon) -> {
            if (polygon.isHidden(engine.camera)) return;
            polygon.draw(engine);
        });

        return true;
    }
}



/**
 * アフィン変換を用いて高速にテクスチャを描画するクラス
 * 裏柄からみた場合は、反転して表示する
 * TODO: 継承関係を直す
 */
class SmoothTexture extends Polygon {

    var _src : string;
    var _image : HTMLImageElement;
    var _width : number;
    var _height : number;

    var _maxHorizontalDiv : int;
    var _maxVerticalDiv : int;
    var _maxDiv : int;
    var _minDiv : int;


    function constructor(vertices:Vector[], src:string) {
        this(vertices, src, 6, 6, 4, 2);
    }

    /**
     * verticesは画像の左下に対応する点から、反時計回りで指定する
     * @param vertices  ポリゴンの頂点座標の配列
     * @param src       テクスチャに使う画像ファイル名
     * @param maxHorDiv 描画時に水平分割を行う最大数
     * @param maxVerDiv 描画時に垂直分割を行う最大数
     * @param maxDiv    描画時に4分割を行う最大数
     * @param minDiv    描画時に必ず4分割を行う回数
     */
    function constructor(vertices:Vector[], src:string, maxHorDiv:int, maxVerDiv:int, maxDiv:int, minDiv:int) {
        super(vertices, new Color(0, 0, 0));

        this._src = src;
        this._image = Engine.images[src];
        this.vertices = vertices;

        this._width  = Math.abs(vertices[1].sub(vertices[0]).abs());
        this._height = Math.abs(vertices[2].sub(vertices[1]).abs());

        this._maxHorizontalDiv = maxHorDiv;
        this._maxVerticalDiv   = maxVerDiv;
        this._maxDiv           = maxDiv;
        this._minDiv           = minDiv;

        this.updateCenter();
    }

    override function applyWorldMatrix(worldMatrix:Matrix) : void {
        for (var i=0; i<this.vertices.length; i++) {
            this.vertices[i] = worldMatrix.mul(this.vertices[i]);
        }
        this.center = worldMatrix.mul(this.center);
    }

    override function applyViewMatrix(viewMatrix:Matrix) : void {
        var vVertices = [] : Vector[];
        for (var i=0; i<this.vertices.length; i++) {
            vVertices.push(viewMatrix.mul(this.vertices[i]));
        }
        this.vVertices = vVertices;
        this.vCenter = viewMatrix.mul(this.center);
    }

    override function isHidden(camera:Camera) : boolean {
        if (camera.nearZ < this.vCenter.z && this.vCenter.z < camera.farZ) return false;
        return true;
    }

    override function draw(engine:Engine) : boolean {
        if (!Engine.isLoadedImage[this._src]) return false;

        var context = engine.context;

        // world + left or right + top or bottom
        var wltImage = this.vertices[3];
        var wlbImage = this.vertices[0];
        var wrbImage = this.vertices[1];
        var wrtImage = this.vertices[2];

        // ビュー・透視・スクリーン変換行列
        var matrix =
            engine.screenMatrix.compose(
                engine.camera.projectionMatrix.compose(
                    engine.camera.viewMatrix));

        // screen + left or right + top or bottom
        var sltImage = matrix.mul(wltImage);
        var slbImage = matrix.mul(wlbImage);
        var srbImage = matrix.mul(wrbImage);
        var srtImage = matrix.mul(wrtImage);

        var isHiddenXY = Renderable.isHiddenXY([sltImage, slbImage, srbImage, srtImage], engine);
        if (isHiddenXY) return false;

        /**
         * 画像をアフィン変換のみを用いて台形へ変換し描画する
         * 変換後の台形が極端に歪んでいる場合は分割を行い、この関数を再帰的に読んで描画する
         * @param image           描画する画像
         * @param wlt wlb wrb wrt ワールド座標系上の、画像の左上、左下、右下、右上の座標
         * @param slt slb srb srt 変換後のスクリーン座標系上の、画像の左上、左下、右下、右上の座標
         * @param depth           この関数の再帰呼び出しの回数、最初の呼び出しでは1を指定
         * @param sx              画像を描画する部分のx軸方向のオフセット
         * @param sy              画像を描画する部分のy軸方向のオフセット
         * @param sw              画像を描画する部分の横幅
         * @param sh              画像を描画する部分の縦幅
         */
        var divideAndDrawImage = (
            image:HTMLImageElement,
            wlt:Vector,
            wlb:Vector,
            wrb:Vector,
            wrt:Vector,
            slt:Vector,
            slb:Vector,
            srb:Vector,
            srt:Vector,
            depth:int,
            sx:number,
            sy:number,
            sw:number,
            sh:number
        ) : void -> {
            // ベクトルや距離には、prefixにwかsを付けworld座標系かscreen座標系かを区別する
            // 座標の位置は、(world or screen) + (left or right or center) + (top or bottom or center)を組み合わせて表現する
            // 例: world-left-top -> wlp

            var hypotenuse = (a:number, b:number):number -> {
                return Math.sqrt(a*a+b*b);
            };

            var sBottomWidth = hypotenuse(srb.x-slb.x, srb.y-slb.y);
            var sTopWidth    = hypotenuse(srt.x-slt.x, srt.y-slt.y);
            var sLeftHeight  = hypotenuse(slt.x-slb.x, slt.y-slb.y);
            var sRightHeight = hypotenuse(srt.x-srb.x, srt.y-srb.y);

            var widthRatio  = sBottomWidth / sTopWidth;
            var heightRatio = sRightHeight / sLeftHeight;

            if (widthRatio  < 1) widthRatio  = 1 / widthRatio;
            if (heightRatio < 1) heightRatio = 1 / heightRatio;

            var splittingHorizontal = widthRatio > 1.01;
            var splittingVertical   = heightRatio > 1.01;

            if (depth <= this._minDiv || (depth <= this._maxDiv && splittingHorizontal && splittingVertical)) {
                var wct = wlt.add(wrt).divSelf(2);
                var wcb = wlb.add(wrb).divSelf(2);
                var wlc = wlt.add(wlb).divSelf(2);
                var wrc = wrt.add(wrb).divSelf(2);
                var wcc = wlt.add(wrb).divSelf(2);

                var sct = matrix.mul(wct);
                var scb = matrix.mul(wcb);
                var slc = matrix.mul(wlc);
                var src = matrix.mul(wrc);
                var scc = matrix.mul(wcc);

                divideAndDrawImage(image, wlt, wlc, wcc, wct, slt, slc, scc, sct, depth+1,      sx, sy     , sw/2, sh/2); // 左上部分
                divideAndDrawImage(image, wlc, wlb, wcb, wcc, slc, slb, scb, scc, depth+1,      sx, sy+sh/2, sw/2, sh/2); // 左下部分
                divideAndDrawImage(image, wct, wcc, wrc, wrt, sct, scc, src, srt, depth+1, sx+sw/2, sy     , sw/2, sh/2); // 右上部分
                divideAndDrawImage(image, wcc, wcb, wrb, wrc, scc, scb, srb, src, depth+1, sx+sw/2, sy+sh/2, sw/2, sh/2); // 右下部分
            } else if (depth <= this._maxVerticalDiv && splittingVertical) {
                var wct = wlt.add(wrt).divSelf(2);
                var wcb = wlb.add(wrb).divSelf(2);

                var sct = matrix.mul(wct);
                var scb = matrix.mul(wcb);

                divideAndDrawImage(image, wlt, wlb, wcb, wct, slt, slb, scb, sct, depth+1,      sx, sy, sw/2, sh); // 左側部分
                divideAndDrawImage(image, wct, wcb, wrb, wrt, sct, scb, srb, srt, depth+1, sx+sw/2, sy, sw/2, sh); // 右側部分
            } else if (depth <= this._maxHorizontalDiv && splittingHorizontal) {
                var wlc = wlt.add(wlb).divSelf(2);
                var wrc = wrt.add(wrb).divSelf(2);

                var slc = matrix.mul(wlc);
                var src = matrix.mul(wrc);

                divideAndDrawImage(image, wlt, wlc, wrc, wrt, slt, slc, src, srt, depth+1, sx,      sy, sw, sh/2); // 上側部分
                divideAndDrawImage(image, wlc, wlb, wrb, wrc, slc, slb, srb, src, depth+1, sx, sy+sh/2, sw, sh/2); // 下側部分
            } else {

                var scaleX   = (srt.x - slt.x) / sw;
                var scaleY   = (slb.y - slt.y) / sh;
                var skewingX = (srt.y-slt.y) / (srt.x-slt.x);
                var skewingY = (slb.x-slt.x) / (slb.y-slt.y);

                context.transform(1, 0, 0, 1, slt.x, slt.y);
                context.transform(1, skewingX, skewingY, 1, 0, 0);
                context.transform(scaleX, 0, 0, scaleY, 0, 0);
                context.drawImage(image, ~~(sx), ~~(sy), ~~(sw), ~~(sh), 0, 0, ~~(sw), ~~(sh));

                context.setTransform(1, 0, 0, 1, 0, 0);
            }
        };

        divideAndDrawImage(this._image, wltImage, wlbImage, wrbImage, wrtImage, sltImage, slbImage, srbImage, srtImage, 1, 0, 0, this._image.width, this._image.height);

        return true;
    }

}



/**
 * billboard(どの方向から見ても同じ画像を表示するオブジェクト)を表すクラス
 */
class Billboard extends Renderable {

    var _width : number;
    var _height : number;
    var _src : string;
    var _image : HTMLImageElement;

    /**
     * @param center world座標系でのBillboardの中心座標
     * @param width  world座標系でのBillboardの横幅
     * @param height world座標系でのBillboardの縦幅
     * @param src    Billboardで使う画像のファイル名
     */
    function constructor(center:Vector, width:number, height:number, src:string) {
        this._width = width;
        this._height = height;
        this._src = src;
        this._image = Engine.images[src];

        this.center = center;
    }
    override function applyWorldMatrix(worldMatrix:Matrix) : void {
        this.center = worldMatrix.mul(this.center);
    }

    override function applyViewMatrix(viewMatrix:Matrix) : void {
        this.vCenter = viewMatrix.mul(this.center);
    }

    override function isHidden(camera:Camera) : boolean {
        if (camera.nearZ < this.vCenter.z && this.vCenter.z < camera.farZ) return false;
        return true;
    }

    override function draw(engine:Engine) : boolean {
        if (!Engine.isLoadedImage[this._src]) return false;


        var context = engine.context;

        var projectionAndScreenMatrix = engine.screenMatrix.compose(engine.camera.projectionMatrix);

        // TODO: 座標系のチェック
        var vLeftBottom = this.vCenter.sub(new Vector(this._width/2, this._height/2, 0));

        var sCenter = projectionAndScreenMatrix.mul(this.vCenter);
        var sLeftBottom = projectionAndScreenMatrix.mul(vLeftBottom);
        var sHalfWidth  = sLeftBottom.x - sCenter.x;
        var sHalfHeight = sLeftBottom.y - sCenter.y;

        var isHiddenXY = Renderable.isHiddenXY([sCenter], engine);
        if (isHiddenXY) return false;

        var scaleX = sHalfWidth  / this._image.width  * 2;
        var scaleY = sHalfHeight / this._image.height * 2;

        context.setTransform(scaleX, 0, 0, scaleY, 0, 0);

        // TODO: 描画位置を決めなくても、アフィン変換でなんとかなるかも
        context.drawImage(this._image, ~~((sCenter.x-sHalfWidth)/scaleX), ~~((sCenter.y-sHalfHeight)/scaleY));

        context.setTransform(1, 0, 0, 1, 0, 0);

        return true;
    }

}
