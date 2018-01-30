class EntityBumper extends Entity
{
    constructor(scene, x, y)
    {
        super(scene);
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;

        this.overlaping = false;
        this.solid = true;

        let frames = [];
        for(let i = 1; i < 6; i++)
        {
            frames.push(PIXI.Texture.fromFrame("bumper_"+i+".png"));
        }

        this.switchSprite(frames);

        this.sprite1.stop();
        this.sprite2.stop();
        this.sprite1.animationSpeed = 0.9;
        this.sprite2.animationSpeed = 0.9;
        this.sprite1.loop = false;
        this.sprite2.loop = false;
    }

    hit(other)
    {
        if(other instanceof EntityPlayer)
        {
            this.scene.cancelControllers(other);
        }
        let oldmass = other.mass;
        other.mass = Config.MassBumper;
        setTimeout(() => {
            other.mass = oldmass;
        }, Config.BumperBuff);
        if(other.vx != 0)
            other.vx = Config.NormBumper * -other.vx/Math.abs(other.vx);
        if(other.vy != 0)
            other.vy = Config.NormBumper * -other.vy/Math.abs(other.vy);
        this.sprite1.gotoAndPlay(1);
        this.sprite2.gotoAndPlay(1);
        return false;
    }
}