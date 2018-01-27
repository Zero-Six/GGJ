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

        Program.GetInstance().App().ticker.add((delta) => {
            this.update(delta)
        });
    }

    populate()
    {
        this.player1 = new EntityPlayer("j1");
		this.player2 = new EntityPlayer("j2");
		
        this.controllers.push(new XboxController(this.player1));
        this.controllers.push(new XboxController(this.player2));

        this.controllers.push(new KeyboardController(this.player1, 90, 83, 81, 68, 65, 69));
        this.controllers.push(new KeyboardController(this.player2, 38, 40, 37, 39, 96, 110));

        
       // let grid = lavender_gen(LAVENDER_ALGORITHM_BACKTRACKING, Date.now(), Config.MapWith, Config.MapHeight);
        
        let grid = [
            [0,1,2], 
            [2,1,0],
            [1,0,2]
        ];
        this.map1 = new GameMap(Config.MapWith, Config.MapHeight, grid);
        this.map2 = new GameMap(Config.MapWith, Config.MapHeight, grid);

        this.viewport1 = new Viewport(this.player1, 0,0, Program.GetInstance().App().renderer.width / 2, Program.GetInstance().App().renderer.height, this.map1);
        this.viewport2 = new Viewport(this.player2, Program.GetInstance().App().renderer.width / 2, 0, Program.GetInstance().App().renderer.width / 2, Program.GetInstance().App().renderer.height, this.map2);

        this.entities = [];
        this.addEntity(this.player1);
        this.addEntity(this.player2);
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

    /**
     * Met à jour les entités de la scene
     * @param {number} delta 
     */
    updateEntities(delta)
    {
        this.entities.forEach((entity) => {
            let normal = null;
            HelperPlayer.CheckPlayerTile(this.map, entity);

            // Vérification des collisions entre entités
            // if (entity.solid) {
                // this.entities.forEach((other) => {
                    // if (other == entity)
                        // return;
                    // normal = HelperEntity.checkCollisionWithEntity(entity, other);
                    // if (normal != null) {
                        // other.hit(entity);
                        // if(other instanceof EntityPlayer && entity instanceof EntityPig)
                        // {
                            // this.cancelControllers(other);
                        // }
                        // if (other.solid == false) 
                            // return;
                        // HelperEntity.resolveCollision(normal, entity);
                    // }
                // });
            // }

            // Vérification des collisions avec la map
            try {
                normal = HelperEntity.checkCollisionWithMap(this.map, entity);
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