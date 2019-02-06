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
		complete   : function() { $("#wait").css("display", "none");},
        data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&pg='+parseInt(pg)+'&id_usuario_condominio='+$( "#DADOS #ID_USER" ).val(),
        dataType   : 'json',
		success: function(retorno){
			localStorage.setItem('TELA_ATUAL','mudancas');
			$("#pull-mudancas" ).removeClass("ptr-content");
		    $("#pull-mudancas" ).removeClass("ptr-refreshing");
			
			if(retorno !=''){
			  
				$('#add_mudanca #termo').html(retorno[0].termo);
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

				$("#main_mudanca").html(dado).show();
				$('.any_found').hide();
				$('#mudanca_semft').hide();
				
			}else{
				
				let nome = limitanome($('#NOME_MORADOR').val());
				$('#main_mudanca').hide();
				$('#mudanca_semft').show();
				$('#any_found').show().html('Olá, '+nome+'. <p style="margin-top: 8px;font-size: 18px;">Você não tem solicitações de Mudança cadastrada no sistema !');
				preenche_termo_mudanca();
			}
			afed('#mudanca','#home','','');		
				
		},
        error      : function() {
           alerta("","Erro ao carregar a pagina.");
        }
	});   
	
	$.ajax({
		
		 url:localStorage.getItem('DOMINIO')+'appweb/mudanca_get.php',
		type:'POST',
		data:{
				tabela_horario:'',
			    id_condominio :$( "#DADOS #ID_CONDOMINIO" ).val()
			
		     },
		success:function(retorno){
			sessionStorage.setItem("arraydias",retorno.split("**"));
		 }
	});
}

function carrega_mudanca(id){
	"use strict";	
	let dado    = '';
	let cor     = '';
	let pg      = '';
	let x       = 0;
	let a_nome  = ['Data'       ,'Hora Inicio','Hora Fim'  ,'Status' ,'Observação','Solicitação'];
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
			
		     $('#any_found').hide();
			 $('#mudanca_semft').hide();
			 if(retorno.obs.length >= 12){
				retorno.obs = retorno.obs.substr(0,12)+'...';
			 }else{
				retorno.obs = retorno.obs;
			 }
			 a_valor = [retorno.data_mudanca,retorno.hora_ini,retorno.hora_fim,retorno.status,retorno.obs,retorno.tipo];	
			
			 if(retorno.status == 'Reprovado'){
				$("#icon_status_mudanca").show().css('cssText','margin-left:9%;color:#f44336;font-size: 8em;');
				$('#lb_status_mudanca').text(retorno.status).css('color','#f44336').show();
			}else
			if(retorno.status == 'Aprovado'){
			    $("#icon_status_mudanca").show().css('cssText','margin-left:9%;color:#4caf50;font-size: 8em;');
				$('#lb_status_mudanca').text(retorno.status).css('color','#4caf50').show();
			}else{
				$("#icon_status_mudanca").hide();
				$('#lb_status_mudanca').hide();
			}
			
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
	
	 if(check_horario_mudanca() == 1){
		 alerta('','Horário inicial não pode ser menor que horário atual.')
	 }else
	 if(check_horario_mudanca() == 2){
		 alerta('','Horário final não pode ser menor que horário inicial.')
	 }else{
		 
		 let id_usuario_condominio = $("#DADOS #ID_USER").val();
		 let id_unidade            = $("#DADOS #ID_UNIDADE").val();
		 let nome_morador          = $("#DADOS #NOME_MORADOR").val();
		 let id_condominio         = $("#DADOS #ID_CONDOMINIO").val();

		 $("#form_mudanca_add input[name='id_usuario_condominio']").val(id_usuario_condominio);
		 $("#form_mudanca_add input[name='id_unidade']").val(id_unidade);
		 $("#form_mudanca_add input[name='nome_morador']").val(nome_morador);
		 $("#form_mudanca_add input[name='id_condominio']").val(id_condominio);

		 if($('select[name="tipo_mudanca"]').val() == 0){
			alerta("","Escolha o tipo da mudança.");
		 }else
		 if($("#add_mudanca #data_mudanca").val() == ""){
			alerta("","Preencha a data de mudança.");
		 }else
		 if( $("#add_mudanca #hora_inicio").val() == ""){
			alerta("","Preencha a hora inicial."); 
		 }else
		 if( $("#add_mudanca #hora_fim").val() == ""){
			alerta("","Preencha a hora final."); 
		 }else{
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
						 carrega_mudanca(e);
						 carrega_feedback(e);
						 afed('','#add_mudanca','');
					 },
					 error       : function(e){
						 alerta("","Erro ao salvar.");
					 }
				 });	 
			 },500); 
		 }	 
     }
}

function check_horario_mudanca(){
	var hora_at          = new Date()
	var hora_ini         = $('#form_mudanca_add #hora_inicio').val();
	var hora_fim         = $('#form_mudanca_add #hora_fim').val();
	var hora_atual       = hora_at.getHours();
    var minu_atual       = hora_at.getMinutes();
    var hora_esc         = hora_ini.substr(0,2);
    var min_esc          = hora_ini.substr(3);
    var hora_esc_fim     = hora_fim.substr(0,2);
    var min_esc_fim      = hora_fim.substr(3);
    var horario_esc      = hora_esc+''+min_esc; 
    var horario_esc_fim  = hora_esc_fim+''+min_esc_fim; 
 
    if(minu_atual<=9){
		minu_atual = '0'+minu_atual;
    }
	
    var horario = hora_atual+''+minu_atual;  
    if(parseInt(horario_esc) < horario){
		return 1
    }else
    if(parseInt(horario_esc_fim) < horario_esc){
		return 2
    } 
}

function mudanca_novo(){	
	afed('#add_mudanca','#mudanca','','');
	limpa_campo_mudanca(1);
}

function carrega_feedback(id){	
	"use strict";	
	let dados        = '';
	let cor          = '';
	let pg           = '';
	let btn_sugestao = '';
	let values_      = '';
	let x            = 0;
	let check        = '';
	
	$("#main_feedback").html("");
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/mudanca_feedback.php',
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_mudanca:id,id_usuario_condominio:$('#DADOS #ID_USER').val()},
        dataType   : 'json',
		success: function(retorno){
			for (x in retorno){
				 
				  if(retorno[x].aprovado == 2  ){
					values_   = 'data-data_sugerida = '+retorno[x].data_sugerida+' data-hora_inicio_sugerida = '+retorno[x].hora_ini_sugerida+' data-hora_fim_sugerida = '+retorno[x].hora_fim_sugerida;
					  
					if(retorno[x].retorno_usuario != '' && retorno[x].retorno_usuario != null ){
						check = 'disabled'
					}else{
						check = ''
					}
					  
					btn_sugestao = '<tr><td><button '+check+' class="sheet-open col button button-raised button-round" onclick="carrega_data_sugerida(this,'+retorno[x].id_movto_mudanca+')" '+values_+' data-sheet=".mudanca_sugestao" style="width: 158px;background: #ff8700;color:white;margin: 8px 0px 8px 0;"><span class="fa fa-calendar"></span> Data Sugerida</button></td></tr>';
				  }else{
					btn_sugestao = '';
					values_      = '';
				  }
				
				  dados += '<li class="accordion-item">'
								+'<div class="item-inner">'
								  +'<div class="item-title"><table><tr><td>Status: '+retorno[x].status+'</td></tr>'
								  +'<tr><td>Observação: '+quebra_linha(retorno[x].obs,39)+'</td></tr>'
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

function carrega_data_sugerida(el,id_movto_mudanca){
	
	$('#id_movto_mudanca').val(id_movto_mudanca);
	let data_sugerida        = $(el).data("data_sugerida");
	let hora_inicio_sugerida = $(el).data("hora_inicio_sugerida");
	let hora_fim_sugerida    = $(el).data("hora_fim_sugerida");
	
	$("#s_data").val(data_sugerida);
	$("#s_hora_inicio").val(hora_inicio_sugerida);
	$("#s_hora_fim").val(hora_fim_sugerida);
	$("#data_sugerida_mudanca").html("Data Mudança: "+data_sugerida);
	$("#rpv_mudanca_verifica, #apv_mudanca, .mudanca_sugestao .chip").show();
	$("#sugestao_mudanca,#rpv_mudanca").hide();
	$("#hora_sugerida_inicio_mudanca").html("Horario: "+hora_inicio_sugerida+" ás "+hora_fim_sugerida);
	$('#data_sug').val('').attr('disabled','disabled');
	$('#hora_inicio_sug').val('').attr('disabled','disabled');
	$('#hora_fim_sug').val('').attr('disabled','disabled');
	$('#observacao_sug').val('').attr('disabled','disabled');
	$('#check_sugerir').prop('checked',false);
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
			        administrador:'',
			        id_movto_mudanca:$('#id_movto_mudanca').val()
			   },
		  success:function(retorno){
			  alerta("","Solicitação Aprovada.");
			  $(".mudanca_sugestao .sheet-close").click();
			  carrega_mudanca(id);
			  carrega_feedback(id);
		  }
	  })
   }
}

function hab_campo_mudanca(){
	setTimeout(function(){
		
		let status = $("#check_sugerir").is(":checked");
		if(status){
			$('.mudanca_sugestao input[type="text"]').removeAttr("disabled");
			$('.mudanca_sugestao input[type="time"]').removeAttr("disabled");
			$('.mudanca_sugestao input[type="date"]').removeAttr("disabled");
			$().val
			//alert(1);
		}else{
			$('.mudanca_sugestao input[type="text"]').attr("disabled","disabled");
			$('.mudanca_sugestao input[type="time"]').attr("disabled","disabled");
			$('.mudanca_sugestao input[type="date"]').attr("disabled","disabled");
			//lert(2);
		}
	},200);	
}
	
function reprova_verifica(){
	
	app2.dialog.confirm('Deseja realmente reprovar a solicitação de mudança ?','Sugestão de Data', function () {
		$("#rpv_mudanca_verifica, #apv_mudanca, .mudanca_sugestao .chip").hide();
		$("#sugestao_mudanca,#rpv_mudanca").fadeIn();

	});
}

function reprova_mudanca(){
	let status         = $("#check_sugerir").is(":checked");
	var tipo_aprovacao = '';
	var id_mudanca     = $("#id_mudanca").val();
	var observacao     = $("#observacao_sug").val();
	var data           = $("#data_sug").val();
	var hora_inicio    = $("#hora_inicio_sug").val();
	var hora_fim       = $("#hora_fim_sug").val();
	
	if(status){
	   tipo_aprovacao = 2;		
	 }else{
	   tipo_aprovacao = 1; 
	 }
	
	 $.ajax({
		   url:localStorage.getItem('DOMINIO')+'appweb/mudanca_insert.php',
		   type:'POST',
		   beforeSend : function() { $("#wait").css("display", "block"); },
		   complete   : function() { $("#wait").css("display", "none"); },
		   data:{
					operacao:10,
					id_condominio:$('#DADOS #ID_CONDOMINIO').val(),
					id_usuario_condominio:$('#DADOS #ID_USER').val(),
					id_mudanca:id_mudanca,
					aprovado:tipo_aprovacao,
					observacao:observacao,
					data_sugerida:data,
					hora_inicio_sugerida:hora_inicio,
					hora_fim_sugerida:hora_fim,
					administrador:'',
			        id_movto_mudanca:$('#id_movto_mudanca').val()
			   },
		  success:function(retorno){
			  $(".mudanca_sugestao .sheet-close").click();
			  alerta("","Solicitação Reprovada.");
			  carrega_mudanca(id_mudanca);
			  carrega_feedback(id_mudanca);
		  },
		  error:function(retorno){
			  alerta("","Erro.");
		  }
	  });
}

function check_day(dia){	
	
	var data_selecionada = format_data(1,dia);
	var data             = new Date(data_selecionada);
	var dia_semana       = data.getDay();
	var dia_disponivel   = sessionStorage.getItem("arraydias");
	var a_dia            = dia_disponivel.split(",");
	var x                = 0;
	
	for(x in a_dia){
		if(a_dia[x] == dia_semana ){
		    return true;
		 }	
	}
}

function verifica_data(el){
	
	let tamanho = $(el).val().length;
	if(tamanho == 10 && $(el).val().substr(0,1) != 0){
		let ano              = $(el).val().substr(0,4);
		let mes              = $(el).val().substr(5,2);
		let dia              = $(el).val().substr(8,2);
		let fmt_choose_date  = format_data(0,dia+"/"+mes+"/"+ano)+' 23:59';
		let choose_date      = new Date(fmt_choose_date);
		let current_date     = new Date();
		let date             = $(el).val();      

		if(choose_date < current_date){
		   alerta('','Nao é permitido dias retroativos');
		   $(el).val('')
		}else
		if(!check_day(dia+"/"+mes+"/"+ano)){
		   $(el).val('');
		   alerta('','Data não disponivel na tabela de horario do condominio.')
		}
	}
}

function limpa_campo_mudanca(tipo){
	
	if(tipo == 1){
	    $('select[name="tipo_mudanca"]').val(0).change();
		$('#add_mudanca #data_mudanca').val('');
		$('#add_mudanca #hora_inicio').val('');
		$('#add_mudanca #hora_fim').val('');
		$('#add_mudanca #observacao').val('');
		$('#check_confirma_mudanca').prop('checked',false);
		$('#form_mudanca_add button').attr('disabled','disabled');
	}
}

function up_down_mudanca(){
	
	let status = sessionStorage.getItem("up_down_mudanca");
	if(status == "open"){
	   $("#up_down_mudanca").attr("class","fa fa-angle-up");
	   sessionStorage.setItem("up_down_mudanca","close")
	}else{
	   $("#up_down_mudanca").attr("class","fa fa-angle-down");
	   sessionStorage.setItem("up_down_mudanca","open")
	}	
}

function confirma_mudanca(){
	
	setTimeout(function(){
		if($('#check_confirma_mudanca').is(':checked')){
			$('#form_mudanca_add button').removeAttr('disabled')
		}else{
			$('#form_mudanca_add button').attr('disabled','disabled')
		}
	},300);
}

function preenche_termo_mudanca(){
	
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/mudanca_get.php',
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : 'termo_mudanca=""&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val(),
        dataType   : 'json',
		success: function(retorno){
			$('#add_mudanca #termo').html(retorno.descricao);
		},
        error      : function() {
        }
	}); 	
}
