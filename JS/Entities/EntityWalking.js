class EntityWalking extends Entity {

    constructor(scene) {

		super(scene);
	
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
            }
        }
        else if (this.vy < 0) {
            if ((this.sprite1.currentFrame < 23 || this.sprite1.currentFrame > 27))
            {
                this.sprite1.gotoAndPlay(23);
                this.sprite2.gotoAndPlay(23);
            }
        }
        else if (this.vx > 0) {
            if ((this.sprite1.currentFrame < 7 || this.sprite1.currentFrame > 12))
            {
                this.sprite1.gotoAndPlay(7);
                this.sprite2.gotoAndPlay(7);
            }
        }
        else if (this.vx < 0) {
            if ((this.sprite1.currentFrame < 7 || this.sprite1.currentFrame > 12))
            {
                this.sprite1.gotoAndPlay(7);
                this.sprite2.gotoAndPlay(7);
            }
        }

    }

    destroy()
    {
        throw new Error("Method not implemented.");
    }

}