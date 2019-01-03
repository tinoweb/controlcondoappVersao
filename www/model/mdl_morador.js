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
            
			$( '#foto_morador_edit' ).css("background-image", "url(data:image/jpeg;base64,"+retorno[0]['foto']+")");
            $( "#mor_id_morador" ).val(id_morador);
			$( "#mor_nome" ).val(retorno[0]['nome']);
			$( "#mor_rg" ).val(retorno[0]['rg']);
			$( "#mor_cpf" ).val(retorno[0]['telefone']);
			$( "#mor_nascimento" ).val(retorno[0]['nascimento']);
			var paretesco_dados = '';
			for (x in retorno[0]['parentescos']) {
				paretesco_dados = paretesco_dados + '<option value="'+retorno[0]['parentescos'][x]['id']+'">'+retorno[0]['parentescos'][x]['descricao']+'</option>';
			}
			$( "#mor_parentesco" ).html(paretesco_dados);
			$( "#mor_parentesco" ).val(retorno[0]['parentesco']);
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
			
			var veiculos_dados = '';
			for (x in retorno[0]['veiculos']) {
				veiculos_dados = veiculos_dados + 
					'<li>'+
					'<a href="#" class="item-link item-content sheet-open" data-sheet=".veiculo-morador" onClick="veiculo_marca_modelo_cor('+retorno[0]['veiculos'][x]['id']+',1)">'+
					'<div class="item-media" style="width: 44px; height: 44px; background-size: 44px; background-position: center center; background-image:url(data:image/jpeg;base64,'+retorno[0]['veiculos'][x]['foto']+'); border-radius: 22px; margin-top:15px;"></div>'+
					'<div class="item-inner">'+
					'<div class="item-title-row">'+
					'<div class="item-title">'+retorno[0]['veiculos'][x]['marca_desc']+' - '+retorno[0]['veiculos'][x]['modelo_desc']+' - '+retorno[0]['veiculos'][x]['cor_desc']+'</div>'+
					'</div>'+
					'<div class="item-subtitle">'+retorno[0]['veiculos'][x]['placa']+'</div>'+
					'</div>'+
					'</a>'+
					'</li>';
			}
			$( "#retorno_veiculo_morador" ).html(veiculos_dados);
			
			var contatos_dados = '';
			for (x in retorno[0]['contatos']) {
				contatos_dados = contatos_dados + 
					'<li>'+
					'<a href="#" class="item-link item-content sheet-open" data-sheet=".contato-morador" >'+
					'<div class="item-inner">'+
					'<div class="item-title">'+
					'<div class="item-header">'+retorno[0]['contatos'][x]['descricao']+'</div>'+
					''+retorno[0]['contatos'][x]['contato']+''+
					'</div>'+
					'<div class="item-after"></div>'+
					'</div>'+
					'</a>'+
					'</li>';
			}
			$( "#retorno_contato_morador" ).html(contatos_dados);
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