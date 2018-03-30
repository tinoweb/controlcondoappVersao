// JavaScript Document

function download_arquivo(path,tipo,nome){
    //salert(path);
    console.log(cordova.file.externalRootDirectory);
    var fileTransfer = new FileTransfer();
    //var uri = encodeURI("http://portal.mec.gov.br/seb/arquivos/pdf/Profa/apres.pdf");
    var uri = encodeURI(path);
	
    var filePath = cordova.file.externalRootDirectory+'Download/'+nome+'.'+tipo;
    //var filePath = cordova.file.applicationStorageDirectory+'Download/'+nome+'.'+tipo;
    fileTransfer.download(
        uri,
        filePath,
        function(entry) {
            console.log("download complete: " + entry.fullPath);
            //notifica('Download/Download Concluído90 /ok',0,0);
			var path = entry.toURL(); //**THIS IS WHAT I NEED**
            window.open(path, "_system");
			/*window.cordova.plugins.FileOpener.OpenFile(path, function(data){
				alert('ok');
			}, function(error){
			 	alert('message: '  + error.message);
			});
			alert('oo');*/
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


