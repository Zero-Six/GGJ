class Entity
{
	constructor(scene)
	{
		/**
		 * Pixi sprite 
		 */
		this.sprite1 = null;;
		this.sprite2 = null;;

		this.collided = false;

		/**
		 * Masse (pris en compte dans la gestion des collisions)
		 */
		this.mass = 0;

		/**
		 * Géré par le système de collision ?
		 */
		this.solid = true;

		/**
		 * Scene dans laquelle apparait cette entité 
		 */
		this.scene = scene;

		/**
		 * Vélocité x
		 */
		this.vx = 0;

		/**
		 * Vélocité y
		 */
		this.vy = 0;
	}
		update(delta)
		{
			if(this.sprite1 != null && this.sprite2 != null)
			{
				this.sprite2.x = this.sprite1.x;
				this.sprite2.y = this.sprite1.y;
			}
		}
		
		destroy()
		{
			this.scene.removeEntity(this);
		}

		hit(other)
		{
			
			
		}

		switchSprite(frames)
		{
			if(this.scene.viewport1 != null && this.scene.viewport2 != null)
			{
				this.scene.viewport1.removeChild(this.sprite1);
				this.scene.viewport2.removeChild(this.sprite2);
			}

			let x = 0;
			let y = 0;
			let hitarea = new Rectangle(0,0,0,0);
			let animationSpeed = 0.3;
			if(this.sprite1 != null)
			{
				x = this.sprite1.x;
				y = this.sprite1.y;
				hitarea = this.sprite1.hitarea;
				animationSpeed = this.sprite1.animationSpeed;
			}
			this.sprite1 = new PIXI.extras.AnimatedSprite(frames);
			this.sprite2 = new PIXI.extras.AnimatedSprite(frames);
			this.sprite1.animationSpeed = animationSpeed;
			this.sprite2.animationSpeed = animationSpeed;
			this.sprite1.hitarea = hitarea;
			this.sprite2.hitarea = hitarea;
			this.sprite1.x = x;
			this.sprite1.y = y;
			this.sprite2.x = x;
			this.sprite2.y = y;
			this.sprite1.play();
			this.sprite2.play();

			if(this.scene.viewport1 != null && this.scene.viewport2 != null)
			{			
				this.scene.viewport1.addChild(this.sprite1);
				this.scene.viewport2.addChild(this.sprite2);
			}
		}
		
		reset()
		{
			
		}
		
		
		bump()
		{
			
		}

		Vx()
		{
			
		}
		
		Vy()
		{
			
		}
		
		setVx(vx )
		{
			
		}
		
		setVy(vy )
		{
			
		}
		
		
		getArea(r)
		{
			var cx = Math.floor(this.sprite1.x/Config.TileSize);
			var cy = Math.floor(this.sprite1.y/Config.TileSize);
			var list = [[0,0]];
			for(var x = 1; x <= r;x++)
			{
				for(var y = 1; y <= x;y++)
				{
					list.push([cx+x,cy+y]);
					list.push([cx-x,cy+y]);
					list.push([cx-x,cy-y]);
					list.push([cx+x,cy-y]);
				}
			}
			
			return list
			
			
		}
		
		
		

}