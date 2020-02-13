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

var game = [["", "E", 1, 2, 3],
    ["", "", 4, 5, 6],
    ["m", "M", 7, 8, "?"]];

canvas.height = game.length * grid + game.length + 1;
canvas.width = game[0].length * grid + game[0].length + 1;

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
ctx3.moveTo(3, 12);
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

field();
draw(1, 0, "F");
draw(1, 1, "F");
draw(1, 1, "X");

function draw(y, x, i) {
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
            drawNumber(y, x, "#0000ff", 1);
            break;
        case 2:
            openCell(y, x, "#bdbdbd");
            drawNumber(y, x, "#008800", 2);
            break;
        case 3:
            openCell(y, x, "#bdbdbd");
            drawNumber(y, x, "#ff0000", 3);
            break;
        case 4:
            openCell(y, x, "#bdbdbd");
            drawNumber(y, x, "#000088", 4);
            break;
        case 5:
            openCell(y, x, "#bdbdbd");
            drawNumber(y, x, "#880000", 5);
            break;
        case 6:
            openCell(y, x, "#bdbdbd");
            drawNumber(y, x, "#8888ff", 6);
            break;
        case 7:
            openCell(y, x, "#bdbdbd");
            drawNumber(y, x, "#000000", 7);
            break;
        case 8:
            openCell(y, x, "#bdbdbd");
            drawNumber(y, x, "#888888", 8);
            break;
        case "?":
            ctx.drawImage(closed, x * grid + x + 1, y * grid + y + 1);
            drawNumber(y, x, "#0000ff", "?");
    }
}

function openCell(y, x, c) {
    ctx.fillStyle = c;
    ctx.fillRect(x * grid + x + 1, y * grid + y + 1, grid, grid);
}

function field() {
    for (var y = 0; y < game.length; y++) {
        for (var x = 0; x < game[y].length; x++) {
            draw(y, x, game[y][x]);
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