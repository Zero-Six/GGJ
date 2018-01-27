class EntityPlayer extends EntityWalking {

	constructor()
	{
		super();
		this.battery = 3;
		this.nextAction = null;
		this.canMove = true;
		this.sprite = PIXI.Texture.fromFrame("hero1.png");
		
		Program.GetInstance().App().stage.addChild(this.sprite);
		
	}
	
	update(delta)
	{
		while(this.nextAction.length > 0)
		{
			this.nextAction.shift().bind(this)();			
		}
	}
	
	destroy()
	{
		Program.GetInstance().App().stage.removeChild(this.sprite);
	}
	
	
	
}