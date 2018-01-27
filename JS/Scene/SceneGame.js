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
        this.player1 = new EntityPlayer(this, "j1", -32, -32);
        this.player2 = new EntityPlayer(this, "j2", 0, 0);
		
        this.controllers.push(new XboxController(this.player1));
        this.controllers.push(new XboxController(this.player2));

        this.controllers.push(new KeyboardController(this.player1, 90, 83, 81, 68, 65, 69));
        this.controllers.push(new KeyboardController(this.player2, 38, 40, 37, 39, 96, 110));


        let lavenderCtx = lavender_new(Date.now(), "Assets/maps.json");
        let rooms = lavender_gen(lavenderCtx, LAVENDER_ALGORITHM_BACKTRACKING, Config.MapRooms, Config.MapRooms); 
        lavender_conv(lavenderCtx, rooms, Config.MapRooms, Config.MapRooms).then((origingrid) => {
            let grid = [];
            let doer = process();
            doer.next();
            let self = this;
            function *process()
            {
                for(let i = 0; i < origingrid.length; i++)
                {
                    let u = ~~(i/Config.MapWidth);
                    if(grid[u] == null)
                        grid[u] = [];
                    grid[u][i] = origingrid[i];
                    yield lavender_wait(doer, 5);
                }
                //console.log(grid);
                self.map1 = new GameMap(Config.MapWidth, Config.MapHeight, grid);
                self.map2 = new GameMap(Config.MapWidth, Config.MapHeight, grid);
        
                self.viewport1 = new Viewport(self.player1, 0,0, Program.GetInstance().App().renderer.width / 2, Program.GetInstance().App().renderer.height, self.map1);
                self.viewport2 = new Viewport(self.player2, Program.GetInstance().App().renderer.width / 2, 0, Program.GetInstance().App().renderer.width / 2, Program.GetInstance().App().renderer.height, self.map2);
        
                self.entities = [];
                self.addEntity(self.player1);
                self.addEntity(self.player2);
                
                Program.GetInstance().App().ticker.add((delta) => {
                    self.update(delta)
                });
            }
        });
        
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
                    entity.nextAction = [];
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