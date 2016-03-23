
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:@
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler@
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		//document.addEventListener("resume", onResume, false);
        app.receivedEvent('deviceready');

		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		
			var ortcClient = null,
            url = 'http://ortc-developers.realtime.co/server/2.1/',
            applicationKey = 'L1YnIH',
            authenticationToken = '00012212',
            channel = 'my_channel';
		
		last_click_time = new Date().getTime();
		
		document.addEventListener('click', function (e) {
								  
								  click_time = e['timeStamp'];
								  
								  if (click_time && (click_time - last_click_time) < 1000) { e.stopImmediatePropagation();
								  
								  e.preventDefault();
								  
								  return false;
								  
								  }
								  
								  last_click_time = click_time;
								  
								  }, true);
		
		
		var connectionStatus = false;
		connectionStatus = navigator.onLine ? 'online' : 'offline';
		
		if(connectionStatus=='online'){
			createClient(); 
		}
		else{
			
			
		}
    }
	
}

function createClient() {
	loadOrtcFactory(IbtRealTimeSJType, function (factory, error) {
	// Checks if we have successfuly created the factory
	if (error != null) {
		console.error(error);
	}
	else {
		// Creates the factory
		ortcClient = factory.createClient();                    
		ortcClient.setClusterUrl(url);

		// Callback for when we're connected
		ortcClient.onConnected = function (ortc) {
			Log("Connected to Realtime server " + ortcClient.getUrl());
			Log("Transport used: " + ortcClient.getProtocol());
			ortcClient.subscribe(channel, true, onMessage);
		};

		// Callback for when we're subscribed to a channel
		ortcClient.onSubscribed = function (ortc, channel) {
			Log("Subscribed channel " + channel);
		};

		// Callback for when we get an exception
		ortcClient.onException = function (ortc, exception) {
			Log('Exception: ' + exception);
		};

		// Connects to the ORTC server
		Log("Connecting...");
		ortcClient.connect(applicationKey, authenticationToken);
	}
});
}

function onMessage (client, channel, message) {
	Log('Message received from channel ' + channel + ': ' + message);
}

function cattura() {
	navigator.camera.getPicture(Successo, onFail, { 
					quality: 30,
					destinationType: Camera.DestinationType.FILE_URI,
					sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
					encodingType: Camera.EncodingType.PNG,
					targetWidth: 200,
					targetHeight: 200
					});
}
		
function Successo(imageData) {

	localStorage.setItem("imgvolantino", "data:image/png;base64," + imageData);

	var image000 = document.getElementById('myImageVol');
	image000.src = localStorage.getItem("imgvolantino");
}
		
function send() {
	var message = document.getElementById('txtMessage').value;
	Log("Message sent to channel: " + channel + ": " + message);
	ortcClient.send(channel, message);
}
		
function Log (text) {
	document.getElementById('taLog').value += "\n" + text;
}





