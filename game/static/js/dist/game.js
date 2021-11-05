class LQGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="lq-game-menu">
</div>
`);
        this.root.$lq_game.append(this.$menu);
    }
}
class LQGame {
    constructor(id) {
        this.id = id;
        this.$lq_game = $('#' + id);
        this.menu = new LQGameMenu(this);
    }

}


