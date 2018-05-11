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
	var cor_status='yellow';
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
                cor_status = retorno[x]['id_situacao'];
				if(cor_status == 1){
					cor_status = '#696969';
				}else if(cor_status=='10'){
					cor_status='green';
				}else{
					cor_status='yellow;'
				}
                dado = '<div class="card_ocorrencia" onClick="carrega_ocorrencia(\''+retorno[x]['id_ocorrencia']+'\');"  >'
						+'<div>'
							+'<div>Ocorrência: <strong>'+retorno[x]['id_ocorrencia']+'</strong></div>'
							+'<div>'
								+'<i class="fa fa-circle" style="color:'+cor_status+'"></i> '
								+'<strong>'+retorno[x]['situacao_descricao']+'</strong>'
							+'</div>'
							+'<div><span>Data de Abertura: '+retorno[x]['data_criacao']+'</span></div>'							
						+'</div>'+
					'<div>Descrição: '+retorno[x]['descricao']+'</div>';
				dado = dado +'</div>';
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
	//var cor_status='';
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
				var cor_status='';
				cor_status=retorno[0]['id_situacao'];
				
				if(cor_status == '1'){
					cor_status = '#696969';
				}else if(cor_status=='10'){
					cor_status='green';
				}else{
					cor_status='yellow';
				}
				
                $("#form_ocorrencia #id_ocorrencia").val(retorno[0]['id_ocorrencia']);
                $("#form_ocorrencia #id_condominio").val(retorno[0]['id_condominio']);
                $("#form_ocorrencia #id_solicitante").val(retorno[0]['id_solicitante']);
                $("#form_ocorrencia #criado_por").val(retorno[0]['criado_por']);
                $("#form_ocorrencia #id_situacao").val(retorno[0]['id_situacao']);
				$("#form_ocorrencia #statusbar").css('background-color', cor_status);
                $("#form_ocorrencia #solicitante").html(retorno[0]['nome']);
                $("#form_ocorrencia #situacao").html(retorno[0]['situacao_descricao']);
                $("#form_ocorrencia #descricao").val(retorno[0]['descricao']);
                afed('#ocorrencia,#bt_oco_finaliza','#ocorrencias,#home,#bt_oco_salva','','#form_ocorrencia #descricao',3);
                if(retorno[0]['id_situacao'] == 10){
                    afed('','#bt_oco_finaliza','','',3);
                }
				carrega_ocorrencia_arq(id);
                localStorage.setItem('TELA_ATUAL','ocorrencia');
            },
            error      : function() {
                alert('erro ocorrencia');
            }
        });
    }
    
}



//Buscar anexo de ocorrencia 


// FUNCAO CARREGA UM ANEXO
function carrega_ocorrencia_arq(id){
	
    var dados = '';
    var dado  = '';
	var ext;
	var num;
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/ocorrencia_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : {id_ocorrencia : id, tipo : '2', id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val()},
        dataType   : 'json',
		success: function(retorno){
            for (x in retorno) {
				num  = parseInt(x);
				num += 1;
				ext = replaceAll(retorno[x]['arquivo'], "\/","_");
				
				 
              //  dado = '<button class="col button button-small button-fill color-gray" style="top: 18px; margin-top:10px">teste</button>';
				//<input type="hidden" id="num_anexo_"+num >
                dado = '<button type="button"  class="btn btn-default" onClick=download_arq_ocorrencia("'+ext+'"); >'
							+' <span class="glyphicon glyphicon-paperclip"></span>  Anexo ' +num+  '  </button><p></p>';
                //alert(retorno[x]['caminho']);
                dados = dados + dado;
            }
            $("#ocorrencia_anexo_retorno").html(dados);
		},
        error : function() {
			alert('Erro ao carregar arquivos');
            

        }
	});	
}

function replaceAll(str, de, para){
    var pos = str.indexOf(de);
    while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
    return (str);
}

function download_arq_ocorrencia(arquivo) {
    //salert(path); /controlcondo/docs/26/ocorrencia/f90553d3a2d733013c29b379b7667b3d.jpg
	
    arquivo      = replaceAll(arquivo,"..","");

	arquivo      = replaceAll(arquivo,"_","\/");


    var path     = localStorage.getItem('DOMINIO')+arquivo;
	var extencao = arquivo.split(".");
	var ext      = extencao[1];
    //alert(path);
    console.log(cordova.file.externalRootDirectory);

	statusDom    = document.querySelector('#status');
	$('#downloadProgress').css({"display":"block"});
  	app2.progressbar.set('#status', "0");
	
    var fileTransfer = new FileTransfer();
    //var uri = encodeURI("http://portal.mec.gov.br/seb/arquivos/pdf/Profa/apres.pdf");
    var uri = encodeURI(path);
	
    var filePath = cordova.file.externalRootDirectory+'Download/'+arquivo;
	fileTransfer.onprogress = function(progressEvent) {
		if (progressEvent.lengthComputable) {
			var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
			statusDom.innerHTML = perc + "%...";
			app2.progressbar.set('#status', perc);
		}
	};
    //var filePath = cordova.file.applicationStorageDirectory+'Download/'+arquivo;
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
			//alert(JSON.stringify(ref, null, 4));
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



// FUNCAO CARREGA PAGINA NOVA OCORRENCIA
function ocorrencia_incluir(){

    $( "#add_visitante #nome" ).val('');    

    
    afed('#add_ocorrencia','#ocorrencias','','','2','add_ocorrencia');


	("#add_ocorrencia #nome").focus();
}



// FUNCAO CARREGA TODOS OS TICKETS
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
	var cor_status='yellow';
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
              
                cor_status = retorno[x]['id_situacao'];
				if(cor_status == 1){
					cor_status = 'green';
				}else if(cor_status=='10'){
					cor_status='red';
				}else{
					cor_status='yellow;'
				}
				
                dado = '<div class="card_ocorrencia" onClick="carrega_ticket(\''+retorno[x]['id_ocorrencia_ticket']+'\',\''+retorno[x]['id_ocorrencia']+'\');">'
						+'<i class="fa fa-circle" style="color:'+cor_status+'"></i> <label style="font-weight: normal;">'+retorno[x]['situacao_descricao']+'</label><br>'
						+'<label style="font-weight: normal;">'+retorno[x]['descricao']+'</label><br>'		
						+'<label style="font-weight: normal;">'+retorno[x]['data_criacao']+'</label><br>';
								
				dado = dado +'</div>';
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
				var cor_status='';
				cor_status=retorno[0]['id_situacao'];
				
				if(cor_status == '1'){
					cor_status = 'green';
				}else if(cor_status=='10'){
					cor_status='red';
				}else{
					cor_status='yellow';
				}
				
				cor_status = '<i class="fa fa-circle" style="color:'+cor_status+';" id="icon_status_ticket"></i>';
                $("#form_ticket #id_ocorrencia_ticket").val(retorno[0]['id_ocorrencia_ticket']);
                $("#form_ticket #id_ocorrencia").val(retorno[0]['id_ocorrencia']);
                $("#form_ticket #id_condominio").val(retorno[0]['id_condominio']);
				$("#form_ticket #data_ticket").html(retorno[0]['data_criacao']);
                $("#form_ticket #id_situacao").val(retorno[0]['id_situacao']);
                $("#form_ticket #situacao").html(cor_status +' '+ retorno[0]['situacao_descricao']);
                $("#form_ticket #descricao").val(retorno[0]['descricao']);
				
                //$("#form_ticket #icon_status_ticket").css("color", cor_status);
				
				
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

