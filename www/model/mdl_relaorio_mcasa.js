//FEITO POR DAVID 05/09/2019

// FUNÇÃO PARA CARREGAR A PAGINA (MINHA CASA)
function carregar_minha_casa()
{


afed('#minha_casa_rel','#home','','')
	
}
// FUNÇÃO PARA MOSTRAR TODOS OS RECORRENTES DO MORADOR É PASSADO ID DO CONDOMÍNIO E DO USUÁRIO CONDOMÍNIO  // CARREGAPAGINA DOS VISITATES RECORRENTES 
function meus_recorrentes()
<<<<<<< HEAD
	{	
			var pg = 0;
 		app.controler_pull("minha_casa_recorrente");
		var offset = $('.minha_casa_recorrente').length;
		if(offset !== 0)
		{
          pg = (offset/6)+1;			
		}else
		{
          pg = 1;
       	}
   
 
	 if(parseInt(pg) !== parseFloat(pg)) 	{ 
        pg = pg+1; 
    }	
	
		
		
		var dados = '';
=======
	{
	  var dados = '';
>>>>>>> master
		afed('#minha_casa_recorrente','#minha_casa_rel','','');
		$( "#body_recorrente" ).html('');
		
	$.ajax({
		type: 'POST',
			url		   : localStorage.getItem('DOMINIO')+"appweb/get_meus_recorrente.php",
		 	crossDomain: true,
		 	beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_morador : $( "#DADOS #ID_USER" ).val(),op:1 },
			dataType   : 'json',
		 	success: function(retorno)
<<<<<<< HEAD
			{
			 if(retorno == null )
				 {
					 var sem = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
						+"<img  width='50%'> </div>";
						$( "#body_recorrente" ).html(sem);
				 }else{
=======
			{ 
>>>>>>> master
			var autorizar = '';
			var cont = 0;
            for (x in retorno) 
			{
				cont++;	
				dados ='<div class="card sheet-open " onClick="carregar_um_recorrente('+retorno[x] ['id']+')" data-sheet=".recorrente_modal" data-toggle="modal" data-target=".bd-example-modal-lg" >'
					+'<div class="card-content card-content-padding"><label>Nome :</label> '+retorno[x] ['nome']+'<br><label> Motivo :</label> '+retorno[x]['motivo']+' </div>'
					+'<div class="card-footer"><label>Autorizar entrada de visitante : </label>'+retorno[x] ['autoriza']+'</div>'
					+'</div>';
				$( "#body_recorrente" ).append(dados);	
			}
<<<<<<< HEAD
				 }
				
	},
		 error      : function() {
            var sem = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
						+"<img  width='50%'> </div>";
						$( "#body_recorrente" ).html(sem);
        }
=======
	}
>>>>>>> master
	});
		   }

// FUNÇÃO QUE LIMPA O CAMPO CADA VEZ QUE É SOLICITADO A TELA DE FILTRO PARA BUSCA DE RECORRENTE
function busc_recorr()
{
$("#busc_nome_recorrente").val("");	
$("#motivo_recorrente_busca").val("");	
	
}


// FUNÇÃO PARA FILTRAR OS RECORRENTES DO MORADOR
function meus_recorrentes_busca()
{
	  var dados = '';
	  afed('#minha_casa_recorrente','#minha_casa_rel','','');
	  $( "#body_recorrente" ).html('');	
	  $.ajax({
		type: 'POST',
			url		   : localStorage.getItem('DOMINIO')+"appweb/get_meus_recorrente.php",
		 	crossDomain: true,
		 	beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(),
						  id_morador : $( "#DADOS #ID_USER" ).val(),
						  nome:$("#busc_nome_recorrente").val(),
						  autoriza: $("#autoriza_visitante_recorrente").val(),
						  motivo : $("#motivo_recorrente_busca").val(),
						  op:3 },
			dataType   : 'json',
		 	success: function(retorno)
<<<<<<< HEAD
			{ 	if(retorno == null )
				 {
					 var sem = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
						+"<img  width='50%'> </div>";
						$( "#body_recorrente" ).html(sem);
				 }else{
=======
			{ 
>>>>>>> master
				var autorizar = '';
				var cont = 0;
				for (x in retorno)
					{
						cont++;	

						dados ='<div class="card sheet-open " onClick="carregar_um_recorrente('+retorno[x] ['id']+')" data-sheet=".recorrente_modal" data-toggle="modal" data-target=".bd-example-modal-lg" >'
						+'<div class="card-content card-content-padding"><label>Nome :</label> '+retorno[x] ['nome']+'<br><label> Motivo :</label> '+retorno[x]['motivo']+' </div>'
						+'<div class="card-footer"><label>Autorizar entrada de visitante : </label>'+retorno[x] ['autoriza']+'</div>'
						+'</div>';
						$( "#body_recorrente" ).append(dados);	
					}
<<<<<<< HEAD
				 }
					
=======
				if(cont ==0)
					{
					  $( "#body_recorrente" ).html("<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
					  +"<img  width='50%'> </div>");	
					} 
>>>>>>> master
			}
	});
}

// FUNÇÃO QUE TRÁS OS DADOS DO RECORRETE CARREGADO AO SELECIONA-LO
function carregar_um_recorrente(recorrente)
{
	
	
	$.ajax({
		type: 'POST',
			url		   : localStorage.getItem('DOMINIO')+"appweb/get_meus_recorrente.php",
		 	crossDomain: true,
		 	beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_recorrente : recorrente, op:2 },
			dataType   : 'json',
		 	success: function(retorno)
			{ 
							 $("#nome_recorrente").val(retorno.nome);
							 $('#motivo_recorrente').val(retorno.motivo_visita);
							 $('#autorizar_recorrrent').val(retorno.autorizaVisitas);
							 $('#hora_inicio_recorrente').val(retorno.inicio_validade);
							 $('#hora_fim_recorrente').val(retorno.fim_validade);
							 $('#foto_recorrente').css( 'background-image','url( data:image/jpeg;base64,'+retorno.foto+')');
			
			}
	});

}

// CARREGAR PAGINA DOS VISITANTES PONTUAIS
function meus_pontuais()
{
	
		afed('#meus_pontuais','#minha_casa_rel','','');
	
	  var dados = '';
	
<<<<<<< HEAD
		$( "#body_mpontuais" ).html('');
=======
		$( "#body_nrecorrente" ).html('');
>>>>>>> master
		
	$.ajax({
		type: 'POST',
			url		   : localStorage.getItem('DOMINIO')+"appweb/get_meus_pontuais.php",
		 	crossDomain: true,
		 	beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_morador : $( "#DADOS #ID_USER" ).val(),op:1 },
			dataType   : 'json',
		 	success: function(retorno)
<<<<<<< HEAD
			{ if(retorno == null )
				 {
					 var sem = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
						+"<img  width='50%'> </div>";
						$( "#body_mpontuais" ).html(sem);
				 }else{
=======
			{ 
>>>>>>> master
			var autorizar = '';
			var cont = 0;
            for (x in retorno) 
			{
				cont++;	
				dados ='<div class="card sheet-open " onClick="carregar_um_visitante('+retorno[x] ['id']+')" data-sheet=".meu_visitante">'
					+'<div class="card-content card-content-padding"><label>Nome :</label> '+retorno[x] ['nome']+'<br><label> RG :</label> '+retorno[x] ['rg']+' </div>'
					+'<div class="card-footer"><label>Telefone: </label> '+retorno[x] ['tel']+'<label>Celular: </label>'+retorno[x] ['cel']+'</div>'
					+'</div>';
<<<<<<< HEAD
				$( "#body_mpontuais" ).append(dados);	
			}
				 }
=======
				$( "#body_nrecorrente" ).append(dados);	
			}
>>>>>>> master
	}
	});	
	
}
// FUNÇÃO CARREGA DADOS DE UM VISITANTE
function carregar_um_visitante(id_visitante)
{
	$.ajax({
		type: 'POST',
			url		   : localStorage.getItem('DOMINIO')+"appweb/get_meus_pontuais.php",
		 	crossDomain: true,
		 	beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_visitante : id_visitante, op:2 },
			dataType   : 'json',
		 	success: function(retorno)
			{ 
							 $("#nome_visitante_meu").val(retorno.nome);
							 $('#rg_visitante_meu').val(retorno.rg);
							 $('#cel_visitante_meu').val(retorno.cel);
							 $('#tel_visitante_meu').val(retorno.tel);
							 $('#foto_visitante_meu').css( 'background-image','url( data:image/jpeg;base64,'+retorno.foto+')');
			
			}
	});
	

	
}
//FUNÇÃO FILTRAR VISITANTE
function meus_visitantes_busca()
{
	  var dados = '';
	 // afed('#minha_casa_recorrente','#minha_casa_rel','','');
<<<<<<< HEAD
	  $( "#body_mpontuais" ).html('');	
=======
	  $( "#body_nrecorrente" ).html('');	
>>>>>>> master
	  $.ajax({
		type: 'POST',
			url		   : localStorage.getItem('DOMINIO')+"appweb/get_meus_pontuais.php",
		 	crossDomain: true,
		 	beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			data       : { 
						  id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(),
						  id_morador : $( "#DADOS #ID_USER" ).val(),
						  nome:$("#busc_nome_visitante").val(),
						  rg: $("#busca_rg_visitantes").val(),
						  op:3 },
			dataType   : 'json',
		 	success: function(retorno)
			{ 
<<<<<<< HEAD
				if(retorno == null )
				 {
					 var sem = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
						+"<img  width='50%'> </div>";
						$( "#body_mpontuais" ).html(sem);
				 }else{
=======
				
>>>>>>> master
				var cont = 0;
				for (x in retorno) 
				{
					cont++;	
					dados ='<div class="card sheet-open " onClick="carregar_um_visitante('+retorno[x] ['id']+')" data-sheet=".meu_visitante">'
						+'<div class="card-content card-content-padding"><label>Nome :</label> '+retorno[x] ['nome']+'<br><label> RG :</label> '+retorno[x] ['rg']+' </div>'
						+'<div class="card-footer"><label>Telefone: </label> '+retorno[x] ['tel']+'<label>Celular: </label>'+retorno[x] ['cel']+'</div>'
						+'</div>';
<<<<<<< HEAD
					$( "#body_mpontuais" ).append(dados);	
				}
				 }

=======
					$( "#body_nrecorrente" ).append(dados);	
				}
				if(cont ==0)
					{
					  $( "#body_nrecorrente" ).html("<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
					  +"<img  width='50%'> </div>");	
					} 
>>>>>>> master
			}
	});	
	
}
// LIMPAR FORM DE BUSCA DE VISITANTE
function limpar_busca_visitante()
{
	$("#busc_nome_visitante").val('');
	$("#busca_rg_visitantes").val('');
}

// CARREGAR PAGINA DOS ACESSOS A MINHA RESIDENCIA COM TODOS ACESSOS
function acesso_minha_casa()
{	
		afed('#acsso_minha_casa','#minha_casa_rel','','');
	
	  var dados = '';
	
		$( "#body_minha_casa" ).html('');
		
	$.ajax({
		type: 'POST',
			url		   : localStorage.getItem('DOMINIO')+"appweb/get_meus_acesso.php",
		 	crossDomain: true,
		 	beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), unidade : $( "#DADOS #ID_UNIDADE" ).val(),op:1 },
			dataType   : 'json',
		 	success: function(retorno)
			{ 
<<<<<<< HEAD
				if(retorno == null )
				 {
					 var sem = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
						+"<img  width='50%'> </div>";
						$( "#body_minha_casa" ).html(sem);
				 }else{
=======
>>>>>>> master
			var autorizar = '';
			var cont = 0;
            for (x in retorno) 
			{
				cont++;	
				dados ='<div class="card sheet-open " onClick="carregar_evento('+retorno[x] ['id']+')" data-sheet=".meu_eventos_meus">'
					+'<div class="card-content card-content-padding"><label>Nome :</label> '+retorno[x] ['nome']+'<br><label> Perfil :</label> '+retorno[x] ['perfil']+'<br> <label>Leitora:</label> '+retorno[x] ['leitora']+' </div>'
					+'<div class="card-footer"><label>Direção:</label> '+retorno[x] ['direcao']+'<label>Data:</label>'+retorno[x] ['data']+'</div>'
					+'</div>';
				$( "#body_minha_casa" ).append(dados);	
<<<<<<< HEAD
			}}
=======
			}
					if(cont ==0)
					{
					  $( "#body_nrecorrente" ).html("<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
					  +"<img  width='50%'> </div>");	
					} 
>>>>>>> master
	}
	});	
}

//FUNÇÃO CARREGAR DADOS DO EVENTO

function carregar_evento(id_evento)
{
	
		$.ajax({
		type: 'POST',
			url		   : localStorage.getItem('DOMINIO')+"appweb/get_meus_acesso.php",
		 	crossDomain: true,
		 	beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_evento : id_evento, op:2 },
			dataType   : 'json',
		 	success: function(retorno)
			{ 
							 $("#nome_evento_selct").val(retorno.nome);
							 $('#data_evento_selct').val(retorno.data);
							 $('#leitor_evento_selct').val(retorno.leitora);
							 $('#direcao_evento_selct').val(retorno.direcao);
							 $('#foto_evento_selct').css( 'background-image','url( data:image/jpeg;base64,'+retorno.foto+')');
			
			}
	});
	
	
}


// FILTRAR EVENTOS 
function filtrar_eventos_meus()
{
	 var nome = $("#nome_evento_meu").val();
	 var perfil = $("#perfil_evento_meu").val();
	 var data_inicio = $("#datai_evento_meu").val();
	 var data_fim = $("#dataf_evento_meu").val();
	
	  var dados = '';
	
		$( "#body_minha_casa" ).html('');
		
	$.ajax({
		type: 'POST',
			url		   : localStorage.getItem('DOMINIO')+"appweb/get_meus_acesso.php",
		 	crossDomain: true,
		 	beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_unidade : $( "#DADOS #ID_UNIDADE" ).val(),nome:nome,perfil:perfil,data_inicio:data_inicio,data_fim:data_fim,op:3 },
			dataType   : 'json',
		 	success: function(retorno)
<<<<<<< HEAD
			{ if(retorno == null )
				 {
					 var sem = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
						+"<img  width='50%'> </div>";
						$( "#body_minha_casa" ).html(sem);
				 }else{
=======
			{ 
>>>>>>> master
			var autorizar = ''; 
			var cont = 0;
            for (x in retorno) 
			{
				cont++;	
				dados ='<div class="card sheet-open " onClick="carregar_evento('+retorno[x] ['id']+')" data-sheet=".meu_eventos_meus">'
					+'<div class="card-content card-content-padding"><label>Nome :</label> '+retorno[x] ['nome']+'<br><label> Perfil :</label> '+retorno[x] ['perfil']+'<br> <label>Leitora:</label> '+retorno[x] ['leitora']+' </div>'
					+'<div class="card-footer"><label>Direção:</label> '+retorno[x] ['direcao']+'<label>Data:</label>'+retorno[x] ['data']+'</div>'
					+'</div>';
				$( "#body_minha_casa" ).append(dados);	
<<<<<<< HEAD
			}}
=======
			}
>>>>>>> master
	}
	});
	
}


