// JavaScript Document

function onBackKeyDown() {

    //alert(localStorage.getItem('TELA_ATUAL'));
    
    // REGRAS HOME
    if(localStorage.getItem('TELA_ATUAL') == 'home'){
        //alert('ta na tela home');
        if(swiper.realIndex != 0){
            if(swiper.realIndex == 3){
               afed('.smenu,#perfil_abre,#perfil','#perfil_edit,#perfil_fecha','','',2);
            }
            inicia2(0);
        }else{            
            return false;
        }
    }
   
    // REGRAS CHAT
    if(localStorage.getItem('TELA_ATUAL') == 'chat_msg'){
        //limpa_reload();-----------------------------------removido teste
        afed('#home','#fale_msg','','',3);
        localStorage.setItem('TELA_ATUAL','home');
        inicia2(0);
    }
    if(localStorage.getItem('TELA_ATUAL') == 'chat'){
        //limpa_reload();-----------------------------------removido teste
        afed('#home','#fale_msg','','',3);
        localStorage.setItem('TELA_ATUAL','chat_msg');
        inicia2(1);
        carrega_chat();
    }
     
    // REGRAS COMUNICADOS
    if(localStorage.getItem('TELA_ATUAL') == 'comunicados'){
        afed('#home','#comunicados','','',2);
        localStorage.setItem('TELA_ATUAL','home');
        $("#busca_comunicados").val("");
        inicia2(0);
    }
    
    if(localStorage.getItem('TELA_ATUAL') == 'comunicado'){
        afed('#comunicados','#comunicados2','','',2);
        localStorage.setItem('TELA_ATUAL','comunicados'); 
        carrega_comunicados(0);
    }
    
    if(localStorage.getItem('TELA_ATUAL') == 'comunicado_comentario'){
        afed('#comunicados2','#comunicados_comentario','','',1);
        localStorage.setItem('TELA_ATUAL','comunicado');
    }
    
    //REGRAS LIBERACAO   
    if(localStorage.getItem('TELA_ATUAL') == 'liberacao_add'){
        afed('#home','#liberacao2','','',2,'liberacao_list');
        $( '#busca_liberacao' ).val('');
    }

    if(localStorage.getItem('TELA_ATUAL') == 'foto_veiculo_visitante'){
        afed('','','','',2,'liberacao_list');
        $(".veiculo-visitante .sheet-close")[0].click();
    }

    if(localStorage.getItem('TELA_ATUAL') === 'visitante'){

        afed('#visitantes','#visitante','','',2);
        localStorage.setItem('TELA_ATUAL','visitantes');
    }
 
    if(localStorage.getItem('TELA_ATUAL') === 'visitantes'){
        afed('#home','#visitantes','','',2,'home');
    }

    if(localStorage.getItem('TELA_ATUAL') == 'liberacao'){
        //alert(1);
        afed('#home','#liberacao3','','',2);
        localStorage.setItem('TELA_ATUAL','home');
        $( '#busca_liberacao' ).val('');
        inicia2(0);
    }
    
    if(localStorage.getItem('TELA_ATUAL') == 'liberacao_list'){
        //alert(2);
        closePopUp();
        //afed('#home','#liberacao3','','',2);
        localStorage.setItem('TELA_ATUAL','liberacao');
        $( '#busca_liberacao' ).val('');
        inicia2(2);
    }
    
    if(localStorage.getItem('TELA_ATUAL') == 'eventos_liberacao'){
        
        liberacaoPopup2.close();
        localStorage.setItem('TELA_ATUAL','liberacao');
        
    }
    
    if(localStorage.getItem('TELA_ATUAL') == 'evento_liberacao'){
        app2.sheet.close();
        localStorage.setItem('TELA_ATUAL','eventos_liberacao');
    }
    
    if(localStorage.getItem('TELA_ATUAL') == 'qrcode_gera'){    
        openPopUp();
        afed('#home','#qrcode','','',2);
        localStorage.setItem('TELA_ATUAL','liberacao_list');
    }
    
    if(localStorage.getItem('TELA_ATUAL') == 'qrcode'){
        openPopUp();
        afed('#home','#qrcode','','',2,'liberacao_list');
        localStorage.setItem('TELA_ATUAL','liberacao_list');
    }
    
    if(localStorage.getItem('TELA_ATUAL') == 'qrcode_share'){
        afed('#qrcode','#qrcode_share','','',2);
        localStorage.setItem('TELA_ATUAL','qrcode_gera');
    }
    
    // PERFIL DO USUARIO
    
    if(localStorage.getItem('TELA_ATUAL') == 'perfil_usuario_edicao'){
        afed('#home','#perfil2','','',2);
        localStorage.setItem('TELA_ATUAL','perfil_usuario');
    }
    
    if(localStorage.getItem('TELA_ATUAL') == 'perfil_usuario'){
        localStorage.setItem('TELA_ATUAL','home');
        inicia2(0);
    }
    
    if(localStorage.getItem('TELA_ATUAL') == 'config_user'){
        //localStorage.setItem('TELA_ATUAL','home');
        $("#bt_config_user")[0].click();
    }
    
    if(localStorage.getItem('TELA_ATUAL') == 'moradores'){
        afed('#home','#moradores','','',2);
        localStorage.setItem('TELA_ATUAL','perfil_usuario');
    }  
    
    if(localStorage.getItem('TELA_ATUAL') == 'morador'){
        afed('#moradores','#morador','','',2);
        localStorage.setItem('TELA_ATUAL','moradores');
    }   
    
    if(localStorage.getItem('TELA_ATUAL') == 'morador_perfil'){
        afed('#home','#morador','','',2);
        localStorage.setItem('TELA_ATUAL','perfil_usuario');
    }   
    
    // NOTIFICACAO
    if(localStorage.getItem('TELA_ATUAL') == 'notificacao_conf'){
        afed('#home','#config','','',2);
        localStorage.setItem('TELA_ATUAL','painel_usuario');
    } 

    //REGRAS RESERVA   
    if(localStorage.getItem('TELA_ATUAL') == 'reservas'){
        afed('#home','#reservas','','',2,'perfil_usuario');
  
    }
    
    //REGRAS minhas reserva   
    if(localStorage.getItem('TELA_ATUAL') == 'minha_reserva'){
        afed('#reservas','#m_reserva','','',2,'reservas');
    }
    
    //REGRAS minhas reserva   
    if(localStorage.getItem('TELA_ATUAL') == 'minha_reserva_unica'){
        afed('','','','',2,'minha_reserva');
        $(".minha_reserva .sheet-close")[0].click();
    }
    
    if(localStorage.getItem('TELA_ATUAL') == 'new_area'){
        afed('#reservas','#area_comum_new,#bt_add_reserva','','',2,'reservas'); 
        fecha_calendario();
    }
    
    if(localStorage.getItem('TELA_ATUAL') == 'calendario'){
        afed('#area_comum_new','#area','','',2,'new_area');    
        //afed('#reservas','#area','','',2,'reservas');    
    }

    if(localStorage.getItem('TELA_ATUAL') == 'reserva'){
        if(localStorage.getItem('periodo_integral') == 1){
            afed('#new_area','#reserva','','',2,'new_area');
        }else{
            afed('#area','#reserva','','',2,'calendario');
        }
        //afed('#area','#reserva','','',2,'area');
    }

    if(localStorage.getItem('TELA_ATUAL') == 'area'){
        afed('#reservas','#area','','',2,'reservas');      
    }
    
     //REGRAS ENTREGAS   
    if(localStorage.getItem('TELA_ATUAL') == 'entregas'){
        afed('#home','#entregas','','',2);
        localStorage.setItem('TELA_ATUAL','home');
    }
   
     //REGRAS ENQUETE   
    if(localStorage.getItem('TELA_ATUAL') == 'enquetes'){
        afed('#home','#enquetes','','',2);
        localStorage.setItem('TELA_ATUAL','home');
        $("#busca_enquete").val("");
        document.getElementById("tipob").checked = true;
    }
   
    if(localStorage.getItem('TELA_ATUAL') == 'enquete'){
        carrega_enquetes(0);
        localStorage.setItem('TELA_ATUAL','enquetes');
        //voltar('#enquetes','#enquete','enquetes')
    }
   
     //REGRAS DOCUMENTOS   
    if(localStorage.getItem('TELA_ATUAL') == 'documentos'){
        afed('#home','#documentos','','',2);
        localStorage.setItem('TELA_ATUAL','home');
    }
    
     //REGRAS OCORRENCIA   
    if(localStorage.getItem('TELA_ATUAL') == 'ocorrencias'){
        //carrega_ocorrencias(0);
        afed('#home','#ocorrencias','','',2,'home');
        localStorage.setItem('TELA_ATUAL','home');
    }
    if(localStorage.getItem('TELA_ATUAL') == 'add_ocorrencia'){
        afed('#ocorrencias','#add_ocorrencia','','',2,'ocorrencias');
        localStorage.setItem('TELA_ATUAL','ocorrencias');
    }
    if(localStorage.getItem('TELA_ATUAL') == 'ocorrencias_ticket'){
        afed('','#ocorrencias_ticket','','',2,'');
        localStorage.setItem('TELA_ATUAL','ocorrencia');
    }
    if(localStorage.getItem('TELA_ATUAL') == 'ocorrencia'){
        carrega_ocorrencias(0);
        afed('#ocorrencias','#ocorrencia','','',2);
        
        localStorage.setItem('TELA_ATUAL','ocorrencias');
    }
    
    if(localStorage.getItem('TELA_ATUAL') == 'tickets'){
        afed('#ocorrencia','#ocorrencias_ticket','','',2);
        localStorage.setItem('TELA_ATUAL','ocorrencia');
    }
    
    if(localStorage.getItem('TELA_ATUAL') == 'ticket'){
        afed('#ocorrencias_ticket','#ticket','','',2);
        localStorage.setItem('TELA_ATUAL','tickets');
    }
    
    if(localStorage.getItem('TELA_ATUAL') == 'ocorrencia_ticket_foto'){
        //afed('#ocorrencias_ticket','#ticket','','',2);
        localStorage.setItem('TELA_ATUAL','ocorrencias_ticket');
        //myPhotoBrowserStandalone.close();
        $(".photo-browser-popup .popup-close")[0].click();
    }
    
    if(localStorage.getItem('TELA_ATUAL') == 'cameras_condominio'){
        afed('#home','#cameras_condominio','','',2,'home');
        localStorage.setItem('TELA_ATUAL','home');
    } 
    if(localStorage.getItem('TELA_ATUAL') == 'pet_lista'){
        afed('#home','#pet_lista','','',2,'home');
        localStorage.setItem('TELA_ATUAL','home');
    }
    if(localStorage.getItem('TELA_ATUAL') == 'add_pet'){
        afed('#pet_lista','#add_pet','','',2,'home');
        localStorage.setItem('TELA_ATUAL','home');
    }
    if(localStorage.getItem('TELA_ATUAL') == 'pet'){
        afed('#pet_lista','#pet','','',2,'home');
        localStorage.setItem('TELA_ATUAL','home');
    }
    if(localStorage.getItem('TELA_ATUAL') == 'update_pet'){
        afed('#pet_lista','#update_pet','','',2,'home');
        localStorage.setItem('TELA_ATUAL','home');
    }
        
    
}

function sair_app() {
    if (navigator.app && navigator.app.exitApp) {
        navigator.app.exitApp();
    } else if (navigator.device && navigator.device.exitApp) {
        navigator.device.exitApp();
    } else {
        alert('Erro');
    }
}

function responseMessageCalback(type, messenge, afterClose=null){
    Swal.fire({
        type: type,
        text: messenge,
        timer: 5000,
        onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {}, 100)
        },
        onClose: () => {
            console.log("acao apos fechar automatico");
            
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            // console.log('I was closed by the timer');
        }
    });
}

function recuperaEmail(){
    var erro  = $('#email_recupera').val();
    if(erro.length>0){
        var dados = 'email='+erro+'&origin=mobileApp';
        $.ajax({
            type: 'POST',
            data: dados,
            url: localStorage.getItem('DOMINIO')+'mail_template/pt-br/recupera_senha.php',
            crossDomain: true,
            dataType   : 'json',
            beforeSend : function() { $("#wait").css("display", "block"); },
            complete   : function() { $("#wait").css("display", "none"); },
            success: function(retorno){
                console.log(retorno);
                if (retorno.statuscode == 200 && retorno.status == "successoEmailEnviado") {
                    app2.sheet.close('.recuperaSenha', true);
                    responseMessageCalback('success', 'Dados para recuperação de senha enviado por email Verifique seu email!');
                    $("#email_recupera").val("");
                }else if (retorno.statuscode == 204 && retorno.status == "emailNaoEnviadoErro"){
                    app2.sheet.close('.recuperaSenha', true);
                    responseMessageCalback('warning', 'não foi possivel processar o pedido, tente mais tarde!');
                    $("#email_recupera").val("");
                }else{
                    app2.sheet.close('.recuperaSenha', true);
                    responseMessageCalback('error', 'Não foi possivel solicitar a recuperacao da senha! Entre em contato com a administração!');
                    $("#email_recupera").val("");
                }
                
            },
            error: function(){
            }
        })
    }
}

//function onPrompt(results) {
//    alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
//}