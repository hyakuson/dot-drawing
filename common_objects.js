/*
 * dot.jsやindex.html内のjsをまたいで共有するようなオブジェクトはここに定義
 */

//milkcocoa公式のアプリ名
//var mk = new MilkCocoa('dogi9jz8c16.mlkcca.com');
//MyDotのアプリ名
var mk = new MilkCocoa("readicr2c0wj.mlkcca.com");
var ds = mk.dataStore('dots');

/* パレットの現在選択中の色 */
var currentColor = "#000";

/* canvasに描画されるドットの集合体 */
var dots = new Array();

// 色を扱うオブジェクト
function Color(rgb) {
    var intRgb = rgb
        .replace("rgb(", "")
        .replace(")", "")
        .split(",")
        .map(function (val) {
            //スペースはparseIntで取り除かれる
            return parseInt(val);
        });
    this.r = intRgb[0], this.g = intRgb[1], this.b = intRgb[2];
}

Color.prototype = {
    red: function () {
        return this.r;
    },
    green: function () {
        return this.g;
    },
    blue: function () {
        return this.b;
    },
    add: function (r, g, b) {
        this.r += r;
        if (this.r > 255) this.r = 255;
        if (this.r < 0) this.r = 0;
        this.g += g;
        if (this.g > 255) this.g = 255;
        if (this.g < 0) this.g = 0;
        this.b += b;
        if (this.b > 255) this.b = 255;
        if (this.b < 0) this.b = 0;
    },
    getRGB: function () {
        return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    },
    getHex: function (rgb) {
        return "#" + ("0" + this.r.toString(16)).slice(-2) + ("0" + this.g.toString(16)).slice(-2) + ("0" + this.b.toString(16)).slice(-2);
    }
};

// ドットオブジェクト
function Dot(x, y) {
    this.x = x;
    this.y = y;
    this.width = RECT_WIDTH;
    this.height = RECT_HEIGHT;
    this.color = "#f5f5f5";
    this.pressed = false;
}

Dot.prototype = {
    display: function () {
        noStroke();
        rectMode(CORNER);
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    },
    pressedOn: function () {
        this.pressed = true;
    },
    pressedOff: function () {
        this.pressed = false;
    },
    isPressed: function () {
        return this.pressed;
    },
    changeColor: function (color) {
        // rgb(r,g,b)、#rrggbbどちらの形式も可能
        this.color = color;
    },
    changeColorWithPush: function (index, color) {
        var hexColor = new Color(color).getHex();
        console.log(index,hexColor);
        ds.push({
                "index": index,
                "color": hexColor
            });
            // push成功後、dotの色を変える
//            function(err, pushed) {
//                if (err) {
//                    console.log(err);
//                    return;
//                }
//                this.changeColor(pushed.value.color);
//            });
                this.changeColor(color);
    },
    isOvered: function (x, y) {
        return this.x <= x && this.x + this.width >= x && this.y <= y && this.y + this.height >= y;
    }
};