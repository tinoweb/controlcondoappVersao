// JavaScript Document

function veiculo_marca_modelo_cor(id_veiculo,tipo,marca=''){
	//alert(marca+'???'+modelo+'???'+cor+'???'+tipo);
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/veiculo_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_veiculo : id_veiculo, tipo_busca : tipo, marca : marca },
        dataType   : 'json',
		success: function(retorno){
			if(tipo == 1){
				var marca_dados = '';
				for (x in retorno[0]['marcas']) {
					marca_dados = marca_dados + '<option value="'+retorno[0]['marcas'][x]['id']+'">'+retorno[0]['marcas'][x]['marca']+'</option>';
				}
			}
			if(tipo == 1 || tipo == 2){
				var modelo_dados = '';
				for (x in retorno[0]['modelo']) {
					modelo_dados = modelo_dados + '<option value="'+retorno[0]['modelo'][x]['id']+'">'+retorno[0]['modelo'][x]['modelo']+'</option>';
				}
			}
			if(tipo == 1){
			var cor_dados = '';
			for (x in retorno[0]['cor']) {
				cor_dados = cor_dados + '<option value="'+retorno[0]['cor'][x]['id']+'">'+retorno[0]['cor'][x]['cor']+'</option>';
			}
			}
			
			if(tipo == 1){
				$( "#id_carro" ).val(retorno[0]['veiculo'][0]['id']);
				$( "#marca_carro" ).html(marca_dados);
				$( "#marca_carro" ).val(retorno[0]['veiculo'][0]['marca']);
				$( "#modelo_carro" ).html(modelo_dados);
				$( "#modelo_carro" ).val(retorno[0]['veiculo'][0]['modelo']);
				$( "#cor_carro" ).html(cor_dados);
				$( "#cor_carro" ).val(retorno[0]['veiculo'][0]['cor']);
				$( "#id_carro" ).val(id_veiculo);
				$( "#placa_carro" ).val(retorno[0]['veiculo'][0]['placa']);
				$( '#foto_morador_veiculo' ).css("background-image", "url(data:image/jpeg;base64,"+retorno[0]['veiculo'][0]['foto']+")");
				if(retorno[0]['veiculo'][0]['id'] == 0){
					$( '#foto_veiculo_img' ).val('');
				}
			}else if(tipo == 2) {
				$( "#modelo_carro" ).html(modelo_dados);
			}
						        
        },
        error      : function() {
            alert('Erro ao carregar');

        }
	});	

}

function atualiza_veiculo_morador(){
	
	var dados = $( "#form_morador_veiculo" ).serialize();
    alert(dados);
//	$.ajax({
//		type: 'POST',
//		url: localStorage.getItem('DOMINIO')+'appweb/veiculo_update.php',
//		data: dados+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val(),
//		success: function(retorno){
//			//alert(retorno);
//            afed('#moradores','#morador','','',2,'moradores');
//            carrega_morador();
//		},
//		error: function(data){
//			alert('erro');
//	    }	
//	});	
}
