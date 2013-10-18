import "../../lib/vector.jsx";
import "../../lib/matrix.jsx";
import "../../lib/quaternion.jsx";
import "../../lib/engine.jsx";
import "../../lib/list.jsx";
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
                new Vector(cos(2*pi*j2/hor)*sin(pi*i1/ver)*size, cos(pi*i1/ver)*size, sin(2*pi*j2/hor)*sin(pi*i1/ver)*size),
                new Vector(cos(2*pi*j1/hor)*sin(pi*i1/ver)*size, cos(pi*i1/ver)*size, sin(2*pi*j1/hor)*sin(pi*i1/ver)*size),
                new Vector(cos(2*pi*j2/hor)*sin(pi*i2/ver)*size, cos(pi*i2/ver)*size, sin(2*pi*j2/hor)*sin(pi*i2/ver)*size)
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

    static function tileRectXZ(context:Context3D, cx:int, cz:int, width:int, height:int, y:int, size:int, color1:Color, color2:Color) : void {
        var row = height / size;
        var col = width / size;

        context.beginGroup(new Vector(0, 0, 0), true);
        for (var i=0; i<row; i++) {
            for (var j=0; j<col; j++) {
                var color = (i+j)%2==0 ? color1 : color2;
                Util3D.tileOnGroup(context, cx-width/2+(j+0.5)*size, y, cz-height/2+(i+0.5)*size, size, color);
            }
        }
        context.endGroup();
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
        this.y = 10;
        this.z = 0;
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
        this.ax = 0;
        this.ay = -120;
        this.az = 0;
        this.rot = Quaternion.rotating(0, 1, 0, 0);
        this.radius = 8;
        this.isBraking = false;
    }

    function moveForward() : void {
        this.move(50, 0);
    }

    function move(dz:number, dx:number) : void {
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

    function unbrake() : void {
        this.isBraking = false;
    }

    function update(elapsedMsec:number) : void {
        var sec = elapsedMsec / 1000;
        if (sec > 0.1) sec = 0.1;

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

        var velocityDecl = (this.isBraking) ? 0.05 : 0.001;

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

    function bounce(normal:Vector) : void {
        var vdot = this.vx*normal.x + this.vy*normal.y + this.vz*normal.z;

        this.vx -= 1.5 * vdot * normal.x;
        this.vy -= 1.5 * vdot * normal.y;
        this.vz -= 1.5 * vdot * normal.z;
    }


}



class BlueBall {

    var isStarted : boolean;
    var engine : Engine;


    var player : Player;

    var trees : List.<Vector>;
    var treeRadius : int;
    var items : List.<Vector>;
    var itemRadius : int;

    var totalElapsedMsec : number;

    function constructor() {
        Engine.loadImages(['./image/tree.png', './image/so-nya.png', './image/redbull_free.png', './image/sky1.jpg']);

        this.isStarted = false;


        // engine setting
        this.engine = new Engine('canvas');
        this.engine.setSkyImage('./image/sky1.jpg');

        if (this.engine.isMobile()) {
            this.engine.camera.farZ = 200;
            this.engine.camera.fovyX = Math.PI / 4;
            this.engine.camera.updateMatrix();
        }


        // player and objects setting
        this.player = new Player;
        this._initTrees();
        this._initItems();

        var gameUpdate = (elapsedMsec:number):void -> {
            this._checkCollisionWithFloor(elapsedMsec);
            this._checkCollisionWithTrees();
            this._checkCollisionWithItems();
            this._updateViewpoint();
        };
        var clearedUpdate = (elapsedMsec:number):void -> {
            this._updateClearedPlayer(elapsedMsec);
            this._updateClearedViewpoint();
        };
        var update = gameUpdate;

        var gameRender = (context:Context3D):void -> {
            this._renderPlayer(context);
            this._renderTrees(context);
            this._renderItems(context);
            this._renderField(context);
        };
        var clearedRender = (context:Context3D):void -> {
            this._renderPlayer(context);
            this._renderField(context);
        };
        var render = gameRender;

        var isCleared = false;

        // update
        this.engine.onUpdate = (elapsedMsec:number):void -> {
            if (!this.isStarted) return;
            if (this.player.y < -1000) {
                // game over
                this.player = new Player;
                this.isStarted = false;
            }

            // game clear
            if (!isCleared &&
                (1050 <= this.player.x && this.player.x <= 1110) &&
                (1350 <= this.player.z && this.player.z <= 1410))
            {
                update = clearedUpdate;
                render = clearedRender;
                isCleared = true;
            }
            update(elapsedMsec);
        };

        // render
        var backgroundColor = new Color( 90, 135, 150);
        this.engine.onRender = (context:Context3D, elapsedMsec:number):void -> {
            this.totalElapsedMsec += elapsedMsec;
            context.setBackgroundColor(backgroundColor);
            render(context);
        };


        // operation setting
        if (this.engine.isMobile()) {
            this._setMobileOperation();
        } else {
            this._setPCOperation();
        }
    }

    function _initTrees() : void {
        this.trees = new List.<Vector>([
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
        this.treeRadius = 24;
    }

    function _initItems() : void {
        this.items = new List.<Vector>([
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
        this.itemRadius = 8;
    }

    function _checkCollisionWithFloor(elapsedMsec:number) : void {
        var player = this.player;

        player.update(elapsedMsec);

        var x = player.x;
        var y = player.y;
        var z = player.z;
        // 床との当たり判定
        if (
                ( -30 <= x && x <=  30 && -30 <= z && z <= 150) || // starting floor
                (-300 <= x && x <= 300 && 150 <= z && z <= 750) || // stage 1
                ( -30 <= x && x <=  30 && 750 <= z && z <= 810) ||
                ( -30 <= x && x <= 570 && 810 <= z && z <= 870) || // passage from stage 1 to stage 2
                ( 510 <= x && x <=1110 && 150 <= z && z <= 210) || // passage from stage 2 to stage 3
                (1050 <= x && x <=1110 && 750 <= z && z <=1350)    // passage from stage 3 to goal
           ) {
            if (-player.radius*2 < y && y < 0) {
                player.bounce(new Vector(0, 1, 0));
                player.y = 0;
            }
        }
        if (510 <= x && x <= 570 && 510 <= z && z <= 810) {    // stage 2 first
            var height = Math.floor((810 - z) / 30);
            height *= 5;
            if (height-player.radius*2 < y && y < height) {
                player.bounce(new Vector(0, 30, 5).unitSelf());
                player.y = height;
            }
        }
        if (510 <= x && x <= 570 && 210 <= z && z < 510) {    // stage 2 first
            var height = Math.floor((z - 210) / 30);
            height *= 5;
            if (height-player.radius*2 < y && y < height) {
                player.bounce(new Vector(0, 30, -5).unitSelf());
                player.y = height;
            }
        }
        if (1110<= x && x <=1270 && 150 <= z && z <= 810) {
            var height = (x - 1110) / 160 * 80;
            if (height-player.radius*2 < y && y < height) {
                player.bounce(new Vector(-1, 2, 0).unitSelf());
                player.y = height;
            }
        }
    }

    function _checkCollisionWithTrees() : void {
        var player = this.player;

        this.trees.forEach((tree) -> {
            var dx = player.x - tree.x;
            var dy = player.y - tree.y;
            var dz = player.z - tree.z;

            var dr = this.treeRadius + player.radius;

            if (dx*dx+dy*dy+dz*dz < dr*dr) {
                var normalVec = new Vector(dx, dy, dz).unitSelf();
                var a = Math.sqrt(player.vx*player.vx+player.vy*player.vy+player.vz*player.vz);
                player.ax += 2 * a * normalVec.x;
                player.vy += 2 * a * normalVec.y;
                player.az += 2 * a * normalVec.z;

                player.x += normalVec.x * this.treeRadius / 4;
                player.z += normalVec.z * this.treeRadius / 4;
            }
        });

    }

    function _checkCollisionWithItems() : void {
        var player = this.player;
        var items = this.items;
        var radius = this.itemRadius;

        for (var n=items.head; n; n=n.next()) {
            var item = n.value;
            var dx = item.x - player.x;
            var dy = item.y - player.y;
            var dz = item.z - player.z;

            var dr = radius + player.radius;

            if (dx*dx+dy*dy+dz*dz < dr*dr) {
                items.remove(n);
            }
        }
    }

    function _updateViewpoint() : void {
        var player = this.player;

        var dz = - player.vz;
        var dx = - player.vx;
        var len = Math.sqrt(dz*dz + dx*dx);
        if (len<1e-9) {
            dz = -1;
            dx = 0;
        } else {
            dz /= len;
            dx /= len;
        }

        var y = player.y;
        if (y < 0) {
            y = Math.max(y, -300);
            y = -y / 2;
        }
        var yOffset = 10;
        var xzVelocity = Math.sqrt(player.vx*player.vx+player.vz*player.vz);
        if (xzVelocity < 50) {
            yOffset -= (50 - xzVelocity) * 0.6;
        }

        var view =  new Vector(
            player.x + dx*50,
            y*1.2 + yOffset,
            player.z + dz*50
        );
        var target = new Vector(
            player.x,
            player.y,
            player.z
        );

        this.engine.camera.target = target;
        this.engine.camera.view = view;
        this.engine.camera.updateMatrix();
    }

    function _updateClearedPlayer(elapsedMsec:number) : void {
        var player = this.player;
        var dx = player.x - 1080;
        var dy = player.y - 20;
        var dz = player.z - 1380;
        if (Math.abs(dx) < 1 && Math.abs(dz) < 1) {
            player.y -= Math.sin(this.totalElapsedMsec/1000) * 10 * elapsedMsec / 1000;
        } else {
            player.x -= dx * elapsedMsec / 1000;
            player.y -= dy * elapsedMsec / 1000;
            player.z -= dz * elapsedMsec / 1000;
        }
    }

    function _updateClearedViewpoint() : void {
        var player = this.player;
        var view =  new Vector(
            player.x + Math.sin(this.totalElapsedMsec/5000)*50,
            player.y + 20,
            player.z + Math.cos(this.totalElapsedMsec/5000)*50
        );
        var target = new Vector(
            player.x,
            player.y,
            player.z
        );

        this.engine.camera.target = target;
        this.engine.camera.view = view;
        this.engine.camera.updateMatrix();
    }

    function _renderPlayer(context:Context3D) : void {
        if (this.player.y < -this.player.radius) context.setDepth(5);
        else                                     context.setDepth(3);

        context.translate(this.player.x, this.player.y-12, this.player.z);
        context.rotate(this.player.rot);
        Util3D.sphere(context, this.player.radius, 6);
        context.resetMatrix();
    }

    function _renderTrees(context:Context3D) : void {
        context.setDepth(3);
        this.trees.forEach((tree) -> {
            var x = tree.x;
            var y = tree.y;
            var z = tree.z;
            context.pushMatrix();
            context.translate(x, y, z);
            context.renderBillboard(new Vector(0, 0, 0), 50, 34, './image/tree.png');
            context.popMatrix();
        });
    }

    function _renderItems(context:Context3D) : void {
        context.setDepth(3);
        var rad = Math.PI * this.totalElapsedMsec / 1000;
        var axis = Quaternion.rotating(rad, 0, 1, 0);

        this.items.forEach((item) -> {
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
        });
    }

    function _renderField(context:Context3D) : void {
        var gray= new Color(192, 192, 192);
        var lightGreen = new Color(160, 255, 160);
        var green = new Color(96, 255, 96);
        var size = 30;

        context.setDepth(4);

        // starting floor
        Util3D.tileRectXZ(context,   0,  60,  60, 180, -20, size, gray, gray);
        // stage 1
        Util3D.tileRectXZ(context,   0, 450, 600, 600, -20, size, lightGreen, green);
        // passage from stage 1 to stage 2
        Util3D.tileRectXZ(context,   0, 780,  60,  60, -20, size, green, lightGreen);
        // passage from stage 1 to stage 2
        Util3D.tileRectXZ(context, 270, 840, 600,  60, -20, size, green, lightGreen);

        // stage 2
        context.pushMatrix();
        context.beginGroup(new Vector(0, 0, 0), true);
        context.translate(510, 0, 510);
        for (var i=0; i<10; i++) {
            for (var j=0; j<2; j++) {
                var color = (i+j)%2==0 ? lightGreen : green;
                Util3D.tileOnGroup(context, j*size+size/2, -20+(9-i)*5, i*size+size/2, size, color);
            }
        }
        for (var i=0; i<10; i++) {
            for (var j=0; j<2; j++) {
                var color = (i+j)%2==0 ? lightGreen : green;
                Util3D.tileOnGroup(context, j*size+size/2, -20+(9-i)*5, -i*size-size/2, size, color);
            }
        }
        context.endGroup();
        context.popMatrix();

        // passage from stage 2 to stage 3
        Util3D.tileRectXZ(context, 810, 180, 600,  60, -20, size, green, lightGreen);

        // stage 3
        context.pushMatrix();
        context.beginGroup(new Vector(0, 0, 0), true);
        context.translate(1110, 0, 150);
        for (var i=0; i<4; i++) {
            for (var j=0; j<22; j++) {
                var color = (i+j)%2==0 ? lightGreen : green;
                context.renderPolygonGroup([
                    new Vector(    i*40,     -20+i*20,     j*size),
                    new Vector(    i*40,     -20+i*20, (j+1)*size),
                    new Vector((i+1)*40, -20+(i+1)*20, (j+1)*size),
                    new Vector((i+1)*40, -20+(i+1)*20,     j*size)
                ], color);
            }
        }
        context.endGroup();
        context.popMatrix();

        Util3D.tileRectXZ(context,1080,1050,  60, 600, -20, size, green, lightGreen);

        Util3D.tileRectXZ(context,1080,1380,  60,  60, -20, size/2, new Color(0xff, 0xd7, 0x00), new Color(0xff, 0xff, 255));

        context.setDepth(3);
    }

    function _setMobileOperation() : void {
        dom.window.addEventListener('devicemotion', (e:Event):void -> {
            var de = e as DeviceMotionEvent;

            var az = de.accelerationIncludingGravity.y * 30;
            var ax = de.accelerationIncludingGravity.x * 30 / 2;
            az = Math.min(az, 120);
            if (az < -60) {
                this.player.brake();
                this.player.move(0, ax/4);
             }else if (az < 0) {
                this.player.unbrake();
                this.player.move(0, ax/2);
            } else {
                this.player.unbrake();
                this.player.move(az, ax);
            }
        });

        dom.window.addEventListener('touchstart', (e:Event):void -> {
            if (!this.isStarted) {
                this.isStarted = true;
                this.player.vz = 100;
            } else {
                this.player.vy = 80;
            }
        });
    }

    function _setPCOperation() : void {
        dom.window.document.addEventListener('keypress', (e:Event):void -> {
            if (!this.isStarted) {
                this.isStarted = true;
                this.player.vz = 100;
                return;
            }

            var ke = e as KeyboardEvent;
            var accel = 100;
            switch (ke.keyCode) {
                case 119: // 'w'
                    this.player.unbrake();
                    this.player.move(accel, 0);
                    break;
                case 115: // 's'
                    this.player.brake();
                    break;
                case 97:  // 'a'
                    this.player.unbrake();
                    this.player.move(0,-accel/2);
                    break;
                case 100: // 'd'
                    this.player.unbrake();
                    this.player.move(0, accel/2);
                    break;

                // vim like key mapping :-)
                case 104: // 'h'
                    this.player.unbrake();
                    this.player.move(0,-accel/2);
                    break;
                case 106: // 'j'
                    this.player.brake();
                    break;
                case 107: // 'k'
                    this.player.unbrake();
                    this.player.move(accel, 0);
                    break;
                case 108: // 'l'
                    this.player.unbrake();
                    this.player.move(0, accel/2);
                    break;

                case 32:  // ' '
                    this.player.vy = 80;
                    break;
            }
        }, false);
    }



    function run() : void {
        this.engine.start();
    }


}



final class _Main {
    static function main(args:string[]) : void {

        var game = new BlueBall;
        game.run();

    }

}
