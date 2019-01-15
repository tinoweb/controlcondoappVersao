// JavaScript Document

function carrega_morador(){
	//alert(1);
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/morador_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_unidade : $( "#DADOS #ID_UNIDADE" ).val() },
        dataType   : 'json',
		success: function(retorno){
			//alert(2);
			localStorage.setItem('TEM_TITULAR','0');
			var qtd_u_cc = 0;
            var dados = '';
            for (x in retorno) {
				if(retorno[x]['foto'] == ''){
				   var foto_morador = 'img/user2.png';
				}else{
				   var foto_morador = 'data:image/jpeg;base64,'+retorno[x]['foto']+'';
				}
				if(retorno[x]['parentesco'] == 1){
				   localStorage.setItem('TEM_TITULAR','1');
				}
				if(retorno[x]['usar_control_condo'] == 1){
				
				   qtd_u_cc++;
					
				   localStorage.setItem('QTD_USUARIO_CC',qtd_u_cc);
				}
				
				var morador =  	'<div class="card morador-card" onClick="carrega_morador_dados(\''+retorno[x]['id']+'\')">'+
									'<div class="card-header">'+
										'<div class="morador-avatar" style="background-image:url('+foto_morador+');"></div>'+
										'<div class="morador-name">'+retorno[x]['nome']+'</div>'+
										'<div class="morador-date">'+retorno[x]['descricao']+'</div>'+
									'</div>'+
                            	'</div>';

                /*var morador = '<div class="morador" onClick="carrega_morador_dados(\''+retorno[x]['id']+'\')"><div class="morador_foto" style="background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+');"></div><strong style="font-family: \'Roboto Condensed\';font-size: 12px;font-weight: bold; color: #0078d0;">'+retorno[x]['nome']+'</strong><span style="font-size:11px">'+retorno[x]['descricao']+'</span></div>';*/
                dados = dados + morador;
            }
			//alert(localStorage.getItem('QTD_USUARIO_CC'));
            $( "#morador_retorno" ).html(dados);
            //alert(retorno);
            afed('#moradores','#home','','',2,'moradores');
       
        },
        error      : function() {
			alert(3);
            alerta(4);

        }
	});	

}

function carrega_morador_dados(id_morador){

	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/morador_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_morador : id_morador },
        dataType   : 'json',
		success: function(retorno){
            //alert(localStorage.getItem('TEM_TITULAR'));
			if(retorno[0]['foto'] == ''){
			   var foto_morador = 'img/user2.png';
			}else{
			   var foto_morador = 'data:image/jpeg;base64,'+retorno[0]['foto']+'';
			}

			$( '#foto_morador_edit' ).css("background-image", "url("+foto_morador+")");
            $( "#mor_id_morador" ).val(id_morador);
            $( "#mor_veiculo_id_morador" ).val(id_morador);
            $( "#mor_contato_id_morador" ).val(id_morador);
			$( "#mor_nome" ).val(retorno[0]['nome']);
			$( "#mor_rg" ).val(retorno[0]['rg']);
			$( "#mor_cpf" ).val(retorno[0]['telefone']);
			$( "#mor_nascimento" ).val(retorno[0]['nascimento']);
			$( "#mor_unidade" ).val(retorno[0]['unidade']);
			if(id_morador == 0){
				//alert($( "#DADOS #ID_UNIDADE" ).val());
	   			$( "#mor_unidade" ).val($( "#DADOS #ID_UNIDADE" ).val());
				$("#tab_add_morador_veiculo,#tab_add_morador_contato").addClass("disabled");
			}else{
				$("#tab_add_morador_veiculo,#tab_add_morador_contato").removeClass("disabled");
			}

			var paretesco_dados = '<option value="0">Selecione</option>';
			for (x in retorno[0]['parentescos']) {
				if(localStorage.getItem('TEM_TITULAR') == 1 && retorno[0]['parentescos'][x]['id'] == 1){
					paretesco_dados = paretesco_dados + '<option disabled value="'+retorno[0]['parentescos'][x]['id']+'">'+retorno[0]['parentescos'][x]['descricao']+'</option>';

				}else{
					paretesco_dados = paretesco_dados + '<option value="'+retorno[0]['parentescos'][x]['id']+'">'+retorno[0]['parentescos'][x]['descricao']+'</option>';
				}
			}
			$( "#mor_parentesco" ).html(paretesco_dados);
			$( "#mor_parentesco" ).val(retorno[0]['parentesco']);
			$( "#mor_parentesco_hidden" ).val(retorno[0]['parentesco']);
			if(retorno[0]['parentesco'] == 1){
				$("#mor_parentesco").addClass("disabled");
			}else{
				$("#mor_parentesco").removeClass("disabled");
			}
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
				
				if(retorno[0]['veiculos'][x]['foto'] == ""){
					var fotov = '<i class="icon material-icons" style="margin: 0px 0 0 8px;  ">directions_car</i>';
				}else{
					var fotov = '<img style="width:40px;height:40px; background-image:url(data:image/jpeg;base64,'+retorno[0]['veiculos'][x]['foto']+'); background-size: 52px; background-position: center center; border-radius: 20px;" />';
				}
				
				veiculos_dados = veiculos_dados + 
					'<li>'+
					'<a href="#" class="item-link item-content sheet-open" data-sheet=".veiculo-morador" onClick="veiculo_marca_modelo_cor('+retorno[0]['veiculos'][x]['id']+',1)">'+
					'<div class="item-media" style="width: 44px; height: 44px; margin-top:15px; border-radius: 22px; border: 2px solid #8e8e93;">'+fotov+'</div>'+
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
					'<a href="#" class="item-link item-content sheet-open" data-sheet=".contato-morador" onClick="contatos('+retorno[0]['contatos'][x]['id_contato']+',1)" >'+
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
			
			if(localStorage.getItem('TELA_ATUAL') == 'morador_perfil'){
				$("#voltar_morador").attr("onclick","afed('#home','#morador','','',2,'home');");
			}else{
				$("#voltar_morador").attr("onclick","afed('#moradores','#morador','','',2,'moradores');");
				afed('#morador','#moradores','','',2,'morador');
			}
            
        
        },
        error      : function() {
            alerta(4);

        }
	});
}

function atualiza_morador(){
	
	var dados = $( "#form_moradores" ).serialize();
    if($('#mor_nome').val() != '' && $('#mor_rg').val() != '' && $('#mor_cpf').val() != '' && $('#mor_nascimento').val() != '' && $('#mor_parentesco').val() != 0 && localStorage.getItem('QTD_USUARIO_CC') < localStorage.getItem('QTD_CONTROL_CONDO')){
	
		if( $("#mor_controlcondo").is(":checked") == true && $('#mor_email').val() == '' ){
			alerta('',"Informe um email");
		}else if($("#mor_id_morador").val() == $( "#DADOS #ID_MORADOR" ).val() && $("#mor_controlcondo").is(":checked") == false){
			alerta('',"Você não pode desativar seu perfil, contate o administrador");	 
		}else{
//			alert('Atualiza');
			$.ajax({
				type: 'POST',
				url: localStorage.getItem('DOMINIO')+'appweb/morador_update.php',
				data: dados+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val(),
				crossDomain: true,
				beforeSend : function() { $("#wait").css("display", "block"); },
				complete   : function() { $("#wait").css("display", "none"); },
				success: function(retorno){
					//alert(retorno);
					if(retorno == '1A'){
						alerta(2);
					}else{
						alerta(1);
					}
					$( '#mor_foto_up' ).val('');
					afed('#moradores','#morador','','',2,'moradores');
					carrega_morador();
				},
				error: function(data){
					alerta(4);
				}	
			});	
		}
	}else{
		if($('#mor_nome').val() == ''){
		   	alerta('',"Informe um nome");
		}else if($('#mor_rg').val() == ''){
			alerta('',"Informe um rg");
		}else if($('#mor_cpf').val() == ''){
			alerta('',"Informe um cpf");
		}else if($('#mor_nascimento').val() == ''){
			alerta('',"Informe uma data nascimento");
		}else if($('#mor_parentesco').val() == ''){
			alerta('',"Informe um parentesco");
		}else if(localStorage.getItem('QTD_USUARIO_CC') >= localStorage.getItem('QTD_CONTROL_CONDO')){
			alerta('',"Você ja possui "+localStorage.getItem('QTD_USUARIO_CC')+", contate o administrador. ");
		}
	}
}

function delete_morador(){
	if($("#mor_id_morador").val() == $( "#DADOS #ID_MORADOR" ).val()){
			alerta('',"Você não pode desativar seu perfil, contate o administrador</em>");	 
	}else{
		app2.dialog.confirm('Confirma a exclusão','Excluir', function () {
			var dados = $( "#form_moradores" ).serialize();
			$.ajax({
				type: 'POST',
				url: localStorage.getItem('DOMINIO')+'appweb/morador_update.php',
				data: dados+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&excluir=1',
				success: function(retorno){
					if(retorno == 'E'){
						//alerta(2);
						alerta(3);					
					}else{
						//alerta(1);
						alerta(4);
					}
						afed('#moradores','#morador','','',2,'moradores');
						carrega_morador();

				},
				error: function(data){
					alerta(4);
				}	
			});	
		});
	}
	
}


//function insert_morador(){
//	var dados = $( "#form_moradores" ).serialize();
//    //alert(dados);
//	$.ajax({
//		type: 'POST',
//		url: localStorage.getItem('DOMINIO')+'appweb/morador_update.php',
//		data: dados+'&id='+$( "#DADOS #ID_MORADOR" ).val()+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val(),
//		success: function(retorno){
//			//alert(retorno);
//            afed('#moradores','#morador','','',2,'moradores');
//		},
//		error: function(data){
//			alert('erro');
//	    }	
//	});	
//}