let Program_Instance = null;

class Program
{
    // EntryPoint
    static Main()
    {
        Program.Initialize();
    }

    static Initialize()
    {
        if(Program_Instance == null)
            Program_Instance = new Program();
    }

    static GetInstance()
    {
        if(Program_Instance == null)
            throw new Error("Instance must be initialized.");
        return Program_Instance;
    }


    constructor()
    {
        this.scene = null;
        this.ready = false;

        this.app = new PIXI.Application(608, 608, {backgroundColor : 0x282d44});
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        document.getElementById("touch").appendChild(this.app.view);
        
        this.app.renderer.autoResize = true;
        this.app.renderer.resize(Math.floor(window.innerWidth/Config.TileSize)*Config.TileSize, Math.floor(window.innerHeight/Config.TileSize)*Config.TileSize);
        this.loadSounds();
    }

    loadSounds()
    {
        console.log("Loading sounds...")
        /*createjs.Sound.on("fileload", this.loadSprites.bind(this), this);
        createjs.Sound.registerSound("sample", "sample");*/
        //createjs.Sound.play(sample);
        this.loadSprites();
        
    }


    loadSprites()
    {
        console.log("Loading Sprites...");
        PIXI.loader.onError.add(function(error)
        {
            console.log(error);
        });
        PIXI.loader.add("Assets/J1.json")
                    .add("Assets/J2.json")
                    .add("Assets/wall.json")
                    .add("Assets/lava.json")
                    .add("Assets/bumper.json")
                    .add("Assets/bombe.json")
                    .add("Assets/Tileset.json")
                    .load(() => { this.setup(); });
    }

    setup()
    {
        console.log("Setup...");

        this.scene = new SceneGame();
        this.scene.init();
        this.app.render();
        this.ready = true;
    }

    App()
    {
        return this.app;
    }
}