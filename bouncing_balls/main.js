var canvas = document.querySelector('canvas'); // selecting the canvas
var c = canvas.getContext('2d'); // showing the canvas its 2d

canvas.width = innerWidth; // sets the width to the window
canvas.height = innerHeight; // sets the height to the window


// Variables
var mouse = { // this tracks the mouse postion
  x: innerWidth / 2,
  y: innerHeight / 2
};

var colors = [ // array of colors
  'red',
  'white',
  'blue',
  'yellow',
  'purple',
  'orange',
  'green'
];

var gravity = 1;
var friction = 0.99;

addEventListener("mousemove", function(event) { // eventlistener that watches the mouses movements
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", function() { // an eventlistener that watches for the page resizes
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

addEventListener("click", function() {
  init();
})

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min); // random number genorator
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]; // random color genorator
}


// Objects
function Ball(x, y, dx, dy, radius, color) { //a function that contains a ball with teh follign properties
  this.x = x;
  this.y = y;
  this.dx = dx
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.update = function() { // this will run when ever it is called
    if (this.y + this.radius + this.dy > canvas.height) { // this makes sure that once the balls hit the bottom then bounce up
      this.dy = -this.dy * friction; // turns the ball around
    } else {
      this.dy += gravity; // this adds the gravity to them
    }
    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) { // confines the ball to the width
      this.dx = -this.dx // turns balls around
    }
    this.x += this.dx // creates a velocity
    this.y += this.dy; // creates a velocity
    this.draw();
  }
  this.draw = function() { //this function draws each ball
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false) // this makes an arc that has(x, y, radius, start angle, end angle, and which difrrection)
    c.fillStyle = this.color; //this access the color index for the balls
    c.fill(); // this fills each gball
    c.stroke(); // will differentate the balls from one another
    c.closePath(); // this makes sure that the balls path dont link togeather
  };
}

var ball;
var ballArray;

function init() { // below we are creating a number of new balls and putting them into an array
  ballArray = [] // reset the array
  for (var i = 0; i < 400; i++) {
    var radius = randomIntFromRange(8, 20);
    var x = randomIntFromRange(radius, canvas.width - radius) //each time through the loop we will create a random x startring postition the the ball
    var y = randomIntFromRange(0, canvas.height - radius) //each time through the loop we will create a random y startring postition the the ball
    var dx = randomIntFromRange(-2, 2) //random dx from -2 to 2
    var dy = randomIntFromRange(-2, 2)
    var color = randomColor(colors);
    ballArray.push(new Ball(x, y, dx, dy, radius, color)) // creating a ball with x postion, y postion, dy, radius, and color
  }
  console.log(ballArray)
}

//Animation loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].update(); // we are selecting every ball in the ball array and then we are animating it
  }
}

init();
animate();
