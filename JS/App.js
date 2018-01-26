class Program
{


// EntryPoint
static Main()
{
    Program.Initialize();
}

// Singleton
 static Instance

 static Initialize()
{
    if(Program.Instance == null)
        Program.Instance = new Program();
}

 static GetInstance()
{
    if(Program.Instance == null)
        throw new Error("Instance must be initialized.");
    return Program.Instance;
}


constructor()
{
    this.scene = null;
    this.ready = false;

    this.app = new PIXI.Application(Config.Width, Config.Height, {backgroundColor : 0x282d44});
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    document.getElementById("touch").appendChild(this.app.view);
    
    this.app.renderer.autoResize = true;
    this.app.renderer.resize(Math.floor(window.innerWidth/Config.TileSize)*Config.TileSize, Math.floor(window.innerHeight/Config.TileSize)*Config.TileSize);
    this.load();
    
}


 load() : void
{
    PIXI.loader.add("assets/animations/Hero.json")
                .add("assets/animations/Badguy.json")
                .add("assets/animations/Pig.json")
                .add("assets/animations/Tileset.json")
                .add("assets/images/GUI/StatUI_background.png")
                .add("assets/images/GUI/Heart.png")
                .add("assets/animations/Particles.json")
                .add("assets/images/Elements/Hole.png")
                .add("assets/pixel.fnt")
                .load(() => { this.setup(); });
}

 setup() : void
{
    console.log("Setup...");

    this.scene = new SceneGame();
    this.scene.init();
    this.app.render();
    this.ready = true;





}

 Ready() : boolean
{
    return this.ready;
}

 App() : PIXI.Application
{
    return this.app;
}
}