const $canvas = document.getElementById("canvas");
const width = window.innerWidth*0.9;
const height = window.innerHeight*0.9;

$canvas.width = width;
$canvas.height = height;

const canvas = $canvas.getContext('2d');
const pointsDistance = 200.0;


export function drawConnectPoints(a, b) {
    const [x1, y1] = convert2CanvasCord(a);
    const [x2, y2] = convert2CanvasCord(b);
    canvas.beginPath();
    canvas.moveTo(x1, y1);
    canvas.lineTo(x2, y2);
    canvas.lineWidth = 3;
    canvas.stroke();
}

export function drawPolygon4(a, b, c, d, color) {
    const [x1, y1] = convert2CanvasCord(a);
    const [x2, y2] = convert2CanvasCord(b);
    const [x3, y3] = convert2CanvasCord(c);
    const [x4, y4] = convert2CanvasCord(d);

    canvas.beginPath();
    canvas.fillStyle = color;
    canvas.moveTo(x1, y1);
    canvas.lineTo(x2, y2);
    canvas.lineTo(x3, y3);
    canvas.lineTo(x4, y4);
    canvas.closePath();
    canvas.fill();
}

function convert2CanvasCord([x, y]) {
    return [(width/2)-(x*pointsDistance/2), (height/2)-(y*pointsDistance/2)];
}