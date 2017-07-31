window.initBackground = (function () {
"use strict";

var canvas,
    context,
    posX = 0,
    posY = 0,
    velX = 0,
    velY = 0,
    ballRad = 10,
    width = 0,
    height = 0,
    board = null,
    lastResize = 0,
    offscreen = null,
    canvasCtx;

function initBackground() {
    canvas = $("#bgGame canvas")[0];
    if (!canvas)
        throw new Error("Unable to find canvas for background!");

    offscreen = document.createElement("canvas");
    canvasCtx = canvas.getContext("2d");
    context = offscreen.getContext("2d");

    window.addEventListener("resize", resetSize);
    resetSize();

    posX = Math.random()*width;
    posY = Math.random()*(height-350)+350;

    velX = Math.random();
    velY = Math.random();
    var m = Math.sqrt(velX*velX + velY*velY);
    velX /= m;
    velY /= m;

    // 1200 x 600 pixels
    // pieces 150 x 50
    board = new Array( 8 * 5 );
    for (var i=0; i < board.length; i++)
        board[i] = true;

    frame();
}

function resetSize() {
    lastResize = (new Date()).getTime();

    width = window.innerWidth,
    height = window.innerHeight;

    offscreen.width = width;
    offscreen.height = height;

    canvas.width = width;
    canvas.height = height;
}

function clear() {
    context.clearRect(0,0,canvas.width,canvas.height);
}

function drawBoard() {
    var offsetX = width/2 - 600;

    for (var x=0;x<8;x++) {
        for (var y=0;y<5;y++) {
            if (board[x+y*8]) {
                context.rect(offsetX + x*150 + 5, y*50 + 5, 140, 40);
                context.fill();
            }
        }
    }
}

function updatePhysics() {
    var prevX = posX,
        prevY = posY;

    posX += velX;
    posY += velY;

    if (posX <= ballRad) {
        posX = ballRad + velX;
        velX = Math.abs(velX);
    } else if (posX >= width - ballRad) {
        posX = canvas.width - velX - ballRad;
        velX = -Math.abs(velX);
    }

    if (posY <= ballRad) {
        posY = ballRad + velY;
        velY = Math.abs(velY);
    } else if (posY >= height - ballRad) {
        posY = canvas.height - velY - ballRad;
        velY = -Math.abs(velY);
    }

    if (posX != prevX)
        posY += (Math.random()-0.5)/2;
    if (posY != prevY)
        posX += (Math.random()-0.5)/2;

    var offsetX = width/2  - 600;

    var blockXf = (posX - offsetX)/150,
        blockYf = posY / 50,
        blockX = Math.floor(blockXf),
        blockY = Math.floor(blockYf),
        prevBX = Math.floor((prevX - offsetX)/150),
        prevBY = Math.floor(prevY / 150);

    if (blockY < 5) {
        console.log(blockX, blockY);
    }

    if ( blockX >= 0 && blockX < 8 && blockY < 5 && board[blockX + blockY*8] ) {
        board[blockX + blockY*8] = false;
        var oX = (blockXf - blockX - 75)/(75*4);
        var oY = (blockYf - blockY - 25)/(25*4);

        velX += oX;
        velY += oY;

        if ( prevBX != blockX )
            velX *= (-1);
        if ( prevBY != blockY )
            velY *= (-1);

        for (var i=0;i<board.length;i++)
            if (board[i]) return false;
        return true;
    }

    return false;
}

function frame() {
    
    if (updatePhysics()) {
        canvasCtx.clearRect(0,0,width,height);
        return;
    }

    clear();

    if ( lastResize + 400 > (new Date()).getTime() ) {
        requestAnimationFrame(frame);
        return;
    }

    context.fillStyle = "#F6F6F6";
    drawBoard();

    posX += velX;
    posY += velY;

    context.fillStyle = "#EEE";

    context.beginPath();
    context.arc(posX,posY,ballRad,0,2*Math.PI);
    context.fill();

    if ( (new Date()).getTime() > lastResize + 200 ) {
        canvasCtx.clearRect(0,0,width,height);
        canvasCtx.drawImage(offscreen, 0, 0);
    }

    window.requestAnimationFrame(frame);
}

return initBackground;

})();
