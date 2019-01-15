function notificacao_configuracao(){

	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/notificacao_conf_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : { id_usuario_condominio : $( "#DADOS #ID_USER" ).val() },
        dataType   : 'json',
		success: function(retorno){
            
			if(retorno[0]['COM_EMAIL'] == 1){
				$( "#com_email" ).attr("checked",true);
			}else{
                $( "#com_email" ).attr("checked",false);
            }
			if(retorno[0]['COM_VIBRA'] == 1){
				$( "#com_vibra" ).attr("checked",true);
			}else{
                $( "#com_vibra" ).attr("checked",false);
            }
			if(retorno[0]['COM_TOCA'] == 1){
				$( "#com_toca" ).attr("checked",true);
			}else{
                $( "#com_toca" ).attr("checked",false);
            }
			if(retorno[0]['COM_MSG'] == 1){
				$( "#com_msg" ).attr("checked",true);
			}else{
                $( "#com_msg" ).attr("checked",false);
            }

			if(retorno[0]['COR_EMAIL'] == 1){
				$( "#cor_email" ).attr("checked",true);
			}else{
                $( "#cor_email" ).attr("checked",false);
            }
			if(retorno[0]['COR_VIBRA'] == 1){
				$( "#cor_vibra" ).attr("checked",true);
			}else{
                $( "#cor_vibra" ).attr("checked",false);
            }
			if(retorno[0]['COR_TOCA'] == 1){
				$( "#cor_toca" ).attr("checked",true);
			}else{
                $( "#cor_toca" ).attr("checked",false);
            }
			if(retorno[0]['COR_MSG'] == 1){
				$( "#cor_msg" ).attr("checked",true);
			}else{
                $( "#cor_msg" ).attr("checked",false);
            }

			if(retorno[0]['CHAT_EMAIL'] == 1){
				$( "#chat_email" ).attr("checked",true);
			}else{
                $( "#chat_email" ).attr("checked",false);
            }
			if(retorno[0]['CHAT_VIBRA'] == 1){
				$( "#chat_vibra" ).attr("checked",true);
			}else{
                $( "#chat_vibra" ).attr("checked",false);
            }
			if(retorno[0]['CHAT_TOCA'] == 1){
				$( "#chat_toca" ).attr("checked",true);
			}else{
                $( "#chat_toca" ).attr("checked",false);
            }
			if(retorno[0]['CHAT_MSG'] == 1){
				$( "#chat_msg" ).attr("checked",true);
			}else{
                $( "#chat_msg" ).attr("checked",false);
            }
            
			if(retorno[0]['DOC_EMAIL'] == 1){
				$( "#doc_email" ).attr("checked",true);
			}else{
                $( "#doc_email" ).attr("checked",false);
            }
			if(retorno[0]['DOC_VIBRA'] == 1){
				$( "#doc_vibra" ).attr("checked",true);
			}else{
                $( "#doc_vibra" ).attr("checked",false);
            }
			if(retorno[0]['DOC_TOCA'] == 1){
				$( "#doc_toca" ).attr("checked",true);
			}else{
                $( "#doc_toca" ).attr("checked",false);
            }
			if(retorno[0]['DOC_MSG'] == 1){
				$( "#doc_msg" ).attr("checked",true);
			}else{
                $( "#doc_msg" ).attr("checked",false);
            }

			if(retorno[0]['ENQ_EMAIL'] == 1){
				$( "#enq_email" ).attr("checked",true);
			}else{
                $( "#enq_email" ).attr("checked",false);
            }
			if(retorno[0]['ENQ_VIBRA'] == 1){
				$( "#enq_vibra" ).attr("checked",true);
			}else{
                $( "#enq_vibra" ).attr("checked",false);
            }
			if(retorno[0]['ENQ_TOCA'] == 1){
				$( "#enq_toca" ).attr("checked",true);
			}else{
                $( "#enq_toca" ).attr("checked",false);
            }
			if(retorno[0]['ENQ_MSG'] == 1){
				$( "#enq_msg" ).attr("checked",true);
			}else{
                $( "#enq_msg" ).attr("checked",false);
            }
            //alert(retorno);
            afed('#config','#home','','',2,'notificacao_conf');
   
        },
        error      : function() {
            //alert('Erro ao carregar');

        }
	});	

    
    
//	$.ajax({
//		type: 'POST',
//		url: SERVIDOR_CAMINHO+'appweb/notificacoes_select_alert.php',
//		data: 'id='+ID_MORADOR+'&banco='+BANCO+'&id_user='+ID_USER+'&condominio='+ID_CONDOMINIO,
//		success: function(retorno){
//			var notifica_retorno = retorno.split('/*/');
//			var notifica_cont = (notifica_retorno.length) -1;
//			if(notifica_cont > 0){
//				notifica(0,1000,2);
//				carrega_notificacoes(1);
//			}
//		}
//	});	
}

function notificacao_conf_update(){
    var dados = $( "#not_conf_up" ).serialize();
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/notificacao_conf_update.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : 'id_usuario_condominio='+$( "#DADOS #ID_USER" ).val()+'&'+dados,
		success: function(retorno){
            //alert(retorno);
			notifica('Notificações/Configuração gravada/ok',0,0);
        },
        error      : function() {
            alert('Erro ao carregar');

        }
	});	
}


//function local_notifica(id, title, message)
//{
//	var dt = new Date();
//    cordova.plugins.notification.local.schedule({
//        id: id,
//        title: title,
//        message: message,
//        at: dt
//    });
//}
