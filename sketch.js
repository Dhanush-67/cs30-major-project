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
    this.isMoveSpaceship = false;
  }

  display(){
    circle(this.x,this.y,50);
  }

  moveSpaceship(b){
    this.isMoveSpaceship = b;
  }
  
  update(){
    if (this.isMoveSpaceship){
      this.x += 1;
    }
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
function keyPressed(){
  if (key === "s") { //move down
    Spaceship.moveSpaceship(true);
  }
  else if (key === "w") { //move up
    Spaceship.moveSpaceship(true);
  }
  else if (key === "a") { //move left
    Spaceship.moveSpaceship(true);
  }
  else if (key === "d") { //move right
    Spaceship.moveSpaceship(true);
  }
}

function keyReleased() {
  Spaceship.moveSpaceship(false);
}


