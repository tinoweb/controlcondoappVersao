function carrega_entregas(tipo){
	"use strict";
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
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_unidade : $( "#DADOS #ID_UNIDADE" ).val(), pg : parseInt(pg),op:1 },
        dataType   : 'json',
		success: function(retorno){
			var cont = 0;
            for (x in retorno) {
				
				cont++;
				
				if(retorno[x]['dataentrega'] != ''){
					var cor_status='#a1cf77';
				}else{
					var cor_status='yellow';
				}
				
				if(retorno[x]['foto'] == ""){
					var fotoc = '<img style="width:40px;height:40px; background-image:url(img/carrinho-encomenda.png); background-size: 33px; background-position: center center; border-radius: 20px;" />';
				}else{
					var fotoc = '<img style="width:40px;height:40px; background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+'); background-size: 52px; background-position: center center; border-radius: 20px;" />';
				}

				dado = '<li class="accordion-item entrega"><a href="#" class="item-content item-link">'+
							'<div class="item-media" style="width: 44px; height: 44px; margin:3px 0 3px 0; border-radius: 22px; border: 2px solid #8e8e93;">'+fotoc+'</div>'+
							'<div class="item-inner">'+
								'<div class="item-title">'+retorno[x]['descricao']+' para '+retorno[x]['nome_morador']+'</div>'+
								'<div class="item-after"><i class="fa fa-circle" style="color:'+cor_status+'"></i></div>'+
							'</div></a>'+
						  	'<div class="accordion-item-content bg-color-white">'+
								'<div class="block">'+
									'<div class="list">'+
  									'<ul>'+
										'<li>'+
										'<div class="item-inner">'+
										'<div class="item-title">'+
										'<div class="item-header">Data Recebimento</div>'+
										retorno[x]['datarecebimento']+
										'</div>'+
										'</div>'+
										'</li>';
										if(retorno[x]['obsRecebimento'] != ''){
											dado = dado +
											'<li>'+
											'<div class="item-inner">'+
											'<div class="item-title">'+
											'<div class="item-header">Obs Recebimento</div>'+
											retorno[x]['obsRecebimento']+
											'</div>'+
											'</div>'+
											'</li>';
										}
											'<li>'+
										'<div class="item-inner">'+
										'<div class="item-title">'+
										'<div class="item-header">Data Recebimento</div>'+
										retorno[x]['datarecebimento']+
										'</div>'+
										'</div>'+
										'</li>';
										if(retorno[x]['dataentrega'] != ''){
											dado = dado +
											'<li>'+
											'<div class="item-inner">'+
											'<div class="item-title">'+
											'<div class="item-header">Data entrega</div>'+
											retorno[x]['dataentrega']+
											'</div>'+
											'</div>'+
											'</li>'+
											'<li>'+
											'<div class="item-inner">'+
											'<div class="item-title">'+
											'<div class="item-header">Entregue para</div>'+
											retorno[x]['nomeRetirada']+
											'</div>'+
											'</div>'+
											'</li>'+
											'<li>'+
											'<div class="item-inner">'+
											'<div class="item-title">'+
											'<div class="item-header">Obs entrega</div>'+
											retorno[x]['obsEntrega']+
											'</div>'+
											'</div>'+
											'</li>';
										}else{
											if(retorno[x]['codigo_correspondencia']==1)
												{
											dado = dado +
											
											
											'<li>'+
						 
											'<button class="btn btn-success col-md-12 card sheet-open" onClick="qrcode_encomenda('+retorno[x]['id']+')" data-sheet=".entregaqr_modal" ><i class="fa fa-qrcode"></i></button>'+
											
											'</li>';
												}
										}
									dado = dado +
  									'</ul>'+
									'</div>'+                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
								'</div>'+
						  	'</div>'+
						'</li>';

//                dado = '<div class="entrega" onClick=""><div class="entrega_foto" style="background-image:url(';
//				if(retorno[x]['descricao']==='SEDEX'){ onClick="carregar_um_visitante('+retorno[x] ['id']+')"
//					dado+= 'img/pacote.png';
//				}else if(retorno[x]['descricao']==='CARTA'){
//					dado+= 'img/carta.png';
//				}else if(retorno[x]['descricao']==='ENTREGA'){
//					dado+= 'img/entrega.png';
//				}
//				dado  +=  ')"></div><span>'+retorno[x]['nome_morador']+' ('+retorno[x]['descricao']+')</span>'
//				dado  +=    '<span style="font-size:10px;width:auto; float:right;">Data Recebimento: '+retorno[x]['datarecebimento']+'</span>';
//				if(retorno[x]['dataentrega']!==''){
//					dado += '<span style="font-size:10px;width:auto; float:right;">Data da Retirada: '+retorno[x]['dataentrega']+'</span>';
//				}
//				dado += '</div>';
                dados = dados + dado;
            }
			//dados = '<div id="main_correspondencia" class="main">'+dados+'</div>';
			if(tipo===0){
				$( "#main_correspondencia" ).html('');
			}
			
			if(cont == 0 && offset == 0 ){
				var sem_reg = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
				+"<img  width='50%' src='data:image/png;base64,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'> </div>";
				
				$("#main_correspondencia").html(sem_reg);
			}
			$( "#main_correspondencia" ).append(dados);
			afed('#entregas','#home','','',3,'entregas');
          
		},
        error : function() {
            alert(erro);
        }
	});	
}

// FILTRAR ENCOMENDA 
function buscar_encomenda()
{		$( "#main_correspondencia" ).html('');
	
		var n_retira = $("#respons_retirar").val();	
		var recb_in = $("#recb_in").val();
		var recb_fim = $("#recb_fm").val();	
		var entr_in = $("#entr_in").val();	
		var entr_fim = $("#entr_fm").val();
 		var status = $("#encd_sttus").val();
		var pg = 1;
		var dados = '';
		var dado  = '';
	
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/correspondencia_busca.php',
		crossDomain: true,
		//beforeSend : function() { $("#wait").css("display", "block"); },
		//complete   : function() { $("#wait").css("display", "none"); },
        data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_moradores: $("#DADOS #ID_MORADORES_UNIDADE").val(), pg : parseInt(pg),n_retira:n_retira,recb_in:recb_in,recb_fim:recb_fim, entr_in:entr_in, entr_fim:entr_fim,status:status},
       dataType   : 'json', 
		success: function(retorno){ 
			
			
			
			var cont = 0;
            for (x in retorno) {
				
				cont++;
				
				if(retorno[x]['dataentrega'] != ''){
					var cor_status='#a1cf77';
				}else{
					var cor_status='yellow';
				}
				
				if(retorno[x]['foto'] == ""){
					var fotoc = '<img style="width:40px;height:40px; background-image:url(img/carrinho-encomenda.png); background-size: 33px;background-repeat: no-repeat; background-position: center center; border-radius: 20px;" />';
				}else{
					var fotoc = '<img style="width:40px;height:40px; background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+'); background-size: 52px; background-position: center center; border-radius: 20px;" />';
				}

				dado = '<li class="accordion-item entrega"><a href="#" class="item-content item-link">'+
							'<div class="item-media" style="width: 44px; height: 44px; margin:3px 0 3px 0; border-radius: 22px; border: 2px solid #8e8e93;">'+fotoc+'</div>'+
							'<div class="item-inner">'+
								'<div class="item-title">'+retorno[0]['descricao']+' para '+retorno[0]['nome_morador']+'</div>'+
								'<div class="item-after"><i class="fa fa-circle" style="color:'+cor_status+'"></i></div>'+
							'</div></a>'+
						  	'<div class="accordion-item-content bg-color-white">'+
								'<div class="block">'+
									'<div class="list">'+
  									'<ul>'+
										'<li>'+
										'<div class="item-inner">'+
										'<div class="item-title">'+
										'<div class="item-header">Data Recebimento</div>'+
										retorno[x]['datarecebimento']+
										'</div>'+
										'</div>'+
										'</li>';
										if(retorno[x]['obsRecebimento'] != ''){
											dado = dado +
											'<li>'+
											'<div class="item-inner">'+
											'<div class="item-title">'+
											'<div class="item-header">Obs Recebimento</div>'+
											retorno[x]['obsRecebimento']+
											'</div>'+
											'</div>'+
											'</li>';
										}
											'<li>'+
										'<div class="item-inner">'+
										'<div class="item-title">'+
										'<div class="item-header">Data Recebimento</div>'+
										retorno[x]['datarecebimento']+
										'</div>'+
										'</div>'+
										'</li>';
										if(retorno[x]['dataentrega'] != ''){
											dado = dado +
											'<li>'+
											'<div class="item-inner">'+
											'<div class="item-title">'+
											'<div class="item-header">Data entrega</div>'+
											retorno[x]['dataentrega']+
											'</div>'+
											'</div>'+
											'</li>'+
											'<li>'+
											'<div class="item-inner">'+
											'<div class="item-title">'+
											'<div class="item-header">Entregue para</div>'+
											retorno[x]['nomeRetirada']+
											'</div>'+
											'</div>'+
											'</li>'+
											'<li>'+
											'<div class="item-inner">'+
											'<div class="item-title">'+
											'<div class="item-header">Obs entrega</div>'+
											retorno[x]['obsEntrega']+
											'</div>'+
											'</div>'+
											'</li>';
										}else{
											if(retorno[x]['codigo_correspondencia']==1)
												{
											dado = dado +
											
											
											'<li>'+
						 
											'<button class="btn btn-success col-md-12 card sheet-open" onClick="qrcode_encomenda('+retorno[x]['id']+')" data-sheet=".entregaqr_modal" ><i class="fa fa-qrcode"></i></button>'+
											
											'</li>';
												}
										}
									dado = dado +
  									'</ul>'+
									'</div>'+                                                                                                                                                   
								'</div>'+
						  	'</div>'+
						'</li>';

                dados = dados + dado;
				
            }
		// alert(dados);
				
				
				if(retorno =="")
				{
					var sem = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
						+"<img  width='50%'> </div>";
					
				$( "#main_correspondencia" ).html(sem);	

								
				}else{
					$( "#main_correspondencia" ).html(dados);
					
					}
		},
        error : function() {
            alert(erro);
        }
	});	
	

	
}

// LIMPAR CAMPO DE BUSCA DE ENCOMENDA
function limpa_campobusca()
{
	 $("#respons_retirar").val('');	
	 $("#recb_in").val('');
	 $("#recb_fm").val('');	
	 $("#entr_in").val('');	
	 $("#entr_fm").val('');		
}





//PEGAR QRCODE DA ENCOMENDA PARA O MORADOR 
function qrcode_encomenda(id)
{	$("#code_encomenda").html('');
	$("#qrcode_encomenda").html('');
	var id_condominio = $( "#DADOS #ID_CONDOMINIO" ).val();
	var id_morador = $( "#DADOS #ID_MORADOR" ).val();
	var id_correspondencia = id;
	var codigo = id_morador+"ENC"+id_condominio+"D"+id_correspondencia;
	$("#code_encomenda").html(codigo);
	
	
	
	
	  jQuery('#qrcode_encomenda').qrcode({
                text	:codigo,
                quiet   : 1,
                ecLevel: 'L',
                radius: 0.2
            });
	
}


//FUNÇÃO PARA FECHAR E RETORNAR O QUE FOI SELECIONADO NO STATUS DA BUSCA DE CORRESPONDENCIA 

function status_encomenda_filtro()
{
	
	var valor = $("#status_encomenda option:selected").val();
	
	$("#encd_sttus").attr('value',''+valor+'');
	$("#filtro_encomenda").click();

	$(".smart-select-page .navbar .sliding .left .back .icon-back").attr('id','slc_status_correspondencia');

	$("#slc_status_correspondencia").click();
	//$("#resultado_selc  .resultado_selc").attr('style','text-align: center;')
	
	
	
	
}
















