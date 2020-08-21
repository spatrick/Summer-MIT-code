let dots = []
let dots2 = []
let count = 0
let count2 = 0

var bin_center = new Array(document.getElementById("sliderRange").value);
var bin_count = new Array(document.getElementById("sliderRange").value);
var bin_center2 = new Array(document.getElementById("sliderRange2").value);
var bin_count2 = new Array(document.getElementById("sliderRange2").value);

function init() {
  chart1 = document.getElementById('chart');
  chart2 = document.getElementById('chart2');

    Plotly.plot(chart, [{
      x: bin_center,
      y: bin_count,
      type: 'bar',
      //visible: document.getElementById('checkbox1').checked,
    }]);
    Plotly.plot(chart, [{
      x: bin_center,
      y: bin_count,
      type: 'scatter',
      mode: 'lines',
      //visible: !(document.getElementById('checkbox1').checked),
    }]);
  Plotly.plot( chart2, [{
    x: bin_center2,
    y: bin_count2,
    type: 'bar',
  }]);
}

function histogram( arr, numbins ) {
  var min = arr.reduce(function(a,b){
    return Math.min(a,b);
  });
  var max = arr.reduce(function(a,b){
    return Math.max(a,b);
  });
  var span = max-min;
  var bin_span = span / numbins;

  bin_center.length = numbins;
  for ( var i = 0; i < numbins; i++ ) {
    bin_center[i] = i* bin_span + bin_span / 2;
  }

  bin_count.length = numbins;
  bin_count.fill(0);
  for ( var j = 0; j < dots.length; j++ ) {
    var bin = (dots[j] - min) / bin_span;

    bin_count[Math.floor(bin)] += 1;
  }

  newdots = dots.map(x=> x/(numbins*count))

    Plotly.redraw(chart, [{
      x: bin_center,
      y: bin_count,
      type: 'bar',
      //visible: document.getElementById('checkbox1').checked,
    }]);
    Plotly.redraw(chart, [{
      x: bin_center,
      y: bin_count,
      type: 'scatter',
      mode: 'lines',
      //visible: !(document.getElementById('checkbox1').checked),
    }]);
}

function histogram2( arr2, numbins2 ) {
  var min2 = arr2.reduce(function(a,b){
    return Math.min(a,b);
  });
  var max2 = arr2.reduce(function(a,b){
    return Math.max(a,b);
  });
  var span2 = max2-min2;
  var bin_span2 = span2 / numbins2;

  bin_center2.length = numbins2;
  for ( var i = 0; i < numbins2; i++ ) {
    bin_center2[i] = i* bin_span2 + bin_span2 / 2;
  }

  bin_count2.length = numbins2;
  bin_count2.fill(0);
  for ( var j = 0; j < dots2.length; j++ ) {
    var bin2 = (dots2[j] - min2) / bin_span2;

    bin_count2[Math.floor(bin2)] += 1;
  }

  Plotly.redraw(chart2, [{
    x: bin_center2,
    y: bin_count2,
    type: 'bar'
  }]);
}

function animate() {
  for (var i = 0; i < 10; i++) {
    dot();
    dot2();
    document.getElementById("number_of_bins").innerHTML = document.getElementById("sliderRange").value
    document.getElementById("number_of_bins2").innerHTML = document.getElementById("sliderRange2").value
  }
  window.requestAnimFrame(animate);

  histogram(dots, document.getElementById("sliderRange").value);
  histogram2(dots2, document.getElementById("sliderRange2").value);
  //Plotly.redraw(chart, [{
  //  x: dots,
  //  type: 'histogram'
  //}]);
  //Plotly.redraw(chart2, [{
    //x: dots2,
    //type: 'histogram'
  //}]);
}

document.getElementById('checkbox1').onclick = function() {
    // access properties using this keyword
    if ( this.checked ) {
      Plotly.newplot(chart, [{
        x: bin_center,
        y: bin_count,
        type: 'bar',
        visible: false,
      }]);
    } else {
      Plotly.newplot(chart, [{
        x: bin_center,
        y: bin_count,
        type: 'scatter',
        mode: 'lines',
        visible: true,
      }]);
    }
};

document.getElementById('checkbox2').onclick = function() {
    // access properties using this keyword
    if ( this.checked ) {
        // if checked ...
        //alert( this.value );
    } else {
        // if not checked ...
    }
};

window.requestAnimFrame = function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
    window.setTimeout(a, 1E3 / 60)
  }
}();

//window.requestAnimFrame(draw);
init();
animate();
