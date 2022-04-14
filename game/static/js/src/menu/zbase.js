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
    <div class="lq-game-menu-instruction">
        游戏说明: 按Q选取火球，再按鼠标左键释放火球。火球击中敌方玩家后，会造成血量伤害、溅射和击退效果。同时敌方轮廓会变小，在累计一定伤害后，角色消失。
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
            outer.root.playground.show("single mode");
        });
        this.$multi_mode.click(function(){
            console.log("click multi mode");
            outer.hide();
            outer.root.playground.show("multi mode");
        });
        this.$settings.click(function(){
            console.log("click settings");
            outer.root.settings.logout_on_remote();
        });
    }

    show() {  // 显示menu界面
        this.$menu.show();
    }

    hide() {  // 关闭menu界面
        this.$menu.hide();
    }

}
