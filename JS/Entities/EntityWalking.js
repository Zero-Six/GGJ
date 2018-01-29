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

        if(this.collided == false)
        {
            this.vx = (this.mass) * this.vx;
            this.vy = (this.mass) * this.vy;
        }
        else{
            this.vx = 0;
            this.vy = 0;            
        } 



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

        if(this.vx > 0)
        {
            if(this.sprite1.currentFrame < 6 || this.sprite1.currentFrame>11)
            {
                this.sprite1.gotoAndPlay(6);
                this.sprite2.gotoAndPlay(6);
            }
        }

        else if(this.vx < 0)
        {
            if(this.sprite1.currentFrame < 32 || this.sprite1.currentFrame > 39)
            {
                this.sprite1.gotoAndPlay(34);
                this.sprite2.gotoAndPlay(34);
            }
        }

        else if(this.vy > 0)
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
        }

        /*
        if (this.vy > 0) {
            if ((this.sprite1.currentFrame < 28 || this.sprite1.currentFrame > 33))
            {
                this.sprite1.gotoAndPlay(28);
                this.sprite2.gotoAndPlay(28);
				// alert(this.sprite1.currentFrame);
            }
        }
         if (this.vy < 0) {
			 var k = 29;
            if ((this.sprite1.currentFrame < k || this.sprite1.currentFrame > k+5))
            {
                this.sprite1.gotoAndPlay(k);
                this.sprite2.gotoAndPlay(k);
            }
        }
         if (this.vx > 0) {
            if ((this.sprite1.currentFrame < 7 || this.sprite1.currentFrame > 12))
            {
                this.sprite1.gotoAndPlay(7);
                this.sprite2.gotoAndPlay(7);
            }
        }
        if (this.vx < 0) {
            if ((this.sprite1.currentFrame < 34 || this.sprite1.currentFrame > 39))
            {
                
                this.sprite1.gotoAndPlay(1);
                this.sprite2.gotoAndPlay(1);
            }
        }*/

    }

    destroy()
    {
        throw new Error("Method not implemented.");
    }

}