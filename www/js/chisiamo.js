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

function aprimail () {

window.plugin.email.open({
	to:      'info@i-app.it',
	subject: 'Contattaci',
	body:    "",
	isHtml:  true
});


}

						  
function gomappa(){
	var addressLongLat = '41.873811,12.480266';
	
	//window.open("http://maps.apple.com/?q="+addressLongLat, '_blank');
	
	window.open("google.navigation:q=41.873811,12.480266&mode=d" , '_system');
	

	refff.addEventListener('exit', function (event) {
		
		setTimeout (function(){
			refff.close();
		}, 500);
		
	});
}

function gofacebook(){
	var ref = window.open('https://m.facebook.com/assogameanswer', '_system', 'location=no');
}