var server="http://192.168.0.102/golombiao_server/index.php"
var logued_in=false;
var birthday="01/20/1990";
var first_name= "Andres";
var last_name= "Castellanos";
var name= "Andres Castellanos";
var username= "Andresc26";
var city="Bogotá, Colombia";
var post_values = {
            email:"cast2",
            session_id: "cast2"
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

function data_server_team(){


	$(':input', "#form_create").each(function(index, input_element) {
             post_values[input_element.name] = $(input_element).val();
          });
	$.post(server+"/teams/new_team", post_values, function(response) {
		console.log(response);
		if (response==1) {
			alert("Bienvenido")
			$("#name_user").html(post_values.name)
			$("#age_user").html(post_values.birthday)

			$("#location_user").html(post_values.city)
			city=post_values.city;
			window.location.href = 'index.html#home';
		}else{
			alert("email en uso")
		}

	});





}

function data_server(){

	console.log("data_server");
	$(':input', "#form_register").each(function(index, input_element) {
             post_values[input_element.name] = $(input_element).val();
          });
	$.post(server+"/users/new_user", post_values, function(response) {
		console.log(response);
		if (response==1) {
			alert("Bienvenido")
			$("#name_user").html(post_values.name)
			$("#age_user").html(post_values.birthday)

			$("#location_user").html(post_values.city)
			city=post_values.city;
			window.location.href = 'index.html#home';
		}else{
			alert("email en uso")
		}

	});
}


function level_function(){


    if ($('#study_1').val() == '1') {
        $('#identf2').show();
    }
    else $('#identf2').hide(); // hide div if value is not "custom"



}


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

