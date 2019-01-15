// JavaScript Document

function contatos(id_contato,tipo){
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/contato_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_contato : id_contato },
        dataType   : 'json',
		success: function(retorno){
			var tipos_dados = '<option value="0">Selecione</option>';
			for (x in retorno[0]['tipos']) {
				tipos_dados = tipos_dados + '<option value="'+retorno[0]['tipos'][x]['id']+'">'+retorno[0]['tipos'][x]['descricao']+'</option>';
			}	
			
			if(tipo == 1){
				if(id_contato != 0){
					$( "#mor_tipo_contato" ).html(tipos_dados);
					$( "#mor_tipo_contato" ).val(retorno[0]['tipo']);				
					$( "#mor_contato" ).val(retorno[0]['contato']);
					$( "#mor_id_contato" ).val(retorno[0]['id']);
				}else{
					$( "#mor_tipo_contato" ).html(tipos_dados);
					$( "#mor_tipo_contato" ).val(0);				
					$( "#mor_contato" ).val('');
					$( "#mor_id_contato" ).val(0);
				}
			}
						        
        },
        error      : function() {
            alert('Erro ao carregar');

        }
	});	

}

function atualiza_contato_morador(){
	
	var dados = $( "#form_morador_contato" ).serialize();
	//alert(dados);
	if($('#mor_tipo_contato').val() != 0 && $('#mor_contato').val() != ''){
		
		$.ajax({
			type: 'POST',
			url: localStorage.getItem('DOMINIO')+'appweb/contato_update.php',
			data: dados+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val(),
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			success: function(retorno){
				if(retorno == 'A'){
					alerta(2);
					//alert('Alterado com sucesso');					
				}else{
					alerta(1);
					//alert('Cadastrado com sucesso');
				}
				$(".contato-morador .sheet-close")[0].click();
			  	carrega_morador_dados($('#mor_contato_id_morador').val());
			},
			error: function(data){
				alerta(4);
			}	
		});	

	}else{
		if($('#mor_tipo_contato').val() == 0){
		   	//alerta('',"Informe um tipo de contato");
			alerta('','Informe um tipo de contato');
		}else if($('#mor_contato').val() == ''){
			//alerta('',"Informe um contato");
			alerta('','Informe um contato');
		}
	}
}

function delete_contato_morador(){
	
	app2.dialog.confirm('Confirma a exclusão','Excluir', function () {
		var dados = $( "#form_morador_contato" ).serialize();
		$.ajax({
			type: 'POST',
			url: localStorage.getItem('DOMINIO')+'appweb/contato_update.php',
			data: dados+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&excluir=1',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			success: function(retorno){
				if(retorno == 'E'){
					//alerta(2);
					alerta(3);					
				}else{
					//alerta(1);
					alerta(4);
				}
				$(".contato-morador .sheet-close")[0].click();
			  	carrega_morador_dados($('#mor_contato_id_morador').val());
			},
			error: function(data){
				alerta(4);
			}	
		});	
	});
	
}