class Player extends LQGameObject {
    constructor(playground, x, y, radius, color, speed, is_me ) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = speed;
        this.is_me = is_me;
        this.eps = 0.1;
    }

    start() {
    }

    update() {
        this.render();
    }

    render() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    
}
