$('.loginButton').click(function(){

 
   FB.login(function(response) {
   
      FB.api('/me', function(response) {
        alert("hello " +response.name);
        console.log(response);
 
      }); 

 
   },{scope: 'publish_actions'}); 
 
}); 
