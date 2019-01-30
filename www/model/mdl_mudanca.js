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
				
				dado += '<div class="card" onClick="carrega_mudanca(\''+retorno[x].codigo+'\');" >'
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