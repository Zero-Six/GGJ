class EntityWalking extends Entity {

    constructor(scene) {

        super(scene);
        this.canMove = true;

	
    }

    reset() 
    {
        
    }

    hit(other) 
    {

    }

    setVx(vx)
    {
        this.vx = vx;
    }

    setVy(vy)
    {
        this.vy = vy;
    }

    Vx() 
    {
        return this.vx;
    }

    Vy() 
    {
        return this.vy;
    }

    update(delta)
    {

        this.vx = this.vx > 50 ? 50 : this.vx ;
        this.vy = this.vy > 50 ? 50 : this.vy ;
        
        this.sprite1.x += Config.AirDensity * this.vx;
        this.sprite1.y += Config.AirDensity * this.vy;
        this.sprite2.x += Config.AirDensity * this.vx;
        this.sprite2.y += Config.AirDensity * this.vy;

        this.vx = (this.mass) * this.vx;
        this.vy = (this.mass) * this.vy;

        if (Math.round(this.vx) == 0)
            this.vx = 0;
        if (Math.round(this.vy) == 0)
            this.vy = 0;

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
        }

    }

    destroy()
    {
        throw new Error("Method not implemented.");
    }

}