// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// order of code
// class constructors
// global variables
// preload
// setup 
// draw
// functions


class spaceship{
  constructor(x,y){
    this.x = x;
    this.y = y;
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
    circle(this.x,this.y,this.size);
  }

  goingForward(x){
    this.isGoingForward = x;
  }

  
  update(){
    if (this.isgoingForward){
      this.forward();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.98);
  }

  forward(){
    let force  = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
  }
}

//global variables
let Spaceship;

//setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  Spaceship = new spaceship(width/2,height/2);
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

// function keyPressed(){
//   if (key === "s") { //move down
//     Spaceship.moveSpaceship(true);
//   }
//   else if (key === "w") { //move up
//     Spaceship.moveSpaceship(true);
//   }
//   else if (key === "a") { //move left
//     Spaceship.moveSpaceship(true);
//   }
//   else if (key === "d") { //move right
//     Spaceship.moveSpaceship(true);
//   }
// }


