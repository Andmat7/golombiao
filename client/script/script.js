jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});
var home="www.golombiao.com"
var server="http://"+home+"/golombiao/server/index.php/";
var imagePath="http://"+home+"/golombiao/server/uploads/";
var values={0:"none",1:"No violencia",2:"Libertad de expresión",3:"No discriminación",4:"Cuidar el entorno",5:"Participación activa",6:"Cuidarse y cuidar el otro",7:"Igualdad"};
var user;
var galeryImages;
var fb_user;

user= {
  email:"ccast2@hotmail.com",
  first_name: 'Andres',
  last_name:'Castellanos',
  username: "Andresc26",
  city: "Bogotá, Colombia",
  birthday:"01/20/1990",
};

$(window).load(function() {


  $(".aspect_ratio").height($(window).height());
  $(".backButton").click(function() {
  window.history.back();

});
   $(".homeButton").click(function() {
  $.mobile.changePage( "#home");  
});


   $( "#galeria .container" ).scroll(function(event) {
  event.preventDefault();
    var height=$("#galeria .container").scrollTop()+$("#galeria .container")[0].clientHeight;
  if ($("#galeria .container")[0].scrollHeight==height) {
   
    if (galeryImages[counter].name) {


    $("#galeria .container").append("<img alt='' src='"+imagePath+galeryImages[counter].name+"'/>");
    counter=counter+1;
};

  };

  
});



  


	FB.init({
		appId:431026877004103,
		nativeInterface: CDV.FB,
		cookie:true,
		status:true,
		xfbml:true
		});
});




$( document ).on( "pageshow", "#galeria", function() {



  var post_values={
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
  };

    $.post(server+"teams/getImagesNames", post_values, function(response) {

      galeryImages = jQuery.parseJSON(response);
      console.log(galeryImages.length);
      $("#galeria .container").html("<img alt='' src='"+imagePath+galeryImages[0].name+"'/><img alt='' src='"+imagePath+galeryImages[1].name+"'/><img alt='' src='"+imagePath+galeryImages[2].name+"'/> ");

      counter=3;


      console.log("asdasd");


    });



  

});











function closeApp(){

navigator.app.exitApp();


}

function reloadApp(){
  $( "#internetPopup" ).popup("close");
  location.reload();

  
}

 $( document ).on( "pageshow", function( event, ui) {
    // var version=parseInt(window.device.version);
    // console.log(version);

    // if (version<3) {
    //   console.log("version<3");
    //   $(event.target).find(".container").height($(document).height());

    // }else{

      console.log("version>3");



    var windowHeight=$(window).height();
    var containerHeight=$(event.target).find(".container").height();
    var footerHeight=$(event.target).find('div[data-role="footer"]').height();
    var headerHeight=$(event.target).find('div[data-role="header"]').height();
    $(event.target).find(".container").height(windowHeight-footerHeight-headerHeight+'px');
  //  }
  });




function aceptRequest(element,typeRequest){
  loadingOpen("aceptando solicitud");

  
  var direction;


  var post_values={
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_conv:$(element).parent().attr("id"),
  };
  if (typeRequest==1) {
     direction="teams/aceptRequest"
       }else{

     direction="teams/deleteRequest"

  }
  $.post(server+direction, post_values, function(response) {

    response = jQuery.parseJSON(response);

    loadingClose();
    if (!(response.error)&&typeRequest==1) {
      alert("Has aceptado la convocatoria");
      location.reload();
      

    }else if (!(response.error)&&typeRequest==2) {
      alert("Se ha eliminado la convocatoria");
      location.reload();


    }else{
      alert(response.message_error);
    }

  });
}








$( document ).on("click", ".home_icon", function() {

  
  changePage('index.html#home');
});


$( document ).on("click", ".convocate_teams", function() {

  console.log("Resultados");
  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_conv:$(this).attr("id"),
    id_equipo:$(this).attr("id_equipo")
  };
  $("#conv_result").val($(this).attr("id"));
 $("#results .principio img").attr("src","images/acuerdos/"+$(this).attr("principio")+".png");
 $("#results .principio h2").html(values[$(this).attr("principio")]);
 $("#results #myteam input[name='id_equipo']").val($(this).attr("id_equipo1"));
 $("#results #otherteam input[name='id_equipo']").val($(this).attr("id_equipo2"));


  $.post(server+"teams/existen_resultados", post_values, function(response) {


    response = jQuery.parseJSON(response);
    if (!(response.error)) {
      $.post(server+"teams/resultsRequests", post_values, function(response2) {

        response2 = jQuery.parseJSON(response2);

        $.each(response2[0],function(element){fuckYourTable(element,response2); });  

        function fuckYourTable(myClass,data){

        $("#results2 ."+myClass+" td").each(function(key,value){
         
        $(value).append(data[key][myClass]+'<img src="images/sun.png">');

       });
        }



        
        $.mobile.changePage( "#results2");
      });


      
    }else{
      alert("Aun no has evaluado, por favor hazlo para ver los resultados");
      $.mobile.changePage( "#results");

      
    }
  });

});



function calculate_age(date_string)
{
    var birthday=date_string.split("/");
    var birth_month=parseInt(birthday[0],10);
    var birth_day=parseInt(birthday[1],10);
    var birth_year=parseInt(birthday[2],10);

    var today_date = new Date();
    var today_year = today_date.getFullYear();
    var today_month = today_date.getMonth();
    var today_day = today_date.getDate();
    var age = today_year - birth_year;

    if ( today_month < (birth_month - 1))
    {
        age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day))
    {
        age--;
    }
    return age;
}



function login(){
  FB.login(function(response) {

    FB.api('/me', function(fb_user) {



      if (fb_user.id) {
        console.log('entro');
        console.log(fb_user);

        var post_values={
          fb_id:fb_user.id,
          email:fb_user.email,
        };
        $.mobile.loading( 'show', {
          text: '',
          textVisible: true,
          theme: 'z',
          html: ""
        });

        $.post(server+"login/verify_registerfb", post_values, function(response_v) {
          console.log("hizo la peticion");
          response_v = jQuery.parseJSON(response_v);
          console.log(response_v);
          $.mobile.loading( 'hide' );
          if (response_v.success=="true") {
            $("#name_user").html(fb_user.name);
            $("#age_user").html(fb_user.birthday);
            photoUrl="https://graph.facebook.com/"+fb_user.username+"/picture?width=300&height=400";
            $("#photo").attr("src",photoUrl);
            $("#location_user").html(fb_user.location.name);
            console.log(fb_user);
            changePage('index.html#home');

          }else{
            $("#register input[name='first_name']").val(fb_user.first_name+" "+fb_user.middle_name);
            $("#register input[name='last_name']").val(fb_user.last_name);
            $("#register input[name='age']").val(calculate_age(fb_user.birthday));
            $("#register input[name='fb_id']").val(calculate_age(fb_user.id));
            $("#register input[name='email']").val(fb_user.email);



            if (fb_user.gender=="male"){
              $( "select[name=gender]" ).val(1);
            }else{
              $( "select[name=gender]" ).val(2);
            }
            $( "input:text[name=email]" ).val(fb_user.email);
            photoUrl="https://graph.facebook.com/"+fb_user.username+"/picture?width=300&height=400";
            $("#photo").attr("src",photoUrl) ;
            changePage('index.html#register');
          }



        });
}

});
},{scope: 'publish_actions,email,user_birthday,user_location'});
}

function send_results(){

loadingOpen("Enviando resultados");

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
                loadingClose();
                alert("se ha enviado una solicitud al lider del otro equipo");
                changePage('index.html#my_conv');
              }else{
                loadingClose();
                alert(response2.message_error);
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

	
  changePage('index.html#register');



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
            
            changePage('index.html#my_conv');



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
  
  changePage('index.html#convocate2');
}

function request_game(submit){
  loadingOpen("Solicitando encuentro");


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
      loadingClose();
        alert("se ha enviado una solicitud al lider del otro equipo");
      
      changePage('index.html#my_conv');
    }else{
      loadingClose();
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
      $(".vs_teams3").html('<label>Equipos Contrarios</label>');
      for (var i = 0; i <= response.length  ; i++) {
        var j=i+1;
        $(".vs_teams3").append("<li class='team' onclick='select_own_team(this)'><div class='name_team'>"+response[i]['name']+"</div> <input class='id' type='hidden'  name='id_team' value='"+response[i]['id']+"'/><div class='description'>"+response[i]['description']+"</div></li>");
      }


    }else{
      alert(response.message_error);
    }





  });



}
function loadingOpen(legend){

  $.mobile.loading( 'show', {
              text: legend,
              textVisible: true,
              theme: 'a',
              html: ""
            });
}

function loadingClose(){

  $.mobile.loading( 'hide' );

}



function sel_city(departamento) {
loadingOpen("Cargando ciudades");


 var post_values={
  session_id:localStorage.getItem('session_id'),
  email:localStorage.getItem('email')
};
post_values[departamento.name] = departamento.value;
$(".ciudad").html('<option value="0">Ciudad</option>');
$.post(server+"login/select_city", post_values , function(response) {

  response = jQuery.parseJSON(response);
  loadingClose();
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
  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email')
  };

    $.post(server+"teams/getData", post_values, function(response) {
       response = jQuery.parseJSON(response);

        $("#points").html("<h3>"+response.points+"</h3><img src='images/sun.png'>");

         var image = document.getElementById('photo');
      if (localStorage.getItem("photo_"+localStorage.getItem("id_user"))) {
        image.src = localStorage.getItem("photo_"+localStorage.getItem("id_user"));
      }else if(response.fb_id != "0"){

        image.src ="http://graph.facebook.com/"+response.fb_id+"/picture?width=300&height=400";

      }
      else
      {

        image.src ="http://graph.facebook.com/Golombiao/picture?width=300&height=400";
      }


    });





});


$( document ).on( "pageshow", "#convocate", function() {
  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email')
  };


  $.post(server+"teams/verify_team", post_values, function(response) {


    response = jQuery.parseJSON(response);
    if (!(response.error)) {
      $(".own_teams").html('<label>Tus Equipos</label>');
      for (var i = 0; i <= response.length  ; i++) {
        var j=i+1;
        $(".own_teams").append("<li class='team' onclick='select_own_team(this)'><div class='name_team'>"+response[i]['name']+"</div> <input class='id' type='hidden'  name='id_team' value='"+response[i]['id']+"'/><div class='description'>"+response[i]['description']+"</div></li>");
      }
    }else{
      alert("Debes ser el creador de un equipo para poder convocar a juego");
      
      changePage('index.html#play');
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
    var check;


    response = jQuery.parseJSON(response);
    if (!(response.error)) {
      $("#title_mi_reto").html('<div class="title_my_conv">Mis convocatorias</div>');
      for (var i = 0; i <= response.length  ; i++) {
        var j=i+1;
        if (response[i]["acepta_convocatoria"]=="0") {
           check='<img  src="images/uncheck.png">'
        }else{

           check='<img  src="images/check.png">'


        }
        $("#title_mi_reto").append('<div class=" convocate_teams" id_equipo1="'+response[i]["equipo_1"]+'" id_equipo2="'+response[i]["equipo_2"]+'" principio="'+response[i]["principio"]+'" id="'+response[i]["id"]+'"><div class="reto_my_team">'+response[i]["equipo_1_name"]+'  V.s. '+response[i]["equipo_2_name"]+'  </div><div class="check">'+check+'</div><div class="date_conv">'+response[i]["hora"]+' '+response[i]["fecha"]+'</div></div>');

      }



    }else{
      alert("En este momento no has convocado ningun Juego");
      
      changePage('index.html#play');
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
      $("#title_mi_reto3").html(" ");
      for (var i = 0; i <= response2.length  ; i++) {
        var j=i+1;
        if (response2[i]["acepta_convocatoria"]=="0") {
           check='<img  src="images/uncheck.png">'
           var content='<div class="pendingRequests"  id_equipo1="'+
                        response2[i]["equipo_1"]+
                        '"  id_equipo2="'+
                        response2[i]["equipo_2"]+
                        '" principio="'+
                        response2[i]["principio"]+
                        '" id="'+response2[i]["id"]+
                        '"><div class="reto_my_team">'+
                        response2[i]["equipo_2_name"]+
                        '  V.s. '+
                        response2[i]["equipo_1_name"]+
                        '</div><div class="check">'
                        +check+
                        '</div><div class="date_conv">'
                        +response2[i]["hora"]+
                        ' '+
                        response2[i]["fecha"]+
                        '</div>'+
                        '<input type="button" value="aceptar" onclick="aceptRequest(this,1)">'+
                        '<input type="button" value="rechazar"onclick="aceptRequest(this,2)">'
                        '</div>'+
                        



           $("#title_mi_reto3").append(content);


        }else{

           check='<img  onClick="alert("Hello World!")" src="images/check.png">'


        }




        $("#title_mi_reto2").append('<div class=" convocate_teams"  id_equipo1="'+response2[i]["equipo_1"]+'"  id_equipo2="'+response2[i]["equipo_2"]+'" principio="'+response2[i]["principio"]+'" id="'+response2[i]["id"]+'"><div class="reto_my_team">'+response2[i]["equipo_2_name"]+'  V.s. '+response2[i]["equipo_1_name"]+'</div><div class="check">'+check+'</div><div class="date_conv">'+response2[i]["hora"]+' '+response2[i]["fecha"]+'</div></div>');

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
      $.mobile.loading( 'show', {
              text: 'Verificando datos',
              textVisible: true,
              theme: 'z',
              html: ""
            });



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
                $.mobile.loading( 'hide');
                changePage('index.html#home');
              }else{
                $.mobile.loading( 'hide');
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
function load_map (position) {

  var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    map  = new google.maps.Map(document.getElementById('geoLocation2'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: myLocation,
        zoom: 18
    });
  
}

$( document ).on( "pageshow", "#mapa", function() {
  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email')
  };
  $.post(server+"teams/maps_convocatoria", post_values, function(response) {
    response = jQuery.parseJSON(response);
          var colombialatlng = new google.maps.LatLng( 4.127285,-73.696289);
    colombia  = new google.maps.Map(document.getElementById('colombia'), {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: colombialatlng,
          zoom: 5
        });
    for (var i = response.length - 1; i >= 0; i--) {
          if (response[i].longitud!==0) {
            var latlng= new google.maps.LatLng(response[i].latitud, response[i].longitud);
            console.log(response[i]);
            icon='http://maps.google.com/mapfiles/ms/icons/green-dot.png';
            if(response[i].played==1){
                icon='http://maps.google.com/mapfiles/ms/icons/red-dot.png';
            }
            new google.maps.Marker({
                 position: latlng,
                  map: colombia,
                  icon: icon
            });
            


          }
        }
          
      });


});
$( document ).on( "pageshow", "#register", function() {
 $( "#form_register" ).validate({
  rules:{
    first_name:{
      required: true
    },
    last_name:{
      required: true
    },
    gender:{
      required: true
    },

    departamento:{
      required: true
    },
    city:{
      required: true
    },
    study:{
      required: true
    },
    email:{
      required: true
    },

    age: {
      required: true,
      number: true
    },
    encrypted_password: "required",
    re_password: {
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
        changePage('index.html#home');
      }else{
        alert(response.message_error);
      }

    });
  }

});
});

var marker;
function placeMarker(location) {
  
  if ( marker ) {
    marker.setPosition(location);
  } else {
    marker = new google.maps.Marker({
      position: location,
      map: geolocation
    });
  }

    var pos=marker.getPosition();
    console.log(pos);
    geolocation.setCenter(pos);
    $("#latitud").val(marker.getPosition().lat());
    $("#longitud").val(marker.getPosition().lng());
    alert("añadida ubicación en: lat"+pos.lat()+"long"+pos.lng);
}
function load_map_loc (position) {
console.log("cargo");

  var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    geolocation  = new google.maps.Map(document.getElementById('geolocation'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: myLocation,
        zoom: 18
    });
    google.maps.event.addListener(geolocation,'click',function  (event) {
       

        placeMarker(event.latLng);

   

    });

  
}
function load_map (err) {
  console.log("no cargo");
 console.warn('ERROR(' + err.code + '): ' + err.message);
  var myLocation = new google.maps.LatLng(4.127285,-73.696289);

    geolocation  = new google.maps.Map(document.getElementById('geolocation'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: myLocation,
        zoom: 18
    });
    google.maps.event.addListener(geolocation,'click',function  (event) {
       

        placeMarker(event.latLng);

   

    });

  
}

$( document ).on( "pageshow", "#convocate2", function() {
  navigator.geolocation.getCurrentPosition(load_map_loc, load_map,{maximumAge:60000, timeout:10000, enableHighAccuracy:true});

    //alert("convoca2");
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
          changePage('index.html#convocate');
          
        }else{
          alert(response.message_error);
          
          changePage('index.html#play');
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
            '<h3>'+response[i].name+'</h3>'+
            '<div data-role="fieldcontain" class="join_checkbox" >'+
            '<fieldset data-role="controlgroup">'+
            '<input type="checkbox" name="join_to_team" id="checkbox" class="custom" value="'+response[i].id+'" team_name="'+response[i].name+'"/>'+
            '<label for="checkbox">unirse</label>'+
            '</fieldset>'+
            '</div>'+
            
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
        
        changePage('index.html#convocate');

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
   /* google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });*/
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



        function get_galery_photo() {

            // Retrieve image file location from specified source
            console.log("enter onDeviceReady");
            navigator.camera.getPicture(uploadPhoto,
                                        function(message) { alert('Se ha cancelado la subida'); },
                                        { quality: 50,
                                        destinationType: navigator.camera.DestinationType.FILE_URI,
                                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                                        targetWidth: 300,
                                        targetHeight: 400,
                                        correctOrientation: true }
                                        );

            console.log("end onDeviceReady");


        }

        function uploadPhoto(imageURI) {
          $.mobile.loading( 'show', {
              text: 'subiendo imagen',
              textVisible: true,
              theme: 'a',
              html: ""
            });
          console.log("enter uploadPhoto");
            var options = new FileUploadOptions();
            options.fileKey="userfile";
            options.mimeType="image/jpg";
            console.log("defined image");

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";
            console.log("defined param");

            options.params = params;

            console.log("object ready");
            var ft = new FileTransfer();

            ft.upload(imageURI, encodeURI(server+"upload/do_upload"), win, fail, options);
            console.log("image sended");
        }

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            response=r.response;
            response = jQuery.parseJSON(response);
            console.log(response);
            alert(response.message_success);
            $.mobile.loading( 'hide' );
        }

        function fail(error) {
            alert("Ha ocurrido un error: Code = " + error.code);
            $.mobile.loading( 'hide' );
        }








function changePage(page){

  if(navigator.userAgent.match(/OS/i) || navigator.userAgent.match(/Android/i)){


    $.mobile.changePage(page);

  }else{

  window.location.href = page;

}


}