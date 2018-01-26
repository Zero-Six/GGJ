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
        let rectangle1 = new Rectangle(entity.sprite.x + Config.AirDensity * entity.Vx(), entity.sprite.y + Config.AirDensity * entity.Vy(), entity.sprite.width, entity.sprite.height);
        let points = [];
        points.push(new Vector2(entity.sprite.x, entity.sprite.y));
        points.push(new Vector2(entity.sprite.x + entity.sprite.width, entity.sprite.y + entity.sprite.height));
        points.push(new Vector2(entity.sprite.x + entity.sprite.width, entity.sprite.y));
        points.push(new Vector2(entity.sprite.x, entity.sprite.y + entity.sprite.height));
        for (let i = 0; i < points.length; i++) {
            let point = points[i];
            if (Config.TilesWalkable(map.grid[Math.floor(point.x / Config.TileSize)][Math.floor(point.y / Config.TileSize)])) {
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
        results.forEach((r) => {
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
        return result;
    }
    static checkCollisionWithEntity(entity1, entity2) {
        let rectangle1 = new Rectangle(entity1.sprite.x + Config.AirDensity * entity1.Vx(), entity1.sprite.y + Config.AirDensity * entity1.Vy(), entity1.sprite.width, entity1.sprite.height);
        let rectangle2 = new Rectangle(entity2.sprite.x + Config.AirDensity * entity2.Vx(), entity2.sprite.y + Config.AirDensity * entity2.Vy(), entity2.sprite.width, entity2.sprite.height);
        return this.checkCollision(rectangle1, rectangle2);
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
        if (entity2 != null) {
            entity2.setVy(-normal.y);
            entity2.setVx(-normal.x);
        }
    }
}