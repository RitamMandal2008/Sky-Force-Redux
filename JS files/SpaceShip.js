class SpaceShip{
    constructor(){
        this.spaceShip;
        this.bullet;
    }

    createShip(x,y,scale,image){
        this.spaceShip = createSprite(x,y,15,15);
        this.spaceShip.addImage("ship",image);
        this.spaceShip.scale = scale;
    }

    createBullet(image){
        this.bullet = createSprite(this.spaceShip.x+46,this.spaceShip.y+20,1,1);
        this.bullet.addImage("phew phew",image);
        this.bullet.scale = 0.4;
        this.bullet.velocityY = -15;
        this.bullet.setCollider("circle",-115,-75,20);

        return true;
    }
    
    handlePlayerControls(){
        if(keyIsDown(UP_ARROW)){
            this.spaceShip.y -= 10;
        }
        if(keyIsDown(DOWN_ARROW)){
            this.spaceShip.y += 10;
        }
        if(keyIsDown(LEFT_ARROW)){
            this.spaceShip.x -= 10;
        }
        if(keyIsDown(RIGHT_ARROW)){
            this.spaceShip.x += 10;
        }

        for(var i=0; i < enemyGroup.length; i++){
            if(enemyGroup.get(i).isTouching(this.spaceShip) || enemyGroup.get(i).y >= 570){
                this.spaceShip.destroy();
                gameState = 0;
            }
        }
    }
}