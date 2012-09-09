import "./vector.jsx";
import "./matrix.jsx";
import "./engine.jsx";
import "./list.jsx";
import "js/web.jsx";
import "timer.jsx";


final class _Main {
    static function main(args:string[]) : void {

        Engine.loadImages(['./image/tree.png', './image/so-nya.png']);

        var engine = new Engine('canvas');

        var trees = [] : Vector[];
        for (var i=0; i<100; i++) {
            var x = Math.floor((Math.random()-0.5)*20)*25;
            var z = Math.floor((Math.random()-0.5)*20)*25;
            trees.push(new Vector(x, -3, z));
        }

        engine.onRender = (context:Context3D):void -> {

            context.depth = 3;
            context.renderTexture([
                new Vector(-30, -20, 0),
                new Vector( 30, -20, 0),
                new Vector( 30,  20, 0),
                new Vector(-30,  20, 0)
            ], './image/so-nya.png');

            for (var i=0; i<trees.length; i++) {
                context.renderBillboard(trees[i], 50, 30, './image/tree.png');
            }

            context.depth = 5;
            for (var i=-10; i<10; i++) {
                for (var j=-10; j<10; j++) {
                    context.renderPolygon([
                        new Vector(    i*50, -20,     j*50),
                        new Vector(    i*50, -20, (j+1)*50),
                        new Vector((i+1)*50, -20, (j+1)*50),
                        new Vector((i+1)*50, -20,     j*50)
                    ], new Color(128, 255, 128));
                }
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
                    engine.camera.move(new Vector(0, 0,-10));
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
        };

        engine.start();

        var move = ():void -> {
            engine.camera.move(new Vector(0, 0, 5));
            engine.camera.rotateY(Math.PI / 64);
            engine.updateMatrix();
            Timer.setTimeout(move, 10);
        };
        Timer.setTimeout(move, 10);
    }

}
