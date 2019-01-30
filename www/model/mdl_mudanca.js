function carrega_mudancas(tipo){
	"use strict";	
	let dado  = '';
	let cor   = '';
	let pg    = '';
	let x     = 0;
	
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/mudanca_get.php',
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&pg='+parseInt(pg)+'&id_usuario_condominio='+$( "#DADOS #ID_USER" ).val(),
        dataType   : 'json',
		success: function(retorno){
			
			for (x in retorno){
				
				dado += '<div class="card" onClick="carrega_feedback(\''+retorno[x].codigo+'\');carrega_mudanca(\''+retorno[x].codigo+'\');" >'
							+'<div class="feed-mudanca cabecalho_card card-header" style="background-color:'+retorno[x].cor+'">'
								+'<span style="font-size: 15px;" >Cód. <span style="color: white;" class="chip color-">'+retorno[x].codigo+'</span></span>'
				               +'<span>'+retorno[x].status+'</span>'
				               +'<div style="float: right;" ><i class="fa fa-exchange"></i></div>'	
							+'</div>'
				
							/*** Body of Card ***/
				
							+'<div class="card-content card-content-padding">'
				                +'<div style="margin-top:7px" class="chip"><div class="chip-media bg-color-yellow"><span class="fa fa-calendar"></span></div><div class="chip-label"> Data Mudança: '+retorno[x].data_mudanca+'</div></div>'	
								+'<div><div style="margin-top:7px" class="chip"><div class="chip-media bg-color-blue"><span class="fa fa-clock-o"></span></div><div class="chip-label"> Hora Inicio: '+retorno[x].hora_ini+'</div></div></div>'
				                +'<div style="margin-top:7px" class="chip"><div class="chip-media bg-color-orange"><span class="fa fa-clock-o"></span></div><div class="chip-label"> Hora fim: '+retorno[x].hora_fim+'</div></div>'
				                +'<div><div style="margin-top:7px" class="chip"><div class="chip-media bg-color-red"><span class="fa fa-exchange"></span></div><div class="chip-label"> Solicitação: '+retorno[x].tipo+'</div></div>'
				            					      
							+'</div>'
				          +'</div>'
			            +'</div>';
			}
			
			$("#main_mudanca").html(dado);
			afed('#mudanca','#home','','');		
				
		},
        error      : function() {
           alerta("","Erro ao carregar a pagina.");
        }
	});    	
}


function carrega_mudanca(id){
	"use strict";	
	let dado    = '';
	let cor     = '';
	let pg      = '';
	let x       = 0;
	let a_nome  = ['Data'       ,'Hora Inicio','Hora Fim'  ,'Status' ,'observação','Solicitação'];
	let a_icon  = ['fa-calendar','fa-clock-o' ,'fa-clock-o','fa-info','fa-edit'   ,'fa-exchange'];
	let a_cor   = ['yellow'     ,'blue'       ,'orange'    ,'red'    ,'green'     ,'blue'];
	let a_valor = [];
	
	$("#id_mudanca").val(id);
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/mudanca_get.php',
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : 'visualizar=""&id='+id+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&pg='+parseInt(pg)+'&id_usuario_condominio='+$( "#DADOS #ID_USER" ).val(),
        dataType   : 'json',
		success: function(retorno){
		     a_valor = [retorno.data_mudanca,retorno.hora_ini,retorno.hora_fim,retorno.status,retorno.obs,retorno.tipo];	 
			 for(x=0;x<=5;x++){
            
				 dado += '<div class="chip">'
							+'<div class="chip-media bg-color-'+a_cor[x]+'">'
							+'<i class="fa '+a_icon[x]+'"></i>'

							+'</div>'
							+'<div name="txt_privada" id="txt_privada" class="chip-label">'+a_nome[x]+': '+a_valor[x]+'</div>'
					 +'</div></br>';
			 }
			 $("#detalhe_mudanca").html(dado);
        },
        error      : function() {
           alerta("","Erro ao carregar a pagina.");
        }
	});   
	afed('#mudanca_info','#mudanca','','');	
	
}

function salva_mudanca(){
	 let id_usuario_condominio = $("#DADOS #ID_USER").val();
	 let id_unidade            = $("#DADOS #ID_UNIDADE").val();
	 let nome_morador          = $("#DADOS #NOME_MORADOR").val();

	 $("#form_mudanca_add input[name='id_usuario_condominio']").val(id_usuario_condominio);
	 $("#form_mudanca_add input[name='id_unidade']").val(id_unidade);
	 $("#form_mudanca_add input[name='nome_morador']").val(nome_morador);
	
	 setTimeout(function(){
		let dados = $("#form_mudanca_add").serialize();	
		$.ajax({
			 url        : localStorage.getItem('DOMINIO')+'appweb/mudanca_insert.php',
			 type       : 'POST',
			 beforeSend : function() { $("#wait").css("display", "block"); },
			 complete   : function() { $("#wait").css("display", "none"); },
			 data       : dados,
			 success    : function(e){
				 alerta(1);
			 },
			 error       : function(e){
				 alerta("","Erro ao salvar.");
			 }
		 });	 
	 },500); 	
}

function mudanca_novo(){	
	afed('#add_mudanca','#mudanca','','');
}

function carrega_feedback(id){	
	"use strict";	
	let dados        = '';
	let cor          = '';
	let pg           = '';
	let btn_sugestao = '';
	let values_      = '';
	let x            = 0;
	
	$("#main_feedback").html("");
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/mudanca_feedback.php',
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_mudanca:id },
        dataType   : 'json',
		success: function(retorno){
			for (x in retorno){
				 
				  if(retorno[x].aprovado == 2  ){
					values_   = 'data-data_sugerida = '+retorno[x].data_sugerida+' data-hora_inicio_sugerida = '+retorno[x].hora_ini_sugerida+' data-hora_fim_sugerida = '+retorno[x].hora_fim_sugerida;
					  
					btn_sugestao = '<tr class="anexo-ticket" onclick="get_anexo(\''+retorno[x]['id_ocorrencia_ticket']+'\')"><td><span class="sheet-open col button button-raised button-round" onclick="carrega_data_sugerida(this)" '+values_+' data-sheet=".mudanca_sugestao" style="width: 158px;background: #ff8700;color:white;margin: 8px 0px 8px 0;"><span class="fa fa-calendar"></span> Data Sugerida</span></td></tr>';
				  }else{
					btn_sugestao = '';
					values_      = '';
				  }
				
				  dados += '<li class="accordion-item">'
								+'<div class="item-inner">'
								  +'<div class="item-title"><table><tr><td>Status: '+retorno[x].status+'</td></tr>'
								  +'<tr><td>Observação: '+retorno[x].obs+'</td></tr>'
								  +'<tr><td>Data Hora: '+retorno[x].data_hora+'</td></tr>'
				                  +'<tr><td>'+btn_sugestao+'</td></tr>'
								+'</table></div>'
				         	+'</div></li>';

			}
			
			$("#main_feedback").html(dados);
		},
        error      : function() {
           alerta("","Erro ao carregar feedback.");
        }
	});    	
}


function carrega_data_sugerida(el){
	
	let data_sugerida        = $(el).data("data_sugerida");
	let hora_inicio_sugerida = $(el).data("hora_inicio_sugerida");
	let hora_fim_sugerida    = $(el).data("hora_fim_sugerida");
	
	$("#s_data").val(data_sugerida);
	$("#s_hora_inicio").val(hora_inicio_sugerida);
	$("#s_hora_fim").val(hora_fim_sugerida);
	$("#data_sugerida_mudanca").html("Data Mudança: "+data_sugerida);
	$("#hora_sugerida_inicio_mudanca").html("Horario: "+hora_inicio_sugerida+" ás "+hora_fim_sugerida);
}


			 
function aprova_mudanca(tipo_aprovacao){
	
	let id          = $("#id_mudanca").val();
	let observacao  = 'Aprovada';
	let data        = $("#s_data").val();
	let hora_inicio = $("#s_hora_inicio").val();
	let hora_fim    = $("#s_hora_fim").val();
	
	if(tipo_aprovacao == 0){
		
		  $.ajax({
		   
		   url:localStorage.getItem('DOMINIO')+'appweb/mudanca_insert.php',
		   type:'POST',
		   data:{
			   		operacao:10,
			        id_condominio:$('#DADOS #ID_CONDOMINIO').val(),
			        id_usuario_condominio:$('#DADOS #ID_USER').val(),
			        id_mudanca:id,
			        aprovado:tipo_aprovacao,
			        observacao:observacao,
			        data_sugerida:data,
			        hora_inicio_sugerida:hora_inicio,
			        hora_fim_sugerida:hora_fim,
			        administrador:''
			   },
		  success:function(retorno){
			  alerta("","Solicitação Aprovada.");
		  }
	  })
   }
	
}

function hab_campo_mudanca(){
	let status = $("#check_sugerir").is(":checked");
	if(status){
		$(".mudanca_sugestao input").removeAttr("disabled");
	}else{
		$(".mudanca_sugestao input").attr("disabled","disabled");
	}
}
	
function reprova_mudanca(){
	
		app2.dialog.confirm('Deseja realmente reprovar a solicitação de mudança ?','Sugestão de Data', function () {
			$("#apv_mudanca, .mudanca_sugestao .chip").hide();
			$("#sugestao_mudanca").fadeIn();

		});
	
}