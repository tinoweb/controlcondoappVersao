// JavaScript Document

//FUNCAO CARREGA TODAS AREAS COMUNS
function carrega_cameras(){
    afed('#cameras_condominio','#home','','',3,'reservas');
    var tamanhow = $("#cameras_scroll").width();
    var tamanhoh = (tamanhow * 0.56);
    $(".caixa_camera").width(tamanhow/2)
    $(".caixa_camera").height(tamanhoh/2);
//	$.ajax({
//		type: 'POST',
//		url: localStorage.getItem('DOMINIO')+'appweb/area_comum_get.php',
//        crossDomain: true,
//        beforeSend : function() { },
//        complete   : function() { },
//        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val()},
//        dataType   : 'json',
//		success: function(retorno){
// //           dados = '<div class="area col button button-big button-raised button-fill link popup-open" style=" margin-bottom: 4%;" onClick="carrega_minha_reserva(\'0\');">MINHAS RESERVAS</div>';
//            dados = '<div class="area col button button-big button-raised button-fill link popup-open" style=" margin-bottom: 4%;" onClick="carrega_minha_reserva(\'0\');">MINHAS RESERVAS</div>';
//            for (x in retorno) {
//                var dado = '<div class="area" onClick="carrega_area(\''+retorno[x]['id_area_comum']+'\',\'1\',\''+retorno[x]['nome']+'\');"><strong>'+retorno[x]['nome']+'</strong></div>';
//                var dado_select = '<option value="'+retorno[x]['id_area_comum']+'">'+retorno[x]['nome']+'</option>';
//                dados = dados + dado;
//                dados_select = dados_select + dado_select;
//            }
//			$( "#areas_retorno" ).html(dados);
//			$( "#filtro_r_area" ).html(dados_select);
//			afed('#reservas','#home','','',3,'reservas');
//
//		}
//	});	
}