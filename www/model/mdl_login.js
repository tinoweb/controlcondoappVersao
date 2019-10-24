// LOGIN USUARIO DEVICE (VALIDA O LOGIN PELO ID DO DISPOSITIVO)
function login_user_device(){
    //alert('Login');
	localStorage.setItem('VERSAO','1.2.3');
    if(navigator.connection.type != 'none'){
        //alert('teste2');
        if(device.uuid == null){
            var UUID = '1234567890';
        }else{
            var UUID = device.uuid;
        }
        //alert(UUID);
        $.ajax({
            type       : "POST",
            //url        : "https://leo.controlcondo.com.br/controlcondo/appweb/login.php",
            url        : localStorage.getItem('DOMINIO')+"appweb/login.php",
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            //data       : {uuid : '123456'}, //local
            data       : {uuid : UUID, id_notificacao : localStorage.getItem('registrationId')}, //APP
            dataType   : 'json',
            success    : function(retorno) {
				//alert(retorno[0]['VERSAO']);
				//if(retorno[0]['VERSAO'] == localStorage.getItem('VERSAO')){
					   //alert('versao ok');
				console.log(retorno);
					if(retorno[0]['error'] == 0){
						if(retorno[0]['VERSAO'] == localStorage.getItem('VERSAO')){
						if(retorno[0]['perfil'] > 1){
							//alert('teste4');
							afed('#login_perfil,#troca_perfil','#login_ini','','',3,'perfil_login');
							carrega_user_perfil(retorno[0]['id_usuario']);

							$( "#DADOS #ID_USER_L" ).val(retorno[0]['id_usuario']);

						}else{    

							if(retorno[0]['usar_control_condo'] == 1){

								//alert('credito:'+retorno[0]['qtd_credito_liberacao']);
								$( "#DADOS #ID_USER" ).val(retorno[0]['id_usuario_condominio']);
								$( "#DADOS #ID_USER_L" ).val(retorno[0]['id_usuario']);
								$( "#DADOS #ID_MORADOR" ).val(retorno[0]['id_referencia']);
								$( "#DADOS #ID_UNIDADE" ).val(retorno[0]['id_unidade']);
								$( "#DADOS #ID_CONDOMINIO" ).val(retorno[0]['id_condominio']);
								//alert($( "#DADOS #ID_CONDOMINIO" ).val());                    
								$( "#DADOS #CONDOMINIO" ).val(retorno[0]['nome_condominio']);
								localStorage.setItem('TIPO_BUSCA_VISITANTE',retorno[0]['tipo_busca_visitante']);
								localStorage.setItem('QTD_CONTROL_CONDO',retorno[0]['qtd_control_condo']);
								localStorage.setItem('QTD_CREDITO',retorno[0]['qtd_credito_liberacao']);
								localStorage.setItem('PERIODO_MAX',retorno[0]['periodo_max_liberacao']);
								localStorage.setItem('EXIBIR_NOME',retorno[0]['exibir_nome_qrcode']);
								//alert(localStorage.getItem('QTD_CONTROL_CONDO'));
								//localStorage.getItem('QTD_CONTROL_CONDO');
								if(retorno[0]['tipo_busca_visitante'] == 0){
									afed('#btipo_nome','#btipo_rg','','',3,'home');
								}else{
									afed('#btipo_rg','#btipo_nome','','',3,'home');
								}
								if(retorno[0]['GRUPOS'].indexOf("Morador") != -1){ $( "#DADOS #GRUPO_MOR" ).val(1); $( "#gmor" ).css("display","block"); }else{}
								if(retorno[0]['GRUPOS'].indexOf("Síndico") != -1){ $(".mlsindico").show();$(".msindico").show();  $( "#DADOS #GRUPO_SIN" ).val(1); $( "#gsin" ).css("display","block"); }else{ $(".mlsindico").hide();$(".msindico").hide();  }
								if(retorno[0]['GRUPOS'].indexOf("Administração") != -1){ $(".madministracao").show();$(".mlsindico").show(); $( "#DADOS #GRUPO_ADM" ).val(1); $( "#gadm" ).css("display","block"); }else{  $(".mlsindico").hide();$(".madministracao").hide();  }
								if(retorno[0]['GRUPOS'].indexOf("Administradora") != -1){  $(".mlsindico").show();$( "#DADOS #GRUPO_ADM2" ).val(1); $( "#gadm2" ).css("display","block"); }else{ $(".mlsindico").hide();$(".madministradora").hide(); }
								if(retorno[0]['GRUPOS'].indexOf("Diretoria") != -1){  $(".mlsindico").show();$(".mdiretoria").show();  $( "#DADOS #GRUPO_DIR" ).val(1); $( "#gdir" ).css("display","block"); }else{ $(".mlsindico").hide();$(".mdiretoria").hide(); }
								$( "#DADOS #MHOME" ).val(retorno[0]['perfil']);
								$( "#DADOS #MCOMUNICADOS" ).val(retorno[0]['MCOMUNICADOS']);
								//alert(retorno[0]['MCOMUNICADOS']);
								$( "#DADOS #MLUNICA" ).val(retorno[0]['MLUNICA']);
								$( "#DADOS #MLRECORRENTE" ).val(retorno[0]['MLRECORRENTE']);
								$( "#DADOS #MRESERVA" ).val(retorno[0]['MRESERVA']);
								$( "#DADOS #MENTREGAS" ).val(retorno[0]['MENTREGAS']);
								$( "#DADOS #MFALE" ).val(retorno[0]['MFALE']);
								$( "#DADOS #MENQUENTE" ).val(retorno[0]['MENQUENTE']);
								$( "#DADOS #MDOCUMENTOS" ).val(retorno[0]['MDOCUMENTOS']);
								$( "#DADOS #MRELATORIOS" ).val(retorno[0]['MRELATORIOS']);
								localStorage.setItem('MOCORRENCIA',retorno[0]['MOCORRENCIA']);
								localStorage.setItem('MPET',retorno[0]['MPET']);
								localStorage.setItem('MCAM',retorno[0]['MCAM']);
								localStorage.setItem('MMORADOR',retorno[0]['MMORADOR']);
								localStorage.setItem('MVEICULOS',retorno[0]['MVEICULOS']);
								localStorage.setItem('MCONTATOS',retorno[0]['MCONTATOS']);
								localStorage.setItem('MFPERFIL',retorno[0]['MFPERFIL']);
								localStorage.setItem('MAGENDA',retorno[0]['MAGENDA']);
								localStorage.setItem('MMUDANCA',retorno[0]['MMUDANCA']);
								$( "#DADOS #CCOMUNICADOS" ).val(retorno[0]['CCOMUNICADOS']);
								$( "#DADOS #CUNIDADES" ).val(retorno[0]['CUNIDADES']);
								$( "#DADOS #CMORADORES" ).val(retorno[0]['CMORADORES']);
								$( "#DADOS #CRESERVA" ).val(retorno[0]['CRESERVA']);
								$( "#DADOS #CENQUETE" ).val(retorno[0]['CENQUETE']);
								$( "#DADOS #CDOCUMENTOS" ).val(retorno[0]['CDOCUMENTOS']);
								$( "#DADOS #NOME_MORADOR" ).val(retorno[0]['nome']);
								$( "#DADOS #QUADRA" ).val(retorno[0]['rquadra']+' '+retorno[0]['quadra']);
								$( "#DADOS #LOTE" ).val(retorno[0]['rlote']+' '+retorno[0]['lote']);
								$( "#DADOS #OCORRENCIA_PUBLICA" ).val(retorno[0]['TIPO_OCORRENCIA']);
								
								MORADOR_NOME = retorno[0]['nome'];
								localStorage.setItem('MORADOR_NOME',MORADOR_NOME);
								$( "#DADOS #PARENTESCO" ).val(retorno[0]['parentesco']);
								MORADOR_SEXO = retorno[0]['masculino'];
								QUADRA = retorno[0]['rquadra']+' '+retorno[0]['quadra'];

								LOTE = retorno[0]['rlote']+' '+retorno[0]['lote'];

								localStorage.setItem('ROTULO_QUADRA',retorno[0]['rotulo_quadra']);
								localStorage.setItem('ROTULO_LOTE' ,retorno[0]['rlote']);
								localStorage.setItem('AUTORIZA' ,retorno[0]['autoriza']);

								$( '.user_foto' ).css("background-image", "url(data:image/jpeg;base64,"+retorno[0]['foto']+")");

								localStorage.setItem('CHAT_EMAIL',retorno[0]['CHAT_EMAIL']);
								localStorage.setItem('CHAT_TOCA' ,retorno[0]['CHAT_TOCA']);
								localStorage.setItem('CHAT_VIBRA',retorno[0]['CHAT_VIBRA']);
								localStorage.setItem('CHAT_MSG'  ,retorno[0]['CHAT_MSG']);

								localStorage.setItem('COM_EMAIL',retorno[0]['COM_EMAIL']);
								localStorage.setItem('COM_TOCA' ,retorno[0]['COM_TOCA']);
								localStorage.setItem('COM_VIBRA',retorno[0]['COM_VIBRA']);
								localStorage.setItem('COM_MSG'  ,retorno[0]['COM_MSG']);

								localStorage.setItem('DOC_EMAIL',retorno[0]['DOC_EMAIL']);
								localStorage.setItem('DOC_TOCA' ,retorno[0]['DOC_TOCA']);
								localStorage.setItem('DOC_VIBRA',retorno[0]['DOC_VIBRA']);
								localStorage.setItem('DOC_MSG'  ,retorno[0]['DOC_MSG']);

								localStorage.setItem('ENQ_EMAIL',retorno[0]['ENQ_EMAIL']);
								localStorage.setItem('ENQ_TOCA',retorno[0]['ENQ_TOCA']);
								localStorage.setItem('ENQ_VIBRA',retorno[0]['ENQ_VIBRA']);
								localStorage.setItem('ENQ_MSG',retorno[0]['ENQ_MSG']);

								localStorage.setItem('COR_EMAIL',retorno[0]['COR_EMAIL']);
								localStorage.setItem('COR_TOCA',retorno[0]['COR_TOCA']);
								localStorage.setItem('COR_VIBRA',retorno[0]['COR_VIBRA']);
								localStorage.setItem('COR_MSG',retorno[0]['COR_MSG']);

								afed('#home','#login_ini','','',3,'home');

								afed('.smenu,#perfil_abre,#perfil','#perfil_edit,#perfil_fecha','','',2);

								/* Tratativa para limitar nome do morador no menu */
								var nome_formatado = '' 
								if(MORADOR_NOME.length > 18){
									nome_formatado = MORADOR_NOME.substr(0,18)+'...';
								}else{
									nome_formatado = MORADOR_NOME;
								}

								if($('#DADOS #PARENTESCO').val() == 1 ){ 
									 tipo_user_ = ' - Titular';		 
								}else{
									 tipo_user_ = '';	
								}


								$( ".perfil_condominio" ).html(limita_txt(retorno[0]['nome_condominio'],27));
								$( ".perfil_nome" ).html(nome_formatado+tipo_user_);
								$( "#bloco" ).html(QUADRA);
								$( "#apto" ).html(LOTE);

								$( "#blocoapto" ).html(QUADRA.toLowerCase()+' - '+LOTE.toLowerCase());


			//					$( '.user_foto' ).css("background-image", "url("+SERVIDOR_CAMINHO+"appweb/foto_morador.php?id="+ID_MORADOR+"&sexo="+MORADOR_SEXO+")");
								if($( "#DADOS #PARENTESCO" ).val() == 1){ $( "#edit_moradores" ).css("display","block"); }
								//carrega_notificacoes(1);
								carrega_notificacoes(0);

								if($( "#DADOS #MCOMUNICADOS" ).val() == 1){ afed('#menu_comunicado','','','',3); }else{ afed('','#menu_comunicado','','',3); }

								if($( "#DADOS #MLUNICA" ).val() == 1){ 
									if(localStorage.getItem('AUTORIZA') == 1){
										afed('#menu_liberacao,#libt1,#libt2,#libt3','#liberacao_desativada','','',3);
									}else{
										afed('#liberacao_desativada','#menu_liberacao,#libt1,#libt2,#libt3','','',3);
									}
								}else{
									afed('#liberacao_desativada','#menu_liberacao,#libt1,#libt2,#libt3','','',3); 
								}
								if($( "#DADOS #MRESERVA" ).val() == 1){ afed('#menu_area','','','',3); }else{ afed('','#menu_area','','',3); } 
								if($( "#DADOS #MENTREGAS" ).val() == 1){ afed('#menu_entregas','','','',3); }else{ afed('','#menu_entregas','','',3); } 
								if($( "#DADOS #MFALE" ).val() == 1){  afed('','','','',3); }else{ afed('','','','',3); } 
								if($( "#DADOS #MENQUENTE" ).val() == 1){ afed('#menu_enquete','','','',3); }else{ afed('','#menu_enquete','','',3); } 
								if($( "#DADOS #MDOCUMENTOS" ).val() == 1){ afed('#menu_documentos','','','',3); }else{ afed('','#menu_documentos','','',3); } 
								if(localStorage.getItem('MOCORRENCIA') == 1){ afed('#menu_ocorrencia','','','',3); }else{ afed('','#menu_ocorrencia','','',3); } 
								if(localStorage.getItem('MPET') == 1){ afed('#menu_pet','','','',3); }else{ afed('','#menu_pet','','',3); }    
								if(localStorage.getItem('MCAM') == 1){ afed('#menu_cameras','','','',3); }else{ afed('','#menu_cameras','','',3); }
								if(localStorage.getItem('MMUDANCA') == 1){ afed('#menu_mudanca','','','',3); }else{ afed('','#menu_mudanca','','',3); }
								if(localStorage.getItem('MAGENDA') == 1){ afed('#menu_agenda','','','',3); }else{ afed('','#menu_agenda','','',3); }
								//alert(localStorage.getItem('MFPERFIL'));
								if(localStorage.getItem('MFPERFIL') == 1){ 
								$("#foto_user_mor").attr("onclick","afed('#bg_box3','','','',1);");
								}else{ 
								$("#foto_user_mor").attr("onclick","alerta('','Para alterar a foto, entre em contato com administração');"); }
 								$('.back').hide();

								carrega_chat();
								inicia(0);
								localStorage.setItem('TELA_ATUAL','home');	
								//carrega_liberacao(0);
								atualiza_notificacao(0);
								setTimeout(function(){
									nome_exibicao(retorno[0]['id_condominio']);

								},500);
							}else{
								notifica('Perfil/Perfil usuário inválido/Fechar',0,0);
							}

						}
						
						}else{
							alerta('0','Há uma nova versão do Control Condo. Atualize seu aplicativo para continuar...',4000);
						}
						
						
					}else{

					}
            },
            error      : function() {
                notifica('Aviso/Erro ao logar automático/Fechar',0,0);
                  
            }
        }); 
    }
}

// FUNCAO LOGIN USUARIO (LOGIN POR EMAIL/SENHA)
function login_user() {
	if(navigator.connection.type != 'none'){
		var dados = $( "#form_login" ).serialize();
        if(device.uuid == null){
            var UUID = '1234567890';
        }else{
            var UUID = device.uuid;
        }
		//alert(device.uuid);
		//alert("Device: "+device.model+' sistema='+device.platform+' uuid='+UUID+' versao='+device.version+' id_notificacao='+localStorage.getItem('registrationId'));
		
		$.ajax({
			type: 'POST',
			url: localStorage.getItem('DOMINIO')+'appweb/login.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            dataType   : 'json',
			//data: dados+'&nome=local&sistema=windows&uuid=123456&versao=10', //local
			data: dados+'&nome='+device.model+'&sistema='+device.platform+'&uuid='+UUID+'&versao='+device.version+'&id_notificacao='+localStorage.getItem('registrationId'), //APP
			success: function(retorno){
				
				if(retorno[0]['error'] == 1){
					notifica('Falha ao Entrar/Usu\u00e1rio ou senha inv\u00e1lida/Fechar',0,0);
				}else{
					//alert(retorno);
					login_user_device();	
				}
			},
            error: function(){
                notifica('Aviso/Erro de conexão com o servidor/Fechar',0,0);
            }
		});
	}else{
		notifica('Internet/Sem conex\u00e3o com a Internet/Fechar',2000,0)
	}
}

// FUNCAO CARREGA PERFIL
function carrega_user_perfil(id) {
    var dados = '';
	if(navigator.connection.type != 'none'){
		$.ajax({
			type: 'POST',
			url: localStorage.getItem('DOMINIO')+'appweb/login.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : {id_usuario : id},
            dataType   : 'json',
			success: function(retorno){
                for (x in retorno) {
                    var dado = '<option value="'+retorno[x]['id_usuario_condominio']+'">'+retorno[x]['nome_condominio']+'</option>';
                    dados = dados + dado;
                }
                //alert(dados);
                $('#perfil_login').html(dados);
			}
		});
	}else{
		notifica('Internet/Sem conex\u00e3o com a Internet/Fechar',2000,0);
	}
}

// FUNCAO LOGIN TROCA USUARIO
function select_user(id_usuario_condominio=0) {
	
		
	if(navigator.connection.type != 'none'){
        if(id_usuario_condominio == 0){
            var dados = $( "#form_perfil" ).serialize();
        }else{
            var dados = 'perfil='+id_usuario_condominio;
        }
		
		$.ajax({
			type: 'POST',
			url: localStorage.getItem('DOMINIO')+'appweb/login.php',
			data: dados,
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			success: function(retorno){
                if(retorno[0]['usar_control_condo'] == 1){
//					alert('credito:'+retorno[0]['qtd_credito_liberacao']);	
//					alert('periodo:'+retorno[0]['periodo_max_liberacao']);	
//					alert('nome qrcode:'+retorno[0]['exibir_nome_qrcode']);
                    $( "#DADOS #ID_USER" ).val(retorno[0]['id_usuario_condominio']);
                    $( "#DADOS #ID_USER_L" ).val(retorno[0]['id_usuario']);
                    $( "#DADOS #ID_MORADOR" ).val(retorno[0]['id_referencia']);
                    $( "#DADOS #ID_UNIDADE" ).val(retorno[0]['id_unidade']);
                    $( "#DADOS #ID_CONDOMINIO" ).val(retorno[0]['id_condominio']);
                    //alert($( "#DADOS #ID_CONDOMINIO" ).val());
                    $( "#DADOS #CONDOMINIO" ).val(retorno[0]['nome_condominio']);
                    localStorage.setItem('TIPO_BUSCA_VISITANTE',retorno[0]['tipo_busca_visitante']);
					localStorage.setItem('QTD_CONTROL_CONDO',retorno[0]['qtd_control_condo']);
					localStorage.setItem('QTD_CREDITO',retorno[0]['qtd_credito_liberacao']);
					localStorage.setItem('PERIODO_MAX',retorno[0]['periodo_max_liberacao']);
					localStorage.setItem('EXIBIR_NOME',retorno[0]['exibir_nome_qrcode']);
					//alert(localStorage.getItem('QTD_CONTROL_CONDO'));
                    if(retorno[0]['tipo_busca_visitante'] == 0){
                        afed('#btipo_nome','#btipo_rg','','',3,'home');
                    }else{
                        afed('#btipo_rg','#btipo_nome','','',3,'home');
                    }
                    if(retorno[0]['GRUPOS'].indexOf("Morador") != -1){ $( "#DADOS #GRUPO_MOR" ).val(1); $( "#gmor" ).css("display","block"); }
                    if(retorno[0]['GRUPOS'].indexOf("Síndico") != -1){ $(".mlsindico").show();$(".msindico").show(); $( "#DADOS #GRUPO_SIN" ).val(1); $( "#gsin" ).css("display","block"); }else{ $(".mlsindico").hide();$(".msindico").hide(); }
                    if(retorno[0]['GRUPOS'].indexOf("Administração") != -1){ $(".mlsindico").show();$(".madministracao").show(); $( "#DADOS #GRUPO_ADM" ).val(1); $( "#gadm" ).css("display","block"); }else{ $(".mlsindico").hide();$(".madministracao").hide();  }
                    if(retorno[0]['GRUPOS'].indexOf("Administradora") != -1){ $(".mlsindico").show();$(".madministradora").show(); $( "#DADOS #GRUPO_ADM2" ).val(1); $( "#gadm2" ).css("display","block"); }else{ $(".mlsindico").hide(); $(".madministradora").hide(); }
                    if(retorno[0]['GRUPOS'].indexOf("Diretoria") != -1){ $(".mlsindico").show();$(".mdiretoria").show(); $( "#DADOS #GRUPO_DIR" ).val(1); $( "#gdir" ).css("display","block"); }else{ $(".mlsindico").hide();$(".mdiretoria").hide(); }
                    $( "#DADOS #MHOME" ).val(retorno[0]['perfil']);
                    $( "#DADOS #MCOMUNICADOS" ).val(retorno[0]['MCOMUNICADOS']);
                    $( "#DADOS #MLUNICA" ).val(retorno[0]['MLUNICA']);
                    $( "#DADOS #MLRECORRENTE" ).val(retorno[0]['MLRECORRENTE']);
                    $( "#DADOS #MRESERVA" ).val(retorno[0]['MRESERVA']);
                    $( "#DADOS #MENTREGAS" ).val(retorno[0]['MENTREGAS']);
                    $( "#DADOS #MFALE" ).val(retorno[0]['MFALE']);
                    $( "#DADOS #MENQUENTE" ).val(retorno[0]['MENQUENTE']);
                    $( "#DADOS #MDOCUMENTOS" ).val(retorno[0]['MDOCUMENTOS']);
                    $( "#DADOS #MRELATORIOS" ).val(retorno[0]['MRELATORIOS']);
                    localStorage.setItem('MOCORRENCIA',retorno[0]['MOCORRENCIA']);
                    localStorage.setItem('MPET',retorno[0]['MPET']);
                    localStorage.setItem('MCAM',retorno[0]['MCAM']);
					localStorage.setItem('MMORADOR',retorno[0]['MMORADOR']);
					localStorage.setItem('MVEICULOS',retorno[0]['MVEICULOS']);
					localStorage.setItem('MCONTATOS',retorno[0]['MCONTATOS']);
					localStorage.setItem('MFPERFIL',retorno[0]['MFPERFIL']);
					localStorage.setItem('MMUDANCA',retorno[0]['MMUDANCA']);
					localStorage.setItem('MAGENDA',retorno[0]['MAGENDA']);
                    $( "#DADOS #CCOMUNICADOS" ).val(retorno[0]['CCOMUNICADOS']);
                    $( "#DADOS #CUNIDADES" ).val(retorno[0]['CUNIDADES']);
                    $( "#DADOS #CMORADORES" ).val(retorno[0]['CMORADORES']);
                    $( "#DADOS #CRESERVA" ).val(retorno[0]['CRESERVA']);
                    $( "#DADOS #CENQUETE" ).val(retorno[0]['CENQUETE']);
                    $( "#DADOS #CDOCUMENTOS" ).val(retorno[0]['CDOCUMENTOS']);
                    $( "#DADOS #NOME_MORADOR" ).val(retorno[0]['nome']);
                    $( "#DADOS #QUADRA" ).val(retorno[0]['rquadra']+' '+retorno[0]['quadra']);
                    $( "#DADOS #LOTE" ).val(retorno[0]['rlote']+' '+retorno[0]['lote']);
                    MORADOR_NOME = retorno[0]['nome'];
                    $( "#DADOS #PARENTESCO" ).val(retorno[0]['parentesco']);
                    MORADOR_PARENTESCO = retorno[0]['parentesco'];
                    MORADOR_SEXO = retorno[0]['masculino'];
                    QUADRA = retorno[0]['rquadra']+' '+retorno[0]['quadra'];
                    LOTE = retorno[0]['rlote']+' '+retorno[0]['lote'];
				  $( "#blocoapto" ).html(QUADRA+' - '+LOTE);
                    localStorage.setItem('ROTULO_QUADRA',retorno[0]['rotulo_quadra']);
                    localStorage.setItem('ROTULO_LOTE' ,retorno[0]['rlote']);
                    localStorage.setItem('AUTORIZA' ,retorno[0]['autoriza']);
					$( "#DADOS #OCORRENCIA_PUBLICA" ).val(retorno[0]['TIPO_OCORRENCIA']);
					if(retorno[0]['foto']==""){
						$( '.back' ).hide();
						$( '.fundo1 #bloco' ).css('margin','2% 0 0 -3%');
						$( '.fundo1 #apto' ).css('margin','-8% 0 0 81%;');
						$( '.user_foto' ).attr("style","");
						$( '.user_foto' ).css('border','none').html('<div class="back" style=""><span class="fa fa-user-circle icone_sem_foto" style="color:#c2c2c2;font-size: 3.1em;" ></span></div>');
					}else{
						$( '.back' ).hide();
						$( '.user_foto' ).css("background-image", "url(data:image/jpeg;base64,"+retorno[0]['foto']+")");
						$( '.fundo1 .user_foto' ).css("border","2px solid white");
						$( '.fundo1 #bloco' ).css('margin','2% 0 0 -8%');
						$( '#perfil .user_foto').html('<div id="border_m"></div>');
                    }
					
					/* Tratativa para limitar nome do morador no menu */
					var nome_formatado = '' 
					if(MORADOR_NOME.length > 18){
						nome_formatado = MORADOR_NOME.substr(0,18)+'...';
					}else{
						nome_formatado = MORADOR_NOME;
					}
					
					if($('#DADOS #PARENTESCO').val() == 1 ){ 
						 tipo_user_ = ' - Titular';		 
					}else{
						 tipo_user_ = '';	
					}
              
			
                    localStorage.setItem('CHAT_EMAIL',retorno[0]['CHAT_EMAIL']);
                    localStorage.setItem('CHAT_TOCA',retorno[0]['CHAT_TOCA']);
                    localStorage.setItem('CHAT_VIBRA',retorno[0]['CHAT_VIBRA']);
                    localStorage.setItem('CHAT_MSG',retorno[0]['CHAT_MSG']);

                    localStorage.setItem('COM_EMAIL',retorno[0]['COM_EMAIL']);
                    localStorage.setItem('COM_TOCA',retorno[0]['COM_TOCA']);
                    localStorage.setItem('COM_VIBRA',retorno[0]['COM_VIBRA']);
                    localStorage.setItem('COM_MSG',retorno[0]['COM_MSG']);

                    localStorage.setItem('DOC_EMAIL',retorno[0]['DOC_EMAIL']);
                    localStorage.setItem('DOC_TOCA',retorno[0]['DOC_TOCA']);
                    localStorage.setItem('DOC_VIBRA',retorno[0]['DOC_VIBRA']);
                    localStorage.setItem('DOC_MSG',retorno[0]['DOC_MSG']);

                    localStorage.setItem('ENQ_EMAIL',retorno[0]['ENQ_EMAIL']);
                    localStorage.setItem('ENQ_TOCA',retorno[0]['ENQ_TOCA']);
                    localStorage.setItem('ENQ_VIBRA',retorno[0]['ENQ_VIBRA']);
                    localStorage.setItem('ENQ_MSG',retorno[0]['ENQ_MSG']);

                    localStorage.setItem('COR_EMAIL',retorno[0]['COR_EMAIL']);
                    localStorage.setItem('COR_TOCA',retorno[0]['COR_TOCA']);
                    localStorage.setItem('COR_VIBRA',retorno[0]['COR_VIBRA']);
                    localStorage.setItem('COR_MSG',retorno[0]['COR_MSG']);
                    afed('#home','#login_perfil','','',3,'home');
                 
                    $( ".perfil_condominio" ).html(limita_txt(retorno[0]['nome_condominio'],27));
					
                    $( ".perfil_nome" ).html(nome_formatado+tipo_user_);
                    $( "#bloco" ).html("<strong> "+QUADRA+"</storng>");
                    $( "#apto" ).html("<strong> "+LOTE+"</storng>");
    //					$( '.user_foto' ).css("background-image", "url("+SERVIDOR_CAMINHO+"appweb/foto_morador.php?id="+ID_MORADOR+"&sexo="+MORADOR_SEXO+")");
                    if(MORADOR_PARENTESCO == 1){ $( "#edit_moradores" ).css("display","block"); }
                    //carrega_notificacoes(1);
                    carrega_notificacoes(0);
                    
                    if($( "#DADOS #MCOMUNICADOS" ).val() == 1){ afed('#menu_comunicado','','','',3); }else{ afed('','#menu_comunicado','','',3); } 
                    if($( "#DADOS #MLUNICA" ).val() == 1){
						//alert(localStorage.getItem('AUTORIZA'));
						if(localStorage.getItem('AUTORIZA') == 1){
							afed('#menu_liberacao,#libt1,#libt2,#libt3','#liberacao_desativada','','',3);
						}else{
							afed('#liberacao_desativada','#menu_liberacao,#libt1,#libt2,#libt3','','',3);
						}
					}else{ afed('#liberacao_desativada','#menu_liberacao,#libt1,#libt2,#libt3','','',3); } 
                    if($( "#DADOS #MRESERVA" ).val() == 1){ afed('#menu_area','','','',3); }else{ afed('','#menu_area','','',3);} 
                    if($( "#DADOS #MENTREGAS" ).val() == 1){ afed('#menu_entregas','','','',3); }else{ afed('','#menu_entregas','','',3); } 
                    if($( "#DADOS #MFALE" ).val() == 1){  afed('','','','',3); }else{ afed('','','','',3); } 
                    if($( "#DADOS #MENQUENTE" ).val() == 1){ afed('#menu_enquete','','','',3); }else{ afed('','#menu_enquete','','',3); } 
                    if($( "#DADOS #MDOCUMENTOS" ).val() == 1){ afed('#menu_documentos','','','',3); }else{ afed('','#menu_documentos','','',3); } 
                    if(localStorage.getItem('MOCORRENCIA') == 1){ afed('#menu_ocorrencia','','','',3); }else{ afed('','#menu_ocorrencia','','',3); } 
                    if(localStorage.getItem('MPET') == 1){ afed('#menu_pet','','','',3); }else{ afed('','#menu_pet','','',3); }    
                    if(localStorage.getItem('MCAM') == 1){ afed('#menu_cameras','','','',3); }else{ afed('','#menu_cameras','','',3); }    
                    if(localStorage.getItem('MMUDANCA') == 1){ afed('#menu_mudanca','','','',3); }else{ afed('','#menu_mudanca','','',3); }    
                    if(localStorage.getItem('MAGENDA') == 1){ afed('#menu_agenda','','','',3); }else{ afed('','#menu_agenda','','',3); }  
					//alert(localStorage.getItem('MFPERFIL'));
					if(localStorage.getItem('MFPERFIL') == 1){ 
					$("#foto_user_mor").attr("onclick","afed('#bg_box3','','','',1);");
					}else{ 
					$("#foto_user_mor").attr("onclick","alerta('','Para alterar a foto, entre em contato com administração');"); }
              
                    
                    carrega_chat();
                    inicia(0);
					altera_menu();
					
                    localStorage.setItem('TELA_ATUAL','home');	
                    //carrega_liberacao(0);
					atualiza_notificacao();
					setTimeout(function(){
						nome_exibicao(retorno[0]['id_condominio']);
						
					},500);
                }else{
                    notifica('Perfil/Perfil usuário inválido/Fechar',0,0);
                }
                
			}
		});
	}else{
		notifica('Internet/Sem conex\u00e3o com a Internet/Fechar',2000,0);
	}
}

// FUNCAO lOGOUT 
function logout(){
	inicia2(0);

	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/logout.php',
		data: 'id='+$( "#DADOS #ID_USER_L" ).val(),
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
		success: function(retorno){
			afed('#login_ini','#home','','',2,'tela_login');
          

		}
	});
}

function perfil_notificacao(id_condominio){
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/usuario_perfil_get.php',
		data: 'id_usuario='+$( "#DADOS #ID_USER_L" ).val()+'&id_condominio='+id_condominio,
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        dataType   : 'json',
		success: function(retorno){
            //alert(retorno[0]['id_usuario_condominio']);
            select_user(retorno[0]['id_usuario_condominio']);
            var id_reg    = localStorage.getItem("NOT_ID");
            var tipo      = localStorage.getItem("NOT_TYPE");
            window.setTimeout(function() {
                if(id_reg > 0){
                    if(tipo==1){
                        carrega_comunicado(id_reg);
                    }else if(tipo==2){
                        carrega_documentos(0);
                    }else if(tipo==3){
                        carrega_enquete(id_reg);
                    }else if(tipo==4){
                        inicia2(1);
                        carrega_chat();
                    }
                }
            }, 500);
            clearInterval(intervalo);
		}
	});
}

function nome_exibicao(id_condominio){
	
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/login.php',
		data: 'NOME_EXIBICAO=""&id_condominio='+id_condominio,
		crossDomain: true,
        dataType   : 'json',
		success: function(retorno){
           $('.perfil_condominio').html(retorno);
		}
	});
}

