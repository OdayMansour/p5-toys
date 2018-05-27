var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];

var sz_X = w.innerWidth || e.clientWidth || g.clientWidth;
var sz_Y = w.innerHeight|| e.clientHeight|| g.clientHeight;

var col_hr = 0;
var col_hb = 50;
var col_bb = -50;
var col_br = 0;
var val_yr = -2;
var val_yb = -4;

function setup() {
    var canvas = createCanvas(sz_X, sz_Y, WEBGL);
    canvas.parent('graphics');
    colorMode(HSB, 100);
    camera(0, 0, 1200, 0, 0, 0, 0, 1, 0);
    frameRate(30);
}

function draw() {
  background(255);
  //move your mouse to change light direction
  var dirX = (mouseX / width - 0.5) * 2;
  var dirY = (mouseY / height - 0.5) * 2;
  directionalLight(col_hr, 60, col_br, 0, val_yr, -1);
  directionalLight(col_hb, 60, col_bb, 0, val_yb, -1);
  ambientMaterial(255);
  // col_h = (col_h + 0.2) % 100;
  val_yr = min(val_yr + 0.02, 2)
  val_yb = min(val_yb + 0.02, 0)
  col_bb = min(col_bb + 2, 100)
  col_br = min(col_br + 2, 100)
  noStroke();
  sphere(1000, 240, 160);

  if (val_yr == 2 & val_yb == 0 & col_bb ==100 & col_br == 100) {
    noLoop();
  }
}