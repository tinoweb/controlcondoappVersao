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
function carrega_tickets(id_ocorrencias){
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
//
//// FUNCAO CARREGA COMENTARIOS
//function carrega_comunicado_comentario(id){
//    var dados = '';
//	$.ajax({
//		type: 'POST',
//		url: localStorage.getItem('DOMINIO')+'appweb/comunicado_get.php',
//        crossDomain: true,
//        beforeSend : function() { },
//        complete   : function() { },
//        data       : {id_comunicado : id, id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo : '3'},
//        dataType   : 'json',
//		success: function(retorno){
//            for (x in retorno) {
//                if(retorno[x]['id_usuario_condominio'] == $( "#DADOS #ID_USER" ).val()){
//                    var comente_edit = 'onClick="notifica_comentario(\''+retorno[x]['id_comunicado_comentario']+'\',\''+retorno[x]['comentario']+'\')"';
//                }else{
//                    var comente_edit = '';
//                }
//                var dado = '<div class="comentario" '+comente_edit+' ><div class="morador_foto" style="background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+');"></div><div class="txt_comentario"><div class="nome_comentario">'+retorno[x]['nome']+'</div>'+retorno[x]['comentario']+'</div></div>';
//                dados = dados + dado;
//            }
//            
//            $( "#comentario_comunicado" ).html(dados);
//		},
//        error      : function() {
//            $( "#comentario_comunicado" ).html('');
//        }
//	});	
//}
//
//// FUNCAO CARREGA COMENTARIOS
//function carrega_comunicado_curtida(id){
//    var dados = '';
//	$.ajax({
//		type: 'POST',
//		url: localStorage.getItem('DOMINIO')+'appweb/comunicado_get.php',
//        crossDomain: true,
//        beforeSend : function() { },
//        complete   : function() { },
//        data       : {id_comunicado : id, tipo : '4', id_usuario_condominio : $( "#DADOS #ID_USER" ).val()},
//        dataType   : 'json',
//		success: function(retorno){
//            $( "#ncurtida" ).html(retorno[0]['curtida']);
//            if(retorno[0]['curtiu'] > 0){
//                afed('#descurtir','#curtir','','',3);
//                var mudar = document.getElementById('comentario_curtir');
//				mudar.setAttribute("onclick", "curtir_descurtir("+id+")");
//
//            }else{
//                afed('#curtir','#descurtir','','',3);
//                var mudar = document.getElementById('comentario_curtir');
//				mudar.setAttribute("onclick", "curtir_descurtir("+id+")");
//            }
//		},
//        error      : function() {
//        }
//	});	
//}
//
//function curtir_descurtir(id){
//	$.ajax({
//		type: 'POST',
//		url: localStorage.getItem('DOMINIO')+'appweb/comunicado_curtida.php',
//        data       : {id_comunicado : id, id_comentario : '0', id_usuario_condominio : $( "#DADOS #ID_USER" ).val()},
//		success: function(retorno){
//            carrega_comunicado_curtida(id);
//        },
//        error      : function() {
//        }
//	});	
//}
//
//function comentar(){
//    if($('#txt_comenta').val().length > 0 ){
//        var dados = $( '#form_comenta' ).serialize();
//        $.ajax({
//            type: 'POST',
//            url: localStorage.getItem('DOMINIO')+'appweb/comunicado_comentar.php',
//            data: dados,
//            success: function(retorno){
//                $( "#txt_comenta" ).val('');
//                carrega_comunicado_comentario($( "#id_comunicado_comentario" ).val());
//            },
//            error      : function() {
//            }
//        });	
//    }
//}
//
//function notifica_comentario(id_comunicado_comentario,txt) {
//    localStorage.setItem('COMENTARIO',id_comunicado_comentario);
//    localStorage.setItem('COMENTARIO_TXT',txt);
//    navigator.notification.confirm(
//        'Escolha uma opção',  // message
//        comentario_ee,              // callback to invoke with index of button pressed
//        'Comentario',            // title
//        'Editar,Excluir'          // buttonLabels
//    );
//}
//
//function comentario_ee(buttonIndex) {
//    if(buttonIndex == 1){
//        afed('#bg_box4','','','',3);
//        $('#comentario_edit').val(localStorage.getItem('COMENTARIO_TXT'));
//    
//    }else if(buttonIndex == 2){
//        
//        navigator.notification.confirm(
//            'Voce tem certeza que deseja excluir esse comentario',  // message
//            comentario_excluir,              // callback to invoke with index of button pressed
//            'Excluir Comentario',            // title
//            'Sim,Não'          // buttonLabels
//        );
//    
//    }else{
//             
//    }    
//}
//
//function comentario_excluir(buttonIndex) {
//    if(buttonIndex == 1){
//        $.ajax({
//            type: 'POST',
//            url: localStorage.getItem('DOMINIO')+'appweb/comunicado_comentar_delete.php',
//            data: {id : localStorage.getItem('COMENTARIO')},
//            success: function(retorno){
//                carrega_comunicado_comentario($( "#id_comunicado_comentario" ).val());
//            },
//            error      : function() {
//                alert('Erro ao Exluir');
//            }
//        });	
//    }    
//}
//
//function comentario_update() {
//    $.ajax({
//        type: 'POST',
//        url: localStorage.getItem('DOMINIO')+'appweb/comunicado_comentar_update.php',
//        data: {id_comentario : localStorage.getItem('COMENTARIO'),comentario : $('#comentario_edit').val()},
//        success: function(retorno){
//            carrega_comunicado_comentario($( "#id_comunicado_comentario" ).val());
//            afed('','#bg_box4','','',1);
//        },
//        error      : function() {
//        }
//    });	
//}
//
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

