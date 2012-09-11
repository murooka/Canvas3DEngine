import "./vector.jsx";
import "./matrix.jsx";
import "./quaternion.jsx";
import "./list.jsx";
import "js/web.jsx";
import "timer.jsx";



/**
 * 座標系は左手座標系
 * ポリゴンの座標は、視点から見て反時計回りに指定する
 */



/**
 * @class 二次元平面での汎用関数をまとめたクラス
 */
class Math2D {

    /**
     * ベクトルの外積
     */
    static function cross(x1:number, y1:number, x2:number, y2:number) : number {
        return x1*y2 - x2*y1;
    }

}



// クラス名をTimerにしたかった・・・
/**
 * @class 時間計測を行うタイマークラス
 */
class Stopwatch {

    var elapsedMsec : number;
    var startedMsec : Nullable.<number>;
    var lastLapMsec : Nullable.<number>;

    function constructor() {
        this.elapsedMsec = 0;
        this.startedMsec = null;
    }

    function currentMsec() : number {
        return Date.now();
    }

    function start() : void {
        assert this.startedMsec == null;

        this.startedMsec = this.lastLapMsec = this.currentMsec();
    }

    function stop() : void {
        assert this.startedMsec != null;

        this.elapsedMsec += this.currentMsec() - this.startedMsec;
        this.startedMsec = null;
        this.lastLapMsec = null;
    }

    function isStarted() : boolean {
        return this.startedMsec != null;
    }

    function isStopped() : boolean {
        return this.startedMsec == null;
    }

    /**
     * 前回lap関数を呼んだ時間(またはスタートさせた時間)からの経過時間をミリ秒で返す
     * @returns {number} 経過時間
     */
    function lap() : number {
        assert this.lastLapMsec != null;

        var currentMsec = this.currentMsec();
        var lapMsec = currentMsec - this.lastLapMsec;
        this.lastLapMsec = currentMsec;

        return lapMsec;
    }

    function getElapsedMsec() : number {
        return this.elapsedMsec;
    }

}


/**
 * @class ゲームでの１秒辺りのフレームの更新回数を計測するクラス
 */
class FpsManager {

    var stopwatch : Stopwatch;
    var recentlyMsecLog : number[];
    var lastMsec : number;
    var fpsElement : Nullable.<HTMLElement>;
    var enabledHtmlLog : boolean;
    var enabledConsoleLog : boolean;

    function constructor() {
        this.fpsElement = null;
        this.stopwatch = new Stopwatch;
        this.recentlyMsecLog = [] : number[];
        this.lastMsec = 0;

        this.enabledHtmlLog = false;
        this.enabledConsoleLog = true;
    }

    function constructor(spanId:string) {
        this.fpsElement = dom.id(spanId);
        this.stopwatch = new Stopwatch;
        this.recentlyMsecLog = [] : number[];
        this.lastMsec = 0;

        this.enabledHtmlLog = true;
        this.enabledConsoleLog = false;
    }

    function start() : void {
        this.stopwatch.start();
    }

    function lastLap() : number {
        return this.lastMsec;
    }

    /**
     * フレームを更新したタイミングで呼ぶことで、fpsを計算しdom要素またはconsoleに表示する
     */
    function update() : void {
        assert !this.stopwatch.isStopped();

        var lap = this.stopwatch.lap();
        this.lastMsec = lap;
        if (this.recentlyMsecLog.length < 1) {
            this.recentlyMsecLog.push(lap);
        } else {
            this.recentlyMsecLog.push(lap);
            this.recentlyMsecLog.shift();
        }

        var length = this.recentlyMsecLog.length;

        var totalMsec = 0;
        for (var i=0; i<length; i++) {
            totalMsec += this.recentlyMsecLog[i];
        }
        var fps = length / (totalMsec / 1000);

        if (this.fpsElement!=null && this.enabledHtmlLog) {
            this.fpsElement.innerHTML = fps.toFixed(1) + "fps";
        } else if (this.enabledConsoleLog) {
            log fps.toFixed(1) + "fps";
        }
    }

}



/**
 * @class 擬似3Dを実現するためのゲームエンジンクラス
 *
 * @property {HTMLCanvasElement} canvas 描画するキャンバスへの参照
 * @property {CanvasRenderingContext2D} ctx キャンバスのコンテキストへの参照
 * @property {number}  width   キャンバスの横幅
 * @property {number}  height  キャンバスの縦幅
 * @property {Model[]} objects 描画する3Dオブジェクトモデルの配列
 * @property {Camera}  camera  視点管理用のカメラ
 * @property {Matrix}  screenMatrix スクリーン変換行列
 * @property {Matrix}  transformationMatrix ワールド変換、透視変換、スクリーン変換行列を合成した変換行列
 */
class Engine {

    var isMobile : boolean;

    var canvas : HTMLCanvasElement;
    var ctx : CanvasRenderingContext2D;
    var width : number;
    var height : number;

    var camera : Camera;
    var screenMatrix : Matrix;
    var transformationMatrix : Matrix;

    var objects : AbstractModel[];

    var onUpdate : function(:number):void;
    var onRender : function(:Context3D, :number):void;

    /**
     * @constructor
     * @param {String} canvas_id 利用するcanvas(DOM)のid
     */
    function constructor(canvasId:string) {
        this.isMobile = /iPhone/.test(dom.window.navigator.userAgent);

        this.canvas = dom.id(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.setScreenMatrix(this.width, this.height);

        this.objects = [] : AbstractModel[];


        var viewPosition   = new Vector(0,  0,-90);
        var targetPosition = new Vector(0,  0,  0);
        var upperVector    = new Vector(0,  1,  0);
        var fovyX          = Math.PI / 3;
        var nearZ          = 0;
        var farZ           = 500;
        var aspectRatio    = 1.0 * this.height / this.width;

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

    static var images = {} : Map.<HTMLImageElement>;
    static var imageDatas = {} : Map.<ImageData>;
    static var isLoadedImage = {} : Map.<boolean>;

    static function loadImages(srcs:string[]) : void {
        var canvas = dom.id('tmp_canvas') as HTMLCanvasElement;
        var ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        var setOnload = (src:string):void -> {
            Engine.images[src].onload = (e:Event):void -> {
                var image = Engine.images[src];
                Engine.isLoadedImage[src] = true;
                ctx.drawImage(image, 0, 0);
                Engine.imageDatas[src] = ctx.getImageData(0, 0, image.width, image.height);
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

    function addModel(o : AbstractModel) : void {
        this.objects.push(o);
    }

    function start() : void {
        var fpsManager = new FpsManager('fps');
        fpsManager.start();

        var self = this;
        var update = ():void -> {
            fpsManager.update();

            var lap = fpsManager.lastLap();
            self.onUpdate(lap);

            this.ctx.fillStyle = 'rgb(255, 255, 255)';
            this.ctx.fillRect(0, 0, this.width, this.height);

            var context = new Context3D(self.camera);
            self.onRender(context, lap);

            for (var n=context.modelList5.head; n!=null; n=n.next()) n.value.draw(self);
            for (var n=context.modelList4.head; n!=null; n=n.next()) n.value.draw(self);
            for (var n=context.modelList3.head; n!=null; n=n.next()) n.value.draw(self);
            for (var n=context.modelList2.head; n!=null; n=n.next()) n.value.draw(self);
            for (var n=context.modelList1.head; n!=null; n=n.next()) n.value.draw(self);

            Timer.setTimeout(update, 0);
        };

        Timer.setTimeout(():void -> {
            dom.window.scrollTo(0, 1);
        }, 500);

        Timer.setTimeout(update, 0);
    }

    function setScreenMatrix(width:number, height:number) : void {
        this.screenMatrix =
            Matrix.translating(width/2, height/2, 0).composeSelf(
                Matrix.scaling(width/2,-height/2, 1));
    }

    function updateMatrix() : void {
        this.camera.updateMatrix();
        this.transformationMatrix = this.screenMatrix.compose(this.camera.matrix);
    }

}



/**
 * @class 3DのRenderingContextクラス
 */
class Context3D {

    var worldMatrix : Matrix;
    var matrixStack : List.<Matrix>;
    var camera : Camera;
    var depth : int;
    var modelList1 = List.<AbstractModel>;
    var modelList2 = List.<AbstractModel>;
    var modelList3 = List.<AbstractModel>;
    var modelList4 = List.<AbstractModel>;
    var modelList5 = List.<AbstractModel>;

    function constructor(camera:Camera) {
        this.worldMatrix = new Matrix;
        this.matrixStack = new List.<Matrix>;
        this.camera = camera;
        this.depth = 3;
        this.modelList1 = new List.<AbstractModel>;
        this.modelList2 = new List.<AbstractModel>;
        this.modelList3 = new List.<AbstractModel>;
        this.modelList4 = new List.<AbstractModel>;
        this.modelList5 = new List.<AbstractModel>;
    }

    function pushMatrix() : void {
        this.matrixStack.prepend(this.worldMatrix.copy());
    }

    function popMatrix() : void {
        this.worldMatrix = this.matrixStack.removeFirst();
    }

    function resetMatrix() : void {
        this.worldMatrix = new Matrix;
    }

    function translate(x:number, y:number, z:number) : void {
        this.worldMatrix.composeSelf(Matrix.translating(x, y, z));
    }

    function scale(x:number, y:number, z:number) : void {
        this.worldMatrix.composeSelf(Matrix.scaling(x, y, z));
    }

    function rotate(q:Quaternion) : void {
        this.worldMatrix.composeSelf(q.toMatrix());
    }

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

    function renderModel(model:AbstractModel) : void {
        if (this.worldMatrix != null) model.applyWorldMatrix(this.worldMatrix);
        model.applyViewMatrix(this.camera.viewMatrix);
        if (model.isHidden(this.camera)) return;

        switch (this.depth) {
            case 1: this.insertModelByZValue(this.modelList1, model); break;
            case 2: this.insertModelByZValue(this.modelList2, model); break;
            case 3: this.insertModelByZValue(this.modelList3, model); break;
            case 4: this.insertModelByZValue(this.modelList4, model); break;
            case 5: this.insertModelByZValue(this.modelList5, model); break;
        }
    }

    function insertModelByZValue(list:List.<AbstractModel>, model:AbstractModel) : void {
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
 * @class ワールド座標系上での物の見方を表すカメラクラス
 *
 * @property {Matrix} viewMatrix       ビュー変換行列
 * @property {Matrix} projectionMatrix 透視変換行列
 * @property {Matrix} matrix           ビュー変換と透視変換行列を合成した変換行列
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
     * @constructor
     * @param {Vector} view   視点座標
     * @param {Vector} target 注視点座標
     * @param {Vecotr} upper  上方向ベクトル
     * @param {number} fovyX  横方向の視野角
     * @param {number} nearZ  物が見える範囲のうち、最も近い距離
     * @param {number} farZ   物が見える範囲のうち、最も遠い距離
     * @param {number} apect_ratio カメラ画面のheight/widthの値
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
     * @param {Vector} v 移動させる方向ベクトル
     */
    function move(v:Vector) : void {
        var vector = this.rotatingMatrix.mul(v);
        this.view.addSelf(vector);
        this.target.addSelf(vector);
    }

    /**
     * Y軸を中心にカメラの向きを反時計回りに回転させる
     * @param {number} rad 回転量
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
     * @param {number} r rgbのr要素
     * @param {number} g rgbのg要素
     * @param {number} b rgbのb要素
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

    /**
     * r, g, bをg, b, rにする
     * ポリゴンの裏面の色を得るためのテスト的な関数
     */
    function negative() : Color {
        return new Color(this.g, this.b, this.r);
    }
}



/**
 * @class Engine上で表示するモデルの抽象クラス
 * @description このクラスを継承するクラスは、draw関数、applyViewMatrix関数、isHidden関数、centerプロパティ、vCenterプロパティ、depthプロパティを実装する必要がある
 * @property {Vector} center  Zソートを行うためのモデルの中心座標
 * @property {Vector} vCenter view変換を行ったあとのcenter
 * @property {number} depth   centerとは無関係に描画順序を決定するための値
 *                            小さいほど手前に表示され、大きいほど奥に表示される
 *                            デフォルトで値は3とする
 */
abstract class AbstractModel {

    var center : Vector;
    var vCenter : Vector;
    var depth : int = 3;

    /**
     * @description 引数に渡されたworldMatrixを用いて、モデリングオブジェクトをワールド座標系に移動させる
     *              この関数を実装する場合は、verticesやcenterの値を直接書き換える
     * @param {Matrix} worldMatrix ワールド変換行列
     */
    abstract function applyWorldMatrix(worldMatrix:Matrix) : void;

    /**
     * @description 引数に渡されたviewMatrixを用いて、ビュー座標系でのcenter(vCenter)を更新する
     * @param {Matrix} viewMatrix ビュー変換行列
     */
    abstract function applyViewMatrix(viewMatrix:Matrix) : void;

    /**
     * @description 透視変換後の座標を用いて、Zvalueが見える範囲にあるか(nearZ以上farZ以下か)を確認する
     * @param {Camera} camera Zvalueの範囲情報を持つCamera
     */
    abstract function isHidden(camera:Camera) : boolean;

    /**
     * @description 渡されたcanvasにモデルを描画する
     *              描画を行った場合はtrueを、行う必要がなかった場合はfalseを返す
     */
    abstract function draw(engine:Engine) : boolean;

    /**
     * @description スクリーン座標系の頂点がcanvas内に描画する必要があるかどうかを確認する
     *              描画する必要がないならばtrueを返す
     * TODO: 下側の判定を緩くする or 全体的に少し緩くする
     */
    static function isHiddenXY(vertices:Vector[], engine:Engine) : boolean {
        for (var i=0; i<vertices.length; i++) {
            var v = vertices[i];
            if (0 < v.x && v.x < engine.width &&
                0 < v.y && v.y < engine.height  ) return false;
        }
        return true;
    }

}



/**
 * @class Engineで利用する多角形クラス
 * @property {boolean} enabledLighting 環境光、拡散光の有効無効を切り替えるフラグ
 */
class Polygon extends AbstractModel {

    var vertices : Vector[];
    var vVertices : Vector[];
    var color : Color;
    var enabledLighting : boolean;

    /**
     * 1つの面に対して1つの色情報を持つ
     * NOTICE: 引数のverticesは同一平面上に無いと歪む可能性がある
     * NOTICE: verticesは反時計回りに指定する
     * @param {Vector[]} vertices 多角形の頂点座標の配列
     * @param {Color}    color    多角形の色
     */
    function constructor(vertices:Vector[], color:Color) {
        this.vertices = vertices;
        this.color = color;
        this.enabledLighting = true;
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
        var ctx = engine.ctx;
        var len = this.vertices.length;
        var verts = this.vVertices;


        // 透視変換の前に光の計算をしておく
        var color = this.color;
        if (this.enabledLighting) {
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

                var r = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * this.color.r);
                var g = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * this.color.g);
                var b = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * this.color.b);

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

        var isHiddenXY = AbstractModel.isHiddenXY(verts, engine);
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

        ctx.strokeStyle = colorStr;
        for (var i=0; i<len; i++) {
            ctx.beginPath();
            ctx.moveTo(verts[i].x, verts[i].y);
            ctx.lineTo(verts[(i+1)%len].x, verts[(i+1)%len].y);
            ctx.stroke();
        }

        ctx.fillStyle = colorStr;
        ctx.beginPath();
        for (var i=0; i<len; i++) {
            var x = verts[i].x;
            var y = verts[i].y;
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        return true;
    }

}



/**
 * @class 複数のPolygonを内包するオブジェクトモデルクラス
 * @description 各Polygonの移動・回転を一括して行う
 * TODO: クラス名を変更する
 */
class Model extends AbstractModel {

    var polygons : Polygon[];
    var enabledZSort : boolean;

    /*
     * @param {Polygon[]}  polygons Polygonの配列
     * @param {Vector}     center   world座標系での原点からの相対ベクトル
     */
    function constructor(polygons:Polygon[], center:Vector) {
        this.polygons = polygons;
        this.center = center;
        this.enabledZSort = false;
    }

    override function applyWorldMatrix(worldMatrix:Matrix) : void {
        for (var i=0; i<this.polygons.length; i++) {
            this.polygons[i].applyWorldMatrix(worldMatrix);
        }
        this.center = worldMatrix.mul(this.center);
    }

    override function applyViewMatrix(viewMatrix:Matrix) : void {
        this.vCenter = viewMatrix.mul(this.center);
        for (var i=0; i<this.polygons.length; i++) {
            this.polygons[i].applyViewMatrix(viewMatrix);
        }
    }

    override function isHidden(camera:Camera) : boolean {
        for (var i=0; i<this.polygons.length; i++) {
            var polygon = this.polygons[i];
            if (camera.nearZ < -polygon.vCenter.z && -polygon.vCenter.z < camera.farZ) return false;
        }
        return true;
    }

    override function draw(engine:Engine) : boolean {
        var polygons = this.polygons;

        if (this.enabledZSort) {
            polygons = polygons.sort((a,b) -> {
                return a.vCenter.z - b.vCenter.z;
            });
        }

        for (var i=0; i<this.polygons.length; i++) {
            var polygon = this.polygons[i];
            if (polygon.isHidden(engine.camera)) continue;
            polygon.draw(engine);
        }

        return true;
    }
}



/**
 * @class アフィン変換を用いて高速にテクスチャを描画するクラス
 * @description 裏柄からみた場合は、反転して表示する
 * TODO: 継承関係を直す
 */
class SmoothTexture extends Polygon {

    var src : string;
    var image : HTMLImageElement;
    var width : number;
    var height : number;

    var maxHorizontalDiv : int;
    var maxVerticalDiv : int;
    var maxDiv : int;
    var minDiv : int;


    function constructor(vertices:Vector[], src:string) {
        this(vertices, src, 6, 6, 4, 2);
    }

    /**
     * @constructor
     * @description verticesは画像の左下に対応する点から、反時計回りで指定する
     * @param {Vector[]}  vertices  ポリゴンの頂点座標の配列
     * @param {String}    src       テクスチャに使う画像ファイル名
     * @param {int}       maxHorDiv 描画時に水平分割を行う最大数
     * @param {int}       maxVerDiv 描画時に垂直分割を行う最大数
     * @param {int}       maxDiv    描画時に4分割を行う最大数
     * @param {int}       minDiv    描画時に必ず4分割を行う回数
     */
    function constructor(vertices:Vector[], src:string, maxHorDiv:int, maxVerDiv:int, maxDiv:int, minDiv:int) {
        super(vertices, new Color(0, 0, 0));

        this.src = src;
        this.image = Engine.images[src];
        this.vertices = vertices;

        this.width  = Math.abs(vertices[1].sub(vertices[0]).abs());
        this.height = Math.abs(vertices[2].sub(vertices[1]).abs());

        this.maxHorizontalDiv = maxHorDiv;
        this.maxVerticalDiv   = maxVerDiv;
        this.minDiv           = minDiv;

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
        if (!Engine.isLoadedImage[this.src]) return false;

        var ctx = engine.ctx;

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

        var isHiddenXY = AbstractModel.isHiddenXY([sltImage, slbImage, srbImage, srtImage], engine);
        if (isHiddenXY) return false;

        /**
         * @function
         * @description 画像をアフィン変換のみを用いて台形へ変換し描画する
         * @description 変換後の台形が極端に歪んでいる場合は分割を行い、この関数を再帰的に読んで描画する
         * @param {Image}  image           描画する画像
         * @param {Vector} wlt wlb wrb wrt ワールド座標系上の、画像の左上、左下、右下、右上の座標
         * @param {Vector} slt slb srb srt 変換後のスクリーン座標系上の、画像の左上、左下、右下、右上の座標
         * @param {number} depth           この関数の再帰呼び出しの回数、最初の呼び出しでは1を指定
         * @param {number} sx              画像を描画する部分のx軸方向のオフセット
         * @param {number} sy              画像を描画する部分のy軸方向のオフセット
         * @param {number} sw              画像を描画する部分の横幅
         * @param {number} sh              画像を描画する部分の縦幅
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

            // if (AbstractModel.isHiddenXY([slt,slb,srb,srt], engine)) return;

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

            if (depth <= this.minDiv || (depth <= this.maxDiv && splittingHorizontal && splittingVertical)) {
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
            } else if (depth <= this.maxVerticalDiv && splittingVertical) {
                var wct = wlt.add(wrt).divSelf(2);
                var wcb = wlb.add(wrb).divSelf(2);

                var sct = matrix.mul(wct);
                var scb = matrix.mul(wcb);

                divideAndDrawImage(image, wlt, wlb, wcb, wct, slt, slb, scb, sct, depth+1,      sx, sy, sw/2, sh); // 左側部分
                divideAndDrawImage(image, wct, wcb, wrb, wrt, sct, scb, srb, srt, depth+1, sx+sw/2, sy, sw/2, sh); // 右側部分
            } else if (depth <= this.maxHorizontalDiv && splittingHorizontal) {
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

                ctx.transform(1, 0, 0, 1, slt.x, slt.y);
                ctx.transform(1, skewingX, skewingY, 1, 0, 0);
                ctx.transform(scaleX, 0, 0, scaleY, 0, 0);
                ctx.drawImage(image, Math.floor(sx), Math.floor(sy), Math.ceil(sw), Math.ceil(sh), 0, 0, Math.ceil(sw), Math.ceil(sh));

                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
        };

        divideAndDrawImage(this.image, wltImage, wlbImage, wrbImage, wrtImage, sltImage, slbImage, srbImage, srtImage, 1, 0, 0, this.image.width, this.image.height);

        return true;
    }

}



/**
 * @class billboard(どの方向から見ても同じ画像を表示するオブジェクト)を表すクラス
 */
class Billboard extends AbstractModel {

    var width : number;
    var height : number;
    var src : string;
    var image : HTMLImageElement;

    /**
     * @param {Vector} center world座標系でのBillboardの中心座標
     * @param {number} width  world座標系でのBillboardの横幅
     * @param {number} height world座標系でのBillboardの縦幅
     * @param {String} src    Billboardで使う画像のファイル名
     */
    function constructor(center:Vector, width:number, height:number, src:string) {
        this.width = width;
        this.height = height;
        this.src = src;
        this.image = Engine.images[src];

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
        if (!Engine.isLoadedImage[this.src]) return false;

        var ctx = engine.ctx;

        var projectionAndScreenMatrix = engine.screenMatrix.compose(engine.camera.projectionMatrix);

        // TODO: 座標系のチェック
        var vLeftBottom = this.vCenter.sub(new Vector(this.width/2, this.height/2, 0));

        var vpCenter = projectionAndScreenMatrix.mul(this.vCenter);
        var vpLeftBottom = projectionAndScreenMatrix.mul(vLeftBottom);
        var vpHalfWidth = vpLeftBottom.x - vpCenter.x;
        var vpHalfHeight = vpLeftBottom.y - vpCenter.y;

        var scaleX = vpHalfWidth  / this.image.width  * 2;
        var scaleY = vpHalfHeight / this.image.height * 2;

        ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);

        // TODO: 描画位置を決めなくても、アフィン変換でなんとかなるかも
        ctx.drawImage(this.image, (vpCenter.x-vpHalfWidth)/scaleX, (vpCenter.y-vpHalfHeight)/scaleY);

        ctx.setTransform(1, 0, 0, 1, 0, 0);

        return true;
    }

}
