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
