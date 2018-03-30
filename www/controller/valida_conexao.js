// JavaScript Document

// FUNCAO VERIFICA CONEXAO INTERNET (TORNAR FUNCIONAL PARA TUDO)
function verifica_conexao(){
	if(navigator.connection.type != 'none'){
		afed('#home','#login_ini','','',1);
	}else{
		msg_erro('Verifique sua conex&atilde;o');
	}
}

