// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let Spaceship;
let spaceshipPos;

class spaceship{
  constructor(x,y,img){
    this.x = x;
    this.y = y;
    this.img = img;
    this.ship = createSprite(x, y, 50,50);
    this.ship.addImage(spaceshipImg);
    //this.ship.vel.x = -2;
    if (mouseIsPressed()) {
      //           (x, y, speed)
      //           (position, speed)
      this.ship.moveTo(mouseX, mouseY, 8);
    }
  }
}

function preload(){
  spaceshipImg = loadImage("SHIP.png");
}

//setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  spaceshipPos = createVector(windowWidth/2,windowHeight/2);
  Spaceship = new spaceship(spaceshipPos.x,spaceshipPos.y, spaceshipImg);
}

//draw 
function draw() {
  background(220);
}