export class LQGame {
    constructor(id, AcOS) {
        this.id = id;
        this.$lq_game = $('#' + id);
        this.AcOS = AcOS;

        this.settings = new Settings(this)
        this.menu = new LQGameMenu(this);
        this.playground = new LQGamePlayground(this);
        
        this.start();
        console.log("lqgame src success");
    }

    start() {

    }
}

