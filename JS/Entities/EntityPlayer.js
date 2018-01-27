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
		if(this.nextAction != null)
		{
			this.nextAction.bind(this)();
		}
	}
	
	destroy()
	{
		Program.App().stage.removeChild(this.sprite);
	}
	
	
	
}