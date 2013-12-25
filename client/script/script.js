jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});
var home="www.golombiao.com";
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
var init;
$(window).load(function() {


  setInterval(function () {
    connectionStatus = navigator.onLine ? 'online' : 'offline';
    if (connectionStatus=="offline") {

      customAlert("Por favor revisa tu conexion a internet");

    }else{
        if(!init){
          init=true;
            FB.init({
              appId:431026877004103,
              nativeInterface: CDV.FB,
              cookie:true,
              status:true,
              xfbml:true
            });
            
        }
    }

  }, 500);

  $(".backButton").click(function() {


    window.history.back();
    cleanforms();




  });
  $(".homeButton").click(function() {

    $.mobile.changePage( "#home");
    cleanforms();





  });




  $( "#galeria .container" ).scroll(function(event) {
    event.preventDefault();
    var height=$("#galeria .container").scrollTop()+$("#galeria .container")[0].clientHeight;
    var maxHeight=$("#galeria .container")[0].scrollHeight-15;
    if (maxHeight<height||maxHeight==height) {

      if (galeryImages[counter].name) {


        $("#galeria .container").append("<img alt='' src='"+imagePath+galeryImages[counter].name+"'/>");
        counter=counter+1;
      };

    };


  });



  



});



function cleanforms(){
 $("form input").each(function(key,value){
  if ($(value).attr("type")=="button" || $(value).attr("type")=="submit") {}else{

    $(value).val(null);
  }

});


 $(".ciudad").html(" ");

 $("select").each(function(index,element) {
  var myselect = $(element);
  myselect[0].selectedIndex = 0;
  myselect.selectmenu("refresh");

});



}



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


function verifyData(){


  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email')
  };

  $.post(server+"teams/getData", post_values, function(response) {
   response = jQuery.parseJSON(response);
   if (response.message_error=="Usuario no logueado" ) 
   {

    customAlert("Usuario deslogueado, por favor accede con tu correo y contraseña");
    changePage('index.html#login');

  };




});




}


function deleteData(){

  localStorage.setItem('session_id',"0");
  localStorage.setItem('email',"0");
  localStorage.setItem('id_user',"0");
  cleanforms();

}

function closeSession(){

  if(confirm('Desea cerrar sesion?')) 
    {} else{ return(false);}

  localStorage.setItem('session_id',"0");
  localStorage.setItem('email',"0");
  localStorage.setItem('id_user',"0");
  changePage('index.html#login');



}




function closeApp(){

  navigator.app.exitApp();


}

function reloadApp(){
  $( "#internetPopup" ).popup("close");
  location.reload();

  
}

$( document ).on( "pageshow", function( event, ui) {









  if ($(event.target).attr("id")=="login"||$(event.target).attr("id")=="register") {}
    else{
      verifyData();
    }
    var windowHeight=$(window).height();
    var containerHeight=$(event.target).find(".container").height();
    var footerHeight=$(event.target).find('div[data-role="footer"]').height();
    var headerHeight=$(event.target).find('div[data-role="header"]').height();
    $(event.target).find(".container").height(windowHeight-footerHeight-headerHeight+'px');
  });








function refreshPage()
{
  jQuery.mobile.changePage(window.location.href, {
    allowSamePageTransition: true,
    transition: 'none',
    reloadPage: true
  });
}

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
    customAlert("Has aceptado la convocatoria");
    changePage("#pre_conv");changePage("#my_conv");



  }else if (!(response.error)&&typeRequest==2) {
    customAlert("Se ha eliminado la convocatoria");
    changePage("#pre_conv");changePage("#my_conv");



  }else{
    customAlert(response.message_error);
  }

});
}

$( document ).on("click", "#me_retaron img", function() {

  $( "#myPanel" ).popup( "open" );

  



});



$( document ).on("click", ".userData", function() {
  loadingOpen("Cargando Datos");

  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_user:$(this).attr("myid"),
  };


  $.post(server+"teams/userData", post_values, function(response) {
    response = jQuery.parseJSON(response);

    if (response.gender==1) {  response.gender="Hombre";  }else{ response.gender="Mujer";}

    $(".myData2 .nameJ").html(response.first_name+" "+response.last_name);
    $(".myData2 .ageJ").html(response.age+" Años");
    $(".myData2 .genderJ").html(response.gender);
    $(".myData2 .pointsJ").html(response.points+" puntos");
    $( "#userData2" ).popup();


    console.log("asdasd");


    $( "#userData2" ).popup( "open" );
    loadingClose();
  });

  console.log("asdasd");





});





$( document ).on("click", ".home_icon", function() {


  changePage('index.html#home');
});


$( document ).on("click", ".reto_my_team", function() {

  console.log("Resultados");
  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_conv:$(this).parent().attr("id"),
    id_equipo:$(this).parent().attr("id_equipo")
  };
  $("#conv_result").val($(this).parent().attr("id"));
  $("#results .principio img").attr("src","images/acuerdos/"+$(this).parent().attr("principio")+".png");
  $("#results .principio h2").html(values[$(this).parent().attr("principio")]);
  $("#results #myteam input[name='id_equipo']").val($(this).parent().attr("id_equipo1"));
  $("#results #otherteam input[name='id_equipo']").val($(this).parent().attr("id_equipo2"));


  $.post(server+"teams/existen_resultados", post_values, function(response) {


    response = jQuery.parseJSON(response);
    if (!(response.error)) {
      $.post(server+"teams/resultsRequests", post_values, function(response2) {

        response2 = jQuery.parseJSON(response2);
        if (!(response2.error)) {

          $(".name_team1").html(response2[0].name_team);
          $(".name_team2").html(response2[1].name_team);

          if (response2[0].total==response2[1].total) {

            $("#equipodestacado").parent().html("Equipos destacados: <span id='equipodestacado'>"+response2[0].name_team+" y "+response2[1].name_team+"</span>"
              );


          }else if (response2[0].total>response2[1].total) {
            $("#equipodestacado").html(response2[0].name_team);

          }else{

            $("#equipodestacado").html(response2[1].name_team);

          }


          $.each(response2[0],function(element){


            fuckYourTable(element,response2); 



          });  

          function fuckYourTable(myClass,data){

            $("#results2 ."+myClass+" td").each(function(key,value){

              $(value).html(data[key][myClass]+'<img src="images/sun.png">');

            });
          }




          $.mobile.changePage( "#results2");
        }else{

          customAlert(response2.message_error);

        }




      });



}else if(response.message_error=="Aun no has evaluado, por favor hazlo para ver los resultados"){
  customAlert(response.message_error);
  $.mobile.changePage( "#results");


}else{

  customAlert(response.message_error);


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

  FB.logout();

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
          theme: 'a',
          html: ""
        });

        $.post(server+"login/verify_registerfb", post_values, function(response_v) {
          console.log("hizo la peticion");
          $.mobile.loading( 'hide' );
          response_v = jQuery.parseJSON(response_v);
          

          
          if (response_v.success=="true") {
            console.log("ya registrado");
            $("#name_user").html(fb_user.name);
            $("#age_user").html(fb_user.birthday);
            photoUrl="https://graph.facebook.com/"+fb_user.username+"/picture?width=300&height=400";
            $("#photo").attr("src",photoUrl);
            $("#location_user").html(fb_user.location.name);
            localStorage.setItem('session_id',response_v.session_id);
            localStorage.setItem('email',response_v.email);
            localStorage.setItem('id_user',response_v.user_id);
            console.log(fb_user);

            changePage('index.html#home');

          }else{
            console.log("no registrado");
            
            var middle_name="";
            if(fb_user.middle_name!==undefined){
              middle_name=fb_user.middle_name;

            }
            $("#register input[name='first_name']").val(fb_user.first_name+" "+middle_name);
            $("#register input[name='last_name']").val(fb_user.last_name);
            $("#register input[name='age']").val(calculate_age(fb_user.birthday));
            $("#register input[name='fb_id']").val(fb_user.id);
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



        }).fail(function() {
          customAlert( "error" );
        });
      }

    });
},{scope: 'publish_actions,email,user_birthday,user_location'});
}


  $( document ).on( "pageshow", "#results", function() {


    $( "#form_results" ).validate({
            rules:{
              barra:{
                required:true,
              },
               cump_acuerdos:{
                required:true,
              },
              faltas:{
                required:true
              },
              meritos:{
                required:true
              },
              no_players_presents:{
                required:true
              },
              no_players:{
                required:true
              },
              autoevaluacion:{
                required:true
              },
              otherTeam:{
                required:true
              },
              asesor:{
                required:true
              }
            },

            submitHandler: function( form ) {
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
                      customAlert("se ha enviado tus resultados");
                      changePage('index.html#my_conv');
                    }else{
                      loadingClose();
                      customAlert(response2.message_error);
                    }


                  });




            }

          });

    //customAlert("convoca2");
  });









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
      customAlert("se ha enviado tus resultados");
      changePage('index.html#my_conv');
    }else{
      loadingClose();
      customAlert(response2.message_error);
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
  loadingOpen("Procesando solicitud");

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

        customAlert("Te has unido al grupo  "+team_name);
        location.reload();
        

      }else{
        if (response.error_code==2) {


          customAlert(response.message_error+team_name);
        }else
        {
          customAlert(response.message_error);
          

          changePage('index.html#my_conv');



        }
      }

    });
    loadingClose();
  });


}


function select_own_team(team){

  console.log("asdasd");
  $(team).parent().find("li").addClass("green").removeClass("red");
  $(team).addClass("red").removeClass("green");



}


function zone(teams){
  event.preventDefault();
  $("#convocate .container .your_team .ui-btn-active").size();


  if ($("#convocate .your_team .ui-btn-active").size()==0) {
    customAlert("Debes seleccionar uno de tus equipos antes de continuar");
    return  false;
  }else if ($("#convocate .vs_team2 .ui-btn-active").size()==0) {
    customAlert("Debes seleccionar un equipo contrincante antes de continuar");
    return  false;
  }else{
    if(confirm('Esta seguro que desea seleccionar estos dos equipos?')) 
      {} else{ return(false);}

  }
  var myTeam=$("#convocate .your_team .ui-btn-active a:nth-child(2)");
  var vsTeam=$("#convocate .vs_team2 .ui-btn-active a:nth-child(2)");
  $(".two_teams").html(" ");
  $(".two_teams").html('<div style="display:none">aqui</div>'+
    '<ul theId="'+
    $(myTeam).attr("theId")+
    '" data-role="listview" data-inset="true"  data-theme="c">'+
    '<li data-icon="false"><a href="#">'+
    $(myTeam).attr("theName")+
    '</a></li>'+
    '</ul>'+
    '<b>V.S.</b>'+
    '<ul theId="'+
    $(vsTeam).attr("theId")+
    '" data-role="listview" data-inset="true" data-theme="c">'+
    '<li data-icon="false"><a href="#">'+
    $(vsTeam).attr("theName")+
    '</a></li>'+
    '</ul>');
  changePage('index.html#convocate2');



  
}










function vs_team(vs_steam){
  loadingOpen("Cargando");

  console.log("asdasd");
  var post_values={
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_city:vs_steam.value
  };
  $.post(server+"teams/get_fromcity", post_values, function(response) {
    event.preventDefault();
    response = jQuery.parseJSON(response);


    if (!(response.error)) {

      $(".vs_team2").html(" ");
      $(".vs_team2").append('<label>Equipos Contrarios</label><ul id="lista2" data-role="listview" <data-inset="true" ></ul>');
      for (var i = 0; i < response.length  ; i++) {
        var j=i+1;
        $(".vs_team2 #lista2").append('<li><a onclick="selectTeam(this)" href="#">'+
          response[i].name+
          '</a>'+
          '<a onclick="carryDataInfo(this)" theName="'+response[i].name+'" theId="'+response[i].id+'" theDescription="'+response[i].description+'" href="#infoTeam" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>'+
          '</li>');
      }
      $('#lista2').listview();
    }else{
      customAlert(response.message_error);
      
    }
    loadingClose();














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
    for (var i = 0; i < response.length  ; i++) {
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
  console.log('Accion Cancelada');
}


}



//for unique photo


$( document ).on( "pageshow", "#home", function() {
  $(".your_team").html(" ");
  $(".vs_team2").html(" ");
  $("#join .teams_city").html("");

  var heightPhoto=$("#photo_container").height();
  $(".dataUser").css("min-height",heightPhoto+20);



  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email')
  };

  $.post(server+"teams/getData", post_values, function(response) {
   response = jQuery.parseJSON(response);
   if (response.points==null ) 
    {response.points=0;};

  $("#points").html("<h2>Soles de golombiao</h2><h3>"+response.points+"</h3><img src='images/sun.png'>");

  var image = document.getElementById('photo');
  if (localStorage.getItem("photo_"+localStorage.getItem("id_user"))) {
    image.src = localStorage.getItem("photo_"+localStorage.getItem("id_user"));
  }else if(response.fb_id != "0" && response.fb_id != null){

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
  event.preventDefault();


  $.post(server+"teams/verify_team", post_values, function(response) {
    event.preventDefault();


    response = jQuery.parseJSON(response);
    if (!(response.error)) {
      $(".your_team").html(" ");
      
      
      $(".your_team").append('<label>Tus Equipos</label><ul id="lista" data-role="listview" data-split-icon="gear"  data-inset="true" ></ul>');
      for (var i = 0; i < response.length  ; i++) {
        var j=i+1;
        $(".your_team #lista").append('<li><a onclick="selectTeam(this)" href="#">'+
          response[i].name+
          '</a>'+
          '<a onclick="carryData(this)" theName="'+response[i].name+'" theId="'+response[i].id+'" theDescription="'+response[i].description+'" href="#deleteTeam" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>'+
          '</li>');
      }
      $('#lista').listview();
    }else{
      customAlert("Debes ser el creador de un equipo para poder convocar a juego");
      
      changePage('index.html#play');
    }
  });

});

function selectTeam(element){

  $(element).parents('ul').find('li').each(function(key,value){
    $(value).removeClass("ui-btn-active");

    console.log("asdasqwe");

  });
  $(element).parents('li').addClass("ui-btn-active");


  console.log("werwer");



}


function carryData(element){ 

  $("#deleteTeam h3").html($(element).attr("theName"));
  $("#deleteTeam p").html($(element).attr("theDescription"));
  $("#deleteTeam a").attr("theId",$(element).attr("theId"));


}
function carryDataInfo(element){ 

  $("#infoTeam h3").html($(element).attr("theName"));
  $("#infoTeam p").html($(element).attr("theDescription"));
  $("#infoTeam a").attr("theId",$(element).attr("theId"));

}
function carryDataSubscription(element){ 

  $("#deleteSubscription h3").html($(element).attr("theName"));
  $("#deleteSubscription a").attr("theId",$(element).attr("theId"));

}


function deleteTeam(team){

  if(confirm('Al eliminar el equipo, se eliminara todas las convocatorias referentes a este equipo;Esta seguro que desea borrar el equipo?')) 
  {} else{ return(false);}

  loadingOpen("Procesando");



  console.log("delete");

  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_team:$(team).attr("theId"),
  };

  $.post(server+"teams/deleteTeam", post_values, function(response) {

    response = jQuery.parseJSON(response);
    if (!(response.error)) {

      customAlert("Se ha eliminado el equipo exitosamente");
      changePage('index.html#convocate');
      loadingClose();
      $.mobile.refresh();


    }else{


      customAlert("ha habido un error procesando tu solicitud");
      loadingClose();
      $.mobile.refresh();


    }


    console.log("delete");


  });


}



function deleteSubscription(team){

  if(confirm('Esta seguro que desea salirse del equipo?')) 
    {} else{ return(false);}



  console.log("delete");

  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    id_team:$(team).attr("theId"),
  };

  $.post(server+"teams/deleteSubscription", post_values, function(response) {

    response = jQuery.parseJSON(response);
    if (!(response.error)) {

      customAlert("Se ha eliminado la subscripcion existosamente");
      changePage('index.html#join');


    }else{


      customAlert("ha habido un error procesando tu solicitud");


    }


    console.log("delete");


  });


}






$( document ).on( "pageshow", "#my_conv", function() {
  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
    tipo_consulta:0
  };
  var emptyPage=false;


  $.post(server+"teams/conv_team", post_values, function(response) {
    var check;


    response = jQuery.parseJSON(response);
    if (!(response.error)) {
      $("#title_mi_reto").html('<div class="title_my_conv">Mis convocatorias</div>');
      for (var i = 0; i < response.length  ; i++) {
        var j=i+1;
        if (response[i]["acepta_convocatoria"]=="0") {
         check='<img  src="images/uncheck.png">'
       }else{

         check='<img  src="images/check.png">'


       }
       $("#title_mi_reto").append('<div href="#"  class=" convocate_teams" id_equipo1="'+
        response[i]["equipo_1"]+
        '" id_equipo2="'+
        response[i]["equipo_2"]+
        '" principio="'+
        response[i]["principio"]+
        '" id="'+response[i]["id"]+
        '"><a data-role="button" class="reto_my_team">'+
        response[i]["equipo_1_name"]+
        '  V.s. '+
        response[i]["equipo_2_name"]+
        '  </a><div class="check">'+
        check+
        '</div><div class="date_conv">'+
        response[i]["hora"]+
        ' '+
        response[i]["fecha"]+
        '</div></div>');

     }
     $('#title_mi_reto a').button();



   }else{
    customAlert("En este momento no has convocado ningun Juego");
    emptyPage=true;
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
       response2[i]["equipo_2"]+
       '"  id_equipo2="'+
       response2[i]["equipo_1"]+
       '" principio="'+
       response2[i]["principio"]+
       '" id="'+response2[i]["id"]+
       '"><a class="reto_my_team">'+
       response2[i]["equipo_2_name"]+
       '  V.s. '+
       response2[i]["equipo_1_name"]+
       '</a><div class="check">'
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
       $('#title_mi_reto3 a').button();


     }else{

       check='<img  onClick="customAlert("Hello World!")" src="images/check.png">'


     }




     $("#title_mi_reto2").append('<div class=" convocate_teams"  id_equipo1="'+response2[i]["equipo_2"]+'"  id_equipo2="'+response2[i]["equipo_1"]+'" principio="'+response2[i]["principio"]+'" id="'+response2[i]["id"]+'"><a data-role="button" class="reto_my_team">'+response2[i]["equipo_2_name"]+'  V.s. '+response2[i]["equipo_1_name"]+'</a><div class="check">'+check+'</div><div class="date_conv">'+response2[i]["hora"]+' '+response2[i]["fecha"]+'</div></div>');
     $('#title_mi_reto2 a').button();
   }

 }else{
  customAlert("En este momento no te han convocado a ningun Juego");
  if (emptyPage){changePage("index.html#pre_conv");
  location.reload();}

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
        theme: 'a',
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
          var first_name=response.first_name.split(" ");
          var last_name=response.last_name.split(" ");
          $("#name_user").html(first_name[0] +' '+ last_name[0]);
          $("#age_user").html(response.age);

          $("#location_user").html(response.city);
                //city=post_values.city;
                $.mobile.loading( 'hide');
                changePage('index.html#home');
              }else{
                $.mobile.loading( 'hide');
                customAlert(response.message_error);
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
    zoom: 4
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

    loadingOpen("Registrando");

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
        
        loadingClose();
        changePage('index.html#login');
        customAlert("Usuario creado exitosamente");
        cleanforms(); 
      }else{
        customAlert(response.message_error);
        loadingClose();
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
    //customAlert("añadida ubicación en: lat"+pos.lat()+"long"+pos.lng);
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
    
    console.warn('ERROR(' + err.code + '): ' + err.message);

    if(err.code==1){
      customAlert("por favor habilita tu geolocalización");
    }
    var myLocation = new google.maps.LatLng(4.127285,-73.696289);

    geolocation  = new google.maps.Map(document.getElementById('geolocation'), {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: myLocation,
      zoom:4
    });
    google.maps.event.addListener(geolocation,'click',function  (event) {


      placeMarker(event.latLng);



    });


  }

  $( document ).on( "pageshow", "#convocate2", function() {
    navigator.geolocation.getCurrentPosition(load_map_loc, load_map,{maximumAge:60000, timeout:10000, enableHighAccuracy:true});
    $("#dateConvocate").mobiscroll().date();
    $("#timeConvocate").mobiscroll().time();
    $('#dateConvocate').mobiscroll('option', { lang: 'es',animate:'flip',dateFormat:'yy-mm-dd'});
    $('#timeConvocate').mobiscroll('option', { lang: 'es',animate:'flip' });

    $( "#form_convocate2" ).validate({
            rules:{
              fecha:{
                required:true,
              },
              hora:{
                required:true
              },
              tipo_juego:{
                required:true
              },
              principio:{
                required:true
              }
            },

            submitHandler: function( form ) {
               loadingOpen("Solicitando encuentro");


                      var post_values={
                        session_id:localStorage.getItem('session_id'),
                        email:localStorage.getItem('email'),
                        equipo_1:$($("#convocate2 .container ul")[0]).attr("theId"),
                        equipo_2:$($("#convocate2 .container ul")[1]).attr("theId"),

                      };
                      $(':input', "#convocate2").each(function(index, input_element) {
                       post_values[input_element.name] = $(input_element).val();

                     });
                      $.post(server+"teams/guardar_convocatoria", post_values, function(response) {

                        response = jQuery.parseJSON(response);


                        if (!(response.error)) {
                          loadingClose();
                          customAlert("se ha enviado una solicitud al lider del otro equipo");
                          
                          changePage('index.html#my_conv');
                        }else{
                          loadingClose();
                          customAlert(response.message_error);
                        }

                      });
            }

          });









    //customAlert("convoca2");
  });
  $( document ).on( "pageshow", "#create", function() {
    $( "#form_create" ).validate({
      rules:{
        name:{
          required:true,
        },
        departamento:{
          required:true
        },
        ciudad:{
          required:true
        },
        descripcion:{
          required:true
        },
        zone_team:{
          required:true
        },

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

            customAlert("El equipo se creó exitosamente");
            changePage('#convocate');

          }else{
            customAlert(response.message_error);

            changePage('index.html#play');
          }
        });
      }

    });
});
$( document ).on( "pageshow", "#join", function() {


  var post_values= {
    session_id:localStorage.getItem('session_id'),
    email:localStorage.getItem('email'),
  };

  $.post(server+"teams/myTeams", post_values, function(response) {



    response = jQuery.parseJSON(response);

    if (!(response.error)) {
      $(".miJoinTeams").html(" ");
      
      
      $(".miJoinTeams").append('<label>Tus Equipos</label><ul id="listaJoin" data-role="listview" data-split-icon="gear"  data-inset="true" ></ul>');
      for (var i = 0; i < response.length  ; i++) {
        var j=i+1;
        $(".miJoinTeams #listaJoin").append('<li><a onclick="selectTeam(this)" href="#">'+
          response[i]['name_team']+
          '</a>'+
          '<a onclick="carryDataSubscription(this)" theName="'+response[i]['name_team']+'" theId="'+response[i]['id']+'" theDescription="'+response[i]['description']+'" href="#deleteSubscription" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>'+
          '</li>');
      }
      $('#listaJoin').listview();
    }else{

      customAlert("No estas suscrito a ningun equipo");
    }



  });





  $("#join .ciudad").on( "change",
    function  (e) {
      loadingOpen("Cargando equipos");


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
            customAlert("no hay equipos para esta ciudad o municipio");
          }else{
            for (var i = response.length - 1; i >= 0; i--) {
              console.log(response[i]);
              var team_div='<div data-role="collapsible team_'+response[i].id+'" team_id="'+response[i].id+'">'+
              '<h3>'+response[i].name+'</h3>'+
              '<div data-role="fieldcontain" class="join_checkbox" >'+
              '<fieldset data-role="controlgroup">'+
              '<input type="checkbox" name="join_to_team" id="checkbox" class="custom" value="'+response[i].id+'" team_name="'+response[i].name+'"/>'+
              '<label for="checkbox">Unirse</label>'+
              '</fieldset>'+
              '</div>'+

              '<p>'+
              '<div class="colapse jugadores_'+response[i].id+'"  data-role="collapsible" data-theme="b" data-content-theme="d" data-inset="false">'+
              '<h3>Jugadores</h3>'+
              '<ul data-role="listview">'+


              '</ul>'+
              '</div>';


            // '<div class="jugadores_'+response[i].id+'">'+
            //   '<ul class="colapse" data-role="collapsible">'+
            //     '<h3>Jugadores</h3>'+
            //   '</ul>'+
            // '</div>'+
            // '</div>'+
            // '</p>'+
            // '</div>';
            $("#join .teams_city").append(team_div);

          }
          $('#join').find('div[data-role=collapsible]').collapsible();
          

          
          $('#join').find("input[type='checkbox']").checkboxradio();
          $('#join').find(".colapse").one('expand', function () {
            loadingOpen("Cargando Jugadores");

            var myClass=$(this).attr("class");
            myClass=myClass.split(" ");
            var id=myClass[1].split("_");
            var post_values= {
              session_id:localStorage.getItem('session_id'),
              email:localStorage.getItem('email'),
              team_id:id[1],
            };
            $.post(server+"teams/get_players", post_values, function(response) {

              response = jQuery.parseJSON(response);

              for (var i = 0; i <response.length  ; i++) {
                $("."+myClass[1]).find("ul[data-role=listview]").append("<li class='userData'myId='"+response[i]['id_user']+"'>"+response[i]['name_user']+"</li>");                                      
              }
              $('#join').find("."+myClass[1]).find("ul[data-role=listview]").listview();
            });
            loadingClose();
          });
        }




      }else{
        customAlert(response.message_error);
      }

    });
loadingClose();
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

        customAlert("El equipo se creo exitosamente");
        
        changePage('index.html#convocate');

      }else{
        customAlert(response.message_error);
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
              function(message) { customAlert('Se ha cancelado la subida'); },
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
            customAlert(response.message_success);
            $.mobile.loading( 'hide' );
          }

          function fail(error) {
            customAlert("Ha ocurrido un error: Code = " + error.code);
            $.mobile.loading( 'hide' );
          }








          function changePage(page){

            if(navigator.userAgent.match(/OS/i) || navigator.userAgent.match(/Android/i)){


              $.mobile.changePage(page);

            }else{

              window.location.href = page;

            }


          }



  function customAlert(message)
          {


            if(navigator.userAgent.match(/OS/i) || navigator.userAgent.match(/Android/i)){
                            function alertDismissed() {
                                // hacer algo
                            }

                            navigator.notification.alert(
                                message,     // mensaje (message)
                                alertDismissed,         // función 'callback' (alertCallback)
                                'Alerta Golombiao',            // titulo (title)
                                'Cerrar'                // nombre del botón (buttonName)
                            );

            }else{

              alert(message);


          }
        }