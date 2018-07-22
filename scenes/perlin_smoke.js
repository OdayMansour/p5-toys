// Setting up Window
var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];

var sz_X = w.innerWidth || e.clientWidth || g.clientWidth;
var sz_Y = w.innerHeight|| e.clientHeight|| g.clientHeight;

var debug = false;
// var debug = true;

// Seeding randomness
var d = new Date();
var seed = d.getTime();

// Seeting up smoke
var smoke = [];
var nr_smoke = Math.max(sz_X, sz_Y) * 2; // Number of particles to simulate
if (debug) {
    nr_smoke = 100;
}

// Speed parameters
var val_coordweight = 350; // Smaller value leades to tighter pattern
var val_moveslowdown = 2300; //  Smaller value leads to faster pattern movement

// This function only runs once, at startup
function setup() {
    
    var canvas = createCanvas(sz_X, sz_Y);
    canvas.parent('graphics');
    // background("rgba(17,0,55,1)");
    background("black");
    
    colorMode(HSB, 100);
    rectMode(CENTER);
    frameRate(30);
    
    noiseSeed(seed);

    // Creating the particles
    for (i = 0; i < nr_smoke; i++) {
        smoke.push({
                x: Math.floor(Math.random() * (sz_X+1)), 
                y: Math.floor(Math.random() * (sz_Y+1)),
            })
    }

}

// This function runs at each frame
function draw() {

    // background("rgba(17,0,55,0.002)");
    // background("rgba(0,0,0,0.002)");

    noFill();

    var x_unit_vector = createVector(1, 0);

    // To draw force vectors
    if (debug) {
        background(0);
        for (var y=0; y<sz_Y; y+=50) {
            for (var x=0; x<sz_X; x+=50) {
                var angle = noise(x/val_coordweight, y/val_coordweight, frameCount/val_moveslowdown) * 3 * PI;
                var v = p5.Vector.fromAngle(angle);
                push();
                translate(x, y);
                rotate(angle);
                stroke("red");
                line(0, 0, 20, 0);
                rect(20, 0, 2, 2);
                // text(Number.parseFloat(angle).toPrecision(3), 0, 0);
                pop();
            }
        }
    }

    if (debug) {
        stroke("rgba(255, 255, 255, 1)") // solid particles
    } else {
        stroke("rgba(255, 255, 255, 0.005)") // Very transparent particles, trails only show when a lot of dots overlap
    }

    for (i = 0; i < nr_smoke; i++) {
        ellipse(smoke[i].x, smoke[i].y, 1, 1);
        // Interpolate the force vector at any given point
        // the noise function takes in two or three parameters, in this case I'm using three:
        // First two parameters are particle position (weighted)
        // Third parameter is "time", also weighted
        var angle = noise(smoke[i].x/val_coordweight, smoke[i].y/val_coordweight, frameCount/val_moveslowdown) * 3 * PI;
        smoke[i].x += Math.cos(angle) * 1.5;
        smoke[i].y += Math.sin(angle) * 1.5;
        
        // Redraw particle at a random location if it leaves the canvas
        if (smoke[i].x > sz_X | smoke[i].x < 0 | smoke[i].y > sz_Y | smoke[i].y < 0) {
            smoke[i].x = Math.random() * (sz_X + 1);
            smoke[i].y = Math.random() * (sz_Y + 1);
        }
    }
    
    // draw the framerate in debug mode
    if (debug) {
        noStroke();
        fill("black");
        rect(70, 20, 140, 40);
        fill("white");
        text(frameRate(), 10, 30);
    }

}
