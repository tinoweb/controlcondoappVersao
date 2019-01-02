function atualiza_notificacao(){
    "use strict";
    var id_usuario_condominio = $("#ID_USER").attr("value");
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/atualiza_notificacao.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : { 
						usuario:id_usuario_condominio,
			               tipo:'atualiza'
		             },
        dataType   : 'json',
		success: function(retorno){
            console.log(retorno);
			
			/* Preenche qtde de notificacao */
			retorno.Ocorrencia == "0" ? $("#n_ocorrencias").css("display","none"):$("#n_ocorrencias").html("<strong>"+retorno.Ocorrencia+"</strong>");
			retorno.Comunicado == "0" ? $("#n_comunicado").css("display","none"):$("#n_comunicado").html("<strong>"+retorno.Comunicado+"</strong>");
			retorno.Documento  == "0" ? $("#n_documento").css("display","none"):$("#n_documento").html("<strong>"+retorno.Documento+"</strong>");
			retorno.Liberacao  == "0" ? $("#n_liberacao").css("display","none"):$("#n_liberacao").html("<strong>"+retorno.Liberacao+"</strong>");
			retorno.Reserva    == "0" ? $("#n_reservas").css("display","none"):$("#n_reservas").html("<strong>"+retorno.Reserva+"</strong>");
			retorno.Entrega    == "0" ? $("#n_entregas").css("display","none"):$("#n_entregas").html("<strong>"+retorno.Entrega+"</strong>");
			retorno.Pet        == "0" ? $("#n_pet").css("display","none"):$("#n_pet").html("<strong>"+retorno.Pet+"</strong>");
			retorno.Camera     == "0" ? $("#n_camera").css("display","none"):$("#n_camera").html("<strong>"+retorno.Camera+"</strong>");
			retorno.Enquete    == "0" ? $("#n_enquetes").css("display","none"):$("#n_enquetes").html("<strong>"+retorno.Enquete+"</strong>");
			
		},
        error : function() {
           
        }
	});	
}
