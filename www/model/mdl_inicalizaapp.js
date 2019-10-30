// DONE BY TINO 22/10/2019

function swich_tela_login(){
	afed('#login_ini','#initApp','','');
}

function loginIniBtnVoltar(){
	afed('#initApp','#login_ini','','');
}

function primeiroAcessoBtnVoltar(){
	afed('#initApp','#primeiroAcesso','','',1);	
}

function swich_tela_primeiroAcesso(){
	afed('#primeiroAcesso','#initApp','','',1);
}


function choosedMail(){
	$("#telaVerificaCodigo").css('display', 'block');
	$("#primeiroAcesso").css('display', 'none');
	$("#initApp").css('display', 'none');
}

function choosedSms(){
	$("#primeiroAcesso").hide();
	$("#initApp").hide();
	$("#telaVerificaCodigo").css('display', 'block');
}

function voltaraoPrimeiroAcesso(){
	$("#telaVerificaCodigo").hide();
	$("#primeiroAcesso").show();
}

function swich_to_primeiroAcesso(){
	afed('#primeiroAcesso','#telaVerificaCodigo','','',1);	
}

function enviarCodigoAtivacao(){
	let codigoAtivacao = $("#codigoAtivacao").val();
	console.log(localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php');

	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : { codigo : codigoAtivacao, typeFunction : 'enviarCodigoAtivacao' },
        dataType   : 'json',
		success: function(retorno){
			console.log(retorno);    
			if (retorno.statuscode == 200 && retorno.status == "codigoOk") {
				localStorage.setItem("idUsuarioAtivacao", retorno.idUsuario);
				$("#btnCancelarConta").hide();
				$("#btnAtivarConta").hide();
				$("#telaVerificaCodigo").hide();
				$("#telaAceitaTermo").show();
				$(".aceitaTermoClass").css('display', 'block');
				$("#concordaComTermo").hide();
			}
        },
        error: function(error) {
			console.log(error);
        }
	});	
}

function aceiteiTermo(){
	$("#telaAceitaTermo").hide();
	$("#defineSenha").show();
	$("#btnSaveSenha").attr('disabled', true);
	$("#inputDefineSenha").blur(function() {
		$("#btnSaveSenha").attr('disabled', false);
		if ($("#inputDefineSenha").val().length === 0 ) {
			$("#btnSaveSenha").attr('disabled', true);
		}
	});
}

function cancelarTermo(){	
	localStorage.removeItem('idUsuarioAtivacao');	
	afed('#initApp','#telaAceitaTermo','','',1);
}

function myFunction() {
	if($("#tab-1").scrollTop() + $("#tab-1").height() >= $("#tab-1").get(0).scrollHeight -70) {
		$("#concordaComTermo").show('700');
		$("#checkboxElementoTermo").change(function() {
			if (this.checked) {
				$("#concordaComTermo").hide();
				$("#btnAtivarConta").show();
				$("#btnCancelarConta").show();
			}
		});
	}else{
		$("#checkboxElementoTermo").prop("checked", false);
		$("#btnAtivarConta").hide();
		$("#btnCancelarConta").hide();
	}
}


function definesenha(){
	afed('#defineSenha','#initApp','','',1);	
}

function btnSairTelaDefineSenha(){
	afed('#initApp','#defineSenha','','',1);
}

function switchTelaDefineSenhaToLogin(){
	afed('#login_ini','#defineSenha','','');
}

function salvarSenha(){
	if ($("#inputDefineSenha").val().length !== 0 ) {
		$("#btnSaveSenha").attr('disabled', false);
		if ($("#inputDefineSenha").val() != $("#inputDefineSenhaRepita").val()) {
			alerta("", "As senhas não combinam. Elas devem ser iguais!", 4000);
		}else{
			let idUsuario = localStorage.getItem('idUsuarioAtivacao');
			let senha = $("#inputDefineSenha").val();

			$.ajax({
				type: 'POST',
				url: localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php',
				crossDomain: true,
				beforeSend : function() { $("#wait").css("display", "block"); },
				complete   : function() { $("#wait").css("display", "none"); },
		        data: { 
	    				idUsuario : idUsuario, 
	    				senha : senha,
	    				typeFunction : "definirSenha"
		    		},
		        dataType   : 'json',
				success: function(retorno){
					if (retorno.statuscode == 200 && retorno.status == "senhaDefinidoOk") {
						$('#formSendDefineSenha').trigger("reset");

						var toastSuccess = app2.toast.create({
							text: 'Senha definida com sucesso',
						  	closeButton: true,
						  	closeButtonText: 'Ok',
						  	closeTimeout: 2000,
							on: {
								closed: function () {
									switchTelaDefineSenhaToLogin();
								  	// app2.dialog.alert('vai para outra tela...')
								},
							}
						});

						toastSuccess.open();
					}
		        },
		        error: function(error) {
					console.log(error);
					alert('eu erro >> ver console debug...');
		        }
			});	
		}
	}else{
		alerta("","Defina uma senha para continuar", 3000);
	}

}