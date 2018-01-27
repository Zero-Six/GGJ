class EntityWalking extends Entity {

    constructor() {

		super();
	
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
        this.sprite.x += Config.AirDensity * this.vx;
        this.sprite.y += Config.AirDensity * this.vy;

        this.vx = (this.mass) * this.vx;
        this.vy = (this.mass) * this.vy;

        if (Math.round(this.vx) == 0)
            this.vx = 0;
        if (Math.round(this.vy) == 0)
            this.vy = 0;

        //this.setFrame();
    }

    bump()
    {
        
    }

    setFrame()
    {
        if (this.vy == 0 && this.vx == 0) {
            this.sprite.stop();
            return;
        }
        else
            this.sprite.play();
        if (this.vy > 0) {
            if ((this.sprite.currentFrame > 3))
                this.sprite.gotoAndPlay(0);
        }
        else if (this.vy < 0) {
            if ((this.sprite.currentFrame < 12))
                this.sprite.gotoAndPlay(12);
        }
        else if (this.vx > 0) {
            if ((this.sprite.currentFrame < 4 || this.sprite.currentFrame > 7))
                this.sprite.gotoAndPlay(4);
        }
        else if (this.vx < 0) {
            if ((this.sprite.currentFrame < 8 || this.sprite.currentFrame > 11))
                this.sprite.gotoAndPlay(8);
        }

    }

    destroy()
    {
        throw new Error("Method not implemented.");
    }

}