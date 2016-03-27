/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		//document.addEventListener("pause", onPause, false);
		StatusBar.styleDefault();
		
		//PUSH

		
		navigator.geolocation.watchPosition(gpsonSuccess, gpsonError, {frequency: 3000, enableHighAccuracy: true});
		
		
		cordova.plugins.backgroundMode.enable();
		
		cordova.plugins.backgroundMode.onactivate = function () {
			
				var myTimer = setInterval(onPause3, 3000);

				// Modify the currently displayed notification
				cordova.plugins.backgroundMode.configure({
				text:'22Doing heavy tasks.'
														 
				});
			
		}
		
		
    }
}

function callbackFn(location){
	//console.log('[js] BackgroundGeoLocation callback:  ' + location.latitude + ',' + location.longitude);
	
	$("#distanza2").append("<span style = 'font-size: 18px;'>"+ location.latitude +"</span>");
	//onBackgroundSuccess2(location);
	
	$.ajax({
		   type:"GET",
		   url:"http://gtechplay.com/mycollection/www/Posizione.asp",
		   contentType: "application/json",
		   data: {Lat:5,Longi:6},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   //$.each(result, function(i,item){
		   //});
		   
		   
		   },
		   error: function(){
		   
		   
		   },
		   dataType:"jsonp"});
}

function failureFn(error){
	alert('Geolocation Error');
	
}


function scatta(){
	
	//alert()
	
	navigator.camera.getPicture(Successo, onFail, { quality: 30,
								destinationType: Camera.DestinationType.DATA_URL,
								encodingType: Camera.EncodingType.PNG,
								targetWidth: 200,
								targetHeight: 200
								});
}

function getFoto() {

	navigator.camera.getPicture(uploadPhoto, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
		targetWidth: 200,
		targetHeight: 200
	});
}

function onFail(message) {
	navigator.notification.alert(
								 'Nessuna foto archiviata',  // message
								 alertDismissed,         // callback
								 'Foto',            // title
								 'OK'                  // buttonName
								 );
}

function onPhotoURISuccess(imageURI) {
	// Uncomment to view the image file URI
	// console.log(imageURI);
	// Get image handle
	//
	var largeImage = document.getElementById('foto');
	// Unhide image elements
	//
	largeImage.style.display = 'block';
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	//
	largeImage.src = imageURI;
}

function uploadPhoto(imageURI) {
	var largeImage = document.getElementById('foto');
	// Unhide image elements
	//
	largeImage.style.display = 'block';
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	//
	largeImage.src = imageURI;
	
	
	var options = new FileUploadOptions();
	options.fileKey="file";
	
	options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	options.mimeType="image/jpeg";
	
	var params = {};
	params.value1 = "test";
	params.value2 = "param";
	
	options.params = params;
	
	var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://msop.it/uploadIPHONE.php"), win, fail, options);
}



function Successo(imageData) {
	
	localStorage.setItem("Foto1", "data:image/png;base64," + imageData);
	
	var image000 = document.getElementById('foto');
	image000.src = localStorage.getItem("Foto1");
	
}

function win(r) {
	console.log("Code = " + r.responseCode);
	console.log("Response = " + r.response);
	console.log("Sent = " + r.bytesSent);
	alert(r.response);
}

function fail(error) {
	alert("An error has occurred: Code = " + error.code);
}

function gpsonSuccess(position){
	
	//alert(ciao)
	
	var ciao = position.coords.latitude;
	var ciao1 = position.coords.longitude;
	
	//alert(ciao)
	
	$("#distanza").html("<span style = 'font-size: 18px;'>"+ ciao +","+ ciao1 +"</span>");
	
	//onBackgroundSuccess2(position)
	
}


function gpsonError(){
	
	//alert()
	
}

function onBackgroundSuccess(location) {
var R = 6371; // Radius of the earth in km
var dLat = (location.latitude-this.lastLatitude) * (Math.PI/180);  // deg2rad below
var dLon = (location.longitude-this.lastLongitude) * (Math.PI/180);
var a =
Math.sin(dLat/2) * Math.sin(dLat/2) +
Math.cos(this.lastLatitude * (Math.PI/180)) * Math.cos(location.latitude * (Math.PI/180)) *
Math.sin(dLon/2) * Math.sin(dLon/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
var distance = R * c; // Distance in km
this.lastLatitude = location.latitude;
this.lastLongitude = location.longitude;

//Set timer HTML to total distance
var tracker = Ext.ComponentQuery.query("timer #gps")[0];
var value = Math.round(runtap.globals.totalDistance * 100) / 100;

$("#distanza2").html(value + "<span style = 'font-size: 18px;'>km</span>");


}


function onBackgroundSuccess2(position) {
	/*
	var R = 6371; // Radius of the earth in km
	var dLat = (location.latitude-this.lastLatitude) * (Math.PI/180);  // deg2rad below
	var dLon = (location.longitude-this.lastLongitude) * (Math.PI/180);
	var a =
	Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.cos(this.lastLatitude * (Math.PI/180)) * Math.cos(location.latitude * (Math.PI/180)) *
	Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var distance = R * c; // Distance in km
	this.lastLatitude = location.latitude;
	this.lastLongitude = location.longitude;
	
	//Set timer HTML to total distance
	var tracker = Ext.ComponentQuery.query("timer #gps")[0];
	var value = Math.round(runtap.globals.totalDistance * 100) / 100;*/
	
	var by = position.coords.latitude;
	var by2 = position.coords.longitude;
	
	$("#distanza2").append("<span style = 'font-size: 18px;'>"+ by +"</span>");
	
	
}

function onPause() {
	
	//var myTimer = setInterval(onPause3, 2000);
	
}

function onPause3() {
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;//January is 0, so always add + 1
	
	var ora = today.getHours()
	if(ora<10){ora="0"+ora}
	
	var minuti = today.getMinutes();
	if(minuti<10){minuti="0"+minuti}
	
	var secondi = today.getSeconds();
	if(secondi<10){secondi="0"+secondi}
	
	//self.document.formia.ora.value = ora + ":" + minuti
	
	var yyyy = today.getFullYear();
	if(dd<10){dd="0"+dd}
	if(mm<10){mm="0"+mm}
	today = dd+'/'+mm+'/'+yyyy;
	
	$("#distanza3").html("<span style = 'font-size: 18px;'>"+ ora +","+ minuti +","+ secondi +"</span>");
	
	//if(secondi==10){
		//clearInterval(myTimer);
	//}
	
	$.ajax({
		   type:"GET",
		   url:"http://gtechplay.com/mycollection/www/Posizione.asp",
		   contentType: "application/json",
		   data: {Lat:3,Longi:4},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   //$.each(result, function(i,item){
		   //});
		   
		   
		   },
		   error: function(){
		   
		   
		   },
		   dataType:"jsonp"});
	
}
