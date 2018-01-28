class Vector2 {
    static min(v1, v2) {
        if (v1.scalar() < v2.scalar())
            return v1;
        return v2;
    }
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    substract(other) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
    multiply(other) {
        return new Vector2(this.x * other.x, this.y * other.y);
    }
    dotproduct(other) {
        return this.x * other.x + this.y * other.y;
    }
    scalar() {
        return this.x + this.y;
    }
}
class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    translate(vec) {
        return new Rectangle(this.x + vec.x, this.y + vec.y, this.width, this.height);
    }
    intersect(rec) {
        if (!(this.x < rec.x + rec.width &&
            this.x + this.width > rec.x &&
            this.y < rec.y + rec.height &&
            this.height + this.y > rec.y)) {
            return null;
        }
        let result = new Rectangle();
        if (this.x < rec.x) {
            result.x = rec.x;
            result.width = this.x + this.width - rec.x;
        }
        else {
            result.x = this.x;
            result.width = rec.x + rec.width - this.x;
        }
        if (this.y < rec.y) {
            result.y = rec.y;
            result.height = this.y + this.height - rec.y;
        }
        else {
            result.y = this.y;
            result.height = rec.y + rec.height - this.y;
        }
        return result;
    }
}
class HelperEntity {
    /*
        Vérifie la collision entre deux entitées
     */
    static checkCollisionWithMap(map, entity) {
        let results = [];

        let points = [];

        let topleft = new Vector2(entity.sprite1.x, entity.sprite1.y);
        let bottomright = new Vector2(entity.sprite1.x + entity.sprite1.width, entity.sprite1.y + entity.sprite1.height)
        let topright = new Vector2(entity.sprite1.x + entity.sprite1.width, entity.sprite1.y);
        let bottomleft = new Vector2(entity.sprite1.x, entity.sprite1.y + entity.sprite1.height);

        topleft.x += entity.sprite1.hitarea.x;
        topleft.y += entity.sprite1.hitarea.y;

        topright.x -= entity.sprite1.hitarea.width;
        topright.y += entity.sprite1.hitarea.y;

        bottomleft.x += entity.sprite1.hitarea.x;
        bottomleft.y -= entity.sprite1.hitarea.height;

        bottomright.x -= entity.sprite1.hitarea.width;
        bottomright.y -= entity.sprite1.hitarea.height;

        let rectangle1 = new Rectangle(topleft.x + Config.AirDensity * entity.Vx(), topleft.y + Config.AirDensity * entity.Vy(), bottomright.x - topleft.x , bottomright.y - topleft.y);
        


        points.push(topleft);
        points.push(bottomright);
        points.push(topright);
        points.push(bottomleft);
        for (let i = 0; i < points.length; i++) {
            //console.log(points);
            let point = points[i];
            if (Tiles[map.grid[Math.floor(point.x / Config.TileSize)][Math.floor(point.y / Config.TileSize)]].solid == false) {
                continue;
            }
            let rectangle2 = new Rectangle(Math.floor(point.x / Config.TileSize) * Config.TileSize, Math.floor(point.y / Config.TileSize) * Config.TileSize, Config.TileSize, Config.TileSize);
            let result = HelperEntity.checkCollision(rectangle1, rectangle2);
            if (result != null)
                results.push(result);
        }
        if (results.length <= 0)
            return null;
        let result = new Vector2(0, 0);
        //console.log("res");
        results.forEach((r) => {
            //console.log(r);
            result = result.add(r);
        });
        if (result.x != 0 && Math.abs(result.x) < 1) {
            if (result.x < 0)
                result.x = -1;
            if (result.x > 0)
                result.x = 1;
        }
        if (result.y != 0 && Math.abs(result.y) < 1) {
            if (result.y < 0)
                result.y = -1;
            if (result.y > 0)
                result.y = 1;
        }
        
        //cc;
        //console.log(result);
        return result;
    }

    static checkOverlap(entity1, entity2) {
        let rectangle1 = new Rectangle(entity1.sprite1.x + Config.AirDensity * entity1.Vx(), entity1.sprite1.y + Config.AirDensity * entity1.Vy(), entity1.sprite1.width, entity1.sprite1.height);
        let rectangle2 = new Rectangle(entity2.sprite1.x + Config.AirDensity * entity2.Vx(), entity2.sprite1.y + Config.AirDensity * entity2.Vy(), entity2.sprite1.width, entity2.sprite1.height);
        let nm = this.checkCollision(rectangle1, rectangle2);
        if(nm == null || (nm.x == 0 && nm.y == 0))
            return;
        if(entity2.sprite1.y < entity1.sprite1.y)
        {
            entity1.scene.viewport1.removeChild(entity1.sprite1);
            entity1.scene.viewport2.removeChild(entity1.sprite2);
            entity1.scene.viewport1.addChild(entity1.sprite1);
            entity1.scene.viewport2.addChild(entity1.sprite2);
            
        }
        else if(entity2.sprite1.y > entity1.sprite1.y)
        {
            entity2.scene.viewport1.removeChild(entity2.sprite1);
            entity2.scene.viewport2.removeChild(entity2.sprite2);
            entity2.scene.viewport1.addChild(entity2.sprite1);
            entity2.scene.viewport2.addChild(entity2.sprite2);
        }
    }

    static checkCollisionWithEntity(entity1, entity2) {
        
        let topleft = new Vector2(entity1.sprite1.x, entity1.sprite1.y);
        let bottomright = new Vector2(entity1.sprite1.x + entity1.sprite1.width, entity1.sprite1.y + entity1.sprite1.height)

        topleft.x += entity1.sprite1.hitarea.x;
        topleft.y += entity1.sprite1.hitarea.y;

        bottomright.x -= entity1.sprite1.hitarea.width;
        bottomright.y -= entity1.sprite1.hitarea.height;

        let rectangle1 = new Rectangle(topleft.x + Config.AirDensity * entity1.vx, topleft.y + Config.AirDensity * entity1.vy, bottomright.x - topleft.x , bottomright.y - topleft.y);
        
        topleft = new Vector2(entity2.sprite1.x, entity2.sprite1.y);
        bottomright = new Vector2(entity2.sprite1.x + entity2.sprite1.width, entity2.sprite1.y + entity2.sprite1.height)

        topleft.x += entity2.sprite1.hitarea.x;
        topleft.y += entity2.sprite1.hitarea.y;

        bottomright.x -= entity2.sprite1.hitarea.width;
        bottomright.y -= entity2.sprite1.hitarea.height;

        let rectangle2 = new Rectangle(topleft.x + Config.AirDensity * entity2.vx, topleft.y + Config.AirDensity * entity2.vy, bottomright.x - topleft.x , bottomright.y - topleft.y);
        let n = this.checkCollision(rectangle1, rectangle2);
        
        //console.log(n);
        return n;
    }
    static checkCollision(rectangle1, rectangle2) {
        let intersection = rectangle1.intersect(rectangle2);
        if (intersection == null)
            return null;
        let normal = new Vector2(0, 0);
        if (intersection.width < intersection.height)
            normal.x = intersection.width;
        else
            normal.y = intersection.height;
        if (rectangle1.x < rectangle2.x)
            normal.x = -normal.x;
        if (rectangle1.y < rectangle2.y)
            normal.y = -normal.y;
        return normal;
    }
    static resolveCollision(normal, entity1, entity2) {
        if ((normal.x > 0 && entity1.vx < 0) || (normal.x < 0 && entity1.vx > 0) && entity1.scene instanceof SceneGame && entity1 instanceof EntityPlayer)
            entity1.scene.cancelControllers(entity1);
        if ((normal.y > 0 && entity1.vy < 0) || (normal.y < 0 && entity1.vy > 0) && entity1.scene instanceof SceneGame && entity1 instanceof EntityPlayer)
            entity1.scene.cancelControllers(entity1);
            
        entity1.setVy(normal.y);
        entity1.setVx(normal.x);
        entity1.nextAction = [];
        if (entity2 != null) {
            entity2.setVy(-normal.y);
            entity2.setVx(-normal.x);
            entity2.nextAction = [];
        }
        else 
        {
            
        }
    }
}