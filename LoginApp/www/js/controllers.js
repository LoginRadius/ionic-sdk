angular.module('starter')

.controller("ExampleController",[ '$scope','APIService','SDKService', function ($scope,APIService,SDKService) {


	 var lroptions = {};

	 lroptions.apikey = '<LoginRadius API Key>';
     lroptions.siteName = '<LoginRadius Site Name>';
     lroptions.promptPasswordOnSocialLogin = 'false';
	 lroptions.V2RecaptchaSiteKey = "";
	 lroptions.facebooknative = false;
	 lroptions.googlenative = false;
	 lroptions.nativepath="Profile.html";
     lroptions.googlewebid="";  // if you set google native login then you must be add your webClientId
	


	 $scope.lr = SDKService.getSDKContext(lroptions);
	 $scope.lrapi = APIService.getAPIContext();



	 lroptions.callback = function(params) {

	     //Handle the actions for: sociallogin, login, registration, and forgotpassword
	     switch (params.action) {
	         //Social login returns an accesstoken which can be used to pull user details including ID and UID for server side calls.
	         case "sociallogin":
	             sessionStorage.setItem('LRTokenKey', params.token);
	             window.location = "Profile.html";
	             break;
	             //Login returns an accesstoken which can be used to pull user details including ID and UID for server side calls.
	         case "login":
	             sessionStorage.setItem('LRTokenKey', params.token);
	             window.location = "Profile.html";
	             break;
	             //Registration returns and email message and status which you can use to display messaging to your user.
	         case "registration":

	             var registermessage = "An email has been sent to " + params.email + ". Click on the verification link included in this email.";
	             //$(".messageinfo").html(registermessage);
	             alert(registermessage);
	             break;
	             //Forgot password returns and email message and status which you can use to display messaging to your user.
	         case "forgotpassword":
	             var forgotmessage = "An email has been sent to " + params.email + ". Click on the reset Password link included in this email.";
	             //$(".messageinfo").html(forgotmessage);
	             alert(forgotmessage);
	             break;
			case "emailnotverfied":
	             var emailnotver = "Email Verification message send successfully.Please verify your account.";
	              alert(emailnotver);
	             break;
	         default:

	             break;
	     }
	 };



	 $scope.Logout = function() {
      window.location = "index.html";
       $scope.lr.sdkLogout();
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
