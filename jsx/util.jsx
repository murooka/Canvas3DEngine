import "js/web.jsx";

/**
 * 二次元平面での汎用関数をまとめたクラス
 */
class Math2D {

    /**
     * ベクトルの外積
     */
    static function cross(x1:number, y1:number, x2:number, y2:number) : number {
        return x1*y2 - x2*y1;
    }

}



// クラス名をTimerにしたかった・・・
/**
 * 時間計測を行うタイマークラス
 */
class Stopwatch {

    var _elapsedMsec : number;
    var _startedMsec : Nullable.<number>;
    var _lastLapMsec : Nullable.<number>;

    function constructor() {
        this._elapsedMsec = 0;
        this._startedMsec = null;
    }

    function _currentMsec() : number {
        return Date.now();
    }

    function start() : void {
        assert this._startedMsec == null;

        this._startedMsec = this._lastLapMsec = this._currentMsec();
    }

    function stop() : void {
        assert this._startedMsec != null;

        this._elapsedMsec += this._currentMsec() - this._startedMsec;
        this._startedMsec = null;
        this._lastLapMsec = null;
    }

    function isStarted() : boolean {
        return this._startedMsec != null;
    }

    function isStopped() : boolean {
        return this._startedMsec == null;
    }

    /**
     * 前回lap関数を呼んだ時間(またはスタートさせた時間)からの経過時間をミリ秒で返す
     * @returns {number} 経過時間
     */
    function lap() : number {
        assert this._lastLapMsec != null;

        var currentMsec = this._currentMsec();
        var lapMsec = currentMsec - this._lastLapMsec;
        this._lastLapMsec = currentMsec;

        return lapMsec;
    }

    function getElapsedMsec() : number {
        return this._elapsedMsec;
    }

}



/**
 * ゲームでの１秒辺りのフレームの更新回数を計測するクラス
 */
class FpsManager {

    var _stopwatch : Stopwatch;
    var _recentlyMsecLog : number[];
    var _lastMsec : number;
    var _fpsElement : HTMLElement;
    var _enabledHtmlLog : boolean;
    var _enabledConsoleLog : boolean;

    function constructor() {
        var fpsElement = this.createFpsElement();
        dom.document.body.appendChild(fpsElement);

        this._fpsElement = fpsElement;
        this._stopwatch = new Stopwatch;
        this._recentlyMsecLog = [] : number[];
        this._lastMsec = 0;

        this._enabledHtmlLog = false;
        this._enabledConsoleLog = false;
    }

    function createFpsElement() : HTMLElement {
        var fpsElement = dom.createElement('span') as Nullable.<HTMLElement>;
        fpsElement.style.position = 'absolute';
        fpsElement.style.top      = '0px';
        fpsElement.style.left     = '0px';
        fpsElement.style.display  = 'none';
        fpsElement.innerHTML      = 'XXXfps';
        return fpsElement;
    }

    function setEnabledHtmlLog(b:boolean) : void {
        this._enabledHtmlLog = b;
        if (b) {
            this._fpsElement.style.display = null;
        } else {
            this._fpsElement.style.display = 'none';
        }
    }

    function setEnabledConsoleLog(b:boolean) : void {
        this._enabledConsoleLog = b;
    }

    function start() : void {
        this._stopwatch.start();
    }

    function lastLap() : number {
        return this._lastMsec;
    }

    /**
     * フレームを更新したタイミングで呼ぶことで、fpsを計算しdom要素またはconsoleに表示する
     */
    function update() : void {
        assert !this._stopwatch.isStopped();

        var lap = this._stopwatch.lap();
        this._lastMsec = lap;
        if (this._recentlyMsecLog.length < 1) {
            this._recentlyMsecLog.push(lap);
        } else {
            this._recentlyMsecLog.push(lap);
            this._recentlyMsecLog.shift();
        }

        var length = this._recentlyMsecLog.length;

        var totalMsec = 0;
        for (var i=0; i<length; i++) {
            totalMsec += this._recentlyMsecLog[i];
        }
        var fps = length / (totalMsec / 1000);

        if (this._fpsElement!=null && this._enabledHtmlLog) {
            this._fpsElement.innerHTML = fps.toFixed(1) + "fps";
        } else if (this._enabledConsoleLog) {
            log fps.toFixed(1) + "fps";
        }
    }

}


