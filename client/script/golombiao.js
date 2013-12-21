



function  selectTab(object){

  $(object).parents(".AccordionPanelContent").find(".TabbedPanelsContentGroup div").css("display","none");
  $(object).parents(".AccordionPanelContent").find(".TabbedPanelsContentGroup div:nth-child("+$(object).val()+")").fadeIn();



}




$( document ).on( "pageshow", "#golombiao", function() {
  loadingOpen("Cargando Informacion");

	var Accordion1 = new Spry.Widget.Accordion("Accordion1",{useFixedPanelHeights:false, defaultPanel:-1});
//var TabbedPanels1 = new Spry.Widget.TabbedPanels("TabbedPanels1");
//var TabbedPanels2 = new Spry.Widget.TabbedPanels("TabbedPanels2");
//var TabbedPanels3 = new Spry.Widget.TabbedPanels("TabbedPanels3");
//var TabbedPanels4 = new Spry.Widget.TabbedPanels("TabbedPanels4");
//var TabbedPanels2 = new Spry.Widget.TabbedPanels("TabbedPanels2");








		var xmlhttp;
         xmlhttp = new XMLHttpRequest();
        var url = "http://servicedatosabiertoscolombia.cloudapp.net/v1/Programa_Presidencia_Colombia_Joven/informaciongolombiao?$format=json";
        
        xmlhttp.open('GET',url,true);
        xmlhttp.send(null);
        xmlhttp.onreadystatechange = function() {

               if (xmlhttp.readyState == 4) {
                  if ( xmlhttp.status == 200) {
                  	response = jQuery.parseJSON(xmlhttp.responseText);
                  	$("#uno .texto").html(response.d[0].enunciado);
                  	$("#c-uno .parrafo").html(response.d[0].descripcion);
                  	$(".rules .TabbedPanelsTabGroup li:nth-child(1)").html(response.d[1].enunciado);
                  	$(".rules .TabbedPanelsTabGroup li:nth-child(2)").html(response.d[2].enunciado);
                  	$(".rules .TabbedPanelsTabGroup li:nth-child(3)").html(response.d[3].enunciado);
                  	$(".rules .TabbedPanelsTabGroup li:nth-child(4)").html(response.d[4].enunciado);
                  	$(".rules .TabbedPanelsTabGroup li:nth-child(5)").html(response.d[5].enunciado);
                  	$(".rules .TabbedPanelsTabGroup li:nth-child(6)").html(response.d[6].enunciado);


                    $(".rules select option:nth-child(1)").html(response.d[1].enunciado);
                    $(".rules select option:nth-child(2)").html(response.d[2].enunciado);
                    $(".rules select option:nth-child(3)").html(response.d[3].enunciado);
                    $(".rules select option:nth-child(4)").html(response.d[4].enunciado);
                    $(".rules select option:nth-child(5)").html(response.d[5].enunciado);
                    $(".rules select option:nth-child(6)").html(response.d[6].enunciado);




                  	$(".rules .TabbedPanelsContentGroup div:nth-child(1)").html(response.d[1].descripcion);
                  	$(".rules .TabbedPanelsContentGroup div:nth-child(2)").html(response.d[2].descripcion);
                  	$(".rules .TabbedPanelsContentGroup div:nth-child(3)").html(response.d[3].descripcion);
                  	$(".rules .TabbedPanelsContentGroup div:nth-child(4)").html(response.d[4].descripcion);
                  	$(".rules .TabbedPanelsContentGroup div:nth-child(5)").html(response.d[5].descripcion);
                  	$(".rules .TabbedPanelsContentGroup div:nth-child(6)").html(response.d[6].descripcion);

                  	$(".values .TabbedPanelsTabGroup li:nth-child(1)").html(response.d[13].enunciado);
                  	$(".values .TabbedPanelsTabGroup li:nth-child(2)").html(response.d[14].enunciado);
                  	$(".values .TabbedPanelsTabGroup li:nth-child(3)").html(response.d[15].enunciado);
                  	$(".values .TabbedPanelsTabGroup li:nth-child(4)").html(response.d[16].enunciado);
                  	$(".values .TabbedPanelsTabGroup li:nth-child(5)").html(response.d[17].enunciado);
                  	$(".values .TabbedPanelsTabGroup li:nth-child(6)").html(response.d[18].enunciado);
                  	$(".values .TabbedPanelsTabGroup li:nth-child(7)").html(response.d[19].enunciado);


                    $(".values select option:nth-child(1)").html(response.d[13].enunciado);
                    $(".values select option:nth-child(2)").html(response.d[14].enunciado);
                    $(".values select option:nth-child(3)").html(response.d[15].enunciado);
                    $(".values select option:nth-child(4)").html(response.d[16].enunciado);
                    $(".values select option:nth-child(5)").html(response.d[17].enunciado);
                    $(".values select option:nth-child(6)").html(response.d[18].enunciado);
                    $(".values select option:nth-child(7)").html(response.d[19].enunciado);

                    $(".values .TabbedPanelsContentGroup div:nth-child(1) span").html(response.d[13].enunciado);
                    $(".values .TabbedPanelsContentGroup div:nth-child(2) span").html(response.d[14].enunciado);
                    $(".values .TabbedPanelsContentGroup div:nth-child(3) span").html(response.d[15].enunciado);
                    $(".values .TabbedPanelsContentGroup div:nth-child(4) span").html(response.d[16].enunciado);
                    $(".values .TabbedPanelsContentGroup div:nth-child(5) span").html(response.d[17].enunciado);
                    $(".values .TabbedPanelsContentGroup div:nth-child(6) span").html(response.d[18].enunciado);
                    $(".values .TabbedPanelsContentGroup div:nth-child(7) span").html(response.d[19].enunciado);

                  	$(".values .TabbedPanelsContentGroup div:nth-child(1) p").html(response.d[13].descripcion);
                  	$(".values .TabbedPanelsContentGroup div:nth-child(2) p").html(response.d[14].descripcion);
                  	$(".values .TabbedPanelsContentGroup div:nth-child(3) p").html(response.d[15].descripcion);
                  	$(".values .TabbedPanelsContentGroup div:nth-child(4) p").html(response.d[16].descripcion);
                  	$(".values .TabbedPanelsContentGroup div:nth-child(5) p").html(response.d[17].descripcion);
                  	$(".values .TabbedPanelsContentGroup div:nth-child(6) p").html(response.d[18].descripcion);
                  	$(".values .TabbedPanelsContentGroup div:nth-child(7) p").html(response.d[19].descripcion);

                    $("#cuatro .texto").html(response.d[7].tipoinformacion);
                    $(".involved .TabbedPanelsTabGroup li:nth-child(1)").html(response.d[7].enunciado);
                    $(".involved .TabbedPanelsTabGroup li:nth-child(2)").html(response.d[8].enunciado);
                    $(".involved .TabbedPanelsTabGroup li:nth-child(3)").html(response.d[9].enunciado);

                    $(".involved select option:nth-child(1)").html(response.d[7].enunciado);
                    $(".involved select option:nth-child(2)").html(response.d[8].enunciado);
                    $(".involved select option:nth-child(3)").html(response.d[9].enunciado);


                    $(".involved .TabbedPanelsContentGroup div:nth-child(1) p").html(response.d[7].descripcion);
                    $(".involved .TabbedPanelsContentGroup div:nth-child(2) p").html(response.d[8].descripcion);
                    $(".involved .TabbedPanelsContentGroup div:nth-child(3) p").html(response.d[9].descripcion);


                    $("#cinco .texto").html(response.d[10].tipoinformacion);

                    $(".moments .TabbedPanelsTabGroup li:nth-child(1)").html(response.d[10].enunciado);
                    $(".moments .TabbedPanelsTabGroup li:nth-child(2)").html(response.d[11].enunciado);
                    $(".moments .TabbedPanelsTabGroup li:nth-child(3)").html(response.d[12].enunciado);


                    $(".moments select option:nth-child(1)").html(response.d[10].enunciado);
                    $(".moments select option:nth-child(2)").html(response.d[11].enunciado);
                    $(".moments select option:nth-child(3)").html(response.d[12].enunciado);

                    $(".moments .TabbedPanelsContentGroup div:nth-child(1) p").html(response.d[10].descripcion);
                    $(".moments .TabbedPanelsContentGroup div:nth-child(2) p").html(response.d[11].descripcion);
                    $(".moments .TabbedPanelsContentGroup div:nth-child(3) p").html(response.d[12].descripcion);


                    var myselect = $(".AccordionPanelContent select");
                        myselect[0].selectedIndex = 0;
                        myselect.selectmenu("refresh");


                    loadingClose();

                  	
                  	
                       
                 }
                 else
                       alert("Error ->" + xmlhttp.responseText);
              }
        };







});
