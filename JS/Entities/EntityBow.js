class EntityBow extends Entity 
{
    constructor(scene, x, y)
    {
        super(scene);

        this.x = x;
        this.y = y;
        this.solid = false;

        this.sprite1 = new PIXI.Sprite(PIXI.Texture.fromFrame("ground_5.png"));
        this.sprite2 = new PIXI.Sprite(PIXI.Texture.fromFrame("ground_5.png"));
    
        this.timer = null;

        this.shot();
    }

    shot()
    {
        let right = new EntityArrow(this.scene, this.x + Config.TileSize, this.y, Config.ArrowSpeed, 0);
        this.scene.addEntity(right);
        let left = new EntityArrow(this.scene, this.x - Config.TileSize, this.y, -Config.ArrowSpeed, 0);
        this.scene.addEntity(left);
        let up = new EntityArrow(this.scene, this.x, this.y - Config.TileSize, 0, -Config.ArrowSpeed);
        this.scene.addEntity(up);
        let down = new EntityArrow(this.scene, this.x, this.y + Config.TileSize, 0,Config.ArrowSpeed);
        this.scene.addEntity(down);
        this.timer = setTimeout(() => {
            this.shot();
        }, Config.BowDeadly);
    }

    destroy()
    {
        if(this.timer != null) 
            clearTimeout(this.timer);
        this.timer = null;
        this.scene.removeChild(this);
    }
}