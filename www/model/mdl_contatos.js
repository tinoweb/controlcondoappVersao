// JavaScript Document

function contatos(id_contato,tipo){
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/contato_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_contato : id_contato },
        dataType   : 'json',
		success: function(retorno){
			var tipos_dados = '';
			for (x in retorno[0]['tipos']) {
				tipos_dados = tipos_dados + '<option value="'+retorno[0]['tipos'][x]['id']+'">'+retorno[0]['tipos'][x]['descricao']+'</option>';
			}	
			
			if(tipo == 1){
				$( "#mor_tipo_contato" ).html(tipos_dados);
				$( "#mor_tipo_contato" ).val(retorno[0]['tipo']);				
				$( "#mor_contato" ).val(retorno[0]['contato']);
				$( "#mor_id_contato" ).val(retorno[0]['id']);
			}
						        
        },
        error      : function() {
            alert('Erro ao carregar');

        }
	});	

}