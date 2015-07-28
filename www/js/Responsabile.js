document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

last_click_time = new Date().getTime();

document.addEventListener('click', function (e) {

  click_time = e['timeStamp'];

  if (click_time && (click_time - last_click_time) < 1000) { e.stopImmediatePropagation();

  e.preventDefault();

  return false;

  }

  last_click_time = click_time;

  }, true);



	$( document ).on( "mobileinit", function() {
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    $.mobile.phonegapNavigationEnabled = true
    $.mobile.pushStateEnabled = false;
   	super.setIntegerProperty("loadUrlTimeoutValue", 60000);
	});
	
	$(document).on("pagecreate", "#TerminiPage", function () { 
		$.mobile.loading('hide');
	}); 
    

}


