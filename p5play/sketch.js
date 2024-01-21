// Project Title
// Dhanush Rai
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Global variables
let bgImg;
let timer = 1000;
let extraAsteroids = timer*5;
let planet;
let planetImg;
let planetHP = 40;
let score;
let introImg;
let state = "start screen";
let changeState = false;
let player = true;
let particle;
let coins;
let coinImg;
let coinCount = 0;
let spaceshipCoinCount = 0;
let shopImg;
let shopButton;
let gameOverImg;
let shopUI;
let bulletButton;
let bulletButtonDisplay = false;
let bulletSpeed = 0;
let shop;
let shopState;
let bulletUp;
let newPlanet;
let shield;
let playerMineralCount = 0;
let playButtonImg;
let instructionButtonImg;
let instructionButton;
let playButton

//sfx
let thrust;
let shootSound;
let coinCollect;
let destroyAsteroid;
let gameOverSound;
let bgSound;

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
let playerHP = 10;
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
let asteroidCount = 0;
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
  planetImg = loadImage("Assets/Images/lava planet animated from space (2).png");
  introImg = loadImage("Assets/Images/Intro pic.jpeg");
  desertBg = loadImage("Assets/Images/molten lava bg.webp");
  portalImg = loadImage("Assets/Images/portal gif.gif");
  mineralImg = loadImage("Assets/Images/red icy shard.png");
  coinImg = loadImage("Assets/Images/coin spinning.gif");
  monsterImg = loadImage("Assets/Images/fire monster.gif");
  fireballImg = loadImage("Assets/Images/fireballani-ezgif.com-effects.gif");
  shopImg = loadImage("Assets/Images/shop icon.png");
  gameOverImg = loadImage("Assets/Images/game-over-glitch.gif");
  gameOverImg = loadImage("Assets/Images/istockphoto-1326959978-640x640.jpg");
  shopUI = loadImage("Assets/Images/2109.w032.n003.25B.p1.25.png")
  playButtonImg = loadImage("Assets/Images/Play Button.png")
  instructionButtonImg = loadImage("Assets/Images/Instruction Button.png")

  //multiple asteroid images
  asteroidImg1 = loadImage("Assets/Images/Asteroid1.png");
  asteroidImg2 = loadImage("Assets/Images/Asteroid2.png");
  asteroidImg3 = loadImage("Assets/Images/Asteroid3.png");
  asteroidImg4 = loadImage("Assets/Images/Asteroid4.png");
  asteroidImg5 = loadImage("Assets/Images/Asteroid5.png");
  particleImg = loadImage("Assets/Images/particle.png");

  //multiple player images
  playerImg = loadImage("Assets/Images/ezgif.com-resize (4).gif");
  playerDownImg = loadImage("Assets/Images/ezgif.com-resize.gif");
  playerUpImg = loadImage("Assets/Images/ezgif.com-resize (3).gif");
  playerLeftImg = loadImage("Assets/Images/ezgif.com-resize (1).gif");
  playerRightImg = loadImage("Assets/Images/ezgif.com-resize (2).gif");

  //audio
  thrust = loadSound("Assets/Audio/space thrust.mp3");
  shootSound = loadSound("Assets/Audio/arrays-objects-assn_shoot Sound.wav");
  coinCollect = loadSound("Assets/Audio/coin collect.mp3");
  destroyAsteroid = loadSound("Assets/Audio/asteroid destoyed.mp3");
  gameOverSound = loadSound("Assets/Audio/game over.mp3");
  bgSound = loadSound("Assets/Audio/stranger-things-124008.mp3")

  thrust.setVolume(0.2);
  bgSound.setVolume(0.05)
}


//Setup
function setup(){
  new Canvas();
  monsters = new Group();
  coins = new Group();
  fireballs = new Group();
  shield = new Group();
  spaceshipBullets = new Group();
  asteroids = new Group();

  //button stuff
  shopButton = new Clickable();    
  shopButton.locate(0,100);
  shopImg.scale = 5;
  shopButton.image = shopImg; 
  shopButton.fitImage = false;
  shopButton.resize(75, 80);
  shopButton.text = ""; 

  shopButton.onHover = function(){
    shopButton.resize(85, 90);
  }
  shopButton.onOutside = function(){
    shopButton.resize(75, 80);
  }
  shopButton.onPress = function(){
    openShop();
  }
    playButton = new Sprite(width/2, height/2,500,200);
    playButton.addImage(playButtonImg)
    playButton.collider = "s"
    playButton.scale = 0.6
    instructionButton = new Sprite(width-50, height-50,550);
    instructionButton.addImage(instructionButtonImg)
    instructionButton.collider = "s"
    instructionButton.scale = 0.1

}

//Draw loop
function draw() {

  //upgrade button checker
  bulletButtonChecker();

  //state switchers
  if(planetHP <= 0){
    state = "end game"
    endGame();
  }
  else if(playerMineralCount >= 1){
    state = "win game"
    winGame();
  }
  else if(changeState === true){
    state = "planet mode";
    changeState = false;
  }
  else if(state === "start screen"){
    displayStartScreen();
  }

  //space mode
  else if(state === "space mode"){
    spaceship.visible = true;
    asteroids.visible = true;
    planet.visible = true;
    planet.collider = "s"
    spaceship.collider = "d"
    clear();
    background(bgImg);
    shopButton.draw();
    spaceshipControls();
    checkCollision();
    displayUI();
    edges();
    asteroidEdes();
    camera.x = width/2;
    camera.y = height/2;
    camera.zoom = 1;
  }

  //planet mode
  else if(state === "planet mode"){
    if(player === true){
      spaceship.visible = false;
      asteroids.visible = false;
      planet.visible = false;
      spaceshipBullets.removeAll();
      particle.remove();
      thrust.stop();
      coins.removeAll();
      spaceship.speed = 0;
      createPlayer();
      createPortal();
      createMineral();
      spawnMonsters();
    }
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
    checkCollisionPlanet();
  }

  if (!bgSound.isPlaying()){
    bgSound.loop();
  }
}




//Functions
function endGame(){
  push()
    spaceship.remove()
    planet.remove();
    camera.x = width/2;
    camera.y = height/2;
    asteroids.remove();
    particle.remove();
    spaceshipBullets.remove();
    coins.remove();
    rectMode(CENTER);
    background("black");
    textSize(100);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text('Game Over', width/2, height/2);
    pop()
}

//displays hp and coins and asteroid amount
function displayUI(){
  push();
  textSize(30);
  textStyle(BOLD);
  fill("white");
  text("HP: "+planetHP,20,50);
  text("Coins: "+spaceshipCoinCount,130,50);
  text("Asteroids: "+asteroids.length,270,50);
  text("Minerals: "+playerMineralCount,460,50);
  pop();
}

//checks if bullet upgrade button is pressed
function bulletButtonChecker(){
  if(bulletButtonDisplay === true){
    if(bulletButton.mouse.presses() && spaceshipCoinCount>= 10){
   bulletSpeed += 2;
   spaceshipCoinCount -= 10;
   bulletButton.color = "red"
 }
 if(bulletButton.mouse.hovering()){
   bulletButton.scale = 1.2;
 }
 else{
   bulletButton.scale = 1;
 }
 }
}

//If minerals = 5, the game will end
function winGame(){
  monsters.remove();
  portal.remove();
  fireballs.remove();
  camera.x = width/2;
  camera.y = height/2;
  background(bgImg)
  newPlanet = new Sprite(random(width),random(height),500)
  newPlanet.addImage(planetImg)
  newPlanet.scale = 0.5
}

//start screen
function displayStartScreen(){
  background(bgImg)

  if(playButton.mouse.hovering()){
    playButton.scale = 0.65;
  }
  else{
    playButton.scale = 0.6;
  }
  if(instructionButton.mouse.hovering()){
    instructionButton.scale = 0.12;
  }
  else{
    instructionButton.scale = 0.1;
  }
  if(instructionButton.mouse.presses()){
    console.log("hi")
  }
  if(playButton.mouse.presses()){
    playButton.collider = "n"
    instructionButton.collider = "n"
    playButton.remove()
    instructionButton.remove()

    //creates asteroids, spaceship and planet once game starts
    createSpaceship(width/2,height/2,spaceshipImg.height-30,60)
    createPlanet(width/2,height/2)
    for (let i = 0; i < 3; i++) {
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

    state = "space mode"
  }
}


//Planet mode functions
//creates background for planet mode
function createBg(){
  desertBg.scale = 4;
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
  mineral.overlaps(planet);
  mineral.overlaps(spaceship);
  mineral.scale = 0.1;
}


//creates a player when state switches to planet mode
function createPlayer(){
  player = new Sprite(width/2,height/2,30,40);
  player.addAni("idle",playerImg);
  player.addAni("movingDown", playerDownImg);
  player.addAni("movingUp", playerUpImg);
  player.addAni("movingLeft", playerLeftImg);
  player.addAni("movingRight", playerRightImg);
  player.overlaps(spaceship);
  player.overlaps(planet);
  player.rotationLock = true;
  player.scale = 1.5;
}


//creates a single portal everytime state switches to planet mode in a random spot
function createPortal(){
  portal = new Sprite(random(-desertBg.width*1,desertBg.width*3),random(-desertBg.width*2.5,desertBg.height*1.5),
    200,600);
  portal.addImage(portalImg);
  portal.scale = 0.8;
  portal.collider = "n";
}


//collision checker for planet mode
function checkCollisionPlanet(){
  if(!playerHP <= 0){
    player.overlaps(mineral, playerHitMineral);
    player.overlaps(portal,playerHitPortal);
    player.collides(fireballs,playerHitFireball);
    player.collides(monsters,playerHitMonster);
  }
  else{
    playerHP = 10;
    portal.remove();
    monsters.removeAll();
    mineral.remove();
    player.remove();
    fireballs.removeAll();
    mineralCount = 0;
    switchState();
  }
}

//checks collison between monster and player and reduces player health
function playerHitMonster(player,monster){
  playerHP = 0;
}
  

//fireball disappears after hitting player
function playerHitFireball(player,fireball){
  playerHP -= 1;
  fireball.remove();
}


//If player a mineral and enters planet function call state switcher function
function playerHitPortal(player,portal){
  if(mineralCount >= 1){
    mineralCount = 0;
    portal.remove();
    monsters.removeAll();
    mineral.remove();
    player.remove();
    fireballs.removeAll();
    playerMineralCount += 1;
    switchState();
  }
}

//mineral gets removed from screen and mineral counter goes up by one
function playerHitMineral(player,mineral){
  mineral.remove();
  mineralCount += 1;
}

// shoots fireballs after 5s
function spawnClock(){
  fireballs.speed = 10;
  if (millis() > extraAsteroids) {
    for(let monster of monsters){
      shootFireball(monster.angleTo(player),monster.pos.x,monster.pos.y);
      shootFireball(monster.angleTo(player)+PI/2,monster.pos.x,monster.pos.y);
      shootFireball(monster.angleTo(player)-PI/2,monster.pos.x,monster.pos.y);
      shootFireball(monster.angleTo(player)+PI,monster.pos.x,monster.pos.y);
      shootFireball(monster.angleTo(player)-PI,monster.pos.x,monster.pos.y);
    } 
    extraAsteroids = millis() + timer*5;
  }
}

//creates fireballs which go from the monster to the player
function shootFireball(angle,x,y){
  let fireball = new fireballs.Sprite(x,y);
  fireball.addImage(fireballImg);
  fireball.removeColliders();
  fireball.addCollider(0,30,100);
  fireball.direction = angle;
  for(let monster of monsters){
    fireball.overlaps(monster);
  }
  fireball.overlaps(planet);
  fireball.overlaps(spaceship);
  fireball.overlaps(mineral);
  fireball.life = 500;
}

//spawns monsters at a specific distance from the player
function spawnMonsters(){
  let tempPos = p5.Vector.fromAngle(random(360), random(700,1000));
  let monsterPos = p5.Vector.add(player.position, tempPos);
  let monster = new monsters.Sprite(monsterPos.x,monsterPos.y,);
  monster.rotationLock = true;
  monster.scale = 0.5;
}

//monsters follow the player and if it comes to close it stops moving
function moveMonster(){
  for(let monster of monsters){
    let distance = dist(player.x, player.y, monster.x, monster.y);
    monster.addImage(monsterImg);
    monster.removeColliders();
    monster.addCollider(100,100,450,700);
    monster.overlaps(planet);
    monster.overlaps(spaceship);
    monster.overlaps(mineral);
    if(monster.angleTo(player) > -90 && monster.angleTo(player) < 90){
      monster.mirror.x = false;
    }
    else{
      monster.mirror.x = true;
      monster.removeColliders();
      monster.addCollider(-100,100,450,700);
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
  player.speed = 10;
	if (keyIsPressed === true) {
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
  } 
}
else {
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
  asteroidCount += 1;
  for (let i = 0; i < 5+asteroidCount; i++) {
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
    state = "planet mode"
  }
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
  planet = new Sprite(x, y,590);
  planet.layer = 1;
  // planet.scale = 0.1;
  planet.scale = 0.3;
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
  pop();
}

//checks collisions between spaceship and coins
function spaceshipHitCoin(spaceship,coins){
  coins.remove();
  coinCollect.play();
  spaceshipCoinCount += 1;
}

//checks collisions between planet and asteroid
function planetHitAsteroids(planet,asteroids){

  for(let i = 0; i < 30; i++){
    particle = createSprite(asteroids.position.x, asteroids.position.y);
    particle.removeColliders();
    particle.addImage(particleImg);
    particle.direction = random(360);
    particle.speed = random(2,7);
    particle.life = 20;
    particle.scale = 0.25;
  }

  if(asteroids.scale.x === 0.35){
    planetHP -= 2;
  }
  else{
    planetHP -= 1;
  }
  
  asteroids.remove();
}

//checks collisions between asteroids and bullets
function bulletsHitAsteroids(bullets,asteroids){

  for(let i = 0; i < 30; i++){
    particle = createSprite(asteroids.position.x, asteroids.position.y);
    particle.removeColliders();
    particle.addImage(particleImg);
    particle.direction = random(360);
    particle.speed = random(2,7);
    particle.life = 20;
    particle.scale = 0.25;
  }
  destroyAsteroid.play();
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
}

//checks collisions between asteroids and spaceship
function spaceshipHitAsteroids(spaceship, asteroids) {
  for(let i = 0; i < 30; i++){
    particle = createSprite(asteroids.position.x, asteroids.position.y);
    particle.removeColliders();
    particle.addImage(particleImg);
    particle.direction = random(360);
    particle.speed = random(2,4);
    particle.life = 20;
    particle.scale = 0.25;
  }
  destroyAsteroid.play();
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
    if (!thrust.isPlaying()){
      thrust.play();
    }
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
    shootSound.play();
    createBullets("spaceship");
  }
  if(mouse.presses("right") && shopState === true){
    closeShop()
    shopState = false
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
    bullet.speed = 12 + bulletSpeed;
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

//opens shop
function openShop(){
  allSprites.speed = 0;
  shop = new Sprite();
  shop.collider = "n"
  shop.addImage(shopUI)
  shop.scale = 0.3

  bulletUp = new Sprite();
  bulletUp.collider = "n"
  bulletUp.addImage(bulletImg);
  bulletUp.scale = 0.8

  bulletButtonDisplay = true;
  shopState = true;
  
  bulletButton = new Sprite(width/2,height/2+138,80,40);
  bulletButton.color = '#cdc50a';
  bulletButton.collider = "s"
  bulletButton.textSize = 40;
  bulletButton.text = "10";
  bulletButton.textColor = "blue"
}

//closes shop
function closeShop(){
  shop.remove();
  bulletUp.remove();
  bulletButton.remove();
  for(let asteroid of asteroids){
  asteroid.direction = random(360);
  asteroid.speed = random(2,7);
  }
  
}
