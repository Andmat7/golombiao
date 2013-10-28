jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});

var server="http://codfe.co/golombiao/server/index.php/";
var values={0:"none",1:"No violencia",2:"Libertad de expresión",3:"No discriminación",4:"Cuidar el entorno",5:"Participación activa",6:"Cuidarse y cuidar el otro",7:"Igualdad"};
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

$( document ).on("click", ".home_icon", function() {

  window.location.href = 'index.html#home';
});


$( document ).on("click", ".convocate_teams", function() {
  console.log("Resultados");
  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_conv:$(this).attr("id")
  };
  $("#conv_result").val($(this).attr("id"));
 $("#results .principio img").attr("src","images/acuerdos/"+$(this).attr("principio")+".png");
 $("#results .principio h2").html(values[$(this).attr("principio")]);
 $("#results #myteam input[name='id_equipo']").val($(this).attr("id_equipo1"));
 $("#results #otherteam input[name='id_equipo']").val($(this).attr("id_equipo2"));


  $.post(server+"teams/existen_resultados", post_values, function(response) {


    response = jQuery.parseJSON(response);
    if (!(response.error)) {
      $.post(server+"teams/promedio_resultados", post_values, function(response2) {

        window.location.href = 'index.html#results2';
      });


      
    }else{
      alert("Aun no has evaluado, por favor hazlo para ver los resultados");
      window.location.href = 'index.html#results';

      
    }
  });

});


$( document ).on( "pageshow", "#results", function() {
  

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
           photoUrl="https://graph.facebook.com/"+response.username+"/picture?width=300&height=400";
           $("#photo").attr("src",photoUrl);
           $("#location_user").html(response.location.name);
           console.log(response);
           window.location.href = 'index.html#home';
         }

       });
      },{scope: 'publish_actions,email,user_birthday,user_location'});
			
			
		} else {
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
         }

       });
      },{scope: 'publish_actions,email,user_birthday,user_location'});
		}
  });



}


function send_results(){



  var post_values={
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_conv:$("#conv_result").val(),
    barra:$("#results #select-choice-custom2").val()

  };
  $(':input', "#results #myteam").each(function(index, input_element) {
   post_values[input_element.name] = $(input_element).val();

 });
  $.post(server+"teams/guardar_resultados", post_values, function(response) {

    response = jQuery.parseJSON(response);


    if (!(response.error)) {
      alert("se ha enviado una solicitud al lider del otro equipo");
      window.location.href = 'index.html#my_conv';
    }else{
      alert(response.message_error);
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


function data_server_team(){

  $('#join').find("input:checked").each(function(e) {

    var team_name =$(this).attr('team_name');
    var post_values= {
      session_id:localStorage.getItem('session_id'),
      email:localStorage.getItem('email'),
      team_id:$(this).val(),

    };
    $.post(server+"teams/suscribe", post_values, function(response) {
      response = jQuery.parseJSON(response);
      if (!(response.error)) {
        localStorage.setItem('team_id',response.team_id);
        localStorage.setItem('name_team',response.name_team);

        alert("Te has unido al grupo  "+team_name);
      }else{
        if (response.error_code==2) {


        alert(response.message_error+team_name);
      }else
      {
          alert(response.message_error);


      }
      }

    });
  });


}


function select_own_team(team){

  console.log("asdasd");
  $(team).parent().find("li").addClass("green").removeClass("red");
  $(team).addClass("red").removeClass("green");



}


function zone(teams){

  console.log("asdasd");
  $(teams).parent().parent().parent().find(".your_team .red").html();
  $(teams).parent().parent().parent().find(".vs_team2 .red").html();
  $("#convocate2 .my_team").html($(teams).parent().parent().parent().find(".your_team .red").html());
  $("#convocate2 .the_other_team").html($(teams).parent().parent().parent().find(".vs_team2 .red").html());
  window.location.href = 'index.html#convocate2';
}

function request_game(submit){


  var post_values={
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    equipo_1:$("#convocate2 .my_team input").val(),
    equipo_2:$("#convocate2 .the_other_team input").val()

  };
  $(':input', "#convocate2").each(function(index, input_element) {
   post_values[input_element.name] = $(input_element).val();

 });
  $.post(server+"teams/guardar_convocatoria", post_values, function(response) {

    response = jQuery.parseJSON(response);


    if (!(response.error)) {
      alert("se ha enviado una solicitud al lider del otro equipo");
      window.location.href = 'index.html#my_conv';
    }else{
      alert(response.message_error);
    }

  });


}








function vs_team(vs_steam){

  console.log("asdasd");
  var post_values={
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_city:vs_steam.value
  };
  $.post(server+"teams/get_fromcity", post_values, function(response) {
    response = jQuery.parseJSON(response);
    if (!(response.error)) {
      $(".vs_teams3").html('Equipos Contrarios');
      for (var i = 0; i <= response.length  ; i++) {
        var j=i+1;
        $(".vs_teams3").append("<li class='team' onclick='select_own_team(this)'><div class='name_team'>"+response[i]['name']+"</div> <input class='id' type='hidden'  name='id_team' value='"+response[i]['id']+"'/><div class='other_team'>"+response[i]['description']+"</div></li>");
      }


    }else{
      alert(response.message_error);
    }





  });



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

    image.src ="http://graph.facebook.com/Golombiao/picture?width=300&height=400";
  }


});


$( document ).on( "pageshow", "#convocate", function() {
  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email')
  };


  $.post(server+"teams/verify_team", post_values, function(response) {


    response = jQuery.parseJSON(response);
    if (!(response.error)) {
      $(".own_teams").html('Tus Equipos');
      for (var i = 0; i <= response.length  ; i++) {
        var j=i+1;
        $(".own_teams").append("<li class='team' onclick='select_own_team(this)'><div class='name_team'>"+response[i]['name']+"</div> <input class='id' type='hidden'  name='id_team' value='"+response[i]['id']+"'/><div class='other_team'>"+response[i]['description']+"</div></li>");
      }
    }else{
      alert("Debes ser el creador de un equipo para poder convocar a juego");
      window.location.href = 'index.html#play';
    }
  });

});

$( document ).on( "pageshow", "#my_conv", function() {
  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    tipo_consulta:0
  };


  $.post(server+"teams/conv_team", post_values, function(response) {


    response = jQuery.parseJSON(response);
    if (!(response.error)) {
      $("#title_mi_reto").html('<div class="title_my_conv">Mis convocatorias</div>');
      for (var i = 0; i <= response.length  ; i++) {
        var j=i+1;
        $("#title_mi_reto").append('<div class=" convocate_teams" id_equipo1="'+response[i]["equipo_1"]+'" id_equipo2="'+response[i]["equipo_2"]+'" principio="'+response[i]["principio"]+'" id="'+response[i]["id"]+'"><div class="reto_my_team">'+response[i]["equipo_1_name"]+'  V.s. '+response[i]["equipo_2_name"]+'  </div><div class="check">'+response[i]["acepta_convocatoria"]+'</div><div class="date_conv">'+response[i]["hora"]+' '+response[i]["fecha"]+'</div></div>');

      }
    }else{
      alert("En este momento no has convocado ningun Juego");
      window.location.href = 'index.html#play';
    }
  });

  post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    tipo_consulta:1
  };

  $.post(server+"teams/conv_team", post_values, function(response2) {


    response2 = jQuery.parseJSON(response2);
    if (!(response2.error)) {
      $("#title_mi_reto2").html('<div class="title_my_conv">Me convocaron</div>');
      for (var i = 0; i <= response2.length  ; i++) {
        var j=i+1;
        $("#title_mi_reto2").append('<div class=" convocate_teams"  id_equipo1="'+response2[i]["equipo_1"]+'"  id_equipo2="'+response2[i]["equipo_2"]+'" principio="'+response2[i]["principio"]+'" id="'+response2[i]["id"]+'"><div class="reto_my_team">'+response2[i]["equipo_2"]+'  V.s. '+response2[i]["equipo_1_name"]+'</div><div class="check">'+response2[i]["acepta_convocatoria"]+'</div><div class="date_conv">'+response2[i]["hora"]+' '+response2[i]["fecha"]+'</div></div>');

      }
    }else{
      alert("En este momento ten han convocado a ningun Juego");
    }
  });






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
          localStorage.setItem('session_id',response.session_id);
          localStorage.setItem('email',response.email);
          localStorage.setItem('id_user',response.user_id);
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

        localStorage.setItem('id_user',response.id_user);
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
            var team_div='<div data-role="collapsible team_'+response[i].id+'" team_id="'+response[i].id+'">'+
            '<div data-role="fieldcontain" class="join_checkbox" >'+
            '<fieldset data-role="controlgroup">'+
            '<input type="checkbox" name="join_to_team" id="checkbox" class="custom" value="'+response[i].id+'" team_name="'+response[i].name+'"/>'+
            '<label for="checkbox">unirse</label>'+
            '</fieldset>'+
            '</div>'+
            '<h3>'+response[i].name+'</h3>'+
            '<p>'+
            '<ul class="jugadores_'+response[i].id+'">'+
            'Jugadores'+
            '<li></li>'+
            '</ul>'+
            '</p>'+
            '</div>';
            $("#join .teams_city").append(team_div);

          }
          $('#join').find('div[data-role=collapsible]').collapsible();
          
          $('#join').find("input[type='checkbox']").checkboxradio();
          $('#join').find('div[data-role=collapsible]').bind('expand', function () {

            var post_values= {
              session_id:localStorage.getItem('session_id'),
              email:localStorage.getItem('email'),
              team_id:$(this).attr('team_id'),


            };
            $.post(server+"teams/get_players", post_values, function(response) {
              response = jQuery.parseJSON(response);
              $("#join .jugadores_"+post_values.team_id).html();
              if (!(response.error)) {
                for (var i = response.length - 1; i >= 0; i--) {
                  var jugador='<li>'+response[i].name+'</li>';
                  $("#join .jugadores_"+post_values.team_id).append(team_div);
                }


                alert("Te has unido al grupo  "+team_name);
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


//maps



    google.maps.event.addDomListener(window, 'load', setup);
function onError(e){
    console.log(e);

}
function setup() {
    // wait for PhoneGap to load
    document.addEventListener("deviceready", onDeviceReady, false);
        
    function onDeviceReady() {
        // get device's geographical location and return it as a Position object (which is then passed to onSuccess)
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    function onError (e) {
        console.log(e);
    }
}
function onSuccess(position) {
    var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    map  = new google.maps.Map(document.getElementById('geoLocation'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: myLocation,
    zoom: 15
    });
    var request = { location: myLocation, radius: currentRadiusValue, types: [currentPlaceType] };
    infowindow  = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}



    google.maps.event.addDomListener(window, 'load', setup2);

function setup2() {
    // wait for PhoneGap to load
    document.addEventListener("deviceready", onDeviceReady2, false);
        
    function onDeviceReady2() {
        // get device's geographical location and return it as a Position object (which is then passed to onSuccess)
        navigator.geolocation.getCurrentPosition(onSuccess2, onError2);
    }
    function onError2 (e) {
        console.log(e);
    }
}
function onSuccess2(position) {
    var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    map  = new google.maps.Map(document.getElementById('geoLocation2'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: myLocation,
    zoom: 15
    });
    var request = { location: myLocation, radius: currentRadiusValue, types: [currentPlaceType] };
    infowindow  = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}