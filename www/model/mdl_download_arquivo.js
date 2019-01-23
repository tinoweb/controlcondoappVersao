// JavaScript Document
function download_arquivo(path,tipo,nome){
	
	$('#downloadProgress').css({"display":"block"});
  	app2.progressbar.set('#status', "0");
	
    var fileTransfer = new FileTransfer();
    var uri          = encodeURI(path);
	var statusDom    = document.querySelector('#status');
	var filePath     = cordova.file.externalApplicationStorageDirectory+'Download/'+nome+'.'+tipo;
   
	fileTransfer.onprogress = function(progressEvent) {
		if (progressEvent.lengthComputable) {
			var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
			statusDom.innerHTML = perc + "%...";
			app2.progressbar.set('#status', perc);
		}
	};
		
    fileTransfer.download(
        uri,
        filePath,
        function(entry) {
			$('#downloadProgress').css({"display":"none"});
            var ref = cordova.InAppBrowser.open(uri, '_system', 'location=yes');
			//var ref = cordova.InAppBrowser.open(uri, '_blank', 'location=yes');
			window.open(path, "_system");
			
		 },
        function(error) {
			$('#downloadProgress').css({"display":"none"});
			alert('erro');
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
			alert(error.code);
			alert(filePath);
	
        },
        false,
        {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );
}


