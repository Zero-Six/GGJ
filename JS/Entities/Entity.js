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
		 
		// this.fx = 0;
		// this.fy = 0;
		
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

		setVx(vx)
		{
			this.vx = vx;
		}
	
		setVy(vy)
		{
			this.vy = vy;
		}
	
		Vx() 
		{
			return this.vx;
		}
	
		Vy() 
		{
			return this.vy;
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
		
		/**
		 * Renvoie une liste de cellulles dans un rayon de trois autour du joueur
		 */
		getArea(r, only = "ground")
		{
			let list = [];

			let map = this.scene.map1;

			let x = Math.floor((this.sprite1.x + this.sprite1.width /2) / Config.TileSize);
			let y = Math.floor((this.sprite1.y + this.sprite1.height/2) / Config.TileSize);
			r = ~~(r/2);
			x -= r;
			y -= r;
			
			for(let i = x; i <= x + (r*2+1); i++)
			{
				for(let u = y; u <= y +(r*2+1); u++)
				{
					if(map.grid[Math.floor(i )] == null || map.grid[Math.floor(i )][Math.floor(u )] == null)
						continue;
					if(Tiles[map.grid[Math.floor(i )][Math.floor(u )]] == null || Tiles[map.grid[Math.floor(i )][Math.floor(u )]].name != only)
						continue;
					let cell =JSON.parse(JSON.stringify(Tiles[map.grid[Math.floor(i )][Math.floor(u )]]));
					cell.x = i;
					cell.y = u;
					list.push(cell);
				}
			}
			return list;

		}
		
		
		

}