// Project Title
// Dhanush Rai
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Things to remeber
/* the from angle function only uses radians while others can be in degrees or rads. The from angle function draws a vector from a 
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
  constructor(x,y,img){
    this.hitbox = [this.x,this.y,];
    this.dx = 0;
    this.dy = 0;
    this.size = 50;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0,0);
    this.isGoingForward = false;
    this.pos = createVector(x,y);
    this.img = img;
  }

  display(){
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.heading+PI/2);
    scale(0.7)
    imageMode(CENTER);
    image(this.img, 0,0);
    pop();
  }
  
  // checks if the "w" is pressed if yes it sets isGoingForward to true
  goingForward(x){
    this.isGoingForward = x;
  }

  
  update(){
    /* adds the force vector to the vel vector which is then added to the pos vector. Then the vel vector
    is mult by 0.98(this number must be quite smaller compared to the rate of force vector being 
    added else the spaceshipwon't move much) to slowly reduce the vel vector and if no more force 
    vector is added the vel vector approaches 0 which causes the spaceship to stop*/
    if (this.isGoingForward){    
      this.forward();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99);//air resistance basically(tho space does not have resistance)

    // setting key binds
    if (keyIsDown(87)){
      Spaceship.goingForward(true);
    }
    if (keyIsDown(68)) {
      Spaceship.setRotation(0.09);
    }
    if(keyIsDown(65)) {
      Spaceship.setRotation(-0.09);
    }
    for (let bullet of bulletArray) {
      bullet.display();
      bullet.update();
    }
  }
  
  /*As long as "w" is pressed a new force vector of 0.1 keeps getting added to this.vel vector this is
  because the forward function is called in update function which is in the draw loop.*/
  forward(){
    let force  = p5.Vector.fromAngle(this.heading,0.1);
    this.vel.add(force);
    console.log(this.vel)
  }


  setRotation(a){
    this.rotation = a;
  }

    
  turn(){
    this.heading += this.rotation;
  }

  edges(){
    if (this.pos.x > width + this.size){
      this.pos.x = -10;
    }
    else if (this.pos.x < -this.size){
      this.pos.x = width + this.size;
    }
    if (this.pos.y > height + this.size){
      this.pos.y = -10;
    }
    else if (this.pos.y < -this.size){
      this.pos.y = height + this.size;
    }
  }

  handleKeyPress() {
    if (keyIsDown(32)){
      let bullet = new Bullet(this.pos.x, this.pos.y,this.heading);
      bulletArray.push(bullet);
    }
  }
}

class Bullet{
  constructor(x,y,heading){
    this.pos = createVector(x,y);
    this.vel = p5.Vector.fromAngle(heading,15);
    this.heading = heading;
  }

  update(){
    this.pos.add(this.vel);
  }

  display(){
    push();
    stroke("blue");
    strokeWeight(4);
    translate(this.pos.x,this.pos.y);
    rotate(this.heading);
    scale(0.3)
    imageMode(CENTER);
    image(bulletImg, 0,0);
    pop();
  }
}


//global variables
//spaceship variables
let Spaceship;
let spaceshipPos;
let spaceshipImg;
let backgroundImg;

//bullet variables
let bulletArray = [];
let bulletImg;

//preload
function preload(){
  spaceshipImg = loadImage("Assets/Images/Spaceship image.png");
  bulletImg = loadImage("Assets/Images/bullet.gif");
}

//setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  spaceshipPos = createVector(windowWidth/2,windowHeight/2);
  Spaceship = new spaceship(spaceshipPos.x,spaceshipPos.y, spaceshipImg);
}

//draw 
function draw() {
  background(0);
  Spaceship.update();
  Spaceship.display();
  Spaceship.turn();
  Spaceship.edges();
}

//functions
function keyPressed() {
  Spaceship.handleKeyPress();
}

function keyReleased() {
  Spaceship.goingForward(false);
  Spaceship.setRotation(0);
}






