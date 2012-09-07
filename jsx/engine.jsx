import "./vector.jsx";
import "./matrix.jsx";
import "js/web.jsx";
import "timer.jsx";



class Math2D {
    static function cross(x1:number, y1:number, x2:number, y2:number) : number {
        return x1*y2 - x2*y1;
    }
}



// クラス名をTimerにしたかった・・・
class Stopwatch {

    var elapsedMsec : number;
    var startedMsec : Nullable.<number>;
    var lastLapMsec : Nullable.<number>;

    function constructor() {
        this.elapsedMsec = 0;
        this.startedMsec = null;
    }

    function currentMsec() : number {
        return (new Date).getTime();
    }

    function start() : void {
        if (this.startedMsec!=null) {
            throw "Stopwatch#start : invalid operation, timer is already running.";
        }
        this.startedMsec = this.lastLapMsec = this.currentMsec();
    }

    function stop() : void {
        if (this.startedMsec==null) {
            throw "Stopwatch#stop : invalid operation, timer is not started.";
        }
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

    function lap() : number {
        if (this.lastLapMsec==null) {
            throw "Stopwatch#lap : invalid operation, timer is not started.";
        }
        var currentMsec = this.currentMsec();
        var lapMsec = currentMsec - this.lastLapMsec;
        this.lastLapMsec = currentMsec;

        return lapMsec;
    }

    function getElapsedMsec() : number {
        return this.elapsedMsec;
    }

}



class FpsManager {

    var stopwatch : Stopwatch;
    var recentlyMsecLog : number[];
    var fpsElement : Nullable.<HTMLElement>;
    var enabledHtmlLog : boolean;
    var enabledConsoleLog : boolean;

    function constructor() {
        this.fpsElement = null;
        this.stopwatch = new Stopwatch;
        this.recentlyMsecLog = [] : number[];

        this.enabledHtmlLog = false;
        this.enabledConsoleLog = true;
    }
    
    function constructor(spanId:string) {
        this.fpsElement = dom.id(spanId);
        this.stopwatch = new Stopwatch;
        this.recentlyMsecLog = [] : number[];

        this.enabledHtmlLog = true;
        this.enabledConsoleLog = false;
    }

    function start() : void {
        this.stopwatch.start();
    }

    function update() : void {
        if (this.stopwatch.isStopped()) {
            throw "FpsManager#update : invalid operation, FpsManager is not started.";
        }

        if (this.recentlyMsecLog.length < 1) {
            this.recentlyMsecLog.push(this.stopwatch.lap());
        } else {
            this.recentlyMsecLog.push(this.stopwatch.lap());
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



class Engine {

    var canvas : HTMLCanvasElement;
    var ctx : CanvasRenderingContext2D;
    var width : number;
    var height : number;

    var camera : Camera;
    var screenMatrix : Matrix;
    var transformationMatrix : Matrix;

    var objects : AbstractModel[];

    function constructor(canvasId:string) {
        this.canvas = dom.id(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.setScreenMatrix(this.width, this.height);

        this.objects = [] : AbstractModel[];


        var viewPosition   = new Vector(0, 0, -100);
        var targetPosition = new Vector(0, 0,    0);
        var upperVector    = new Vector(0, 1, 0);
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

    function update() : void {
        this.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        var camera = this.camera;

        var objects = [] : AbstractModel[];
        for (var i=0; i<this.objects.length; i++) {
            this.objects[i].applyViewMatrix(camera.viewMatrix);
            if (!this.objects[i].isHidden(camera)) objects.push(this.objects[i]);
        }

        objects = objects.sort((a:AbstractModel, b:AbstractModel) -> {
            if (a.depth==b.depth) return a.vCenter.z - b.vCenter.z;
            return b.depth - a.depth;
        });

        var count = 0;
        for (var i=0; i<objects.length; i++) {
            if (objects[i].draw(this)) count++;
        }
        log 'draw ' + (count as string) + ' models';
    }

    function setScreenMatrix(width:number, height:number) : void {
        this.screenMatrix =
            Matrix.translating(width/2, height/2, 0).compose(
                Matrix.scaling(width/2, height/2, 1));
    }

    function updateMatrix() : void {
        this.camera.updateMatrix();
        this.transformationMatrix = this.screenMatrix.compose(this.camera.matrix);
    }

}



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

    function move(v:Vector) : void {
        var vector = this.rotatingMatrix.mul(v);
        this.view = this.view.add(vector);
        this.target = this.target.add(vector);
    }

    function rotateY(rad:number) : void {
        var lookingVec =  this.target.sub(this.view);
        lookingVec = Matrix.rotatingY(rad).mul(lookingVec);
        this.target = lookingVec.add(this.view);

        this.rotatingMatrix = Matrix.rotatingY(rad).compose(this.rotatingMatrix);
    }

    function updateMatrix() : void {
        var view = this.view;
        var target = this.target;
        var upper  = this.upper;
        var fovyX  = this.fovyX;
        var nearZ  = this.nearZ;
        var farZ   = this.farZ;
        var aspectRatio = this.aspectRatio;

        var viewMatrix = (function () : Matrix {
            var zaxis = view.sub(target).unit();
            var xaxis = upper.cross(zaxis).unit();
            var yaxis = zaxis.cross(xaxis).unit();

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
                 0,  0,  1,  1
            ]);
        })();

        this.viewMatrix = viewMatrix;
        this.projectionMatrix = projectionMatrix;
        this.matrix = projectionMatrix.compose(viewMatrix);
    }

}



class Color {
    
    var r : int;
    var g : int;
    var b : int;
    
    function constructor(r:int, g:int, b:int) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    function toHexString() : string {
        var to2digitHex = (value:int) : string -> {
            var str = Math.floor(value).toString(16);
            if (str.length==1) str = '0' + str;
            return str;
        };

        return to2digitHex(this.r) + to2digitHex(this.g) + to2digitHex(this.b);
    }

    function negative() : Color {
        return new Color(this.g, this.b, this.r);
    }
}



abstract class AbstractModel {

    var center : Vector;
    var vCenter : Vector;
    var depth : int = 5;

    abstract function applyViewMatrix(viewMatrix:Matrix) : void;
    abstract function isHidden(camera:Camera) : boolean;
    abstract function draw(engine:Engine) : boolean;

    static function isHiddenXY(vertices:Vector[], engine:Engine) : boolean {
        for (var i=0; i<vertices.length; i++) {
            var v = vertices[i];
            if (0 < v.x && v.x < engine.width &&
                0 < v.y && v.y < engine.height  ) return false;
        }
        return true;
    }

}



class Polygon extends AbstractModel {

    var vertices : Vector[];
    var vVertices : Vector[];
    var color : Color;

    function constructor(vertices:Vector[], color:Color) {
        this.vertices = vertices;
        this.color = color;
    }

    override function applyViewMatrix(viewMatrix:Matrix) : void {
        var vVertices = [] : Vector[];
        var vSumPos = new Vector(0, 0, 0);
        for (var i=0; i<this.vertices.length; i++) {
            var vVertex = viewMatrix.mul(this.vertices[i]);
            vVertices.push(vVertex);
            vSumPos = vSumPos.add(vVertex);
        }
        this.vCenter = vSumPos.div(this.vertices.length);
        this.vVertices = vVertices;
    }

    override function isHidden(camera:Camera) : boolean {
        if (camera.nearZ < -this.vCenter.z && -this.vCenter.z < camera.farZ) return false;
        return true;
    }

    function move(v:Vector) : void {
        for (var i=0; i<this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i].add(v);
        }
        this.updateCenter();
    }

    function rotateX(center:Vector, rad:number) : void {
        for (var i=0; i<this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i].sub(center).rotateX(rad).add(center);
        }
        this.updateCenter();
    }

    function rotateY(center:Vector, rad:number) : void {
        for (var i=0; i<this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i].sub(center).rotateY(rad).add(center);
        }
        this.updateCenter();
    }

    function rotateZ(center:Vector, rad:number) : void {
        for (var i=0; i<this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i].sub(center).rotateZ(rad).add(center);
        }
        this.updateCenter();
    }

    function updateCenter() : void {
        var sumVector = new Vector(0,0,0);
        for (var i=0; i<this.vertices.length; i++) {
            sumVector = sumVector.add(this.vertices[i]);
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


        // TODO: 光の使用をユーザが無効化できるようにする
        // 透視変換の前に光の計算をしておく
        var center = (():Vector -> {
            var posSum = new Vector(0, 0, 0);
            for (var i=0; i<verts.length; i++) {
                posSum = posSum.add(verts[i]);
            }
            return posSum.div(verts.length);
        })();

        var norm = (():Vector -> {
            var v1 = verts[1].sub(center);
            var v2 = verts[2].sub(center);

            return v1.cross(v2).unit();
        })();

        var lightPower = norm.dot(center.unit());
        var diffusePower = 0.7;
        var diffuseCoefficient = 0.8;
        var ambientPower = 0.5;

        var colorR = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * this.color.r);
        var colorG = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * this.color.g);
        var colorB = Math.min(255, (diffusePower * diffuseCoefficient * lightPower + ambientPower) * this.color.b);



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
        if (Math2D.cross(verts[1].x-verts[0].x,
                    verts[1].y-verts[0].y,
                    verts[2].x-verts[0].x,
                    verts[2].y-verts[0].y) > 0) {
            return false;
        }
        if (Math2D.cross(verts[2].x-verts[1].x,
                    verts[2].y-verts[1].y,
                    verts[3].x-verts[1].x,
                    verts[3].y-verts[1].y) > 0) {
            return false;
        }
        if (Math2D.cross(verts[3].x-verts[2].x,
                    verts[3].y-verts[2].y,
                    verts[0].x-verts[2].x,
                    verts[0].y-verts[2].y) > 0) {
            return false;
        }
        if (Math2D.cross(verts[0].x-verts[3].x,
                    verts[0].y-verts[3].y,
                    verts[1].x-verts[3].x,
                    verts[1].y-verts[3].y) > 0) {
            return false;
        }

        var color = '#';
        color += new Color(colorR, colorG, colorB).toHexString();

        ctx.strokeStyle = color;
        for (var i=0; i<len; i++) {
            ctx.beginPath();
            ctx.moveTo(verts[i].x, verts[i].y);
            ctx.lineTo(verts[(i+1)%len].x, verts[(i+1)%len].y);
            ctx.stroke();
        }

        ctx.fillStyle = color;
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



class Model extends AbstractModel {

    var polygons : Polygon[];
    var enabledZSort : boolean;

    function constructor(polygons:Polygon[], center:Vector) {
        this.polygons = polygons;
        this.center = center;
        this.enabledZSort = false;
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

    function move(v:Vector) : void {
        for (var i=0; i<this.polygons.length; i++) {
            this.polygons[i].move(v);
        }
        this.center = this.center.add(v);
    }

    function rotateX(rad:number) : void {
        for (var i=0; i<this.polygons.length; i++) {
            this.polygons[i].rotateX(this.center, rad);
        }
    }

    function rotateY(rad:number) : void {
        for (var i=0; i<this.polygons.length; i++) {
            this.polygons[i].rotateY(this.center, rad);
        }
    }

    function rotateZ(rad:number) : void {
        for (var i=0; i<this.polygons.length; i++) {
            this.polygons[i].rotateZ(this.center, rad);
        }
    }

    override function draw(engine:Engine) : boolean {
        // TODO: Z-sort
        if (this.enabledZSort) {
        }

        for (var i=0; i<this.polygons.length; i++) {
            var polygon = this.polygons[i];
            if (polygon.isHidden(engine.camera)) continue;
            polygon.draw(engine);
        }

        return true;
    }
}



class SmoothTexture extends Polygon {

    var src : string;
    var image : HTMLImageElement;
    var width : number;
    var height : number;

    function constructor(vertices:Vector[], src:string) {
        super(vertices, new Color(0, 0, 0));

        this.src = src;
        this.image = Engine.images[src];
        this.vertices = vertices;

        this.width  = Math.abs(vertices[1].sub(vertices[0]).abs());
        this.height = Math.abs(vertices[2].sub(vertices[1]).abs());

        this.updateCenter();
    }

    override function applyViewMatrix(viewMatrix:Matrix) : void {
        this.vCenter = viewMatrix.mul(this.center);
    }

    override function isHidden(camera:Camera) : boolean {
        if (camera.nearZ < -this.vCenter.z && -this.vCenter.z < camera.farZ) return false;
        return true;
    }

    function rotateX(rad:number, center:Vector) : void {
        for (var i=0; i<this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i].sub(center).rotateX(rad).add(center);
        }
        this.updateCenter();
    }

    function rotateY(rad:number, center:Vector) : void {
        for (var i=0; i<this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i].sub(center).rotateY(rad).add(center);
        }
        this.updateCenter();
    }

    function rotateZ(rad:number, center:Vector) : void {
        for (var i=0; i<this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i].sub(center).rotateZ(rad).add(center);
        }
        this.updateCenter();
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

        /**
         * @function
         * @description 画像をアフィン変換のみを用いて台形へ変換し描画する
         * @description 変換後の台形が極端に歪んでいる場合は分割を行い、この関数を再帰的に読んで描画する
         * @param {Image}  image           描画する画像
         * @param {Vector} wlt wlb wrb wrt ワールド座標系上の、画像の左上、左下、右下、右上の座標
         * @param {Vector} slt slb srb srt 変換後のスクリーン座標系上の、画像の左上、左下、右下、右上の座標
         * @param {number} depth           この関数の再帰呼び出しの回数、最初の呼び出しでは1を指定
         * @param {number} dx              画像を描画する部分のx軸方向のオフセット
         * @param {number} dy              画像を描画する部分のy軸方向のオフセット
         * @param {number} dw              画像を描画する部分の横幅
         * @param {number} dh              画像を描画する部分の縦幅
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

            // var splittingHorizontal = Math.abs(sBottomWidth - sTopWidth)   > 4,
            // splittingVertical   = Math.abs(sRightHeight - sLeftHeight) > 4;
            var splittingHorizontal = widthRatio > 1.01;
            var splittingVertical   = heightRatio > 1.01;


            if (depth <= 2 || (depth <=4 && splittingHorizontal && splittingVertical)) {
                var wct = wlt.add(wrt).div(2);
                var wcb = wlb.add(wrb).div(2);
                var wlc = wlt.add(wlb).div(2);
                var wrc = wrt.add(wrb).div(2);
                var wcc = wlt.add(wrb).div(2);

                var sct = matrix.mul(wct);
                var scb = matrix.mul(wcb);
                var slc = matrix.mul(wlc);
                var src = matrix.mul(wrc);
                var scc = matrix.mul(wcc);

                divideAndDrawImage(image, wlt, wlc, wcc, wct, slt, slc, scc, sct, depth+1,      sx, sy     , sw/2, sh/2); // 左上部分
                divideAndDrawImage(image, wlc, wlb, wcb, wcc, slc, slb, scb, scc, depth+1,      sx, sy+sh/2, sw/2, sh/2); // 左下部分
                divideAndDrawImage(image, wct, wcc, wrc, wrt, sct, scc, src, srt, depth+1, sx+sw/2, sy     , sw/2, sh/2); // 右上部分
                divideAndDrawImage(image, wcc, wcb, wrb, wrc, scc, scb, srb, src, depth+1, sx+sw/2, sy+sh/2, sw/2, sh/2); // 右下部分
            } else if (depth <= 6 && splittingVertical) {
                var wct = wlt.add(wrt).div(2);
                var wcb = wlb.add(wrb).div(2);

                var sct = matrix.mul(wct);
                var scb = matrix.mul(wcb);

                divideAndDrawImage(image, wlt, wlb, wcb, wct, slt, slb, scb, sct, depth+1,      sx, sy, sw/2, sh); // 左側部分
                divideAndDrawImage(image, wct, wcb, wrb, wrt, sct, scb, srb, srt, depth+1, sx+sw/2, sy, sw/2, sh); // 右側部分
            } else if (depth <= 6 && splittingHorizontal) {
                var wlc = wlt.add(wlb).div(2);
                var wrc = wrt.add(wrb).div(2);

                var slc = matrix.mul(wlc);
                var src = matrix.mul(wrc);

                divideAndDrawImage(image, wlt, wlc, wrc, wrt, slt, slc, src, srt, depth+1, sx,      sy, sw, sh/2); // 上側部分
                divideAndDrawImage(image, wlc, wlb, wrb, wrc, slc, slb, srb, src, depth+1, sx, sy+sh/2, sw, sh/2); // 下側部分
            } else {

                var maxX = Math.max(slt.x, slb.x, srb.x, srt.x);
                var minX = Math.min(slt.x, slb.x, srb.x, srt.x);
                var maxY = Math.max(slt.y, slb.y, srb.y, srt.y);
                var minY = Math.min(slt.y, slb.y, srb.y, srt.y);

                var scaleX   = (maxX-minX) / sw;
                var scaleY   = (maxY-minY) / sh;
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



class Billboard extends AbstractModel {

    var width : number;
    var height : number;
    var src : string;
    var image : HTMLImageElement;

    function constructor(center:Vector, width:number, height:number, src:string) {
        this.width = width;
        this.height = height;
        this.src = src;
        this.image = Engine.images[src];

        this.center = center;
    }

    override function applyViewMatrix(viewMatrix:Matrix) : void {
        this.vCenter = viewMatrix.mul(this.center);
    }

    override function isHidden(camera:Camera) : boolean {
        if (camera.nearZ < -this.vCenter.z && -this.vCenter.z < camera.farZ) return false;
        return true;
    }

    override function draw(engine:Engine) : boolean {
        if (!Engine.isLoadedImage[this.src]) return false;

        var ctx = engine.ctx;

        var projectionAndScreenMatrix = engine.screenMatrix.compose(engine.camera.projectionMatrix);

        // TODO: 座標系のチェック
        var vRightTop = this.vCenter.sub(new Vector(this.width/2, this.height/2, 0));

        var vpCenter = projectionAndScreenMatrix.mul(this.vCenter);
        var vpRightTop = projectionAndScreenMatrix.mul(vRightTop);
        var vpHalfWidth = vpRightTop.x - vpCenter.x;
        var vpHalfHeight = vpRightTop.y - vpCenter.y;

        var scaleX = vpHalfWidth  / this.image.width  * 2;
        var scaleY = vpHalfHeight / this.image.height * 2;

        ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);

        // TODO: 描画位置を決めなくても、アフィン変換でなんとかなるかも
        ctx.drawImage(this.image, (vpCenter.x-vpHalfWidth)/scaleX, (vpCenter.y-vpHalfHeight)/scaleY);

        ctx.setTransform(1, 0, 0, 1, 0, 0);

        return true;
    }

}



final class _Main {
    static function main(args:string[]) : void {
        var engine = new Engine('canvas');

        Engine.loadImages(['./image/tree.png', './image/so-nya.png']);

        var model = (():Model -> {
            var polygons = [] : Polygon[];

            for (var i=-10; i<10; i++) {
                for (var j=-10; j<10; j++) {
                    var polygon = new Polygon([
                        new Vector(    i*50, -20,     j*50),
                        new Vector((i+1)*50, -20,     j*50),
                        new Vector((i+1)*50, -20, (j+1)*50),
                        new Vector(    i*50, -20, (j+1)*50)
                    ], new Color(128, 255, 128));
                    polygon.depth = 8;
                    polygons.push(polygon);
                }
            }
            return new Model(polygons, new Vector(0, 0, 0));
        })();
        model.depth = 8;
        engine.addModel(model);

        // for (var i=-10; i<10; i++) {
        //     for (var j=-10; j<10; j++) {
        //         var polygon = new Polygon([
        //             new Vector(    i*50, -20,     j*50),
        //             new Vector((i+1)*50, -20,     j*50),
        //             new Vector((i+1)*50, -20, (j+1)*50),
        //             new Vector(    i*50, -20, (j+1)*50)
        //         ], new Color(128, 255, 128));
        //         polygon.depth = 8;
        //         engine.addModel(polygon);
        //     }
        // }


        for (var i=0; i<100; i++) {
            var x = (Math.floor(Math.random()*20)-10)*25;
            var z = (Math.floor(Math.random()*20)-10)*25;
            var billboard = new Billboard(new Vector(x, -3, z), 50, 35, './image/tree.png');
            engine.addModel(billboard);
        }

        var texture = new SmoothTexture([
            new Vector(-30, -20, 0),
            new Vector( 30, -20, 0),
            new Vector( 30,  20, 0),
            new Vector(-30,  20, 0)
        ], './image/so-nya.png');
        engine.addModel(texture);


        engine.update();


        var dragging = false;
        var old_x = 0;
        var old_y = 0;
        engine.canvas.onmousedown = (e:Event):void -> {
            var me = e as MouseEvent;
            dragging = true;
            old_x = me.clientX - engine.canvas.offsetLeft;
            old_y = me.clientY - engine.canvas.offsetTop;
        };
        engine.canvas.onmouseup = (e:Event):void -> {
            dragging = false;
        };
        engine.canvas.onmousemove = (e:Event):void -> {
            var me = e as MouseEvent;
            if (dragging) {
                var mouse_x = me.clientX - engine.canvas.offsetLeft;
                var mouse_y = me.clientY - engine.canvas.offsetTop;

                model.rotateY(-(mouse_x - old_x) / 100);
                engine.update();

                old_x = mouse_x;
                old_y = mouse_y;
            }
        };
        dom.window.document.onkeypress = (e:Event):void -> {
            var ke = e as KeyboardEvent;
            // console.log(e.keyCode);
            switch (ke.keyCode) {
                case 119: // 'w'
                    engine.camera.move(new Vector(0, 0, 10));
                    engine.updateMatrix();
                    break;
                case 115: // 's'
                    engine.camera.move(new Vector(0, 0, -10));
                    engine.updateMatrix();
                    break;
                case 97:  // 'a'
                    engine.camera.rotateY(-Math.PI/32);
                    engine.updateMatrix();
                    break;
                case 100: // 'd'
                    engine.camera.rotateY(Math.PI/32);
                    engine.updateMatrix();
                    break;
                case 106: // 'j'
                    break;
                case 107: // 'k'
                    break;
            }
            engine.update();
        };

        // var fpsManager = new FpsManager('fps');
        // fpsManager.start();

        // var move = ():void -> {
        //     fpsManager.update();
        //     engine.camera.move(new Vector(0, 0, 5));
        //     engine.camera.rotateY((Math.random()) * Math.PI / 32);
        //     engine.updateMatrix();
        //     engine.update();
        //     Timer.setTimeout(move, 10);
        // };
        // Timer.setTimeout(move, 10);
    }

}
