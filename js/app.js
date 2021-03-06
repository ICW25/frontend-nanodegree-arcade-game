var screenPixelsLeft = 1;
var screenPixelsRight = 500; 
var screenPixelsTop = 5;
var screenPixelsBottom = 420;


var numEnemies = 3;
function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.speed = 5;
    this.x = x;
    this.y = y;
    this.direction = "right";
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.direction === "right"){
        this.x+=this.speed*dt;
        if (this.x > screenPixelsRight){
            this.direction = "left";           
           // this.sprite = 'images/enemy-bug-left.png';
       };
    };
       if (this.direction === "left"){        
       this.x-=this.speed*dt;
        if (this.x < screenPixelsLeft){
            this.direction = "right"; 
            this.sprite = 'images/enemy-bug.png';          
        };
    };
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.x = 200;
    this.y = screenPixelsBottom;
    this.speed = 20;
    this.sprite = 'images/char-boy.png';
};
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function(){
    if (this.x<screenPixelsLeft){
        this.x++;
    };
    if (this.x>screenPixelsRight){
        this.x--;
    };
    if (this.y>screenPixelsBottom){
        this.y--;
    };
    if (this.y<screenPixelsTop){
    //you win
    this.y = screenPixelsBottom;
    };
};
Player.prototype.handleInput = function(key){
    if (key === "up"){
        this.y-= this.speed;
    };
    if (key === "down"){
        this.y+= this.speed;
    };
    if (key === "left"){
        this.x-= this.speed;
    };
    if (key === "right"){
        this.x+= this.speed;
    };
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (i = 0; i<numEnemies; i++){
allEnemies.push(new Enemy(randomInt(screenPixelsLeft, screenPixelsRight), randomInt(screenPixelsTop, screenPixelsBottom - 100)));
}
var player = new Player;


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
