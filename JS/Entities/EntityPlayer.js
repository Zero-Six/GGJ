class EntityPlayer extends EntityWalking {

	constructor()
	{
		this.battery = 3;
		this.nextAction = null;
		this.canMove = true;
	}

	
	update(delta)
	{
		if(this.nextAction != null)
		{
			this.nextAction.bind(this)();
		}
	}
	
}