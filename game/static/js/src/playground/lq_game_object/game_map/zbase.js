class GameMap extends LQGameObject {
    constructor(playground) {
        super();
        this.playground = playground();
        this.$canvas = $(`<canvas></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx = canvas.width = this.playground.width;
        this.ctx = canvas.height = this.playground.height;
        this.playground.$playground.append(this.$canvas);
    }

    start() {
    }

    update() {
    }

    render() {
        this.ctx.fillstyle = "rgba(0, 0, 0, 0.2)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

}
