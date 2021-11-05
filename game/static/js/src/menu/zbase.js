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
