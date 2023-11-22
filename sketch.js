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
  }

  display(){
    circle(this.x,this.y,50);
  }

  moveSpaceship(){
    this.x += this.dx;
    this.y += this.dy;

    this.dx = 0;
    this.dy = 0;
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
}

//functions
function keyPressed(){
  if (key === "s") { //move down
    Spaceship.moveSpaceship(Spaceship.dy += 30);
  }
  else if (key === "w") { //move up
    Spaceship.moveSpaceship(Spaceship.dy = -30);
  }
  else if (key === "a") { //move left
    Spaceship.moveSpaceship(Spaceship.dx = -30);
  }
  else if (key === "d") { //move right
    Spaceship.moveSpaceship(Spaceship.dx = 30);
  }
}



