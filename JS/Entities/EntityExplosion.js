class EntityExplosion extends Entity
{
    constructor(scene, x, y)
    {
        super(scene);

        this.x = x;
        this.y = y;

        this.vx = 0;
        this.vy = 0;

        this.solid = true;

        let frames = [];
        for(let i = 1; i < 6; i++)
        {
            frames.push(PIXI.Texture.fromFrame("explosion_"+i+".png"));
        }
        for(let i = 5; i > 0; i--)
        {
            frames.push(PIXI.Texture.fromFrame("explosion_"+i+".png"));
        }

        this.switchSprite(frames);

        this.sprite1.loop = false;
        this.sprite2.loop = false;

        this.sprite1.animationSpeed = 0.8;
        this.sprite2.animationSpeed = 0.8;

        this.sprite1.onComplete = this.destroy.bind(this);
    }

    hit(other)
    {
        if(other instanceof EntityPlayer)
            other.reset();
        return false;
    }

    destroy()
    {
        this.scene.removeEntity(this);
    }
}