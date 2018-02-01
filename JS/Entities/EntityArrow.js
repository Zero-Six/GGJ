class EntityArrow extends EntityWalking
{
    constructor(scene, x , y, vx, vy)
    {
        super(scene);
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.initialVx = vx;
        this.initialVy = vy;
        this.overlaping = false;

        let frames = [
            PIXI.Texture.fromFrame("arrow_1.png"),
            PIXI.Texture.fromFrame("arrow_2.png"),
            PIXI.Texture.fromFrame("arrow_3.png"),
            PIXI.Texture.fromFrame("arrow_4.png"),
        ];

        this.switchSprite(frames);
        
    }

    update(delta)
    {
        super.update(delta);
        this.vx = this.initialVx;
        this.vy = this.initialVy;
    }

    setSound()
    {

    }

    setFrame()
    {
        if(this.vx > 0)
        {
            this.sprite1.gotoAndStop(0);
            this.sprite2.gotoAndStop(0);
            this.sprite1.hitarea = new Rectangle(8,12,32-26, 12);
        }

        if(this.vx < 0)
        {
            this.sprite1.gotoAndStop(2);
            this.sprite2.gotoAndStop(2);
            this.sprite1.hitarea = new Rectangle(8,12,32-26, 12);
        }

        if(this.vy > 0 )
        {
            this.sprite1.gotoAndStop(1);
            this.sprite2.gotoAndStop(1);
            this.sprite1.hitarea = new Rectangle(14,8,14,6);
            
        }

        if(this.vy < 0)
        {
            this.sprite1.gotoAndStop(3);
            this.sprite2.gotoAndStop(3);
            this.sprite1.hitarea = new Rectangle(14,8,14,6);
            
        }
    }

    hit(other)
    {
        if(other instanceof EntityArrow)
            return false;
        if(other instanceof EntityPlayer)
        {
            let u = Math.floor(Math.random() * 6) + 1;
            createjs.Sound.play("Arrow_0"+u);
            other.reset();
        }
        this.destroy();
    }

    bump()
    {
        this.destroy();
    }

    destroy()
    {
        this.scene.removeEntity(this);
    }
}