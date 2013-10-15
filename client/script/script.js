jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});

var server="http://localhost/golombiao/server/index.php/";
var user;

var session = {
  session_id:false
};

user= {
  email:"ccast2@hotmail.com",
  first_name: 'Andres',
  last_name:'Castellanos',
  username: "Andresc26",
  city: "Bogotá, Colombia",
  birthday:"01/20/1990",
};

$(window).load(function() {


	FB.init({
		appId:431026877004103,
		nativeInterface: CDV.FB,
		cookie:true,
		status:true, 
		xfbml:true
	});


});


function login(){


	FB.getLoginStatus(function(response) {
		if (response.status == 'connected') {
			logued_in=true;
			
			FB.login(function(response) {
        FB.api('/me', function(response) {
          if (response) {
           logued_in=true;
           $("#name_user").html(response.name)
           $("#age_user").html(response.birthday)
           photoUrl="https://graph.facebook.com/"+response.username+"/picture?width=150&height=150";
           $("#photo").attr("src",photoUrl);
           $("#location_user").html(response.location.name)
           console.log(response);
           window.location.href = 'index.html#home';
         };

       });  
      },{scope: 'publish_actions,email,user_birthday,user_location'});
			
			
		} else {
			FB.login(function(response) {
        FB.api('/me', function(response) {
          if (response) {
           logued_in=true;
           $("#name_user").html(response.name)
           $("#age_user").html(response.birthday)
           photoUrl="https://graph.facebook.com/"+response.username+"/picture?width=150&height=150";
           $("#photo").attr("src",photoUrl);
           $("#location_user").html(response.location.name)
           console.log(response);
           window.location.href = 'index.html#home';
         };

       });  
      },{scope: 'publish_actions,email,user_birthday,user_location'});
		}	
	}); 



}
function register_facebook(){

	FB.login(function(response) {


    FB.api('/me', function(response) {

      $( "input:text[name=name]" ).val(response.name);
      if (response.gender=="male"){
        $( "select[name=gender]" ).val(1);
      }else{ 		
       $( "select[name=gender]" ).val(2); 			
     }
     $( "input:text[name=email]" ).val(response.email);
     $( "input:text[name=city]" ).val(response.location.name);
     $( "input:text[name=birthday]" ).val(response.birthday);
     photoUrl="https://graph.facebook.com/"+response.username+"/picture?width=150&height=150";
     $("#photo").attr("src",photoUrl);

   }); 


  },{scope: 'publish_actions,email,user_birthday,user_location'}); 

	window.location.href = 'index.html#register';



}
function register(){

	window.location.href = 'index.html#register';


}


//register


$( document ).on( "pageshow", "#before_register", function() {
  $( "#form_login" ).validate({
    rules:{
      email:{
        required:true,
        email:true
      },

      encrypted_password: "required",

    },

    submitHandler: function( form ) {
      var post_values={};
      $(':input', "#form_login").each(function(index, input_element) {
       post_values[input_element.name] = $(input_element).val();

     });
      post_values.encrypted_password=CryptoJS.SHA256(post_values.encrypted_password).toString(CryptoJS.enc.Base64);
      $.post(server+"login", post_values, function(response) {
        var post_values= {};
        response = jQuery.parseJSON(response);
        console.log(response);
        if (!(response.error)) {
          session.session_id=response.session_id;
          session.email=response.email;
          $("#name_user").html(response.name);
                //$("#age_user").html(post_values.birthday);

                //$("#location_user").html(post_values.city);
                //city=post_values.city;
                window.location.href = 'index.html#home';
              }else{
                alert(response.message_error);
              }

            });

    }

  });
});

$( document ).on( "pageshow", "#register", function() {
 $( "#form_register" ).validate({
  rules:{
    name:{
      required: true
    },
    age: {
      required: true,
      number: true
    },
    password: "required",
    password_again: {
      equalTo: "#password"
    }
  },
  submitHandler: function( form ) {

    var post_values= {};
    $(':input', "#form_register").each(function(index, input_element) {
      post_values.NewField = input_element.name;
      post_values[input_element.name] = $(input_element).val();
    });
    post_values.encrypted_password=CryptoJS.SHA256(post_values.encrypted_password).toString(CryptoJS.enc.Base64);
    $.post(server+"login/newuser", post_values, function(response) {

      response = jQuery.parseJSON(response);
      console.log(response);

      if (!(response.error)) {
        alert("Bienvenido");
        $("#name_user").html(post_values.name);
        $("#age_user").html(post_values.birthday);

        $("#location_user").html(post_values.city);
        city=post_values.city;
        window.location.href = 'index.html#home';
      }else{
        alert(response.message_error);
      }

    });
  }

});
});
