// JavaScript Document

function carrega_chat(par=''){
    if($( "#DADOS #MFALE" ).val() == 1){
    afed('#fale_user','#fale_user2','','',3);
    var dados = '';
	localStorage.setItem("TELA_ATUAL","chat_msg");
	//alert('mdl_chat_adm: carrega_chat pag:'+localStorage.getItem("TELA_ATUAL"));
    var id_condominio = $( "#DADOS #ID_CONDOMINIO" ).val();
    var id_usuario_condominio = $( "#DADOS #ID_USER" ).val();
	if(par==''){
    	var nome = $( "#busca_morador_chat" ).val();
	}else{
		var nome = '';
	}
    $.ajax({
        type       : "POST",
        url        : localStorage.getItem('DOMINIO')+"appweb/chat_get.php",
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_condominio : id_condominio,nome : nome,id_usuario_condominio : id_usuario_condominio},
        dataType   : 'json',
        success    : function(retorno) {
            for (x in retorno) {
                var morador = '';
                if(retorno[x]['msg'] == 0){ 
                    var alerta_msg = 'style="display:none;"';
                }
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
                    grupos = '<div style="float:left; width: 70%; margin-left: 10px;">'+grupos+'</div>';
                }
                //alert(retorno[x]['data']);
                if(retorno[x]['data'] == null){
                    var ultima_data = '';
                }else{
                    var ultima_data = retorno[x]['data_c'];
                }
				
                morador = '<div onClick="carrega_msg('+retorno[x]['id_usuario_condominio']+',\''+retorno[x]['nome']+'\',\''+retorno[x]['foto']+'\');" class="fale_usuario"><div class="morador_foto" style="background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+');"></div><span style=    "color: black;font-weight: bold;" class="item-title">'+retorno[x]['nome']+'<br></span>'+grupos+'<span style="color: #928c8c; float: left;    width: 70%;">'+localStorage.getItem('ROTULO_QUADRA')+' '+retorno[x]['descricao']+' - '+localStorage.getItem('ROTULO_LOTE')+' '+retorno[x]['lote']+'</span><div '+alerta_msg+' class="badge color-red" id="msg_n_lida">'+retorno[x]['msg']+'</div><div style="font-size: 10px; color: green;float: right;">'+ultima_data+'</div></div>';
              
                dados = dados + morador;
            }
            $( "#fale_usuarios" ).html(dados);
        },
        error      : function() {
            alert('Erro ao carregar chat');                  
        }
    }); 
	limpa_reload();
    }else{
        afed('#fale_user2','#fale_user','','',3);
    }
}

function carrega_msg(chat_user,nome,foto){
	//alert('mdl_chat_adm: carrega_msg pag:'+localStorage.getItem("TELA_ATUAL"));
    $( "#historico" ).html('');
    $('#fale_msg_user_foto').css('background-image','url(data:image/jpeg;base64,'+foto+')');
    //$('#fale_msg_user_foto').css('background-image', 'url(' + base64_string + ')');
    $('#fale_msg_user_nome').html(nome);
    $( "#DADOS #CHAT_USER" ).val(chat_user);
    afed('#fale_msg','#home','','',2);
    carrega_msg_eviadas($( "#DADOS #ID_USER" ).val(),chat_user);
    //msg_recarrega = window.setInterval("carrega_msg_eviadas("+$( '#DADOS #ID_USER' ).val()+","+chat_user+")", 3000);-----------------------------------removido teste
    localStorage.setItem('TELA_ATUAL','chat');
}

function carrega_msg_eviadas(enviado,recebido){
	//alert('mdl_chat_adm: carrega_msg_enviadas pag:'+localStorage.getItem("TELA_ATUAL"));
	//alert('chat: carrega_msg_enviadas');
    var dados = '';
    $.ajax({
        type       : "POST",
        url        : localStorage.getItem('DOMINIO')+"appweb/chat_msg_get.php",
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {enviado : enviado,recebido : recebido},
        dataType   : 'json',
        success    : function(retorno) {
            //alert('teste');
            
            for (x in retorno) {
                var msg = '';
                //msg = '<div class="enviado">'+retorno[x]['msg']+'</div>';
                if(retorno[x]['tipo'] == 0){ 
                    msg = '<div class="enviado">'+retorno[x]['msg']+'<span style="width: 100%;font-size: 9px;color: #9e9e9e;float: right; text-align: right;">'+retorno[x]['data_criacao']+'<span></div>';
                }else{
                    msg = '<div class="recebido">'+retorno[x]['msg']+'<span style="width: 100%;font-size: 9px;color: #9e9e9e;float: right; text-align: right;">'+retorno[x]['data_criacao']+'<span></div>';
                }
                //alert(msg);
                dados = dados + msg;
            }
            $("#historico").html(dados);
            $("#historico").animate({scrollTop: $("#historico").prop("scrollHeight")}, 0);
            verifica_msg(recebido,enviado);
        },
        error      : function(e) {
            //alert(e);
            //alert('Erro ao carregar');                  
        }
    });     
}

function envia_msg(){
	//alert('chat: envia_msg pag:'+localStorage.getItem("TELA_ATUAL"));
    //$("#send_txt").focus(); 
	//scroll_historico();
    var id_usuario_condominio = $( "#DADOS #ID_USER" ).val();
    var id_usuario_condominio_recebe = $( "#DADOS #CHAT_USER" ).val();
    var msg = $( "#send_txt" ).val();
    if(msg.length > 0){
        $.ajax({
            type       : "POST",
            url        : localStorage.getItem('DOMINIO')+"appweb/chat_msg_insert.php",
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : {id_usuario_condominio : id_usuario_condominio,id_usuario_condominio_recebe : id_usuario_condominio_recebe,msg : msg},
            dataType   : 'json',
            success    : function(retorno) {
                //alert(retorno);
                
            },
            error      : function(e) {
                //alert(e);
                //alert('Erro ao Enviar');                  
            }
        });
        $( "#send_txt" ).val('');
        carrega_msg_eviadas($( "#DADOS #ID_USER" ).val(), $( "#DADOS #CHAT_USER" ).val());
    }
}

function verifica_msg(id_usuario_condominio,id_usuario_condominio_recebe){
	//alert('chat: verifica_msg pag:'+localStorage.getItem("TELA_ATUAL"));
	//alert('mdl_chat: verifica_msg');
		$.ajax({
        	type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/chat_msg_update.php',
            data: {id2 : id_usuario_condominio,visualiza : '1',id_usuario_condominio_recebe : id_usuario_condominio_recebe},
			success: function(retorno){  }
		});
		return false;
}

function limpa_reload(){
    
	if (typeof msg_recarrega !== "undefined") {
		clearInterval(msg_recarrega);
	}
    msg_recarrega = 0;
}



	