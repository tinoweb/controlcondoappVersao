// JavaScript Document

function carrega_morador(){
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/morador_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_unidade : $( "#DADOS #ID_UNIDADE" ).val() },
        dataType   : 'json',
		success: function(retorno){
            var dados = '';
            for (x in retorno) {
				
				var morador =  	'<div class="card morador-card" onClick="carrega_morador_dados(\''+retorno[x]['id']+'\')">'+
									'<div class="card-header">'+
										'<div class="morador-avatar" style="background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+');"></div>'+
										'<div class="morador-name">'+retorno[x]['nome']+'</div>'+
										'<div class="morador-date">'+retorno[x]['descricao']+'</div>'+
									'</div>'+
                            	'</div>';

                /*var morador = '<div class="morador" onClick="carrega_morador_dados(\''+retorno[x]['id']+'\')"><div class="morador_foto" style="background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+');"></div><strong style="font-family: \'Roboto Condensed\';font-size: 12px;font-weight: bold; color: #0078d0;">'+retorno[x]['nome']+'</strong><span style="font-size:11px">'+retorno[x]['descricao']+'</span></div>';*/
                dados = dados + morador;
            }
            $( "#morador_retorno" ).html(dados);
            //alert(retorno);
            afed('#moradores','#home','','',2,'moradores');
       
        },
        error      : function() {
            alert('Erro ao carregar');

        }
	});	

}

function carrega_morador_dados(id_morador){
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/morador_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_morador : id_morador },
        dataType   : 'json',
		success: function(retorno){
            
            $( "#mor_id_morador" ).val(id_morador);
			$( "#mor_nome" ).val(retorno[0]['nome']);
			$( "#mor_rg" ).val(retorno[0]['rg']);
			$( "#mor_cpf" ).val(retorno[0]['telefone']);
			$( "#mor_nascimento" ).val(retorno[0]['nascimento']);
			$( "#mor_parentesco" ).val(retorno[0]['descricao']);
			$( "#mor_email" ).val(retorno[0]['email']);
			if(retorno[0]['masculino'] == 1){
                document.getElementById("mor_homem").checked = true;
			}else{
                document.getElementById("mor_mulher").checked = true;
			}
			if(retorno[0]['autoriza'] == 1){
                document.getElementById("mor_autoriza").checked = true;
			}else{
                document.getElementById("mor_autoriza").checked = false;
			}
			if(retorno[0]['usar_control_condo'] == 1){
                document.getElementById("mor_controlcondo").checked = true;
			}else{
                document.getElementById("mor_controlcondo").checked = false;
			}
			$( "#mor_msg" ).val(retorno[0]['observacao']);
            afed('#morador','#moradores','','',2,'morador');
        
        },
        error      : function() {
            alert('Erro ao carregar');

        }
	});	

}

function atualiza_morador(){
	var dados = $( "#form_moradores" ).serialize();
    //alert(dados);
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/morador_update.php',
		data: dados+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val(),
		success: function(retorno){
			//alert(retorno);
            afed('#moradores','#morador','','',2,'moradores');
            carrega_morador();
		},
		error: function(data){
			alert('erro');
	    }	
	});	
}

function insert_morador(){
	var dados = $( "#form_moradores" ).serialize();
    //alert(dados);
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/morador_update.php',
		data: dados+'&id='+$( "#DADOS #ID_MORADOR" ).val()+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val(),
		success: function(retorno){
			//alert(retorno);
            afed('#moradores','#morador','','',2,'moradores');
		},
		error: function(data){
			alert('erro');
	    }	
	});	
}