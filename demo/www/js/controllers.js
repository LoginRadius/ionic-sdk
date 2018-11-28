angular.module('starter')

.controller("ExampleController",[ '$scope','SDKService', function ($scope,SDKService) {


      
	 var lroptions = {};
      
	 $scope.lr = SDKService.getSDKContext(lroptions);
	 $scope.lrapi = SDKService.getAPIContext();
     lroptions.facebookNative=false;
     lroptions.googleNative = false;
     lroptions.vkNative=false;
     lroptions.googlewebid=""; // if you set google native login 
     lroptions.vkAppId="";
     lroptions.callback = function(params) {

	     //Handle the actions for: sociallogin, login, registration, and forgotpassword
	     switch (params.action) {
	         //Social login returns an accesstoken which can be used to pull user details for APIs calls.
                    case "sociallogin":
                           if (params.response.access_token != null) {
                             sessionStorage.setItem('LRTokenKey', params.response.access_token);
                             window.location = "#/afterloginredirection";
                               
                            } else {
                                  alert(JSON.stringify(params.response));
                            }
                       
                          break;
                        //Login returns an accesstoken which can be used to pull user details for APIs calls.
                    case "login":
                          if (params.response.access_token != null) {
                                sessionStorage.setItem('LRTokenKey', params.response.access_token);
                                window.location = "#/afterloginredirection";
                               
                            } else {
                             alert(JSON.stringify(params.response));
                            }
                       
                        break;
                        //Registration returns and email message and status which you can use to display messaging to your user.
                    case "registration":
                     
                      if(params.response.IsPosted){
                        alert("Please Verify Your Email Address")
                      }else if(params.response.access_token != null){
                         sessionStorage.setItem('LRTokenKey', params.response.access_token);
                         window.location = "#/afterloginredirection";
                      }else{
                         alert(JSON.stringify(params.response));
                       }
                        break;
                        //Forgot password returns and email message and status which you can use to display messaging to your user.
                    case "forgotpassword":
                       alert(JSON.stringify(params.response));
                        break;
                        //Account linking returns response which you can use to display messaging to your user.
                    case "accountlinking":
                     alert(JSON.stringify(params.response));
                     if(params.response.IsPosted){
                     window.location.reload(true);
                     }if(params.response.IsDeleted){
                     window.location.reload(true);
                     }
                        break;
                        //Update Profile returns response which you can use to display messaging to your user.
                    case "updateprofile":
                     alert(JSON.stringify(params.response));
                        break;
                        //Change Username returns response which you can use to display messaging to your user.
                    case "changeusername":
                       alert(JSON.stringify(params.response));
                        break;
                        //Add Email returns response which you can use to display messaging to your user.
                    case "addemail":
                      alert(JSON.stringify(params.response));
                        break;
                        //Remove Email returns response which you can use to display messaging to your user.
                    case "removeemail":
                      alert(JSON.stringify(params.response));
                        break;
                        //Update Phone returns response which you can use to display messaging to your user.
                    case "updatephone":
                       alert(JSON.stringify(params.response));
                        break;
                        //Change password returns response which you can use to display messaging to your user.
                    case "changepassword":
                     alert(JSON.stringify(params.response));
                     break;
				    case "smartlogin":
                     alert(JSON.stringify(params.response));
					 // Smart Login returns response which you can use to display messaging to your user.
                     break;
                    case "onetouchlogin":
                     alert(JSON.stringify(params.response));
					  //One Touch Login returns response which you can use to display messaging to your user.
                    break;	
				    case "updateSecurityQuestion":
                     alert(JSON.stringify(params.response));
					  //Update Security Question returns response which you can use to display messaging to your user.
                     break;
				    case "resetPasswordBySecurityQuestion":
                     alert(JSON.stringify(params.response));
					 //Reset Password By Security Question returns response which you can use to display messaging to your user.
                     break;

                    default:
                    break;
	     }
	 };

     
      $scope.onBackKeyDown = function() {
         history.go(-1);
      // navigator.app.backHistory();
      }
	 


   $scope.goBack = function() {
      $ionicHistory.goBack();
   };


	 $scope.Logout = function() {
        var options={};
        options.facebookNative=false;
        options.googleNative = false;
        $scope.lr.logout(options);
        window.location = "index.html";
	 }

	 $scope.loadUserprofile = function() {
		 $scope.lrapi.getUserprofile(function(userprofile) {

	         document.getElementById('userimage').src = userprofile.ImageUrl;
	         document.getElementById('ID').innerHTML = userprofile.ID;
	         document.getElementById('Provider').innerHTML = userprofile.Provider;
	         document.getElementById('username').innerHTML = (userprofile.FirstName || '') + ' ' + (userprofile.MiddleName || '') + ' ' + (userprofile.LastName || '');
	         document.getElementById('emailid').innerHTML = userprofile.Email && userprofile.Email.length > 0 ? userprofile.Email[0].Value : '';
	         document.getElementById('birthdate').innerHTML = userprofile.BirthDate;
	         document.getElementById('gender').innerHTML = userprofile.Gender;
	         document.getElementById('profileurl').innerHTML = userprofile.ProfileUrl;
	     });
	 }

}]);
