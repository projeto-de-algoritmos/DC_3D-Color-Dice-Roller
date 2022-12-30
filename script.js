import * as Dice from './modules/DiceMesh.js';
import * as Canvas from './modules/Canvas.js';


let iteration = 600;
const tickRate = 16;

let diceVertices;
let colorInit;

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
    colorInit = Math.round(Math.random()*5);
    diceVertices = Dice.vertices();
}

function loop() {
    Canvas.clearCanvas();
 
    let colorI = colorInit-1;
    Dice.edges.map((edge) => {
        
        colorI = (colorI+1)%6;
        Canvas.drawPolygon4(diceVertices[edge[0]], diceVertices[edge[1]], diceVertices[edge[2]], diceVertices[edge[3]], Dice.colors[colorI]);
        
        for(let i = 0; i < 4; i++) {
            Canvas.drawConnectPoints(diceVertices[edge[i]], diceVertices[edge[(i+1)%4]]);
        
        }
    });
}