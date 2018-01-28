class SceneGame extends Scene 
{
    constructor()
    {
        super();
        this.viewport1 = null;
        this.viewport2 = null;
        this.player1 = null;
        this.player2 = null;

        this.map1 = null;
        this.map2 = null;

        this.entities = [];
        this.controllers = [];
    }

    init() 
    {
		this.populate();

        
    }

    populate()
    {
        this.player1 = new EntityPlayer(this, "j1", 64, 64);
        this.player2 = new EntityPlayer(this, "j2", 32, 64);
		
        this.controllers.push(new XboxController(this.player1));
        this.controllers.push(new XboxController(this.player2));

        this.controllers.push(
	    new KeyboardController(
		this.player1,
		"KeyW", "KeyS", "KeyA",
		"KeyD", "KeyQ", "KeyE"
	    )
	);
	
        this.controllers.push(
	    new KeyboardController(
		this.player2,
		"ArrowUp", "ArrowDown", "ArrowLeft",
		"ArrowRight", "Numpad0", "NumpadDecimal"
	    )
	);


        let lavenderCtx = lavender_new(Date.now(), "Assets/maps.json");
        let rooms = lavender_gen(lavenderCtx, LAVENDER_ALGORITHM_BACKTRACKING, Config.MapRooms, Config.MapRooms); 
        lavender_conv(lavenderCtx, rooms, Config.MapRooms, Config.MapRooms).then((origingrid) => {
            let grid = [];
            let self = this;
            let x1 = 0;
            let x2 = 0;
            let y1 = 0;
            let y2 = 0;
            for(let i = 0; i < origingrid.length; i++)
            {
                let u = ~~(i/Config.MapWidth);
                if(grid[u] == null)
                    grid[u] = [];
                grid[u][i%Config.MapWidth] = origingrid[i];
                if(origingrid[i] == 12)
                {
                    x1 = u * Config.TileSize;
                    y1 = i%Config.MapWidth* Config.TileSize;
                }
                else if(origingrid[i] == 13)
                {
                    x2 = u* Config.TileSize;
                    y2 = i%Config.MapWidth* Config.TileSize;
                }

            }
            // var map = new GameMap(Config.MapWidth, Config.MapHeight, grid); // Potentiellement problème de clonage
            self.map1 = new GameMap(Config.MapWidth, Config.MapHeight, grid);;
            self.map2 = new GameMap(Config.MapWidth, Config.MapHeight, grid);
    
            self.viewport1 = new Viewport(self.player1, 0,0, Program.GetInstance().App().renderer.width / 2, Program.GetInstance().App().renderer.height, self.map1);
            self.viewport2 = new Viewport(self.player2, Program.GetInstance().App().renderer.width / 2, 0, Program.GetInstance().App().renderer.width / 2, Program.GetInstance().App().renderer.height, self.map2);
    

            self.player1.sprite1.x = x1;
            self.player1.sprite1.y = y1;
            self.player1.initialX = x1;
            self.player1.initialY = y1;

            self.player2.sprite1.x = x2;
            self.player2.sprite1.y = y2;
            self.player2.initialX = x2;
            self.player2.initialY = y2;

            self.addEntity(self.player1);
            self.addEntity(self.player2);
            
            Program.GetInstance().App().ticker.add((delta) => {
                self.update(delta)
            });
            
        });
        
    }

    changeMapCell(x, y, value)
    {
        this.map1.grid[x][y] = value;
        this.map1.updateTile(x,y);
        this.map2.grid[x][y] = value;
        this.map2.updateTile(x,y);
    }

    update(delta)
    {
        this.updateEntities(delta);

        this.viewport1.update();
        this.viewport2.update();
    }

    addEntity(entity)
    {
        this.entities.push(entity);
        this.viewport1.addChild(entity.sprite1);
        this.viewport2.addChild(entity.sprite2);
    }

    removeEntity(entity)
    {
        for(let i = 0; i < this.entities.length; i++)
        {
            if(this.entities[i] == entity)
            {
                this.entities.splice(i, 1);
                break;
            }
        }
        this.viewport1.removeChild(entity.sprite1);
        this.viewport2.removeChild(entity.sprite2);
    }

    /**
     * Met à jour les entités de la scene
     * @param {number} delta 
     */
    updateEntities(delta)
    {
        this.entities.forEach((entity) => {
            let normal = null;
            HelperPlayer.CheckPlayerTile(this.map1, entity);

            // Vérification des collisions entre entités
           
                this.entities.forEach((other) => {
                    HelperEntity.checkOverlap(entity, other);
                    if (entity.solid == false)
                        return; 
                    if (other == entity)
                        return;
                     normal = HelperEntity.checkCollisionWithEntity(entity, other);
                     if (normal != null) {
                         other.hit(entity);
                         if(other instanceof EntityPlayer)
                         {
                             this.cancelControllers(other);
                         }
                         if (other.solid == false) 
                             return;
                         HelperEntity.resolveCollision(normal, entity);
                     }
                 });
            

            // Vérification des collisions avec la map
            try {
                normal = HelperEntity.checkCollisionWithMap(this.map1, entity);
            }
            catch(e)
            {
                
            }
            if (normal != null)
            {
                HelperEntity.resolveCollision(normal, entity);
                if(entity instanceof EntityPlayer)
                {
                    this.cancelControllers(entity);
                    //entity.nextAction = [];
                }
            }
            entity.update(delta);
            

        });
    }

    destroy()
    {

    }

    /**
     * Appelle Cancel sur les controllers associés au joueur passé en paramètre
     * @param {EntityPlayer} player 
     */
    cancelControllers(player)
    {
        this.controllers.forEach((controller) => {
            if(controller.player == player)
                controller.cancel();
        });
}
}
