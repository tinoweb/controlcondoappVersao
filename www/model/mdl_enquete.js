function carrega_enquetes(tipo){
    //alert(tipo);
	"use strict";
    var busca_enq = ($('#form_busca_enquete').serialize()).split('&');
    var tipob     = busca_enq[0].split('=');
    var txtb      = busca_enq[1].split('=');
	var pg        = 0;
	app.controler_pull("enquetes");
    if(tipo === 0){
        pg = 1;
    }else{
        var offset = $(".enquete").length -1;
        //alert(offset);
        if(offset !== 0){
            pg = (offset/6)+1;
        }else{
            pg = 1 ;
        }
		if(parseInt(pg) !== parseFloat(pg)) {
        	pg = pg+1; 
		}
    }

    //alert(pg);
    var dados 		= '';
	var dado		= '';
	var dados_grupo = '';
	var grupos 		= '';
	var grupo  		= '';
	$.ajax({
		type: 'POST',
        url        : localStorage.getItem('DOMINIO')+"appweb/enquete_get.php",
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(),id_usuario_condominio : $( "#DADOS #ID_USER" ).val(),pg : parseInt(pg),tipob : tipob[1],txtb : txtb[1]},
        dataType   : 'json',
		success    : function(retorno){
            for (x in retorno) {
                dados_grupo = retorno[x]['grupo'];
                //alert(dados_grupo);
                grupos = '';
                for(y in dados_grupo){
                    if(dados_grupo[y]['titulo'] == 'Morador'){
                        grupo = '';
                    }else{
                        grupo = '<div class="TagPadrao" style="background-color:'+dados_grupo[y]['fundo_cor']+';color: '+dados_grupo[y]['texto_cor']+';border: 1px solid '+dados_grupo[y]['fundo_cor']+';">'+dados_grupo[y]['titulo']+'</div>';
                    }
                    grupos = grupos+grupo;
                    //alert(grupos);
                }
                if(grupos.length>0){
                    grupos = '<div style="float:left; width: 100%;">'+grupos+'</div>';
                }                
                dado = '<div class="enquete" onClick="carrega_enquete(\''+retorno[x]['id_enquete']+'\');"><div class="enquete_foto_morador" style="background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+');"></div><span class="enquete_morador"><span style="height: 19px; overflow:hidden; float:left"> <strong>'+retorno[x]['criado']+'</strong></span>'+grupos+'</span><span class="enquete_titulo">'+retorno[x]['titulo']+'</span><span class="enquete_votos"><button type="button" class="btn btn-info">VOTOS</button></span><span class="enquete_periodo">Validade<br> de '+retorno[x]['data_inicio']+' ate '+retorno[x]['data_final']+'</span></div>';
                dados = dados + dado;
            }
			//dados = '<div id="main_enquete" class="main">'+dados+'</div>';
            if(tipo != 1){
                $( "#main_enquete" ).html("");
            }
            $( "#main_enquete" ).append(dados);
			afed('#enquetes','#home,#enquete','','',3);
            localStorage.setItem('TELA_ATUAL','enquetes');
		},
        error      : function() {
            alert('Erro ao carregar');
        }
	});	
}

function carrega_enquete(id){

    $.ajax({
		type: 'POST',
        url        : localStorage.getItem('DOMINIO')+"appweb/enquete_get.php",
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : {id_enquete : id, id_usuario_condominio : $( "#DADOS #ID_USER" ).val(), tipo : 1},
        dataType   : 'json',
		success: function(retorno){
            $( "#enquete .enquete_foto_morador" ).css("background-image", "url(data:image/jpeg;base64,"+retorno[0]['foto']+")");
            $( "#enquete .enquete_morador" ).html(retorno[0]['criado']);
            $( "#enquete span" ).html(retorno[0]['titulo']);
            $( "#enquete .enquete_subtitulo" ).html(retorno[0]['descricao']);
            $( "#enquete .enquete_periodo" ).html('Validade de '+retorno[0]['data_inicio']+' ate '+retorno[0]['data_final']);
			//alert(retorno[0]['voto']);
            //$( "#enquete" ).html(retorno);
			afed('#enquete','#enquetes,#home','','',3);
            localStorage.setItem('TELA_ATUAL','enquete');
            
//            var dt_festa = retorno[0]['data_final'];
//            var dt = dt_festa.split(" ");
//            var dt_dt = dt[0].split("-");
            //var startDate = new Date(dt[2] +"-"+ dt[1] +"-"+ dt[0] + " " + ini );
            var datafim   = new Date(retorno[0]['dataFim']);
            var dataatual = new Date();
			//alert(retorno[0]['dataFim']);
            //alert(dataatual+"__________"+datafim)
            if(dataatual > datafim){
				// não pode votar
                var status = 0;
                //alert('0');
            }else{
                var status = 1;
                //alert('0');
            }
            
            if($( "#DADOS #PARENTESCO" ).val() == 1 && retorno[0]['voto'] == null){
                //alert('entro');
                if(status == 0){
                    carrega_resposta(id);
                    afed('.enquete_votos','','','',3);
                    //alert('entro1');
                }else{
                    carrega_perguntas(id,$( "#DADOS #ID_USER" ).val());
                    afed('','.enquete_votos','','',3);                    
                }
            }else{
                carrega_resposta(id);
                afed('.enquete_votos','','','',3);
                //alert('entro2');
            }
            
		},
        error      : function() {
            alert('Erro ao carregar');
        }
	});	
}

function carrega_perguntas(id,id_usuario_condominio){
    
	$.ajax({
		type: 'POST',
        url        : localStorage.getItem('DOMINIO')+"appweb/enquete_get.php",
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : {id_enquete : id, id_usuario_condominio : id_usuario_condominio, tipo : 2},
        dataType   : 'json',
		success: function(retorno){
			var dados = '<input type="hidden" name="id_enquete" value="'+id+'"><input type="hidden" name="id_usuario_condominio" value="'+id_usuario_condominio+'">';
            for (x in retorno) {
                var dado = '<input type="hidden" name="id_enquete" value="'+retorno[x]['id_enquete']+'"><div style="float:left; width:100%; margin:3% 0 0 0;"><input type="radio" name="voto" value="'+retorno[x]['id_enquete_alternativa']+'"><label>'+retorno[x]['pergunta']+'</label></div>';
                dados = dados + dado;
            }
             var bt_submit = '<input type="button" name="votar" value="" onclick="atualiza_enquete('+id+');">';
            
                dados = dados + bt_submit;
            $( "#enquete_voto" ).html(dados);
		},
        error      : function() {
            alert('Erro ao carregar respostas');    
        }
	});	
}

function carrega_resposta(id){
	"use strict";
    var dados = '';
	var tt_por= '';
	var dado  = '';
	$.ajax({
		type: 'POST',
        url        : localStorage.getItem('DOMINIO')+"appweb/enquete_get.php",
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : {id_enquete : id, tipo : 3},
        dataType   : 'json',
		success: function(retorno){
            for (x in retorno) {
                tt_por = (retorno[x]['votos']*100)/retorno[x]['total'];
                dado   = '<span class="enquete_barra_voto">'+retorno[x]['pergunta']+'</span><span class="enquete_barra_voto4">Votos: '+retorno[x]['votos'];
				if(retorno[x]['votos']>0){
					dado += ' ('+tt_por+'%)';
				}
				dado += '</span><div class="enquete_barra_voto2"><div class="enquete_barra_voto3" style="width:'+(tt_por+1)+'%;"></div></div>';
                dados = dados + dado;
            }
            $( "#enquete_voto" ).html(dados);
            $( "#enquete .enquete_votos" ).html('Votos: '+retorno[0]['total']);
		},
        error      : function() {
            alert('Erro ao carregar respostas');
        }
	});	
}

function atualiza_enquete(id){
	var dados = $( "#enquete_voto" ).serialize();
    if(dados.indexOf("voto") != -1){ 
	$.ajax({
		type: 'POST',
        url        : localStorage.getItem('DOMINIO')+"appweb/enquete_insert.php",
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : dados,
		success: function(retorno){
			//alert(retorno);
			carrega_enquete(id);
			//alert(retorno);
		},
        error      : function() {
            alert('Erro ao carregar');
            

        }
	});
    }else{
        notifica('Escolha seu voto!/Escolha umas das opções',0,0);
    }
}

