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
			
		}
		
		destroy()
		{
			
		}

		hit(other)
		{
			
			
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