angular.module('starter')
.service("SDKService", function() {
        var win; // variable for inappbrowser
        var HostedDomain = "https://cdn.loginradius.com/hub/prod/Theme/mobile-v4/index.html";
        var params = {}; // params use for storing values like token,action and uid
        var options; // get all lroptions values and set in options
        var inapp;
		var getParamValue = function(param,url) {
			var regex = new RegExp("[\\?&]" + param + "=([^&#]*)"),
				results = regex.exec(url);
			return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		};
        if (localStorage.getItem("clearcache") != null) {
            inapp = localStorage.getItem("clearcache");
            localStorage.removeItem("clearcache");
        }else{
          inapp='location=no';
        }

        //login,register,social, forgotpassword fun for creating hosted page url .

        this.getSDKContext = function(lroptions) {
            options = lroptions;
             if(lroptions.inappbrowserlocation!=null && lroptions.inappbrowserlocation=='location=yes'){
             inapp='location=yes'; }
            return {
				listen: function(url){
					SafariViewController.hide();	
					if(url.indexOf('login')!=-1)
					{
						
						var token=getParamValue("lrtoken",url);
						var lrUid=getParamValue("lraccountid",url);
						var response={
							action:"login",
							token: token,
							lrUid: lrUid
						}
						options.callback(response);
					}
					if(url.indexOf('social')!=-1)
					{
						
						var token=getParamValue("lrtoken",url);
						var lrUid=getParamValue("lraccountid",url);
						var response={
							action:"sociallogin",
							token: token,
							lrUid: lrUid
						}
						options.callback(response);
					}
					if(url.indexOf('registration')!=-1)
					{
						
						var email=getParamValue("email",url);
						var status=getParamValue("status",url);
						var response={
							action:"registration",
							email: email,
							status: status
						}
						options.callback(response);
					}
					if(url.indexOf('forgotpassword')!=-1)
					{
						
						var email=getParamValue("email",url);
						var status=getParamValue("status",url);
						var response={
							action:"forgotpassword",
							email: email,
							status: status
						}
						options.callback(response);
					}
					if(url.indexOf('googleNative')!=-1)
					{
						setTimeout(function(){$LR.login('google');},1000);
					}
					if(url.indexOf('facebookNative')!=-1)
					{
						setTimeout(function(){$LR.login('facebook');},1000);
					}
					if(url.indexOf('emailnotverfied')!=-1)
					{
						
						var response={
							action:"emailnotverfied"
						}
						options.callback(response);
					}
				},
                login: function() {
                    var native = lroptions.nativelogin;
                    var CallbackFun = lroptions.callback;
                    var url = HostedDomain + "?apikey=" + lroptions.apikey +
                        "&sitename=" + lroptions.siteName +
                        "&promptPasswordOnSocialLogin=" +
                        lroptions.promptPasswordOnSocialLogin +
                        "&V2RecaptchaSiteKey=" + lroptions.V2RecaptchaSiteKey +
                        "&action=login";
                    lrlogin(url, CallbackFun);
                },

                register: function() {

                    var CallbackFun = lroptions.callback;
                    var url = HostedDomain + "?apikey=" + lroptions.apikey +
                        "&sitename=" + lroptions.siteName +
                        "&promptPasswordOnSocialLogin=" +
                        lroptions.promptPasswordOnSocialLogin +
                        "&V2RecaptchaSiteKey=" + lroptions.V2RecaptchaSiteKey +
                        "&action=registration";
                    lrlogin(url, CallbackFun);
                },

                social: function() {

                    var CallbackFun = lroptions.callback;
                    var url = HostedDomain + "?apikey=" + lroptions.apikey +
                        "&sitename=" + lroptions.siteName +
                        "&promptPasswordOnSocialLogin=" +
                        lroptions.promptPasswordOnSocialLogin +
                        "&V2RecaptchaSiteKey=" + lroptions.V2RecaptchaSiteKey +
                        "&action=social";
                    lrlogin(url, CallbackFun);
                },

                forgotpassword: function() {

                    var CallbackFun = lroptions.callback;
                    var url = HostedDomain + "?apikey=" + lroptions.apikey +
                        "&sitename=" + lroptions.siteName +
                        "&promptPasswordOnSocialLogin=" +
                        lroptions.promptPasswordOnSocialLogin +
                        "&V2RecaptchaSiteKey=" + lroptions.V2RecaptchaSiteKey +
                        "&action=forgotpassword";


                    lrlogin(url, CallbackFun);

                },
                sdkLogout: function() {
					 $LR.logout();
                     var inapp = 'location=no,clearcache=yes,toolbar=no,clearsessioncache=yes';
                     localStorage.setItem("clearcache", inapp);
                }
            }
        }
		
        //lrlogin fun for open hosted page url in inappbrowser
        var lrlogin = function(url, callback) {

            if (!url) return false;
			
			
			SafariViewController.isAvailable(function (available) {
				if (available) {
					url+="&customRedirect=true";
					
					if(options.googlenative)
						url+="&googleNative=true";
					if(options.facebooknative)
						url+="&facebookNative=true";
				  SafariViewController.show({
						url: url,
						hidden: false, // default false. You can use this to load cookies etc in the background (see issue #1 for details).
						animated: false, // default true, note that 'hide' will reuse this preference (the 'Done' button will always animate though)
						transition: 'curl', // (this only works in iOS 9.1/9.2 and lower) unless animated is false you can choose from: curl, flip, fade, slide (default)
						enterReaderModeIfAvailable: false, // default false
						tintColor: "#00ffff", // default is ios blue
						barColor: "#0000ff", // on iOS 10+ you can change the background color as well
						controlTintColor: "#ffffff" // on iOS 10+ you can override the default tintColor
					  },
					  // this success handler will be invoked for the lifecycle events 'opened', 'loaded' and 'closed'
					  function(result) {
						if (result.event === 'opened') {
						  console.log('opened');
						} else if (result.event === 'loaded') {
						  console.log('loaded');
						} else if (result.event === 'closed') {
						  console.log('closed');
						}
					  },
					  function(msg) {
						console.log("KO: " + msg);
					  })
				} else {
				// InAppBrowser Fallback code if the SafariViewController is not installed 
				  
								win = window.open(url, '_blank', inapp,true);
								win.addEventListener('loadstart', function(event) {
									   var getParamValue = function(param) {
												   var regex = new RegExp("[\\?&]" + param + "=([^&#]*)"),
													   results = regex.exec(event.url);
												   return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
											   };
									  var provider = getParamValue("provider");
								  if(options.googlenative && provider=="google"){
												win.close();
												setTimeout(function(){$LR.login(provider);},1000);
								 }else if(options.facebooknative && provider=="facebook"){
										  win.close();
										  setTimeout(function(){$LR.login(provider);},1000);//LR.login function use for native login
								}else if(options.googlenative && event.url.indexOf("accounts.google.com")!=-1){
								   win.close();
								   setTimeout(function(){$LR.login("google");},1000);
								  }
								});
								
								win.addEventListener('loadstop', function(event) {
									 var getParamValue = function(param) {
										var regex = new RegExp("[\\?&]" + param + "=([^&#]*)"),
											results = regex.exec(event.url);
										return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
									};

										 var redirect = getParamValue("redirect");
										if (redirect != "") {
											var action = getParamValue("action");
											if (action != "") {
												switch (action) {

													case "registration":
														email = getParamValue("email");
														status = getParamValue("status");
														params.email = email;
														params.status = status;
														params.action = action;

														break;

													case "login":
														token = getParamValue("lrtoken");
														lrUid = getParamValue("lraccountid");
														params.action = action;
														params.token = token;
														params.lrUid = lrUid;

														break;

													case 'forgotpassword':
														status = getParamValue("status");
														email = getParamValue("email");
														params.status = status;
														params.email = email;
														params.action = action;

														break;

													case 'sociallogin':
														var token = getParamValue("lrtoken");
														params.token = token;
														params.action = action;


														break;

													case 'emailnotverfied':
														params.action = action;

														break;

													default:
													break;
												}
											}
											win.close();
										};

								});
								
								win.addEventListener('exit', function(event) {

									callback(params);
								});
									

				//end InAppBrowser Fallback
				
				
				}
			  })
			}


        var $LR = {

            //permissions for facbook nativelogin
            options: {
                permissions: ["public_profile"]
            },
            GoogleScope: "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email",
            //Api Domain where all LoginRadius calls go.
            APIDomain: "https://api.loginradius.com",
            //Domain that Hosted User Registration is located on.

            //Access tokens for native login are passed to the backend for parsing
            accessTokenPass: {
                'FACEBOOK': '/api/v2/access_token/facebook?key={API_KEY}&fb_access_token={ACCESS_TOKEN}',
                'GOOGLE': '/api/v2/access_token/googlejwt?key={API_KEY}&id_token={ACCESS_TOKEN}'
            },

            login: function(provider) {
                 if (provider == "facebook") {
                    try {
                        facebookConnectPlugin.login($LR.options.permissions,
                            this.util.nativeCallbackFacebookSuccess,
                            this.util.nativeCallbackFacebookFail);
                    } catch (e) {
                        alert(e);

                    }
                } else if (provider == "google") {
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
                            alert('Goggle error: ' + msg);



                        });
                } else {

                    var url = $LR.util.getProviderUrl(provider);
                    $LR.util.openWindow(url);

                }

            },

            logout: function() {
                try {
                    sessionStorage.removeItem('LRTokenKey');
                    if(typeof(facebookConnectPlugin) !== 'undefined'){
						if (facebookConnectPlugin.getLoginStatus) {
							facebookConnectPlugin.logout(this.util.nativeLogoutFacebookSuccess, this.util.nativeLogoutFacebookFailure);
						}
					}
					if(typeof(window.plugins.googleplus) !== 'undefined'){
						window.plugins.googleplus.logout(
							function(msg) {
								alert(msg); // do something useful instead of alerting

							});
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

                nativeCallbackGoogleSuccess: function(user_data) { // this fun use for  token exchange with loginradius

                    var url = $LR.APIDomain + $LR.accessTokenPass['GOOGLE'];
                    url = url.replace("{API_KEY}", options.apikey).replace("{ACCESS_TOKEN}", user_data.idToken);
                    $LR.util.jsonpCall(url, $LR.util.LoginRadiusNativeCallback);

                },
                nativeCallbackFacebookSuccess: function(userData) { // this fun use for  token exchange with loginradius

                    var url = $LR.APIDomain + $LR.accessTokenPass['FACEBOOK'];
                    url = url.replace("{API_KEY}", options.apikey).replace(
                        "{ACCESS_TOKEN}", userData['authResponse']['accessToken']);
                    $LR.util.jsonpCall(url, $LR.util.LoginRadiusNativeCallback);
                },

                nativeCallbackFacebookFail: function(res) {

                },

                LoginRadiusNativeCallback: function(callback) { //getting token and call "sociallogin" action

                    sessionStorage.setItem("LRTokenKey", callback['access_token']);
                    var actionfb = ("sociallogin");
                    var lrfbtoken = sessionStorage.getItem("LRTokenKey");
                    sessionStorage.removeItem("providername");

                    window.location = options.nativepath;

                },

                nativeLogoutFacebookSuccess: function(response) {
                    sessionStorage.removeItem('LRTokenKey');
                },

                nativeLogoutFacebookFailure: function(response) {

                }
     }
  };
 });
