// JavaScript Document
/*function carrega_agenda_eventos(){
	$('#calendario_agenda').html('');
	let html       = ''; 
	let icon       = '';
    let cor        = '';
	let now        = new Date();
    let today      = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let weekLater  = new Date().setDate(today.getDate() + 7);
	let monthNames = ['Janeiro', 
					  'Fevereiro', 
					  'Março', 
					  'Abril', 
					  'Maio', 
					  'Junho', 
					  'Julho', 
					  'Agosto' , 
					  'Setembro' , 
					  'Outubro', 
					  'Novembro', 
					  'Dezembro'];
	
	let dayNames =   ['Seg', 
					  'Ter', 
					  'Qua', 
					  'Qui', 
					  'Sex', 
					  'Sab',
					  'Dom'];
	

	
	let calendarInline = app2.calendar.create({
	  containerEl: '#calendario_agenda',
		    value: [new Date()],
	   weekHeader: true,
		   events: [
						new Date(2018, 9, 1),
						new Date(2018, 9, 5),	
				   ],
	  renderToolbar: function () {
		 
		return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
				  '<div class="toolbar-inner">' +
					'<div class="left">' +
					  '<a href="#" class="link icon-only"><i class="icon icon-back ' + (app2.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
					'</div>' +
					'<div class="center" style="margin-left: -23px;"></div>' +
					'<div class="right">' +
					  '<a href="#" class="link icon-only"><i class="icon icon-forward ' + (app2.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
					'</div>' +
				  '</div>' +
				'</div>';
	  },
	  on: {
		      /*take the day thay the user click*/
			  /*dayClick: function(calendar, dayEl, year, month, day){
			  		$.ajax({
						url        : localStorage.getItem('DOMINIO')+'appweb/agenda_get.php',
		                beforeSend : function() { $("#wait").css("display", "block"); },
		                complete   : function() { $("#wait").css("display", "none"); },
						data       : {operacao:2},     
						type       : 'POST',
						dataType   : 'JSON',
						success    : function(e){
							
							for(x in e){
								contador = parseInt(x)+1;
								if(x == 1){
								      cor = 'background: #0ee000;';
								   
								}else
								if(x == 2){
								   cor = 'background: #f0b716;';
								   
								 }else
								if(x == 3){
								   cor = 'background: #2196f3;';
								   
								 }else
								if(x == 4){
								   cor = 'background: #0ee000;';
								   
								 }else{
								   cor = 'background: red;';
								 }
								
								if(e[x].titulo == 'Mudanca'){
								    cor      = 'background:  #ffc906;';
									icon     = 'fa fa-exchange';
									
								}else{
									icon     = 'fa fa-calendar';
								}
								
								html += '<div class="background-btn chip color-red" style="height: 35px;width: 96%;'+cor+'">'
											+'<div style="padding-left: 5px;" class="chip-label col-xs-6">'+contador+' - '+e[x].titulo+'</div>'
								            +'<div class="col-xs-6"><span>'+ e[x].hora_inicio+' ás '+e[x].hora_inicio+'</span></div>'
								 			+'<div><span class="'+icon+'"></span></div>'
									   +'</div><br>';
							};
							
							$('#info_agenda_evento').html(html);
						},
						error : function(){				
							alerta('','Erro ao carregar eventos');
						}
					})
               },

			  init: function (c) {
				  
				  /*Write week name*/
				  /*for(x = 0;x <=7; x++){
					  $('.calendar-week-header').children().eq(x).html(dayNames[x])
				  }

				  $('calendar-week-header').text(dayNames[c.currentMonth]);
				  $('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
				  $('.calendar-custom-toolbar .left .link').on('click', function () {
					calendarInline.prevMonth();
				  });
				  $('.calendar-custom-toolbar .right .link').on('click', function () {
					calendarInline.nextMonth();
				  });
			},
			monthYearChangeStart: function (c) {
			  $('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);

			}
	     }
	});
	
    afed('#agenda','#home','','');
}*/

let event_days = (data) => {
	/*this function get all the events of the apartament (little points in calendar) */
	let x       = '';
	let days    = '';
	let ret_day = '';
	let tamanho_str = '';
	
	$.ajax({
		url        : localStorage.getItem('DOMINIO')+'appweb/agenda_get.php',
		dataType   : 'JSON',
		type       : 'POST',
		data       : {operacao:3,id_condominio:$( "#DADOS #ID_CONDOMINIO" ).val(),id_morador:$( "#DADOS #ID_MORADOR" ).val()},
	    success    : function(retorno){
		
			for(x in retorno){
				days +=','+retorno[x].DataEvento;				
			}
			
			sessionStorage.setItem('my_events',days);
		},
		error      :function(){
			alerta('','Erro ao carregar os dias.')
		}
	});
	
}


let carrega_agenda_eventos = (pano = '', pmes = '', pdia = '') => {
	
	let currently_data = new Date();
	let currently_dia  = currently_data.getDate();
	let currently_mes  = currently_data.getMonth();
	let currently_ano  = currently_data.getFullYear();
	let direciona_mes  = '';
	let verifica       = 0;
    app2.calendar.close("#calendario_agenda");
	
    $('#calendario_agenda').html('');
	$('#dia_selecionado_ag').val('');
	event_days();
	
	if(pano != '' && pmes != ''){
	   direciona_mes = ' /*calendarInline.setValue(["'+pano+'-'+pmes+'-'+pdia+'"]);*/calendarInline.setYearMonth('+pano+', '+pmes+', 2)';
	   verifica = 1;	   
	}
					  
	
	setTimeout(function(){
		
		let d_eventos        = sessionStorage.getItem('my_events');
		let a_dias           = d_eventos.split(',');
		let s_dias           = '';
		let s_dias_formatado = '';

		for(x in a_dias){	

			  ano = a_dias[x].substr(0,4);	
			  mes = parseInt(a_dias[x].substr(5,2))-1;	
			  dia = a_dias[x].substr(8);

			  s_dias += ' new Date("'+ano+'", "'+mes+'", "'+dia+'"), '
		}
		
		s_dias_formatado = s_dias.substr(25);
       
		let header_calendar = '<div class="toolbar calendar-custom-toolbar no-shadow">' +
								  '<div class="toolbar-inner">' +
									'<div class="left">' +
									  '<a href="#" class="link icon-only"><i style="width: 24px;height: 24px;" class="icon icon-back ' + (app2.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
									'</div>' +
									'<div class="center" style="margin-left: -23px;"></div>' +
									'<div class="right">' +
									  '<a href="#" class="link icon-only"><i class="icon icon-forward ' + (app2.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
									'</div>' +
								  '</div>' +
								'</div>';

		/* Build function dinamicly in time execution of aplication */
		let gera = new Function('',   'let html        = "";'
									  +'let icon       = "";'
									  +'let cor        = "";'
									  +'let now        = new Date();'
									  +'let today      = new Date(now.getFullYear(), now.getMonth(), now.getDate());'
									  +'let weekLater  = new Date().setDate(today.getDate() + 7);'
									  +'let monthNames = [\'Janeiro\',' 
														  +'\'Fevereiro\',' 
														  +'\'Março\','
														  +'\'Abril\',' 
														  +'\'Maio\',' 
														  +'\'Junho\',' 
														  +'\'Julho\',' 
														  +'\'Agosto\',' 
														  +'\'Setembro\',' 
														  +'\'Outubro\',' 
														  +'\'Novembro\',' 
														  +'\'Dezembro\'];'

									   +'let dayNames =   [\'Seg\','
														  +'\'Ter\',' 
														  +'\'Qua\',' 
														  +'\'Qui\',' 
														  +'\'Sex\',' 
														  +'\'Sab\','
														  +'\'Dom\'];'


							  +' let calendarInline = app2.calendar.create({'
									  +'containerEl: "#calendario_agenda",'
											+'value: [new Date()],'
									   +'weekHeader: true,'
										   +'events: ['
														+s_dias_formatado+

													'],'
									  +'renderToolbar: function () {'

										   +' return \''+header_calendar+'\''

									  +' },'
									  +' on: {'
											   +'/*take the day thay the user click*/'
											   +'dayClick: function(calendar, dayEl, year, month, day){'
													 +' $("#info_agenda_evento").html(""); html = "";'
								                     +'let data_formatada = trata_data_agenda(day+"/"+month+"/"+year,1);'
								                     +' $("#dia_selecionado_ag").val(trata_data_agenda(day+"/"+month+"/"+year,2));' 
													 +'$.ajax({'
														 +'url        : localStorage.getItem("DOMINIO")+"appweb/agenda_get.php",'
														 +'beforeSend : function() { $("#wait").css("display", "block"); },'
														 +'complete   : function() { $("#wait").css("display", "none"); },'
														 +'data       : {operacao:2,id_morador:$( "#DADOS #ID_MORADOR" ).val(),data:data_formatada,id_condominio:$( "#DADOS #ID_CONDOMINIO" ).val()},  '   
														 +'type       : "POST",'
														 +'dataType   : "JSON",'
														 +'success    : function(e){'
                                                             +'let hidden1   = "";'
														     +'let titulo    = "";'
															 +'let id        = "";'
															 +'let id_modulo = 0;'
															 +'for(x in e){'
																 +'contador = parseInt(x)+1;'
																 +'if(e[x].titulo == "Mudanca"){'

								                                     +'titulo    = e[x].titulo;'
																	 +'cor       = "background:  #ffc906";'
																	 +'icon      = \'fa fa-exchange\';'
																	 +'vclasse   = "icon-mudanca";'
								 								     +'hidden1   = "display:block;";'
								                                     +'$(".ag_btn_relacionados").hide();'
																	 +'id_modulo = 1;'
								

																 +'}else '
								                                 +'if(e[x].titulo == "Comunicado"){'
								
																	 +'titulo    = e[x].titulo_descricao;'
																	 +'cor       = "background:"+e[x].cor;'
																	 +'icon      = \'fa fa-bullhorn\';'
																	 +'vclasse   = "icon-comunicado";'
																     +'hidden1   = "display:none;";'
																     +'id        = " N° "+e[x].id;'
								                                     +'$(".ag_btn_relacionados").hide();'
																	 +'id_modulo = 2;'
								
								                                 +'}'
								                                 +'else{'
								
																	 +'titulo   = e[x].titulo;'
																	 +'icon     = \'fa fa-calendar;\';'
																	 +'vclasse  = "icon-evento";'
								 									 +'hidden1  = "display:block;";'
																	 +'cor      = "background:"+e[x].cor;'
																	 +'id       = ""'
															

																 +'}'

																+'html += "<div data-sheet=\'.evento_detalhe\' onclick=\'carrega_evento_detalhe("+e[x].id_evento+","+id_modulo+") \'class=\'sheet-open background-btn chip color-red\' style=\'height: 35px;width: 96%;"+cor+"  \'>'
																			+'<div style=\'padding-left: 5px;\' class=\'chip-label col-xs-6\'>"+contador+" - "+titulo+id+"</div>'
																			+'<div class=\'col-xs-6\'><span style="+hidden1+">"+ e[x].hora_inicio+" ás "+e[x].hora_fim+"</span></div>'
																			+'<div><span class="+vclasse+"></span></div>'
																	   +'</div><br>"'
															+'}; '
															+' $(\'#info_agenda_evento\').html(html);'
															+' $(\'.icon-evento\').addClass(\'fa fa-calendar\');'
															+' $(\'.icon-mudanca\').addClass(\'fa fa-exchange\');'
								                            +' $(\'.icon-comunicado\').addClass(\'fa fa-bullhorn\');'

														+'},'
														+'error : function(){'				
															+'alerta(\'\',\'Erro ao carregar eventos\');'
														+'}'
													+'})'
											   +'},'

											  +'init: function (c) {'
												  +'/*Write week name*/'
												  +'for(x = 0;x <=7; x++){'
													 +'$(\'.calendar-week-header\').children().eq(x).html(dayNames[x])'
												  +'}'

												+'$(\'calendar-week-header\').text(dayNames[c.currentMonth]);'
												+'$(\'.calendar-custom-toolbar .center\').text(monthNames[c.currentMonth] +", " + c.currentYear);'
												 +'$(".calendar-custom-toolbar .left .link").on("click", function () {'
													+'calendarInline.prevMonth();'
												 +'});'
												 +'$(".calendar-custom-toolbar .right .link").on("click", function () {'
													+'calendarInline.nextMonth();'
												 +'});'
											+'},'
											+'monthYearChangeStart: function (c) {'
											  +'$(".calendar-custom-toolbar .center").text(monthNames[c.currentMonth] +", " + c.currentYear);'

											+'}'
										 +'}'
									 +'});'+direciona_mes)
								 
		gera();
		afed('#agenda','#home','','');
		
	},700);
	
	setTimeout(function(){
		if(verifica == 1){
		  $('.calendar-month-current div[data-date="'+pano+'-'+pmes+'-'+parseInt(pdia)+'"]').click();	
	    }else{
		  $('.calendar-month-current div[data-date="'+currently_ano+'-'+currently_mes+'-'+currently_dia+'"]').click();
		}		
	},1000);
	
}

function trata_data_agenda(valor,op){

    let a_numero      = ['0','1','2','3','4','5','6','7','8','9'];
    let a_data        = valor.split('/'); 
    let valor_dia     = '';
    let valor_mes     = '';
	let mes_formatado = '';

    if(a_data[0] == a_numero[a_data[0]]){
        valor_dia = '0'+a_data[0];	 
    }else{
       valor_dia  = a_data[0];	
    }   

    if(a_data[1] == a_numero[a_data[1]]){
		mes_formatado = parseInt(a_data[1])+1;
        valor_mes     = '0'+mes_formatado;	
    }else{
       valor_mes  = parseInt(a_data[1])+1;			
    }
	
	if(op == 1){
	   return valor_dia+'/'+valor_mes+'/'+a_data[2];
	}else
	if(op == 2){
		return a_data[2]+'-'+valor_mes+'-'+valor_dia;
	}
	
    
}

function agenda_novo(){
	
	afed('#add_agenda','#agenda','','');	
	$(":input").bind('keyup mouseup', function () {
		habilita_sheet();           
	});

}

function check_intervalo(tipo){
	 
   if(tipo == 1){ /* Intervalo Fixo */
		$('#intervaloGrupo').fadeOut();
        $('#intervaloAgenda').fadeOut();
	    $('#intervaloGrupoDetalhe').fadeOut();
	    $('#intervalorFixo').fadeIn();
	    $('#intervalorFixoDetalhe').fadeIn();
	    $('.intervaloAgenda').val('intervalo fixo');
	    $('.btn_cria_evento').removeAttr('data-sheet','.confirmacao_agenda');
	    $('.btn_cria_evento').removeClass('sheet-open');
	    $('.adicionaEven').hide();
   }else
   if(tipo == 2){ /* Intervalo Personalizado */
	    
		$('#intervaloGrupo').fadeIn();
        $('#intervaloAgenda').fadeIn();
	    $('#intervaloAgendaDetalhe').fadeIn();
	    $('#intervalorFixo').fadeOut();
	    $('#intervalorFixoDetalhe').fadeOut();
	    $('#intervaloGrupoDetalhe').fadeIn();
	    $('.intervaloAgenda').val('intervalo personalizado');
	    /*$('.btn_cria_evento').Attr('data-sheet','.confirmacao_agenda');
	   	$('.btn_cria_evento').addClass('sheet-open');*/
	    $('.adicionaEven').fadeIn();
	    $('.item1').fadeIn();  
   }	
}

function salva_evento() { 
			
		var datainicial         =  $('input[name="ag_data_inicio_fixo"]').val();
		var datafinal           =  $('input[name="ag_data_fim"]').val();
		var tipo_acao           =  $("operacao").html();
		var check_personalizado =  $('#ag_intervalo_perso').is(':checked');
		var check_fixo          =  $('input[value="fixo"]').is(':checked');
		var hora_inicio_fixo    =  $('input[name="ag_hr_inicio_fixo"]').val();
		var hora_fim_fixo       =  $('input[name="ag_hr_fim_fixo"]').val();
	    $('#dia_selecionado_ag').val('');

			if(check_personalizado) /* Check type of the event (fixo ou personalizado) */
			 {

				 if(verifica_cad_agenda()){ /* Check register information */

					var nome_campo      = ["DataInicio","HoraInicio","HoraFim","Repetir","RepetirAte","id_evento","evento_operacao"];
					var json_cabecalho    = '{"cabecalho":['
					var json              = '{"eventos":[';
					var json_body         = "";
					var json_col_ini      = "";
					var json_col_fim      = "";
					var json_para_um      = "";
					var json_para_dois    = "";
					var tamanho_string    = "";
					var qtd_campo         = "";
					var string_json       = "";
					var p_array           = "";
					var ctipo             = $("#ag_tipo").val();
					var ctitulo           = $("#agenda_titulo").val();
					var cnotificacao_dias = $("#agenda_n_dia_notifica").val();
					var cgestor           = $("#ag_gestor").val();
					var cfornecedor       = $("#ag_fornecedor").val();
					var ccontrato         = $("#ag_contrato").val();
					var cor               = $("#ag_cor").val();
					var descricao         = $("#ag_descricao").val();
					var gestor            = $("#ag_gestor").val();
					var fornecedor        = $("#ag_fornecedor").data("id");
					var ag_contrato       = $("#ag_contrato").val();
					var dia_notifica      = $("#n_dia_notifica").val();
					var p_fim             = $("#ag_periodo_fim").val();
					var tipo_operacao     = $("#operacao").val();
					var idEvento          = $("#id_evento").val();
					var ag_id_filtro      = $("#id_filtro").val();
					var idModulo          = $("#id_modulo").val();
					var iid_gestor        = $("#id_gestor").val();
					var iid_fornecedor    = $("#id_fornecedor").val();
					var iid_contrato      = $("#id_contrato").val();
					var contador          = "";
					var qtd_campo         = "";
					var p_array           = "";

					$("#intervaloGrupo > div").each(function(e){ /* Pega Valores Preenchidos E monta string Json*/
						 json_col_ini = "{";
						 contador     = e+1;
						 $("#intervaloGrupo .item"+contador+" input,#intervaloGrupo .item"+contador+" select ").each(function(x){
							 /* Tratativa para quebrar string dinamicamente*/
							 qtd_campo = $("#intervaloGrupo .item"+contador+" input,#intervaloGrupo .item"+contador+" select ").length;	 
							 if(qtd_campo == 7){
								p_array = 6;
							}else
							 if(qtd_campo == 6){
								p_array = 5;
							 }

							if($(this).attr("style")!="display: none" || $(this).attr("name")=="ag_periodo_fim" ){
									  if(x===p_array){
										   json_col_fim = "}"; 
										}

									 json_body+= json_col_ini+'"'+nome_campo[x]+'":"'+$(this).val()+'"'+json_col_fim+',';
									 json_col_ini="";
									  if(x===p_array){
										   json_col_fim = "";
										}
								 }
							 });
					});

					tamanho_string = json_body.length;
					string_json    = json+json_body.substr(0,tamanho_string-2)+"}]}";

					console.log(string_json);	

					$.ajax({
							   type:'POST',
							   data:{
									   dados_json      :string_json,
									   titulo          :ctitulo,
									   notificacao_dias:cnotificacao_dias,
									   gestor          :cgestor,
									   fornecedor      :cfornecedor,
									   contrato        :ccontrato,
									   Intervalo       :'intervalo personalizado',
									   id_condominio   :$( "#DADOS #ID_CONDOMINIO" ).val(),
									   id_usuario_condominio:$( "#DADOS #ID_USER" ).val(),
									   id_morador      :$( "#DADOS #ID_MORADOR" ).val(),
									   ag_tipo         :ctipo, 
									   ag_cor          :cor, 
									   ag_descricao    :descricao,
									   ag_periordo_rpt :'',
									   ag_periodo_fim  :p_fim,
									   ag_gestor       :gestor,
									   ag_fornecedor   :fornecedor,
									   ag_contrato     :ag_contrato,
									   n_dia_notifica  :dia_notifica,
									   id_modulo       :'',
									   ag_data_fim     :'',
									   id_pai          :'',
									   operacao        :tipo_operacao,
									   id_evento       :idEvento,
									   id_filtro       :ag_id_filtro,
									   id_gestor       :'',
									   id_fornecedor   :'',
									   id_contrato     :'',
									   tipo_usuario    :'morador'

									},
								url:localStorage.getItem("DOMINIO")+"appweb/agenda_insert.php",
							success:function(retorno){
								confirmacao_agenda(retorno);
								
							},
							error:function(){

								  alerta('','Erro ao salvar evento.')
							}
				 })
			}
		}else
		if(check_fixo){

			if(check_campo_vazio_ag(0)){

				if(check_data_agenda(datainicial,datafinal,'salvar_fixo',hora_inicio_fixo,hora_fim_fixo))
				{ 
					let dados = $('#form_agenda_add').serialize();
					let ano   = datainicial.substr(0,4);
					let mes   = parseInt(datainicial.substr(5,2))-1;
					let dia   = datainicial.substr(8,2);
					$.ajax({

						url     :localStorage.getItem("DOMINIO")+"appweb/agenda_insert_unico.php",
						type    :'POST',
						dataType:'JSON',
						data    :dados+'&id_morador='+$("#DADOS #ID_MORADOR").val()+'&id_usuario_condominio='+$("#DADOS #ID_USER").val()+'&id_condominio='+$("#DADOS #ID_CONDOMINIO").val(),
						success :function(e){
							event_days();
							$("#wait").css("display", "block");
							setTimeout(function(){
								carrega_agenda_eventos(ano,mes,dia);
							    alerta("1");
							    limpa_campo_ag();	
								$("#wait").css("display", "none");
							},2000);
						},
						error:function(r){
							alerta("","Falha ao salvar.")
						}
					});
				}
			}
	   }else{				   
		   alerta('','Escolha um intervalo.');
	   }
}



let editar_evento = () => { 
	
	        $('.lineAgenda').hide();
			if(verifica_cad_agenda(1)){
				
			    var datainicial         =  $('#form_agenda_inc #ag_data_inicio').val();
		        var datafinal           =  $('#form_agenda_inc #ag_data_fim').val();
		        var tipo_acao           =  $("operacao").html();
				var check_personalizado =  $('#ag_intervalo_perso_detalhe').is(':checked');
				var nome_campo        = ["DataInicio","HoraInicio","HoraFim","Repetir","RepetirAte","id_evento","evento_operacao"];
				var json_cabecalho    = '{"cabecalho":['
				var json              = '{"eventos":[';
				var json_body         = "";
				var json_col_ini      = "";
				var json_col_fim      = "";
				var json_para_um      = "";
				var json_para_dois    = "";
				var tamanho_string    = "";
				var qtd_campo         = "";
				var string_json       = "";
				var p_array           = "";
				var ctipo             = $("#agenda_tipo_detalhe").val();
				var ctitulo           = $("#agenda_titulo_detalhe").val();
				var cnotificacao_dias = $("#agenda_n_dia_notifica_detalhe").val();
				var cgestor           = $("#ag_gestor_detalhe").val();
				var cfornecedor       = $("#ag_fornecedor_detalhe").val();
				var ccontrato         = $("#ag_contrato_detalhe").val();
				var cor               = $("#agenda_cor_detalhe").val();
				var descricao         = $("#agenda_descricao_detalhe").val();
				var gestor            = $("#ag_gestor_detalhe").val();
				var fornecedor        = $("#ag_fornecedor_detalhe").data("id");
				var ag_contrato       = $("#ag_contrato_detalhe").val();
				var dia_notifica      = $("#agenda_dnotifica_detalhe").val();
				var p_fim             = $("#agenda_periodo_fim_detalhe").val();
				var tipo_operacao     = $("#operacao_detalhe").val();
				var idEvento          = $("#id_evento_detalhe").val();
				var ag_id_filtro      = $("#id_filtro_detalhe").val();
				var idModulo          = $("#id_modulo_detalhe").val();
				var iid_gestor        = $("#id_gestor_detalhe").val();
				var iid_fornecedor    = $("#id_fornecedor_detalhe").val();
				var iid_contrato      = $("#id_contrato_detalhe").val();
				var contador          = "";
				var qtd_campo         = "";
				var p_array           = "";

				if(check_personalizado)
				 {

					/* Pega Valores Preenchidos E monta string Json*/
					$("#intervaloGrupoDetalhe > div").each(function(e){
						 json_col_ini = "{";
						 contador     = e+1;
						 $("#intervaloGrupoDetalhe .item"+contador+" input,#intervaloGrupoDetalhe .item"+contador+" select ").each(function(x){
							 /* Tratativa para quebrar string dinamicamente*/
							 qtd_campo = $("#intervaloGrupoDetalhe .item"+contador+" input,#intervaloGrupoDetalhe .item"+contador+" select ").length;	 
							 if(qtd_campo == 7){
								p_array = 6;
							}else
							 if(qtd_campo == 6){
								p_array = 5;
							 }

							if($(this).attr("style")!="display: none" || $(this).attr("name")=="ag_periodo_fim" ){
									  if(x===p_array){
										   json_col_fim = "}"; 
										}

									 json_body+= json_col_ini+'"'+nome_campo[x]+'":"'+$(this).val()+'"'+json_col_fim+',';
									 json_col_ini="";
									  if(x===p_array){
										   json_col_fim = "";
										}
								 }
							 });
					});

					tamanho_string = json_body.length;
					string_json    = json+json_body.substr(0,tamanho_string-2)+"}]}";

					$.ajax({
							   type:'POST',
							   data:{
									   dados_json      :string_json,
									   titulo          :ctitulo,
									   notificacao_dias:cnotificacao_dias,
									   gestor          :cgestor,
									   fornecedor      :cfornecedor,
									   contrato        :ccontrato,
									   Intervalo       :'intervalo personalizado',
									   id_condominio   :$( "#DADOS #ID_CONDOMINIO" ).val(),
									   id_usuario_condominio:$( "#DADOS #ID_USER" ).val(),
									   id_morador      :$( "#DADOS #ID_MORADOR" ).val(),
									   ag_tipo         :ctipo, 
									   ag_cor          :cor, 
									   ag_descricao    :descricao,
									   ag_periordo_rpt :'',
									   ag_periodo_fim  :p_fim,
									   ag_gestor       :gestor,
									   ag_fornecedor   :fornecedor,
									   ag_contrato     :ag_contrato,
									   n_dia_notifica  :dia_notifica,
									   id_modulo       :'',
									   ag_data_fim     :'',
									   id_pai          :'',
									   operacao        :1,
									   id_evento       :idEvento,
									   id_filtro       :ag_id_filtro,
									   id_gestor       :'',
									   id_fornecedor   :'',
									   id_contrato     :'',
									   tipo_usuario    :'morador'

									},
								url:localStorage.getItem("DOMINIO")+"appweb/agenda_insert.php",
							success:function(retorno){

								 alerta(2);
								 carrega_agenda_eventos();
								 $('.fechaAgenda').click();
								
							},
							error:function(){

								  alerta('','Erro ao editar evento.')
							}
				 }) 
					 
		    }else{
				
				$.ajax({
							   type:'POST',
							   data:{
									   titulo          :ctitulo,
									   notificacao_dias:cnotificacao_dias,
									   gestor          :cgestor,
									   fornecedor      :cfornecedor,
									   contrato        :ccontrato,
									   Intervalo       :'intervalo fixo',
									   id_condominio   :$( "#DADOS #ID_CONDOMINIO" ).val(),
									   id_usuario_condominio:$( "#DADOS #ID_USER" ).val(),
									   id_morador      :$( "#DADOS #ID_MORADOR" ).val(),
									   ag_tipo         :ctipo, 
									   ag_cor          :cor, 
									   ag_descricao    :descricao,
									   ag_periordo_rpt :'',
									   ag_periodo_fim  :p_fim,
									   ag_gestor       :gestor,
									   ag_fornecedor   :fornecedor,
									   ag_contrato     :ag_contrato,
									   n_dia_notifica  :dia_notifica,
									   id_modulo       :'',
									   ag_data_fim     :$('#intervalorFixoDetalhe #ag_data_fimDetalhe').val(),
								       ag_data_inicio_fixo:$('#intervalorFixoDetalhe #ag_agendaDetalhe').val(),
								       ag_hr_inicio_fixo :$('#intervalorFixoDetalhe #ag_hora_agendaDetalhe').val(),
								       ag_hr_fim_fixo:$('#intervalorFixoDetalhe input[name="ag_hr_fim_fixoDetalhe"]').val(), 
								       ag_tipo :0,
								       ag_periodo_fim  :'', 
								       id_evento:$('#id_evento_relacionado').val(),
									   id_pai          :'',
									   operacao        :1,
									   id_filtro       :ag_id_filtro,
									   id_gestor       :'',
									   id_fornecedor   :'',
									   id_contrato     :'',
									   tipo_usuario    :'morador'

									},
								url:localStorage.getItem("DOMINIO")+"appweb/agenda_insert_unico.php",
							success:function(retorno){
								alerta("1");
								setTimeout(function(){
									$('.fechaAgenda').click();
									carrega_agenda_eventos();
								},1000);
								
							},
							error:function(){

								  alerta('','Erro ao editar evento.')
							}
				 }) 
			
		  }
	 }
}


function check_rpt(val,tamanho,op=0,el){

	
		if(op==0){ /* insert*/

			if(val == 0){
			   $(el).css('border','1px solid rgb(169, 169, 169)');
			   $('.repetirAte'+tamanho).fadeOut();
			   $('.repetirAte'+tamanho+' input').attr('data-verifica','no');   
			}else
			if(val == 99 ){
				$('.repetirAte'+tamanho).fadeOut();
				$('.repetirAte'+tamanho+' input').attr('data-verifica','no');
			}else{
				$('.repetirAte'+tamanho).fadeIn();
				$('.repetirAte'+tamanho+' input').attr('data-verifica','yes');
				$(el).css('border','1px solid rgb(169, 169, 169)');

			} 
		}else{ /* update */
			if(val == 0 || val == 99 ){
				$('#intervaloGrupoDetalhe .repetirAte'+tamanho).fadeOut()
			}else{
				$('#intervaloGrupoDetalhe .repetirAte'+tamanho).fadeIn();
				$(el).css('border','1px solid rgb(169, 169, 169)');
			}
		}
}

let verifica_cad_agenda = (tipo) => {
	
	
		/* Tratativa para verificar campos adicionados (eventos a mais. personalizados) */
		let verifica  = '0';
		let verifica2 = '0';

		$('#intervaloGrupo input,#intervaloGrupo select').each(function(){
			if($(this).attr('class') != 'noshow'){
				if($(this).val() == 99 || $(this).val() == ''){ 
					verifica += '1';  
				}else{
					verifica += '0';
				}	   
			}	
		});   

		$('.repetirAte-inp input').each(function(){ /* Tratativa para verificar dias até */
			if($(this).attr('data-verifica') == 'yes' && $(this).val() == '' ){
				verifica2 += '1';  
			}else
			if($(this).attr('data-verifica') == 'yes' && $(this).val() != '' ){
				verifica2 += '0';
			}	
		}); 

		if(tipo == 1){
		   if($('#ag_cor_detalhe').val() == 99){
				alerta('','Escolha uma cor')
			}else
			if($('#agenda_titulo_detalhe').val() == ''){
				alerta('','Preencha o Titulo')
			}else

			if($('#n_dia_notifica_detalhe').val() == ''){
				alerta('','Preencha os dias para notificação')
			}else{
				$('.btn_cria_evento').addClass('sheet-open');
				return true;
			}

		}else{
			if($('#ag_cor').val() == 99){
				alerta('','Escolha uma cor')
			}else
			if($('#agenda_titulo').val() == ''){
				alerta('','Preencha o Titulo')
			}else
			if(verifica.indexOf('1') >=0 ){ 

				$('#intervaloGrupo input,#intervaloGrupo select').each(function(){

					if($(this).val() == '' && $(this).attr('data-verifica') != 'yes' || $(this).val() == 99  ){
						$(this).css('border','1px solid red');
					}else{
						$(this).css('border','1px solid rgb(169, 169, 169)');	
					}
				}); 

				$('.repetirAte-inp input').each(function(){
					if($(this).attr('data-verifica') == 'yes' && $(this).val() == ''){
						$(this).css('border','1px solid red');
					}else{
						$(this).css('border','1px solid rgb(169, 169, 169)');
					}	
				}); 

				alerta('','Preencha os campos em vermelho');

			}else
			if(verifica2.indexOf('1') >=0){ /* Tratativa para verificar dias até */

				$('.repetirAte-inp input').each(function(){
					if($(this).attr('data-verifica') == 'yes' && $(this).val() == '' ){
						$(this).css('border','1px solid red');

					}else
					if($(this).attr('data-verifica') == 'yes' && $(this).val() != '' ){
						$(this).css('border','1px solid rgb(169, 169, 169)');	
					}	
				}); 

				alerta('','Preencha os campos em vermelho');

			}else
			if($('#n_dia_notifica').val() == ''){
				alerta('','Preencha os dias para notificação')
			}else{
				return true;
			}			
		}
}

let habilita_sheet = () => {
		
	setTimeout(function(){
		
		let verifica           = '0';
		let verifica2          = '0';
		let tipo_personalizado = $('#ag_intervalo_perso').is(':checked');

		$('#intervaloGrupo input,#intervaloGrupo select').each(function(){
			if($(this).attr('class') != 'noshow'){
				if($(this).val() == 99 || $(this).val() == ''){ 
					verifica += '1';  
				}else{
					verifica += '0';
				}	   
			}	
		});   

		$('.repetirAte-inp input').each(function(){ /* Tratativa para verificar dias até */
			if($(this).attr('data-verifica') == 'yes' && $(this).val() == '' ){
				verifica2 += '1';  
			}else
			if($(this).attr('data-verifica') == 'yes' && $(this).val() != '' ){
				verifica2 += '0';
			}	
		}); 
		
		
		if($('#ag_cor').val() == 99){
			$('.btn_cria_evento').removeClass('sheet-open');
			$('.btn_cria_evento').removeAttr('data-sheet','.confirmacao_agenda');
		}else
		if($('#agenda_titulo').val() == ''){
			$('.btn_cria_evento').removeClass('sheet-open');
			$('.btn_cria_evento').removeAttr('data-sheet','.confirmacao_agenda');
		}else
		if($('#n_dia_notifica').val() == ''){
			$('.btn_cria_evento').removeClass('sheet-open');
			$('.btn_cria_evento').removeAttr('data-sheet','.confirmacao_agenda');
		}else
		if(verifica.indexOf('1')>=0){
		    $('.btn_cria_evento').removeClass('sheet-open');
			$('.btn_cria_evento').removeAttr('data-sheet','.confirmacao_agenda');
		   
		}else
		if(verifica2.indexOf('1')>=0 ){
		    $('.btn_cria_evento').removeClass('sheet-open');
			$('.btn_cria_evento').removeAttr('data-sheet','.confirmacao_agenda');
		   
		}else{

			if(tipo_personalizado){
				$('.btn_cria_evento').addClass('sheet-open');
				$('.btn_cria_evento').attr('data-sheet','.confirmacao_agenda');
			}else{
				$('.btn_cria_evento').removeAttr('data-sheet','.confirmacao_agenda');
				$('.btn_cria_evento').removeClass('sheet-open');
			}
		}				
	},500);
}

let desabilita_campo_ag = (op) => {
	
	if(op == 1){
	    $('.evento_detalhe input,.evento_detalhe select').attr('disabled','disabled')
	}else
	if(op == 2){
	    $('.evento_detalhe input,.evento_detalhe select').removeAttr('disabled');
		$('.ag_cancel').fadeIn();
		$('.ag_save').fadeIn();
		$('.ag_edit').fadeOut();
		$('#intervaloGrupoDetalhe #agenda_repetirDetalhe').attr('disabled','disabled');
        $('#intervaloGrupoDetalhe #iterval_detalhe').attr('disabled','disabled').css('background','#ebebe4');
		$('.ag_deletar').fadeIn();
		
	 }else
	 if(op == 3){
	    $('.evento_detalhe input,.evento_detalhe select').attr('disabled','disabled');
		$('.ag_cancel').fadeOut();
		$('.ag_deletar').fadeOut();
		$('.ag_save').fadeOut();
		$('.ag_edit').fadeIn();
		$('#intervaloGrupoDetalhe .childrenEvents').html('');
		$('.lineAgenda').hide();	
		$('.ag_confirmar').fadeOut();
	 }else
	 if(op == 4){
		 
		var status = $('#sit_mudanca_ag').val();
		$('.ag_confirmar').fadeOut();
		$('.ag_cancelar2').fadeOut();
		$('.ag_sugerir').fadeIn();
		$('#ag_data_mudanca').attr('disabled','disabled');
        $('#ag_hora_mudanca').attr('disabled','disabled');
        $('#ag_hora_agenda_fimDetalhe_mudanca').attr('disabled','disabled');
		if(status == "Aprovado"){

			$('.ag_aprovar').fadeOut();
			$('.ag_reprovar').fadeIn();

		}else
		if(status == "Reprovado"){

			$('.ag_aprovar').fadeIn();
			$('.ag_reprovar').fadeOut();


		}    
	}
}

let carrega_evento_detalhe = (id,tipo) => {
	//desabilita_campo_ag(1);
	desabilita_campo_ag(3);
	$('#id_evento_relacionado').val(id);
	$("#generic_id_ag").val(id);
	$('.ag_cancel2').hide();
	let situacao  = '';
	let desc_tipo = '';
	
	if(tipo == 1){
		desc_tipo = 'Mudanca';
	}else{
		desc_tipo = '';
	}
	$.ajax({
				url     :localStorage.getItem("DOMINIO")+"appweb/agenda_get.php",
				type    :'POST',
				dataType:'JSON',
				data    :{operacao:4,id_evento:id,desc_tipo:desc_tipo},
				success :function(e){
				
					if(e.sit_mudanca == 0){					
					   situacao = 'Aprovado';
					   $('.ag_aprovar').hide();
					   $('.ag_reprovar').hide();
					   $('.ag_sugerir').hide();
					   $('.ag_confirmar').fadeOut();
					   $('#sit_mudanca_ag').css('color','green');
					}else
					if(e.sit_mudanca == 1){
					   situacao = 'Reprovado';
					   $('.ag_reprovar').hide();
					   $('.ag_aprovar').hide();
					   $('.ag_sugerir').hide();
					   $('.ag_confirmar').fadeOut();
					   $('#sit_mudanca_ag').css('color','red');
						
					}else
					if(e.sit_mudanca == 2){
					   situacao = 'Solicitação de Reagendamento';
					   $('.ag_reprovar').fadeIn();
					   $('.ag_aprovar').fadeIn();
					   $('.ag_sugerir').fadeOut();
					   $('.ag_confirmar').fadeOut();
					   $('#sit_mudanca_ag').css('color','red');
						
					}else
					if(e.sit_mudanca == null){
					   situacao = 'Aguardando Aprovação';
					   $('.ag_aprovar').hide();
					   $('.ag_reprovar').hide();
					   $('.ag_sugerir').hide();
					   $('.ag_confirmar').fadeOut();
					   $('#sit_mudanca_ag').css('color','orange');
					}
					   
					   
					if(e.tipo_intervalo == 'intervalo fixo'){
					   $('#ag_intervalo_fixo_detalhe').prop('checked','true');
					   $('#intervalorFixoDetalhe').fadeIn();
					   $('#intervaloGrupoDetalhe').fadeOut();
					   $('#ag_form_mudanca').fadeOut();
					   $('.ag_btn_relacionados').fadeOut();
					}else
					if(e.tipo_intervalo == 'intervalo personalizado'){
					   $('#ag_intervalo_perso_detalhe').prop('checked','true');
					   $('#intervaloGrupoDetalhe').fadeIn();
					   $('#intervalorFixoDetalhe').fadeOut();
					   $('#ag_form_mudanca').fadeOut();
					   $('#intervaloAgendaDetalhe').fadeIn();
					   $('#ag_agendaDetalhePerso').val(e.data_inicio_evento);
					   $('#ag_hora_agendaDetalhePerso').val(e.hora_inicio);
					   $('#ag_periodo_fimDetalhePerso').val(e.hora_fim);
					   $('#agenda_dnotifica_detalhe').val(e.dia_notifi);
					   $('#iterval_detalhe').val(e.periodo_repetir);
					   $('#intervaloGrupoDetalhe #agenda_repetirDetalhe').val(e.periodo_fim);
					   $('#intervaloGrupoDetalhe #id_evento').val(e.id_evento);
					   $('#intervaloGrupoDetalhe #iterval_detalhe').attr('disabled','disabled').css('background','#ebebe4');
					   check_rpt(1,'',1,'');/* just for the field be able*/
						
					   if(e.qtd_ev_relacionado > 0){
						   $('.ag_btn_relacionados').fadeIn();
					   }
						
					}
					
					if(e.titulo == 'Mudanca'){
						$(".sit_mudanca_ag").show();
						$("#sit_mudanca_ag").val(situacao);
						$("#ag_id_movto_mudanca").val(e.id_movto_mudanca);
						$('#ag_form_mudanca').show();
						$('.check1agenda').hide();
						$('.check2agenda').hide();
						$('#ag_dia_notificar').fadeOut();
						$('#intervalorFixoDetalhe').fadeOut();
						$('#intervaloGrupoDetalhe').fadeOut();
						$('#ag_data_mudanca').val(e.data_inicio_evento);
						$('#ag_data_fimDetalhe').val(e.data_fim_evento);
						$('#ag_hora_mudanca').val(e.hora_inicio);
						$('#ag_hora_agenda_fimDetalhe_mudanca').val(e.hora_fim);
						$('#agenda_cor_detalhe').val('rgb(243, 156, 18)');
						$('.ag_edit').hide();
						$('#agenda_titulo_detalhe').val(e.titulo);
						$('#agenda_descricao_detalhe').val(e.descricao.replace('<p>','').replace('</p>',''));
						$('.ag_btn_relacionados').hide();
						
					}else{
						
						$('.check1agenda').fadeIn();
						$('.check2agenda').fadeIn();
						$('#ag_dia_notificar').fadeIn();
						$('#ag_form_mudanca').hide();
						$('#ag_agendaDetalhe').val(e.data_inicio_evento);
						$('#ag_data_fimDetalhe').val(e.data_fim_evento);
						$('#ag_hora_agendaDetalhe').val(e.hora_inicio);
						$('#ag_hora_agenda_fimDetalhe').val(e.hora_fim);
						$('#agenda_cor_detalhe').val(e.cor);
						$('#agenda_titulo_detalhe').val(e.titulo);
						$('#agenda_descricao_detalhe').val(e.descricao.replace('<p>','').replace('</p>',''));
					    $('#agenda_dnotifica_detalhe').val(e.dia_notifi);
						$('.ag_aprovar').fadeOut();
						$('.ag_reprovar').fadeOut();
						$('.ag_sugerir').fadeOut();
						$('.sit_mudanca_ag').hide();
					}
				},
				error:function(r){
					alerta("","Falha ao abrir evento.")
				}
		  });
}


let adiciona_campo = () => {
		
	 let html         = '';
	 let get_cont     = $('#agendaContador').text();
	 $('#agendaContador').text(parseInt(get_cont)+1); 
	 let tamanho      = $('#agendaContador').text();
	 let div_anterior = parseInt(tamanho)-1;
	 
     html     = '<hr class="item'+tamanho+'"><div class="row item'+tamanho+'">'
					+'<div class="col-xs-4">'

						+'<li class="item-content item-input">'
						   +'<div class="item-inner">'
							+'<div class="item-title item-label">Data Inicio:</div>'
								+'<div class="item-input-wrap">'
									+'<div id="div_dt_agendaDetalhe" name="div_dt_agendaDetalhe" >'

										+'<input id="ag_agendaPerso" onChange="habilita_sheet();verifica_data_retroativa(this);" type="date"  style="width: 113px;" />'
									+'</div>'
								+'</div>'
						  +'</div>'
					   +'</li>'
					+'</div>'
					+'<div class="col-xs-4">'
						+'<li class="item-content item-input">'
							+'<div class="item-inner">'
							+'<div class="item-title item-label">Hora Inicio:</div>'
								+'<div class="item-input-wrap">'
									+'<div id="div_hora_agendaDetalhe" name="div_hora_agendaDetalhe" >'
										+'<input id="ag_hora_agendaPerso" onChange="habilita_sheet();check_horario_agenda_personalizado(this.value,'+tamanho+',this,1)" style="width: 77px;" type="time" name="ag_hora_agenda"/>'
									+'</div>'
								+'</div>'
						  +'</div>'
					  + '</li>'
					+'</div>'
					+'<div class="col-xs-4" style="padding-left: 0px;left: -12px;">'
						+'<li class="item-content item-input">'
						   +'<div class="item-inner">'
							+'<div class="item-title item-label">Hora Fim:</div>'
								+'<div class="item-input-wrap">'
									+'<div id="div_horafim_agendaDetalhe" name="div_horafim_agendaDetalhe" >'
										+'<input id="ag_periodo_fimPerso" onChange="habilita_sheet();check_horario_agenda_personalizado(this.value,'+tamanho+',this,2)" type="time" />'
									+'</div>'
								+'</div>'
						  +'</div>'
					   +'</li>'
					+'</div>'

					+'<div class="col-xs-4"><li class="item-content item-input" id="intervaloAgendaDetalhe">'
					   +'<div class="item-inner" style="">'
					   +'<div class="item-title item-label">Repetir:</div>'
							+'<div class="item-input-wrap">'
								+'<div id="div_intervalo_agendaDetalhe" name="div_intervalo_agendaDetalhe">'
									+'<select onChange="habilita_sheet();check_rpt(value,'+tamanho+',0,this)" style="width: 130px;">'
										+'<option value="99">Selecione ...</option>'
										+'<option value="0">Evento Unico</option>'
										+'<option value="1">Diariamente</option>'
										+'<option value="2">Quinzenalmente</option>'
										+'<option value="3">Semanalmente</option>'
										+'<option value="4">Mensalmente</option>'
										+'<option value="5">Anualmente</option>'
									+'</select>'
								+'</div>'
							+'</div>'
					  +'</div>'
				   +'</li></div>'
				   +'<div class="col-xs-4"><li class="item-content item-input repetirAte-inp repetirAte'+tamanho+'" style="display:none;margin-left: 11px;">'
					   +'<div class="item-inner" style="">'
					   +'<div class="item-title item-label">até</div>'
							+'<div class="item-input-wrap">'
								+'<div id="div_repetir_agendaDetalhe" name="div_repetir_agendaDetalhe" >'
									+'<input type="date" class="noshow" data-verifica="no" id="agenda_repetirDetalhe" onChange="habilita_sheet();check_dia_repeticao(this.value,'+tamanho+',this)" style="width: 129px;" />'
								+'</div>'
							+'</div>'
					  +'</div>'
				   +'</li></div><div class="col-xs-4"><div onclick="habilita_sheet();remove_event('+tamanho+')" style="margin: 26px 0 0 51px;"><span class="fa fa-close"></span></div>'
				   +'</div><li style="display:none">'
					  +'<input type="text" class="noshow"/>'
				   +'</li>'
			  +'</div>'
          +'</div>'
	      +'<div class="col-xs-7 adicionaEvent" style="padding: 4px 0px 3px 17px;">'
			 +'<button type="button" onclick="adiciona_campo();habilita_sheet()" class="adicionaEven col button button-fill" style="background:red">'
	         +'<span class="fa fa-plus"></span> Adicionar Evento</button>'
		  +'</div>'
	
	     $('.adicionaEvent').hide();
	     $('#intervaloGrupo').append(html);
	   
}

let remove_event = (id_evento = 0, posicao) => {
	
	app2.dialog.confirm('Deseja realmente deletar o evento ?','Excluir', function () {
			
		$('.item'+posicao).remove();
		let contador = $('#agendaContador').text();
		$('#agendaContador').text(parseInt(contador)-1);
		$('.lineGroup'+posicao).remove();

		if(id_evento != 0){   
		   delete_evento(id_evento);   
		}

	});
		
}

let confirmacao_agenda = (id) => {
	
	let hidden = '';
	$.ajax({
				type:'POST',
				 url:localStorage.getItem("DOMINIO")+'appweb/agenda_get.php',
			dataType:'json',
				data:{
						id_evento:id,
						operacao:5,
					    id_condominio:$("#DADOS #ID_CONDOMINIO").val(),
					    id_usuario_condominio:$("#DADOS #ID_USER").val()
					 },
			 success:function(ret_json){
				 
				var tamanho_array = ret_json.length;
				var row_col       = "";
				var grupo         = "";

				$(".ev-confirma").html("");
				

				for(var x=0; x< tamanho_array; x++ ){
					if(ret_json[x].periodo_repetir == 'Unico'){
						hidden = 'display:none';  
				    }else{
						hidden = 'dislay:block';  
					}
					
				 
					if(grupo != ret_json[x].periodo_repetir){
						 row_col += "<tr style='background: #f6f6f6;'><td style='padding-left: 7px;'><strong>"+ret_json[x].periodo_repetir+"</strong></td></tr>";
					 }

					row_col += "<tr><td>"+ret_json[x].data_inicio_evento+"</td>";
					row_col += "<td>"+ret_json[x].hora_inicio+"</td>";
					row_col += "<td>"+ret_json[x].hora_fim+"</td>";
					row_col += "<td style="+hidden+">"+ret_json[x].periodo_fim+"</td>";
					grupo    = ret_json[x].periodo_repetir;

				}
				 
				$('.ev-confirma').html(row_col);
				 
			 }
	})
	
}

let confirma_evento = () => {
	
	let data = $('.item1 #ag_agendaPerso').val();
	let dia  = data.substr(8);
    let mes  = parseInt(data.substr(5,2))-1;
	let ano  = data.substr(0,4);
	
	$.ajax({
				type: 'POST',
				 url:localStorage.getItem("DOMINIO")+'appweb/agenda_get.php',
				data:{
						operacao:6,
						id_condominio:$("#DADOS #ID_CONDOMINIO").val(),
					    id_usuario_condominio:$("#DADOS #ID_USER").val()
					 },
			 success: function(retorno){
					event_days();
					$("#wait").css("display", "block");
					setTimeout(function(){
						alerta(1);
						$("#wait").css("display", "none");
						carrega_agenda_eventos(ano,mes,dia);
					},2000);
			 },
		     error:function(){
				   alerta('','Erro ao confirmar eventos.')
			 }
	 });
}

let cancela_evento = () => {
	
	$.ajax({
				type: 'POST',
				 url:localStorage.getItem("DOMINIO")+'appweb/agenda_get.php',
				data:{
						operacao:7,
						id_condominio:$("#DADOS #ID_CONDOMINIO").val(),
					    id_usuario_condominio:$("#DADOS #ID_USER").val()
					 },
			 success: function(retorno){

			 },
		     error:function(){
				   alerta('','Erro ao cancelar eventos.')
			 }
		});
}

let eventos_relacionados = (el) => {
	$('#intervaloGrupoDetalhe .childrenEvents').html('');
	$(el).text('Ocultar eventos');
	$('.lineAgenda').remove();
	let id_evento = $('#id_evento_relacionado').val();
	let x         = 0;
	let y         = 0;
	let html      = '';
	let op1       = '';
	let op2       = '';
	let op3       = '';
	let op4       = '';
	let op5       = '';
	let op6       = '';
	let sshow     = '';
	
	$.ajax({
				type:'POST',
				 url:localStorage.getItem("DOMINIO")+'appweb/agenda_get.php',
			dataType:'json',
				data:{
						id_evento:id_evento,
						operacao:8,
					 },
			 success:function(retorno){
				 
					for(x in retorno){
						$('.item'+x+' #div_intervalo_agendaDetalhe select option').removeAttr('selected');
					    y = parseInt(x)+2;
						if(retorno[x].periodo_repetir == 0){
						   op1 = 'selected';
						}else
						if(retorno[x].periodo_repetir == 1){
						   op2 = 'selected';
						}else
						if(retorno[x].periodo_repetir == 2){
						   op3 = 'selected';
						}else
						if(retorno[x].periodo_repetir == 3){
						   op4 = 'selected';
						}else
						if(retorno[x].periodo_repetir == 4){
						   op5 = 'selected';
						}else
						if(retorno[x].periodo_repetir == 5){
						   op6 = 'selected';
						}
						
						if(retorno[x].periodo_repetir != 99 && retorno[x].periodo_repetir != 0){
							sshow = 'display:block';	
						}else{
							sshow = 'display:none';	
						}
						
						html += '<hr class="lineAgenda lineGroup'+y+'"><div class="row item'+y+' childrenEvents">'
								+'<div class="col-xs-4">'
									+'<li class="item-content item-input">'
									   +'<div class="item-inner">'
										+'<div class="item-title item-label">Data Inicio:</div>'
											+'<div class="item-input-wrap">'
												+'<div id="div_dt_agendaDetalhe" name="div_dt_agendaDetalhe" >'
													+'<input id="ag_agendaDetalhePerso" value="'+retorno[x].data_inicio_evento+'" type="date" style="width: 113px;" disabled/>'
												+'</div>'
											+'</div>'
									  +'</div>'
								   +'</li>'
								+'</div>'
								+'<div class="col-xs-4">'
									+'<li class="item-content item-input">'
										+'<div class="item-inner">'
										+'<div class="item-title item-label">Hora Inicio:</div>'
											+'<div class="item-input-wrap">'
												+'<div id="div_hora_agendaDetalhe" name="div_hora_agendaDetalhe" >'
													+'<input id="ag_hora_agendaDetalhePerso" value="'+retorno[x].hora_inicio+'" style="width: 77px;" type="time" name="ag_hora_agenda" disabled/>'
												+'</div>'
											+'</div>'
									  +'</div>'
								  + '</li>'
								+'</div>'
								+'<div class="col-xs-4" style="padding-left: 0px;left: -12px;">'
									+'<li class="item-content item-input">'
									   +'<div class="item-inner">'
										+'<div class="item-title item-label">Hora Fim:</div>'
											+'<div class="item-input-wrap">'
												+'<div id="div_horafim_agendaDetalhe" name="div_horafim_agendaDetalhe" >'
													+'<input id="ag_periodo_fimDetalhePerso" value="'+retorno[x].hora_fim+'" type="time" disabled/>'
												+'</div>'
											+'</div>'
									  +'</div>'
								   +'</li>'
								+'</div>'

								+'<div class="col-xs-4"><li class="item-content item-input" id="intervaloAgendaDetalhe">'
								   +'<div class="item-inner" style="">'
								   +'<div class="item-title item-label">Repetir:</div>'
										+'<div class="item-input-wrap">'
											+'<div id="div_intervalo_agendaDetalhe" name="div_intervalo_agendaDetalhe">'
												+'<select onChange="check_rpt(value,'+y+',1,this)" style="width: 130px;" disabled="disabled">'
													+'<option value="99">Selecione ...</option>'
													+'<option value="0" '+op1+'>Evento Unico</option>'
													+'<option value="1" '+op2+'>Diariamente</option>'
													+'<option value="2" '+op3+'>Quinzenalmente</option>'
													+'<option value="3" '+op4+'>Semanalmente</option>'
													+'<option value="4" '+op5+'>Mensalmente</option>'
													+'<option value="5" '+op6+'>Anualmente</option>'
												+'</select>'
											+'</div>'
										+'</div>'
								  +'</div>'
							   +'</li></div>'
							   +'<div class="col-xs-4"><li class="item-content item-input repetirAte'+y+'" style="'+sshow+';margin-left: 11px;">'
								   +'<div class="item-inner" style="margin-left: 8px;">'
								   +'<div class="item-title item-label">até</div>'
										+'<div class="item-input-wrap">'
											+'<div id="div_repetir_agendaDetalhe" name="div_repetir_agendaDetalhe" >'
												+'<input type="date" id="agenda_repetirDetalhe" value="'+retorno[x].periodo_fim+'" style="width: 129px;" disabled/>'
											+'</div>'
										+'</div>'
								  +'</div>'
							   +'</li></div><div class="col-xs-4"><div onclick="remove_event('+retorno[x].id_evento+','+y+')" style="margin: 26px 0 0 51px;"><span class="fa fa-close"></span></div>'
							   +'</div><li style="display:none">'
								  +'<input type="text" value="'+retorno[x].id_evento+'" />'
							   +'</li>'
						  +'</div>'
					  +'</div>';
			 }	 
				 
			 $('#intervaloGrupoDetalhe').append(html);
		 }
	})
}



let limpa_campo_ag = () =>{
	let contador = 0;
	let x        = 0;
	
	$('#n_dia_notifica').val('');
	$('#ag_descricao').val('');
	$('#agenda_titulo').val('');
	$('#ag_cor').val(99).change();
	$('#ag_agenda').val('');
	$('#ag_data_fim').val('');
	$('#ag_hora_agenda').val('');
	$('input[name="ag_hr_fim_fixo"]').val('');
	$('input[name="intervalo"]').prop('checked',false);
	$('#intervalorFixo').hide();
	$('.adicionaEven').hide();
	$('.item1').hide();
	
	for(x=0;x<=20;x++){
	    contador = parseInt(x)+2;
		$('.item'+contador).remove()
	}
	
	verifica_dia_selecionado();

}

let check_horario_agenda = (hora,screen,indice=1) => {
	   
		let tipo_evento = '';
		if(screen == 'salvar_personalizado'){
		   tipo_evento =  $('.item'+indice+' #ag_agendaDetalhePerso').val();
		}else
		if(screen == 'salvar_fixo'){
		   tipo_evento =  $('input[name="ag_data_inicio_fixo"]').val();
		}
	
		let data_e           = tipo_evento;
		let hora_ini         = hora;
		let hora_at          = new Date();
		let dia              = data_e.substr(8);
		let mes              = data_e.substr(5,2);
		let ano              = data_e.substr(0,4);
		let data             = dia+'/'+mes+'/'+ano;
		let hora_atual       = hora_at.getHours();
		let hora_esc         = hora_ini.substr(0,2);
		let min_esc          = hora_ini.substr(3);
		let horario_esc      = hora_esc+''+min_esc; 
		let dt_atual         = new Date();
		let minu_atual       = dt_atual.getMinutes();
		let hour_atual       = dt_atual.getHours();
		let dt_esc           = new Date(format_data(0,data)+' '+hour_atual+':'+minu_atual);

		if(minu_atual<=9){
			minu_atual = '0'+minu_atual;
		}

		let horario          = hora_atual+''+minu_atual; 
		let hora_tolerancia  = parseInt(horario)-5;
		/* check actuly date with the ate chooded by user */
		if(parseInt(horario_esc) < hora_tolerancia && dt_esc <= dt_atual){
			return false;
		}else{
			return true;
		}	
}

let check_data_agenda = (data_inicio,data_fim,screen,hora_inicio,hora_fim) => {

	let hora_inicial = hora_inicio.replace(':','');
	let hora_final   = hora_fim.replace(':','');
	
	if(data_inicio == ''){   
	      alerta('','Preencha a Data Inicio');
		  return false;
	}else
	if(data_fim == ''){
          alerta('','Preencha a Data Fim');
		  return false;
    }else
	if(hora_inicio == ''){
          alerta('','Preencha a Hora Inicio');
		  return false;
    }else
	if(hora_fim == ''){
          alerta('','Preencha a Hora Fim');
		  return false;
    }else
	if(data_fim < data_inicio){
          alerta('','Data Final menor que a Data Inicial.');
		  return false;
     }else
	 if(data_fim == data_inicio && parseInt(hora_final) < parseInt(hora_inicial)){
		  alerta('','Hora Final menor que a Hora Inicial');
		  return false;
	 }else
	 if(check_horario_agenda(hora_inicio,screen) == false){
		  alerta('','Horario Inicial menor que horario atual. Max. 5 Min de tolerância');
		  return false;
	 }else{
		  return true
	 }
}

let check_campo_vazio_ag = (tipo = 0) => {
	
	if(tipo == 1){
	   if($('#ag_cor_detalhe').val() == 99){
			alerta('','Escolha uma cor')
		}else
		if($('#agenda_titulo_detalhe').val() == ''){
			alerta('','Preencha o Titulo')
		}else
		if($('#n_dia_notifica_detalhe').val() == ''){
			alerta('','Preencha os dias para notificação')
		}else{
			$('.btn_cria_evento').addClass('sheet-open');
			return true;
		}

	}else{
		
		if($('#ag_cor').val() == 99){
			alerta('','Escolha uma cor');
			return false;
		}else
		if($('#agenda_titulo').val() == ''){
			alerta('','Preencha o Titulo');
			return false;
		}
		if($('#n_dia_notifica').val() == ''){
			alerta('','Preencha os dias para notificação');
			return false;
		}else{
			return true;
		}			
	}
}


let check_horario_agenda_personalizado = (hora,indice=1,el,tipo) => {
	
	if(hora.length == 5){
		
		let dt_atual         = new Date();		
		let minu_atual       = dt_atual.getMinutes();
		let hour_atual       = dt_atual.getHours();
		let data_incicio     = $('#intervaloGrupo .item'+indice+' #ag_agendaPerso').val();
		let hora_ini_esc     = $('#intervaloGrupo .item'+indice+' #ag_hora_agendaPerso').val();
		let data_ate         = new Date(hora+' '+hour_atual+':'+minu_atual);
		let data_e           = data_incicio;
		let hora_ini         = hora;
		let hora_at          = new Date();
		let dia              = data_e.substr(8);
		let mes              = data_e.substr(5,2);
		let ano              = data_e.substr(0,4);
		let data             = dia+'/'+mes+'/'+ano;
		let hora_atual       = hora_at.getHours();
		let hora_esc         = hora_ini.substr(0,2);
		let min_esc          = hora_ini.substr(3);
		let horario_esc      = hora_esc+''+min_esc; 
		let dt_esc           = new Date(format_data(0,data)+' '+hour_atual+':'+minu_atual);
		

		if(minu_atual<=9){
			minu_atual = '0'+minu_atual;
		}

		let horario          = hora_atual+''+minu_atual; 
		let hora_tolerancia  = parseInt(horario)-5;
		
		if(tipo==1){
			/* check actuly date with the date chooded by user (init date)*/
			if(parseInt(horario_esc) < hora_tolerancia && dt_esc <= dt_atual){
				alerta('','Horario Inicial menor que horario atual. Max. 5 Min de tolerância');
				$(el).val('');
			}else{
				$(el).css('border','1px solid rgb(169, 169, 169)');	
				habilita_sheet();

			}
			
			if(data_incicio == ''){
  				alerta('','Preencha a data do evento.');
				$(el).val('');
			}	
		}else
		if(tipo==2){
		   /* check actuly date with the date chooded by user (end date)*/
			if(parseInt(horario_esc) < parseInt(hora_ini_esc.replace(':',''))){
				alerta('','Horario Final menor que Horario Inicial');
				$(el).val('');
			}else{
				$(el).css('border','1px solid rgb(169, 169, 169)');
				habilita_sheet();
			}
			
			if(data_incicio == ''){
  				alerta('','Preencha a data do evento.');
				$(el).val('');
			}
		}else
		if(tipo==3){
		   /* check actuly date with the date chooded by user (end date)*/
			if(data_ate < dt_esc){
				alerta('','Data escolhida menor que a data inicial');
				$(el).val('');
			}else{
				$(el).css('border','1px solid rgb(169, 169, 169)');	
			}
			
			if(data_incicio == ''){
  				alerta('','Preencha a data do evento.');
				$(el).val('');
			}
		}		
	}
}



let check_dia_repeticao = (data_,indice=1,el) => {
        
	if(data_.length == 10){
	    let hora        = new Date();
	    let hora_atual  = hora.getHours();
	    let minu_atual  = hora.getMinutes();
	    let dia_esc     = data_.substr(8);
		let mes_esc     = data_.substr(5,2);
		let ano_esc     = data_.substr(0,4);
		let data_esc    = dia_esc+'/'+mes_esc+'/'+ano_esc;
	    let data_ate    = new Date(format_data(0,data_esc)+' '+hora_atual+':'+minu_atual);
	
		let data_e      = $('#intervaloGrupo .item'+indice+' #ag_agendaPerso').val();
		let dia         = data_e.substr(8);
		let mes         = data_e.substr(5,2);
		let ano         = data_e.substr(0,4);
		let data        = dia+'/'+mes+'/'+ano;
		let dt_esc      = new Date(format_data(0,data)+' '+hora_atual+':'+minu_atual);

		if(data_ate < dt_esc){
			alerta('','Data escolhida menor que a data inicial');
			$(el).css('border','1px solid red');
			$(el).val('');
		}else{
			$(el).css('border','1px solid rgb(169, 169, 169)');	
			habilita_sheet();
		}
    }
}


let verifica_dia_selecionado = () => {
	
	let dia_atual   = new Date();
    let dia         = dia_atual.getDate();
    let mes         = parseInt(dia_atual.getMonth())+1;
    let year        = dia_atual.getFullYear();
    let mes_fmt     = '';
	let dia_selec   = $('#dia_selecionado_ag').val();
	let hora        = dia_atual.getHours();
	let minutos     = dia_atual.getMinutes();
	let minutos_fmt = '';
	let hora_fmt    = '';
	
    if(mes < 9){	
		mes_fmt = '0'+mes;
    }else{
		mes_fmt = mes;
    }
	
	if(minutos < 9){	
		minutos_fmt = '0'+minutos;
    }else{
		minutos_fmt = minutos;
    }
	
	if(hora < 9){	
		hora_fmt = '0'+hora;
    }else{
		hora_fmt = hora;
    }
	
	$('input[name="ag_hr_inicio_fixo"]').val(hora_fmt+":"+minutos_fmt);
	$('input[name="ag_hr_fim_fixo"]').val(hora_fmt+":"+minutos_fmt);
	$('#intervaloGrupo #ag_hora_agendaPerso').val(hora_fmt+":"+minutos_fmt);
	$('#intervaloGrupo #ag_periodo_fim').val(hora_fmt+":"+minutos_fmt);
	
	if(dia_selec == ''){
		$('#ag_agendaPerso').val(year+'-'+mes_fmt+'-'+dia);
		$('#intervalorFixo #ag_agenda').val(year+'-'+mes_fmt+'-'+dia);
		$('#intervalorFixo #ag_data_fim').val(year+'-'+mes_fmt+'-'+dia);
	}else{
		$('#ag_agendaPerso').val(dia_selec);
		$('#intervalorFixo #ag_agenda').val(dia_selec);
		$('#intervalorFixo #ag_data_fim').val(dia_selec);
	}	
}


let delete_evento = (id_evento) => {
	
	$.ajax({
				type: 'POST',
				 url:localStorage.getItem("DOMINIO")+'appweb/agenda_get.php',
				data:{
						operacao:9,
						id_condominio:$("#DADOS #ID_CONDOMINIO").val(),
					    id_evento:id_evento
					 },
			 success: function(retorno){
				  alerta('','Deletado com sucesso.')
			 },
		     error:function(){
				  alerta('','Erro ao deletar evento.')
			 }
		});
}

let ag_aprova_mudanca = () => {
	
	let id          = $("#generic_id_ag").val();
	let observacao  = 'Aprovada';
	let data        = $("#ag_data_mudanca").val();
	let hora_inicio = $("#ag_hora_mudanca").val();
	let hora_fim    = $("#ag_hora_agenda_fimDetalhe_mudanca").val();
			
	$.ajax({
		   
		   url       :localStorage.getItem('DOMINIO')+'appweb/mudanca_insert.php',
		   type      :'POST',
		   beforeSend: function() { $("#wait").css("display", "block"); },
		   complete  : function() { $("#wait").css("display", "none"); },
		   data:{
			   		operacao:10,
			        id_condominio:$('#DADOS #ID_CONDOMINIO').val(),
			        id_usuario_condominio:$('#DADOS #ID_USER').val(),
			        id_mudanca:id,
			        aprovado:0,
			        observacao:observacao,
			        data_sugerida:data,
			        hora_inicio_sugerida:hora_inicio,
			        hora_fim_sugerida:hora_fim,
			        administrador:'',
			        id_movto_mudanca:$("#ag_id_movto_mudanca").val()
			   },
		  success:function(retorno){
			  alerta("","Solicitação Aprovada.");
			  carrega_agenda_eventos();
			  $('.fechaAgenda').click();
			 
		  },
		  error:function(retorno){
			  alerta('','Erro ao aprovar.')
		  }
	  })
} 


function reprova_mudanca(){
		  
		app2.dialog.confirm('Deseja Realmente reprovar a solicitação de Mudança ?','Mudança', function () {
			  let id          = $("#generic_id_ag").val();
			  let observacao  = 'Reprovada';
		      let data        = $("#ag_data_mudanca").val();
			  let hora_inicio = $("#ag_hora_mudanca").val();
			  let hora_fim    = $("#ag_hora_agenda_fimDetalhe_mudanca").val();
			  let ano         = $('#dia_selecionado_ag').val().substr(0,4);
			  let mes         = $('#dia_selecionado_ag').val().substr(5,2);
			  let dia         = $('#dia_selecionado_ag').val().substr(8);
	
			$.ajax({
				   url:localStorage.getItem('DOMINIO')+'appweb/mudanca_insert.php',
				   type:'POST',
				   beforeSend : function() { $("#wait").css("display", "block"); },
				   complete   : function() { $("#wait").css("display", "none"); },
				   data:{
							operacao:10,
							id_condominio:$('#DADOS #ID_CONDOMINIO').val(),
							id_usuario_condominio:$('#DADOS #ID_USER').val(),
							id_mudanca:id,
							aprovado:1,
							observacao:observacao,
							data_sugerida:data,
							hora_inicio_sugerida:hora_inicio,
							hora_fim_sugerida:hora_fim,
							administrador:'',
							id_movto_mudanca:$('#id_movto_mudanca').val()
					   },
				  success:function(retorno){
					   alerta("","Solicitação Reprovada.");
					   carrega_agenda_eventos(ano,parseInt(mes)-1,dia);
					   $('.fechaAgenda').click();
				  },
				  error:function(retorno){
					  alerta("","Erro.");
				  }
			  });
        })
}

let ag_sugerir_mudanca = () =>{
	
	$('input[name="ag_data_inicio_fixo_detalhe"]').removeAttr('disabled');
	$('input[name="ag_hr_inicio_fixoDetalhe"]').removeAttr('disabled');
	$('input[name="ag_hr_fim_fixoDetalhe"]').removeAttr('disabled');
	$('.ag_aprovar').fadeOut();
	$('.ag_reprovar').fadeOut();
	$('.ag_cancel2').fadeIn();
	$('.ag_confirmar').fadeIn();
	$('.ag_sugerir').fadeOut();
	
}

let conf_reagmudanca = () => {
	
	app2.dialog.confirm('Deseja Realmente confirmar a solicitação de reagendamento ?','Mudança', function () {
		
			  let id          = $("#generic_id_ag").val();
			  let observacao  = 'Solicitação de Reagendamento';
		      let data        = $("#ag_data_mudanca").val();
			  let hora_inicio = $("#ag_hora_mudanca").val();
			  let hora_fim    = $("#ag_hora_agenda_fimDetalhe_mudanca").val();
			  let ano         = $('#dia_selecionado_ag').val().substr(0,4);
			  let mes         = $('#dia_selecionado_ag').val().substr(5,2);
			  let dia         = $('#dia_selecionado_ag').val().substr(8);
	
			$.ajax({
				   url:localStorage.getItem('DOMINIO')+'appweb/mudanca_insert.php',
				   type:'POST',
				   beforeSend : function() { $("#wait").css("display", "block"); },
				   complete   : function() { $("#wait").css("display", "none"); },
				   data:{
							operacao:10,
							id_condominio:$('#DADOS #ID_CONDOMINIO').val(),
							id_usuario_condominio:$('#DADOS #ID_USER').val(),
							id_mudanca:id,
							aprovado:2,
							observacao:observacao,
							data_sugerida:data,
							hora_inicio_sugerida:hora_inicio,
							hora_fim_sugerida:hora_fim,
							administrador:'',
							id_movto_mudanca:$('#id_movto_mudanca').val()
					   },
				  success:function(retorno){
					   alerta("","Confirmado com sucesso.");
					   carrega_agenda_eventos(ano,parseInt(mes)-1,dia);
					   $('.fechaAgenda').click();
				  },
				  error:function(retorno){
					  alerta("","Erro.");
				  }
			  });
        })
}


let deleta_evento = () => {
	
	app2.dialog.confirm('Deseja Realmente excluir o evento ?','Evento', function () {
		
	        let ano         = $('#dia_selecionado_ag').val().substr(0,4);
		    let mes         = $('#dia_selecionado_ag').val().substr(5,2);
			let dia         = $('#dia_selecionado_ag').val().substr(8);
		    let id          = $("#generic_id_ag").val();
			$.ajax({
				   url:localStorage.getItem('DOMINIO')+'appweb/agenda_get.php',
				   type:'POST',
				   beforeSend : function() { $("#wait").css("display", "block"); },
				   complete   : function() { $("#wait").css("display", "none"); },
				   data:{
							operacao:9,
							id_evento:id,
							id_usuario_condominio:$('#DADOS #ID_USER').val(),
					        id_condominio:$('#DADOS #ID_CONDOMINIO').val()
					   },
				  success:function(retorno){
					   alerta("","Evento excluido com sucesso.");
					   carrega_agenda_eventos(ano,parseInt(mes)-1,dia);
					   $('.fechaAgenda').click();
				  },
				  error:function(retorno){
					  alerta("","Erro.");
				  }
			  });
        })
}


