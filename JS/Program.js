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
        this.app.renderer.resize(Math.floor((window.innerWidth/1.5)/Config.TileSize)*Config.TileSize, Math.floor((window.innerHeight/1.5)/Config.TileSize)*Config.TileSize);
        this.loadSounds();
    }

    loadSounds()
    {
        console.log("Loading sounds...")
        createjs.Sound.registerSound( "Assets/Sounds/Trap_Spikes.wav", "Spikes",3);
        createjs.Sound.registerSound( "Assets/Sounds/Step_01.wav", "Step_01");
        createjs.Sound.registerSound("Assets/Sounds/Step_02.wav", "Step_02");
        createjs.Sound.registerSound("Assets/Sounds/Step_03.wav", "Step_03" );
        createjs.Sound.registerSound( "Assets/Sounds/Step_04.wav", "Step_04");
        createjs.Sound.registerSound("Assets/Sounds/Step_05.wav", "Step_05");
        createjs.Sound.registerSound("Assets/Sounds/Step_06.wav", "Step_06");
        createjs.Sound.registerSound("Assets/Sounds/Step_07.wav", "Step_07");
        createjs.Sound.registerSound( "Assets/Sounds/Step_08.wav", "Step_08");


        createjs.Sound.registerSound( "Assets/Sounds/Step_Ice_01.wav", "Step_Ice_01");
        createjs.Sound.registerSound("Assets/Sounds/Step_Ice_02.wav", "Step_Ice_02");
        createjs.Sound.registerSound("Assets/Sounds/Step_Ice_03.wav", "Step_Ice_03" );
        createjs.Sound.registerSound( "Assets/Sounds/Step_Ice_04.wav", "Step_Ice_04");
        createjs.Sound.registerSound("Assets/Sounds/Step_Ice_05.wav", "Step_Ice_05");
        createjs.Sound.registerSound("Assets/Sounds/Step_Ice_06.wav", "Step_Ice_06" );
        createjs.Sound.registerSound("Assets/Sounds/Step_Ice_07.wav", "Step_Ice_07");
        createjs.Sound.registerSound( "Assets/Sounds/Step_Ice_08.wav", "Step_Ice_08");

        createjs.Sound.registerSound( "Assets/Sounds/Lava_Death_01.wav", "Lava");
        createjs.Sound.registerSound( "Assets/Sounds/Phone_Bip_01_01.wav", "Bip1");
        createjs.Sound.registerSound( "Assets/Sounds/Phone_Bip_01_02.wav", "Bip2");
        createjs.Sound.registerSound( "Assets/Sounds/Phone_Send.wav", "Send");


        createjs.Sound.registerSound( "Assets/Sounds/Pickup_Key.wav", "Key");
        createjs.Sound.registerSound( "Assets/Sounds/Music_Loop.wav", "Music");
        createjs.Sound.registerSound( "Assets/Sounds/Amb_Loop.wav", "Ambiance");
        createjs.Sound.on("fileload", this.loadSprites.bind(this), this);
        //createjs.Sound.registerSound("sample", "sample");*/
        //createjs.Sound.play(sample);
        //this.loadSprites();
        
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
                    .add("Assets/tourbillon.json")
                    .add("Assets/Tileset.json")
                    .add("Assets/level-battery.json")
                    .add("Assets/spikes.json")
                    .add("Assets/Bulle.json")
                    .add("Assets/symbol.json")
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