// JavaScript Document

function downloadURI(uri, name) 
{
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}

function download_arquivo(path,tipo,nome){
	 downloadURI("https://www.cdn.renault.com/content/dam/Renault/BR/universo-renault/salao-do-automovel/salao-do-automovel-2016-gama.jpg.ximg.l_8_m.smart.jpg", "teste");
	alert("teste");
}


/*

function download_arquivo(path,tipo,nome){
	 downloadURI("http://192.168.0.48:3000/img/bg_home.jpg", "teste");
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
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
			alert('error');
			alert(error);
			
          
        },
        false,
        {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );
}*/


