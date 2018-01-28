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

    updateTile(x, y)
    {
        let tile = (Tiles[this.grid[x][y]]);
        if(tile == null)
            return;
        
        let sprite = null;
        if(tile.spriteGen)
        {
            sprite = PIXI.Sprite.fromFrame(tile.spriteGen(x,y,this.grid)+".png");
        }
        else // à revoir un peu pour les anims
        {
            sprite = PIXI.Sprite.fromFrame(tile.sprite+".png");
        }
        sprite.x = x * Config.TileSize;
        sprite.y = y * Config.TileSize;
        // alert(sprite.x+" "+sprite.y)
        this.container.addChild(sprite);
    }


    generateSprite()
    {
		// alert(this.width+" "+this.height)
        for(let i = 0; i < this.width ; i++)
        {
           // let row = [];
            for(let u = 0; u < this.height; u++)
            {
				
                this.updateTile(i, u);
            }
            //this.grid.push(row);
        }
    }
}