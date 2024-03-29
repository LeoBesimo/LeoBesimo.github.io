let canv;
let ctx;

let playerX = 10;
let playerY = 10;
let playerXVel = 1;
let playerYVel = 0;

let foodX = 15;
let foodY = 15;

let tc = 40;
let scl = 20;

let tail = [];
let tailLength = 5;

window.onload = function () {
    canv = document.getElementById("canvas");
    ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPressed);
    setInterval(game, 1000 / 15);
    tc = Math.floor(canv.width / scl);
}

function game() {
    update();
    draw();
    postUpdate();
}

function update() {
    playerX += playerXVel;
    playerY += playerYVel;

    if (playerX < 0)
        playerX = 0;
    else if (playerX >= tc)
        playerX = tc - 1;
    if (playerY < 0)
        playerY = 0;
    else if (playerY >= tc)
        playerY = tc - 1;

    if (playerX == foodX && playerY == foodY) {
        tailLength++;
        foodX = Math.floor(Math.random() * tc);
        foodY = Math.floor(Math.random() * tc);
    }

    while (tail.length > tailLength) {
        tail.shift();
    }

    for (let i = 0; i < tail.length; i++) {
        if (tail[i].x == playerX && tail[i].y == playerY)
            tailLength = 5;
    }
}

function postUpdate() {
    tail.push({ x: playerX, y: playerY });
}

function draw() {

    ctx.fillStyle = "#666666";
    ctx.fillRect(0, 0, canv.width, canv.height);

    for (let i = 0; i < canv.width / scl; i++) {
        for (let j = 0; j < canv.height / scl; j++) {
            if ((i + j) % 2 == 0) {
                ctx.fillStyle = "#555555";
                ctx.fillRect(i * scl, j * scl, scl, scl)
            }
        }
    }

    ctx.fillStyle = "#0000FF";
    ctx.fillRect(playerX * scl, playerY * scl, scl, scl);

    ctx.fillStyle = "#0000A0";
    for (let i = 0; i < tail.length; i++) {
        ctx.fillRect(tail[i].x * scl, tail[i].y * scl, scl, scl);
    }
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(foodX * scl, foodY * scl, scl, scl);
}

function keyPressed(evt) {
    if ((evt.keyCode == 37 || evt.keyCode == 65) && playerXVel != 1) {
        playerXVel = -1;
        playerYVel = 0;
    } else if ((evt.keyCode == 39 || evt.keyCode == 68) && playerXVel != -1) {
        playerXVel = 1;
        playerYVel = 0;
    }
    if ((evt.keyCode == 38 || evt.keyCode == 87) && playerYVel != 1) {
        playerXVel = 0;
        playerYVel = -1;
    } else if ((evt.keyCode == 40 || evt.keyCode == 83) && playerYVel != -1) {
        playerXVel = 0;
        playerYVel = 1;
    }
}