import * as Dice from './modules/DiceMesh.js';
import * as Canvas from './modules/Canvas.js';
import * as Util from './modules/Util.js';

let iteration = 207*2;
const tickRate = 4;

let diceVertices;
let diceColorI;
let inputColors = [];

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
    diceColorI = Math.trunc(Math.random()*6);
    inputColors = loadColors();
    diceVertices = Dice.vertices();
}

function loop() {
    Canvas.clearCanvas();

    diceVertices = multiplyDiceVertices(diceVertices, Util.rotationX(1.5));
    diceVertices = multiplyDiceVertices(diceVertices, Util.rotationY(0.5));
    diceVertices = multiplyDiceVertices(diceVertices, Util.rotationZ(1));
    
    Dice.edges.map((edge) => {
        
        diceColorI = (diceColorI+1)%6;

        const [nX, nY, nZ] = Util.normalOf3Points(diceVertices[edge[0]], diceVertices[edge[1]], diceVertices[edge[2]]);
        if(nZ > 0) return;
        
        Canvas.drawPolygon4(diceVertices[edge[0]], diceVertices[edge[1]], diceVertices[edge[2]], diceVertices[edge[3]], inputColors[diceColorI]);
        
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

function loadColors() {
    const $colors = document.getElementById('colors');
    
    if(localStorage.getItem("colors") === null) {
        localStorage.setItem("colors", Dice.colors.toString());
    }
    let colorHex = localStorage.getItem("colors").split(',');
    
    let colorIndex = 0;
    for (const $color of $colors.children) {
        $color.value = colorHex[colorIndex];
        $color.addEventListener("change", (e) => {
            colorHex[Array.from($colors.children).indexOf($color)] = e.target.value;
            localStorage.setItem("colors", colorHex.toString());
        });
        colorIndex++;
    }

    return localStorage.getItem("colors").split(',');;
}