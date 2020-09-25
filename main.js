
var can = document.getElementById('canvas1')
  , ctx = can.getContext('2d')
  , meanWidth, meanHeight
  , deviation = 50
;

Math.nrand = function() {
	//var x1, x2, rad;

	//do {
	//	x1 = 2 * this.random() - 1;
	//	x2 = 2 * this.random() - 1;
	//	rad = x1 * x1 + x2 * x2;
	//} while(rad >= 1 || rad == 0);

	//var c = this.sqrt(-2 * Math.log(rad) / rad);

	//return x1 * c;
  var u = 0, v = 0;
  while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

meanWidth = document.getElementById('canvas1').width/2;
meanHeight = document.getElementById('canvas1').height/2;
let canvasWidth = document.getElementById('canvas1').width;
let canvasHeight = document.getElementById('canvas1').height;


ctx.fillStyle = "hsla(198, 50%, 00%, 0.2)";

function dot() {
  var randX = Math.nrand() * deviation + meanWidth,
      //randY = Math.nrand() * deviation + meanHeight;
      randY = Math.nrand();
      dots[count++]=randY
      if(count >= 20000){
        count = 0
      }
      randY = randY * deviation + meanHeight;
  ctx.fillRect(randX, randY, 2, 2);
}

function reset() {
    ctx.clearRect(0, 0, canvasWidth,canvasHeight);
    dot();
    dots.length=0
}
