

/**
 * @class 双方向リスト構造を表すクラス
 */
class List.<T> {

    var head : Nullable.<Node.<T>>;
    var tail : Nullable.<Node.<T>>;
    var length : int;

    function constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    function constructor(array:T[]) {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    function prepend(value:T) : List.<T> {
        var node = new Node.<T>(value);

        if (this.length==0) {
            this.head = node;
            this.tail = node;
        } else {
            node._next = this.head;
            this.head._prev = node;

            this.head = node;
        }

        this.length++;
        return this;
    }

    function append(value:T) : List.<T> {
        var node = new Node.<T>(value);

        if (this.length==0) {
            this.head = node;
            this.tail = node;
        } else {
            node._prev = this.tail;
            this.tail._next = node;

            this.tail = node;
        }

        this.length++;
        return this;
    }

    function removeFirst() : T {
        var node = this.head;

        this.head = node._next;
        if (node._next != null) node._next._prev = null;

        this.length--;
        return node.value;
    }

    function removeLast() : T {
        var node = this.tail;

        this.tail = node._prev;
        if (node._prev != null) node._prev._next = null;

        this.length--;
        return node.value;
    }

    function insertAfter(node:Node.<T>, value:T) : List.<T> {
        var newNode = new Node.<T>(value);

        if (node.next() == null) {
            newNode._prev = node;
            node._next = newNode;
            this.tail = newNode;
        } else {
            newNode._next = node._next;
            newNode._prev = node;
            node._next._prev = newNode;
            node._next = newNode;
        }

        this.length++;
        return this;
    }

    function insertBefore(node:Node.<T>, value:T) : List.<T> {
        var newNode = new Node.<T>(value);

        if (node.prev() == null) {
            newNode._next = node;
            node._prev = newNode;
            this.head = newNode;
        } else {
            newNode._next = node;
            newNode._prev = node._prev;
            node._prev._next = newNode;
            node._prev = newNode;
        }

        this.length++;
        return this;
    }

    override function toString() : string {
        var str = 'list : [';
        for (var n=this.head; n!=null; n=n.next()) {
            str += ' ' + n.value.toString() + ',';
        }
        str += ']';
        return str;
    }

}


/**
 * @class Listの１要素を表すクラス
 */
class Node.<T> {

    var value : T;
    var _prev : Nullable.<Node.<T>>;
    var _next : Nullable.<Node.<T>>;

    function constructor(value:T) {
        this.value = value;
        this._prev = null;
        this._next = null;
    }

    function prev() : Nullable.<Node.<T>> {
        return this._prev;
    }

    function next() : Nullable.<Node.<T>> {
        return this._next;
    }

}
