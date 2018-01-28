class EntitySpikes extends Entity 
{
    constructor(scene, x, y)
    {
        super(scene);

        this.deadly = false;

        let frames = [];
		for(let i = 0; i < 3; i++)
		{
			frames.push(PIXI.Texture.fromFrame("spikes_"+i+".png"));
        }
        frames.push(PIXI.Texture.fromFrame("spikes_1.png"));
        this.solid = false;

        this.switchSprite(frames);
        this.sprite1.x = x;
        this.sprite1.y = y;

        this.sprite1.loop = false;
        this.sprite2.loop = false;

        this.sprite1.animationSpeed = 0.5;
        this.sprite2.animationSpeed = 0.5;

        this.setFriendly();

        /*this.sprite1.onComplete = () => {
            this.destroy();
        }*/
    }

    setDeadly()
    {
        this.sprite1.gotoAndPlay(0);
        this.sprite2.gotoAndPlay(0);
        this.deadly = true;
        setTimeout(() => {
            this.setFriendly();   
        }, 500);
    }

    setFriendly()
    {
        this.sprite1.gotoAndStop(0);
        this.sprite2.gotoAndStop(0);
        this.deadly = false;
        setTimeout(() => {
            this.setDeadly();
        }, 2000);
    }

    hit(other)
    {
        if(other instanceof EntityPlayer && this.deadly)
        {
            createjs.Sound.play("Spikes");
            other.reset();
        }
    }
}