// JavaScript Document

function carrega_perfil(){
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/perfil_usuario_get.php',
        crossDomain: true,
        beforeSend : function() {  },
        complete   : function() {  },
        data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id : $( "#DADOS #ID_MORADOR" ).val() },
        dataType   : 'json',
		success: function(retorno){
            //alert(retorno);
			$( "#perfil_nome"       ).val(retorno[0]['nome']);
			$( "#perfil_rg"         ).val(retorno[0]['rg']);
			$( "#perfil_cpf"        ).val(retorno[0]['telefone']);
			$( "#perfil_nascimento" ).val(retorno[0]['nascimento']);
			$( "#perfil_parentesco" ).val(retorno[0]['desc_parentesco']);
			if(retorno[0]['masculino'] == 1){
				$( "#perfil_homem"  ).attr("checked","checked");
			}else{
				$( "#perfil_mulher" ).attr("checked","checked");
			}
			$( "#perfil_msg" ).val(retorno[0]['observacao']);
			$( "#perfil_tel" ).val(retorno[0]['tel_res']);
			$( "#perfil_com" ).val(retorno[0]['tel_com']);
			$( "#perfil_cel" ).val(retorno[0]['tel_cel']);
            
            afed('#perfil2','#home','','',2);
            localStorage.setItem('TELA_ATUAL','perfil_usuario_edicao');
        },
        error      : function() {
            alert('Erro ao carregar');

        }
	});	

}

function atualiza_perfil(){
	var dados = $( "#form_perfil_update" ).serialize();
    //alert(dados);
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/perfil_usuario_update.php',
		data: dados+'&id='+$( "#DADOS #ID_MORADOR" ).val()+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val(),
		success: function(retorno){
			//alert(retorno);
            //afed('#home','#perfil2','','',2);
			notifica('Perfil/Perfil gravado/ok',0,0);
		},
		error: function(data){
			alert('erro');
	    }	
	});	
}