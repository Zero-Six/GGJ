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
		// alert(this.width+" "+this.height)
        for(let i = 0; i < this.width ; i++)
        {
            // let row = [];
            for(let u = 0; u < this.height; u++)
            {
				
                let tile = (Tiles[this.grid[i][u]]);
                if(tile == null)
                    continue;
				
				
				if(tile.sprite)
				{
					sprite = PIXI.Sprite.fromFrame(tile.sprite+".png");
				}
				else if(tile.spriteAnim)
				{
					sprite = tile.spriteAnim(i,u);
				}
				else if(tile.spriteGen)// à revoir un peu pour les anims
				{
					sprite = PIXI.Sprite.fromFrame(tile.spriteGen(i,u,this.grid)+".png");
				}
                sprite.x = i * Config.TileSize;
                sprite.y = u * Config.TileSize;
				// alert(sprite.x+" "+sprite.y)
                this.container.addChild(sprite);
            }
            // this.grid.push(row);
        }
    }
}