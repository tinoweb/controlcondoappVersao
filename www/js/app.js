/* formulário vazio */
function login_user_device() {
	SERVIDOR_CAMINHO = 'https://www.controlcondo.com.br/controlcondo/v2/';
    PullToRefresh.init({
        mainElement: 'body',
        onRefresh: function(){
            // What do you want to do when the user does the pull-to-refresh gesture
        },
        distThreshold : 50, // Minimum distance required to trigger the refresh.
        iconArrow: '<span class="fa fa-arrow-down"></span>', // The icon for both instructionsPullToRefresh and instructionsReleaseToRefresh
        instructionsPullToRefresh: "Puxe para atualizar",
        instructionsReleaseToRefresh: "Solte para atualizar",
        instructionsRefreshing: "Atualizando"
    });  
	if(navigator.connection.type != 'none'){
		processando(1);
		$.ajax({
			type: 'POST',
			url: SERVIDOR_CAMINHO+'appweb/login.php',
			data: 'uuid='+device.uuid,
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			success: function(retorno){
				//alert(retorno);
				if(retorno == ''){
					processando(0);
				}else{
					var dados_user = retorno.split(';')
					var dados_morador = dados_user[22].split(',')
					ID_USER = dados_user[0];
					ID_MORADOR = dados_user[1];
					ID_UNIDADE = dados_user[2];
					ID_CONDOMINIO = dados_user[3];
					CONDOMINIO = dados_user[4];
					if(dados_user[5].indexOf("Morador") != -1){ GRUPO_MOR = 1; $( "#gmor" ).css("display","block"); }
					if(dados_user[5].indexOf("Sindico") != -1){ GRUPO_SIN = 1; $( "#gsin" ).css("display","block"); }
					if(dados_user[5].indexOf("Administração") != -1){ GRUPO_ADM = 1; $( "#gadm" ).css("display","block"); }
					if(dados_user[5].indexOf("Administradora") != -1){ GRUPO_ADM2 = 1; $( "#gadm2" ).css("display","block"); }
					if(dados_user[5].indexOf("Diretoria") != -1){ GRUPO_DIR = 1; $( "#gdir" ).css("display","block"); }
					MHOME = dados_user[6];
					MCOMUNICADOS = dados_user[7];
					MLUNICA = dados_user[8];
					MLRECORRENTE = dados_user[9];
					MRESERVA = dados_user[10];
					MENTREGAS = dados_user[11];
					MFALE = dados_user[12];// chat morador
					MENQUENTE = dados_user[13];
					MDOCUMENTOS = dados_user[14];
					MRELATORIOS = dados_user[15];
					CCOMUNICADOS = dados_user[16];
					CUNIDADES = dados_user[17];
					CMORADORES = dados_user[18];
					CRESERVA = dados_user[19];
					//CFALE = dados_user[20];
					CENQUETE = dados_user[20];
					CDOCUMENTOS = dados_user[21];
					MORADOR_NOME = dados_morador[0];
					MORADOR_PARENTESCO = dados_morador[1];
					MORADOR_SEXO = dados_morador[2];
					QUADRA = dados_morador[3];
					LOTE = dados_morador[4];
					$( '.user_foto' ).css("background-image", "url(data:image/jpeg;base64,"+dados_morador[5]+")");
					afed('#home','#login_ini','','',3,'home');
					inicia(0);
					$( ".perfil_condominio" ).html(CONDOMINIO);
					$( ".perfil_nome" ).html(MORADOR_NOME);
					$( "#bloco" ).html(QUADRA);
					$( "#apto" ).html(LOTE);
//					$( '.user_foto' ).css("background-image", "url("+SERVIDOR_CAMINHO+"appweb/foto_morador.php?id="+ID_MORADOR+"&sexo="+MORADOR_SEXO+")");
					if(MORADOR_PARENTESCO == 1){ $( "#edit_moradores" ).css("display","block"); }
					//carrega_notificacoes(1);
					processando(0);
                    
				}
			}
		});
	}else{
		notifica('Internet/Sem conex\u00e3o com a Internet/Fechar',2000,0);
	}
    
}










