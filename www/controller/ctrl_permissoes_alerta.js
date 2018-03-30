// JavaScript Document

function notifica(msg,vib,bep){

	if(msg != 0){
        
		var notifica = msg.split("/");
		navigator.notification.alert(
			notifica[1],         // message
			null,                // callback
			notifica[0],         // title
			notifica[2]          // buttonName
        );
	}
	
	if(vib != 0){
		navigator.notification.vibrate(vib);
	}
	
	if(bep != 0){
		navigator.notification.beep(bep);
	}
}