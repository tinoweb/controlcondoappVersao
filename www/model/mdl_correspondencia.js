function carrega_entregas(tipo){
	"use strict";
    //alert(tipo);
    // alert($('#retorno_entregas').scrollTop());
	app.controler_pull("entregas");
	var pg = 0;
    if(tipo === 0){
        pg = 1;
    }else{
        var offset = $(".entrega").length;
        if(offset !== 0){
            pg = (offset/10)+1;
        }else{
            pg = 1;
        }
		if(parseInt(pg) !== parseFloat(pg)) { 
        	pg = pg+1; 
    	}
    }
    var dados = '';
	var dado  = '';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/correspondencia_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_morador : $( "#DADOS #ID_MORADOR" ).val(), pg : parseInt(pg) },
        dataType   : 'json',
		success: function(retorno){
            //alert(retorno);
            for (x in retorno) {
                dado = '<div class="entrega" onClick=""><div class="entrega_foto" style="background-image:url(';
				if(retorno[x]['descricao']==='SEDEX'){
					dado+= 'img/pacote.png';
				}else if(retorno[x]['descricao']==='CARTA'){
					dado+= 'img/carta.png';
				}else if(retorno[x]['descricao']==='ENTREGA'){
					dado+= 'img/entrega.png';
				}
				dado  +=  ')"></div><span>'+retorno[x]['nome_morador']+' ('+retorno[x]['descricao']+')</span>'
				dado  +=    '<span style="font-size:10px;width:auto; float:right;">Data Recebimento: '+retorno[x]['datarecebimento']+'</span>';
				if(retorno[x]['dataentrega']!==''){
					dado += '<span style="font-size:10px;width:auto; float:right;">Data da Retirada: '+retorno[x]['dataentrega']+'</span>';
				}
				dado += '</div>';
                dados = dados + dado;
            }
			//dados = '<div id="main_correspondencia" class="main">'+dados+'</div>';
			if(tipo===0){
				$( "#main_correspondencia" ).html('');
			}
			$( "#main_correspondencia" ).append(dados);
			afed('#entregas','#home','','',3,'entregas');
          
		},
        error : function() {
            //notifica('Entregas/N\u00e3o ha entrega/Fechar',0,0);
        }
	});	
}