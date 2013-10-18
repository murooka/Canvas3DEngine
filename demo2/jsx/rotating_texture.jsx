import "../../lib/vector.jsx";
import "../../lib/quaternion.jsx";
import "../../lib/engine.jsx";

final class _Main {
    static function main(args:string[]) : void {

        var engine = new Engine('canvas');

        engine.camera.view = new Vector(0, 0, -100);
        engine.camera.target = new Vector(0, 0, 0);
        engine.camera.updateMatrix();

        var q = Quaternion.rotating(0, 0, 0.7, 0.7);

        engine.onUpdate = (elapsedMsec:number):void -> {
            q.mulSelf(Quaternion.rotating(Math.PI/100, 0, 0.7, 0.7));
        };
        engine.onRender = (context:Context3D, elapsedMsec:number):void -> {
            context.setBackgroundColor(new Color(190, 240, 255));

            context.pushMatrix();
            context.rotate(q);
            context.renderPolygon([
                new Vector(-10, 10,  0),
                new Vector( 10, 10,  0),
                new Vector( 10,-10,  0),
                new Vector(-10,-10,  0)
            ], new Color(255, 159, 79));
            context.popMatrix();
        };

        engine.start();

    }

}
