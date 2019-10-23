// DONE BY TINO 22/10/2019

// FUNÇÃO PARA INICIAR A PRIMEIRA TELA.... ()
function swich_tela_login(){
	afed('#login_ini','#initApp','','',1);
}

// BOTÃO VOLTAR DA TELA LOGIN (USUARIO/SENHA)
function loginIniBtnVoltar(){
	afed('#initApp','#login_ini','','');
}

// ABRIR A TELA DE PRIMEIRO ACESSO
function swich_tela_primeiroAcesso(){
	// $('.emailinput').hide('fast');
	// $('.smsinput').hide('fast');

	// $("#btnReceberbyEmail").show('fast');
	// $("#btnReceberbyCelular").show('fast');
	
	afed('#primeiroAcesso','#initApp','','',1);
	
}

function primeiroAcessoBtnVoltar(){
	// $('.emailinput').show();
	// $('.smsinput').show();
	// console.log($('.emailinput'));
	// console.log('sim saiu ...');
	afed('#initApp','#primeiroAcesso','','',1);	
}

function choosedMail(emaiElemento){
	// emaiElemento.hide('fast');
	// $('.emailinput').show('fast');
	// $('#divRecevebySMS').hide('fast');
}

function choosedSms(smsElemento){
	// smsElemento.hide('fast');
	// $('.smsinput').show('fast');
	// $('#divRecevebyEmail').hide('fast');
}

function verificacaoCodigo(){
	// afed('#telaVerificaCodigo','','','',1);
	// $('#telaVerificaCodigo')
}





