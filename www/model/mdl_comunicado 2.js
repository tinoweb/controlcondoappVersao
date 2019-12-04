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
	let cor   = '';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/comunicado_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        //data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val() },
        data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&pg='+parseInt(pg)+'&titulo='+$("#busca_comunicados").val()+'&id_usuario_condominio='+$( "#DADOS #ID_USER" ).val(),
        dataType   : 'json',
		success: function(retorno){
            //alert(retorno);
			
			
			var cont = 0;
            for (x in retorno) {
				if(retorno[x]['visualizacao']!=false){
				    cor = 'background:#e85252 !important';
			     }else{
					cor = '';
				 }

                cont++;
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
                    grupos = '<div style="float:left; width: 60%;margin-left: 6px;">'+grupos+'</div>';
                }
				
				if(retorno[x]['titulo'].length > 32){
					
					var txt_titulo = retorno[x]['titulo'].substr(0,32)+'...';
				}else{
					var txt_titulo = retorno[x]['titulo'];
				} 
				
				grupo = grupo_mrd(grupos);
				
				if(retorno[x]['foto'] == ''){
				   
					dado = '<div class="comunicado card" onClick="check_leitura(1,'+retorno[x]['id_comunicado']+');carrega_comunicado(\''+retorno[x]['id_comunicado']+'\');"><div class="feed-comunicado cabecalho_card card-header" style="'+cor+'" onload="atualiza_notificacao_modulo(5,236,this)"><div class="noti_tipo">Comunicado</div><div style="color:white" class="chip color-"><i class="fa fa-bullhorn"></i></div></div><div class="p_comunicado" style="margin: 19% 0 11px 3%;"><div class="topo_comunicado"><div class="chip" style=""><div class="chip-media bg-color-green"> <span style="font-size:1.6em;color:white" class="fa fa-user-circle"></span></div><div class="chip-label">'+limita_txt(retorno[x]['criado'],37)+'</div></div><br><div class="chip" style=""><div class="chip-media bg-color-blue"><i class="fa fa-group"></i></div><div class="chip-label">Grupo: '+grupo+'</div></div><br><div class="chip" style=""><div class="chip-media bg-color-orange"> <span style="color:white" class="fa fa-edit"></span></div><div class="chip-label">'+txt_titulo+'</div></div><br><div class="chip" style=""><div class="chip-media bg-color-red"><i class="fa fa-calendar"></i></div><div class="chip-label">Data: '+retorno[x]['data_criacao']+'</div></div></div></div><div class="feed_home" >';
				   
				}else{
					
					dado = '<div class="comunicado card" onClick="check_leitura(1,'+retorno[x]['id_comunicado']+');carrega_comunicado(\''+retorno[x]['id_comunicado']+'\');"><div class="feed-comunicado cabecalho_card card-header" style="'+cor+'" onload="atualiza_notificacao_modulo(5,236,this)"><div class="noti_tipo">Comunicado</div><div  style="color:white" class="chip color-"><i class="fa fa-bullhorn"></i></div></div><div class="p_comunicado" style="margin: 19% 0 11px 3%;"><div class="topo_comunicado"><div class="chip" style=""><div class="chip-media bg-color"> <img class="chip_photo_" style="font-size:1.6em;color:white;background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+');"></img></div><div class="chip-label">'+limita_txt(retorno[x]['criado'],37)+'</div></div><br><div class="chip" style=""><div class="chip-media bg-color-blue"><i class="fa fa-group"></i></div><div class="chip-label">Grupo: '+grupo+'</div></div><br><div class="chip" style=""><div class="chip-media bg-color-orange"> <span style="color:white" class="fa fa-edit"></span></div><div class="chip-label">'+txt_titulo+'</div></div><br><div class="chip" style=""><div class="chip-media bg-color-red"><i class="fa fa-calendar"></i></div><div class="chip-label">Data: '+retorno[x]['data_criacao']+'</div></div></div></div><div class="feed_home" >';
				   
					
				}
				
				/*dado = '<div class="comunicado card" onClick="check_leitura(1,'+retorno[x]['id_comunicado']+');carrega_comunicado(\''+retorno[x]['id_comunicado']+'\');"><div class="feed-comunicado cabecalho_card card-header" style="'+cor+'" onload="atualiza_notificacao_modulo(5,236,this)"><div class="noti_tipo">'+txt_titulo+'</div><div><i class="fa fa-bullhorn"></i></div></div><div class="p_comunicado" style="margin: 19% 0 0 3%;"><div class="topo_comunicado"><div class="morador_foto" style="margin-right: 8px;background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+');"></div><span>'+retorno[x]['data_criacao']+'</span><strong>'+retorno[x]['criado']+'</strong>'+grupos+'</div><div class="comunicado_titulo" style="margin-top:20px">'+retorno[x]['texto'].substr(0,50)+'</div></div><div class="feed_home" >';*/
				   
				   
                
				
				
				if(retorno[x]['comentario']>0){
                    dado = dado + '<img width="15" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKFSURBVHhe7ZpNThwxEIUni5A7kEjJ6YgghAMEqXsLsi3Ekmsku5A1YcHfVTJiP7E7hdSUbeia107NdPuT3oJx+fnVUDM9Cy8qlUqlUqlUOG3b7rTGHbXWXXs9eq02XI+Nsb8ba7+E7NTGerSnp7ve6D5xyHbIuLvQA7Uj4+v5+bvW2Iek8RbJ/wNv15oE/+4dpgy3UsYdUFvD8RvDZ75nZL9/c+49LW8sIWNj3I9+9vCdQMvD8Ruff+GdnHygpY0nZH2W3bolLQ2HGazo5a0Bzg8bKAPnhw2UgfPDBsrA+WEDZeD8sIEycH6pAa8vLTo2i7Q+QmrA60uLjs0irY+QGvD60qJjs0jrI6QGvL606Ngs0voI2EAZOD9soAycHzZQBs4PGygD55ca8PrSomOzSOsjpAa8vrTo2CzS+gipAa8vLTo2i7Q+QmrA60uLjs0irY+ADZSB88MGysD5YQNl4PywgTJwfqkBr5eKbEYD9pca8HqpyGY0YH+pAa+XimxGA/aXGvB6qchmNGB/2EAZOD9soAycHzZQBs4PGygD54cNlIHzwwbKwPn9pnlfkAjXSvom4drJvK7I/L9LUsvGuc+L1eoNHZ0ksW+41rok9e+C5F3SsIAaay+PjflIx0ek9gzUzd7FxVuykUEXJW8TpqWUnYZE7RDdrH1R8okwCd21U2uvvOGSHVBEqWlI1WXkM9or77EPX5UtTXt29sl/zH4lmuga6U8DX+8MJoFvMDQaGuZNdjLuZ5gG/jrtng6hyTD6vNEg/xj7w1+jbRPjtWnoiXZMk5em4UlUOmFemQaqmj65aaDlmZCYBlqZF93j0D8WZ/sGdPhp8L/09uivSmUUFou/iNJ/GAhnlLQAAAAASUVORK5CYII="><span style="font-size: 10px;color: #7f8c8d">&nbsp;'+retorno[x]['comentario']+'&nbsp; &nbsp; &nbsp; </span>';
                }
				
                if(retorno[x]['curtida']>0){
                    dado = dado + '<img width="15" src="data:image/png;base64,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"><span style="font-size:10px; color: #7f8c8d">&nbsp;'+retorno[x]['curtida']+'</span>&nbsp; &nbsp; </span>';
                }
                if(retorno[x]['anexo']>0){
                    dado = dado + '<img width="15" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASkSURBVHhe7Zr7ixNXFMejVeuzP0gfouCzLfZhtegvohSkFFFBRBFKi7+0ICgrRcUf7Ca5UKiYufcmG7u2u7oiiiDkLxAR/UXQForV1QqyylZrH2uhLYIIbd1+z+TcZPLYvDY7mZudDwwk58zcnM/cO3deiYSEhISEhIRYiUilFgqtN8aV+jgm5SZ8fpVT7YsQYpJQ6hMh1U2h9HCZ5Y6QugPrTeFN2geRSMyNS/VtGenSBTuo03GW8Kb2g15/HVI/G8G41I+wfBlT6v2oUu/GtF6HQ0HElX6Y3xHqj7Y4LIrlMcQzIp1+gdMF7NV6GtY/ZtbFDrmFw2Eqp4NJVOvlkPpCOM4cDuUolVc9keHhCZwekcKdoD7jcPBAoWtxXD/OyumvOewSTSRea0SecEdCfttBDgeLQnn1DN+3cKpEHr34Ta3yBmwTM9sLKd/mcDAolseE9imnmiJPxJzkGtMGJsltHG491eQxcT0YrTwRTaXeMO3gN3dyuLXUI+/OCQ3KExj275m2AjECKsnT+bqZ8gTaiOfaU2oph1tDPfIY9kdHLS96p+N3fuE2BzjcGvyWJ/AbJ02bGAkdHPafSvJ0rT5G8ol8m/p6y26M6pFHL3U3Wx6/OSSSycWc8pexkN+eyTyHdiRNkOV6taDncbMknNQKTvlLNXkI3M8VqtRXtcpju4zZDneBH3DKpVie7i845S9+yGO7a947PCvk6Vhshjza/QG/8yKn7ZTH5yO1yKOXJ9Uqj9xQ28sfTKdf4rQ98hjqP5lC8TkdylehWJ4uZKyT75RykR/ywnHe4ZS/1CMPoa4Gh/2NcSuPnu+vMuyXccpfqskjPpgvdBzJu+/oPPIYBanxI4+bEgh/n5doTB7t3rROnoDwrlyhSvWNhXzLHmnT0xoU8RcXUiJPYOdcoTyG78MDicQsDo9IOXkIvszp4Mjvl3IGirnNhZSVJ5B7Susgf4JDI2KNPIGh3ZkrRqlDHC4Bhf6bLRizfgWK5TFiblWSjyaTb3HKf+jNK4b2n1woPVObyKkSsN5dLvw7DpVglTwR13p7viC5lcNloVk/t26Zty87e3snF8sf7Op6hdMF8sj93nJ5AkW5j5Rp9t+TTj/P4bJ8rvU8rPe3K+EeDkrFnNRqXBgtwOctZpLk/I+BlydQdPZvKFJf4FBFILoZcu5kONICwX4r5AkU5V7VYUec4lBVqNdxOFwzUmaB3D/YOT2iu3smrxpseQKF3XMLlPoMh2oDF0EimVyF7XZD8oBw9EfeyY4olkf+TU4FBxR3lQu8xKGmYIU8gWM6+/8aqZ7QS0YOjwpr5AmavXPFSrmDww3jlcdO/S3Q8gRfBj/iogdwIdPwy0Xr5A0YBftM4ZA4zuG6sFaeQK9P9Z7WICMrXRJ7oas/bHvUK0//1+G0PYjDXfNR/FBeRJ+vds52T4NKXbZe3kDCEBkwQpjB/8OOOIce3kNvaLGsxLIek+VeyF7E8syzbj+9EOWm7EVoPRvCZ71yFZfsPUGf9+qvLaB/ZUPwtOcMUbCgx3+lCdOqya4R6JU1PaSMSbkBh8OHdAi40jU8DwwJCQkJCQkKkcj/IsxYDdBU2bkAAAAASUVORK5CYII="><span style="font-size: 10px;color: #7f8c8d">&nbsp;'+retorno[x]['anexo']+'&nbsp;&nbsp;</span>';
                }
				dado = dado +'</div></div></div>';
                dados = dados + dado;
            }
            //alert(retorno);
			//dados = '<div id="main_comunicado" class="main">'+dados+'</div>';
			if(tipo != 1){
				$("#main_comunicado").html("");
			}
			if (cont == 0){
				var sem_reg = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
				+" <img  width='50%'  src='data:image/png;base64,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'> </div>";
				
			}
			$( "#main_comunicado" ).append(dados);
			afed('#comunicados','#home,#comunicados2','','',3,'comunicados');	
            
            $("pull-comunicados").scrollTop(50);
		},
        error      : function() {
            $("#main_comunicado").html(sem_reg);
        }
	});    
}

// FUNCAO CARREGA UM COMINICADO ESPECIFICO
function carrega_comunicado(id){
	var id_condominio         = $( "#DADOS #ID_CONDOMINIO" ).val();
	var id_usuario_condominio = $( "#DADOS #ID_USER" ).val();
	var foto = '';
	//alert("Condominio: "+id_condominio+" usuario: "+id_usuario_condominio);
    var dados = '';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/comunicado_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_comunicado : id, id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo : '1', id_usuario_condominio : $( "#DADOS #ID_USER" ).val()},
        dataType   : 'json',
		success: function(retorno){
            //alert(retorno);
			if(retorno[0]['titulo'].length > 24){
				var txt_titulo = retorno[0]['titulo'].substr(0,24)+'...';
			}else{
				var txt_titulo = retorno[0]['titulo'];
			}
			
            $( ".comunicado_titulo" ).html('<i class="fa fa-edit"></i> '+txt_titulo);
			//alert('classe titulo');
            $( "#comunicados_comentario span" ).html(retorno[0]['titulo'].substring(0,53));
			
			if(retorno[0]['foto'] == ''){
			   $( "#comunicados2 .comunicado .topo_comunicado .icon_without_comu" ).html('');
			   $( "#comunicados2 .comunicado .topo_comunicado .morador_foto" ).hide();
			   $( "#comunicados2 .comunicado .topo_comunicado .icon_without_comu" ).append('<div style="margin-left: -26px;" class="col-md-2"><span style="font-size:4em;color:#c2c2c2" class="fa fa-user-circle"></span></div>');
			   $('.icon_without_comu').show();
				
			}else{
				
			   $('.icon_without_comu').hide();
			   $( "#comunicados2 .comunicado .topo_comunicado .morador_foto" ).show();
			   $( "#comunicados2 .comunicado .topo_comunicado .morador_foto" ).css("background-image", "url(data:image/jpeg;base64,"+retorno[0]['foto']+")").css('margin-left','-7px');
			}
			   
            
			
			
            $( "#comunicados2 .comunicado .topo_comunicado .data_criado" ).html('<div class="col-md-2">'+retorno[0]['data_criacao']+'</div>');
			
            $( "#comunicados2 .comunicado .topo_comunicado .comunicado_criado" ).html('<div class="chip" style=""><div class="chip-media bg-color-yellow"> <span style="font-size:1.6em;color:white" class="fa fa-user"></span></div><div class="chip-label">'+limita_txt(retorno[0]['criado'],27)+'</div></div><br>');
            $( "#comunicados2 .comunidado .comunicado_titulo" ).html('<i class="fa fa-edit"></i> '+retorno[0]['titulo']);
			$( "#comunicados2 .navbar").css("background-color","#0073b7");
			
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
	
	var link  = '';
    var dados = '';
    var dado  = '';
	var ext;
	var caminho = '';
	var num;
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/comunicado_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_comunicado : id, tipo : '2'},
        dataType   : 'json',
		success: function(retorno){
            for (x in retorno) {
				link    = localStorage.getItem('DOMINIO')+'paginas'+retorno[x]['caminho']+retorno[x]['nome_arquivo'];
				caminho = retorno[x]['caminho'];
				num  = parseInt(x);
				num  += 1;
				ext  = retorno[x]['nome_arquivo'];
				ext  = ext.split('.');
                dado = '<button class="col button button-small button-fill color-gray" onClick="download_arquivo(\''+link+'\',\''+caminho+'\',\''+retorno[x]['nome_arquivo']+'\');" style="top: 18px;margin-top:10px"><i class="fa fa-cloud-download"></i>DOWNLOAD ANEXO ' + num + '  ('+ext[1]+')</button>';
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
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
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
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
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
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
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
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
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
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
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
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
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
    var path     = localStorage.getItem('DOMINIO')+"paginas/"+caminho+arquivo;
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
	
    var filePath = cordova.file.externalApplicationStorageDirectory+'Download/'+fmt_lin(arquivo);
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
			var ref = cordova.InAppBrowser.open(uri, '_system', 'location=yes');
			//alert(JSON.stringify(ref, null, 4));
            //window.open(path, "_system");
			//alert(1);

        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
			$('#downloadProgress').css({"display":"none"});
			alert("erro ao fazer download");
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


function visualiza_comunicado(id) {

        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/visualiza_comunicado.php',
            data: {id : id,id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(),id_usuario_condominio: $( "#DADOS #ID_USER" ).val()},
			crossDomain: true,
           success: function(retorno){
                
            },
            error      : function() {
               
            }
        });	
}


