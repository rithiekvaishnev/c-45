var ground;
var balloon,balloonImg;
var bg,bgImg;
var obstop1Img,obstop2Img,obsbottom1Img,obsbottom2Img,obsbottom3Img;
var obsTopGroup,obsBottomGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var topGround,bottomGround;
var gameOver,gameOverImg;
var restart,restartImg;

function preload(){
  balloonImg = loadAnimation("./assets/balloon1.png","./assets/balloon2.png","./assets/balloon3.png");
  bgImg = loadImage("./assets/bg.png")
  obstop1Img = loadImage("./assets/obsTop1.png");
  obstop2Img = loadImage("./assets/obsTop2.png");
  obsbottom1Img = loadImage("./assets/obsBottom1.png");
  obsbottom2Img = loadImage("./assets/obsBottom2.png");
  obsbottom3Img = loadImage("./assets/obsBottom3.png");
  gameOverImg = loadImage("./assets/gameOver.png");
  restartImg = loadImage("./assets/restart.png");
}

function setup(){
  createCanvas(400,450);

  bg= createSprite(100,100);
  bg.addImage("background",bgImg);

  balloon = createSprite(200,300,50,50);
  balloon.addAnimation("baloon",balloonImg);
  balloon.scale = 0.3;

  topGround= createSprite(200,10,400,10);
  topGround.visible = false;

  bottomGround= createSprite(200,440,400,10);
  bottomGround.visible = false;

  gameOver = createSprite(200,205);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale = 0.5;

  
  restart = createSprite(200,250)
  restart.addImage("restart",restartImg);
  restart.scale = 0.5;

  obsTopGroup = new Group()
  obsBottomGroup = new Group()


}



function draw(){

  background("black");

  if(gameState === PLAY){
    if(keyDown("space")){
      balloon.velocityY = -5;
    }
    
    balloon.velocityY = balloon.velocityY+2;

    gameOver.visible = false;
    restart.visible = false;
  
    spawnObsTop();
    spawnObsBottom();

    if(obsTopGroup.isTouching(balloon) || obsBottomGroup.isTouching(balloon) || topGround.isTouching(balloon) || bottomGround.isTouching(balloon)){
      gameState = END;
    }
  }
  else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    
    balloon.setVelocity(0,0);
    obsTopGroup.setVelocityXEach(0);
    obsBottomGroup.setVelocityXEach(0);

    obsTopGroup.setLifetimeEach(-1);
    obsBottomGroup.setLifetimeEach(-1);

    balloon.y =150;

    if(mousePressedOver(restart)){
      reset();
    }
  
  }

 
  drawSprites();
}

function spawnObsTop(){
  if(frameCount%60===0){
    var obsTop = createSprite(400,50,40,50);
    
    obsTop.velocityX = -4;
    obsTop.y = Math.round(random(20,100))
    
    var rand = Math.round(random(1,2))

    switch(rand){
      case 1 : obsTop.addImage(obstop1Img);
        break ;
      case 2 : obsTop.addImage(obstop2Img)
        break ;
       default : break ;
    }

    obsTop.scale = 0.1;
    obsTop.lifetime = 100;
    obsTop.depth = balloon.depth;
    balloon.depth = balloon.depth+1;

    obsTopGroup.add(obsTop);
  
  }
}

function spawnObsBottom(){
  if(frameCount%60===0){
      var obsBottom = createSprite(100,400,40,40)
      obsBottom.velocityX = -5;
      
      var rand = Math.round(random(1,3))

      switch(rand){
        case 1 : obsBottom.addImage(obsbottom1Img);
          break ;
        case 2 : obsBottom.addImage(obsbottom2Img)
          break ;
        case 3 : obsBottom.addImage(obsbottom3Img)
          break ;  
        default : break ;
      
      }
      
      obsBottom.scale = 0.1;
      obsBottom.lifetime = 80;
      obsBottom.depth = balloon.depth;
      balloon.depth = balloon.depth+1;
      
      obsBottomGroup.add(obsBottom);

    } 
}

function reset(){
  gameState = PLAY;
  obsTopGroup.destroyEach();
  obsBottomGroup.destroyEach();
}
