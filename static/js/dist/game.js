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
        this.playground = playground;
        this.$canvas = $(`<canvas></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.playground.$playground.append(this.$canvas);
    }

    start() {
    }

    update() {
        this.render();
    }

    render() {
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

}
class Particle extends LQGameObject {
    constructor(playground, x, y, radius, vx, vy, color, speed, move_length) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.speed = speed;
        this.move_length = move_length;
        this.friction = 0.9;
        this.eps = 1;
    }

    start() {
    }
    
    update() {
        if(this.move_length < this.eps ||this.speed < this.eps ) {
            this.destroy();
            return false;
        }

        let moved = Math.min(this.move_length, this.speed*this.timedelta/1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.speed *= this.friction;
        this.move_length -= moved;
        this.render();
    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();

    }


}

class Player extends LQGameObject {
    constructor(playground, x, y, radius, color, speed, is_me ) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.damage_x = 0;
        this.damage_y = 0;
        this.damage_speed = 0;
        this.move_length = 0;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.is_me = is_me;
        this.eps = 0.1;
        this.friction = 0.9;
        this.spent_time = 0;

        this.cur_skill = null;

        if(this.is_me) {
            this.img = new Image();
            this.img.src = this.playground.root.settings.photo;
        }
    }

    start() {
        if(this.is_me) {
            this.add_listening_events();
        } else {
            let tx = Math.random() * this.playground.width;
            let ty = Math.random() * this.playground.height;
            this.move_to(tx, ty);
        }
    }

    add_listening_events() {
        let outer = this;
        this.playground.game_map.$canvas.on("contextmenu", function() {
            return false;
        });
        this.playground.game_map.$canvas.mousedown(function(e) {
            const rect = outer.ctx.canvas.getBoundingClientRect();
            if(e.which === 3) {
                outer.move_to(e.clientX - rect.left, e.clientY - rect.top);
            } else if (e.which === 1) {
                if(outer.cur_skill === "fireball") {
                    outer.shoot_fireball(e.clientX - rect.left, e.clientY - rect.top);
                }
                outer.cur_skill = null;
            }
        });

        $(window).keydown(function(e) {
            if(e.which === 81) {
                outer.cur_skill = "fireball";
                return false;
            } 
        });
    }


    get_dist(x1, y1, x2, y2) {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx*dx + dy*dy);
    }

    move_to(tx, ty) {
        console.log("move to", tx, ty);
        this.move_length = this.get_dist(this.x, this.y, tx, ty);
        let angle = Math.atan2(ty - this.y, tx - this.x);
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }

    shoot_fireball(tx, ty) {
        let x = this.x, y = this.y;
        let radius = this.playground.height * 0.01;
        let angle = Math.atan2(ty - this.y, tx - this.x);
        let vx = Math.cos(angle), vy = Math.sin(angle);
        let color = "orange";
        let speed = this.playground.height * 0.3;
        let move_length = this.playground.height * 1;
        new FireBall(this.playground, this, x, y, radius, vx, vy, color, speed, move_length, this.playground.height * 0.01);
    }

    is_attacked(angle, damage) {
        for(let i=0; i<20 + Math.random()*10; i++) {
            let x = this.x, y= this.y;
            let radius = this.radius* Math.random() * 0.1;
            let angle = Math.PI*2*Math.random();
            let vx = Math.cos(angle), vy = Math.sin(angle);
            let color = this.color;
            let speed = this.speed * 10;
            let move_length = this.radius * Math.random() * 5;
            new Particle(this.playground, x, y, radius, vx, vy, color, speed, move_length);
        }

        this.radius -= damage;
        if(this.radius < 10) {
            this.destroy();
            return false;
        }
        this.damage_x = Math.cos(angle);
        this.damage_y = Math.sin(angle);
        this.damage_speed = damage * 70;
        this.speed *= 0.8;
    }

    update() {
        this.spent_time += this.timedelta/1000;
        if(!this.is_me && this.spent_time>4 && Math.random() < 1/300.0) {
            let player = this.playground.players[Math.floor(Math.random()*this.playground.players.length)];
            let tx = player.x+player.speed*this.vx * this.timedelta/1000 * 0.3;
            let ty = player.y+player.speed*this.vy * this.timedelta/1000 * 0.3;
            this.shoot_fireball(tx, ty);
        }

        if(this.damage_speed > 10) {
            this.vx = this.vy = 0;
            this.move_length = 0;
            this.x += this.damage_x*this.damage_speed * this.timedelta /1000;
            this.y += this.damage_y*this.damage_speed*this.timedelta / 1000;
            this.damage_speed *= this.friction;
        } else {
            if (this.move_length < this.eps) {
                this.move_length = 0;
                this.vx = this.vy = 0;
                if(!this.is_me) {
                    let tx = Math.random()*this.playground.width;
                    let ty = Math.random()*this.playground.height;
                    this.move_to(tx, ty);
                }
            } else {
                let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
                this.x += this.vx*moved;
                this.y += this.vy*moved;
                this.move_length -= moved;
            }
        }
        this.render();
    }

    render() {
        if(this.is_me) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            this.ctx.stroke();
            this.ctx.clip();
            this.ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
            this.ctx.restore();
        } else {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }
    }

    on_destroy() {
        for(let i=0; i<this.playground.players.length; i++) {
            if(this.playground.players[i] ===this) {
                this.playground.players.splice(i, 1);}
        }
    }

}
class FireBall extends LQGameObject {
    constructor(playground, player, x, y, radius, vx, vy, color, speed, move_length, damage) {
        super();
        this.playground = playground;
        this.player = player;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.move_length = move_length;
        this.damage = damage;
        this.eps = 0.1;
    }

    start() {
    }

    update() {
        if(this.move_length < this.eps) {
            this.destroy();
            return false;
        }
        let moved = Math.min(this.move_length, this.speed*this.timedelta/1000);
        this.x += this.vx*moved;
        this.y += this.vy*moved;
        this.move_length -= moved;

        for(let i=0; i<this.playground.players.length; i++) {
            let player = this.playground.players[i];
            if(this.player !== player && this.is_collision(player)) {
                this.attack(player);
            }
        }
        this.render();
    }

    get_dist(x1, y1, x2, y2) {
        let dx = x1-x2;
        let dy = y1-y2;
        return Math.sqrt(dx*dx + dy*dy);
    }

    is_collision(player) {
        let distance = this.get_dist(this.x, this.y, player.x, player.y);
        if(distance < this.radius + player.radius)
            return true;
        return false;
    }

    attack(player) {
        let angle = Math.atan2(player.y - this.y, player.x - this.x);
        player.is_attacked(angle, this.damage);
        this.destroy();

    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }


}
class LQGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div class="lq-game-playground"></div>`);
        this.hide();
     
        this.start();
    }

    get_random_color() {
        let colors = ["blue", "pink", "orange", "green", "yellow"];
        return colors[Math.floor(Math.random() * 5)];
    }

    start() {

    }


    show() { //打开playground界面
        this.$playground.show();
        this.root.$lq_game.append(this.$playground);
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);
        this.players = [];
        this.players.push(new Player(this, this.width/2, this.height/2, this.height * 0.05, "white", this.height*0.15, true));
        
        for(let i=0; i<5; i++) {
            this.players.push(new Player(this, this.width /2, this.height/2, this.height * 0.05, this.get_random_color(), this.height*0.15, false));
        }

    }

    hide() {  //关闭playground界面
        this.$playground.hide();
    }

}
class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "WEB";
        if(this.root.AcOS) this.platform = "ACAPP";
        this.username = "";
        this.photo = "";

        this.$settings = $(`
<div class="lq-game-settings" >

</div>

`);

        this.root.$lq_game.append(this.$settings);

        this.start();

    }

    start() {
        this.getinfo();
    }

    
    register() {
    }

    login() {

    }


    getinfo() {
        let outer = this;

        $.ajax({
            url: "https://lingqin.com.cn/settings/getinfo/",
            type: "GET",
            data: {
                platform: outer.platform,
            },
            success: function(resp) {
                console.log(resp);
                if(resp.result === "success" ) {
                    outer.username = resp.username;
                    outer.photo = resp.photo;

                    outer.hide();
                    outer.root.menu.show();
                } else {
                    outer.login();
                }
            }
        });
    }

    hide() {
        this.$settings.hide();
    }

    show() {
        this.$settings.show();
    }

}
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

