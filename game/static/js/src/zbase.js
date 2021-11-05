class LQGame {
    constructor(id) {
        this.id = id;
        this.$lq_game = $('#' + id);
        this.menu = new LQGameMenu(this);
    }

}


