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
    this.alpha = 100;
  }

  display(){
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.heading+PI/2);
    scale(0.7);
    imageMode(CENTER);
    image(this.img,0,0);
    //hitbox
    noStroke();
    fill(255,255,255,this.alpha);
    rect(-35,-120,70,this.img.height-20);
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
    this.vel.mult(0.987);//air resistance basically(tho space does not have resistance)

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
      bullet.isdead();
    }
  }
  
  /*As long as "w" is pressed a new force vector of 0.1 keeps getting added to this.vel vector this is
  because the forward function is called in update function which is in the draw loop.*/
  forward(){
    let force  = p5.Vector.fromAngle(this.heading,0.18);
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
    this.alpha = 200;
  }

  update(){
    this.pos.add(this.vel);
  }

  display(){
    push();
    stroke("blue");
    strokeWeight(4);
    imageMode(CENTER);
    translate(this.pos.x,this.pos.y);
    rotate(this.heading);
    scale(0.3);
    image(bulletImg, 0,0);
    //hitbox
    noStroke();
    fill(0,0,255,this.alpha);
    rect(-40,-20,100,40);
    pop();
  }

  isdead() {
    // check if the bullet is still on the screen
    for (let x = bulletArray.length-1; x >= 0; x--) {
      if(bulletArray[x].pos.y+bulletImg.height <0 || bulletArray[x].pos.y-bulletImg.height > height || bulletArray[x].pos.x-bulletImg.height > width || bulletArray[x].pos.x+bulletImg.height < 0 ){
        bulletArray.splice(bulletArray[x],1);
      }
    }
  }
}

class Asteroid{
  constructor(){
    this.pos = createVector(random(width),random(height));
    this.vel = p5.Vector.random2D();
    this.size = random(0.3,0.7);
    this.images = [asteroidImg,asteroidImg2];
    this.alpha = 100;
  }

  update(){
    this.pos.add(this.vel);
  }

  display(){
    push();
    translate(this.pos.x, this.pos.y);
    imageMode(CENTER);
    scale(this.size);
    image(this.images[0], 0,0);
    //hitbox
    noStroke();
    fill(255,255,255,this.alpha);
    circle(0,0,200);
    pop();
  }

  edges(){
    if (this.pos.x > width + this.size){
      this.pos.x = -this.size;
    }
    else if (this.pos.x < -this.size){
      this.pos.x = width + this.size;
    }
    if (this.pos.y > height + this.size){
      this.pos.y = -this.size;
    }
    else if (this.pos.y < -this.size){
      this.pos.y = height + this.size;
    }
  }
}



//global variables
//spaceship variables
let Spaceship;
let spaceshipPos;
let spaceshipImg;
let spaceshipImg2;
let spaceshipImg3;
let backgroundImg;


//bullet variables
let bulletArray = [];
let bulletImg;

//Asteroid variables
let asteroidArray= [];
let asteroidImg;
let asteroidImg2;

//preload
function preload(){
  spaceshipImg = loadImage("Assets/Images/Spaceship image.png");
  spaceshipImg2 = loadImage("Assets/Images/Spaceship2.png");
  spaceshipImg3 = loadImage("Assets/Images/Spaceship3.png");
  backgroundImg = loadImage("Assets/Images/space bg.png");
  asteroidImg = loadImage("Assets/Images/Asteroid image.png");
  asteroidImg2 = loadImage("Assets/Images/asteroid image 2.png");
  bulletImg = loadImage("Assets/Images/bullet.gif");
}

//setup
function setup() {
  // createCanvas(windowWidth, windowHeight);
  new Canvas();
  spaceshipPos = createVector(windowWidth/2,windowHeight/2);
  Spaceship = new spaceship(spaceshipPos.x,spaceshipPos.y, spaceshipImg3);
  for (let i = 0; i < 10; i++) {
    asteroidArray.push(new Asteroid());
  }
}

//draw 
function draw() {
  background(backgroundImg);
  Spaceship.update();
  Spaceship.display();
  Spaceship.turn();
  Spaceship.edges();

  for (let i = 0; i < asteroidArray.length; i++) {
    asteroidArray[i].display();
    asteroidArray[i].update();
    asteroidArray[i].edges();
  }
}

//functions
function keyPressed() {
  Spaceship.handleKeyPress();
}

function keyReleased() {
  Spaceship.goingForward(false);
  Spaceship.setRotation(0);
}




