
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
    }
  });
