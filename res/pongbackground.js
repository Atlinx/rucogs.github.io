const pongwindow = document.getElementById("pong");
const divRepr = document.getElementsByClassName("pong-back")[0];

const backgroundColor = "#f5f5f5";
const foregroundColor = "#dfdfdf";

initBackground();
    
var canvas,
    context,
    width = divRepr.getBoundingClientRect().width,
    height = Math.min(divRepr.getBoundingClientRect().height, window.innerHeight),
    posX = width / 2,
    posY = height / 2,
    velX = 1,
    velY = 1,
    ballRad = 20,
    playerOnePos = 0,
    playerTwoPos = 0,
    playerPadding = 20,
    playerOneActive = false,
    playerHeight = 125,
    playerWidth = 15,
    ballSpeed = 10,
    playerMoveSpeed = 10;
    
function initBackground() {
    canvas = document.createElement('canvas');

    canvas.style.willChange = "transform";
    if (!canvas)
        throw new Error("Unable to find canvas for background!");

    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext("2d");

    window.addEventListener("resize", resetSize);
    resetSize();


    posX = width / 2;
    posY = height / 2;

    velX = 1;
    velY = 1;

    window.requestAnimationFrame(frame, 50);
}

function resetSize() {
    width = divRepr.getBoundingClientRect().width;
    height = Math.min(divRepr.getBoundingClientRect().height, window.innerHeight);

    canvas.width = width;
    canvas.height = height;
}

function clear() {
    context.save();
    context.clearRect(0, 0, width, height);
    context.restore();
}

function updatePhysics() {

    posX += velX * ballSpeed;
    posY += velY * ballSpeed;

    if (velX > 0 && posX + ballRad >= width - playerPadding - playerWidth) { //Hit player two (right)
        playerOneActive = true;
        velX = -1;
    } else if (velX < 0 && posX - ballRad <= playerPadding + playerWidth) { //Hit player one (left)
        playerOneActive = false;
        velX = 1;
    }

    if (velY < 0 && posY - ballRad <= 0) { //Hit ceiling
        velY = 1;
    } else if (velY > 0 && posY + ballRad >= height) { //Hit floor
        velY = -1;
    }

    if(playerOneActive) {
        playerOnePos += playerMoveSpeed * ((playerOnePos < posY) ? 1 : -1);
    } else {
        playerTwoPos += playerMoveSpeed * ((playerTwoPos < posY) ? 1 : -1);
    }
}

function frame() {
    clear();

    updatePhysics();

    context.save();

    context.fillStyle = foregroundColor;

    context.rect(playerPadding, playerOnePos - (playerHeight / 2), playerWidth, playerHeight);
    context.fill();

    context.rect(width - playerPadding - playerWidth, playerTwoPos - (playerHeight / 2), playerWidth, playerHeight);
    context.fill();

    context.beginPath();
    context.arc(posX,posY,ballRad,0,2*Math.PI);

    context.restore();

    divRepr.style.background = 'url('+canvas.toDataURL()+')';
    window.requestAnimationFrame(frame);
}