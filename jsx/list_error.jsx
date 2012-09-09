

/**
 * @class リスト構造を表すクラス
 */
class List.<T> {

    var head : Nullable.<Node.<T>>;
    var length : int;

    function constructor() {
        this.head = null;
        this.length = 0;
    }

    override function toString() : string {
        var str = '';
        for (var n=this.head; n!=null; n=n.next()) {
            str += (n.value as string) + ',';
        }
        return str;
    }

}


/**
 * @class Listの１要素を表すクラス
 */
class Node.<T> {

    var value : T;
    var _next : Nullable.<Node.<T>>;

    function constructor(value:T) {
        this.value = value;
        this._next = null;
    }

    function next() : Nullable.<Node.<T>> {
        return this._next;
    }

}

class _Main {

    final static function main(args:string[]) : void {
        var list = new List.<int>();
    }

}
