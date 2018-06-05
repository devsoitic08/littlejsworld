var GameObj = {
  Enemy: function(x, y, dirX, dirY, size, speed){
    this.spawn = [x, y,
                  x+size, y,
                  x+size, y+size,
                  x, y+size];
    this.deltaX = 0.0;
    this.deltaY = 0.0;
    this.dirX = dirX;
    this.dirY = dirY;
    this.speed= speed;

    this.size = size;
    this.x = this.spawn[0] + this.deltaX;
    this.y = this.spawn[1] + this.deltaY;

    this.draw = function() {
      ctx.beginPath();
      ctx.moveTo(this.spawn[0] + this.deltaX, this.spawn[1] + this.deltaY);
      ctx.lineTo(this.spawn[2] + this.deltaX, this.spawn[3] + this.deltaY);
      ctx.lineTo(this.spawn[4] + this.deltaX, this.spawn[5] + this.deltaY);
      ctx.lineTo(this.spawn[6] + this.deltaX, this.spawn[7] + this.deltaY);
      ctx.closePath();
    
      this.x = this.spawn[0] + this.deltaX;
      this.y = this.spawn[1] + this.deltaY;

      ctx.lineWidth = 5;
      ctx.strokeStyle = "rgba(102, 102, 102, 1)";
      ctx.stroke();
    
      
      ctx.fillStyle = "rgba(183, 3, 69, 1)";
      ctx.fill();
    }

    this.reset = function(){
      this.deltaX= 0;
      this.deltaY= 0;
      this.speed= 0.3;
      this.draw();
    }

    this.update = function(deltaTime){

      if(this.x + this.size <= c.width && this.x >= 0)
        this.deltaX += this.speed * deltaTime * this.dirX;
      else{
        this.dirX = -this.dirX;
        if(this.deltaX>0)
          this.deltaX -= this.speed * deltaTime + 0.1;
        else
          this.deltaX += this.speed * deltaTime + 0.1;
      }

      if(this.y + this.size <= c.height && this.y >= 0)
        this.deltaY += this.speed * deltaTime * this.dirY;
      else{
        this.dirY = -this.dirY;
        if(this.deltaY > 0)
          this.deltaY -= this.speed * deltaTime + 0.1;
        else
          this.deltaY += this.speed * deltaTime + 0.1;
      }

      this.draw();
    }
  },

  Player: function(x,y,size){
    this.spawn = [x, y,
                  x+size, y,
                  x+size, y+size,
                  x, y+size];

    this.deltaX = 0;
    this.deltaY = 0;
    this.speed = 0.2;

    this.size = size;
    this.x = this.spawn[0] + this.deltaX;
    this.y = this.spawn[1] + this.deltaY;

    this.draw = function() {
      ctx.beginPath();
      ctx.moveTo(this.spawn[0] + this.deltaX, this.spawn[1] + this.deltaY);
      ctx.lineTo(this.spawn[2] + this.deltaX, this.spawn[3] + this.deltaY);
      ctx.lineTo(this.spawn[4] + this.deltaX, this.spawn[5] + this.deltaY);
      ctx.lineTo(this.spawn[6] + this.deltaX, this.spawn[7] + this.deltaY);
      ctx.closePath();

      this.x = this.spawn[0] + this.deltaX;
      this.y = this.spawn[1] + this.deltaY;
      
      ctx.lineWidth = 5;
      ctx.strokeStyle = "rgba(102, 102, 102, 1)";
      ctx.stroke();
      
      ctx.fillStyle = "rgba(0, 214, 103, 1)";
      ctx.fill();
    }

    this.update = function(enemies, blocks){

      this.draw();

      var i = 0;
      for(i=0; i < enemies.length ; i++){
        if(this.checkColl(enemies[i])){
          ctx.fillText("Ouch!",this.x-5,this.y-5);
        }
      }

      for(i=0; i < blocks.length ; i++){
        if(this.checkColl(blocks[i])){
          ctx.fillText("Ouch!",this.x-5,this.y-5);
        }
      }
    }

    this.reset = function(){
      this.deltaX= 0;
      this.deltaY= 0;
      this.speed= 0.3;
      this.draw();
    }

    this.moveKey = function(deltaTime) {
      if (keys[37]) {
        if (this.x >= 0) {
          this.deltaX -= deltaTime * this.speed;
        }
        else{
          this.deltaX += deltaTime * this.speed + 0.1;
        }
      }

      if (keys[39]) {
        if (this.x + this.size <= c.width) {
          this.deltaX += deltaTime * this.speed;
        }
        else{
          this.deltaX -= deltaTime * this.speed + 0.1;
        }
      }
      if (keys[40]) {
        if (this.y + this.size <= c.height) {
          this.deltaY += deltaTime * this.speed;
        }
        else{
          this.deltaY -= deltaTime * this.speed + 0.1;
        }
      }
      if (keys[38]) {
        if (this.y >= 0) {
          this.deltaY -= deltaTime * this.speed;
        }
        else{
          this.deltaY += deltaTime * this.speed + 0.1;
        }
      }
    }

    this.checkColl = function(obstacle){
      return obstacle.x < this.x + this.size &&
      obstacle.x + obstacle.size > this.x &&
      obstacle.y < this.y + this.size &&
      obstacle.y + obstacle.size > this.y;
    }
  }
}