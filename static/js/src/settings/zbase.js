class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "WEB";
        if(this.root.AcOS) this.platform = "ACAPP";
        this.username = "";
        this.photo = "";

        this.$settings = $(`
<div class="lq-game-settings" >
    <div class="lq-game-settings-login">
        <div class="lq-game-settings-title">
            登录
        </div>
        <div class="lq-game-settings-username">
            <div class="lq-game-settings-item">
                <input type="text" placeholder="用户名">
            </div>
        </div>
        <div class="lq-game-settings-password">
            <div class="lq-game-settings-item">
                <input type="password" placeholder="密码">
            </div>
        </div>
        <div class="lq-game-settings-submit">
            <div class="lq-game-settings-item">
                <button>登录</button>
            </div>
        </div>
        <div class="lq-game-settings-error-message">


        </div>
        <div class="lq-game-settings-option">
            注册
        </div>
        <br>
        <div class="lq-game-settings-acwing">
            <img width="30" src="https://lingqin.com.cn/static/image/settings/acwing_logo.png">
            <br>
            <div>
                一键登录
            </div>
        </div>

    </div>
    <div class="lq-game-settings-register">
        <div class="lq-game-settings-title">
            注册
        </div>
        <div class="lq-game-settings-username">
            <div class="lq-game-settings-item">
                <input type="text" placeholder="用户名">
            </div>
        </div>
        <div class="lq-game-settings-password lq-game-settings-password-first">
            <div class="lq-game-settings-item">
                <input type="password" placeholder="密码">
            </div>
        </div>
        <div class="lq-game-settings-password lq-game-settings-password-second">
            <div class="lq-game-settings-item">
                <input type="password" placeholder="确认密码">
            </div>
        </div>
        <div class="lq-game-settings-submit">
            <div class="lq-game-settings-item">
                <button>注册</button>
            </div>
        </div>
        <div class="lq-game-settings-error-message">


        </div>
        <div class="lq-game-settings-option">
             登录
        </div>
        <br>
        <div class="lq-game-settings-acwing">
            <img width="30" src="https://lingqin.com.cn/static/image/settings/acwing_logo.png">
            <br>
            <div>
                acwing 一键登录
            </div>
        </div>
    </div>
</div>

`);
        this.$login = this.$settings.find(".lq-game-settings-login");
        this.$login_username = this.$login.find(".lq-game-settings-username input");
        this.$login_password = this.$login.find(".lq-game-settings-password input");
        this.$login_submit = this.$login.find(".lq-game-settings-submit button");
        this.$login_error_message = this.$login.find(".lq-game-settings-error-message");
        this.$login_register = this.$login.find(".lq-game-settings-option");
        

        this.$login.hide();

        this.$register = this.$settings.find(".lq-game-settings-register");
        this.$register_username = this.$register.find(".lq-game-settings-username input");
        this.$register_password = this.$register.find(".lq-game-settings-password-first input");
        this.$register_password_confirm = this.$register.find(".lq-game-settings-password-second input");
        this.$register_submit = this.$register.find(".lq-game-settings-submit button");
        this.$register_error_message = this.$register.find(".lq-game-settings-error-message");
        this.$register_login = this.$register.find(".lq-game-settings-option");

        this.$register.hide();

        this.$acwing_login = this.$settings.find('.lq-game-settings-acwing img')

        this.root.$lq_game.append(this.$settings);

        this.start();

    }

    start() {
        this.getinfo();
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        this.add_listening_events_login();
        this.add_listening_events_register();

        this.$acwing_login.click(function() {
            outer.acwing_login();
        });
    }

    add_listening_events_login() {
        let outer = this;

        this.$login_register.click(function() {
            console.log("click_login");
            outer.register();
        });
        this.$login_submit.click(function() {
            outer.login_on_remote();
        });
    }

    acwing_login() {
        $.ajax({
            url: "https://lingqin.com.cn/settings/acwing/web/apply_code/",
            type: "GET",
            success: function(resp) {
                console.log(resp);
                if(resp.result === "success") {
                    window.location.replace(resp.apply_code_url);
                }
            }
        });
    }

    add_listening_events_register() {
        let outer = this;
        this.$register_login.click(function() {
            outer.login();
        });
        this.$register_submit.click(function() {
            outer.register_on_remote();
        });
    }

    login_on_remote() {   //在远程服务器登录
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_message.empty();

        $.ajax({
            url: "https://lingqin.com.cn/settings/login/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function(resp) {
                console.log(resp);
                if(resp.result === "success") {
                    location.reload();
                } else {
                    outer.$login_error_message.html(resp.result);
                }
            }
        });
    }

    register_on_remote() {
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();
        this.$register_error_message.empty();

        $.ajax({
            url: "https://lingqin.com.cn/settings/register/",
            type: "GET",
            data: {
                username: username,
                password: password,
                password_confirm: password_confirm,

            },
            success: function(resp) {
                console.log(resp);
                if(resp.result === "success") {
                    location.reload();
                } else {
                    outer.$register_error_message.html(resp.result);
                }
            }
        });
    }

    logout_on_remote() {
        if(this.platform === "ACAPP") return false;
        $.ajax({
            url: "https://lingqin.com.cn/settings/logout",
            type: "GET",
            success: function(resp) {
                console.log(resp);
                if (resp.result === "success" ) {
                    location.reload();
                }
            }
        });
    }

    register() {
        this.$login.hide();
        this.$register.show();
    }

    login() {
        this.$register.hide();
        this.$login.show();

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
