window.onload=function() {
    setInterval("draw();", 30);
};


var xPos = 0;

function draw() {
    var canvas = document.getElementById("DiverCanvas");
    var ctx = canvas.getContext("2d");
    
    ctx.clearRect(0,0, 400, 600);  
    
    ctx.fillStyle = "rgb(0,60,212)"; //light blue
    ctx.rect(0, 0, 400, 600);
    ctx.fill();
    
    drawCloud(ctx, (100 + xPos) % 450 - 50, 100);
    drawCloud(ctx, (200 + xPos) % 450 - 50, 160);
    drawCloud(ctx, xPos % 450 - 50, 140);
    drawCloud(ctx, (250 + xPos) % 450 - 50, 120);
    drawCloud(ctx, (350 + xPos) % 450 - 50, 150);

    drawCloud(ctx, (380 + xPos) % 450 - 50, 170);

    
    xPos = xPos + 1;
}

function drawCloud(ctx, x, y) {
    
    ctx.beginPath();
    ctx.moveTo(x, y + 20);
    ctx.quadraticCurveTo(x + 10, y + 10, x + 20, y + 20);
    ctx.quadraticCurveTo(x + 30, y + 10, x + 40, y + 20);
    ctx.quadraticCurveTo(x + 60, y + 20, x + 50, y + 30);
    ctx.quadraticCurveTo(x, y + 40, x, y + 30);
    ctx.quadraticCurveTo(x - 10, y + 30, x, y + 20);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
}