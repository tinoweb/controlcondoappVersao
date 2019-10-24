// DONE BY TINO 22/10/2019

// FUNÇÃO PARA INICIAR A PRIMEIRA TELA.... ()
function swich_tela_login(){
	afed('#login_ini','#initApp','','',1);
}

// BOTÃO VOLTAR DA TELA LOGIN (USUARIO/SENHA)
function loginIniBtnVoltar(){
	afed('#initApp','#login_ini','','');
}

function primeiroAcessoBtnVoltar(){
	afed('#initApp','#primeiroAcesso','','',1);	
}

// ABRIR A TELA DE PRIMEIRO ACESSO
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
	$("#telaAceitaTermo").show();
}

function aceiteiTermo(){
	$("#telaAceitaTermo").hide();
	$("#login_ini").show();
}


// var appmeu = new Framework7({
//   popup: {
//     closeByBackdropClick: false,
//   }
// });


// var popup = appmeu.popup.create({
//   content: '<div class="popup">Lorem ipusm dolre </div>',
//   el: '.termoAtivacao',
//   on: {
//     opened: function () {
//       console.log('Popup opened')
//     }
//   }
// })
