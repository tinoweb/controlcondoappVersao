//FUNCAO CARREGA TODOS VISITAMTES
function carrega_visitantes(sql){
    //alert(sql);
    var dados = '';
    if(sql != ''){
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/visitante_get.php',
            crossDomain: true,
            data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(),sql : sql},
            dataType   : 'json',
            success: function(retorno){
                for (x in retorno) {
                    var dadof = '<div class="liberado_foto" ';
                    if(retorno[x]['foto'].length>0){
                        dadof = dadof + 'style="background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+')" ';
                    }
                    var dado = '<div class="visitanteb" onClick="escolhe_visita(\''+retorno[x]['id']+'\',\''+retorno[x]['nome']+'\',\''+retorno[x]['rg']+'\')">';
                    dado     = dado+dadof+'></div><strong>'+retorno[x]['nome']+'</strong><span>'+retorno[x]['rg']+'</span></div>';
                    //var dado = '<div class="visitanteb">teste</div>';
                    dados = dados + dado;
                }

                $( "#retorno_visita" ).html(dados);
                //alert(dados);
            },
            error      : function(error) {
                //console.log(error);
                //alert('Erro ao carregar visitantes');
            }
        });
    }else{
        $( "#retorno_visita" ).html('');
    }
}

//FUNCAO SELECIONA UM VISITANTE
function escolhe_visita(id,nome,rg){

	$( "#add_liberacao #nome" ).val(nome);
	$( "#add_liberacao #rg" ).val(rg);
	$( "#add_liberacao #visita" ).val(id);
	afed('#liberacao2','#visitantes','','',3);
    localStorage.setItem('TELA_ATUAL','liberacao_add');

}

//FUNCAO NOVO VISITANETE
function novo_visitante(){

    $( '#foto_visitante' ).css("background-image", "url(img/user2.png)");
    $( "#add_visitante #nome" ).val('');    
    $( "#add_visitante #rg" ).val('');
    $( "#add_visitante #cpf" ).val('');
    $( "#add_visitante #end" ).val('');
    $( "#add_visitante #num" ).val('');
    $( "#add_visitante #bairro" ).val('');
    $( "#add_visitante #cidade" ).val('');
    $( "#add_visitante #uf" ).val('');
    $( "#add_visitante #cep" ).val('');
    $( "#add_visitante #cel" ).val('');
    $( "#add_visitante #fone" ).val('');
    $( "#add_visitante #email" ).val('');
    $( "#add_visitante #obs" ).val('');
    
    afed('#visitante','#visitantes','','','2');
    $("#visi_scroll").scrollTop(0);
    localStorage.setItem('TELA_ATUAL','visitante');
	("#add_visitante #nome").focus();
}

//FUNCAO SALVA CADASTRO VISITANETE
function salva_visitante(){
	var msg = '';
	if($( "#add_visitante #nome" ).val() == '' || $( "#add_visitante #rg" ).val() == ''){
		notifica('Preencha o campo/Preencha os campos Nome e RG/Ok',1000,0);
	}else{
		//processando(1);
		
		var dados = $( "#add_visitante" ).serialize();
		$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/visitante_insert.php',
            crossDomain: true,
            beforeSend : function() {  },
            complete   : function() {  },
            data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&id_morador='+$( "#DADOS #ID_MORADOR" ).val()+'&'+dados,
            //data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(),sql : sql},
            dataType   : 'json',
			//url: SERVIDOR_CAMINHO+'appweb/visitante_salva.php',
			//data: dados+'&id_morador='+ID_MORADOR+'&banco='+BANCO+'&id_unidade='+ID_UNIDADE,
			success: function(retorno){
				//alert(retorno);
				if (retorno[0]['id'] == 0) {
					notifica('Aviso/RG já registrado/OK',0,0);
				}else{
					$( "#add_liberacao #nome" ).val(retorno[0]['nome']);
					$( "#add_liberacao #rg" ).val(retorno[0]['rg']);
					$( "#add_liberacao #visita" ).val(retorno[0]['id']);

					afed('#liberacao2','#visitante','','',3);
					
                    localStorage.setItem('TELA_ATUAL','liberacao_add');
				}
				//alert(retorno);
			}
		});
	}
}

function foto_visitante(){
    navigator.notification.confirm(
        'Escolha uma opção',  // message
        foto_v_carrega,              // callback to invoke with index of button pressed
        'Visitante',            // title
        'Camera,Galeria'          // buttonLabels
    );
}

function foto_v_carrega(opcao) {
    if(opcao == 1){
        //alert('Camera');
        app.foto_visitante();
    }else if(opcao == 2){
        //alert('Galeria');
        app.foto_visitante2();
    }
}
