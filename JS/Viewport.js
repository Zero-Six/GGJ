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
    }

    addChild(child)
    {
        this.container.addChild(child);
    }

    removeChild(child)
    {
        this.container.removeChild(child);
    }
}