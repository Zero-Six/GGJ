/**
 * Le viewport permettant d'afficher l'écran en split screen
 */
class Viewport 
{
    /**
     * 
     * @param {number} x position x dans le canvas 
     * @param {number} y position y dans le canvas
     * @param {number} width largeur dans le canvas
     * @param {number} height hauteur dans le canvas
     * @param {number} worldx position x de la map affichée
     * @param {number} worldy position y de la map affichée
     * @param {number} worldw largeur de la portion de la map à afficher 
     * @param {number} worldh hauteur de la portion de la map à afficher
     */
    constructor(player, x, y, width, height, map)
    {
        this.map = map;
        this.player = player;

        this.width = width;
        this.height = height;

        this.viewport = new PIXI.Container();
        this.viewport.x = x;
        this.viewport.y = y;
        this.viewport.width = width;
        this.viewport.height = height;   
        
        this.container = new PIXI.Container();

        this.container.x = width / 2;
        this.container.y = width / 2;
        this.container.width = width;
        this.container.height = height;


       // if(DEBUG)

        //}

        this.container.addChild(this.map.container);

        this.viewport.addChild(this.container);
        var circle = new PIXI.Graphics();
        circle.beginFill(0xFFFFFF);
        circle.lineStyle(2, 0xFFFFFF);
        circle.drawRect(0, 0, width, height);
        this.viewport.addChild(circle);
        this.viewport.mask = circle;
        Program.GetInstance().App().stage.addChild(this.viewport);

        this.map = map;

        this.blur = null;
        this.weird = null;

       

        
    }

    update()
    {
        this.container.x = this.width/2 -this.player.sprite1.x;
        this.container.y = this.height/2-this.player.sprite1.y;
        //console.log(this.container.x);
        
    }

    addChild(child)
    {
        this.container.addChild(child);
    }

    removeChild(child)
    {
        this.container.removeChild(child);
    }

    weird(sprite)
    {
        if(this.weird != null)
            return;
        this.weird = PIXI.filters.DisplacementFilter(sprite);
        this.container.filters.push(this.weird);
    }

    unweird()
    {
        if(this.weird == null)
            return;
        if(this.removeFilter(this.weird))
            this.weird = null;
    }

    blur()
    {
        if(this.blur != null)
            return;
        this.blur = new PIXI.filters.BlurFilter();
        this.container.filters.push(this.blur);
    }

    unblur()
    {
        if(this.blur == null)
            return;
        if(this.removeFilter(this.blur))
            this.blur = null;
    }

    removeFilter(filter)
    {
        for(let i = 0; i < this.container.filters.length;)
        {
            if(this.container.filters[i] == filter)
            {
                this.container.filters.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}