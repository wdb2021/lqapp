class LQGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div class="lq-game-playground"></div>`);
        // this.hide();
        this.root.$lq_game.append(this.$playground);
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);
        this.start();
    }

    start() {

    }

    update() {

    }

    show() { //打开playground界面
        this.$playground.show();
    }

    hide() {  //关闭playground界面
        this.$playground.hide();
    }

}
