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
            $("#busca_enquete").val("");
            document.getElementById("tipob").checked = true;
            //alert('enquete');
        }
    }
    if(pagina == 'comunicados'){
        carrega_comunicados(0);
    }
    if(pagina == 'enquetes'){
        carrega_enquetes(0);
    }

    if(pagina == 'ocorrencias_ticket'){
        carrega_tickets(0);
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