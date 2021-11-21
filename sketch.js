var spaceShip, spaceShipIMG, sCheck = false, userHealth = 500;
var enemyShip, enemyShipIMG, enemyGroup, eCheck = false;
var bossShip, bossHealth = 10000, bossDamage = 1, damCount = 0, bossPower = 45, bossBulletGroup;
var bullet, bulletIMG, bulletIMG2, bulletGroup, randomNum;
var powerUp = 20, dCheck;
var enemyFrequency = 45, enemySpeed = 0.75;
var backGroundIMG, backGround;
var gameState = 1, bossState = 0, score = 0;

function preload(){
    spaceShipIMG = loadImage("Images/spaceshipIMG.png");
    enemyShipIMG = loadImage("Images/enemyshipIMG.png");
    bulletIMG = loadImage("Images/laserBullet.png");
    bulletIMG2 = loadImage("Images/laserBullet2.png");

    backGroundIMG = loadImage("Images/spaceIMG.jpg")
}

function setup(){
    createCanvas(800,600);

    spaceShip = new SpaceShip();
    spaceShip.createShip(400,400,0.27,spaceShipIMG);

    enemyShip = new EnemyShip();

    bossShip = new Boss();
    bossShip.createShip(400,180,0.98,enemyShipIMG);
    
    bulletGroup = new Group();
    enemyGroup = new Group();
    bossBulletGroup = new Group();
}

function draw(){
    randomNum = round(random(-65,65))

    background(backGroundIMG);
    spaceShip.handlePlayerControls();
    
    for(var i = 0; i < bulletGroup.length; i++){
        if(bulletGroup.get(i).y <= 15){
            bulletGroup.get(i).destroy();
        }
    }

    if(gameState == 2){
        textSize(69);
        fill("cyan");
        text("You win!",250,300);
    }

    if(gameState == 1){
        textSize(20);
        fill("lightgreen");
        text("Score: "+score,700,50);
    }
    
    if(gameState == 0){
        textSize(69);
        fill("red");
        text("GameOver",230,300);

        spaceShip.spaceShip.destroy();
        bossShip.spaceShip.destroy();
    }

    if(bossState == 1){
        enemyGroup.destroyEach();
    }

    if(score >= 500 && gameState == 1){
        bossState = 1;
        bossShip.battle();
    }

    //
    if(eCheck != false){
        dCheck = enemyShip.handleEnemyControls();
    }
    
    if(frameCount % 45 == 0 && gameState == 1 && bossState == 0){
        enemyShip.createShip(random(200,500),random(100,300),0.18,enemyShipIMG,enemySpeed);
        enemyGroup.add(enemyShip.enemyShip);

        eCheck = true;
    }

    //Creating bullets
    if(frameCount % powerUp == 0 && gameState == 1){
        sCheck = spaceShip.createBullet(bulletIMG);

        bulletGroup.add(spaceShip.bullet);
    }

    //Increasing bullet speed
    if(dCheck && powerUp > 10 && gameState == 1){
        if(score == 30 || score == 50 || score == 100 || score == 150 || score == 200 || score == 300 || score == 400 || score == 500){
            powerUp = powerUp - 3;
        }  
    }

    //Increasing difficulty
    if(dCheck && enemyFrequency > 25 && gameState == 1){
        if(score == 30 || score == 50 || score == 100 || score == 150 || score == 200 || score == 250 || score == 400 || score == 450){
            enemyFrequency = enemyFrequency - 5;
        }  
    }

    if(dCheck && enemySpeed < 3.96 && gameState == 1){
        if(score == 30 || score == 50){
            enemySpeed = enemySpeed + 0.75;
        }
        if(score == 100 || score == 150 || score == 200 || score == 250 || score == 300 || score == 350 || score == 400){
            enemySpeed = enemySpeed + 2.75;
        }  
    }

    //console.log(enemySpeed);

    if(keyDown("x") && bossState == 0){
        score += 500;
    }

    drawSprites();
    
}

