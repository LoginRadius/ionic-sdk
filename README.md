# LoginRadius Ionic SDK
![Home Image](http://docs.lrcontent.com/resources/github/banner-1544x500.png)

## Introduction ##
LoginRadius is an Identity Management Platform that simplifies user registration while securing data. LoginRadius Platform simplifies and secures your user registration process, increases conversion with Social Login that combines 30 major social platforms, and offers a full solution with Traditional Customer Registration. You can gather a wealth of user profile data from Social Login or Traditional Customer Registration.

LoginRadius centralizes it all in one place, making it easy to manage and access. Easily integrate LoginRadius with all of your third-party applications, like MailChimp, Google Analytics, Livefyre and many more, making it easy to utilize the data you are capturing.

LoginRadius helps businesses boost user engagement on their web/mobile platform, manage online identities, utilize social media for marketing, capture accurate consumer data, and get unique social insight into their customer base.

Please visit [here](http://www.loginradius.com/) for more information.

######Before using demo project, you must install Ionic environment in your system Please visit [here](http://ionicframework.com/docs/guide/installation.html) for complete Ionic installation.

#### There are two projects in the library:
a. LoginApp-Demo - This is the demo application.    
b. IonicSDK -This is the LoginRadius SDK

##### LoginApp-Demo

1.Put the value according to your requirement in index.html
```JavaScript
  commonOptions.apiKey = "<your loginradius api key>";
  commonOptions.appName = "<LoginRadius site name>";
```

2.Finally, setup elements to trigger the functions that will direct your users to the relevant hosted interface.
```html
 <div class="col text-center">
     <a class="button button-outline button-positive" href="#/login">Login</a>

     <a  class="button button-outline button-positive" href="#/register">Register</a>

     <a  class="button button-outline button-positive" href="#/sociallogin">Social Login</a>

     <a  class="button button-outline button-positive" href="#/forgotpassword">Forgot Password</a>

 </div>
```