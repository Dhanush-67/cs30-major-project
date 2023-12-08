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
    this.hitbox = [this.x,this.y,]
    this.dx = 0;
    this.dy = 0;
    this.size = 50;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0,0);
    this.isGoingForward = false;
    this.pos = createVector(x,y);
    this.img = img
  }

  display(){
    push()
    translate(this.pos.x,this.pos.y);
    rotate(this.heading+PI/2)
    imageMode(CENTER)
    image(this.img, 0,0);
    pop()
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
    this.vel.mult(0.98);

    // setting key binds
    if (keyIsDown(87)){
      Spaceship.goingForward(true);
    }
    if (keyIsDown(68)) {
      Spaceship.setRotation(0.1);
    }
    if(keyIsDown(65)) {
      Spaceship.setRotation(-0.1);
    }
  }
  
  /*As long as "w" is pressed a new force vector of 0.1 keeps getting added to this.vel vector this is
  because the forward function is called in update function which is in the draw loop.*/
  forward(){
    let force  = p5.Vector.fromAngle(this.heading,0.5);
    this.vel.add(force);
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
  };
  handleKeyPress() {
    if (keyIsDown(32)){
      let bullet = new Bullet(this.x + (shipImage.width/2 - bulletImage.width/2), this.y,0,this.dy,bulletImage);
      bulletArray.push(bullet);
    }
  }
}

//global variables
let Spaceship;
let spaceshipPos;

//preload
function preload(){
  spaceshipImg = loadImage("Assets/Images/Spaceship image.png");
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
  Spaceship.display();
  Spaceship.update();
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






