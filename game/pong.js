var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;

var x = canvas.width / 2;
var y = canvas.height - 30;

var ballSpeed = 3;
var dx = ballSpeed;
var dy = -ballSpeed;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;



function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
    }

    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
    }

    if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
        paddleX = canvas.width - paddleWidth;
    }
    } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
        paddleX = 0;
    }
    }



    x += dx;
    y += dy;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var interval = setInterval(draw, 10);