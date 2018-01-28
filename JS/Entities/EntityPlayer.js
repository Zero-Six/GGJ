class EntityPlayer extends EntityWalking {

	constructor(scene, file, x, y)
	{
		super(scene);

		this.file = file;

		this.initialX = x;
		this.initialY = y;


		this.mass = 0.3;
		this.nextAction = [];
		this.battery = 3;

		this.combo = [];
		this.canCombo = true;

		this.frames = [];
		for(let i = 1; i < 39; i++)
		{
			this.frames.push(PIXI.Texture.fromFrame(this.file+"_"+i+".png"));
		}
		
		this.switchSprite(this.frames);

		this.sprite1.hitarea = new Rectangle(7,18,7,0);
		this.sprite2.hitarea = new Rectangle(7,18,7,0);

		this.sprite1.x = x;
		this.sprite2.y = y;

		this.sprite1.play();
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
		console.log("ok");
		this.canMove = false;

		let death = [];
		for(let i = 19; i < 24; i++)
		{
			death.push(PIXI.Texture.fromFrame(this.file+"_"+i+".png"));
		}

		this.switchSprite(death);

		this.sprite1.play();
		this.sprite2.play();
		this.sprite1.loop = false;
		this.sprite2.loop = false;

		this.solid = false;

		this.sprite1.onComplete = () => {

			this.canMove = true;
			this.solid = true;

			this.switchSprite(this.frames);

			this.sprite1.play();
			this.sprite2.play();

			this.sprite1.loop = true;
			this.sprite2.loop = true;

			this.sprite1.x = this.initialX;
			this.sprite1.y = this.initialY;

			this.scene.viewport1.addChild(this.sprite1);
			this.scene.viewport2.addChild(this.sprite2);
		}
	}

	
	moveUp()
	{
		this.nextAction.push(function(){
		if(this.canMove && this.vy <= 0 )
		{
			this.vy = -Config.PlayerSpeed;
		}});
	}
	
	moveDown()
	{
		this.nextAction.push(function(){
		if(this.canMove && this.vy >= 0)
		{
			this.vy = +Config.PlayerSpeed;
		}});
	}
	
	moveLeft()
	{
		this.nextAction.push(function(){
		if(this.canMove && this.vx <= 0)
		{
			this.vx = -Config.PlayerSpeed;
		}});
	}
	
	moveRight()
	{
		this.nextAction.push(function(){
		if(this.canMove && this.vx >= 0)
		{
			this.vx = +Config.PlayerSpeed;
		}});
	}
	
	button1()
	{
		if(this.canCombo)
		{
			this.addCombo(1);
		}
	}
	
	button2()
	{
		if(this.canCombo)
		{
			this.addCombo(2);
		};
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
		if(this.combo.length == 0)
		{
			setTimeout(() => {
				this.clearCombo();
			}, 3000);
		}
		if(this.combo.length <3) // <3
		{
			this.combo.push(c);
			console.log(c);
			
			if(this.combo.length == 3)//combo atteint
			{
				Spells.checkSpell(this.scene, this.combo);
				this.clearCombo();
			}
		}
	}

	clearCombo()
	{
		this.combo = [];
	}


	
	
	
}