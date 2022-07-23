export class AcGame {
    constructor(id) {
        console.log("success");
        this.id = id;
        this.$ac_game = $('#'+id);
        this.menu = new AcGameMenu(this);
    }
}
//
//root is object of acgame
//
class AcGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="lq-game-menu">
</div>
`);
        this.root.$ac_game.append(this.$menu);
    }
}
