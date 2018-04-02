// JavaScript Document

function carrega_documentos(tipo){
	"use strict";
	app.controler_pull("documentos");
    var pg = 0;
	if(tipo === 4){
		$("#busca_documento").val("");
	}
    if(tipo === 0 || tipo===3 || tipo===4){
        pg = 1;
    }else{
        //var offset = $("#retorno_documentos").find(".documento").size();
        var offset = $(".documento").length;
        if(offset !== 0){
            pg = (offset/10)+1;
        }else{
            pg = 1;
        }
		if(parseInt(pg) !== parseFloat(pg)) { 
        	pg = pg+1; 
    	}
    }
    var dados     = '';
	var dado      = '';
	var tipo_     = '';  
	var caminho   = '';
	$.ajax({
		type: 'POST',
        url        : localStorage.getItem('DOMINIO')+"appweb/documento_get.php",
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_usuario_condominio : $( "#DADOS #ID_USER" ).val(), pg : parseInt(pg), busca_doc : $('#busca_documento').val() },
        dataType   : 'json',
		success: function(retorno){
            //alert(retorno);
            for (x in retorno) {
                caminho = retorno[x]['local'].split('../');
                tipo_ = caminho[1].split('.');
                dado  = '<div class="documento"><span>Categoria: '+retorno[x]['descricao']+'</span><div style="width:100%"><div class="documento_foto" style="background-image:url(img/'+retorno[x]['tipo']+')"></div><strong>'+retorno[x]['titulo']+'</strong></div><div style="width:100% ; float: left"><div class="block" style="margin:8px"><button style="margin-left:26%;width:50%" class="col button button-fill color-green" href="#" onClick="download_arquivo(\'';
				dado += localStorage.getItem('DOMINIO')+caminho[1]+'\',\''+tipo_[1]+'\',\''+retorno[x]['titulo']+'\')"><i class="fa fa-cloud-download"></i>DOWNLOAD</button></div></div></div>';
                dados = dados + dado;
            }
			if(tipo === 0){
				$( "#main_documento" ).html('');
			}
            $( "#main_documento" ).append(dados);
			afed('#documentos','#home','','',3);
            localStorage.setItem('TELA_ATUAL','documentos');		
		},
        error      : function() {
            //alert('Erro ao carregar');

        }
	});	
}
