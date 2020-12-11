const AppId = process.env.REACT_APP_IG_CLIENT_ID || "";
const FbSdkVer = process.env.REACT_APP_FB_SDK_VER || "v9.0";

export function initFacebookSdk() {
    return new Promise((resolve) => {
        // wait for facebook sdk to initialize before starting the react app
        window.fbAsyncInit = function() {
            window.FB.init({
                appId: AppId,
                cookie: true,
                xfbml: true,
                version: FbSdkVer,
            });

            // auto authenticate with the api if already logged in with facebook
            window.FB.getLoginStatus(({ authResponse }) => {
                if (authResponse) {
                    console.log(authResponse)
                } else {
                    resolve();
                }
            });
        };

        // load facebook sdk script
        (function(d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    });
}