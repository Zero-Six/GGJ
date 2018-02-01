class Particle {
    constructor(texture) {
        this.ready = true;
        this.size = 1;
        this.sprite1 = new PIXI.Sprite(texture);
        this.sprite2 = new PIXI.Sprite(texture);
    }
    set(x, y, life, speed, angle, sizeRandom, sizeMax) {
        this.sprite1.x = x;
        this.sprite2.x = x;
        this.sprite1.y = y;
        this.sprite2.y = y;
        this.originalLife = this.life = life;
        let radians = angle * Math.PI / 180;
        let modifier = Math.random();
        if (Math.random() * 100 <= 50)
            modifier = -modifier;
        radians += modifier;
        if (sizeRandom && sizeMax != null)
            this.size = Math.random() * (sizeMax - 1) + 1;
        this.vx = speed * Math.cos(radians);
        this.vy = speed * Math.sin(radians);
        this.ready = false;
    }
    Ready() {
        return this.ready;
    }
    update(delta) {
        if (this.ready == true)
            return;
        this.life -= delta;
        if (this.life > 0) {
            this.sprite1.x += this.vx * delta;
            this.sprite2.x += this.vx * delta;
            this.sprite1.y += this.vy * delta;
            this.sprite2.y += this.vy * delta;
            let per = this.life / this.originalLife;
            this.sprite1.scale.set(this.size * per, this.size * per);
            this.sprite2.scale.set(this.size * per, this.size * per);
            this.sprite1.alpha = per;
            this.sprite2.alpha = per;
        }
        else
            this.ready = true;
    }
}