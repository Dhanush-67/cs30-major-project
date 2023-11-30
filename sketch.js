// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Things to remeber
/* the from angle function onlu uses radians while others can be in degrees or rads. The from angle function draws a vector from a 
point to a certain degree from the x axis to a certain length. We need to input the degrees and length of the vector. The heading function
gives us the degrees we turned the object by. The rotate function roates the object by a certain degree in respect to the origin.
Therefore we need to translate the object and then use rotate.*/

// order of code
// class constructors
// global variables
// preload
// setup 
// draw
// functions


class spaceship{
  constructor(x,y){
    this.dx = 0;
    this.dy = 0;
    this.size = 50;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0,0);
    this.isGoingForward = false;
    this.pos = createVector(x,y);
  }

  display(){
    circle(this.pos.x,this.pos.y,this.size);
  }

  goingForward(x){
    this.isGoingForward = x;
  }

  
  update(){
    if (this.isGoingForward){    
      this.forward();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.98);
  }

  forward(){
    let force  = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
    console.log(this.vel);
  }

  setRotation(a){
    this.rotation = a;
  }
    
  turn(){
    this.heading += this.rotation;
  }
}

//global variables
let Spaceship;
let spaceshipPos;

//setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  spaceshipPos = createVector(50,50);
  Spaceship = new spaceship(spaceshipPos.x,spaceshipPos.y);
}

//draw 
function draw() {
  background(220);
  Spaceship.display();
  Spaceship.update();
}

//functions
function keyPressed() {
  if (keyCode === 68) {
    Spaceship.setRotation(0.1);
  }
  else if (keyCode === 65) {
    Spaceship.setRotation(-0.1);
  }
  else if (keyCode === 87) {
    Spaceship.goingForward(true);
  }
}

function keyReleased() {
  Spaceship.goingForward(false);
}



