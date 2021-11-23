class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "WEB";
        if(this.root.AcOS) this.platform = "ACAPP";
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
            url: "https://app500.acapp.acwing.com.cn/settings/getinfo/",
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
        this.$menu.hide();
    }

    show() {
        this.$menu.show();
    }

}
