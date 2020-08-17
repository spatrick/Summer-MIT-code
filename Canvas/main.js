var canvas = document.querySelector('canvas'); // selecting the canvas
var c = canvas.getContext('2d');

canvas.width = innerWidth; // sets the width to the window
canvas.height = innerHeight; // sets the height to the window


// Variables
var mouse = { // this tracks the mouse postion
  x: undefined,
  y: undefined
};

var colors = [ // array of colors
  '#2185C5',
  '#7ECEFD',
  '#FF7F66'
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

function distance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

    // Grab angle between the two colliding particles
    const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    // Velocity after 1d collision equation
    const v1 = {
      x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
      y: u1.y
    };
    const v2 = {
      x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
      y: u2.y
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}


// Objects
function Particle(x, y, radius, color) { //a function that contains a ball with teh follign properties
  this.x = x;
  this.y = y;
  this.velocity = {
    x: (Math.random() - 0.5) * 5,
    y: (Math.random() - 0.5) * 5
  }
  this.speed =  Math.sqrt(Math.pow(this.velocity.x,2) + Math.pow(this.velocity.y,2))
  this.radius = radius;
  this.color = color;
  this.mass = 1;
  this.opacity = 0;

  this.update = particles => { // this will run when ever it is called

    this.draw();

    for (let i = 0; i < particles.length; i++) {
      if (this === particles[i]) continue;
      if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
        resolveCollision(this, particles[i])
      }
    }
    if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
      this.velocity.y = -this.velocity.y;
    }

    if (distance(mouse.x, mouse.y, this.x, this.y) < 120 && this.opacity < 0.2) {
      this.opacity += 0.5;
    } else if (this.opacity > 0) {
      this.opacity -= 0.02

      this.opacity = Math.max(0, this.opacity)
    }

    this.speed = Math.sqrt(Math.pow(this.velocity.x,2) + Math.pow(this.velocity.y,2))
    for (let i = 0; i < particles.length; i++) {
      if (this === particles[i]) {

        speeds[i] = this.speed
      }
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  this.draw = function() { //this function draws each ball
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false) // this makes an arc that has(x, y, radius, start angle, end angle, and which difrrection)
    c.save()
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color;
    c.fill();
    c.restore();
    c.stroekStyle = this.color; //this access the color index for the balls
    c.stroke(); // will differentate the balls from one another
    c.closePath(); // this makes sure that the balls path dont link togeather
  };
}

let particles;
let speeds;

function init() { // below we are creating a number of new balls and putting them into an arrayy
  particles = [];
  speeds = new Float32Array(100);

  for (let i = 0; i < 100; i++) {
    const radius = 15;
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);
    const color = randomColor(colors)

    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        if (distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
          x = randomIntFromRange(radius, canvas.width - radius)
          y = randomIntFromRange(radius, canvas.height - radius)

          j = -1;
        }
      }
    }
    particles.push(new Particle(x, y, radius, color));
    speeds[i] = particles[i].speed
  }

  Plotly.plot('chart', [{
    x: speeds,
    type: 'histogram'
  }]);
}

//Animation loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update(particles);
  });

  Plotly.redraw('chart', [{
    x: speeds,
    type: 'histogram'
  }]);
}

init();
animate();

//console.log(speeds)
//console.log()
