class EntityPlayer extends EntityWalking {

	constructor()
	{
		this.battery = 3;
		this.nextAction = null;
	}

	
	update(delta)
	{
		if(this.nextAction != null)
		{
			this.nextAction.bind(this)();
		}
	}
	
}