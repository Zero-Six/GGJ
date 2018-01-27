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

}