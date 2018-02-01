class ParticleEmitter {
    constructor() {
        this.particlePool = [];
        this.totalParticles = 25;
        this.frequency = 0;
        this.callback = null;
    }
    static create(scene, texture, config, callback, totalParticles) {
        let em = new ParticleEmitter();
        em.callback = callback;
        em.scene = scene;
        em.config = config;
        em.life = em.config.life;
        em.container1 = new PIXI.particles.ParticleContainer();
        em.container2 = new PIXI.particles.ParticleContainer();
        if (totalParticles != null)
            em.totalParticles = totalParticles;
        for (let i = 0; i < em.totalParticles; i++) {
            em.particlePool.push(new Particle(texture));
        }
        em.id = em.scene.registerParticleEmitter(em);
        return em;
    }
    createParticle() {
        let particle = this.getFreeParticeFromPool();
        if (particle == null)
            return;
        let angle = Math.random() * this.config.angleMax;
        angle -= 90;
        let x = this.config.x;
        let y = this.config.y;
        if (this.config.zone != null) {
            x += Math.floor(Math.random() * this.config.zone.width);
            y += Math.floor(Math.random() * this.config.zone.height);
        }
        particle.set(x, y, this.config.particleLife, this.config.particleSpeed, angle, this.config.sizeRandom, this.config.sizeMax);
        this.container1.addChild(particle.sprite1);
        this.container2.addChild(particle.sprite2);
    }
    destroy(execute = true) {
        if (this.callback != null && execute)
            this.callback();
        this.scene.unregisterParticleEmitter(this.id);
        this.container1.destroy({ children: true });
        this.container2.destroy({ children: true });
    }
    update(delta) {
        if (this.life != Infinity)
            this.life -= delta;
        this.frequency -= delta;
        if (this.frequency <= 0) {
            this.createParticle();
            this.frequency = this.config.frequency != null ? this.config.frequency : 0;
        }
        if (this.life < 0) {
            this.destroy();
            return;
        }
        for (let i = 0; i < this.totalParticles; i++) {
            if (!this.particlePool[i].Ready()) {
                this.particlePool[i].update(delta);
                if (this.particlePool[i].Ready())
                {
                    this.container1.removeChild(this.particlePool[i].sprite1);
                    this.container2.removeChild(this.particlePool[i].sprite2);
                }
            }
        }
    }
    getFreeParticeFromPool() {
        for (let i = 0; i < this.totalParticles; i++) {
            if (this.particlePool[i].Ready())
                return this.particlePool[i];
        }
        return null;
    }
}