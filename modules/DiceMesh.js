   
export const vertices = () => [
    [-1, -1,  1,  1], //0
    [ 1, -1,  1,  1], //1
    [ 1,  1,  1,  1], //2
    [-1,  1,  1,  1], //3
    [-1, -1, -1,  1], //4
    [ 1, -1, -1,  1], //5
    [ 1,  1, -1,  1], //6
    [-1,  1, -1,  1], //7
]

export const edges = [
    // backSide
    [7, 6, 5, 4],
    // leftSide
    [6, 2, 1, 5],
    // rightSide
    [3, 7, 4, 0],
    // frontSide
    [2, 3, 0, 1],
    // topSide
    [3, 2, 6, 7],
    // bottomSide
    [4, 5, 1, 0],
]

export const colors = ["#ffd500", "#b71234", "#ff5800", "#ffffff", "#009b48", "#0046ad"];