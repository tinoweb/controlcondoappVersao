// DONE BY TINO 22/10/2019

function swich_tela_login(){
	afed('#login_ini','#initApp','','',1);
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
	$("#telaAceitaTermo").show();
}

function aceiteiTermo(){
	$("#telaAceitaTermo").hide();
	$("#login_ini").show();
}

function myFunction() {
	if($("#tab-1").scrollTop() + $("#tab-1").height() >= $("#tab-1").get(0).scrollHeight -70) {
		
		if ($("#checkboxElementoTermo").prop('checked')) {
			$("#concordaComTermo").hide();
			$("#btnAtivarConta").show();
		}else{
			$("#concordaComTermo").show('700');
		}
	}
}