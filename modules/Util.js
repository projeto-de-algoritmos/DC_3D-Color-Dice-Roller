const cos = (deg) => Math.cos(deg * (Math.PI/180));
const sin = (deg) => Math.sin(deg * (Math.PI/180));

export const rotationX = (deg) => [
    [1,        0,         0, 0],
    [0, cos(deg), -sin(deg), 0],
    [0, sin(deg),  cos(deg), 0],
    [0,        0,         0, 1],
];

export const rotationY = (deg) => [
    [ cos(deg), 0, sin(deg), 0],
    [        0, 1,        0, 0],
    [-sin(deg), 0, cos(deg), 0],
    [        0, 0,        0, 1],
];

export const rotationZ = (deg) => [
    [cos(deg), -sin(deg), 0, 0],
    [sin(deg),  cos(deg), 0, 0],
    [       0,         0, 1, 0], 
    [       0,         0, 0, 1],
];

export function normalOf3Points(pointB, pointA, pointC) {

    const x = 0, y = 1, z = 2;

    const vecAB = [pointA[x] - pointB[x], pointA[y] - pointB[y], pointA[z] - pointB[z]]
    const vecAC = [pointA[x] - pointC[x], pointA[y] - pointC[y], pointA[z] - pointC[z]]

    const normalX = vecAB[y]*vecAC[z] - vecAB[z]*vecAC[y];
    const normalY = vecAB[z]*vecAC[x] - vecAB[x]*vecAC[z];
    const normalZ = vecAB[x]*vecAC[y] - vecAB[y]*vecAC[x];

    return [normalX, normalY, normalZ]
}

export function multiplyMatrices(A, B) {
    //TODO implement Strassen algorithm
    let rowsA = A.length;
    let colsA = A[0].length;
    let rowsB = B.length;
    let colsB = B[0].length;
    let result = [[]];

    if (colsA != rowsB) return null;

    for (let i = 0; i < rowsA; i++) {
        result[i] = [];
        for (let j = 0; j < colsB; j++) {
            result[i][j] = 0;
            for (let k = 0; k < colsA; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    
    return result;
}
