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
  '#00bdff',
  '#4d39ce',
  '#088eff'
];


addEventListener("mousemove", function(event) { // eventlistener that watches the mouses movements
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", function() { // an eventlistener that watches for the page resizes
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});


function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min); // random number genorator
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]; // random color genorator
}


// Objects
function Particle(x, y, radius, color) { //a function that contains a ball with teh follign properties
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.05;
  this.distancFromCenter = randomIntFromRange(50, 120)
  this.lastMouse = {
    x: x,
    y: y
  }

  this.update = function() { // this will run when ever it is called
    const lastPoint = {
      x: this.x,
      y: this.y
    };

    //move points over time
    this.radians += this.velocity

    // Drag effect
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05

    //Circular motion
    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distancFromCenter;
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distancFromCenter;
    this.draw(lastPoint);
  }
  this.draw = lastPoint => { //this function draws each ball
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath(); // this makes sure that the balls path dont link togeather
  };
}

let particles;
function init() { // below we are creating a number of new balls and putting them into an array
  particles = []

  for (let i = 0; i < 50; i++) {
    const radius = (Math.random() * 2) + 1;
    particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)))
  }
}


//Animation loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(255, 255, 255, 0.05)'
  c.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
  })
}

init();
animate();
