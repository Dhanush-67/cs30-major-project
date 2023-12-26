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
let spaceshipBullets;
let bulletImg;

//Asteroid stuff
let asteroidImg1;
let asteroidImg2;
let asteroidImg3;
let asteroidImg4;
let asteroidImg5;
let asteroids;


//preload
function preload() {
  bgImg = loadImage("Assets/Images/space bg.png");
  spaceshipImg = loadImage("Assets/Images/Spaceship3.png");
  bulletImg = loadImage("Assets/Images/bullet.gif")

  //multiple asteroid images
  asteroidImg1 = loadImage("Assets/Images/Asteroid1.png");
  asteroidImg2 = loadImage("Assets/Images/Asteroid2.png");
  asteroidImg3 = loadImage("Assets/Images/Asteroid3.png");
  asteroidImg4 = loadImage("Assets/Images/Asteroid4.png");
  asteroidImg5 = loadImage("Assets/Images/Asteroid5.png");
}


//Setup
function setup(){
  new Canvas();

  //spaceship setup stuff
  createSpaceship(width/2,height/2,spaceshipImg.height-30,60);
  spaceshipBullets = new Group();
  
  //asteroid stuff
  asteroids = new Group();
  for (let i = 0; i < 10; i++) {
    createAsteroid(random(width),random(height),0.5)
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
function createAsteroid(x, y, size) {
  push();
  let asteroid = new asteroids.Sprite(x,y,200);
  asteroidSprite = random([asteroidImg1,asteroidImg2,asteroidImg3,asteroidImg4,asteroidImg5]);
  asteroid.scale = size;
  asteroid.addImage(asteroidSprite);
  asteroid.debug = true;

  pop();
}

//Displays the spaceship
function createSpaceship(x,y,w,h){
  push();
  spaceship = new Sprite(x, y, w, h);
  spaceship.layer = 2;
  spaceship.scale = 0.5;
  imageMode(CENTER);
  spaceship.mass = 5
  spaceship.addImage(spaceshipImg);
  spaceship.rotationLock = true
  spaceship.bounce = 5
  spaceship.debug = true
  pop();

}


// when we press "w" speed gets added to the spacship until its speed reaches 10 after which no more 
// speed is added to the spaceship.Whatever speed it has gained it will have that speed. When "w" is
// released then we multiply speed by a decimal number which acts as friction.
function spaceshipControls(){
  spaceship.speed *= 0.99;

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
  if (kb.presses(' ')) {
    createBullets("spaceship");
  }
}

function createBullets(type){
  if(type === "spaceship"){
    let bullet = new Sprite(spaceship.position.x, spaceship.position.y,bulletImg.width-50,bulletImg.height-150);
    bullet.scale = 0.25;
    bullet.addImage(bulletImg);
    bullet.layer = 1;

    if(bullet.overlaps(spaceship)){
      bullet.collider = "n";
      bullet.remove();
    }
    else{
      bullet.collider = "d";
    }
    
    bullet.life = width+20;
    bullet.rotation = spaceship.rotation;
    bullet.speed = 12;
    bullet.debug = debugMode;
    spaceshipBullets.add(bullet);
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




