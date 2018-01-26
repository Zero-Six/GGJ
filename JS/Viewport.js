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
    constructor(x, y, width, height, worldx, worldy, worldw, worldh)
    {
        this.x = worldx;
        this.y = worldy;
        this.width = worldw;
        this.height = worldh;


        this.container = new PIXI.container();

        this.container.x = x;
        this.container.y = y;
        this.container.width = width;
        this.container.height = height;

        this.blur = null;
    }

    addChild(child)
    {
        this.container.addChild(child);
    }

    removeChild(child)
    {
        this.container.removeChild(child);
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