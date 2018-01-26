class Entity
{
    /**
     * Pixi sprite 
     */
    sprite;

    /**
     * Masse (pris en compte dans la gestion des collisions)
     */
    mass;

    /**
     * Géré par le système de collision ?
     */
    solid;

    /**
     * Scene dans laquelle apparait cette entité 
     */
    scene;

    /**
     * Vélocité x
     */
    vx;

    /**
     * Vélocité y
     */
    vy;

    update(delta) ;
    destroy() ;

    hit(other) ;
    reset() ;
    bump() ;

    Vx() ;
    Vy() ;
    setVx(vx );
    setVy(vy );
}