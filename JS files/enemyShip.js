class EnemyShip{
    constructor(){
        this.enemyShip;
        this.bullet;
    }

    createShip(x,y,scale,image,velocity){
        this.enemyShip = createSprite(x,y,15,15);
        this.enemyShip.addImage("ship",image);
        this.enemyShip.scale = scale;

        this.enemyShip.velocityY = velocity;
    }

    /* createBullet(image){
        this.bullet = createSprite(this.enemyShip.x+46,this.enemyShip.y+20,5,5);
        this.bullet.addImage("phew phew",image);
        this.bullet.scale = 0.4;
        this.bullet.velocityY = -15;

        return this.bullet;
    } */
    
    handleEnemyControls(){
        var check = false;

        for(var i=0; i < enemyGroup.length; i++){
            if(enemyGroup.get(i).isTouching(bulletGroup) || gameState == 0){
                enemyGroup.get(i).destroy();
                score = score + 10;
                check = true;
            }
        }
        return check;
    }
}

