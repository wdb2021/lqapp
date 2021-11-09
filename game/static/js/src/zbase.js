export class LQGame {
    constructor(id) {
        console.log("lqgame src success")
        this.id = id;
        this.$lq_game = $('#' + id);
        this.menu = new LQGameMenu(this);
        this.playground = new LQGamePlayground(this);
        
        this.start();
    }

    start() {

    }
}


