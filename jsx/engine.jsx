import "./vector.jsx";
import "./matrix.jsx";
import "js/web.jsx";



class Engine {
    
    var canvas : HTMLCanvasElement;
    var ctx : CanvasRenderingContext2D;
    var width : int;
    var height : int;

    var camera : Camera;
    var screenMatrix : Matrix;

    var objects : AbstractModel[];

    function constructor(canvasId:string) {
        this.canvas = dom.id(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.width = this.canvas.width;
        this.height = this.canvas.height;

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
            aspect_ratio
        );

        this.updateMatrix();
    }

    static var images = {} : Map.<HTMLImageElement>;
    static var imageDatas = {} : Map.<ImageData>;
    static var isLoadedImage = {} : Map.<boolean>;

    static function loadImages(srcs:string[]) : void {
        var canvas = dom.id('tmp_canvas') as HTMLCanvasElement;
        var ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        for (var i=0; i<srcs.length; i++) {
            var src = srcs[i];

            var image = new HTMLImageElement;
            image.src = src;
            Engine.isLoadedImage[src] = false;
            Engine.images[src] = image;
            image.onload = function (e:Event) : void {
                Engine.isLoadedImage[src] = true;
                ctx.drawImage(image, 0, 0);
                Engine.imageDatas[src] = ctx.getImageData(0, 0, image.width, image.height);
            };
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
            if (a.depth==b.depth) return a.vCenter.z() - b.vCenter.z();
            else                  return b.depth - a.depth;
        });

        var count = 0;
        for (var i=0; i<objects.length; i++) {
            if (objects[i].draw(this)) count++;
        }
        log 'draw ' + (count as string) + ' models';
    }

    function setScreenMatrix(width:int, height:int) : void {
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
            var sy = sx / aspect_ratio;
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
        <`0`>
    
    var r : int;
    var g : int;
    var b : int;
    
    function constructor(r:int, g:int, b:int) {
    }
}



abstract class AbstractModel {
}



final class _Main {
    static function main(args:string[]) : void {
        var engine = new Engine('canvas');
    }

}
