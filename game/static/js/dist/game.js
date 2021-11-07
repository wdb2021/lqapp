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
        <div class="lq-game-menu-field-item lq-game-menu-field-item-multi-mode">
            多人模式
        </div>
        <div class="lq-game-menu-field-item lq-game-menu-field-item-settings">
            设置
        </div>
    </div>
</div>
`);
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
let LQ_GAME_OBJECTS = [];

class LQGameObject {
    constructor() {
        LQ_GAME_OBJECTS.push(this);

        this.has_called_start = false; //执行过start函数
        this.timedelta = 0; //当前帧距离上一帧的时间间隔
                            //统一浏览器时间间隔
    }

    start() {  //只会在第一帧执行一次
    }

    update() { //每帧都执行一次
    }

    on_destroy() { // 销毁前执行一次

    }

    destroy() { //删掉当前物体
        this.on_destroy();
        for (let i=0; i < LQ_GAME_OBJECTS.length; i++) {
            if (LQ_GAME_OBJECTS[i] === this) {
                LQ_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp;
let LQ_GAME_ANIMATION = function(timestamp) {
    for(let i = 0; i < LQ_GAME_OBJECTS.length; i++) {
        let obj = LQ_GAME_OBJECTS[i];
        if(!obj.has_called_start) {
            obj.start();
            obj.has_called_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;

    requestAnimationFrame(LQ_GAME_ANIMATION);
}

requestAnimationFrame(LQ_GAME_ANIMATION);  //一秒调用60次
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
class Player extends LQGameObject {
    constructor(playground, x, y, radius, color, speed, is_me ) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = speed;
        this.is_me = is_me;
        this.eps = 0.1;
    }

    start() {
    }

    update() {
        this.render();
    }

    render() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    
}
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
export class LQGame {
    constructor(id) {
        console.log("lqgame src success")
        this.id = id;
        this.$lq_game = $('#' + id);
        //this.menu = new LQGameMenu(this);
        this.playground = new LQGamePlayground(this);
        
        this.start();
    }

    start() {

    }
}


