// JavaScript Document

// FUNCAO CARREGA TODOS OS COMUNICADOS
function carrega_comunicados(tipo){
	"use strict";
    //alert($("#busca_comunicados").val());
    //alert(tipo);
	app.controler_pull("comunicados");
	if(tipo === 4){
		$("#busca_comunicados").val("");
	}
	var pg = 0;
    if(tipo === 0 || tipo===3 || tipo===4){
        pg = 1;
    }else{
        //var offset = $("#comunicados_retorno").find(".comunicado").size();
        var offset = $('.comunicado').length;
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
		url: localStorage.getItem('DOMINIO')+'appweb/comunicado_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        //data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val() },
        data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&pg='+parseInt(pg)+'&titulo='+$("#busca_comunicados").val()+'&id_usuario_condominio='+$( "#DADOS #ID_USER" ).val(),
        dataType   : 'json',
		success: function(retorno){
            //alert(retorno);
            for (x in retorno) {
                
                var dados_grupo = retorno[x]['grupo'];
                //alert(dados_grupo);
                var grupos = '';
                for(y in dados_grupo){
                    if(dados_grupo[y]['titulo'] == 'Morador'){
                        var grupo = '';
                    }else{
                        var grupo = '<div class="TagPadrao" style="background-color:'+dados_grupo[y]['fundo_cor']+';color: '+dados_grupo[y]['texto_cor']+';border: 1px solid '+dados_grupo[y]['fundo_cor']+';">'+dados_grupo[y]['titulo']+'</div>';
                    }
                    grupos = grupos+grupo;
                    //alert(grupos);
                }
                if(grupos.length>0){
                    grupos = '<div style="float:left; width: 80%;">'+grupos+'</div>';
                }
                dado = '<div class="comunicado"  onClick="carrega_comunicado(\''+retorno[x]['id_comunicado']+'\');"><div class="topo_comunicado"><div class="morador_foto" style="background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+');"></div><span>'+retorno[x]['data_criacao']+'</span><strong>'+retorno[x]['criado']+'</strong>'+grupos+'</div><div class="comunicado_titulo" style="margin-top:20px">'+retorno[x]['titulo']+'</div><div class="feed_home">';
				if(retorno[x]['comentario']>0){
                    dado = dado + '<img width="15" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKFSURBVHhe7ZpNThwxEIUni5A7kEjJ6YgghAMEqXsLsi3Ekmsku5A1YcHfVTJiP7E7hdSUbeia107NdPuT3oJx+fnVUDM9Cy8qlUqlUqlUOG3b7rTGHbXWXXs9eq02XI+Nsb8ba7+E7NTGerSnp7ve6D5xyHbIuLvQA7Uj4+v5+bvW2Iek8RbJ/wNv15oE/+4dpgy3UsYdUFvD8RvDZ75nZL9/c+49LW8sIWNj3I9+9vCdQMvD8Ruff+GdnHygpY0nZH2W3bolLQ2HGazo5a0Bzg8bKAPnhw2UgfPDBsrA+WEDZeD8sIEycH6pAa8vLTo2i7Q+QmrA60uLjs0irY+QGvD60qJjs0jrI6QGvL606Ngs0voI2EAZOD9soAycHzZQBs4PGygD55ca8PrSomOzSOsjpAa8vrTo2CzS+gipAa8vLTo2i7Q+QmrA60uLjs0irY+ADZSB88MGysD5YQNl4PywgTJwfqkBr5eKbEYD9pca8HqpyGY0YH+pAa+XimxGA/aXGvB6qchmNGB/2EAZOD9soAycHzZQBs4PGygD54cNlIHzwwbKwPn9pnlfkAjXSvom4drJvK7I/L9LUsvGuc+L1eoNHZ0ksW+41rok9e+C5F3SsIAaay+PjflIx0ek9gzUzd7FxVuykUEXJW8TpqWUnYZE7RDdrH1R8okwCd21U2uvvOGSHVBEqWlI1WXkM9or77EPX5UtTXt29sl/zH4lmuga6U8DX+8MJoFvMDQaGuZNdjLuZ5gG/jrtng6hyTD6vNEg/xj7w1+jbRPjtWnoiXZMk5em4UlUOmFemQaqmj65aaDlmZCYBlqZF93j0D8WZ/sGdPhp8L/09uivSmUUFou/iNJ/GAhnlLQAAAAASUVORK5CYII="><span style="font-size: 10px;color: #7f8c8d">&nbsp;'+retorno[x]['comentario']+'&nbsp; &nbsp; &nbsp; </span>';
                }
                if(retorno[x]['curtida']>0){
                    dado = dado + '<img width="15" src="data:image/png;base64,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"><span style="font-size:10px; color: #7f8c8d">&nbsp;'+retorno[x]['curtida']+'</span>&nbsp; &nbsp; </span>';
                }
                if(retorno[x]['anexo']>0){
                    dado = dado + '<img width="15" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASkSURBVHhe7Zr7ixNXFMejVeuzP0gfouCzLfZhtegvohSkFFFBRBFKi7+0ICgrRcUf7Ca5UKiYufcmG7u2u7oiiiDkLxAR/UXQForV1QqyylZrH2uhLYIIbd1+z+TcZPLYvDY7mZudDwwk58zcnM/cO3deiYSEhISEhIRYiUilFgqtN8aV+jgm5SZ8fpVT7YsQYpJQ6hMh1U2h9HCZ5Y6QugPrTeFN2geRSMyNS/VtGenSBTuo03GW8Kb2g15/HVI/G8G41I+wfBlT6v2oUu/GtF6HQ0HElX6Y3xHqj7Y4LIrlMcQzIp1+gdMF7NV6GtY/ZtbFDrmFw2Eqp4NJVOvlkPpCOM4cDuUolVc9keHhCZwekcKdoD7jcPBAoWtxXD/OyumvOewSTSRea0SecEdCfttBDgeLQnn1DN+3cKpEHr34Ta3yBmwTM9sLKd/mcDAolseE9imnmiJPxJzkGtMGJsltHG491eQxcT0YrTwRTaXeMO3gN3dyuLXUI+/OCQ3KExj275m2AjECKsnT+bqZ8gTaiOfaU2oph1tDPfIY9kdHLS96p+N3fuE2BzjcGvyWJ/AbJ02bGAkdHPafSvJ0rT5G8ol8m/p6y26M6pFHL3U3Wx6/OSSSycWc8pexkN+eyTyHdiRNkOV6taDncbMknNQKTvlLNXkI3M8VqtRXtcpju4zZDneBH3DKpVie7i845S9+yGO7a947PCvk6Vhshjza/QG/8yKn7ZTH5yO1yKOXJ9Uqj9xQ28sfTKdf4rQ98hjqP5lC8TkdylehWJ4uZKyT75RykR/ywnHe4ZS/1CMPoa4Gh/2NcSuPnu+vMuyXccpfqskjPpgvdBzJu+/oPPIYBanxI4+bEgh/n5doTB7t3rROnoDwrlyhSvWNhXzLHmnT0xoU8RcXUiJPYOdcoTyG78MDicQsDo9IOXkIvszp4Mjvl3IGirnNhZSVJ5B7Susgf4JDI2KNPIGh3ZkrRqlDHC4Bhf6bLRizfgWK5TFiblWSjyaTb3HKf+jNK4b2n1woPVObyKkSsN5dLvw7DpVglTwR13p7viC5lcNloVk/t26Zty87e3snF8sf7Op6hdMF8sj93nJ5AkW5j5Rp9t+TTj/P4bJ8rvU8rPe3K+EeDkrFnNRqXBgtwOctZpLk/I+BlydQdPZvKFJf4FBFILoZcu5kONICwX4r5AkU5V7VYUec4lBVqNdxOFwzUmaB3D/YOT2iu3smrxpseQKF3XMLlPoMh2oDF0EimVyF7XZD8oBw9EfeyY4olkf+TU4FBxR3lQu8xKGmYIU8gWM6+/8aqZ7QS0YOjwpr5AmavXPFSrmDww3jlcdO/S3Q8gRfBj/iogdwIdPwy0Xr5A0YBftM4ZA4zuG6sFaeQK9P9Z7WICMrXRJ7oas/bHvUK0//1+G0PYjDXfNR/FBeRJ+vds52T4NKXbZe3kDCEBkwQpjB/8OOOIce3kNvaLGsxLIek+VeyF7E8syzbj+9EOWm7EVoPRvCZ71yFZfsPUGf9+qvLaB/ZUPwtOcMUbCgx3+lCdOqya4R6JU1PaSMSbkBh8OHdAi40jU8DwwJCQkJCQkKkcj/IsxYDdBU2bkAAAAASUVORK5CYII="><span style="font-size: 10px;color: #7f8c8d">&nbsp;'+retorno[x]['anexo']+'&nbsp;&nbsp;</span>';
                }
				dado = dado +'</div></div>';
                dados = dados + dado;
            }
            //alert(retorno);
			//dados = '<div id="main_comunicado" class="main">'+dados+'</div>';
			if(tipo != 1){
				$("#main_comunicado").html("");
			}
			$( "#main_comunicado" ).append(dados);
			afed('#comunicados','#home,#comunicados2','','',3,'comunicados');	
            
            $("pull-comunicados").scrollTop(50);
		},
        error      : function() {
            //alert('Erro ao carregar');
        }
	});    
}

// FUNCAO CARREGA UM COMINICADO ESPECIFICO
function carrega_comunicado(id){
	var id_condominio         = $( "#DADOS #ID_CONDOMINIO" ).val();
	var id_usuario_condominio = $( "#DADOS #ID_USER" ).val();
	//alert("Condominio: "+id_condominio+" usuario: "+id_usuario_condominio);
    var dados = '';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/comunicado_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : {id_comunicado : id, id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo : '1', id_usuario_condominio : $( "#DADOS #ID_USER" ).val()},
        dataType   : 'json',
		success: function(retorno){
            //alert(retorno);
            $( ".comunicado_titulo" ).html(retorno[0]['titulo']);
			//alert('classe titulo');
            $( "#comunicados_comentario span" ).html(retorno[0]['titulo'].substring(0,53));
            $( "#comunicados2 .comunicado .topo_comunicado .morador_foto" ).css("background-image", "url(data:image/jpeg;base64,"+retorno[0]['foto']+")");
            $( "#comunicados2 .comunicado .topo_comunicado span" ).html(retorno[0]['data_criacao']);
            $( "#comunicados2 .comunicado .topo_comunicado strong" ).html(retorno[0]['criado']);
            $( "#comunicados2 .comunidado .comunicado_titulo" ).html(retorno[0]['titulo']);
			
            //alert(retorno[0]['texto']);
            $( "#txt_comunicado" ).html(retorno[0]['texto']);
            $( "#id_comunicado_comentario" ).val(id);
            $( "#id_usuario_condominio_comentario" ).val($( "#DADOS #ID_USER" ).val());
            carrega_comunicado_curtida(id);
            if(retorno[0]['anexo'] > 0){
                afed('#comunicados2 .comunidado #anexos_comunicado','','','',1);
                carrega_comunicado_arq(id);
            }
			//alert("fim1");
            if(retorno[0]['ativa_comentarios'] == 1){
                //afed('#comentario_comunicado','','','',1);
                carrega_comunicado_comentario(id);
            }
			//alert("fim2");
			afed('#comunicados2','#comunicados,#home','','',3);
            localStorage.setItem('TELA_ATUAL','comunicado');
			//alert("fim3");
		},
        error      : function() {
            //alert('Erro ao carregar');
        }
	});	
//	processando(1);
//	$.ajax({
//		type: 'POST',
//		url: 'https://www.controlcondo.com.br/controlcondo/appweb/comunicado_get.php',
//		data: 'id='+ID_MORADOR+'&banco='+BANCO+'&id_user='+ID_USER+'&id_comunicado='+id,
//		success: function(retorno){
//			$( "#comunicados2" ).html(retorno);
//			afed('#comunicados2','#comunicados,#home','','',3)
//			processando(0);
//		}
//	});	
}


// FUNCAO CARREGA UM ANEXO
function carrega_comunicado_arq(id){
	
    var dados = '';
    var dado  = '';
	var ext;
	var num;
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/comunicado_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : {id_comunicado : id, tipo : '2'},
        dataType   : 'json',
		success: function(retorno){
            for (x in retorno) {
				num  = parseInt(x);
				num += 1;
				ext = retorno[x]['nome_arquivo'];
				ext = ext.split('.');
                dado = '<button class="col button button-small button-fill color-gray" onClick="download_arq_comunicado(\''+retorno[x]['caminho']+'\',\''+retorno[x]['nome_arquivo']+'\');" style="top: 18px;margin-top:10px"><i class="fa fa-cloud-download"></i>DOWNLOAD ANEXO ' + num + '  ('+ext[1]+')</button>';
                //alert(retorno[x]['caminho']);
                dados = dados + dado;
            }
            $("#comunicado_anexo_retorno").html(dados);
		},
        error      : function() {
            //alert('Erro ao carregar arquivos');
            

        }
	});	
}

// FUNCAO CARREGA COMENTARIOS
function carrega_comunicado_comentario(id){
    //alert(id);
    var dados = '';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/comunicado_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : {id_comunicado : id, id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo : '3'},
        dataType   : 'json',
		success: function(retorno){
            //alert(retorno);
            for (x in retorno) {
                if(retorno[x]['id_usuario_condominio'] == $( "#DADOS #ID_USER" ).val()){
                    var comente_edit = 'onClick="notifica_comentario(\''+retorno[x]['id_comunicado_comentario']+'\',\''+retorno[x]['comentario']+'\')"';
                }else{
                    var comente_edit = '';
                }
                var dado = '<div class="comentario" '+comente_edit+' ><div class="morador_foto" style="background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+');"></div><div class="txt_comentario"><div class="nome_comentario">'+retorno[x]['nome']+'</div>'+retorno[x]['comentario']+'</div></div>';
                dados = dados + dado;
            }
            
            $( "#comentario_comunicado" ).html(dados);
		},
        error      : function() {
            //alert('Erro ao carregar comentario');
            $( "#comentario_comunicado" ).html('');
        }
	});	
}

// FUNCAO CARREGA COMENTARIOS
function carrega_comunicado_curtida(id){
    var dados = '';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/comunicado_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : {id_comunicado : id, tipo : '4', id_usuario_condominio : $( "#DADOS #ID_USER" ).val()},
        dataType   : 'json',
		success: function(retorno){
            //alert(retorno[0]['curtida']);
            $( "#ncurtida" ).html(retorno[0]['curtida']);
            if(retorno[0]['curtiu'] > 0){
                afed('#descurtir','#curtir','','',3);
                var mudar = document.getElementById('comentario_curtir');
				mudar.setAttribute("onclick", "curtir_descurtir("+id+")");

            }else{
                afed('#curtir','#descurtir','','',3);
                var mudar = document.getElementById('comentario_curtir');
				mudar.setAttribute("onclick", "curtir_descurtir("+id+")");
            }
		},
        error      : function() {
            //alert('Erro ao carregar curtidas');
        }
	});	
}

function curtir_descurtir(id){
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/comunicado_curtida.php',
        data       : {id_comunicado : id, id_comentario : '0', id_usuario_condominio : $( "#DADOS #ID_USER" ).val()},
		success: function(retorno){
            //alert(retorno);
            carrega_comunicado_curtida(id);
        },
        error      : function() {
            //alert('Erro ao curtir');
        }
	});	
}

function comentar(){
    if($('#txt_comenta').val().length > 0 ){
        var dados = $( '#form_comenta' ).serialize();
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/comunicado_comentar.php',
            data: dados,
            success: function(retorno){
                //alert(retorno);
                $( "#txt_comenta" ).val('');
                carrega_comunicado_comentario($( "#id_comunicado_comentario" ).val());
            },
            error      : function() {
                //alert('Erro ao curtir');
            }
        });	
    }
}

function notifica_comentario(id_comunicado_comentario,txt) {
    //alert(id_comunicado_comentario);
    localStorage.setItem('COMENTARIO',id_comunicado_comentario);
    localStorage.setItem('COMENTARIO_TXT',txt);
    navigator.notification.confirm(
        'Escolha uma opção',  // message
        comentario_ee,              // callback to invoke with index of button pressed
        'Comentario',            // title
        'Editar,Excluir'          // buttonLabels
    );
}

function comentario_ee(buttonIndex) {
    if(buttonIndex == 1){
        afed('#bg_box4','','','',3);
        $('#comentario_edit').val(localStorage.getItem('COMENTARIO_TXT'));
//        navigator.notification.prompt(
//            '',  // message
//            comentario_update,                        // callback to invoke
//            'Editar Comentario',                    // title
//            ['Salvar','Sair'],                      // buttonLabels
//            //localStorage.getItem('COMENTARIO_TXT')  // defaultText
//            'teste'  // defaultText
//        );
    
    }else if(buttonIndex == 2){
        
        navigator.notification.confirm(
            'Voce tem certeza que deseja excluir esse comentario',  // message
            comentario_excluir,              // callback to invoke with index of button pressed
            'Excluir Comentario',            // title
            'Sim,Não'          // buttonLabels
        );
    
    }else{
             
    }    
}

function comentario_excluir(buttonIndex) {
    //alert($( "#id_comunicado_comentario" ).val());
    if(buttonIndex == 1){
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/comunicado_comentar_delete.php',
            data: {id : localStorage.getItem('COMENTARIO')},
            success: function(retorno){
                //alert(retorno);
                carrega_comunicado_comentario($( "#id_comunicado_comentario" ).val());
            },
            error      : function() {
                alert('Erro ao Exluir');
            }
        });	
    }    
}

function comentario_update() {
    $.ajax({
        type: 'POST',
        url: localStorage.getItem('DOMINIO')+'appweb/comunicado_comentar_update.php',
        data: {id_comentario : localStorage.getItem('COMENTARIO'),comentario : $('#comentario_edit').val()},
        success: function(retorno){
            //alert(retorno);
            carrega_comunicado_comentario($( "#id_comunicado_comentario" ).val());
            afed('','#bg_box4','','',1);
        },
        error      : function() {
            //alert('Erro ao Exluir');
        }
    });	
    //alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
}

function download_arq_comunicado(caminho,arquivo) {
    //salert(path);
    caminho      = caminho.replace("../","");
    var path     = localStorage.getItem('DOMINIO')+caminho+arquivo;
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

