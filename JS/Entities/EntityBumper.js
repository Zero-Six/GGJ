class EntityBumper extends Entity
{
    constructor(scene, x, y)
    {
        super(scene);
        this.x = x;
        this.y = y;

        this.overlaping = false;

        let frames = [];
        for(let i = 1; i < 6; i++)
        {
            frames.push(PIXI.Texture.fromFrame("bumper_"+i+".png"));
        }

        this.switchSprite(frames);

        this.sprite1.stop();
        this.sprite2.stop();
        this.sprite1.animationSpeed = 0.5;
        this.sprite2.animationSpeed = 0.5;
        this.sprite1.loop = false;
        this.sprite2.loop = false;
    }

    hit(other)
    {
        //other.vx = Config.NormBumper * -other.vx/Math.abs(other.vx);
        //other.vy = Config.NormBumper * -other.vy/Math.abs(other.vy);
        this.sprite1.gotoAndPlay(0);
        this.sprite2.gotoAndPlay(0);
        return false;
    }
}