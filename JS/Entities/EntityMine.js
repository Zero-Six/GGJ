class EntityMine extends Entity
{
    constructor(scene, x, y)
    {
        super(scene);
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;

        this.overlaping = false;

        this.enabled = true;


        let frames = [
			PIXI.Texture.fromFrame("mine_1.png"),
			PIXI.Texture.fromFrame("mine_2.png"),
			PIXI.Texture.fromFrame("mine_3.png"),
			PIXI.Texture.fromFrame("mine_4.png")
        ];

        this.switchSprite(frames);
        this.sprite1.animationSpeed = 0.1;
        this.sprite2.animationSpeed = 0.1;
        this.sprite1.stop();
        this.sprite2.stop();
    }

    hit(other)
    {
        if(!(other instanceof EntityPlayer) || this.enabled == false)
            return false;
        this.sprite1.play();
        this.sprite2.play();
        this.enabled = false;
        setTimeout(() => {
            other.shake(500);
            let explosion = new EntityExplosion(this.scene, (this.x-Config.TileSize), (this.y-Config.TileSize));
            this.scene.addEntity(explosion);
            this.destroy();
        }, Config.MineBuff);
        return false;
    }

    destroy()
    {
        this.scene.removeEntity(this);
    }
}