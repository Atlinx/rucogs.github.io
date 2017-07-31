"use strict";

var canvas,
    context;

var gridHeight,
    gridWidth,
    grid;

function initBackground() {
    canvas = $("#bgGame canvas")[0];
    if (!canvas)
        throw new Error("Unable to find canvas for background!");
    context = canvas.getContext("2d");

    window.addEventListener("resize", resetSize);
    resetSize();

    frame();
}

function resetSize() {
    var w = window.innerWidth,
        h = window.innerHeight;

    canvas.width = w;
    canvas.height = h;

    gridWidth = Math.floor(w/20);
    gridHeight = Math.floor(h/20);

    grid = new Array(gridWidth * gridHeight);
    for (var i=0;i<grid.length;i++) {
        grid[i] = null;
    }
}

function drawGrid() {
    for (var x=0;x<gridWidth;x++) {
        for (var y=0;y<gridHeight;y++) {
            drawPiece( x, y, grid[x + y*gridWidth] );
        }
    }
}

function drawPiece(x, y, piece) {
    if (piece) {
        setColor(piece);
        context.rect(x*20,y*20,20,20);
        context.fill();
    }
}

function color(r,g,b,a) {
    return {r:r,g:g,b:b,a:a};
}

function setColor(c) {
    context.fillStyle = "rgba("+c.r+","+c.g+","+c.b+","+c.a+")";
}

function frame() {
    context.clearRect(0,0,canvas.width,canvas.height);

    drawGrid();

    window.requestAnimationFrame(frame);
}
