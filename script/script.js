var canvas = document.getElementById("blocksCanvas");
var ctx = canvas.getContext("2d");

//Ball
var x = canvas.width/2;
var y = canvas.height-50;
var dx = 2;
var dy = -2;
var ballRadius = 10;

//Bricks
var rows = 3;
var columns = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickSpace = 10;
var bricks = [];
var numbricks = rows * columns;
var contBricks = 0;
setupBricks();

//Paddle
var paddleHeight = 10;
var paddleWidth = 85;
var paddleX = (canvas.width-paddleWidth)/2;

//Keys
var rightPressed = false;
var leftPressed = false;

//Game
var score = 0;
var lvl = 0;
    

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//document.addEventListener("mousemove", mouseMoveHandler, false);

do {
    lvl = prompt("Ingrese el nivel 1 - 10");
switch (lvl) {
    case '1':
        lvl = 20;
        break;
    case '2':
        lvl = 18;
        break;
    case '3':
        lvl = 16;
        break;
    case '4':
        lvl = 14;
        break;
    case '5':
        lvl = 12;
        break;
    case '6':
        lvl = 11;
        break;
    case '7':
        lvl = 8;
        break;
    case '8':
        lvl = 6;
        break;
    case '9':
        lvl = 5;
        break;
    case '10':
        lvl = 3;
        break;
    case 'Nath':
        lvl = 10;
        break;
    default:
        lvl = 0;
        alert("Nivel incorrecto");
        break;
}
} while (lvl == 0);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

/*
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}
*/

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#66ff1a";
    ctx.fill();
    ctx.strokeStyle = "#006600";
    ctx.stroke();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2, false);
    ctx.fillStyle = "#b30000";
    ctx.fill();
    ctx.strokeStyle = "#9900cc";
    ctx.stroke();
    ctx.closePath();
}

function setupBricks() {
    for (let c = 0; c < columns; c++) {
        bricks [c] = [];
        for (let r = 0; r < rows; r++) {
            bricks[c][r] = {
                x: 0,
                y: 0,
                paint: 1
            };
        }
    }
}


function drawBricks() {
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
            if(bricks[c][r].paint == 1){
                var brickX = (c*(brickWidth+brickSpace))+30;
                var brickY = (r*(brickHeight+brickSpace))+30;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#a64dff";
                ctx.fill();
                ctx.strokeStyle = "#004d99";
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

function drawSpace() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#b30000";
    ctx.stroke();
    ctx.closePath();
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#004d99";
    ctx.fillText("Score: " + score, canvas.width/2-15, 20);
}

function drawNath(){
    ctx.font = "40px Arial";
    ctx.fillStyle = "pink";
    ctx.fillText("--- Love u ---", canvas.width/4 + 10, canvas.height/2);
}

function border() {
    if(x < ballRadius || x > canvas.width - ballRadius) {
        dx = -dx;
    }
    if(y < ballRadius) {
        dy = -dy;
    }
    else if (x > paddleX-ballRadius && x < paddleX + paddleWidth + ballRadius && y == canvas.height - paddleHeight - ballRadius){
            dy = -dy;
    }
    else if (y > canvas.height - ballRadius){
            alert("You've lost");
            document.location.reload();
        }
    }


function movePaddle(){
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

function collision() {
    for (c = 0; c < columns; c++) {
        for (r = 0; r < rows; r++) {
            var mb = bricks [c][r];
            if (x > mb.x-ballRadius && x < mb.x+brickWidth && y > mb.y-ballRadius && y < mb.y+brickHeight+ballRadius && mb.paint == 1) {
                dy = -dy;
                mb.paint = 0;
                contBricks ++;
                score ++;
            }
        }
    }
    if (contBricks == numbricks){
        alert ("You've won");
        document.location.reload();
    }
}

function draw() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
    border();
    movePaddle();
    drawSpace();
    collision();
    if(lvl == 10){
        drawNath();
    }
    x += dx;
    y += dy;
    
}


setInterval(draw, lvl);