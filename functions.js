'use strict';
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const closed = document.createElement("canvas");
const ctx2 = closed.getContext("2d");
const flag = document.createElement("canvas");
const ctx3 = flag.getContext("2d");
const falseFlag = document.createElement("canvas");
const ctx4 = falseFlag.getContext("2d");
const mine = document.createElement("canvas");
const ctx5 = mine.getContext("2d");
const grid = 16;
const size = 50;
const canvasx = canvas.offsetLeft;
const canvasy = canvas.offsetTop;

var game = [];
var field = [];
var lvl = 1;
var mousedown = false;
var ghost = [];
var buffer = [];
var opened = 0;

//

canvas.height = size * grid + size + 1;
canvas.width = size * grid + size + 1;

ctx.fillStyle = "#6b6b6b";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx2.fillStyle = "#efefef";
ctx2.fillRect(0, 0, grid, grid);
ctx2.fillStyle = "#7b7b7b";
ctx2.beginPath();
ctx2.moveTo(0, grid);
ctx2.lineTo(grid, grid);
ctx2.lineTo(grid, 0);
ctx2.fill();
ctx2.fillStyle = "#bdbdbd";
ctx2.fillRect(2, 2, grid - 4, grid - 4);

ctx3.strokeStyle = "#000000";
ctx3.lineWidth = 2;
ctx3.moveTo(6, 12);
ctx3.lineTo(13, 12);
ctx3.moveTo(10, 3);
ctx3.lineTo(10, 12);
ctx3.stroke();
ctx3.fillStyle = "#ff0000";
ctx3.moveTo(9, 3);
ctx3.lineTo(4, 6);
ctx3.lineTo(9, 9);
ctx3.fill();

ctx4.strokeStyle = "#ff0000";
ctx4.lineWidth = 2;
ctx5.lineCap = "square";
ctx4.moveTo(3, 3);
ctx4.lineTo(13, 13);
ctx4.moveTo(3, 13);
ctx4.lineTo(13, 3);
ctx4.stroke();

ctx5.strokeStyle = "#000000";
ctx5.lineWidth = 2;
ctx5.lineCap = "square";
ctx5.moveTo(2, 8);
ctx5.lineTo(14, 8);
ctx5.moveTo(8, 2);
ctx5.lineTo(8, 14);
ctx5.moveTo(4, 4);
ctx5.lineTo(12, 12);
ctx5.moveTo(4, 12);
ctx5.lineTo(12, 4);
ctx5.stroke();
ctx5.fillStyle = "#000000";
ctx5.beginPath();
ctx5.arc(8, 8, 5, 0, 2 * Math.PI);
ctx5.fill();
ctx5.fillStyle = "#ffffff";
ctx5.fillRect(5, 5, 2, 2);

newGame();

//

function draw(y, x, i) {
    game[y][x] = i;
    switch (i) {
        case "":
            ctx.drawImage(closed, x * grid + x + 1, y * grid + y + 1);
            break;
        case "E":
            openCell(y, x, "#bdbdbd");
            break;
        case "F":
            ctx.drawImage(flag, x * grid + x + 1, y * grid + y + 1);
            break;
        case "X":
            ctx.drawImage(falseFlag, x * grid + x + 1, y * grid + y + 1);
            break;
        case "m":
            openCell(y, x, "#bdbdbd");
            ctx.drawImage(mine, x * grid + x + 1, y * grid + y + 1);
            break;
        case "M":
            openCell(y, x, "#ff0000");
            ctx.drawImage(mine, x * grid + x + 1, y * grid + y + 1);
            break;
        case 1:
            openCell(y, x, "#bdbdbd");
            drawNumber(y, x, "#0000ff", i);
            break;
        case 2:
            openCell(y, x, "#bdbdbd");
            drawNumber(y, x, "#008800", i);
            break;
        case 3:
            openCell(y, x, "#bdbdbd");
            drawNumber(y, x, "#ff0000", i);
            break;
        case 4:
            openCell(y, x, "#bdbdbd");
            drawNumber(y, x, "#000088", i);
            break;
        case 5:
            openCell(y, x, "#bdbdbd");
            drawNumber(y, x, "#880000", i);
            break;
        case 6:
            openCell(y, x, "#bdbdbd");
            drawNumber(y, x, "#8888ff", i);
            break;
        case 7:
            openCell(y, x, "#bdbdbd");
            drawNumber(y, x, "#000000", i);
            break;
        case 8:
            openCell(y, x, "#bdbdbd");
            drawNumber(y, x, "#888888", i);
            break;
        case "?":
            ctx.drawImage(closed, x * grid + x + 1, y * grid + y + 1);
            drawNumber(y, x, "#0000ff", i);
    }
}

function openCell(y, x, c) {
    ctx.fillStyle = c;
    ctx.fillRect(x * grid + x + 1, y * grid + y + 1, grid, grid);
}

function newGame() {
    var row = [];
    var place = [];
    game.splice(0, game.length);
    opened = 0;
    while (row.length < size) {
        row.push("");
    }
    while (game.length < size) {
        game.push(row.slice());
        field.push(row.slice());
    }
    for (var y = 0; y < game.length; y++) {
        for (var x = 0; x < game[y].length; x++) {
            draw(y, x, game[y][x]);
            place.push({
                y: y,
                x: x
            });
        }
    }
    for (var i = 0; i < lvl * 10; i++) {
        const m = Math.floor(Math.random() * place.length);
        field[place[m].y][place[m].x] = "m";
        place.splice(m, 1);
    }
    for (var y = 0; y < field.length; y++) {
        for (var x = 0; x < field[y].length; x++) {
            if (field[y][x] != "m") {
                const count = nearby(y, x, false, "m");
                if (count > 0) {
                    field[y][x] = count;
                }
            }
        }
    }
}

function drawNumber(y, x, c, n) {
    ctx.font = "800 13px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = c;
    ctx.fillText(n, x * grid + x + 9, y * grid + y + 10);
}

function nearby(y, x, r, cc) {
    var count = 0;
    for (var i = -1; i < 2; i += 2) {
        if (r) {
            count += check(y, x + i, cc);
        } else {
            count += check(y + i, x, cc);
            count += check(y, x + i, cc);
            count += nearby(y + i, x, true, cc);
        }
    }
    return count;
}

function check(y, x, cc) {
    if (y >= 0 && x >= 0 && y < game.length && x < game[y].length) {
        switch (cc) {
            case "m":
                if (field[y][x] == "m") {
                    return 1;
                }
                break;
            case "E":
                if (game[y][x] == "") {
                    game[y][x] = "O";
                    buffer.push({
                        y: y,
                        x: x
                    });
                    return 1;
                }
        }
    }
    return 0;
}

function clearGhost() {
    while (ghost.length > 0) {
        draw(ghost[0].y, ghost[0].x, "");
        ghost.shift();
    }
}

function openGround() {
    while (buffer.length > 0) {
        if (game[buffer[0].y][buffer[0].x] == "" || game[buffer[0].y][buffer[0].x] == "O") {
            if (field[buffer[0].y][buffer[0].x] == "m") {
                draw(buffer[0].y, buffer[0].x, "M");
                for (var y = 0; y < game.length; y++) {
                    for (var x = 0; x < game[y].length; x++) {
                        if (field[y][x] == "m" && game[y][x] == "") {
                            draw(y, x, "m");
                        } else if ((game[y][x] == "F" || game[y][x] == "?") && field[y][x] != "m") {
                            draw(y, x, "X");
                        }
                    }
                }
            } else if (field[buffer[0].y][buffer[0].x] == "") {
                draw(buffer[0].y, buffer[0].x, "E");
                opened += nearby(buffer[0].y, buffer[0].x, false, "E");
            } else {
                const temp = field[buffer[0].y][buffer[0].x];
                draw(buffer[0].y, buffer[0].x, temp);
            }
        }
        buffer.shift();
    }
}

//

window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);

document.getElementById("game").addEventListener("mousedown", function (e) {
    const y = Math.floor((e.clientY - canvasy) / (grid + 1));
    const x = Math.floor((e.clientX - canvasx) / (grid + 1));
    if (e.which == 1 && game[y][x] == "") {
        mousedown = true;
        draw(y, x, "E");
        ghost.push({
            y: y,
            x: x
        });
    }
});

document.getElementById("game").addEventListener("mousemove", function (e) {
    const y = Math.floor((e.clientY - canvasy) / (grid + 1));
    const x = Math.floor((e.clientX - canvasx) / (grid + 1));
    if (e.which == 1 && mousedown) {
        clearGhost();
        if (game[y][x] == "") {
            draw(y, x, "E");
            ghost.push({
                y: y,
                x: x
            });
        }
    }
});

document.addEventListener("mouseup", function (e) {
    var y = e.clientY - canvasy;
    var x = e.clientX - canvasx;
    clearGhost();
    mousedown = false;
    if (e.which == 1 && y < canvas.width && x < canvas.height) {
        y = Math.floor(y / (grid + 1));
        x = Math.floor(x / (grid + 1));
        buffer.push({
            y: y,
            x: x
        });
        openGround();
        opened++;
    }
});

document.addEventListener("contextmenu", function (e) {
    const y = Math.floor((e.clientY - canvasy) / (grid + 1));
    const x = Math.floor((e.clientX - canvasx) / (grid + 1));
    switch (game[y][x]) {
        case "":
            draw(y, x, "F");
            break;
        case "F":
            draw(y, x, "?");
            break;
        case "?":
            draw(y, x, "");
    }
});