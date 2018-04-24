// JavaScript Document

// FUNCAO CARREGA TODOS OS COMUNICADOS
function carrega_ocorrencias(tipo){
	"use strict";
//	app.controler_pull("comunicados");
	if(tipo === 4){
		$("#busca_ocorrencia").val("");
	}
	var pg = 0;
    if(tipo === 0 || tipo===3 || tipo===4){
        pg = 1;
    }else{
        var offset = $('.ocorrencia').length;
        if(offset !== 0){
            pg = (offset/6)+1;
        }else{
            pg = 1;
        }
    }
    if(parseInt(pg) !== parseFloat(pg)) { 
        pg = pg+1; 
    }
    var dados = '';
	var dado  = '';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/ocorrencia_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&pg='+parseInt(pg)+'&titulo='+$("#busca_ocorrencia").val()+'&id_morador='+$( "#DADOS #ID_MORADOR" ).val()+'&tipo='+tipo,
        dataType   : 'json',
		success: function(retorno){
            //alert(retorno);
            for (x in retorno) {
                
                dado = '<div class="ocorrencia"  onClick="carrega_ocorrencia(\''+retorno[x]['id_ocorrencia']+'\');"><div class="topo_comunicado"><span>'+retorno[x]['data_criacao']+'</span><strong>'+retorno[x]['situacao_descricao']+'</strong></div><div class="comunicado_titulo" style="margin-top:20px">'+retorno[x]['descricao']+'</div><div class="feed_home">';
				dado = dado +'</div></div>';
                dados = dados + dado;
            }
			if(tipo != 1){
				$("#main_ocorrencia").html("");
			}
			$( "#main_ocorrencia" ).append(dados);
			afed('#ocorrencias','#home','','',3,'ocorrencias');	
            
            //$("pull-comunicados").scrollTop(50);
		},
        error      : function() {
            alert('Erro Ocorrencia');
        }
	});    
}

// FUNCAO CARREGA UMA OCORRENCIA ESPECIFICO
function carrega_ocorrencia(id){
    if(id === 0){
        $("#form_ocorrencia #id_ocorrencia").val(id);
        $("#form_ocorrencia #id_condominio").val($( "#DADOS #ID_CONDOMINIO" ).val());
        $("#form_ocorrencia #id_solicitante").val($( "#DADOS #ID_MORADOR" ).val());
        $("#form_ocorrencia #criado_por").val(localStorage.getItem('MORADOR_NOME'));
        $("#form_ocorrencia #id_situacao").val('1');
        $("#form_ocorrencia #solicitante").val(localStorage.getItem('MORADOR_NOME'));
        $("#form_ocorrencia #situacao").val('Aberto');
    }else{
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/ocorrencia_get.php',
            crossDomain: true,
            beforeSend : function() { },
            complete   : function() { },
            data       : {id_ocorrencia : id, id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo : '1'},
            dataType   : 'json',
            success: function(retorno){
                $("#form_ocorrencia #id_ocorrencia").val(retorno[0]['id_ocorrencia']);
                $("#form_ocorrencia #id_condominio").val(retorno[0]['id_condominio']);
                $("#form_ocorrencia #id_solicitante").val(retorno[0]['id_solicitante']);
                $("#form_ocorrencia #criado_por").val(retorno[0]['criado_por']);
                $("#form_ocorrencia #id_situacao").val(retorno[0]['id_situacao']);
                $("#form_ocorrencia #solicitante").html(retorno[0]['nome']);
                $("#form_ocorrencia #situacao").html('Status: '+retorno[0]['situacao_descricao']);
                $("#form_ocorrencia #descricao").val(retorno[0]['descricao']);
                afed('#ocorrencia,#bt_oco_finaliza','#ocorrencias,#home,#bt_oco_salva','','#form_ocorrencia #descricao',3);
                if(retorno[0]['id_situacao'] == 10){
                    afed('','#bt_oco_finaliza','','',3);
                }
                localStorage.setItem('TELA_ATUAL','ocorrencia');
            },
            error      : function() {
                alert('erro ocorrencia');
            }
        });
    }
    
}

// FUNCAO CARREGA TODOS OS COMUNICADOS
function carrega_tickets(tipo){
    var id_ocorrencia = $("#form_ocorrencia #id_ocorrencia").val();
	"use strict";
//	app.controler_pull("comunicados");
	var pg = 0;
    if(tipo === 0){
        pg = 1;
    }else{
        var offset = $('.ocorrencia').length;
        if(offset !== 0){
            pg = (offset/6)+1;
        }else{
            pg = 1;
        }
    }
    if(parseInt(pg) !== parseFloat(pg)) { 
        pg = pg+1; 
    }
    var dados = '';
	var dado  = '';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/ticket_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&pg='+parseInt(pg)+'&id_ocorrencia='+id_ocorrencia+'&tipo='+tipo,
        dataType   : 'json',
		success: function(retorno){
            //alert(retorno);
            for (x in retorno) {
                
                dado = '<div class="ticket"  onClick="carrega_ticket(\''+retorno[x]['id_ocorrencia_ticket']+'\',\''+retorno[x]['id_ocorrencia']+'\');"><div class="topo_comunicado"><span>'+retorno[x]['data_criacao']+'</span><strong>'+retorno[x]['situacao_descricao']+'</strong></div><div class="comunicado_titulo" style="margin-top:20px">'+retorno[x]['descricao']+'</div><div class="feed_home">';
				dado = dado +'</div></div>';
                dados = dados + dado;
            }
			if(tipo != 1){
				$("#main_ticket").html("");
			}
			$( "#main_ticket" ).append(dados);
			afed('#ocorrencias_ticket','#ocorrencia','','',3,'tickets');	
            
            //$("pull-comunicados").scrollTop(50);
		},
        error      : function() {
            alert('Erro tickets');
        }
	});    
}

function carrega_ticket(id,id_ocorrencia){
    if(id === 0){
        $("#form_ticket #id_ocorrencia_ticket").val(id);
        $("#form_ticket #id_ocorrencia").val(id_ocorrencia);
        $("#form_ticket #id_condominio").val($( "#DADOS #ID_CONDOMINIO" ).val());
        $("#form_ticket #id_situacao").val('1');
        $("#form_ticket #situacao").val('Aberto');
    }else{
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/ticket_get.php',
            crossDomain: true,
            beforeSend : function() { },
            complete   : function() { },
            data       : {id_ocorrencia_ticket : id, id_ocorrencia : id_ocorrencia, id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo : '1'},
            dataType   : 'json',
            success: function(retorno){
                //alert(retorno);
                $("#form_ticket #id_ocorrencia_ticket").val(retorno[0]['id_ocorrencia_ticket']);
                $("#form_ticket #id_ocorrencia").val(retorno[0]['id_ocorrencia']);
                $("#form_ticket #id_condominio").val(retorno[0]['id_condominio']);
                $("#form_ticket #id_situacao").val(retorno[0]['id_situacao']);
                $("#form_ticket #situacao").val(retorno[0]['situacao_descricao']);
                $("#form_ticket #descricao").val(retorno[0]['descricao']);
                afed('#ticket,#bt_ticket_finaliza','#ocorrencias_ticket,#home,#bt_ticket_salva','','#form_ticket #descricao',3);
                if(retorno[0]['id_situacao'] == 10){
                    afed('','#bt_ticket_finaliza','','',3);
                }
                localStorage.setItem('TELA_ATUAL','ticket');
            },
            error      : function() {
                alert('erro ticket');
            }
        });
    }
    
}

//
//
//// FUNCAO CARREGA UM ANEXO
//function carrega_comunicado_arq(id){
//	
//    var dados = '';
//    var dado  = '';
//	var ext;
//	var num;
//	$.ajax({
//		type: 'POST',
//		url: localStorage.getItem('DOMINIO')+'appweb/comunicado_get.php',
//        crossDomain: true,
//        beforeSend : function() { },
//        complete   : function() { },
//        data       : {id_comunicado : id, tipo : '2'},
//        dataType   : 'json',
//		success: function(retorno){
//            for (x in retorno) {
//				num  = parseInt(x);
//				num += 1;
//				ext = retorno[x]['nome_arquivo'];
//				ext = ext.split('.');
//                dado = '<button class="col button button-small button-fill color-gray" onClick="download_arq_comunicado(\''+retorno[x]['caminho']+'\',\''+retorno[x]['nome_arquivo']+'\');" style="top: 18px;margin-top:10px"><i class="fa fa-cloud-download"></i>DOWNLOAD ANEXO ' + num + '  ('+ext[1]+')</button>';
//                dados = dados + dado;
//            }
//            $("#comunicado_anexo_retorno").html(dados);
//		},
//        error      : function() {            
//
//        }
//	});	
//}

//function download_arq_comunicado(caminho,arquivo) {
//    caminho      = caminho.replace("../","");
//    var path     = localStorage.getItem('DOMINIO')+caminho+arquivo;
//	var extencao = arquivo.split(".");
//	var ext      = extencao[1];
//    console.log(cordova.file.externalRootDirectory);
//	statusDom    = document.querySelector('#status');
//	$('#downloadProgress').css({"display":"block"});
//  	app2.progressbar.set('#status', "0");
//	
//    var fileTransfer = new FileTransfer();
//    var uri = encodeURI(path);
//	
//    var filePath = cordova.file.externalRootDirectory+'Download/'+arquivo;
//	fileTransfer.onprogress = function(progressEvent) {
//		if (progressEvent.lengthComputable) {
//			var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
//			statusDom.innerHTML = perc + "%...";
//			app2.progressbar.set('#status', perc);
//		}
//	};
//    fileTransfer.download(
//        uri,
//        filePath,
//        function(entry) {
//            console.log("download complete: " + entry.fullPath);
//			$('#downloadProgress').css({"display":"none"});
//			var path = entry.toURL(); //**THIS IS WHAT I NEED**
//			var ref = cordova.InAppBrowser.open(path, '_system', 'location=yes');
//
//        },
//        function(error) {
//            console.log("download error source " + error.source);
//            console.log("download error target " + error.target);
//        },
//        false,
//        {
//            headers: {
//                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
//            }
//        }
//    );
//}

