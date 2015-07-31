var DOTS_MARGIN = 1; //CANVASの端からDOTの間
var DOTS_INTERVAL = 1; //DOTとDOTの間
var DOTS_WIDTH_NUM = 56; //DOTの個数(横)
var DOTS_HEIGHT_NUM = 24; //DOTの個数(縦)

var RECT_WIDTH = 15;
var RECT_HEIGHT = 15;

var CANVAS_WIDTH = DOTS_MARGIN + (RECT_WIDTH + DOTS_INTERVAL) * DOTS_WIDTH_NUM + DOTS_MARGIN;
var CANVAS_HEIGHT = DOTS_MARGIN + (RECT_HEIGHT + DOTS_INTERVAL) * DOTS_HEIGHT_NUM + DOTS_MARGIN;

function setup() {

    // canvasがbodyの最下部になるので移動させる
    var canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.parent("canvas_area");

    for (var i = 0; i < DOTS_HEIGHT_NUM; i++) {
        for (var j = 0; j < DOTS_WIDTH_NUM; j++) {
            var w = j * (RECT_WIDTH + DOTS_INTERVAL) + DOTS_MARGIN;
            var h = i * (RECT_HEIGHT + DOTS_INTERVAL) + DOTS_MARGIN;
            dots.push(new Dot(w, h));
        }
    }

    ds.stream().size(200).next(function (err, stream) {
        if (err) {
            console.log(err);
            return;
        }
        stream.forEach(function (data, index) {
            var num = parseInt(data.value.index, 10);
            dots[data.value.index].changeColor(data.value.color);
        });
    });
}

function draw() {
    background(255);
    dots.forEach(function (dot, index) {
        dot.display();
    });
}

// milkcocoa公式の方で描画されたら反映
ds.on('push', function (pushed) {
    var num = parseInt(pushed.value.index, 10); //一応
    dots[num].changeColor(pushed.value.color);
});

function mousePressed() {
    dots.forEach(function (dot, index) {
        dot.pressedOn();
        if (dot.isOvered(mouseX, mouseY)) {
            //dot.changeColor(currentColor);
            //console.log(dot.x + "," + dot.y);
            dot.changeColorWithPush(index, currentColor);
        }
    });
}

function mouseDragged() {
    dots.forEach(function (dot, index) {
        if (dot.isPressed() && dot.isOvered(mouseX, mouseY)) {
            //dot.changeColor(currentColor);
            //console.log(dot.x + "," + dot.y);
            dot.changeColorWithPush(index, currentColor);
        }
    });
}

function mouseReleased() {
    dots.forEach(function (dot, index) {
        dot.pressedOff();
    });
}