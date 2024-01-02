// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Global variables
let bgImg;
let timer = 1000;
let extraAsteroids = timer*30;

//Spaceship stuff
let spaceship;
let spaceshipImg;
let spaceshipMoveImg1;
let spaceshipMoveImg2;
let spaceshipBullets;
let bulletImg;

//Asteroid stuff
let asteroidImg1;
let asteroidImg2;
let asteroidImg3;
let asteroidImg4;
let asteroidImg5;
let particleImg;
let asteroids;



//preload
function preload() {
  bgImg = loadImage("Assets/Images/space bg.png");
  spaceshipImg = loadImage("Assets/Images/Spaceship3.png");
  bulletImg = loadImage("Assets/Images/bullet.gif")
  spaceshipMoveImg1 = loadImage("Assets/Images/Spaceship with fire 1.png");
  spaceshipMoveImg2 = loadImage("Assets/Images/Spaceship with fire 2 copy.png");

  //multiple asteroid images
  asteroidImg1 = loadImage("Assets/Images/Asteroid1.png");
  asteroidImg2 = loadImage("Assets/Images/Asteroid2.png");
  asteroidImg3 = loadImage("Assets/Images/Asteroid3.png");
  asteroidImg4 = loadImage("Assets/Images/Asteroid4.png");
  asteroidImg5 = loadImage("Assets/Images/Asteroid5.png");
  particleImg = loadImage("Assets/Images/particle.png");
}


//Setup
function setup(){
  new Canvas();

  //spaceship setup stuff
  createSpaceship(width/2,height/2,spaceshipImg.height-30,60);
  spaceshipBullets = new Group();
  
  // asteroid stuff
  asteroids = new Group();
  for (let i = 0; i < 10; i++) {
    createAsteroid(random(width),random(height),0.35)
  }

}

//Draw loop
function draw() {
  clear();
  background(bgImg);
  spaceshipControls();
  checkCollision();
  edges();
  asteroidEdes();
  globalClock();
}

//checks collisions between various objects
function checkCollision(){
  spaceship.collides(asteroids, spaceshipHitAsteroids);
  spaceshipBullets.collides(asteroids, bulletsHitAsteroids);
}

//Eexcutes various functions after a specific amount of time
function globalClock(){

  //Adds more asteroids after 30s
  if (millis() > extraAsteroids) {
    for (let i=0; i<10; i++) {
      createAsteroid(random(width), random(height), 0.35)
    } 
    extraAsteroids = millis() + timer*30;
  }
}

//checks collisions between asteroids and bullets
function bulletsHitAsteroids(bullets,asteroids){

  for(let i = 0; i < 10; i++){
    particle = createSprite(asteroids.position.x, asteroids.position.y);
    particle.removeColliders();
    particle.addImage(particleImg);
    particle.direction = random(360);
    particle.speed = random(2,7)
    particle.life = 10;
    particle.scale = 0.25;
  }

  let minSize = asteroids.scale-0.2;
  if (minSize>=0.1) {
    createAsteroid(asteroids.position.x, asteroids.position.y, 0.2);
    createAsteroid(asteroids.position.x, asteroids.position.y, 0.2);
  }
  bullets.remove();
  asteroids.remove();
}

//checks collisions between asteroids and spaceship
function spaceshipHitAsteroids(spaceship, asteroids) {
  for(let i = 0; i < 10; i++){
    particle = createSprite(asteroids.position.x, asteroids.position.y);
    particle.removeColliders();
    particle.addImage(particleImg);
    particle.direction = random(360);
    particle.speed = random(2,4)
    particle.life = 15;
    particle.scale = 0.25;
  }
  asteroids.remove();
}

//Displays the asteroid
function createAsteroid(x, y, size) {
  push();
  let asteroid = new asteroids.Sprite(x,y,200);
  asteroidSprite = random([asteroidImg1,asteroidImg2,asteroidImg3,asteroidImg4,asteroidImg5]);

  //set new hitboxes for each different asteroid
  if(asteroidSprite === asteroidImg1){
    asteroid.removeColliders()
    asteroid.addCollider(-5,-5, 200);
  }
  if(asteroidSprite === asteroidImg2){
    asteroid.removeColliders()
    asteroid.addCollider(-8,3, 220);
  }
  if(asteroidSprite === asteroidImg3){
    asteroid.removeColliders()
    asteroid.addCollider(5,-15,250);
  }
  if(asteroidSprite === asteroidImg4){
    asteroid.removeColliders()
    asteroid.addCollider(5,-7,220);
  }
  if(asteroidSprite === asteroidImg5){
    asteroid.removeColliders()
    asteroid.addCollider(-8,-4,220);
  }

  asteroid.scale = size;
  asteroid.addImage(asteroidSprite);
  asteroid.bounciness = 0.6;
  spaceship.mass = 5
  asteroid.direction = random(360);
  asteroid.speed = random(2,7)
  pop();
}

//if asteroid goes offscreen it spawns on the opposite side of the screen
function asteroidEdes(){
  for(let asteroid of asteroids){

    if (asteroid.x > width + asteroid.w){
      asteroid.x = -10;
    }
    else if (asteroid.x < -asteroid.w){
      asteroid.x = width + asteroid.w;
    }
    if (asteroid.y > height + asteroid.h){
      asteroid.y = -10;
    }
    else if (asteroid.y < -asteroid.h){
      asteroid.y = height + asteroid.h;
    }
    }
}

//Displays the spaceship
function createSpaceship(x,y,w,h){
  push();
  spaceship = new Sprite(x, y, w, h);
  spaceship.layer = 2;
  spaceship.scale = 0.4;
  imageMode(CENTER);
  spaceship.mass = 2
  spaceship.addAni("idle",spaceshipImg);
  spaceship.addAni("moving", spaceshipMoveImg1,spaceshipMoveImg1,spaceshipMoveImg2);
  spaceship.rotationLock = true
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
    spaceship.changeAni("moving");
  } 
  else{
    spaceship.changeAni("idle");
  }
  if (kb.pressing("right")){
    spaceship.rotation += 0.09;
  }
  if (kb.pressing("left")){
    spaceship.rotation -= 0.09;
  } 
  if (kb.presses(' ')) {
    createBullets("spaceship");
  }
}

//creates bullets that get destroyed when it hits the asteroids
function createBullets(type){
  if(type === "spaceship"){
    let bullet = new Sprite(spaceship.position.x, spaceship.position.y,bulletImg.width-50,bulletImg.height-150);
    bullet.scale = 0.2;
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
