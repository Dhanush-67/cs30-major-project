// Project Title
// Dhanush Rai
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
let state = "space mode";
let changeState = false;
let player = true;
let particle;
let coins;
let coinImg;
let coinCount = 0;
let spaceshipCoinCount = 0;

//sfx
let thrust;
let shootSound;
let coinCollect;
let destroyAsteroid;
let gameOverSound;

//planet mode
let desertBg;
let portal;
let portalImg;
let mineral;
let mineralCount = 0;
let mineralImg;
let monsters;
let monsterImg;
let playerImg;
let playerDownImg;
let playerUpImg;
let playerLeftImg;
let playerRightImg;
let fireballs;
let fireballImg;

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
let button;



//preload
function preload() {
  //images
  bgImg = loadImage("Assets/Images/space bg.png");
  spaceshipImg = loadImage("Assets/Images/Spaceship3.png");
  bulletImg = loadImage("Assets/Images/bullet.gif");
  spaceshipMoveImg1 = loadImage("Assets/Images/Spaceship with fire 1.png");
  spaceshipMoveImg2 = loadImage("Assets/Images/Spaceship with fire 2 copy.png");
  planetImg = loadImage("Assets/Images/planet.webp");
  introImg = loadImage("Assets/Images/Intro pic.jpeg");
  desertBg = loadImage("Assets/Images/Planet floor img.jpg");
  // desertBg = loadImage("Assets/Images/ice background.jpg");
  portalImg = loadImage("Assets/Images/portal gif.gif");
  mineralImg = loadImage("Assets/Images/red icy shard.png");
  coinImg = loadImage("Assets/Images/coin spinning.gif");
  monsterImg = loadImage("Assets/Images/fire monster.gif");
  fireballImg = loadImage("Assets/Images/fireballani-ezgif.com-effects.gif");

  //multiple asteroid images
  asteroidImg1 = loadImage("Assets/Images/Asteroid1.png");
  asteroidImg2 = loadImage("Assets/Images/Asteroid2.png");
  asteroidImg3 = loadImage("Assets/Images/Asteroid3.png");
  asteroidImg4 = loadImage("Assets/Images/Asteroid4.png");
  asteroidImg5 = loadImage("Assets/Images/Asteroid5.png");
  particleImg = loadImage("Assets/Images/particle.png");

  //multiple player images
  playerImg = loadImage("Assets/Images/ezgif.com-animated-gif-maker (4).gif");
  playerDownImg = loadImage("Assets/Images/ezgif.com-animated-gif-maker (2).gif");
  playerUpImg = loadImage("Assets/Images/ezgif.com-animated-gif-maker.gif");
  playerLeftImg = loadImage("Assets/Images/ezgif.com-animated-gif-maker (3).gif");
  playerRightImg = loadImage("Assets/Images/ezgif.com-animated-gif-maker (1).gif");

  //audio
  thrust = loadSound("Assets/Audio/space thrust.mp3");
  shootSound = loadSound("Assets/Audio/bullet sound.mp3");
  coinCollect = loadSound("Assets/Audio/coin collect.mp3");
  destroyAsteroid = loadSound("Assets/Audio/asteroid destoyed.mp3");
  gameOverSound = loadSound("Assets/Audio/game over.mp3");
}


//Setup
function setup(){
  new Canvas();
  monsters = new Group();
  coins = new Group();
  button = createButton('shop');
  button.position(0, 100);
  fireballs = new Group();

  //spaceship setup stuff
  createSpaceship(width/2,height/2,spaceshipImg.height-30,60);
  spaceshipBullets = new Group();
  createPlanet(width/2,height/2);
  
  // asteroid stuff
  asteroids = new Group();
  
  for (let i = 0; i < 1; i++) {
    spawnWidth1 = random(300);
    spawnWidth2 = random(900,width);
    spawnWidthArray.push(spawnWidth1);
    spawnWidthArray.push(spawnWidth2);
    spawnHeight1 = random(100);
    spawnHeight2 = random(500,height);
    spawnHeightArray.push(spawnHeight1);
    spawnHeightArray.push(spawnHeight2);
    createAsteroid(random(spawnWidthArray),random(spawnHeightArray),0.35);
  }

}

//Draw loop
function draw() {


  if(changeState === true){
    state = "planet mode";
    changeState = false;
  }

  if(state === "space mode"){
    spaceship.visible = true;
    asteroids.visible = true;
    planet.visible = true;
    button.show();
    clickButton();
    clear();
    background(bgImg);
    spaceshipControls();
    checkCollision();
    edges();
    asteroidEdes();
    camera.x = width/2;
    camera.y = height/2;
    camera.zoom = 1;
    //globalClock();
  }

  else{
    if(player === true){
      spaceship.visible = false;
      asteroids.visible = false;
      planet.visible = false;
      thrust.stop();
      button.hide();
      coins.remove();
      spaceship.speed = 0;
      createPlayer();
      createPortal();
      createMineral();
      spawnMonsters();
    }

    checkCollisionPlanet();
    moveMonster();
    playerControl();
    background("black");
    borderCheck();
    camera.on();
    imageMode(CENTER);
    spawnClock();
    camera.zoom = 0.7;
    createBg();
    camera.x = player.x;
    camera.y = player.y;
    camera.off();
  }
}



//Functions
//Planet mode functions
//creates background for planet mode
function createBg(){
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
}

//creates a single mineral everytime state switches to planet mode in a random spot
function createMineral(){
  mineral = new Sprite(random(-desertBg.width*1,desertBg.width*3),random(-desertBg.width*2.5,desertBg.height*1.5),
    800,800);
  mineral.addImage(mineralImg);
  mineral.overlaps(planet)
  mineral.overlaps(spaceship)
  mineral.scale = 0.1;
  mineral.debug = true;
}

//creates a player when state switches to planet mode
function createPlayer(){
  player = new Sprite(width/2,height/2,30,40);
  player.addAni("idle",playerImg);
  player.addAni("movingDown", playerDownImg);
  player.addAni("movingUp", playerUpImg);
  player.addAni("movingLeft", playerLeftImg);
  player.addAni("movingRight", playerRightImg);
  // player.collider = "n";
  player.overlaps(spaceship)
  player.overlaps(planet)
  player.rotationLock = true;
  player.scale = 3
  player.debug = true;
}

//creates a single portal everytime state switches to planet mode in a random spot
function createPortal(){
  portal = new Sprite(random(-desertBg.width*1,desertBg.width*3),random(-desertBg.width*2.5,desertBg.height*1.5),
    200,600);
  portal.addImage(portalImg);
  portal.collider = "n";
  portal.debug = true;
}

//collision checker for planet mode
function checkCollisionPlanet(){
  player.overlaps(mineral, playerHitMineral);
  player.overlaps(portal,playerHitPortal);
  player.collides(fireballs,playerHitFireball);
}

//fireball disappears after hitting player
function playerHitFireball(player,fireball){
  fireball.remove();
}

//If player a mineral and enters planet function call state switcher function
function playerHitPortal(player,portal){
  console.log("hit");
  if(mineralCount === 1){
    console.log("switch");
    mineralCount = 0;
    portal.remove();
    monsters.remove();
    mineral.remove();
    player.remove();
    fireballs.remove();
    switchState();
  }
}

//mineral gets removed from screen and mineral counter goes up by one
function playerHitMineral(player,mineral){
  mineral.remove();
  mineralCount ++;
}

// shoots fireballs after 10s
function spawnClock(){
  fireballs.speed = 10
  if (millis() > extraAsteroids) {
    for (let i=0; i<10; i++) {
      for(let monster of monsters){
        shootFireball(monster.angleTo(player),monster.pos.x,monster.pos.y)
      } 
    }
    extraAsteroids = millis() + timer*10;
  }
  
}

//creates fireballs which go from the monster to the player
function shootFireball(angle,x,y){
  let fireball = new fireballs.Sprite(x,y)
  fireball.addImage(fireballImg)
  fireball.removeColliders()
  fireball.addCollider(0,30,100)
  fireball.direction = angle
  for(let monster of monsters){
    fireball.overlaps(monster)
  }
  fireball.overlaps(planet)
  fireball.overlaps(spaceship)
  fireball.overlaps(mineral)
  fireball.debug = true;
  fireball.life = 500
}

//spawns monsters at a specific distance from the player
function spawnMonsters(){
  let tempPos = p5.Vector.fromAngle(random(360), random(300,900));
  let monsterPos = p5.Vector.add(player.position, tempPos);
  let monster = new monsters.Sprite(monsterPos.x,monsterPos.y,);
  monster.rotationLock = true;
  monster.scale = 0.5
  monster.debug = true;
}

//monsters follow the player and if it comes to close it stops moving
function moveMonster(){
  for(let monster of monsters){
    let distance = dist(player.x, player.y, monster.x, monster.y);
    monster.addImage(monsterImg)
    monster.removeColliders();
    monster.addCollider(100,100,500,700);
    monster.overlaps(planet)
    monster.overlaps(spaceship)
    monster.overlaps(mineral)
    if(monster.angleTo(player) > -90 && monster.angleTo(player) < 90){
      monster.mirror.x = false;
    }
    else{
      monster.mirror.x = true;
    }

    if (distance > 40) {
      monster.direction = monster.angleTo(player);
      monster.speed = random(5);
    } else if (distance < 30) {
      monster.speed = 0;
    }
  }
}

//player contols
function playerControl(){
  player.speed = 100;
	
  if (kb.pressing("up")) {
    player.direction = -90;
    player.changeAni("movingUp");
  } else if (kb.pressing("down")) {
    player.direction = 90;
    player.changeAni("movingDown");
  } else if (kb.pressing("left")) {
    player.direction = 180;
    player.changeAni("movingLeft");
  } else if (kb.pressing("right")) {
    player.direction = 0;
    player.changeAni("movingRight");
  } else {
	  player.speed = 0;
    player.changeAni("idle");
  }
}

//player cannot cross these border
function borderCheck(){
  if(player.pos.x > desertBg.width*3 && player.direction === 0){
    player.speed = 0;
  }
  if(player.pos.x < -desertBg.width*1 && player.direction === 180){
    player.speed = 0;
  }
  if(player.pos.y > desertBg.height*1.5 && player.direction === 90){
    player.speed = 0;
  }
  if(player.pos.y < -desertBg.width*2.5 && player.direction === -90){
    player.speed = 0;
  }
}

//switches state back to space mode while also adding some asteroids to prevent other state switch
// from switching it back to planet mode
function switchState(){
  for (let i = 0; i < 5; i++) {
    spawnWidth1 = random(300);
    spawnWidth2 = random(900,width);
    spawnWidthArray.push(spawnWidth1);
    spawnWidthArray.push(spawnWidth2);
    spawnHeight1 = random(100);
    spawnHeight2 = random(500,height);
    spawnHeightArray.push(spawnHeight1);
    spawnHeightArray.push(spawnHeight2);
    createAsteroid(random(spawnWidthArray),random(spawnHeightArray),0.35);
  }
  player = true;
  state = "space mode";
}



// Space mode functions
//checks collisions between various objects
function checkCollision(){
  spaceship.collides(asteroids, spaceshipHitAsteroids);
  spaceshipBullets.collides(asteroids, bulletsHitAsteroids);
  planet.collides(asteroids,planetHitAsteroids);
  if(coinCount >= 1){
    spaceship.overlaps(coins,spaceshipHitCoin);
  }
  

  if(asteroids.length ===0){
    changeState = true;
  }
}

function clickButton(){
  button.mousePressed(() => {
    allSprites.speed = 0;
  });
}

//Eexcutes various functions after a specific amount of time
function globalClock(){

  //Adds more asteroids after 30s
  if (millis() > extraAsteroids) {
    for (let i=0; i<10; i++) {
      createAsteroid(random(spawnWidthArray), random(spawnHeightArray), 0.35);
    } 
    extraAsteroids = millis() + timer*10;
  }
}

//creates the planet
function createPlanet(x,y){
  push();
  planet = new Sprite(x, y,1800);
  planet.layer = 1;
  planet.scale = 0.1;
  if(spaceship.overlaps(planet)){
    planet.collider = "n";
  }
  else if(spaceshipBullets.overlaps(planet)){
    planet.collider = "n";
  }
  else{
    planet.collider = "s";
  }
  imageMode(CENTER);
  planet.addImage(planetImg);
  planet.mass = 2;
  planet.debug = true;
  pop();
}

//checks collisions between spaceship and coins
function spaceshipHitCoin(spaceship,coins){
  coins.remove();
  spaceshipCoinCount += 1;
}

//checks collisions between planet and asteroid
function planetHitAsteroids(planet,asteroids){

  for(let i = 0; i < 10; i++){
    particle = createSprite(asteroids.position.x, asteroids.position.y);
    particle.removeColliders();
    particle.addImage(particleImg);
    particle.direction = random(360);
    particle.speed = random(2,7);
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
    particle.speed = random(2,7);
    particle.life = 10;
    particle.scale = 0.25;
  }

  createCoin(asteroids.position.x, asteroids.position.y);


  let minSize = asteroids.scale-0.2;
  if (minSize>=0.1) {
    createAsteroid(asteroids.position.x, asteroids.position.y, 0.2);
    createAsteroid(asteroids.position.x, asteroids.position.y, 0.2);
  }
  bullets.remove();
  asteroids.remove();
}

//displays coins when asteroids are destroyed
function createCoin(x,y){
  let coin = new coins.Sprite(x,y);
  coin.removeColliders();
  coin.addImage(coinImg);
  coin.scale = 0.25;
  coinCount += 1;
  coin.debug = true;
}

//checks collisions between asteroids and spaceship
function spaceshipHitAsteroids(spaceship, asteroids) {
  for(let i = 0; i < 10; i++){
    particle = createSprite(asteroids.position.x, asteroids.position.y);
    particle.removeColliders();
    particle.addImage(particleImg);
    particle.direction = random(360);
    particle.speed = random(2,4);
    particle.life = 15;
    particle.scale = 0.25;
  }

  createCoin(asteroids.position.x, asteroids.position.y);
  asteroids.remove();
}

//Displays the asteroid
function createAsteroid(x, y, size) {
  push();
  let asteroid = new asteroids.Sprite(x,y,200);
  asteroidSprite = random([asteroidImg1,asteroidImg2,asteroidImg3,asteroidImg4,asteroidImg5]);

  //set new hitboxes for each different asteroid
  if(asteroidSprite === asteroidImg1){
    asteroid.removeColliders();
    asteroid.addCollider(-5,-5, 200);
  }
  if(asteroidSprite === asteroidImg2){
    asteroid.removeColliders();
    asteroid.addCollider(-8,3, 220);
  }
  if(asteroidSprite === asteroidImg3){
    asteroid.removeColliders();
    asteroid.addCollider(5,-15,250);
  }
  if(asteroidSprite === asteroidImg4){
    asteroid.removeColliders();
    asteroid.addCollider(5,-7,220);
  }
  if(asteroidSprite === asteroidImg5){
    asteroid.removeColliders();
    asteroid.addCollider(-8,-4,220);
  }

  asteroid.scale = size;
  asteroid.addImage(asteroidSprite);
  asteroid.bounciness = 0.6;
  spaceship.mass = 5;
  asteroid.direction = random(360);
  asteroid.speed = random(2,7);
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
  spaceship.mass = 2;
  spaceship.addAni("idle",spaceshipImg);
  spaceship.addAni("moving", spaceshipMoveImg1,spaceshipMoveImg1,spaceshipMoveImg2);
  spaceship.rotationLock = true;
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
    thrust.play();
  } 
  else{
    spaceship.changeAni("idle");
    thrust.stop();
  }
  if (kb.pressing("right")){
    spaceship.rotation += 4;
  }
  if (kb.pressing("left")){
    spaceship.rotation -= 4;
  } 
  if (kb.presses(" ")) {
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