angular.module('starter')

.service("SDKService",function (){
	var win;        // variable for inappbrowser
	var HostedDomain = "https://cdn.loginradius.com/hub/prod/Theme/mobile-v2/index.html";
	var params = {};  // params use for storing values like token,action and uid
	var options;     // get all lroptions values and set in options
		
		
	 //login,register,social, forgotpassword fun for creating hosted page url .		

this.getSDKContext = function(lroptions){
	options=lroptions;
	return {
		login : function(){                    
        
			var native=lroptions.nativelogin;
			var CallbackFun=lroptions.callback ;
     		var url = HostedDomain + "?apikey=" + lroptions.apikey
			+ "&sitename=" + lroptions.siteName
			+ "&promptPasswordOnSocialLogin="
			+ lroptions.promptPasswordOnSocialLogin
			+ "&V2RecaptchaSiteKey=" + lroptions.V2RecaptchaSiteKey
			+ "&action=login";  
      	    lrlogin(url,CallbackFun);  		
		},
	   
		register : function(){                  
		
	        var CallbackFun=lroptions.callback ;
	        var url = HostedDomain + "?apikey="+ lroptions.apikey
	        + "&sitename=" + lroptions.siteName
	        + "&promptPasswordOnSocialLogin="
		    + lroptions.promptPasswordOnSocialLogin
		    + "&V2RecaptchaSiteKey=" + lroptions.V2RecaptchaSiteKey
		    + "&action=registration"; 	
	     lrlogin(url,CallbackFun);  	
        },
        
	    social : function(){                   
		
		    var CallbackFun=lroptions.callback ;
	        var url = HostedDomain + "?apikey="+ lroptions.apikey
	        + "&sitename=" + lroptions.siteName
	        + "&promptPasswordOnSocialLogin="
		    + lroptions.promptPasswordOnSocialLogin
		    + "&V2RecaptchaSiteKey=" + lroptions.V2RecaptchaSiteKey
		    + "&action=social";
        lrlogin(url,CallbackFun);  
        },
        
        forgotpassword : function(){
	
	        var CallbackFun=lroptions.callback ;
            var url = HostedDomain + "?apikey="+ lroptions.apikey
           + "&sitename=" + lroptions.siteName
           + "&promptPasswordOnSocialLogin="
	       + lroptions.promptPasswordOnSocialLogin
	       + "&V2RecaptchaSiteKey=" + lroptions.V2RecaptchaSiteKey
	       + "&action=forgotpassword";

  	
     lrlogin(url,CallbackFun);  

    }
  }	
}

	
//lrlogin fun for open hosted page url in inappbrowser 
var lrlogin= function (url,callback) {
	  
	   if (!url)return false;
		win =window.open(url, '_blank', options.inappbrowserlocation);
		win.addEventListener('loadstop',function(event){
		
		
			var getParamValue= function(param){
			var regex = new RegExp("[\\?&]" + param + "=([^&#]*)"),
			results = regex.exec(event.url);
			return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			};
			
			
			var provider = getParamValue("provider");
			if (provider != null) {
				switch (provider) {
				case "facebook":
					sessionStorage.setItem("providername",
							"facebook");

					break;
				default:
					break;
				}
			}

			var providers = sessionStorage.getItem("providername");
			if (providers == "facebook" && options.native) {
				
			
				$LR.login();       //LR.login function use for native login 

			} else {
		
			var redirect=getParamValue("redirect");
			if(redirect!="")
			{
				var action= getParamValue("action");
				if(action!="")
				{ 	
					switch(action) {
					
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
								params.token=token;
								params.action=action;
								
							
								break;
								
							default:
							
								break;
							}
				}			
				win.close();
			};
			
			}
			
		});		
		win.addEventListener('exit',function(event){

			callback(params);
		});		
}


var $LR = {
		
		//permissions for facbook nativelogin
		options : {
			permissions : [ "public_profile" ]
		},

		//Api Domain where all LoginRadius calls go.
		APIDomain : "https://api.loginradius.com",
		//Domain that Hosted User Registration is located on. 
		
		//Access tokens for native login are passed to the backend for parsing
		accessTokenPass : {
			'FACEBOOK' : '/api/v2/access_token/facebook?key={API_KEY}&fb_access_token={ACCESS_TOKEN}',
			'GOOGLE' : '/api/v2/access_token/google?key={API_KEY}&google_access_token={ACCESS_TOKEN}'
		},
		
		login : function() {    
			var ref = cordova.InAppBrowser.open('http://', '_blank', 'location=no');   //open new  inappbrowser window for native login background 
			var nativefbprovider = sessionStorage.getItem("providername");

			if (options.native && nativefbprovider == "facebook") {
				try {
					facebookConnectPlugin.login($LR.options.permissions,
							this.util.nativeCallbackFacebookSuccess,
							this.util.nativeCallbackFacebookFail);
				} catch (e) {
					alert(e);
                    sessionStorage.removeItem("providername");
				}
			} else if (this.options.native && provider.toUpperCase() == "GOOGLE") {
				try {
					GoogleLogin.login(this.util.nativeCallbackGoogleSuccess,
							this.util.nativeCallbackGoogleFailure, []);
				} catch (e) {
					alert(e);
				}
			} else {

				var url = $LR.util.getProviderUrl(provider);
				$LR.util.openWindow(url);

			}

		},

		logout : function() {
			if (this.options.native) {
				try {
					facebookConnectPlugin.logout(
							this.util.nativeLogoutFacebookSuccess,
							this.util.nativeLogoutFacebookFailure);
				} catch (e) {
					alert(e)
				}
			} else {
				sessionStorage.removeItem('LRTokenKey');
			}
		},
		
		
		
		util : {

addJs : function(url, context) {
	context = context || document;
	var head = context.getElementsByTagName('head')[0];
	var js = context.createElement('script');
	js.src = url;
	js.type = "text/javascript";
	head.appendChild(js);

	return js;
},

jsonpCall : function(url, handle) {
	var func = 'Loginradius'
			+ Math.floor((Math.random() * 1000000000000000000) + 1);
	window[func] = function(data) {
		handle(data);

		window[func] = undefined;
		try {
			delete window[func];
		} catch (e) {
		}

		document.getElementsByTagName('head')[0].removeChild(js);
	};

	var endurl = url.indexOf('?') != -1 ? url + '&callback=' + func
			: url + '?callback=' + func;
	var js = this.addJs(endurl);
},

searchProviders : function(provider) {
	for (var i = 0; i < $LR.providers.length; i++) {
		if ($LR.providers[i]['Name'].toLowerCase() == provider
				.toLowerCase())
			return $LR.providers[i];
	}
	return null;
},

getProviderUrl : function(provider) {
	provider = this.searchProviders(provider);
	if (provider) {
		var url = provider['Endpoint'];
		url = url + "&ismobile=1&is_access_token=1";

		return url;
	}

},

nativeCallbackGoogleSuccess : function(userData) {                  // this fun use for  token exchange with loginradius

	var url = $LR.APIDomain + $LR.accessTokenPass['GOOGLE'];
	url = url.replace("{API_KEY}", options.apikey).replace(
			"{ACCESS_TOKEN}", userData);
	$LR.util.jsonpCall(url, $LR.util.LoginRadiusNativeCallback);

},
nativeCallbackFacebookSuccess : function(userData) {                // this fun use for  token exchange with loginradius

	var url = $LR.APIDomain + $LR.accessTokenPass['FACEBOOK'];
	url = url.replace("{API_KEY}", options.apikey).replace(
			"{ACCESS_TOKEN}", userData['authResponse']['accessToken']);
	$LR.util.jsonpCall(url, $LR.util.LoginRadiusNativeCallback);
},

nativeCallbackFacebookFail : function(res) {
	
},

LoginRadiusNativeCallback : function(callback) {                     //getting token and call "sociallogin" action
	
	sessionStorage.setItem("LRTokenKey", callback['access_token']);
	var actionfb = ("sociallogin");
	var lrfbtoken = sessionStorage.getItem("LRTokenKey");
	sessionStorage.removeItem("providername");
	win.close();
	window.location = options.nativepath;
	
},

nativeLogoutFacebookSuccess : function(response) {
	sessionStorage.removeItem('LRTokenKey');
},

nativeLogoutFacebookFailure : function(response) {
	
}


		}

};



});