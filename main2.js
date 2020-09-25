var can2 = document.getElementById('canvas3'),
  ctx2 = can2.getContext('2d');

//document.getElementById('canvas3').width = innerWidth
//document.getElementById('canvas3').height = innerHeight
let canvasWidth2 = document.getElementById('canvas3').width;
let canvasHeight2 = document.getElementById('canvas3').height;
ctx2.fillStyle = "hsla(198, 50%, 00%, 0.2)";

function dot2() {
  var randX = Math.random() * document.getElementById('canvas3').width,
    randY = Math.random();
  dots2[count2++] = randY
  if (count2 >= 10000) {
    count2 = 0
  }
  randY = randY * document.getElementById('canvas3').height;
  ctx2.fillRect(randX, randY, 2, 2);
}

function reset2() {
  ctx2.clearRect(0, 0, canvasWidth2, canvasHeight2);
  dot2();
  dots2.length=0
}
