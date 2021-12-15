let LQ_GAME_OBJECTS = [];

class LQGameObject {
    constructor() {
        LQ_GAME_OBJECTS.push(this);

        this.has_called_start = false; //执行过start函数
        this.timedelta = 0; //当前帧距离上一帧的时间间隔
                            //统一浏览器时间间隔
        this.uuid = this.create_uuid();
    }

    create_uuid() {
        let res = "";
        for(let i=0; i<8; i++) {
            let x = parseInt(Math.floor(Math.random() * 10));
            res += x;
        }
        return res;
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
