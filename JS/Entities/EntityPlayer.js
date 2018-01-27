class EntityPlayer extends EntityWalking {

	constructor(scene, file, x, y)
	{
		super(scene);

		this.file = file;

		this.initialX = x;
		this.initialY = y;

		this.animationSpeed = 0.3;
		this.hitarea = new Rectangle(7,16,7,0);

		this.mass = 0.3;
		this.nextAction = [];
		this.battery = 3;

		this.combo = [];
		this.canCombo = true;

		this.frames = [];
		for(let i = 1; i < 27; i++)
		{
			this.frames.push(PIXI.Texture.fromFrame(this.file+"_"+i+".png"));
		}
		this.sprite1 = new PIXI.extras.AnimatedSprite(this.frames);
		this.sprite1.x = x;
		this.sprite1.y = y;
		this.sprite1.hitarea = this.hitarea;
		//this.sprite1.anchor.set(0.5);

		this.sprite1.animationSpeed = this.animationSpeed;
        //this.sprite.scale.set(1.5,1.5);
		this.sprite1.play();

		this.sprite2 = new PIXI.extras.AnimatedSprite(this.frames);
		this.sprite2.x = x;
		this.sprite2.y = y;
		this.sprite2.hitarea = this.hitarea;

		this.sprite2.animationSpeed = this.animationSpeed;
        //this.sprite.scale.set(1.5,1.5);
		this.sprite2.play();
	}
	
	update(delta)
	{
		super.update(delta);
		while(this.nextAction.length > 0)
		{
			this.nextAction.shift().bind(this)();			
		}
	}

	reset() 
	{
		this.canMove = false;

		let death = [];
		for(let i = 19; i < 24; i++)
		{
			death.push(PIXI.Texture.fromFrame(this.file+"_"+i+".png"));
		}

		this.scene.viewport1.removeChild(this.sprite1);
		this.scene.viewport2.removeChild(this.sprite2);

		let x = this.sprite1.x;
		let y = this.sprite1.y;
		this.sprite1 = new PIXI.extras.AnimatedSprite(death);
		this.sprite2 = new PIXI.extras.AnimatedSprite(death);
		this.sprite1.animationSpeed = this.animationSpeed;
		this.sprite2.animationSpeed = this.animationSpeed;
		this.sprite1.hitarea = this.hitarea;
		this.sprite2.hitarea = this.hitarea;
		this.sprite1.x = x;
		this.sprite1.y = y;
		this.sprite2.x = x;
		this.sprite2.y = y;
		this.sprite1.loop = false;
		this.sprite2.loop = false;
		this.sprite1.play();
		this.sprite2.play();

		this.scene.viewport1.addChild(this.sprite1);
		this.scene.viewport2.addChild(this.sprite2);

		this.solid = false;


		this.sprite1.onComplete = () => {

			this.canMove = true;
			this.scene.viewport1.removeChild(this.sprite1);
			this.scene.viewport2.removeChild(this.sprite2);
			this.solid = true;
			this.sprite1 = new PIXI.extras.AnimatedSprite(this.frames);
			this.sprite2 = new PIXI.extras.AnimatedSprite(this.frames);
			this.sprite1.x = this.initialX;
			this.sprite1.y = this.initialY;
			this.sprite2.x = this.initialX;
			this.sprite2.y = this.initialY;
			this.sprite1.animationSpeed = this.animationSpeed;
			this.sprite2.animationSpeed = this.animationSpeed;
			this.sprite1.hitarea = this.hitarea;
			this.sprite2.hitarea = this.hitarea;
			this.sprite1.play();
			this.sprite2.play();
			
			this.scene.viewport1.addChild(this.sprite1);
			this.scene.viewport2.addChild(this.sprite2);
		}
	}

	
	moveUp()
	{
		this.nextAction.push(function(){
		if(this.canMove)
		{
			this.vy = -Config.PlayerSpeed;
		}});
	}
	
	moveDown()
	{
		this.nextAction.push(function(){
		if(this.canMove)
		{
			this.vy = +Config.PlayerSpeed;
		}});
	}
	
	moveLeft()
	{
		this.nextAction.push(function(){
		if(this.canMove)
		{
			this.vx = -Config.PlayerSpeed;
		}});
	}
	
	moveRight()
	{
		this.nextAction.push(function(){
		if(this.canMove)
		{
			this.vx = +Config.PlayerSpeed;
		}});
	}
	
	button1()
	{
		this.nextAction.push(function(){
		if(this.canCombo)
		{
			this.addCombo(1);
		}});
	}
	
	button2()
	{
		this.nextAction.push(function(){
			if(this.canCombo)
			{
				this.addCombo(2);
			}});
	}
	
	stopH()
	{
		this.vx = 0;
	}
	
	stopV()
	{
		this.vy = 0;
	}
	
	addCombo(c)
	{
		if(this.combo.length <3) // <3
		{
			this.combo.push(c);
			
			if(combo.length == 3)//combo atteint
			{
				
			}
		}
		else
		{
			
		}
	}


	
	
	
}