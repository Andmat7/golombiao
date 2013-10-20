jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});

var server="http://localhost/golombiao/server/index.php/";
var user;

var session = {
  session_id:false,
  email:"un email"
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
           $("#name_user").html(response.name);
           $("#age_user").html(response.birthday);
           photoUrl="https://graph.facebook.com/"+response.username+"/picture?width=150&height=150";
           $("#photo").attr("src",photoUrl);
           $("#location_user").html(response.location.name);
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
     photoUrl="https://graph.facebook.com/"+response.username+"/picture?width=300&height=400";
     $("#photo").attr("src",photoUrl);

   }); 


  },{scope: 'publish_actions,email,user_birthday,user_location'}); 

	window.location.href = 'index.html#register';



}
function register(){

	window.location.href = 'index.html#register';


}
function sel_city(departamento) {
   
     var post_values={
          session_id:localStorage.getItem('session_id'),
          email:localStorage.getItem('email')
        };
      post_values[departamento.name] = departamento.value;
      $(".ciudad").html('<option value="0">Ciudad</option>');
       $.post(server+"login/select_city", post_values , function(response) {

      response = jQuery.parseJSON(response);
      for (var i = 0; i <= response.length  ; i++) {
        var j=i+1;
        $(".ciudad").append("<option value="+response[i]["idCiudad"]+">"+response[i]["nombre"]+"</option>");
      }


    });
}




function camera(){
   console.log("camera");

  navigator.camera.getPicture(onSuccess, onFail, { quality: 50, 
    destinationType: Camera.DestinationType.FILE_URI,
    targetWidth: 300,
    targetHeight: 400,
    correctOrientation: true
    }); 

  function onSuccess(imageURI) {
      var image = document.getElementById('photo');
      localStorage.setItem("photo_"+localStorage.getItem("id_user"),imageURI);
      image.src = localStorage.getItem("photo_"+localStorage.getItem("id_user"));
  }

  function onFail(message) {
      alert('Failed because: ' + message);
  }


}



//for unique photo


$( document ).on( "pageshow", "#home", function() {
  var image = document.getElementById('photo');
      if (localStorage.getItem("photo_"+localStorage.getItem("id_user"))) {
        image.src = localStorage.getItem("photo_"+localStorage.getItem("id_user"));
      }else{

        image.src ="http://graph.facebook.com/DiannaNuvan/picture?width=300&height=400";
      }


});

//login
$( document ).on( "pageshow", "#login", function() {



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

        response = jQuery.parseJSON(response);
        if (!(response.error)) {
          localStorage.setItem('session_id',response.session_id)
          localStorage.setItem('email',response.email)
          localStorage.setItem('id_user',response.user_id)
          $("#name_user").html(response.first_name +' '+ response.last_name);
          $("#age_user").html(response.age);

          $("#location_user").html(response.city);
                //city=post_values.city;
                window.location.href = 'index.html#home';
              }else{
                alert(response.message_error);
              }

            });

    }

  });
});
function level_function(select){
  if($(select).val()==1){
    $("#identf2").show();
  }else{
    $("#identf2").hide();
  }
  

}

$( document ).on( "pageshow", "#register", function() {
 $( "#form_register" ).validate({
  rules:{
    first_name:{
      required: true
    },
    last_name:{
      required: true
    },
    age: {
      required: true,
      number: true
    },
    encrypted_password: "required",
    password_again: {
      equalTo: "#encrypted_password"
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

        localStorage.setItem('id_user',response.id_user)
        $("#name_user").html(post_values.first_name+" "+post_values.last_name);
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



$( document ).on( "pageshow", "#create", function() {
  $( "#form_create" ).validate({
    rules:{
      name_team:{
        required:true,
      },
      departamento:{
        required:true
      },
      city:{
        required:true
      }
    },

    submitHandler: function( form ) {
      var post_values= {
          session_id:localStorage.getItem('session_id'),
          email:localStorage.getItem('email')
        };
      $(':input', "#form_create").each(function(index, input_element) {
       post_values[input_element.name] = $(input_element).val();

     });
      $.post(server+"teams/new_team", post_values, function(response) {
        
        
        response = jQuery.parseJSON(response);
        if (!(response.error)) {
          localStorage.setItem('team_id',response.team_id);
          localStorage.setItem('name_team',response.name_team);
          
          alert("grupo creado");
          
        }else{
          alert(response.message_error);
        }
      });
    }

  });
});
$( document ).on( "pageshow", "#join", function() {

 $("#join .ciudad").on( "change",
  function  (e) {
    var post_values= {
          session_id:localStorage.getItem('session_id'),
          email:localStorage.getItem('email'),
          id_city:this.value

        };
    $.post(server+"teams/get_fromcity", post_values, function(response) {
        $("#join .teams_city").html("");
        
        response = jQuery.parseJSON(response);
        if (!(response.error)) {
          if(response.length===0) {
            alert("no hay equipos para esta ciudad o municipio");
          }else{
            for (var i = response.length - 1; i >= 0; i--) {
              console.log(response[i]);
              var team_div='<div data-role="collapsible">'+
                '<div data-role="fieldcontain" class="join_checkbox" >'+
                  '<fieldset data-role="controlgroup">'+
                    '<input type="checkbox" name="join_to_team" id="checkbox" class="custom" value="'+response[i].id+'" team_name="'+response[i].name+'"/>'+
                    '<label for="checkbox">unirse</label>'+
                  '</fieldset>'+
                '</div>'+
                '<h3>'+response[i].name+'</h3>'+
                '<p>'+
                  '<ul>'+
                    'Jugadores'+
                    '<li>jugador 1</li>'+                    
                  '</ul>'+
                '</p>'+
              '</div>';
              $("#join .teams_city").append(team_div);

            }
            $('#join').find('div[data-role=collapsible]').collapsible();
            $('#join').find("input[type='checkbox']").checkboxradio();
            $('#join').find("input[type='checkbox']").bind( "change", function(event, ui) {
              
              
            var team_name =$(this).attr('team_name');
            var post_values= {
              session_id:localStorage.getItem('session_id'),
              email:localStorage.getItem('email'),
              team_id:$(this).val(),


            };
            $.post(server+"teams/suscribe", post_values, function(response) {
              if (!(response.error)) {
                localStorage.setItem('team_id',response.team_id);
                localStorage.setItem('name_team',response.name_team);

                alert("Te has unido al grupo  "+team_name);
                window.location.href = 'index.html#convocate';
              }else{
                alert(response.message_error);
              }

            });
            });
          

          }

          

          
        }else{
          alert(response.message_error);
        }
      });
  }
  );

  $( "#form_create" ).validate({
    rules:{
      name_team:{
        required:true,
      },
      departamento:{
        required:true
      },
      city:{
        required:true
      }
    },

    submitHandler: function( form ) {
      var post_values= {
          session_id:localStorage.getItem('session_id'),
          email:localStorage.getItem('email')
        };
      $(':input', "#form_create").each(function(index, input_element) {
       post_values[input_element.name] = $(input_element).val();

     });
      $.post(server+"teams/new_team", post_values, function(response) {
        
        
        response = jQuery.parseJSON(response);
        if (!(response.error)) {
          localStorage.setItem('team_id',response.team_id);
          localStorage.setItem('name_team',response.name_team);
          
          alert("grupo creado");
          window.location.href = 'index.html#convocate';
          
        }else{
          alert(response.message_error);
        }
      });
    }

  });
});