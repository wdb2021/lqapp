class LQGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="lq-game-menu">
    <div class="lq-game-menu-title">
        凌骎的小游戏
    </div>
    <div class="lq-game-menu-field">
        <div class="lq-game-menu-field-item lq-game-menu-field-item-single-mode">
            单人模式
        </div>
        <br>
        <div class="lq-game-menu-field-item lq-game-menu-field-item-multi-mode">
            多人模式
        </div>
        <br>
        <div class="lq-game-menu-field-item lq-game-menu-field-item-settings">
            设置
        </div>
    </div>
</div>
`);
        this.$menu.hide();
        this.root.$lq_game.append(this.$menu);
        this.$single_mode = this.$menu.find('.lq-game-menu-field-item-single-mode');
        this.$multi_mode = this.$menu.find('.lq-game-menu-field-item-multi-mode');
        this.$settings = this.$menu.find('.lq-game-menu-field-item-settings');

        this.start();
    }


    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        this.$single_mode.click(function(){
            console.log("click single mode");
            outer.hide();
            outer.root.playground.show();
        });
        this.$multi_mode.click(function(){
            console.log("click multi mode");
        });
        this.$settings.click(function(){
            console.log("click settings");
        });
    }

    show() {  // 显示menu界面
        this.$menu.show();
    }

    hide() {  // 关闭menu界面
        this.$menu.hide();
    }


}
