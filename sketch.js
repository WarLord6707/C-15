var PLAY = 1;
var END = 0;
var gameState = 1;

var knife;
var knifeImage;
var fruit1, fruit2, fruit3, fruit4;
var fruitGroup;
var alienImg;
var monsterGroup;
var gameoverimg,gameovermp;
function preload() {

  knifeImage = loadImage("knife.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  alienImg = loadAnimation("alien1.png","alien2.png");
  gameoverimg=loadImage("gameover.png");
  gameovermp=loadSound("gameover.mp3");
  
}



function setup() {
  createCanvas(600, 600);


  //creating sword
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.7



  knife.setCollider("rectangle", 0, 0, 40, 40);

  score = 0;
  //create fruit and monster Group variable here

  fruitGroup = new Group();
  monsterGroup = new Group();
}

function draw() {
  background("lightblue");

  if (gameState === PLAY) {
    fruit();
  monsters();

    knife.y = World.mouseY;
    knife.x = World.mouseX;
    if(fruitGroup.isTouching(knife)) {
       score+=5;
      fruitGroup.destroyEach();
      //sound
       }else if(monsterGroup.isTouching(knife)){
         gameState=END
         monsterGroup.destroyEach();
         fruitGroup.destroyEach();
          fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
         var gameover=createSprite(300,300)
         gameover.addImage(gameoverimg);
       
       }
    
  } 

  
  drawSprites();

  //Display score
  textSize(25);
  text("Score : " + score, 250, 50);
}

function fruit() {
  if (frameCount % 80 === 0) {
    yPosition = random(50, 550)
    var fruit = createSprite(0, yPosition, 20, 20);
    fruit.velocityX = 7;
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        fruit.addImage(fruit1);
        break
      case 2:
        fruit.addImage(fruit2);
        break
      case 3:
        fruit.addImage(fruit3);
        break
      case 4:
        fruit.addImage(fruit4);
        break
      default:
        break
    }
    fruit.scale = 0.2;
    fruit.setLifetime = 150;
    fruitGroup.add(fruit);
  }

}

function monsters() {
  if(frameCount%200===0){
    monsterPosition=random(50,550);
     monster=createSprite(0,monsterPosition,20,20);
    monster.velocityX=10;
     monster.addAnimation("enemy",alienImg);
    monster.setLifetime=70;
    monsterGroup.add(monster);
     }

}