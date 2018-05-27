// Setting up Window
var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];

var sz_X = w.innerWidth || e.clientWidth || g.clientWidth;
var sz_Y = w.innerHeight|| e.clientHeight|| g.clientHeight;

function setup() {
    
    var canvas = createCanvas(sz_X, sz_Y);
    canvas.parent('graphics');
    background("rgba(17,0,55,1)");

    colorMode(HSB, 100);
    rectMode(CENTER);
    frameRate(30);

}

function draw() {

}