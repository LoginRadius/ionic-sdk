angular.module('starter')

.service("APIService",function (){
	 var apiDomain = "api.loginradius.com";
	 var util = {};
	  
	
this.getAPIContext = function(){
	return {
		
	
		getUserprofile : function (handle) {
			   
 			 
   		   util.jsonpCall("https://" + apiDomain + "/api/v2/userprofile?access_token=" + getToken(), function (data) {
   		            handle(data);
   		        });
   		    },
   		    
   		 getPhotos : function (albumId, handle) {
  		        util.jsonpCall("https://" + apiDomain + "/api/v2/photo?access_token=" + getToken() + "&albumid=" + albumId, function (data) {
  		            handle(data);
  		        });
  		    },
  		    
  		  getCheckins : function (handle) {
  		        util.jsonpCall("https://" + apiDomain + "/api/v2/checkin?access_token=" + getToken(), function (data) {
  		            handle(data);
  		        });
  		    },
  		  getAlbums : function (handle) {
  		        util.jsonpCall("https://" + apiDomain + "/api/v2/album?access_token=" + getToken(), function (data) {
  		            handle(data);
  		        });
  		    },
  		    
  		  getAudios : function (handle) {
  		        util.jsonpCall("https://" + apiDomain + "/api/v2/audio?access_token=" + getToken(), function (data) {
  		            handle(data);
  		        });
  		    },
  		    
  		  getMentions : function (handle) {
  		        util.jsonpCall("https://" + apiDomain + "/api/v2/mention?access_token=" + getToken(), function (data) {
  		            handle(data);
  		        });
  		    },
  		    
  		  getFollowings : function (handle) {
  		        util.jsonpCall("https://" + apiDomain + "/api/v2/following?access_token=" + getToken(), function (data) {
  		            handle(data);
  		        });
  		    },
  		    
  		  getEvents : function (handle) {
  		        util.jsonpCall("https://" + apiDomain + "/api/v2/event?access_token=" + getToken(), function (data) {
  		            handle(data);
  		        });
  		    },
  		  getPosts : function (handle) {
  		        util.jsonpCall("https://" + apiDomain + "/api/v2/post?access_token=" + getToken(), function (data) {
  		            handle(data);
  		        });
  		    },
  		    
  		  getCompanies : function (handle) {
  		        util.jsonpCall("https://" + apiDomain + "/api/v2/company?access_token=" + getToken(), function (data) {
  		            handle(data);
  		        });
  		    },
  		    
  		  getGroups : function (handle) {
  		        util.jsonpCall("https://" + apiDomain + "/api/v2/group?access_token=" + getToken(), function (data) {
  		            handle(data);
  		        });
  		    },
  		    
  		  getStatuses : function (handle) {
  		        util.jsonpCall("https://" + apiDomain + "/api/v2/status?access_token=" + getToken(), function (data) {
  		            handle(data);
  		        });
  		    },
  		    
  		  getContacts : function (cursor, handle) {
  		        util.jsonpCall("https://" + apiDomain + "/api/v2/contact?access_token=" + getToken() + "&nextcursor=" + cursor, function (data) {
  		            handle(data);
  		        });
  		    },
  		    
  		  getVideos : function (handle) {
  		        util.jsonpCall("https://" + apiDomain + "/api/v2/video?access_token=" + getToken(), function (data) {
  		            handle(data);
  		        });
  		    },
  		    
  		  getLikes : function (handle) {
  		        util.jsonpCall("https://" + apiDomain + "/api/v2/like?access_token=" + getToken(), function (data) {
  		            handle(data);
  		        });
  		    },
            
            
             getPages : function (pagename, handle) {
            
  		        util.jsonpCall("https://" + apiDomain + "/api/v2/page?access_token=" + getToken() + "&pagename=" + pagename, function (data) {
  		            handle(data);
  		        });
  		    },
  		    
  		  postStatus : function (title, url, status, imageurl, caption, description, handle) {
  		        util.jsonpCall("https://" + apiDomain + "/api/v2/status/js?access_token=" + getToken() + "&title=" + title + "&url=" + url + "&imageurl=" + imageurl + "&status=" + status + "&caption=" + caption + "&description=" + description, function (data) {
  		            handle(data);
  		        });
  		    },
  		  postMessage : function (to, subject, message, handle) {
  		        util.jsonpCall("https://" + apiDomain + "/api/v2/message/js?access_token=" + getToken() + "&to=" + to + "&subject=" + subject + "&message=" + message, function (data) {
  		            handle(data);
  		        });
  		    }


    
  }	
}


getToken = function () {
		
      return sessionStorage.getItem('LRTokenKey');
  };


util.jsonpCall = function (url, handle) {
 
      var func = 'Loginradius' + Math.floor((Math.random() * 1000000000000000000) + 1);
      window[func] = function (data) {
          handle(data);

          try {
              delete window[func];
          }
          catch (e) {
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