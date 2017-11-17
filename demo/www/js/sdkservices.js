angular.module('starter')
.service("SDKService", function() {
        var win;
        var params = {};
        var apiDomain = "api.loginradius.com";
        var util = {};
        var options;

        //login,register,social, forgotpassword fun for creating hosted page url .

this.getSDKContext = function(lroptions) {
            options = lroptions;
            return {

                ionicLogin: function(url) {
                    if (lroptions.facebookNative && url.indexOf("facebook") !== -1) {

                        $LR.login(url);
                    } else if (lroptions.googleNative && url.indexOf("google") !== -1) {
                        $LR.login(url);
                    } else if(lroptions.vkNative && url.indexOf("vkontakte")!== -1){
                        $LR.login(url);
                    }else {
                        return LRObject.util.openWindow(url);
                    }

                },

                login: function() {

                    var options = {};
                    var sl_options = {};
                    sl_options.onSuccess = function(response) {
                        params.response = response;
                        params.action = "login";
                        lroptions.callback(params);
                        console.log(response);
                    };
                    options.onSuccess = function(response) {
                        params.response = response;
                        params.action = "login";
                        lroptions.callback(params);
                        console.log(response);
                    };
                    options.onError = function(errors) {
                        params.response = errors;
                        params.action = "login";
                        lroptions.callback(params);
                        console.log(errors);

                    };
                    sl_options.onError = function(errors) {
                        params.response = errors;
                        params.action = "login";
                        lroptions.callback(params);
                        console.log(errors);

                    };
                    options.container = "login-container";
                    sl_options.container = "sociallogin-container"
                    sl_options.templateName = "loginradiuscustom_tmpl";

                    LRObject.customInterface(".interfacecontainerdiv", sl_options);

                    LRObject.$hooks.register('socialLoginFormRender', function() {
                        document.getElementById('login-container').style.display = 'none';
                        document.getElementById('line').style.display = 'none';
                        document.getElementById('attid').style.display = 'block';
                    });

                    LRObject.init("login", options);
                    LRObject.init('socialLogin', sl_options);

                },

                register: function() {


                    var registration_options = {}
                    registration_options.onSuccess = function(response) {
                        //On Success
                        console.log(response);
                        params.response = response;
                        params.action = "registration";
                        lroptions.callback(params);
                    };
                    registration_options.onError = function(errors) {
                        //On Errors
                        console.log(errors);
                        params.response = errors;
                        params.action = "registration";
                        lroptions.callback(params);

                    };
                    registration_options.container = "registration-container";

                    LRObject.init("registration", registration_options);
                },

                social: function() {

                    var sl_options_main = {};
                    sl_options_main.onSuccess = function(response) {
                        params.response = response;
                        params.action = "sociallogin";
                        lroptions.callback(params);
                        console.log(response);
                    };


                    sl_options_main.onError = function(errors) {

                        //On Errors
                        params.response = errors;
                        params.action = "sociallogin";
                        lroptions.callback(params);

                    };

                    sl_options_main.container = "sociallogin-main-container"
                    sl_options_main.templateName = "loginradiuscustom_tmpl"
                    LRObject.customInterface(".interfacecontainerdiv", sl_options_main);
                    LRObject.$hooks.register('socialLoginFormRender', function() {

                    });

                    LRObject.init('socialLogin', sl_options_main);

                },

                forgotpassword: function() {

                    var forgotpassword_options = {};
                    forgotpassword_options.container = "forgotpassword-container";
                    forgotpassword_options.onSuccess = function(response) {
                        // On Success
                        params.response = response;
                        params.action = "forgotpassword";
                        lroptions.callback(params);
                        console.log(response);

                    };
                    forgotpassword_options.onError = function(errors) {
                        // On Errors
                        console.log(errors);
                        params.response = errors;
                        params.action = "forgotpassword";
                        lroptions.callback(params);

                    }
                    LRObject.init("forgotPassword", forgotpassword_options);
                },

                profileUpdate: function() {

                    var profileeditor_options = {};
                    profileeditor_options.container = "profileeditor-container";
                    profileeditor_options.onSuccess = function(response) {

                        // On Success
                        params.response = response;
                        params.action = "updateprofile";
                        lroptions.callback(params);
                        console.log(response);

                    };
                    profileeditor_options.onError = function(errors) {

                        // On Error
                        params.response = errors;
                        params.action = "updateprofile";
                        lroptions.callback(params);
                        console.log(errors);
                    };
                    LRObject.init("profileEditor", profileeditor_options);

                },

                changePassword: function() {

                    var changepassword_options = {};
                    changepassword_options.container = "changepassword-container";
                    changepassword_options.onSuccess = function(response) {
                        // On Success
                        params.response = response;
                        params.action = "changepassword";
                        lroptions.callback(params);
                        console.log(response);
                    };
                    changepassword_options.onError = function(errors) {
                        // On Error
                        params.response = errors;
                        params.action = "changepassword";
                        lroptions.callback(params);
                        console.log(errors);
                    };

                    LRObject.init("changePassword", changepassword_options);

                },
                updatePhone: function() {

                    var updatephone_options = {};
                    updatephone_options.container = "updatephone-container";
                    updatephone_options.onSuccess = function(response) {
                        // On Success
                        params.response = response;
                        params.action = "updatephone";
                        lroptions.callback(params);
                        console.log(response);
                    };
                    updatephone_options.onError = function(errors) {
                        // On Error
                        params.response = errors;
                        params.action = "updatephone";
                        lroptions.callback(params);
                        console.log(errors);
                    };

                    LRObject.init("updatePhone", updatephone_options);
                },


                addEmail: function() {

                    var addemail_options = {};
                    addemail_options.container = "addemail-container";
                    addemail_options.onSuccess = function(response) {
                        // On Success
                        params.response = response;
                        params.action = "addemail";
                        lroptions.callback(params);
                        console.log(response);
                    };
                    addemail_options.onError = function(errors) {
                        // On Error
                        params.response = errors;
                        params.action = "addemail";
                        lroptions.callback(params);
                        console.log(errors);
                    };

                    LRObject.init("addEmail", addemail_options);
                },


                removeEmail: function() {
                    var removeemail_options = {};
                    removeemail_options.container = "removeemail-container";
                    removeemail_options.onSuccess = function(response) {
                        // On Success
                        params.response = response;
                        params.action = "removeemail";
                        lroptions.callback(params);
                        console.log(response);
                    };
                    removeemail_options.onError = function(errors) {
                        // On Error
                        params.response = errors;
                        params.action = "removeemail";
                        lroptions.callback(params);
                        console.log(errors);
                    };

                    LRObject.init("removeEmail", removeemail_options);
                },

                changeUsername: function() {
                    var changeusername_options = {};

                    changeusername_options.container = "changeusername-container";
                    changeusername_options.onSuccess = function(response) {
                        // On Success
                        params.response = response;
                        params.action = "changeusername";
                        lroptions.callback(params);
                        console.log(response);
                    };
                    changeusername_options.onError = function(errors) {
                        // On Error
                        params.response = errors;
                        params.action = "changeusername";
                        lroptions.callback(params);
                        console.log(errors);
                    };

                    LRObject.init("changeUsername", changeusername_options);
                },



                accountLink: function() {
                    var la_options = {};
                    la_options.container = "interfacecontainerdiv_link";
                    la_options.templateName = "loginradiuscustom_tmpl_link"
                    la_options.onSuccess = function(response) {
                        // On Success
                        params.response = response;
                        params.action = "accountlinking";
                        lroptions.callback(params);
                        console.log(response);
                    };
                    la_options.onError = function(errors) {
                        // On Errors
                        params.response = errors;
                        params.action = "accountlinking";
                        lroptions.callback(params);
                        console.log(errors);
                    };
                    LRObject.init("linkAccount", la_options);
                    LRObject.init("unLinkAccount", la_options);
                },
                autoLogin: function() {
                    var la_options = {};
                    la_options.container = "autologin-container";
                    la_options.onSuccess = function(response) {
                        // On Success
                        params.response = response;
                        params.action = "autologin";
                        lroptions.callback(params);
                        console.log(response);
                    };
                    la_options.onError = function(errors) {
                        // On Errors
                        params.response = errors;
                        params.action = "autologin";
                        lroptions.callback(params);
                        console.log(errors);
                    };
                    LRObject.init("autoLogin",la_options);
                },noRegistrationPasswordLessLogin: function() {
                   var password_less_options = {};
                   password_less_options.container = "passwordLessLogin-container";
                   password_less_options.onSuccess = function(response) {
                        // On Success
                        params.response = response;
                        params.action = "noregistrationpasswordlesslogin";
                        lroptions.callback(params);
                        console.log(response);
                    };
                    password_less_options.onError = function(errors) {
                        // On Errors
                        params.response = errors;
                        params.action = "noregistrationpasswordlesslogin";
                        lroptions.callback(params);
                        console.log(errors);
                    };
                    LRObject.init("noRegistrationPasswordLessLogin", password_less_options);
                },updateSecurityQuestion: function() {
                   var securityQ_options = {};
                   securityQ_options.container = "securityQ-container";
                   securityQ_options.onSuccess = function(response) {
                        // On Success
                        params.response = response;
                        params.action = "updatesecurityquestion";
                        lroptions.callback(params);
                        console.log(response);
                    };
                    securityQ_options.onError = function(errors) {
                        // On Errors
                        params.response = errors;
                        params.action = "updatesecurityquestion";
                        lroptions.callback(params);
                        console.log(errors);
                    };
                    LRObject.init("updateSecurityQuestion", securityQ_options );
                },resetPasswordBySecurityQuestion: function() {
                   var resetPasswordBySecQ_options = {};
                   resetPasswordBySecQ_options.container = "resetPasswordBySecQ-container";
                   resetPasswordBySecQ_options.onSuccess = function(response) {
                        // On Success
                        params.response = response;
                        params.action = "resetpasswordbysecurityquestion";
                        lroptions.callback(params);
                        console.log(response);
                    };
                    resetPasswordBySecQ_options.onError = function(errors) {
                        // On Errors
                        params.response = errors;
                        params.action = "resetpasswordbysecurityquestion";
                        lroptions.callback(params);
                        console.log(errors);
                    };
                    LRObject.init("resetPasswordBySecurityQuestion", resetPasswordBySecQ_options);
                },



                logout: function(options) {
                    $LR.logout(options);
                }

            }
        }




        var $LR = {

            //permissions for facbook nativelogin
            options: {
                permissions: ["public_profile"]
            },
            GoogleScope: "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email",
            //Access tokens for native login are passed to the backend for parsing
            accessTokenPass: {
                'FACEBOOK': '/api/v2/access_token/facebook?key={API_KEY}&fb_access_token={ACCESS_TOKEN}',
                'GOOGLE': '/api/v2/access_token/googlejwt?key={API_KEY}&id_token={ACCESS_TOKEN}',
                'VKONTAKTE': '/api/v2/access_token/vkontakte?key={API_KEY}&vk_access_token={ACCESS_TOKEN}'
            },



            login: function(url) {

                if (options.facebookNative && url.indexOf("facebook") !== -1) {
                    try {
                        facebookConnectPlugin.login($LR.options.permissions, this.util.nativeCallbackFacebookSuccess,
                            this.util.nativeCallbackFacebookFail);
                    } catch (e) {
                        alert(e);
                    }
                } else if (options.googleNative && url.indexOf("google") !== -1) {
                    var webClientId = "";

                    if (options.googlewebid != null || options.googlewebid != "") {
                        webClientId = options.googlewebid;
                    }
                    window.plugins.googleplus.login({
                            'webClientId': webClientId, // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
                            'scope': $LR.GoogleScope
                        },
                        function(user_data) {
                            // For the purpose of this example I will store user data on local storage
                            $LR.util.nativeCallbackGoogleSuccess(user_data);

                        },
                        function(msg) {
                            alert('error: ' + msg);
                            sessionStorage.removeItem("providername");
                        });
                }else if (options.vkNative && url.indexOf("vkontakte") !== -1) {
                    var vkAppId = "";

                    if (options.vkAppId != null || options.vkAppId != "") {
                        vkAppId = options.vkAppId;
                    }
                   SocialVk.init(vkAppId);

				    try {
						 SocialVk.login(['photos'],this.util.nativeCallbackVkontakteSuccess,this.util.nativeCallbackVkontakteFail);

                    } catch (e) {
                        alert(e);
                    }

                }

            },

            logout: function(options) {

                try {
                    sessionStorage.removeItem('LRTokenKey');
                    if (options.facebookNative) {
                        facebookConnectPlugin.logout(this.util.nativeLogoutFacebookSuccess, this.util.nativeLogoutFacebookFailure);
                    }
                    if (options.googleNative) {

                        window.plugins.googleplus.logout(
                            function(msg) {
                                alert(msg); // do something useful instead of alerting

                            }
                        );
                    }
                } catch (e) {
                    alert(e)
                }
            },



            util: {

                addJs: function(url, context) {
                    context = context || document;
                    var head = context.getElementsByTagName('head')[0];
                    var js = context.createElement('script');
                    js.src = url;
                    js.type = "text/javascript";
                    head.appendChild(js);

                    return js;
                },

                jsonpCall: function(url, handle) {
                    var func = 'Loginradius' +
                        Math.floor((Math.random() * 1000000000000000000) + 1);
                    window[func] = function(data) {
                        handle(data);

                        window[func] = undefined;
                        try {
                            delete window[func];
                        } catch (e) {}

                        document.getElementsByTagName('head')[0].removeChild(js);
                    };

                    var endurl = url.indexOf('?') != -1 ? url + '&callback=' + func :
                        url + '?callback=' + func;
                    var js = this.addJs(endurl);
                },

                searchProviders: function(provider) {
                    for (var i = 0; i < $LR.providers.length; i++) {
                        if ($LR.providers[i]['Name'].toLowerCase() == provider
                            .toLowerCase())
                            return $LR.providers[i];
                    }
                    return null;
                },

                getProviderUrl: function(provider) {
                    provider = this.searchProviders(provider);
                    if (provider) {
                        var url = provider['Endpoint'];
                        url = url + "&ismobile=1&is_access_token=1";

                        return url;
                    }

                },

                nativeCallbackGoogleSuccess: function(userData) { // this fun use for  token exchange with loginradius

                    var url = "https://" + apiDomain + $LR.accessTokenPass['GOOGLE'];
                    url = url.replace("{API_KEY}", LRObject.options.apiKey).replace(
                        "{ACCESS_TOKEN}", userData.idToken);
                    $LR.util.jsonpCall(url, $LR.util.LoginRadiusNativeCallback);

                },
                nativeCallbackFacebookSuccess: function(userData) { // this fun use for  token exchange with loginradius
                        alert(userData);
                    var url = "https://" + apiDomain + $LR.accessTokenPass['FACEBOOK'];
                    url = url.replace("{API_KEY}", LRObject.options.apiKey).replace(
                        "{ACCESS_TOKEN}", userData['authResponse']['accessToken']);
                    $LR.util.jsonpCall(url, $LR.util.LoginRadiusNativeCallback);
                },

                nativeCallbackFacebookFail: function(res) {
                  alert(res);
                },

                nativeCallbackVkontakteFail: function(res) {
                alert(res);
                 },

                 nativeCallbackVkontakteSuccess: function(userData) { // this fun use for  token exchange with loginradius
                 tok = JSON.parse(userData);
                 var url = "https://" + apiDomain + $LR.accessTokenPass['VKONTAKTE'];
                 url = url.replace("{API_KEY}", LRObject.options.apiKey).replace( "{ACCESS_TOKEN}", tok.token);
                 $LR.util.jsonpCall(url, $LR.util.LoginRadiusNativeCallback);
                 },

                LoginRadiusNativeCallback: function(callback) { //getting token and call "sociallogin" action
                sessionStorage.setItem("LRTokenKey", callback['access_token']);
                LRObject.loginRadiusHtml5PassToken(callback['access_token']);
                    // win.close();
                    //  params.response= callback;
                    // params.action = "login";
                    // options.callback(params);

                },

                nativeLogoutFacebookSuccess: function(response) {
                    sessionStorage.removeItem('LRTokenKey');
                },

                nativeLogoutFacebookFailure: function(response) {

                }
            }

        };

        // Social APIs

        this.getAPIContext = function() {
            return {
                getUserprofile: function(handle) {


                    util.jsonpCall("https://" + apiDomain + "/api/v2/userprofile?access_token=" + getToken(), function(data) {
                        handle(data);
                    });
                },

                getPhotos: function(albumId, handle) {
                    util.jsonpCall("https://" + apiDomain + "/api/v2/photo?access_token=" + getToken() + "&albumid=" + albumId, function(data) {
                        handle(data);
                    });
                },

                getCheckins: function(handle) {
                    util.jsonpCall("https://" + apiDomain + "/api/v2/checkin?access_token=" + getToken(), function(data) {
                        handle(data);
                    });
                },
                getAlbums: function(handle) {
                    util.jsonpCall("https://" + apiDomain + "/api/v2/album?access_token=" + getToken(), function(data) {
                        handle(data);
                    });
                },

                getAudios: function(handle) {
                    util.jsonpCall("https://" + apiDomain + "/api/v2/audio?access_token=" + getToken(), function(data) {
                        handle(data);
                    });
                },

                getMentions: function(handle) {
                    util.jsonpCall("https://" + apiDomain + "/api/v2/mention?access_token=" + getToken(), function(data) {
                        handle(data);
                    });
                },

                getFollowings: function(handle) {
                    util.jsonpCall("https://" + apiDomain + "/api/v2/following?access_token=" + getToken(), function(data) {
                        handle(data);
                    });
                },

                getEvents: function(handle) {
                    util.jsonpCall("https://" + apiDomain + "/api/v2/event?access_token=" + getToken(), function(data) {
                        handle(data);
                    });
                },
                getPosts: function(handle) {
                    util.jsonpCall("https://" + apiDomain + "/api/v2/post?access_token=" + getToken(), function(data) {
                        handle(data);
                    });
                },

                getCompanies: function(handle) {
                    util.jsonpCall("https://" + apiDomain + "/api/v2/company?access_token=" + getToken(), function(data) {
                        handle(data);
                    });
                },

                getGroups: function(handle) {
                    util.jsonpCall("https://" + apiDomain + "/api/v2/group?access_token=" + getToken(), function(data) {
                        handle(data);
                    });
                },

                getStatuses: function(handle) {
                    util.jsonpCall("https://" + apiDomain + "/api/v2/status?access_token=" + getToken(), function(data) {
                        handle(data);
                    });
                },

                getContacts: function(cursor, handle) {
                    util.jsonpCall("https://" + apiDomain + "/api/v2/contact?access_token=" + getToken() + "&nextcursor=" + cursor, function(data) {
                        handle(data);
                    });
                },

                getVideos: function(handle) {
                    util.jsonpCall("https://" + apiDomain + "/api/v2/video?access_token=" + getToken(), function(data) {
                        handle(data);
                    });
                },

                getLikes: function(handle) {
                    util.jsonpCall("https://" + apiDomain + "/api/v2/like?access_token=" + getToken(), function(data) {
                        handle(data);
                    });
                },


                getPages: function(pagename, handle) {

                    util.jsonpCall("https://" + apiDomain + "/api/v2/page?access_token=" + getToken() + "&pagename=" + pagename, function(data) {
                        handle(data);
                    });
                },

                postStatus: function(title, url, status, imageurl, caption, description, handle) {
                    util.jsonpCall("https://" + apiDomain + "/api/v2/status/js?access_token=" + getToken() + "&title=" + title + "&url=" + url + "&imageurl=" + imageurl + "&status=" + status + "&caption=" + caption + "&description=" + description, function(data) {
                        handle(data);
                    });
                },
                postMessage: function(to, subject, message, handle) {
                    util.jsonpCall("https://" + apiDomain + "/api/v2/message/js?access_token=" + getToken() + "&to=" + to + "&subject=" + subject + "&message=" + message, function(data) {
                        handle(data);
                    });
                }


            }
        }

        getToken = function() {

            return sessionStorage.getItem('LRTokenKey');
        };


        util.jsonpCall = function(url, handle) {

            var func = 'Loginradius' + Math.floor((Math.random() * 1000000000000000000) + 1);
            window[func] = function(data) {
                handle(data);

                try {
                    delete window[func];
                } catch (e) {
                    window[func] = undefined;
                }
                document.body.removeChild(js);
            };
            var js = document.createElement('script');
            js.src = url.indexOf('?') != -1 ? url + '&callback=' + func : url + '?callback=' + func;
            js.type = "text/javascript";
            document.body.appendChild(js);
        };
 });
