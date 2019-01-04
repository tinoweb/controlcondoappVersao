function atualiza_notificacao(){
	
	setTimeout(function(){		
		
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
				if(retorno.Ocorrencia == "0"){
				   $("#n_ocorrencias").css("display","none");
				}else{
				   $("#n_ocorrencias").html("<strong>"+retorno.Ocorrencia+"</strong>").show();
				}

				if(retorno.Documento == "0"){
				   $("#n_documento").css("display","none");
				}else{
				   $("#n_documento").html("<strong>"+retorno.Documento+"</strong>").show();
				}

				if(retorno.Liberacao == "0"){
				   $("#n_liberacao").css("display","none");
				}else{
				   $("#n_liberacao").html("<strong>"+retorno.Liberacao+"</strong>").show();
				}

				if(retorno.Reserva == "0"){
				   $("#n_reservas").css("display","none");
				}else{
				   $("#n_reservas").html("<strong>"+retorno.Reserva+"</strong>").show();
				}

				if(retorno.Entrega == "0"){
				   $("#n_entregas").css("display","none");
				}else{
				   $("#n_entregas").html("<strong>"+retorno.Entrega+"</strong>").show();
				}

				if(retorno.Pet == "0"){
				   $("#n_pet").css("display","none");
				}else{
				   $("#n_pet").html("<strong>"+retorno.Pet+"</strong>").show();
				}

				if(retorno.Camera == "0"){
				   $("#n_camera").css("display","none");
				}else{
				   $("#n_camera").html("<strong>"+retorno.Camera+"</strong>").show();
				}

				if(retorno.Enquete == "0"){
				   $("#n_enquetes").css("display","none");
				}else{
				   $("#n_enquetes").html("<strong>"+retorno.Enquete+"</strong>").show();
				}
				
				if(retorno.Comunicado == "0"){
				   $("#n_comunicado").css("display","none");
				}else{
				   $("#n_comunicado").html("<strong>"+retorno.Comunicado+"</strong>").show();
				}

				

			},
			error : function() {

			}
		});							
	},500);
		 
}


function check_leitura(id_modulo,id){
	
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
			            tipo_notificacao:id_modulo,
			              id_notificacao:id,
						            tipo:'check_leitura'
					 },
		success: function(retorno){
			atualiza_notificacao();
		},
		error : function() {

		}
	});			
}
