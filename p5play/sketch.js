// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Global variables
let bgImg;
let timer = 1000;
let extraAsteroids = timer*10;
let planet;
let planetImg;
let planetHP;
let score;
let introImg;
let state = "space mode"
let changeState = false;
let player = true;
let particle;
let terrain = [];
let xOffset = 0;

let desertBg;

//Spaceship stuff
let spaceship;
let spaceshipImg;
let spaceshipMoveImg1;
let spaceshipMoveImg2;
let spaceshipBullets;
let spawnWidth1;
let spawnWidth2;
let spawnWidthArray = [];
let spawnHeight1 = 100;
let spawnHeight2 = 500;
let spawnHeightArray = [];
let spaceshipHP;
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
  planetImg = loadImage("Assets/Images/planet.webp");
  introImg = loadImage("Assets/Images/Intro pic.jpeg");
  // desertBg = loadImage("Assets/Images/floor img.jpg");
  desertBg = loadImage("Assets/Images/Planet floor img.jpg");

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
  createPlanet(width/2,height/2);
  
  // asteroid stuff
  asteroids = new Group();
  
  for (let i = 0; i < 1; i++) {
    spawnWidth1 = random(300);
    spawnWidth2 = random(900,width)
    spawnWidthArray.push(spawnWidth1)
    spawnWidthArray.push(spawnWidth2)
    spawnHeight1 = random(100);
    spawnHeight2 = random(500,height)
    spawnHeightArray.push(spawnHeight1)
    spawnHeightArray.push(spawnHeight2)
    createAsteroid(random(spawnWidthArray),random(spawnHeightArray),0.35)
  }

}

//Draw loop
function draw() {


  if(changeState === true){
    state = "planet mode"
    console.log("planet mode")
    changeState = false;

  }

  if(state === "space mode"){
    spaceship.visible = true;
    asteroids.visible = true;
    planet.visible = true;
    clear();
    background(bgImg);
    spaceshipControls();
    checkCollision();
    edges();
    asteroidEdes();
    camera.x = width/2
    camera.y = height/2
    camera.zoom = 1
    //globalClock();
  }

  else{
    if(player === true){
      spaceship.visible = false;
      asteroids.visible = false;
      planet.visible = false;
      player = new Sprite();
      player.collider = "n"
    }
    playerControl();
    background("black")
    borderCheck();
    switchState();
    camera.on()
    imageMode(CENTER);
    camera.zoom = 0.7;
    
    image(desertBg,width/2,height/2);
    for(let n = 0; n<15; n++){
      image(desertBg,width/2+desertBg.width*n,height/2);
      image(desertBg,width/2-desertBg.width*n,height/2);
      for(let i = 1; i<15; i++){
        image(desertBg,width/2+desertBg.width*n,height/2+desertBg.height*i);
        image(desertBg,width/2-desertBg.width*n,height/2+desertBg.height*i);
        image(desertBg,width/2+desertBg.width*n,height/2-desertBg.height*i);
        image(desertBg,width/2-desertBg.width*n,height/2-desertBg.height*i);
      }
    }

    camera.x = player.x
    camera.y = player.y
    camera.off()
}
}

function playerControl(){
  player.speed = 100;
	
	if (kb.pressing('up')) {
		player.direction = -90;
	} else if (kb.pressing('down')) {
		player.direction = 90;
	} else if (kb.pressing('left')) {
		player.direction = 180;
	} else if (kb.pressing('right')) {
		player.direction = 0;
	} else {
	  player.speed = 0;
	}
}

function borderCheck(){
  if(player.pos.x > desertBg.width*15 && player.direction === 0){
    player.speed = 0
  }

  if(player.pos.x < -desertBg.width*13 && player.direction === 180){
    player.speed = 0
  }

  if(player.pos.y > desertBg.height*14.5 && player.direction === 90){
    player.speed = 0
  }

  if(player.pos.y < -desertBg.width*13.5 && player.direction === -90){
    player.speed = 0
  }
}

function switchState(){
  if(player.pos.x > desertBg.width*15){
    for (let i = 0; i < 5; i++) {
      spawnWidth1 = random(300);
      spawnWidth2 = random(900,width)
      spawnWidthArray.push(spawnWidth1)
      spawnWidthArray.push(spawnWidth2)
      spawnHeight1 = random(100);
      spawnHeight2 = random(500,height)
      spawnHeightArray.push(spawnHeight1)
      spawnHeightArray.push(spawnHeight2)
      createAsteroid(random(spawnWidthArray),random(spawnHeightArray),0.35)
    }
    player = true;
    state = "space mode"
  }
}

//checks collisions between various objects
function checkCollision(){
  spaceship.collides(asteroids, spaceshipHitAsteroids);
  spaceshipBullets.collides(asteroids, bulletsHitAsteroids);
  planet.collides(asteroids,planetHitAsteroids)

  if(asteroids.length ===0){
    changeState = true;
  }
}

//Eexcutes various functions after a specific amount of time
function globalClock(){

  //Adds more asteroids after 30s
  if (millis() > extraAsteroids) {
    for (let i=0; i<10; i++) {
      createAsteroid(random(spawnWidthArray), random(spawnHeightArray), 0.35)
    } 
    extraAsteroids = millis() + timer*10;
}
}


function createPlanet(x,y){
  push();
  planet = new Sprite(x, y,1800);
  planet.layer = 1;
  planet.scale = 0.1;
  if(spaceship.overlaps(planet)){
    planet.collider = "n";
  }
  else if(spaceshipBullets.overlaps(planet)){
    planet.collider = "n"
  }
  else{
    planet.collider = "s";
  }
  imageMode(CENTER);
  planet.addImage(planetImg)
  planet.mass = 2
  planet.debug = true;
  // camera.x = planet.x
  // camera.y = planet.y
  pop();
}

function planetHitAsteroids(planet,asteroids){

  for(let i = 0; i < 10; i++){
    particle = createSprite(asteroids.position.x, asteroids.position.y);
    particle.removeColliders();
    particle.addImage(particleImg);
    particle.direction = random(360);
    particle.speed = random(2,7)
    particle.life = 10;
    particle.scale = 0.25;
  }

  asteroids.remove();
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
  asteroid.debug = true;
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
  spaceship.debug = true;
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
    spaceship.rotation += 4;
  }
  if (kb.pressing("left")){
    spaceship.rotation -= 4;
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
    bullet.debug = true;
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