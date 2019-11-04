// DONE BY TINO 22/10/2019

function swich_tela_login(){
	afed('#login_ini','#initApp','','');
	console.log("swich tela");

	app2.sheet.create({
	  el: '.loginApp',
	  closeByOutsideClick: false,
	  closeByBackdropClick: false,
	  closeOnEscape: false
	});

	app2.actions.open('.loginApp', true);

}

loginOut = () => {
	afed('#initApp','#login_ini','','');
}

fechaRecoverEmail = () => {
	app2.actions.close('#recoveryPasswordLogin', true);
	app2.actions.open('.loginApp', true);
}

function primeiroAcessoBtnVoltar(){
	afed('#initApp','#primeiroAcesso','','',1);	
}

function swich_tela_primeiroAcesso(){
	afed('#primeiroAcesso','#initApp','','',1);

}

function emailNotRecognizedBySystemAlert(type, messenge, afterClose=null){
	Swal.fire({
	  	type: type,
	  	text: messenge,
		timer: 4000,
		onBeforeOpen: () => {
			Swal.showLoading()
			timerInterval = setInterval(() => {}, 100)
		},
		onClose: () => {
			if (afterClose == "primeiroAcesso") {
				$("#inputReceveEmailToGetCode").val("");
				$("#telaVerificaCodigo").css('display', 'block');
				$("#primeiroAcesso").css('display', 'none');
				$("#initApp").css('display', 'none');
			}else if(afterClose == "defineSenha"){
				switchTelaDefineSenhaToLogin();
			}
		}
	}).then((result) => {
		if (result.dismiss === Swal.DismissReason.timer) {
			// console.log('I was closed by the timer');
		}
	});
}

function alertShowPosibilityToResetPassword(email){
	Swal.fire({
	  	text: "Esse email se encontra ativo! Deseja recuperar a sua senha",
	  	type: 'warning',
	  	showCancelButton: true,
	  	confirmButtonColor: '#3085d6',
	  	cancelButtonColor: '#d33',
	  	confirmButtonText: 'Sim recuperar senha!'
	}).then((result) => {
	  	if (result.value) {
		    alert("vai para tela de esqui a minha senha....");
		    $.ajax({
				// type: 'POST',
				// url: localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php',
				// crossDomain: true,
				// beforeSend : function() { $("#wait").css("display", "block"); },
				// complete   : function() { $("#wait").css("display", "none"); },
		  //       data       : { codigo : codigoAtivacao, typeFunction : 'enviarCodigoAtivacao' },
		  //       dataType   : 'json',
				// success: function(retorno){
				// 	if (1) {
				// 		console.log("retorno sucesso 1");
				// 	}else{
				// 		console.log("retorno sucesso else condition");
				// 	}
		  //       },
		  //       error: function(error) {
				// 	console.log(error);
		  //       }
			});

	  	}
	});
}


function choosedMail(){
	
	let campoEmail = $("#inputReceveEmailToGetCode").val();
	if (campoEmail.length !== 0) {
		console.log(localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php');
		$.ajax({
			type: 'POST',
			url: localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
	        data       : { email : campoEmail, typeFunction : 'enviarEmailParaAtivacao' },
	        dataType   : 'json',
			success: function(retorno){
				if (retorno.status == "emailNaoReconhecidoPeloSistema") {
					app2.sheet.close('.recebEmail', true);
					emailNotRecognizedBySystemAlert('error','Email não reconhecido pelo sistema, Insira seu email cadastrado');
					$("#inputReceveEmailToGetCode").val("");
				}else if(retorno.status == "naoPossuiNenhumPerfilAtivo"){
					app2.sheet.close('.recebEmail', true);
					emailNotRecognizedBySystemAlert('error','Esse email não possui perfil Ativo no sistema');
					$("#inputReceveEmailToGetCode").val("");
				}else if (retorno.status == "codigoEnviadoParaEmailComSucesso" && retorno.statuscode == 200) {
					app2.sheet.close('.recebEmail', true);
					emailNotRecognizedBySystemAlert('success', "Código de Ativação enviado para o email com Sucesso", "primeiroAcesso");
				}else if (retorno.status == "proporRecuperacaoSenhaUsuarioAtivo" && retorno.statuscode == 200) {
					app2.sheet.close('.recebEmail', true);
					alertShowPosibilityToResetPassword(campoEmail);
				}
	        },
	        error: function(error) {
	        	console.log("tem informacoes com erro");
				console.log(error);
	        }
		});	
	}else{
		alerta("","Insira seu email para continuar", 3000);	
	}
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
	afed('#primeiroAcesso','#telaVerificaCodigo','','');	
	// $("#btnSendEmailToGetCode").attr('disabled', true);

}

function enviarCodigoAtivacao(){
	let codigoAtivacao = $("#codigoAtivacao").val();
	console.log(localStorage.getItem('DOMINIO')+'appweb/ativacao_post.php');
	if (codigoAtivacao.length !== 0) {
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
				}else if (retorno.statuscode == 204 && retorno.status == "usuarioNaoEncontradoParaCodigo") {
					emailNotRecognizedBySystemAlert('error', "Código de Ativação Inválido, Confira o codigo enviado no seu email");
					$("#codigoAtivacao").val("");
				}
	        },
	        error: function(error) {
				console.log(error);
	        }
		});	
	}else{
		app2.input.validate("#codigoAtivacao");
	}
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
						emailNotRecognizedBySystemAlert('success', "Senha definida com sucesso", "defineSenha");
					}
		        },
		        error: function(error) {
					console.log(error);
					alert('Não foi possivel executar a ação pretendida, entre em contato com seu administrador');
		        }
			});	
		}
	}else{
		alerta("","Defina uma senha para continuar", 3000);
	}

}