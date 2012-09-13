import "./vector.jsx";
import "./matrix.jsx";
import "./quaternion.jsx";
import "./engine.jsx";
import "./list.jsx";
import "js/web.jsx";
import "timer.jsx";

class Util3D {

    /**
     * render sphere
     */
    static function sphere(context:Context3D, size:number, div:int) : void {
        var ver = div;
        var hor = div*2;
        var sin = Math.sin;
        var cos = Math.cos;
        var pi = Math.PI;

        context.beginGroup(new Vector(0, 0, 0));
        for (var i=0; i<hor; i++) {
            var i1 = 0;
            var i2 = 1;
            var j1 = i+1;
            var j2 = i;
            context.renderPolygonGroup([
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
                context.renderPolygonGroup([
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
            context.renderPolygonGroup([
                new Vector(cos(2*pi*j1/hor)*sin(pi*i2/ver)*size, cos(pi*i2/ver)*size, sin(2*pi*j1/hor)*sin(pi*i2/ver)*size),
                new Vector(cos(2*pi*j2/hor)*sin(pi*i2/ver)*size, cos(pi*i2/ver)*size, sin(2*pi*j2/hor)*sin(pi*i2/ver)*size),
                new Vector(cos(2*pi*j2/hor)*sin(pi*i1/ver)*size, cos(pi*i1/ver)*size, sin(2*pi*j2/hor)*sin(pi*i1/ver)*size)
            ], new Color(128, 128, 255));
        }
        context.endGroup();

    }

    /**
     * render XZ floor tile
     */
    static function tile(context:Context3D, x:int, y:int, z:int, size:int, color:Color) : void {
        context.renderPolygon([
            new Vector(x-size/2, y, z-size/2),
            new Vector(x-size/2, y, z+size/2),
            new Vector(x+size/2, y, z+size/2),
            new Vector(x+size/2, y, z-size/2)
        ], color);
    }
    static function tileOnGroup(context:Context3D, x:int, y:int, z:int, size:int, color:Color) : void {
        context.renderPolygonGroup([
            new Vector(x-size/2, y, z-size/2),
            new Vector(x-size/2, y, z+size/2),
            new Vector(x+size/2, y, z+size/2),
            new Vector(x+size/2, y, z-size/2)
        ], color);
    }

}



class Player {

    var r : number;
    var x : number;
    var y : number;
    var z : number;
    var vx : number;
    var vy : number;
    var vz : number;
    var ax : number;
    var ay : number;
    var az : number;
    var rot : Quaternion;
    var radius : int;
    var isBraking : boolean;

    function constructor() {
        this.r = 12;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
        this.ax = 0;
        this.ay = -120;
        this.az = 0;
        this.rot = Quaternion.rotating(0, 1, 0, 0);
        this.radius = 8;
        this.isBraking = true;
    }

    function moveForward() : void {
        this.move(50, 0);
    }

    function move(dz:number, dx:number) : void {
        this.isBraking = false;

        var x = this.vx;
        var z = this.vz;
        var len = Math.sqrt(x*x+z*z);

        // z, x 自体がsin, cos ?
        if (Math.abs(z)>1e-9) z /= len;
        if (Math.abs(x)>1e-9) x /= len;

        var rad = Math.atan2(x, z);

        var sin = Math.sin(rad);
        var cos = Math.cos(rad);

        this.az = cos*dz - sin*dx;
        this.ax = sin*dz + cos*dx;
    }

    function brake() : void {
        this.isBraking = true;
    }

    function update(elapsedMsec:number) : void {
        var sec = elapsedMsec / 1000;

        this.vx += this.ax * sec;
        this.vy += this.ay * sec;
        this.vz += this.az * sec;

        this.vx = Math.min( 100, Math.max( -100, this.vx));
        this.vy = Math.min(3000, Math.max(-3000, this.vy));
        this.vz = Math.min( 100, Math.max( -100, this.vz));

        var dx = this.vx * sec;
        var dy = this.vy * sec;
        var dz = this.vz * sec;

        this.x += dx;
        this.y += dy;
        this.z += dz;

        var velocityDecl = (this.isBraking) ? 0.1 : 0.01;

        this.vx -= Math.abs(dx) * this.vx * velocityDecl;
        this.vz -= Math.abs(dz) * this.vz * velocityDecl;

        if (this.isBraking) {
            var decl = Math.pow(Math.E, -sec);
            this.az *= decl;
            this.ax *= decl;
        }

        var v = new Vector(dx, 0, dz);
        var c = v.cross(new Vector(0, 1, 0)).unitSelf();
        var q = Quaternion.rotating(v.abs()/this.r, c);

        this.rot.mulSelf(q);
    }


}



final class _Main {
    static function main(args:string[]) : void {

        var isStarted = false;

        Engine.loadImages(['./image/tree.png', './image/so-nya.png', './image/redbull_free.png', './image/sky1.jpg']);

        var engine = new Engine('canvas');

        engine.setSkyImage('./image/sky1.jpg');

        if (engine.isMobile()) {
            engine.camera.farZ = 200;
            engine.camera.updateMatrix();
        }

        var trees = new List.<Vector>([
            new Vector(-271, -3, 450),
            new Vector(-200, -3, 720),
            new Vector( 139, -3, 351),
            new Vector( 171, -3, 254),
            new Vector( 214, -3, 192),
            new Vector(-253, -3, 555),
            new Vector(  29, -3, 385),
            new Vector( -72, -3, 530),
            new Vector(  96, -3, 678),
            new Vector( -49, -3, 222)
        ]);
        var treeRadius = 20;


        var items = new List.<Vector>([
            new Vector( 149, -10, 724),
            new Vector( 107, -10, 483),
            new Vector( 279, -10, 551),
            new Vector(-295, -10, 261),
            new Vector( -16, -10, 225),
            new Vector(  95, -10, 165),
            new Vector( 264, -10, 161),
            new Vector( -50, -10, 325),
            new Vector(-169, -10, 254),
            new Vector( 271, -10, 401)
        ]);
        var itemRadius = 8;
        // for (var i=0; i<10; i++) {
        //     var x = Math.floor((Math.random()-0.5)*500);
        //     var z = Math.floor((Math.random()-0.5)*500);
        //     items.append(new Vector(x, -10, z));
        // }

        var player = new Player;

        engine.onUpdate = (elapsedMsec:number):void -> {

            if (!isStarted) return;

            player.update(elapsedMsec);

            var x = player.x;
            var y = player.y;
            var z = player.z;
            // 床との当たり判定
            if (
                ( -30 <= x && x <=  30 && -30 <= z && z <= 150) || // starting floor
                (-300 <= x && x <= 300 && 150 <= z && z <= 750) || // stage 1
                ( -30 <= x && x <=  30 && 750 <= z && z <= 810) ||
                ( -30 <= x && x <= 570 && 810 <= z && z <= 870)    // passage from stage 1 to stage 2
            ) {
                if (-player.radius*2 < y && y < 0) {
                    player.vy = - player.vy * 0.5;
                    player.y = 0;
                }
            }
            if (510 <= x && x <= 570 && 210 <= z && z <= 810) {    // stage 2
                var height = Math.floor((810 - z) / 30);
                if (height > 9) height = 19 - height;
                height *= 5;

                if (height-player.radius*2 < y && y < height) {
                    player.vy = - player.vy * 0.5;
                    player.y = height;
                }
            }
            


            // 木との当たり判定
            for (var n=trees.head; n; n=n.next()) {
                var tree = n.value;
                var dx = player.x - tree.x;
                var dy = player.y - tree.y;
                var dz = player.z - tree.z;

                var dr = treeRadius + player.radius;

                if (dx*dx+dy*dy+dz*dz < dr*dr) {
                    var normalVec = new Vector(dx, dy, dz).unitSelf();
                    var a = Math.sqrt(player.vx*player.vx+player.vy*player.vy+player.vz*player.vz);
                    player.ax += 2 * a * normalVec.x;
                    player.vy += 2 * a * normalVec.y;
                    player.az += 2 * a * normalVec.z;

                    player.x += normalVec.x * treeRadius / 4;
                    player.z += normalVec.z * treeRadius / 4;
                }
            }

            // アイテムとの当たり判定
            for (var n=items.head; n; n=n.next()) {
                var item = n.value;
                var dx = item.x - player.x;
                var dy = item.y - player.y;
                var dz = item.z - player.z;

                var dr = itemRadius + player.radius;

                if (dx*dx+dy*dy+dz*dz < dr*dr) {
                    items.remove(n);
                }
            }



            var target = new Vector(player.x, player.y, player.z);

            var z = - player.vz;
            var x = - player.vx;
            var len = Math.sqrt(z*z + x*x);
            if (len<1e-9) {
                z = -1;
                x = 0;
            } else {
                z /= len;
                x /= len;
            }


            var y = player.y;
            if (y < 0) y = -y / 2;
            var yOffset = 10;
            var xzVelocity = Math.sqrt(player.vx*player.vx+player.vz*player.vz);
            if (xzVelocity < 50) {
                yOffset -= (50 - xzVelocity) * 0.6;
            }
            var view =  new Vector(
                player.x + x*50,
                y*1.2 + yOffset,
                player.z + z*50
            );

            engine.camera.target = target;
            engine.camera.view = view;
            engine.camera.updateMatrix();

        };

        var totalElapsedMsec = 0;
        engine.onRender = (context:Context3D, elapsedMsec:number):void -> {
            totalElapsedMsec += elapsedMsec;

            context.translate(player.x, player.y-12, player.z);
            context.rotate(player.rot);
            Util3D.sphere(context, player.radius, 6);
            context.resetMatrix();

            var axis = Quaternion.rotating(Math.PI*totalElapsedMsec/1000, 0, 1, 0);

            for (var n=items.head; n; n=n.next()) {
                var item = n.value;
                var x = item.x;
                var y = item.y;
                var z = item.z;
                context.pushMatrix();
                context.translate(x, y, z);
                context.rotate(axis);
                context.renderTexture([
                    new Vector(-15,-10, 0),
                    new Vector( 15,-10, 0),
                    new Vector( 15, 10, 0),
                    new Vector(-15, 10, 0)
                ], './image/redbull_free.png', 2, 2, 1, 1);
                context.popMatrix();
            }

            for (var n=trees.head; n; n=n.next()) {
                var tree = n.value;
                var x = tree.x;
                var y = tree.y;
                var z = tree.z;
                context.pushMatrix();
                context.translate(x, y, z);
                context.renderBillboard(new Vector(0, 0, 0), 50, 34, './image/tree.png');
                context.popMatrix();
            }

            // context.translate(0, 0, 100);
            // context.rotate(axis);
            // context.renderTexture([
            //     new Vector(-30, -20, 0),
            //     new Vector( 30, -20, 0),
            //     new Vector( 30,  20, 0),
            //     new Vector(-30,  20, 0)
            // ], './image/so-nya.png');
            // context.resetMatrix();

            // for (var i=0; i<trees.length; i++) {
            //     context.renderBillboard(trees[i], 50, 30, './image/redbull_free.png');
            // }


            context.setDepth(5);
            context.beginGroup(new Vector(0, 0, 0), true);
            var grayColor = new Color(192, 192, 192);
            var size = 30;
            for (var i=0; i<6; i++) {
                Util3D.tileOnGroup(context, -15, -20, -15+i*size, size, grayColor);
                Util3D.tileOnGroup(context, +15, -20, -15+i*size, size, grayColor);
            }
            var lightGreen = new Color(160, 255, 160);
            var green = new Color(96, 255, 96);
            context.pushMatrix();
            context.translate(0, 0, 450);
            for (var i=0; i<20; i++) {
                for (var j=0; j<20; j++) {
                    var color = (i+j)%2==0 ? lightGreen : green;
                    Util3D.tileOnGroup(context, i*30-285, -20, j*30-285, 30, color);
                }
            }
            context.popMatrix();
            context.endGroup();

            context.beginGroup(new Vector(0, 0, 0), true);
            Util3D.tileOnGroup(context,-15, -20, 765, 30, green);
            Util3D.tileOnGroup(context,-15, -20, 795, 30, lightGreen);
            Util3D.tileOnGroup(context, 15, -20, 795, 30, green);
            Util3D.tileOnGroup(context, 15, -20, 765, 30, lightGreen);
            context.pushMatrix();
            context.translate(0, 0, 840);
            for (var i=0; i<2; i++) {
                for (var j=0; j<20; j++) {
                    var color = (i+j)%2==1 ? lightGreen : green;
                    Util3D.tileOnGroup(context, j*30-15, -20, i*30-15, 30, color);
                }
            }
            context.popMatrix();
            context.endGroup();


            context.pushMatrix();
            context.translate(540, 0, 510);
            for (var i=0; i<2; i++) {
                for (var j=0; j<20; j++) {
                    var y = j;
                    if (y > 9) y = 19 - y;
                    var color = (i+j)%2==0 ? lightGreen : green;
                    Util3D.tile(context, i*30-15, -20+y*5, 285-j*30, 30, color);
                }
            }
            context.popMatrix();
        };

        if (engine.isMobile()) {

            dom.window.addEventListener('devicemotion', (e:Event):void -> {
                var de = e as DeviceMotionEvent;

                var az = de.accelerationIncludingGravity.y * 30;
                var ax = de.accelerationIncludingGravity.x * 30 / 2;
                if (az < 0) {
                    player.brake();
                    az = 0;
                }
                player.move(az, ax);
            });

            dom.window.addEventListener('touchstart', (e:Event):void -> {
                if (!isStarted) isStarted = true;
                player.vy = 80;
            });

        } else {

            dom.window.document.addEventListener('keypress', (e:Event):void -> {
                if (!isStarted) isStarted = true;

                var ke = e as KeyboardEvent;
                var accel = 100;
                switch (ke.keyCode) {
                    case 119: // 'w'
                        player.move(accel, 0);
                        break;
                    case 115: // 's'
                        // player.move(0, 0);
                        player.brake();
                        break;
                    case 97:  // 'a'
                        player.move(0,-accel/2);
                        break;
                    case 100: // 'd'
                        // player.ax = 50;
                        player.move(0, accel/2);
                        break;
                    case 106: // 'j'
                        log items;
                        break;
                    case 107: // 'k'
                        break;
                    case 32:  // ' '
                        player.vy = 80;
                        break;
                }
            }, false);

        }

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
