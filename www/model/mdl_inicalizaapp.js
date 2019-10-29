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
	$("#telaVerificaCodigo").hide();
	$(".aceitaTermoClass").css('display', 'block');
	$("#concordaComTermo").hide();
	$("#btnAtivarConta").hide();
	$("#btnCancelarConta").hide();
	$("#telaAceitaTermo").show();

	let codigoAtivacao = $("#codigoAtivacao").val();
	var icon_cc = '';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/ativacao_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : { codigo : codigoAtivacao, typeFunction : 'enviarCodigoAtivacao' },
        dataType   : 'json',
		success: function(retorno){
			console.log(retorno);       
        },
        error: function() {
			alert(3);
        }
	});	
	
}

function aceiteiTermo(){
	$("#telaAceitaTermo").hide();
	$("#defineSenha").show();
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

function cancelarTermo(){
	afed('#initApp','#telaAceitaTermo','','',1);	
}

function definesenha(){
	afed('#defineSenha','#initApp','','',1);	
}

function sairTelaDefineSenha(){
	afed('#initApp','#defineSenha','','',1);
}

function salvarSenha(){
	// afed('#initApp','#defineSenha','','',1);

}