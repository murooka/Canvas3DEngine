import "./vector.jsx";
import "./matrix.jsx";
import "./engine.jsx";
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

            context.renderTexture([
                new Vector(-30, -20, 0),
                new Vector( 30, -20, 0),
                new Vector( 30,  20, 0),
                new Vector(-30,  20, 0)
            ], './image/so-nya.png');

            for (var i=0; i<trees.length; i++) {
                context.depth = 3;
                context.renderBillboard(trees[i], 50, 30, './image/tree.png');
            }

            for (var i=-10; i<10; i++) {
                for (var j=-10; j<10; j++) {
                    context.depth = 5;
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

        // var model = (():Model -> {
        //     var polygons = [] : Polygon[];

        //     for (var i=-10; i<10; i++) {
        //         for (var j=-10; j<10; j++) {
        //             var polygon = new Polygon([
        //                 new Vector(    i*50, -20,     j*50),
        //                 new Vector(    i*50, -20, (j+1)*50),
        //                 new Vector((i+1)*50, -20, (j+1)*50),
        //                 new Vector((i+1)*50, -20,     j*50)
        //             ], new Color(128, 255, 128));
        //             polygon.depth = 8;
        //             polygons.push(polygon);
        //         }
        //     }
        //     return new Model(polygons, new Vector(0, 0, 0));
        // })();
        // model.depth = 8;
        // engine.addModel(model);

        // for (var i=0; i<100; i++) {
        //     var x = Math.floor((Math.random()-0.5)*20)*25;
        //     var z = Math.floor((Math.random()-0.5)*20)*25;
        //     var billboard = new Billboard(new Vector(x, -3, z), 50, 35, './image/tree.png');
        //     engine.addModel(billboard);
        // }

        // var texture = new SmoothTexture([
        //     new Vector(-30, -20, 0),
        //     new Vector( 30, -20, 0),
        //     new Vector( 30,  20, 0),
        //     new Vector(-30,  20, 0)
        // ], './image/so-nya.png');
        // engine.addModel(texture);


        // engine.update();


        // var dragging = false;
        // var old_x = 0;
        // var old_y = 0;
        // engine.canvas.onmousedown = (e:Event):void -> {
        //     var me = e as MouseEvent;
        //     dragging = true;
        //     old_x = me.clientX - engine.canvas.offsetLeft;
        //     old_y = me.clientY - engine.canvas.offsetTop;
        // };
        // engine.canvas.onmouseup = (e:Event):void -> {
        //     dragging = false;
        // };
        // engine.canvas.onmousemove = (e:Event):void -> {
        //     var me = e as MouseEvent;
        //     if (dragging) {
        //         var mouse_x = me.clientX - engine.canvas.offsetLeft;
        //         var mouse_y = me.clientY - engine.canvas.offsetTop;

        //         model.rotateY(-(mouse_x - old_x) / 100);
        //         engine.update();

        //         old_x = mouse_x;
        //         old_y = mouse_y;
        //     }
        // };
        // dom.window.document.onkeypress = (e:Event):void -> {
        //     var ke = e as KeyboardEvent;
        //     // console.log(e.keyCode);
        //     switch (ke.keyCode) {
        //         case 119: // 'w'
        //             engine.camera.move(new Vector(0, 0, 10));
        //             engine.updateMatrix();
        //             break;
        //         case 115: // 's'
        //             engine.camera.move(new Vector(0, 0,-10));
        //             engine.updateMatrix();
        //             break;
        //         case 97:  // 'a'
        //             engine.camera.rotateY(-Math.PI/32);
        //             engine.updateMatrix();
        //             break;
        //         case 100: // 'd'
        //             engine.camera.rotateY(Math.PI/32);
        //             engine.updateMatrix();
        //             break;
        //         case 106: // 'j'
        //             break;
        //         case 107: // 'k'
        //             break;
        //     }
        //     engine.update();
        // };

        var move = ():void -> {
            engine.camera.move(new Vector(0, 0, 5));
            engine.camera.rotateY(Math.PI / 64);
            engine.updateMatrix();
            Timer.setTimeout(move, 10);
        };
        Timer.setTimeout(move, 10);
    }

}
