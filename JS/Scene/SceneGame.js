class SceneGame extends Scene 
{
    constructor()
    {
        //TODO: corriger taille map
        this.viewport1 = new Viewport(0,0, Program.GetInstance().App().width / 2, Program.GetInstance().App().height, 0, 0, 42, 42);
        this.viewport2 = new Viewport(Program.GetInstance().App().width / 2, 0, Program.GetInstance().App().width / 2, Program.GetInstance().App().height,  0, 0, 42, 42);
    }

    init() 
    {
        
    }

    update(delta)
    {
        this.viewport1.update();
        this.viewport2.update();
    }

    destroy()
    {

    }
}