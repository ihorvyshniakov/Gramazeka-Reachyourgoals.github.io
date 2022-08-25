// TODO: - made controls for mobile

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// allow use parameter from html, so if you want to change
// size of canvas, u can change it only in html
var width = canvas.width;
var height = canvas.height;

// we create blocks 10x10pixels
var blockSize = 10;
// count of countitity blocks in width of canvas(40pcs for 400px)
var widthInBlocks = width / blockSize;
// count of countitity blocks in height of canvas
var heightInBlocks = height / blockSize;
// when snake eats apple +1
var score = 0;

function drawBorder() {
	ctx.fillStyle = 'DarkOrchid';
	// x,y,width of rect, height of rect
	ctx.fillRect(0, 0, width, blockSize);
	ctx.fillRect(0, 0, blockSize, height);
	ctx.fillRect(0, height - blockSize, width, blockSize);
	ctx.fillRect(width - blockSize, 0, blockSize, height);
}

function drawScore() {
	// set font-size and font-family
	ctx.font = '22px Comic Sans MS';
	ctx.fillStyle = 'black';
	// default=left
	ctx.textAlign = 'left';
	// vertical align of text, change baseline
	ctx.textBaseline = 'top';
	// write phrase at x, y coordinates
	ctx.fillText('Score: ' + score, blockSize + 5, blockSize + 7);
}

function gameOver() {
	timeOut = false;
	ctx.font = '60px Comic Sans MS';
	ctx.fontStyle = 'black';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText('Game Over', width / 2, height / 2);

	// check of death
	dead = true;
	$('#start-again').text('Play again');
}

// fn 4 simplifing of drawing of circle
function circle(x, y, radius, fill) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	if (fill == true) {
		ctx.fill();
	} else if (fill == false) {
		ctx.stroke();
	}
}

// consrtuctor for one block
function Block(col, row) {
	this.col = col;
	this.row = row;
}

// add method draw square
Block.prototype.drawSquare = function (color) {
	var x = this.col * blockSize;
	var y = this.row * blockSize;
	ctx.fillStyle = color;
	ctx.fillRect(x, y, blockSize, blockSize);
};

// add method draw circle
Block.prototype.drawCircle = function (color) {
	var centerX = this.col * blockSize + blockSize / 2;
	var centerY = this.row * blockSize + blockSize / 2;
	ctx.fillStyle = color;
	circle(centerX, centerY, blockSize / 2, true);
};

// check is block in the same position as another
Block.prototype.equal = function (otherBlock) {
	return this.col === otherBlock.col && this.row === otherBlock.row;
};

// Counstructor of snake
function Snake() {
	this.segments = [new Block(7, 5), new Block(6, 5), new Block(5, 5)];

	this.direction = 'right';
	this.nextDirection = 'right';
}

// draw Snake
Snake.prototype.draw = function () {
	for (let i = 0; i < this.segments.length; i++) {
		// change color of drawing snake bepends of part
		if (i == 0) {
			this.segments[i].drawSquare('SaddleBrown');
		} else if (i > 0 && i % 2 == 1) {
			this.segments[i].drawSquare('DarkGoldenRod');
		} else if (i > 0 && i % 2 == 0) {
			this.segments[i].drawSquare('Silver');
		}
	}
};

Snake.prototype.move = function () {
	var head = this.segments[0];
	var newHead;

	this.direction = this.nextDirection;

	// create newHead before head
	if (this.direction === 'right') {
		newHead = new Block(head.col + 1, head.row);
	} else if (this.direction === 'down') {
		newHead = new Block(head.col, head.row + 1);
	} else if (this.direction === 'left') {
		newHead = new Block(head.col - 1, head.row);
	} else if (this.direction === 'up') {
		newHead = new Block(head.col, head.row - 1);
	}

	if (this.checkCollision(newHead)) {
		// if return true - collision with tail or wall
		gameOver();
		return;
	}

	// if return false
	// add newHead to snake(change location)
	this.segments.unshift(newHead);

	// check for apple, if eaten->true(blocks at same positions)
	if (newHead.equal(apple.position)) {
		score++;
		// change speed of snake moving(grow up)
		animationTime -= 2;
		// change location of apple, give segments cause move()
		// watch position of snake body
		apple.move(this.segments);
	} else {
		// false -> apple doesn't eaten, tail of snake pop()
		this.segments.pop();
	}
};

Snake.prototype.checkCollision = function (head) {
	// check wallCollistions
	var leftCollision = head.col === 0;
	var topCollision = head.row === 0;
	var rightCollision = head.col === widthInBlocks - 1;
	var bottomCollision = head.row === heightInBlocks - 1;

	var wallCollision =
		leftCollision || topCollision || rightCollision || bottomCollision;

	// check selfCollistions
	var selfCollision = false;

	// check every el of snake for colision
	for (let i = 0; i < this.segments.length; i++) {
		if (head.equal(this.segments[i])) {
			selfCollision = true;
		}
	}

	return wallCollision || selfCollision;
};

Snake.prototype.setDirection = function (newDirection) {
	if (this.direction === 'up' && newDirection === 'down') {
		return;
	} else if (this.direction === 'right' && newDirection === 'left') {
		return;
	} else if (this.direction === 'down' && newDirection === 'up') {
		return;
	} else if (this.direction === 'left' && newDirection === 'right') {
		return;
	}

	this.nextDirection = newDirection;
};

// Constuctor of apple
function Apple() {
	this.position = new Block(10, 10);
}

Apple.prototype.draw = function () {
	this.position.drawCircle('DarkGreen');
};

Apple.prototype.move = function (segments) {
	// for loop & while loop fix problem with generate apple on snake body
	for (let i = 0; i < segments.length; i++) {
		while (
			segments[i].col == this.position.col &&
			segments[i].row == this.position.row
		) {
			var randomCol = Math.floor(Math.random() * (widthInBlocks - 2) + 1);
			var randomRow = Math.floor(Math.random() * (heightInBlocks - 2) + 1);
			this.position = new Block(randomCol, randomRow);
		}
	}
};

var directions = {
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down',
};

// listener of keyboard arrows move
$('body').keydown(function (e) {
	var newDirection = directions[e.keyCode];
	if (newDirection !== undefined) {
		snake.setDirection(newDirection);
	}
});

// create objects of snake and apple
var snake = new Snake();
var apple = new Apple();

// use for changing snake moving speed
var animationTime = 85;
var timeOut = true;

// draw game, but not begin
ctx.clearRect(0, 0, width, height);
drawScore();
snake.draw();
apple.draw();
drawBorder();

// alternate function of animation(with setTimeout)
function gameLoop() {
	dead = false;
	startOnce = false;
	ctx.clearRect(0, 0, width, height);
	drawScore();
	snake.move();
	snake.draw();
	apple.draw();
	drawBorder();
	if (timeOut) {
		setTimeout(gameLoop, animationTime);
	}
}

var dead;
var startOnce = true;

$('#start-again').on('click', () => {
	if (startOnce) {
		gameLoop();
		$('#start-again').text('Playing...');
	} else {
		$('#start-again').text('Playing...');
		if (dead) {
			// create objects of snake and apple
			snake = new Snake();
			apple = new Apple();

			// use for changing snake moving speed
			timeOut = true;
			animationTime = 85;
			score = 0;

			gameLoop();
		}
	}
});

$('#again').on('click', () => {});
