window.onload=function() {
    InitGlobals();
    setInterval("draw();", 30);
    window.addEventListener('keydown',doKeyDown,true);
};

// true global variables
var totalPoints = 0;
var currentStreak = 0;

// global variables used in the game
var xPos;
var centerX;
var centerY;
var directionX;
var isShootOpen;
var isGameActive;
var isManAlive;
var isPointsAssigned;
var shootOpenHeight;

function InitGlobals() {
    xPos = 0;
    centerX = 200;
    centerY = 10;
    directionX = 0;
    isShootOpen = false;
    isGameActive = true;
    isManAlive = true;
    isPointsAssigned = false;
    shootOpenHeight = 0;
}

function draw() {
    var canvas = document.getElementById("DiverCanvas");
    var ctx = canvas.getContext("2d");
    
    ctx.clearRect(0,0, 400, 600);  
    
    ctx.fillStyle = "rgb(0,60,212)"; //light blue
    ctx.rect(0, 0, 400, 600);
    ctx.fill();
    
    drawAllClouds(ctx, xPos);
    drawGround(ctx);
    drawStickFigure(ctx, centerX, centerY);
    drawScore(ctx);
    

    
    if (centerY >= 570) {
        isGameActive = false;
        drawResultText(ctx);
        isManAlive = isShootOpen;
        
        if (!isPointsAssigned) {
            isPointsAssigned = true;
            if (isManAlive) {
                totalPoints = totalPoints + shootOpenHeight;
                if (shootOpenHeight > 650) {
                    totalPoints += 100;
                    currentStreak += currentStreak;
                }
            }
            else {
                totalPoints = 0;
            }
        }
    }
    else {
        centerX = centerX + directionX
        if (centerX < 0) {
            centerX = 0;
        }
        
        if (centerX > 400) {
            centerX = 400;
        }
        
        if (isShootOpen) {
            centerY = centerY + 2;
        }
        else {
            centerY = centerY + 5;
        }
        
        if (centerY > 600) {
            centerY = 10;
        }
        directionX = 0;
    }
    xPos = xPos + 1;
}

function doKeyDown(evt){
    if (!isGameActive) {
        InitGlobals();
        return;
    }
    
    switch (evt.keyCode) {
    case 38:  /* Up arrow was pressed */
        isShootOpen = true;
        shootOpenHeight = centerY;
    break;
    case 37:  /* Left arrow was pressed */
        if (isGameActive) {
            directionX = -5;
        }
    break;
    case 39:  /* Right arrow was pressed */
        if (isGameActive) {
            directionX = 5;
        }
    break;
    }
}

function drawScore(ctx) {
    var text = 'Score: ' + totalPoints;
    ctx.font = '10pt Calibri';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'red';
    ctx.fillText(text, 5, 10);
        
    text = 'Current Steak: ' + currentStreak;
    ctx.font = '10pt Calibri';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'red';
    ctx.fillText(text, 5, 25);
}

function drawResultText(ctx) {
    var text = 'You Win!';
    if (!isManAlive) {
        text = 'You Lose!';
    }
    
    ctx.font = '30pt Calibri';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'red';
    ctx.fillText(text, 200, 75);
    
    
    
    text = 'Press any key to restart';
    ctx.font = '10pt Calibri';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'red';
    ctx.fillText(text, 200, 100);
}

function drawStickFigure(ctx, centerX, centerY) {
    
    if (isManAlive) {
        var radius = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
        
        // head, body and left leg
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX, centerY + 15);
        ctx.lineTo(centerX - 5, centerY + 20);
        ctx.lineTo(centerX, centerY + 15);
        ctx.stroke()
        
        // right leg
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + 15);
        ctx.lineTo(centerX + 5, centerY + 20);
        ctx.stroke();
        
        // left arm
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + 10);
        ctx.lineTo(centerX + 5, centerY + 5);
        ctx.stroke();
        
        // right arm
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + 10);
        ctx.lineTo(centerX - 5, centerY + 5);
        ctx.stroke();
        
        // draw the parashoot if needed
        if (isShootOpen && isGameActive) {
            // Shoot
            ctx.beginPath();
            ctx.arc(centerX, centerY-10,15,Math.PI, 0);
            ctx.fillStyle = "yellow";
            ctx.fill();
            ctx.stroke();
            
            // line under shoot 
            ctx.beginPath();
            ctx.moveTo(centerX + 15, centerY - 10);
            ctx.lineTo(centerX - 15, centerY - 10);
            ctx.stroke();
            
            
            // right rope
            ctx.beginPath();
            ctx.moveTo(centerX + 5, centerY + 5);
            ctx.lineTo(centerX + 15, centerY - 10);
            ctx.stroke();
            
            // left rope
            ctx.beginPath();
            ctx.moveTo(centerX - 5, centerY + 5);
            ctx.lineTo(centerX - 15, centerY - 10);
            ctx.stroke();
        }
    }
    else {
        var groundVert = 590;
        var oldLineWidth = ctx.lineWidth;
        
        ctx.beginPath();
        ctx.moveTo(centerX-5, groundVert);
        ctx.lineTo(centerX+7, groundVert);
        ctx.fillStyle = "red";
        ctx.lineWidth = 5;
        ctx.stroke()
        
        ctx.beginPath();
        ctx.moveTo(centerX-7, groundVert);
        ctx.lineTo(centerX-11, groundVert);
        ctx.fillStyle = "red";
        ctx.lineWidth = 4;
        ctx.stroke()
        
        ctx.beginPath();
        ctx.moveTo(centerX-15, groundVert);
        ctx.lineTo(centerX-20, groundVert);
        ctx.fillStyle = "red";
        ctx.lineWidth = 2;
        ctx.stroke()
        
        ctx.beginPath();
        ctx.moveTo(centerX+12, groundVert);
        ctx.lineTo(centerX+22, groundVert);
        ctx.fillStyle = "red";
        ctx.lineWidth = 3;
        ctx.stroke()
        
        ctx.lineWidth = oldLineWidth;
    }
}

function drawAllClouds(ctx, xPos) {
    drawCloud(ctx, (100 + xPos) % 450 - 50, 100);
    drawCloud(ctx, (200 + xPos) % 450 - 50, 160);
    drawCloud(ctx, xPos % 450 - 50, 140);
    drawCloud(ctx, (250 + xPos) % 450 - 50, 120);
    drawCloud(ctx, (350 + xPos) % 450 - 50, 150);
    drawCloud(ctx, (380 + xPos) % 450 - 50, 170);
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

function drawGround(ctx) {
    ctx.beginPath();
    ctx.rect(0, 590, 400, 600);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
}