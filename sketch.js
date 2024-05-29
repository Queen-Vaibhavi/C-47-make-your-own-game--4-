//var santa,santaImg;
var path,pathImage;
var giftImg,gift1,gift2,gift3,gift4;
var score = 0;
var health = 10;
var GiftsDelivered = 0;

var NOGift_house1,NOGift_house2,NOGift_house3;
var YESGift_house1,YESGift_house2,YESGift_house3,YESGift_house4;
var bell, bellImg;
var double, doubleImg;

var giftEffect, theImg;
var vid,vid2;
var sprite;

//obstacles
var snowball,snowballImg;
var pit, pitImg;

//loading the sounds
var bellSound,snowHit,bgMusic;

//adding gamestates
var START = 1;
var STORY = 2;
var INST = 3;
var PLAY = 4;
var END = 0;
var gameState = START;


function preload(){

santaImg = loadImage("images/santa character transparent.png");
pathImage = loadImage("images/snowy path.jpg");
giftImg = loadImage("images/gift.png");

gift1 = loadImage("images/gift 1.png");
gift2 = loadImage("images/gift 2.png");
gift3 = loadImage("images/gift 3.png");
gift4 = loadImage("images/gift 4.png");

//houses with no gifts images here
NOGift_house1 = loadImage("houses/good_house_2-removebg-preview.png");
NOGift_house2 = loadImage("houses/good_house_5-removebg-preview.png");
NOGift_house3 = loadImage("houses/good_house_6-removebg-preview.png");

//houses with gifts images here
YESGift_house1 = loadImage("houses/house with gift 1.png");
YESGift_house2 = loadImage("houses/house with gift 2.png");
YESGift_house3 = loadImage("houses/house_with_gift_3.png");
YESGift_house4 = loadImage("houses/house with gift 4.png");

//the gift effect image
theImg = loadAnimation("images/output-onlinegiftools (3).gif");

//the bell effect image
bellImg = loadAnimation("images/bells-unscreen.gif");

//the X2 reward
doubleImg = loadImage("images/double gifts reward.png"); 

//vid.loadVedio("output-onlinegiftools-_3_");
//obstacles images
snowballImg = loadImage("images/hurling snowball for game.png");
pitImg = loadImage("images/snow pit.png");

//loading the sounds
bellSound = loadSound("bell achieve sound.mp3");
snowHit = loadSound("snowball hit sound.mp3");
bgMusic = loadSound("christmas theme subway.mp3");
giftDel = loadSound("gift delivered sound.mp3");
giftCol = loadSound("gift collected sound.mp3");

}

function setup() {
  createCanvas(1400,680);

  path = createSprite(750,280,1500,680);
  path.addImage(pathImage);

  santa = createSprite(400, 450, 50, 50);
  santa.addImage(santaImg);
  santa.scale = 1.3;

  //creating groups
  giftsGroup = new Group();
  housesGroup = new Group();
  snowGroup = new Group();
  pitGroup = new Group();
  bellsGroup = new Group();
  rewardGroup = new Group();

  //giftEffect = createSprite(200,200,50,50);
  //giftEffect.addAnimation(theImg);
//playing giftEffect vedio -
 vid = createVideo("output-onlinegiftools-3.webm");
  vid.loop()
  vid.speed(2);
  vid.position(600, 20);
  vid.pause();
  vid.hide(); 

  vid2 = createVideo("blue-works-unscreen2.webm");
  vid2.loop()
  vid2.speed(2);
  
  vid2.position(600,300);
  vid2.pause();
  vid2.hide(); 
  
  sprite = createSprite();
  sprite2 = createSprite();
}

function draw() {
  background(pathImage);  
  drawSprites();

//setting the score
fill("black");
textSize(30);
text("Score : " + score,250,50);

//no. of gifts delivered.
fill("black");
textSize(30);
text("Gifts Delivered to houses: " + GiftsDelivered,500,50);

//setting the health
fill("black");
textSize(30);
text("health : " + health,1000,50);

  //giving velocity to path.
path.velocityX = -4;

if (path.x < 650) {
  path.x = path.width / 2;
}

//making slegge move like game
if (keyDown(UP_ARROW)) {
  if (santa.velocityY === 0) {
    santa.velocityY = -6;

  } else {
    santa.velocityY = 0;
  }
  
}


if (keyDown(DOWN_ARROW)) {
  if (santa.velocityY === 0) {
    santa.velocityY = 6;

  } else {
    santa.velocityY = 0;
  }

}

  //spawnGift();
  spawnPresents();
  spawnHouses3();
  throwBall();
  pitSpawn();
  spawnBell();
  spawnDouble();
 
//gifts collecting feature to be added.
if(santa.isTouching(giftsGroup)){
  giftsGroup.destroyEach();
  score = score + 1;
  giftCol.play();
}

//health reducing on hitting snowball feature added.
if(santa.isTouching(snowGroup)){
  health = health - 1;
  snowHit.play();
}

//set the sprite collider later.
santa.debug = false;
santa.setCollider("rectangle",35,18,520,90);

//creating edge sprites;
edges = createEdgeSprites();

if(score > 3  || score === 3){
  spawnHouses4();

}
   
if(sprite.lifetime === 0){
console.log("vid hide code works");
vid.hide();
} 

if(santa.isTouching(bellsGroup)){
  sprite2 = createSprite();
  sprite2.lifetime = 30;
  vid2.play();
  vid2.show();
  bellsGroup.destroyEach();
  bellSound.play();
  health = health + 4;
  } 
  

  if(sprite2.lifetime === 0){
    console.log("vid2 hide code works")
    vid2.hide();
    } 

 //decide lifetime for snowball
 if(snowGroup.isTouching(santa)){
  snowGroup.setLifetimeEach(0);
}

//adding doubled gifts reward feature
if(rewardGroup.isTouching(santa)){
  score = score + 2;
  rewardGroup.setLifetimeEach(0);
}

//bgMusic.play();
if(gameState === START){}
else if(gameState === PLAY){}
else if(gameState === END){}

//do add function reset

}//function draw bracket

function keyPressed(){
if(keyCode === 32){
  sprite = createSprite();
  sprite.lifetime = 30;
  console.log("it worked!");
  GiftsDelivered = GiftsDelivered + 1;
  vid.play();
  vid.show();
  giftDel.play();
}
}
  
function keyReleased(){
sprite.lifetime = 50;
}

/* create another function to do (functio hisesprite)
 if(sprite.lifetime === 0){
  vid.hide();
} else {
  vid.show();
}  */

function spawnGift() {
  //write code here to spawn the gift
  if (frameCount % 190 === 0) {
    gift = createSprite(945, 70, 40, 40);
    gift.y = Math.round(random(200, 750));
    gift.addImage(giftImg);
    gift.scale = 0.6;
    gift.velocityX = -3;

    //assign lifetime to the variable
    gift.lifetime = 400;

    //adjust the depth
    gift.depth = santa.depth;

    //making the gift invisible as we don't want to use it - only its lifetime for gifteffect
    //gift.visible = false;
  
    //adding gift to the group
    giftsGroup.add(gift);
  }
}

function spawnPresents(){
  //write code here to spawn the gift
  if (frameCount % 190 === 0) {
    present = createSprite(1401, 70, 40, 40);
    present.y = Math.round(random(200, 750));
    
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1: present.addImage(gift1);
        break;
      case 2: present.addImage(gift2);
        break;
      case 3: present.addImage(gift3);
        break;
      case 4: present.addImage(gift4);
          break;
      default: break;
    }

    present.scale = 0.6;
    present.velocityX = -5;

    //assign lifetime to the variable
    present.lifetime = 1200;

    //adjust the depth
    present.depth = santa.depth;
  
    present.debug = false;
    //adding gift to the group
    giftsGroup.add(present);
  }
}


function spawnHouses3(){
  //write code here to spawn the gift
  if (frameCount % 400 === 0) {
    house = createSprite(1601, 320, 40, 40);
      
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1: house.addImage(NOGift_house1);
              house.scale = 2;
              house.y = 300;
        break;
      case 2: house.addImage(NOGift_house2);
        break;
      case 3: house.addImage(NOGift_house3);
              house.y = 370;
        break;
      default: break;
    }

    //present.scale = 0.6;
    house.velocityX = -5;

    //assign lifetime to the variable
    house.lifetime = 1200;

    //adjust the depth
    house.depth = santa.depth - 1;
  
    //house.debug = false;
    //adding house to the group
    housesGroup.add(house);
  }
}


function spawnHouses4(){
  //write code here to spawn the gift
  if (frameCount % 550 === 0) {
    home = createSprite(1650, 290, 40, 40);
      
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1: home.addImage(YESGift_house1);
        break;
      case 2: home.addImage(YESGift_house2);
        break;
      case 3: home.addImage(YESGift_house3);
        break;
      case 4: home.addImage(YESGift_house4);
              home.scale = 1.6;
              home.y = 210;
        break;
      default: break;
    }

    //present.scale = 0.6;
    home.velocityX = -5;

    //assign lifetime to the variable
    home.lifetime = 1200;

    //adjust the depth
    home.depth = santa.depth - 1;
  
    //house.debug = false;
    //adding house to the group
    housesGroup.add(home);
  }
}


function throwBall(){

  if(frameCount % 150 === 0){
    snow = createSprite(50,50,40,40);
    snow.x = Math.round(random(1050, 1480));
    snow.y = 20;
    snow.addImage(snowballImg);
    snow.scale = 0.4;
    snow.velocityX = -6;
    snow.velocityY = 5;

 // the depth.
snow.depth = santa.depth;

//adding it tp a group.
snowGroup.add(snow);

snow.debug = false;
snow.setCollider("circle", 10, 34, 150);

  }

}// throwball bracket

function pitSpawn(){

  if(frameCount % 630 === 0){
    pit = createSprite(50,50,40,40);
    pit.x = 1500;
    pit.y = 600;
    pit.addImage(pitImg);
    pit.scale = 0.7;
    pit.velocityX = -5;
    //snow.velocityY = 5;

 // the depth.
pit.depth = santa.depth - 1;

//adding it tp a group.
pitGroup.add(pit);

pit.debug = true;
pit.setCollider("circle", 10, 34, 150);

  }

}// pit bracket

function spawnBell() {
  //write code here to spawn the gift
  if (frameCount % 2500 === 0) {
    bell = createSprite(945, 70, 40, 40);
    bell.y = Math.round(random(95, 600));
    bell.addAnimation("running",bellImg);
    bell.scale = 0.5;
    bell.velocityX = -3;

    //assign lifetime to the variable
    bell.lifetime = 400;

    //adjust the depth
    bell.depth = santa.depth;

    //adding gift to the group
    bellsGroup.add(bell);

    bell.debug = true;
    bell.setCollider("circle", 10, 34, 100);

  }
} // bell bracket

//the bells are supposed to protect the sledge. initialy I wrote it would protect them for 15 secs.
//that involves health not getting less - and some sort of animation on the sledge. any more bright ideas?
//they could stop snowball falling.
//they could rset the health back to 10
//glow effect animation(this would get complex) then (15 s feature could drop, like the reindeer one.

//combo = reset, protection(sign + sound)

function spawnDouble(){
  //write code here to spawn the gift
  if (frameCount % 3000 === 0) {
    double = createSprite(945, 70, 40, 40);
    double.y = Math.round(random(95, 600));
    double.addImage(doubleImg);
    double.scale = 0.4;
    double.velocityX = -3;

    //assign lifetime to the variable
    double.lifetime = 400;

    //adjust the depth
    double.depth = santa.depth;

    //adding gift to the group
    rewardGroup.add(double);

    double.debug = true;
    double.setCollider("circle", 2, 14, 140);

  }
}// X2 bracket























































//1.add sledge gift collecting interaction.✅
//2. add gift collecting gif as effect.✅
//3. can add the olaf reindeer collecting feature. 🆗
//4. look at make your own game 1 and get obstacles.their interaction. 🌓✅
//try testing it - show it to viv,his friends, online friends or family - later!
// the gameStates will be added in make your own game - 4 with sound effects - and a good game poster! - not important
// you can also read instructions for make your own game - 4 ideas.✅
// advice - try testing the game fully in make your own game - 4. look for pending bugs and fix them around in sa
// to check the velocity - to increase of gifts  houses or not(not make it too easy) in make your own game 4.ok