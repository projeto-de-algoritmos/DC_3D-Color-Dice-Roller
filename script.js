import * as Dice from './modules/DiceMesh.js';
import * as Canvas from './modules/Canvas.js';
import * as Util from './modules/Util.js';

let iteration = 207*2;
const tickRate = 4;

let diceVertices;
let colorI;

window.onload = () => {
    window.addEventListener("contextmenu", e => e.preventDefault());
    setup();
    const interval = setInterval(() => {
        iteration--;
        if(iteration <= 0) clearInterval(interval);
        loop()
    }, tickRate);
}

function setup() {
    colorI = Math.trunc(Math.random()*6);
    diceVertices = Dice.vertices();
}

function loop() {
    Canvas.clearCanvas();

    diceVertices = multiplyDiceVertices(diceVertices, Util.rotationX(1.5));
    diceVertices = multiplyDiceVertices(diceVertices, Util.rotationY(0.5));
    diceVertices = multiplyDiceVertices(diceVertices, Util.rotationZ(1));
    
    Dice.edges.map((edge) => {
        
        colorI = (colorI+1)%6;

        const [nX, nY, nZ] = Util.normalOf3Points(diceVertices[edge[0]], diceVertices[edge[1]], diceVertices[edge[2]]);
        if(nZ > 0) return;
        
        Canvas.drawPolygon4(diceVertices[edge[0]], diceVertices[edge[1]], diceVertices[edge[2]], diceVertices[edge[3]], Dice.colors[colorI]);
        
        for(let i = 0; i < 4; i++) {
            Canvas.drawConnectPoints(diceVertices[edge[i]], diceVertices[edge[(i+1)%4]]);
        }
        
    });
}

function multiplyDiceVertices(diceVertices, matrix) {
    const diceVertices11 = diceVertices.slice(0, 4).map(row => row.slice(0, 4));
    const diceVertices12 = diceVertices.slice(4).map(row => row.slice(0, 4));

    const result11 = Util.multiplyMatrices4x4(diceVertices11, matrix);
    const result12 = Util.multiplyMatrices4x4(diceVertices12, matrix);

    return result11.concat(result12);
}