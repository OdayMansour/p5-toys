// Setting up Window
var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];

var sz_X = w.innerWidth || e.clientWidth || g.clientWidth;
var sz_Y = w.innerHeight|| e.clientHeight|| g.clientHeight;

var particles = []
var num_particles = 50
var linec = 0

function setup() {
    
    var canvas = createCanvas(sz_X, sz_Y);
    canvas.parent('graphics');
    background(0);

    colorMode(HSB, 100);
    rectMode(CENTER);
    frameRate(60);

    for (i=0; i<num_particles; i++) {
        particles.push({
            vpos: createVector(Math.floor(Math.random() * (sz_X+1)), Math.floor(Math.random() * (sz_Y+1))),
            vvel: createVector(0,0),
            // vvel: createVector(Math.random()*6-3, Math.random()*6-3),
            w: Math.random()
        })
    }

}

function draw() {

    background("rgba(0, 0, 0, 0.2)");

    stroke(100);

    for (i=0; i<num_particles; i++) {
        for (j=0; j<num_particles; j++) {
            var part1 = particles[i];
            var part2 = particles[j];
            var distvector = p5.Vector.sub(part1.vpos, part2.vpos);
            var forcevector = distvector
            forcevector.normalize();
            forcevector.mult(0.01/distvector.mag());
            forcevector.mult(1/(part1.w + part2.w));
            
            // line(part1.vpos.x, part1.vpos.y, part2.vpos.x, part2.vpos.y);
            
            part1.vvel.sub(forcevector);
            part2.vvel.add(forcevector);
            part1.vvel.mult(0.99999);
            part2.vvel.mult(0.99999);
        }
    }

    linec = (linec + 1)%num_particles;

    noStroke();
    for (i=0; i<num_particles; i++) {
        ellipse(particles[i].vpos.x, particles[i].vpos.y, 2);
        particles[i].vpos.add(particles[i].vvel);
    }

}