class GameMap
{
    constructor(width, height, grid)
    {
        this.width = width;
        this.height = height;
        this.grid = grid;
        this.container = new PIXI.Container();
        this.generateSprite();
    }

    generateSprite()
    {
        let sprite;
        for(let i = 0; i < this.width ; i++)
        {
            let row = [];
            for(let u = 0; u < this.height; u++)
            {
                let tile = (this.grid[i][u]);
                sprite = PIXI.Sprite.fromFrame("tile"+(tile+1)+".png");
                sprite.x = i * Config.TileSize;
                sprite.y = u * Config.TileSize;
                this.container.addChild(sprite);
            }
            this.grid.push(row);
        }
    }
}