// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Global variables
let bgImg;

//Spaceship stuff
let spaceship;
let spaceshipImg;

//Asteroid stuff
let asteroidImg;
let asteroidArray = [];


//preload
function preload() {
  bgImg = loadImage("Assets/Images/space bg.png");
  spaceshipImg = loadImage("Assets/Images/Spaceship3.png")
  asteroidImg = loadImage("Assets/Images/Asteroid image.png")
}


//Setup
function setup(){
  new Canvas();
  createSpaceship(width/2,height/2,spaceshipImg.height-30,60);

  new Sprite(100,300,50,50);

  for (let i = 0; i < 10; i++) {
    asteroidArray.push(createAsteroid());
  }

}

//Draw loop
function draw() {
  clear();
  background(bgImg);
  spaceshipControls();
  edges();
}

//Displays the asteroid
function createAsteroid(){
  posX = random(width)
  posY = random(height)
  hitbox = asteroidImg.width*0.5-80
  asteroid = new Sprite(posX,posY,hitbox,hitbox);
  //asteroid.set collider("circle", 0, 0, 25)
  asteroid.debug = true;
  push();
  asteroid.scale = 0.5;
  imageMode(CENTER);
  asteroid.mass = 1
  asteroid.addImage(asteroidImg);
  pop();
}

//Displays the spaceship
function createSpaceship(x,y,w,h){
  spaceship = new Sprite(x, y, w, h);
  push();
  spaceship.scale = 0.5;
  imageMode(CENTER);
  spaceship.mass = 5
  spaceship.addImage(spaceshipImg);
  spaceship.rotationLock = true
  spaceship.bounce = 5
  pop();

}


// when we press "w" speed gets added to the spacship until its speed reaches 10 after which no more 
// speed is added to the spaceship.Whatever speed it has gained it will have that speed. When "w" is
// released then we multiply speed by a decimal number which acts as friction.
function spaceshipControls(){
  spaceship.speed *= 0.99;
  spaceship.debug = true

  if (kb.pressing("up")){
    if(spaceship.speed < 10){
      spaceship.vel.x += cos(spaceship.rotation) * 0.15;
      spaceship.vel.y += sin(spaceship.rotation) * 0.15;
    }
  } 


  if (kb.pressing("right")){
    spaceship.rotation += 4;
  }
  if (kb.pressing("left")){
    spaceship.rotation -= 4;
  } 
}


// if object goes beyond the screen it spawns on the opposite side of the screen
function edges(){
  if (spaceship.x > width + spaceship.w){
    spaceship.x = -10;
  }
  else if (spaceship.x < -spaceship.w){
    spaceship.x = width + spaceship.w;
  }
  if (spaceship.y > height + spaceship.h){
    spaceship.y = -10;
  }
  else if (spaceship.y < -spaceship.h){
    spaceship.y = height + spaceship.h;
  }
}


