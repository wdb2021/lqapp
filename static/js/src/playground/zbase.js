class LQGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div class="lq-game-playground"></div>`);
        this.hide();
        this.root.$lq_game.append(this.$playground);
     
        this.start();
    }

    get_random_color() {
        let colors = ["blue", "pink", "orange", "green", "yellow"];
        return colors[Math.floor(Math.random() * 5)];
    }

    start() {
        let outer = this;
        $(window).resize(function() {
            outer.resize();
        });
    }

    resize() {
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        let unit = Math.min(this.width / 16, this.height / 9);
        this.width = unit * 16;
        this.height = unit * 9;
        this.scale = this.height;
        
        if(this.game_map) this.game_map.resize();
    }


    show(mode) { //打开playground界面
        let outer = this;
        this.$playground.show();

        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);

        this.mode = mode;
        this.state = "waiting"; //wwaiting -> fighting -> over
        this.notice_board = new NoticeBoard(this);
        this.player_count = 0;

        this.resize();

        this.players = [];
        this.players.push(new Player(this, this.width / 2 / this.scale, 0.5, 0.05, "white", 0.15, "me", this.root.settings.username, this.root.settings.photo));
        
        console.log(mode);

        if(mode === "single mode") {
            this.chat_field = new ChatField(this);
            for(let i=0; i<5; i++) {
                this.players.push(new Player(this, this.width / 2 / this.scale, 0.5, 0.05, this.get_random_color(), 0.15, "robot"));
            }
        } else if (mode === "multi mode") {  //mps: MultiPlayerSocket
            this.chat_field = new ChatField(this);
            this.mps = new MultiPlayerSocket(this);
            this.mps.uuid = this.players[0].uuid;

            this.mps.ws.onopen = function() {
                outer.mps.send_create_player(outer.root.settings.username, outer.root.settings.photo);
            };
        }

    }

    hide() {  //关闭playground界面
        this.$playground.hide();
    }

}
