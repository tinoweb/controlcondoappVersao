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
                var morador = '<div class="morador" onClick="carrega_morador_dados(\''+retorno[x]['id']+'\')"><div class="morador_foto" style="background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+');"></div><strong style="font-family: \'Roboto Condensed\';font-size: 12px;font-weight: bold; color: #0078d0;">'+retorno[x]['nome']+'</strong><span style="font-size:11px">'+retorno[x]['descricao']+'</span></div>';
                dados = dados + morador;
            }
            $( "#morador_retorno" ).html(dados);
            //alert(retorno);
            afed('#moradores','#home','','',2);
            localStorage.setItem('TELA_ATUAL','moradores');
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
			if(retorno[0]['masculino'] == 1){
				//$( "#mor_homem" ).css("display","block");
				//$( "#mor_mulher" ).css("display","none");
                //$( "#mor_homem" ).attr( "checked" );
                document.getElementById("mor_homem").checked = true;
			}else{
				//$( "#mor_homem" ).css("display","none");
				//$( "#mor_mulher" ).css("display","block");
                //$( "#mor_mulher" ).attr( "checked" );
                document.getElementById("mor_mulher").checked = true;
			}
			$( "#mor_msg" ).val(retorno[0]['observacao']);
			$( "#mor_telr" ).val(retorno[0]['tel_tel']);
			$( "#mor_telc" ).val(retorno[0]['tel_com']);
			$( "#mor_telcel" ).val(retorno[0]['tel_cel']);
            afed('#morador','#moradores','','',2);
            localStorage.setItem('TELA_ATUAL','morador');
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
            afed('#moradores','#morador','','',2);
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
            afed('#moradores','#morador','','',2);
		},
		error: function(data){
			alert('erro');
	    }	
	});	
}