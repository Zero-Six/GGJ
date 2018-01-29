class EntityWalking extends Entity {

    constructor(scene) 
    {
        super(scene);
        this.canMove = true;
    }

    reset() 
    {
        
    }

    hit(other) 
    {

    }


    update(delta)
    {
       /* this.vx = Math.abs(this.vx) > Config.PlayerMaxSpeed ? Config.PlayerMaxSpeed * this.vx / Math.abs(this.vx) : this.vx ;
        this.vy = Math.abs(this.vy) > Config.PlayerMaxSpeed ? Config.PlayerMaxSpeed * this.vy / Math.abs(this.vy) : this.vy ;
        */
        this.x += delta/10 * this.vx;
        this.y += delta/10 * this.vy;

        //if(this.collided == false)
        //{
            this.vx = (this.mass) * this.vx;
            this.vy = (this.mass) * this.vy;
        /*}
        else{
            this.vx = 0;
            this.vy = 0;            
        } */



        if (Math.round(this.vx) == 0)
            this.vx = 0;
        if (Math.round(this.vy) == 0)
            this.vy = 0;
        super.update(delta);
        this.setFrame();
    }

    bump()
    {
        
    }

    setSound()
    {
        //console.debug(Math.round(this.x) % Config.TileSize);
            if(this.vx == 0 && this.vy == 0)
                return;
            let x = Math.floor((this.x + this.sprite1.width /2) / Config.TileSize);
			let y = Math.floor((this.y + this.sprite1.height/1.5) / Config.TileSize);
            if(this.scene.map1.grid[Math.floor(x)] == null || this.scene.map1.grid[Math.floor(x)][Math.floor(y)] == null)
                return;
            let cell = Tiles[this.scene.map1.grid[Math.floor(x)][Math.floor(y)]];
            if(cell == null)
                return;
            
            let i = ~~(Math.random() * 8);
            if(cell.name == "ice")
                createjs.Sound.play("Step_Ice_0"+i);
            else 
                createjs.Sound.play("Step_0"+i);
            
    }

    setFrame()
    {
        if(this.canMove == false)
            return;
        if (this.vy == 0 && this.vx == 0) {
            this.sprite1.stop();
            this.sprite2.stop();
            return;
        }
        else
        {

            this.sprite1.play();
            this.sprite2.play();
        }

        if(this.vx > 0 || this.vy < 0)
        {
            if(this.sprite1.currentFrame < 6 || this.sprite1.currentFrame>11)
            {
                this.sprite1.gotoAndPlay(6);
                this.sprite2.gotoAndPlay(6);
                this.setSound();
            }
        }

        else if(this.vx < 0 || this.vy > 0)
        {
            if(this.sprite1.currentFrame < 32 || this.sprite1.currentFrame > 39)
            {
                this.sprite1.gotoAndPlay(34);
                this.sprite2.gotoAndPlay(34);
                this.setSound();
            }
        }

        /*else if(this.vy > 0)
        {
            if(this.sprite1.currentFrame < 28 || this.sprite1.currentFrame > 33)
            {
                this.sprite1.gotoAndPlay(28);
                this.sprite2.gotoAndPlay(28);
            }
        }

        else if(this.vy < 0)
        {
            if(this.sprite1.currentFrame < 21 || this.sprite1.currentFrame > 27)
            {
                this.sprite1.gotoAndPlay(22);
                this.sprite2.gotoAndPlay(22);
            }
        }*/

       

    }

    destroy()
    {
        throw new Error("Method not implemented.");
    }

}