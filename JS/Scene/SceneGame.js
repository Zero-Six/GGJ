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
        this.controllers.push(new XboxController(null));
        this.controllers.push(new XboxController(null));

        this.controllers.push(new KeyboardController(null, 90, 83, 81, 68, 65, 69));
        this.controllers.push(new KeyboardController(null, 38, 40, 37, 39, 96, 110));

        let grid = null; //TODO: générer la grid
        this.map1 = new GameMap(Config.MapWith, Config.MapHeight, grid);
        this.map2 = new GameMap(Config.MapWith, Config.MapHeight, grid);

        //TODO: générer les joueurs 

        //TODO: ajouter les controlleurs

        this.viewport1 = new Viewport(this.player1, 0,0, Program.GetInstance().App().width / 2, Program.GetInstance().App().height, this.map1);
        this.viewport2 = new Viewport(this.player2, Program.GetInstance().App().width / 2, 0, Program.GetInstance().App().width / 2, Program.GetInstance().App().height, this.map2);
    }

    update(delta)
    {
        this.updateEntities(delta);

        this.viewport1.update();
        this.viewport2.update();
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
            if (entity.solid) {
                this.entities.forEach((other) => {
                    if (other == entity)
                        return;
                    normal = HelperEntity.checkCollisionWithEntity(entity, other);
                    if (normal != null) {
                        other.hit(entity);
                        if(other instanceof EntityPlayer && entity instanceof EntityPig)
                        {
                            this.cancelControllers(other);
                        }
                        if (other.solid == false) 
                            return;
                        HelperEntity.resolveCollision(normal, entity);
                    }
                });
            }

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
                entity.bump();
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