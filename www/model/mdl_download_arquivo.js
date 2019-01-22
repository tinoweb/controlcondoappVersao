// JavaScript Document

function download_arquivo(path,tipo,nome){
    //salert(path);
    console.log(cordova.file.externalRootDirectory);
	statusDom    = document.querySelector('#status');
	$('#downloadProgress').css({"display":"block"});
  	app2.progressbar.set('#status', "0");
	
    var fileTransfer = new FileTransfer();
    //var uri = encodeURI("http://portal.mec.gov.br/seb/arquivos/pdf/Profa/apres.pdf");
    var uri = encodeURI(path);
	
    var filePath = cordova.file.externalRootDirectory+'Download/'+nome+'.'+tipo;
    //var filePath = cordova.file.applicationStorageDirectory+'Download/'+nome+'.'+tipo;
	//$("#wait").show();
	fileTransfer.onprogress = function(progressEvent) {
		if (progressEvent.lengthComputable) {
			var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
			statusDom.innerHTML = perc + "%...";
			app2.progressbar.set('#status', perc);
		}
	};
	
	uri = 'www.controlcondo.com.br/controlcondo/v2/docs/63/documento/e7a387e37a2d815cf143003d21e9fb5c.pdf';
	
    fileTransfer.download(
        uri,
        filePath,
        function(entry) {
            console.log("download complete: " + entry.fullPath);
			$('#downloadProgress').css({"display":"none"});
            //notifica('Download/Download Concluído90 /ok',0,0);
			var path = entry.toURL(); //**THIS IS WHAT I NEED**
			//alert(path);
			var ref = cordova.InAppBrowser.open(path, '_system', 'location=yes');
			var myCallback = function(event) { console.log('envio ok'); }
			ref.addEventListener('loadstart', myCallback);
			ref.addEventListener('loaderror', myCallback);
			ref.removeEventListener('loadstart', myCallback);
			alert('sucesso');
            //window.open(path, "_system");

        },
        function(error) {
			$('#downloadProgress').css({"display":"none"});
            //console.log("download error source " + error.source);
            //console.log("download error target " + error.target);
			alert('error');
			//alert(uri);
			//alert(filePath);
			
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


