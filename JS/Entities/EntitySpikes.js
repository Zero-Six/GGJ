class EntitySpikes extends Entity 
{
    constructor(scene, x, y)
    {
        super(scene);

        let frames = [];
		for(let i = 0; i < 3; i++)
		{
			frames.push(PIXI.Texture.fromFrame("spikes_"+i+".png"));
        }
        frames.push(PIXI.Texture.fromFrame("spikes_1.png"));
        

        this.switchSprite(frames);
        this.sprite1.x = x;
        this.sprite1.y = y;

        this.sprite1.animationSpeed = 0.1;
        this.sprite2.animationSpeed = 0.1;

        /*this.sprite1.onComplete = () => {
            this.destroy();
        }*/
    }
}