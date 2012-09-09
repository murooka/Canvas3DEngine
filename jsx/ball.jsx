import "./vector.jsx";
import "./matrix.jsx";
import "./engine.jsx";
import "./list.jsx";
import "js/web.jsx";
import "timer.jsx";

class Util3D {

    static function sphere(context:Context3D, size:number, div:int) : void {
        var ver = div;
        var hor = div*2;
        var sin = Math.sin;
        var cos = Math.cos;
        var pi = Math.PI;
        for (var i=0; i<hor; i++) {
            var i1 = 0;
            var i2 = 1;
            var j1 = i+1;
            var j2 = i;
            context.renderPolygon([
                new Vector(cos(2*pi*j1/hor)*sin(pi*i1/ver)*size, cos(pi*i1/ver)*size, sin(2*pi*j1/hor)*sin(pi*i1/ver)*size),
                new Vector(cos(2*pi*j1/hor)*sin(pi*i2/ver)*size, cos(pi*i2/ver)*size, sin(2*pi*j1/hor)*sin(pi*i2/ver)*size),
                new Vector(cos(2*pi*j2/hor)*sin(pi*i2/ver)*size, cos(pi*i2/ver)*size, sin(2*pi*j2/hor)*sin(pi*i2/ver)*size)
            ], new Color(128, 128, 255));
        }
        for (var i=1; i<ver-1; i++) {
            for (var j=0; j<hor; j++) {
                var i1 = i;
                var i2 = i+1;
                var j1 = j+1;
                var j2 = j;
                context.renderPolygon([
                    new Vector(cos(2*pi*j1/hor)*sin(pi*i1/ver)*size, cos(pi*i1/ver)*size, sin(2*pi*j1/hor)*sin(pi*i1/ver)*size),
                    new Vector(cos(2*pi*j1/hor)*sin(pi*i2/ver)*size, cos(pi*i2/ver)*size, sin(2*pi*j1/hor)*sin(pi*i2/ver)*size),
                    new Vector(cos(2*pi*j2/hor)*sin(pi*i2/ver)*size, cos(pi*i2/ver)*size, sin(2*pi*j2/hor)*sin(pi*i2/ver)*size),
                    new Vector(cos(2*pi*j2/hor)*sin(pi*i1/ver)*size, cos(pi*i1/ver)*size, sin(2*pi*j2/hor)*sin(pi*i1/ver)*size)
                ], new Color(128, 128, 255));
            }
        }
        for (var i=0; i<hor; i++) {
            var i1 = ver-1;
            var i2 = ver;
            var j1 = i+1;
            var j2 = i;
            context.renderPolygon([
                new Vector(cos(2*pi*j1/hor)*sin(pi*i2/ver)*size, cos(pi*i2/ver)*size, sin(2*pi*j1/hor)*sin(pi*i2/ver)*size),
                new Vector(cos(2*pi*j2/hor)*sin(pi*i2/ver)*size, cos(pi*i2/ver)*size, sin(2*pi*j2/hor)*sin(pi*i2/ver)*size),
                new Vector(cos(2*pi*j2/hor)*sin(pi*i1/ver)*size, cos(pi*i1/ver)*size, sin(2*pi*j2/hor)*sin(pi*i1/ver)*size)
            ], new Color(128, 128, 255));
        }

    }

}

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

            context.translate(0, -16, 0);
            Util3D.sphere(context, 4, 8);
            context.resetMatrix();

            // context.renderTexture([
            //     new Vector(-30, -20, 0),
            //     new Vector( 30, -20, 0),
            //     new Vector( 30,  20, 0),
            //     new Vector(-30,  20, 0)
            // ], './image/so-nya.png');

            /* for (var i=0; i<trees.length; i++) { */
                /* context.renderBillboard(trees[i], 50, 30, './image/tree.png'); */
            /* } */

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

        // var move = ():void -> {
        //     engine.camera.move(new Vector(0, 0, 5));
        //     engine.camera.rotateY(Math.PI / 64);
        //     engine.updateMatrix();
        //     Timer.setTimeout(move, 10);
        // };
        // Timer.setTimeout(move, 10);
    }

}
