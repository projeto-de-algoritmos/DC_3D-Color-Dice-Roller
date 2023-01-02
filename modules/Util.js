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

export function multiplyMatrices4x4(A, B) {
    return strassen(A, B);
}

function strassen(A, B) {
    if (A.length == 1 && B.length == 1) {
        return [[A[0][0] * B[0][0]]];
    }

    const [A11, A12, A21, A22] = slice(A);
    const [B11, B12, B21, B22] = slice(B);

    const M1 = strassen(add(A11, A22), add(B11, B22));
    const M2 = strassen(add(A21, A22), B11);
    const M3 = strassen(A11, subtract(B12, B22));
    const M4 = strassen(A22, subtract(B21, B11));
    const M5 = strassen(add(A11, A12), B22);
    const M6 = strassen(subtract(A21, A11), add(B11, B12));
    const M7 = strassen(subtract(A12, A22), add(B21, B22));
  
    const C11 = add(subtract(add(M1, M4), M5), M7);
    const C12 = add(M3, M5);
    const C21 = add(M2, M4);
    const C22 = add(subtract(add(M1, M3), M2), M6);

    return combine(C11, C12, C21, C22);
}

function slice(A) {
    const quadrantSize = Math.round(A.length / 2);
    const A11 = A.slice(0, quadrantSize).map(row => row.slice(0, quadrantSize));
    const A12 = A.slice(0, quadrantSize).map(row => row.slice(quadrantSize));
    const A21 = A.slice(quadrantSize).map(row => row.slice(0, quadrantSize));
    const A22 = A.slice(quadrantSize).map(row => row.slice(quadrantSize));
    
    return [A11, A12, A21, A22];
}

function add(A, B) {
    const result = [];

    for (let i = 0; i < A.length; i++) {
        result.push([]);
        for (let j = 0; j < A[i].length; j++) {
            result[i][j] = A[i][j] + B[i][j];
        }
    }

    return result;
}

function subtract(A, B) {
    const result = [];

    for (let i = 0; i < A.length; i++) {
        result.push([]);
        for (let j = 0; j < A[i].length; j++) {
            result[i][j] = A[i][j] - B[i][j];
        }
    }

    return result;
}

function combine(c11, c12, c21, c22) {
    const result = [];

    for (let i = 0; i < c11.length; i++) {
        result.push(c11[i].concat(c12[i]));
    }

    for (let i = 0; i < c21.length; i++) {
        result.push(c21[i].concat(c22[i]));
    }

    return result;
}
  