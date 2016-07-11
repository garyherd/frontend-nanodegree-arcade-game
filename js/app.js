//---------------helper items--------------------------------
var gridDimensions = {numRows: 6, numColums: 5, stonesStart: 1, stonesEnd: 3};

// Returns a random integer between min (included) and max (included)
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
//----------end helper items----------------------------------

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.setStartPositions();
};

Enemy.prototype.setStartPositions = function() {
    this.x = -1;
    this.y = getRandomIntInclusive(gridDimensions.stonesStart,
    gridDimensions.stonesEnd)
    this.xRate = getRandomArbitrary(.2, .4);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < gridDimensions.numColums) {
        this.x += dt * this.xRate;
        console.log(this.x);
    }
    else {
        this.setStartPositions();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101,
    this.y * 73);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 2;
    this.y = 5;
    this.movement = {x: 0, y: 0};
    this.yNudge = -30; // correct for larger bottom row;
};

Player.prototype.moveLeft = function() {
    if (this.x > 0) {
        this.movement.x = -1;
        this.movement.y = 0;
    }
};

Player.prototype.moveRight = function() {
    if (this.x < 4) {
        this.movement.x = 1;
        this.movement.y = 0;
    }
};

Player.prototype.moveUp = function() {
    if (this.y > 0) {
        this.movement.y = -1;
        this.movement.x = 0;
    }
};

Player.prototype.moveDown = function() {
    if (this.y < 5) {
        this.movement.y = 1;
        this.movement.x = 0;
    }
};

Player.prototype.update = function() {
    this.x += this.movement.x;
    this.y += this.movement.y;
    this.movement.x = 0;
    this.movement.y = 0;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101,
    this.y * 83 + this.yNudge);
};

Player.prototype.handleInput = function(directionStr) {

    if (directionStr == 'left') {
        this.moveLeft();
    }
    if (directionStr == 'right') {
        this.moveRight();
    }
    if (directionStr == 'up') {
        this.moveUp();
    }
    if (directionStr == 'down') {
        this.moveDown();
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

for (var i = 0; i < 1; i++) {
   allEnemies.push(new Enemy());
}

// Place the player object in a variable called player
var player = new Player();

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
