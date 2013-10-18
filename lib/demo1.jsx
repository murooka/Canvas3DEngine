import "./vector.jsx";
import "./quaternion.jsx";
import "./engine.jsx";

final class _Main {
    static function main(args:string[]) : void {

        var imageName = './image/so-nya.png';

        Engine.loadImages([imageName]);
        var engine = new Engine('canvas_demo1');

        engine.camera.view = new Vector(0, 0, -100);
        engine.camera.target = new Vector(0, 0, 0);
        engine.camera.updateMatrix();

        var q = Quaternion.rotating(0, 0, 0, 0);

        engine.onUpdate = (elapsedMsec:number):void -> {
            q.mulSelf(Quaternion.rotating(Math.PI/100, 0, 0, 0.19));
        };
        engine.onRender = (context:Context3D, elapsedMsec:number):void -> {
            context.setBackgroundColor(new Color(190, 240, 255));
            context.pushMatrix();
            context.rotate(q);
            context.renderTexture([
                new Vector(-10,-10,  0),
                new Vector( 10,-10,  0),
                new Vector( 10, 10,  0),
                new Vector(-10, 10,  0)
            ], imageName, 4, 4, 3, 2);
            context.popMatrix();

        };

        engine.start();

    }

}
