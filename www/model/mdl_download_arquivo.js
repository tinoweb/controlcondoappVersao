// JavaScript Document

function download_arquivo(path,tipo,nome){
    //salert(path);
    console.log(cordova.file.externalRootDirectory);
    var fileTransfer = new FileTransfer();
    //var uri = encodeURI("http://portal.mec.gov.br/seb/arquivos/pdf/Profa/apres.pdf");
    var uri = encodeURI(path);
	
    var filePath = cordova.file.externalRootDirectory+'Download/'+nome+'.'+tipo;
    //var filePath = cordova.file.applicationStorageDirectory+'Download/'+nome+'.'+tipo;
	//$("#wait").show();
	fileTransfer.onprogress = function(progressEvent) {
		if (progressEvent.lengthComputable) {
		  //loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
			//alert(progressEvent.loaded);
		} else {
		  //loadingStatus.increment();
			
		}
	};
    fileTransfer.download(
        uri,
        filePath,
        function(entry) {
            console.log("download complete: " + entry.fullPath);
            //notifica('Download/Download Concluído90 /ok',0,0);
			var path = entry.toURL(); //**THIS IS WHAT I NEED**
			//alert(path);
			var ref = cordova.InAppBrowser.open(path, '_system', 'location=yes');
			var myCallback = function(event) { console.log('envio ok'); }
			ref.addEventListener('loadstart', myCallback);
			ref.addEventListener('loaderror', myCallback);
			ref.removeEventListener('loadstart', myCallback);
            //window.open(path, "_system");

        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            //console.log("upload error code" + error.code);
        },
        false,
        {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );
}


