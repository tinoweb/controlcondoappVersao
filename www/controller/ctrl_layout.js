// JavaScript Document
function aguarde(status){
	if(status == 1){
		$( "#wait" ).css("display","block");
	}else{
		$( "#wait" ).css("display","none");
	}
}

// FUNCAO TRANSICAO DE TELA ******************************************************************/
function processando(status){
	$( "#wait" ).css("display","none");
	if(status == 1){
		$( "#bg_processando" ).css("display","block");
	}else{
		$( "#bg_processando" ).css("display","none");
	}
}


// FUNCAO ESVAZIA CAMPO DE FORMULARIO(PLACE HOLDER) ******************************************/
function Esvazia(valor_campo){

if (valor_campo.value == valor_campo.defaultValue)
	valor_campo.value='';
}

function Padrao(valor_campo){
if (valor_campo.value == '')
	valor_campo.value=valor_campo.defaultValue;
}

// FUNCAO ABRE, FECHA, ENABLE E DISABLE (COMPONENTES HTML)***********************************/
function afed(abre,fecha,ativa,desativa,tipo,local="") {
   
//	if(tipo == 1){
//		$( fecha ).slideUp("slow", function() { });
//		$( abre ).slideDown("slow", function() { });
//	}else if(tipo == 2){
//		$( fecha ).slideUp("fast", function() { });
//		$( abre ).slideDown("fast", function() { });
//	}else if(tipo == 3){
//		$( fecha ).css('display','none');
//		$( abre ).css('display','block');
//	}
	//alert('tela anterior:' +localStorage.getItem("TELA_ATUAL"));
	if(local!=""){
		localStorage.setItem('TELA_ATUAL',local);
	}
	//alert('tela atual: '+localStorage.getItem("TELA_ATUAL"));
    $( fecha ).css('display','none');
    $( abre ).css('display','block');
	$( desativa ).attr('disabled', true);
	$( ativa ).attr('disabled', false);
}

// FUNCAO ABRE, FECHA, ENABLE E DISABLE (COMPONENTES HTML)(RASTREAR E REMOVER USAR AFED)*****/
function afed2(abre,fecha,ativa,desativa) {
	$( fecha ).slideUp("fast", function() { });
	$( abre ).slideDown("fast", function() { });
	$( desativa ).attr('disabled', true);
	$( ativa ).attr('disabled', false);
}

function voltar(abre,fecha,pagina){
    if(pagina == 'home'){
        if(localStorage.getItem('TELA_ATUAL') == 'comunicados'){
            $("#busca_comunicados").val("");
        }
        if(localStorage.getItem('TELA_ATUAL') == 'entregas'){

        }
        if(localStorage.getItem('TELA_ATUAL') == 'enquetes'){
            $('#enquetes_retorno').scrollTop(0);
            
            //alert('enquete');
        }
    }
    
    if(pagina == 'comunicados'){
        carrega_comunicados(0);
    }
    if(pagina == 'enquetes'){
        carrega_enquetes(0);
    }
	
	if(pagina == 'ocorrencia'){
        carrega_ocorrencia( $("#form_ocorrencia #id_ocorrencia").val() ) ;
    }
	if(pagina == 'ocorrencias_ticket'){
        carrega_tickets( 0 ) ;
    }
    
    $( fecha ).css('display','none');
    $( abre ).css('display','block');
    localStorage.setItem('TELA_ATUAL',pagina);
    //alert($('#comunicados_retorno').scrollTop());
}

// FUNCAO CARREGA VIEW PAGER*****************************************************************/
function inicia(ini) {
    swiper = new Swiper('#corpo', {
		initialSlide: ini,
        pagination: '#fast_menu',
        paginationClickable: true,
        paginationBulletRender: function (swiper, index, className) {
            return '<span class="'+className+'" id="item_fast_menu"><img src="img/fm_'+(index+1)+'.png"></span>';
        },
      	onSlideChangeStart: function(){
			var pag = swiper.realIndex;
			if(pag==0){
				localStorage.setItem('TELA_ATUAL','home');	
				app.ckBoxUp('#box_notificacoes',"#notificacoes");
				app.controler_pull('home');
			}else if(pag==1){
				localStorage.setItem('TELA_ATUAL','chat_msg');	
				carrega_chat(0);
			}else if(pag==2){
				//alert('ctrl_layout -> mudando para liberacao');
				localStorage.setItem('TELA_ATUAL','liberacao');
				app.controler_pull('liberacao');
			}else if(pag==3){
				localStorage.setItem('TELA_ATUAL','perfil_usuario');	
			}
        }
    });
}

function inicia2(ini) {
	swiper.slideTo(ini, '1000', false);
}

// FUNCAO ALERTA ERRO***********************************************************************/
function msg_erro(msg){
	//alert(msg);
	afed('#bg_box','','','',1);
	$('#erro_msg').html(msg);
}

function form_data(val){
    if(val < 10){
        val2 = '0'+val;
    }else{
        val2 = val;
    }
    return val2;
}

function abre(pagina){
	$( '#comunicado' ).css('display','none');
	$(pagina).css('display','block');

}

function troca_foto(campo,tipo,foto){
    if(foto == 'data:image/png;base64,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'){
        $(campo).css('background-size', '40%');
    }else{
        $(campo).css('background-size', '100%');
    }
    if(tipo == 1){
        $(campo).css('background-image', 'url("'+foto+'")');
    }else{
        $(campo).attr("src", foto);
    }
}

setTimeout(function(){
	$("#liberacao2 #liberacao_placa").mask("AAA-9999");
	$("#placa_carro").mask("AAA-9999");
},2000);

function alerta(tipo,valor=""){
	
	let icon = "";
	let msg  = "";
	
	if(tipo==1){
		icon = '<i class="fa fa-check-square"></i>';
		msg  = "Salvo com sucesso";
    }else
	if(tipo==2){
	    icon = '<i class="fa fa-check"></i>';
		msg  = "Alterado com sucesso";
	}else
	if(tipo==3){
		icon = '<i class="fa fa-close"></i>';
		msg  = "Excluido com sucesso";
	}else{
		
		icon = '<i class="fa fa-info"></i>';
		msg  = valor;
	}
		
	/* Estancia objeto e chama o metodo para exibir mensagem */
	//var app       = new Framework7();
	var toastIcon = app2.toast.create({
	  icon: app2.theme === 'ios' ? icon : icon,
	  text: msg,
	  position: 'center',
	  closeTimeout: 2000,
	});

    toastIcon.open();
}



