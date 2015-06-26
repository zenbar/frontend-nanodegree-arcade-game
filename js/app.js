// control how fast the enemy moves
var speed = 120;

// Enemies our player must avoid
var Enemy = function() {
    
    // Variables applied to each of our instances go here,
    this.x = 0;
    this.y = 0;
    
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    
    // randomize the start of enemy so they do not always all start at the same time 
    var start = 1;
    if (this.x == 0) {
        if (Math.floor(Math.random() * 1000) < 980)
            start = 0;
    }
    
    if (start == 1) {
        // change the speed when player score more than 5 pts or 10 pts
        // make the game a bit more challenging as the game progress
        changeSpeed();
        this.x += dt * speed;
        // after crossing the line, reset and randomly pick a new row to start
        if (this.x > 101*4){
            this.x =0;
            // after crossing, switch row randomly
            this.y = (Math.floor(Math.random() * 3) + 1) * 83;
        }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.x = 101*2;
    this.y = 83*5;
    this.score = 0;
};

Player.prototype.update = function(){
    // check if the player get hit by enemy. If so, decrease score
    checkCollision();
    // check if the player cross the road. If so, increase score    
    checkWinning();
}

function checkCollision(){
    for (var i=0; i<NUM_BUGS; i++){
        if ( Math.sqrt(Math.pow(player.x - allEnemies[i].x, 2) + Math.pow(player.y - allEnemies[i].y, 2)) < 60) {
            // collision! put player back at starting point
            player.x = 101*2;
            player.y = 83*5;
            player.score -= 1;
            updateScore();
        }
    }
}

function checkWinning() {
    // if the player get to the top row, he win and move him back to starting point
    if (player.y == 0) {
        player.score += 1;
        player.x = 101*2;
        player.y = 83*5;
        updateScore();
    }
}

// update score in the HTML
function updateScore() {
    var score = "Score: " + player.score.toString();
    document.getElementById("score").innerHTML = score;    
}

// change the speed of enemy to make the game more interesting
function changSpeed() {
    if ( player.score >5 && plaayer.score <10)
        speed = 170;
    if (player.score >= 10) {
        speed = 200;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// move the player
Player.prototype.handleInput = function(key) {
    switch (key)
    {   
        case "left":          
            if (this.x >= 101) {
                this.x -= 101; 
            }
            break;
        case "right":
            if (this.x <= 3*101){
                this.x += 101;
            }
            break;
        case "up":
            if (this.y >= 83) {
                this.y -= 83;
            }     
            break;
        case "down":
            if (this.y <= 83*4) {
                this.y += 83;
            } 
            break;
    }
}

allEnemies = [];
const NUM_BUGS= 3;  
for (var i=0; i<NUM_BUGS; i++){
    enemy = new Enemy();
    // put it on a random row
    enemy.y = ((Math.floor(Math.random() * 3) +1) * 83);
    allEnemies.push(enemy);
}

player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
