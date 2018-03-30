// LOGIN USUARIO DEVICE (VALIDA O LOGIN PELO ID DO DISPOSITIVO)
function login_user_device() {
    //alert('entro login');
	SERVIDOR_CAMINHO = 'https://www.controlcondo.com.br/controlcondo/';
	if(navigator.connection.type != 'none'){
		processando(1);
		$.ajax({
			type: 'POST',
			url: SERVIDOR_CAMINHO+'appweb/login.php',
			data: 'uuid='+device.uuid,
			success: function(retorno){
				if(retorno == ''){
					processando(0);
				}else{
					var dados_user = retorno.split(';');
					var dados_morador = dados_user[22].split(',');
					$( "#DADOS #ID_USER" ).val(dados_user[0]);
					$( "#DADOS #ID_MORADOR" ).val(dados_user[1]);
					$( "#DADOS #ID_UNIDADE" ).val(dados_user[2]);
					$( "#DADOS #ID_CONDOMINIO" ).val(dados_user[3]);
                    //alert($( "#DADOS #ID_CONDOMINIO" ).val());
					$( "#DADOS #CONDOMINIO" ).val(dados_user[4]);
					if(dados_user[5].indexOf("Morador") != -1){ $( "#DADOS #GRUPO_MOR" ).val(1); $( "#gmor" ).css("display","block"); }
					if(dados_user[5].indexOf("Sindico") != -1){ $( "#DADOS #GRUPO_SIN" ).val(1); $( "#gsin" ).css("display","block"); }
					if(dados_user[5].indexOf("Administração") != -1){ $( "#DADOS #GRUPO_ADM" ).val(1); $( "#gadm" ).css("display","block"); }
					if(dados_user[5].indexOf("Administradora") != -1){ $( "#DADOS #GRUPO_ADM2" ).val(1); $( "#gadm2" ).css("display","block"); }
					if(dados_user[5].indexOf("Diretoria") != -1){ $( "#DADOS #GRUPO_DIR" ).val(1); $( "#gdir" ).css("display","block"); }
					$( "#DADOS #MHOME" ).val(dados_user[6]);
					$( "#DADOS #MCOMUNICADOS" ).val(dados_user[7]);
					$( "#DADOS #MLUNICA" ).val(dados_user[8]);
					$( "#DADOS #MLRECORRENTE" ).val(dados_user[9]);
					$( "#DADOS #MRESERVA" ).val(dados_user[10]);
					$( "#DADOS #MENTREGAS" ).val(dados_user[11]);
					$( "#DADOS #MFALE" ).val(dados_user[12]);
					$( "#DADOS #MENQUENTE" ).val(dados_user[13]);
					$( "#DADOS #MDOCUMENTOS" ).val(dados_user[14]);
					$( "#DADOS #MRELATORIOS" ).val(dados_user[15]);
					$( "#DADOS #CCOMUNICADOS" ).val(dados_user[16]);
					$( "#DADOS #CUNIDADES" ).val(dados_user[17]);
					$( "#DADOS #CMORADORES" ).val(dados_user[18]);
					$( "#DADOS #CRESERVA" ).val(dados_user[19]);
					$( "#DADOS #CENQUETE" ).val(dados_user[20]);
					$( "#DADOS #CDOCUMENTOS" ).val(dados_user[21]);
					MORADOR_NOME = dados_morador[0];
					MORADOR_PARENTESCO = dados_morador[1];
					MORADOR_SEXO = dados_morador[2];
					QUADRA = dados_morador[3];
					LOTE = dados_morador[4];
					$( '.user_foto' ).css("background-image", "url(data:image/jpeg;base64,"+dados_morador[5]+")");
					afed('#home','#login_ini','','',3);
					inicia(0);
					$( ".perfil_condominio" ).html(CONDOMINIO);
					$( ".perfil_nome" ).html(MORADOR_NOME);
					$( "#bloco" ).html(QUADRA);
					$( "#apto" ).html(LOTE);
//					$( '.user_foto' ).css("background-image", "url("+SERVIDOR_CAMINHO+"appweb/foto_morador.php?id="+ID_MORADOR+"&sexo="+MORADOR_SEXO+")");
					if(MORADOR_PARENTESCO == 1){ $( "#edit_moradores" ).css("display","block"); }
					//carrega_notificacoes(1);
                    carrega_notificacoes();
                    carrega_chat();
					processando(0);
                    
				}
			},
            error: function (e) {

                alert('Erro ao logar');
                
            }
		});
	}else{
		notifica('Internet/Sem conex\u00e3o com a Internet/Fechar',2000,0);
	}
}

// FUNCAO LOGIN USUARIO (LOGIN POR EMAIL/SENHA)
function login_user() {
	if(navigator.connection.type != 'none'){
		var dados = $( "#form_login" ).serialize();
		$.ajax({
			type: 'POST',
			url: SERVIDOR_CAMINHO+'appweb/login.php',
			data: dados+'&nome='+device.model+'&sistema='+device.platform+'&uuid='+device.uuid+'&versao='+device.version,
			success: function(retorno){
				if(retorno == 'erro1'){
					notifica('Falha ao Entrar/Usu\u00e1rio ou senha inv\u00e1lida/Fechar',2000,0);
				}else{
					//alert(retorno);
					login_user_device();	
				}
			}
		});
	}else{
		notifica('Internet/Sem conex\u00e3o com a Internet/Fechar',2000,0)
	}
}

// FUNCAO lOGOUT 
function logout(){
	processando(1);
	$.ajax({
		type: 'POST',
		url: SERVIDOR_CAMINHO+'appweb/logout.php',
		data: 'id='+ID_USER,
		success: function(retorno){
			afed('#login_ini','#home','','',2);
			processando(0);
		}
	});
}