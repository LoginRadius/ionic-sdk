# LoginRadius Ionic SDK
![Home Image](https://d2lvlj7xfpldmj.cloudfront.net/support/github/banner-1544x500.png)

## Introduction ##
LoginRadius is an Identity Management Platform that simplifies user registration while securing data. LoginRadius Platform simplifies and secures your user registration process, increases conversion with Social Login that combines 30 major social platforms, and offers a full solution with Traditional Customer Registration. You can gather a wealth of user profile data from Social Login or Traditional Customer Registration.

LoginRadius centralizes it all in one place, making it easy to manage and access. Easily integrate LoginRadius with all of your third-party applications, like MailChimp, Google Analytics, Livefyre and many more, making it easy to utilize the data you are capturing.

LoginRadius helps businesses boost user engagement on their web/mobile platform, manage online identities, utilize social media for marketing, capture accurate consumer data, and get unique social insight into their customer base.

Please visit [here](http://www.loginradius.com/) for more information.

######Before using demo project,you must install Ionic environment in your system Please visit [here](http://ionicframework.com/docs/guide/installation.html) for complete Ionic installation.

#### There are two projects in the library:
a. LoginApp - This is the demo application.    
b. IonicSDK -This is the LoginRadius SDK

##### LoginApp
1.Put the value according to your requirement in controllers.js 
```JavaScript
lroptions.apikey = '<LoginRadius API Key>';
lroptions.siteName = '<LoginRadius Site Name>';
lroptions.promptPasswordOnSocialLogin = true;
lroptions.V2RecaptchaSiteKey = "<Recaptcha Key>";
```

2.Finally, setup elements to trigger the functions that will direct your users to the relevant hosted interface.
```html
<div class="col text-center">
    <button class="button button-outline button-positive" ng-click="lr.login()">
    Login
    </button>
    <button class="button button-outline button-positive" ng-click="lr.register()">
    Register
    </button>
    <button class="button button-outline button-positive" ng-click="lr.social()">
    SocialLogin
    </button>
    <button class="button button-outline button-positive" ng-click="lr.forgotpassword()">
    ForgotPassword
    </button>
    </div>
```