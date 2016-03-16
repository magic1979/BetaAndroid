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

	$('input, select')
	.on('focus', function (e) {
		$('header, footer').css('position', 'absolute');
		})
	.on('blur', function (e) {
		$('header, footer').css('position', 'fixed');

		});

	var ciao = "";
	var ciao1 = "";
	var distanza = "";
	var Categoria="";
	var Provincia="";
	var model = device.model;
	var db;
	var dbCreated = false;
	var codiceProdotto;
	
	
	//checkPos();
	//agg();
	$(".spinner").hide();
}

function gomappa(){
	var addressLongLat = '41.851869, 12.493830';maps
	
	window.open("http://maps.apple.com/?q="+addressLongLat, '_blank');
}

function gofacebook(){
	var ref = window.open('https://m.facebook.com/TrecastelliPizzeria/', '_system', 'location=no');
}