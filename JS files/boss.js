class Boss{
    constructor(){
        this.spaceShip;
        this.bullet;
    }

    createShip(x,y,scale,image){
        this.spaceShip = createSprite(x,y,15,15);
        this.spaceShip.addImage("ship",image);
        this.spaceShip.scale = scale;
        this.spaceShip.setCollider("rectangle", 0, -50, 250, 100);

        this.spaceShip.visible = false;
    }

    battle(){
        this.showShip();

        if(sCheck){
            this.handleBossControls(spaceShip);
        }
        if(bossHealth == 6000 || bossHealth == 3500){
            bossDamage += 5;
        }
        if(bossHealth == 9500 || bossHealth == 9000 || bossHealth == 8500){
            bossDamage += 5;
        }
        if(bossHealth <= 0){
            gameState = 2;
        }
        if(frameCount % bossPower == 0){
            bossBulletGroup.add( this.createBullet(this.spaceShip.x+randomNum, this.spaceShip.y+70, bulletIMG2,0.94) );
        }
        

        fill("red");
        text("Boss Health: "+bossHealth,50,50);

        fill("cyan");
        text("Your health: "+userHealth,50,80);
    }

    showShip(){
        this.spaceShip.visible = true;
    }

    createBullet(x,y,image,scale){
        this.bullet = createSprite(x,y,1,1);
        this.bullet.addImage("phew phew 2",image);
        this.bullet.scale = scale;
        this.bullet.velocityY = 15;
        //this.bullet.debug = true;

        return this.bullet;
        //this.bullet.setCollider("circle",-115,-75,20);
    }

    handleBossControls(spaceShip){
        if(spaceShip.spaceShip.isTouching(this.spaceShip)){
            spaceShip.spaceShip.destroy();
            gameState = 0;
        }

        for(var j=0; j < bulletGroup.length; j++){
            if(spaceShip.bullet.isTouching(this.spaceShip)){
                bossHealth = bossHealth - bossDamage;
            }
        }

        for(var i=0; i < bossBulletGroup.length; i++){
            if(this.bullet.isTouching(spaceShip.spaceShip)){
                userHealth -= 5;
            }

            if(userHealth <= 0){
                gameState = 0;
            }
        }
    }
}