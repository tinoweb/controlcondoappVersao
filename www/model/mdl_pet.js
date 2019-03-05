

// FUNCAO CARREGA TODOS OS PETS CORRIGIDO POR DAVID
function carrega_pets(tipo)
{
	"use strict";	
	app.controler_pull("pet_lista");
	if(tipo === 4)
	{
	$("#busca_pets").val("");	
	}
	if(tipo === 5)
	{
	var id_unidade = $( "#DADOS #ID_UNIDADE" ).val();
	}
	var pg = 0;
    if(tipo === 0 || tipo===3 || tipo===4)
	{
        pg = 1;
    }
	else
		{
        	var offset = $('.pet').length;
			if(offset !== 0)
			{
            pg = (offset/6)+1;
			}else
			{
            pg = 1;
        	}
    	}
    if(parseInt(pg) !== parseFloat(pg)) 
	{ 
        pg = pg+1; 
    }
    var dados = '';
	var dado  = '';

	console.log("Funcao carrega_pets| tipo: "+tipo+" |condominio: "+$( "#DADOS #ID_CONDOMINIO" ).val()+"| Morador: "+$( "#DADOS #ID_MORADOR" ).val() );
	$.ajax({
		type: 'POST',
			url		   : localStorage.getItem('DOMINIO')+"appweb/pet_get.php",
		 	crossDomain: true,
		 	beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			data       : { id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_usuario_condominio : $( "#DADOS #ID_USER" ).val(), pg : parseInt(pg), busca_pet : $('#busca_pets').val(),id_unidade: id_unidade },
			dataType   : 'json',
		 	success: function(retorno)
			{ 
			var cont = 0;
            for (var x in retorno) 
				{
				cont++;
   				if(retorno[x]['foto'] == ''){
				   var foto_pet = 'img/pet_foto_perfil.png';
				}
				else
				{
				   var foto_pet = 'data:image/jpeg;base64,'+retorno[x]['foto']+'';
				} // CARREGANDO OS CARDS DOS PET
                dado = 
					'<div class="card" style="margin-top:5%;" onClick="carrega_pet(\''+retorno[x]['id_pet']+'\');"  >'
						+'<div class="feed-comunicado cabecalho_card card-header" style="background: rgb(140, 83, 83) !important;" onload="atualiza_notificacao_modulo(5,236,this)">'+retorno[x]['nome']+'<div><i class="fa fa-paw"></i></div>'						
						+'</div>'
							//BADY DO CARD
							+'<div class="topo_comunicado">'							
								+'<img class="circle_pet" style="margin-left: 1%" src="'+foto_pet+'">'
								+'</img>'
								+'<div class="chip" style="margin-left:2%"><div class="chip-media bg-color-green">'
								+'<i class="icon material-icons md-only" style="color:white">location_on</i></div><div class="chip-label"style="font-size: 13px;" style="font-size: 13px;">'+localStorage.getItem('ROTULO_LOTE')+' '+retorno[x]['lote']+' / '+localStorage.getItem('ROTULO_QUADRA')+' '+retorno[x]['desc_quadra']+'</div>'
							+'</div><div style="border-top: 1px solid #d6d6d6; height: 25px; margin-top: 2px;"></div>'
						+'</div>'	
				dado = dado +'</div>';
                dados = dados + dado;
            } 
			 
			if(tipo != 1 || tipo != 5)
			{
				$("#main_pet").html("");
			}
			if(tipo == 5)
			{
				$("#main_pet1").html("");
				$( "#main_pet1" ).append(dados);
				 $("#pull-pet1").scrollTop(25);
			}
			if (cont == 0)
			{
				var sem_reg = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
				+"<img  width='50%'> </div>";			
			}
				$( "#main_pet" ).append(dados);
				afed('#pet_lista','#home','','',3,'pet_lista');	
				$("pull-pet").scrollTop(25);
				
		}, 
        error : function() 
		{
		 var sempet = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
			+"<img  width='50%'> </div>";	
			afed('#pet_lista','#home','','',3,'pet_lista');
			$("#main_pet").html(sempet);
			$("#main_pet1").html(sempet);
			 carrega_pets(0);
        }
	}); 
	//Meu Pet
}


// TELA DE UPDATE DO PET by David 5/02/2019
function editar_pet(){
	"use strict";
	//alert('oi');
 //Abrir tela Update Pet
	afed('#update_pet','#pet','','',3,'update_pet');
	$('#form_pet_update #pet_foto').removeAttr("src");
	$('#form_pet_update #pet_foto').attr("src", "img/pet_foto_perfil.png");	
	// Pegar as informações do PET
	var foto = $("#form_pet #foto").html();
    var id_pet = $("#form_pet #id_pet").html();
   	var nome = $("#form_pet #nome_pet").html();
	var especie = $("#form_pet #desc_especie").html();
	var cor = $("#form_pet #lbl_cor").html();
	var sexo = $("#form_pet #lbl_sexo:checked").val();
	

	var raca =  $("#form_pet #lbl_raca").html();
	var id_espec =  $("#form_pet #id_espec").html();
	var observacao = $("#form_pet #lbl_observacao").html();
	
	//alert(foto);
	//Colocar as informações do Pet No form
	if(foto == '<img class="circle_pts" src="img/pet_foto_perfil.png">')
	  {
		$("#form_pet_update #pet_foto").html('<img class="circle_pts" src="img/pet_foto_perfil.png">');
	  }
	else
	  {
		var foto_pet = "data:image/jpeg;base64,"+foto.substring(52)+'';		
		$("#form_pet_update #pet_foto").html('<img class="circle_pts" src="'+foto_pet+'');			
	   }
	
	afed('#update_pet','#pet','','',3,'update_pet');
	$("#form_pet_update #id_pet").val(id_pet);
	$("#form_pet_update #nome").val(nome);
	getEspecie_editar(id_espec);
	$("#form_pet_update #especie_desc").html(id_espec);
	$("#form_pet_update #raca").val(raca);
	$("#form_pet_update #cor").val(cor);
	$("#form_pet_update #observacao").val(observacao);
	if(sexo == 1)
	{
		document.forms['form_pet_update'].sexo_desc[0].checked = true;
	}
	else
	{
		document.forms['form_pet_update'].sexo_desc[1].checked = true;
	}
	
	
	
	
	
}



// FUNCAO CARREGA UM PET ESPECIFICO BY DAVID 10/02/2019

function carrega_pet(id){
	"use strict";
    if(id === 0)
		{
			$("#form_pet #id_pet").val(id);
			$("#form_pet #id_condominio").val($( "#DADOS #ID_CONDOMINIO" ).val());
		}
	else{
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/pet_get.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : {id_pet : id, id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo : '1'},
            dataType   : 'json',
            success: function(retorno)
			{ 
				var cont=0;
				var x =0; 
				var id_unidades = $( "#DADOS #ID_UNIDADE" ).val();
					if(retorno[x]['id_unidade'] == id_unidades)
					{
						afed('#edit_exclui','','','');
						
					} 
				else{
						afed('','#edit_exclui','','');
					
					}
				
				if (retorno[x]['sexo'] == 1)
					{
						var sexo = 1;
					}
				else
					{
						var sexo = 0;
					}
				if(retorno[x]['foto'] == '')
					{
						var foto_pet = 'img/pet_foto_perfil.png';
					}
					else
					{
						var foto_pet = 'data:image/jpeg;base64,'+retorno[x]['foto']+'';
					}
				//Preenche dados do form form_pet da pagina index.html
							
               
				$("#form_pet #foto").html('<img class="circle_pts" src="'+foto_pet+'">');
                $("#form_pet #unidade").html('<label>'+localStorage.getItem('ROTULO_LOTE')+' '+retorno[x]['lote']+' / '+localStorage.getItem('ROTULO_QUADRA')+' '+retorno[x]['desc_quadra']+'</label');
                $("#form_pet #id_pet").html(retorno[x]['id_pet']);
			    $("#form_pet #nome_pet").html(retorno[x]['nome']);
                $("#form_pet #desc_especie").html(retorno[x]['especie']);
                $("#form_pet #id_espec").html(retorno[x]['id_especie']);
                $("#form_pet #lbl_raca").html(retorno[x]['raca']);
				$("#form_pet #lbl_cor").html(retorno[x]['cor']);
				$('#lb_sxx1').addClass('disabled');
				$('#lb_sxx0').addClass('disabled');
				$('#cam_pet').attr('disabled','disabled');
				$('#gal_pet').attr('disabled','disabled');
				if(retorno[x]['sexo'] == 1)
	{
		document.forms['form_pet'].lbl_sexo[0].checked = true;
	}
	else
	{
		document.forms['form_pet'].lbl_sexo[1].checked = true;
	}
				
				
				$("#form_pet #lbl_observacao").html(retorno[x]['observacao']);
				
                afed('#pet,#bt_oco_finaliza','#pet_lista,#home,#bt_oco_salva','','#form_pet #lbl_observacao',3);
                localStorage.setItem('TELA_ATUAL','pet');
				
           },
            error: function() 
			{
				var sempet = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
				+"<img  width='50%'> </div>";
				$("#pet").html(sempet); 
            }
        });
    }
}

function getEspecie_editar(id_espec){
	//alert(id_espec +'id');
	var dados = '';
	var dado  = '';
	var inicio_select = '<select class="item-input-wrap" style="width: 100%;height: 34px;border: 0.5px solid #a4a4a4; padding: 7px;background:white;" name="id_espec" id="id_espec">';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/especie_pet_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo:0 },
        dataType   : 'json',
		success: function(retorno)
		{
            for (var x in retorno) 
			{
				var espc = retorno[x]['id_pet_especie'];
				//alert(espc);
				if (retorno[x]['id_pet_especie'] == id_espec){
                	var dado = '<option value="'+retorno[x]['id_pet_especie']+'" selected> '+retorno[x]['descricao']+' </option> ';
					//alert(dado);
				}else{
					var dado = '<option value="'+retorno[x]['id_pet_especie']+'" > '+retorno[x]['descricao']+' </option> ';
					//alert('erro sem id especie');
				}
				dados = dados + dado;				
            }			
			dados= inicio_select + dados + "</select>";
			$("#form_pet_update #div_especie" ).html(dados);
		}
	});	
}


// Editar o pet no bd David 12/02/2019
function edit_pet()
{	// Pegando as informações do Form 
	var foto_up_pet = $("#form_pet_update #foto_up_pet").val();
	//alert(foto_up_pet);
	var id_pet = $("#form_pet #id_pet").html();
	var nome_pet = $("#form_pet_update #nome").val();
	var id_especie = $("#form_pet_update #id_espec").val();	
	var raca_pet = $("#form_pet_update #raca").val();
	var cor_pet = $("#form_pet_update #cor").val();
	var sexo_pet = $("#form_pet_update #sexo_desc:checked").val();
	var observacao = $("#form_pet_update #observacao").val();
	// Enviando as informações por POST para pet_update
	$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/pet_update.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       :{id_pet : id_pet, nome: nome_pet,id_especie: id_especie, cor: cor_pet, sexo: sexo_pet, id_unidade: $( "#DADOS #ID_UNIDADE" ).val(), id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(),  raca: raca_pet,  observacao: observacao, foto_up_pet: foto_up_pet},
			success: function(retorno)
			 {
                voltar('#pet_lista','#pet_add','pet_lista');
				 $("#meus_pets").click();
                carrega_pets(0);
			 }
		  })
}

//*****************EXCLUIR PET BY DAVID 13/02/2019
function excluir_pet(){
	"use strict";
	//Pegando informações do pet
	var id_pet = $("#form_pet #id_pet").html();
	var id_con = $( "#DADOS #ID_CONDOMINIO" ).val();
	var del = confirm("Tem Certeza que deseja excluir?");
	if (del ===true)
	{
	 
	$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/pet_delete.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       :{id_pet : id_pet,id_condominio : id_con},
			success: function(retorno)
			{    setTimeout(carrega_pets(0),300);          
				alert("Pet excluido com sucesso !"); 
				afed('#pet_lista','','');
				afed('','#pet_add','','#pet_lista');
				afed('','#pet','','');
				afed('','#update_pet','','');
				
				
				
				//$("#pet_lista #meus_pets").click();
			}
		 })	
	}else{
	  
	}
}
 
// CADASTRAR NOVO PET BY DAVID 13/02/2019
function pet_insert(){
	"use strict";
	
	var foto_up_pet = $("#form_pet_add #foto_up_pet").val();
	
	//alert(foto_up_pet);
	//alert('aqui');
	var nome_pet = $("#form_pet_add #nome").val();
	//alert(nome_pet);
	var especie_pet = $( "#form_pet_add #id_especie" ).val();
	//alert(especie_pet);
	var raca_pet = $( "#form_pet_add #raca" ).val();
	//alert(raca_pet);
	var cor_pet = $( "#form_pet_add #cor" ).val();
	//alert(cor_pet);
	var sexo = $( "#form_pet_add #sexo:checked" ).val();
	//alert(sexo);
	var observacao = $( "#form_pet_add #observacao" ).val();
	//alert(observacao);
	//
	if(nome_pet == ''){
		notifica('Erro Preenchimento/Preencha o campo Nome',1000,0);
		$("#form_pet_add #nome").focus();
	}else if(especie_pet == '0'){
		notifica('Erro Preenchimento/Preencha o campo Espécie',1000,0);
		$("#form_pet_add #id_especie").focus();
	}else if(raca_pet == ''){
		notifica('Erro Preenchimento/Preencha o campo Raça',1000,0);
		$("#form_pet_add #raca").focus();
	}else if(cor_pet == ''){
		notifica('Erro Preenchimento/Preencha o campo Cor',1000,0);
		$("#form_pet_add #cor").focus();
	}else if($("#form_pet_add #sexo").is(":checked") == false)
     {
		 notifica('Erro Preenchimento/Preencha o Sexo',1000,0);
	 }
	else{
		var dados = $( "#form_pet_add" ).serialize();
		$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/pet_insert.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
			//data: dados,
           data       :{nome: nome_pet,id_especie: especie_pet, cor: cor_pet, sexo: sexo, id_unidade: $( "#DADOS #ID_UNIDADE" ).val(), id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(),  raca: raca_pet,  observacao: observacao, foto_up_pet: foto_up_pet},
			success: function(retorno)
			{
				
                voltar('#pet_lista','#pet_add','pet_lista');           
                carrega_pets(0);
				$("#todos_pets").click();
				  afed('','#add_pet','','');
			}
		});
		
	}
}
// TRAZER AS ESPECIES .. 
function getEspecie_incluir(){
	
	var dados = '';
	var dado  = '';
	var inicio_select = '<select class="item-input-wrap" style="width: 100%;height: 34px;border: 0.5px solid #a4a4a4; padding: 7px;background:white;" name="id_especie" id="id_especie">'
						 +'<option value="0"></option> 	';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/especie_pet_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo:0 },
        dataType   : 'json',
		success: function(retorno){
            for (x in retorno) {
				var dado = '<option value="'+retorno[x]['id_pet_especie']+'" > '+retorno[x]['descricao']+' </option> ';				
				
				dados = dados + dado;				
            }			
			dados= inicio_select + dados + "</select>";
			$("#form_pet_add #div_especie" ).html(dados);
			$("#busca_dpet #pets_especie_busca").html(dados);
		}
	});	
}
// FUNÇÃO PARA BUSCA DE UM PET BY DAVID
function get_filtro_pet()
{  	"use strict";	

	app.controler_pull("pets_lista");
	var dado = "";
	var dados ="";
	
	// PEGAR DADOS DO FORM PARA BUSCA
	var busca_nome = $("#busca_dpet #pets_nome_busca").val();
 	var buscar_por_nome = busca_nome.toUpperCase();
 	var busca_raca = $("#busca_dpet #pets_raca_busca").val();
 	var buscar_por_raca = busca_raca.toUpperCase();
// alert(buscar_por_raca);
	var busca_cor = $("#busca_dpet #pets_cor_busca").val();
 	var buscar_por_cor = busca_cor.toUpperCase();
	var busca_especie = $("#busca_dpet #pets_especie_busca").val();
	
 	//MANDAR VIA POST
		$.ajax({
			type: 'POST',
            url:  localStorage.getItem('DOMINIO')+"appweb/pet_filtro.php",
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       :{id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(),nome: buscar_por_nome, cor: buscar_por_cor, id_especie: busca_especie,raca: buscar_por_raca},
			dataType   : 'json',
			success: function(retorno){  
				afed('#pet_lista','#home','','',3,'');
			//CARREGAR OS DADOS NA TELA DO PET
			var cont = 0;
            for (var x in retorno) {
				cont++;
   				if(retorno[x]['foto'] == ''){
				   var foto_pet = 'img/pet_foto_perfil.png';
				}else{
				   var foto_pet = 'data:image/jpeg;base64,'+retorno[x]['foto']+'';
				} // CARREGANDO OS CARDS DOS PET
                dado = 
					'<div class="card" style="margin-top:5%;" onClick="carrega_pet(\''+retorno[x]['id_pet']+'\');"  >'
						+'<div class="feed-comunicado cabecalho_card card-header" style="background: rgb(140, 83, 83) !important;" onload="atualiza_notificacao_modulo(5,236,this)">'+retorno[x]['nome']+'<div><i class="fa fa-paw"></i></div>'						
						+'</div>'
							//BADY DO CARD
							+'<div class="topo_comunicado">'							
								+'<img class="circle_pet" style="margin-left: 1%" src="'+foto_pet+'">'
								+'</img>'
								+'<div class="chip" style="margin-left:2%"><div class="chip-media bg-color-green">'
								+'<i class="icon material-icons md-only" style="color:white">location_on</i></div><div class="chip-label"style="font-size: 13px;" style="font-size: 13px;">'+localStorage.getItem('ROTULO_LOTE')+' '+retorno[x]['lote']+' / '+localStorage.getItem('ROTULO_QUADRA')+' '+retorno[x]['desc_quadra']+'</div>'
							+'</div><div style="border-top: 1px solid #d6d6d6; height: 25px; margin-top: 2px;"></div>'
						+'</div>'
				dado = dado +'</div>';
                dados = dados + dado;
            } 
				$("#main_pet").html("");
				$( "#main_pet" ).append(dados);
				$("#main_pet1").html("");
				$( "#main_pet1" ).append(dados);
				 $("#pull-pet").scrollTop(50);
			
			if (cont == 0)
			{
				var sem_reg = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
				+"<img  width='50%'> </div>";			
			}
			},
		  error : function() 
			{
          
			var sempet = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
				+"<img  width='50%'> </div>";
			
		
				$("#main_pet").html(sempet);
				$("#main_pet1").html(sempet);
			 //setTimeout(carrega_pets(0),300);
			}	
			
			
		  });
}

// FUNCAO CARREGA PAGINA CADASTRO DE PET BY DAVID 12/02/2019
function carrega_pet_novo()
{	
	
	$('#form_pet_add #pet_foto').removeAttr("src");
	$('#form_pet_add #pet_foto').attr("src", "img/pet_foto_perfil.png");
	$("#form_pet_add #nome").val('');
	$( "#form_pet_add #id_especie" ).val('');
	$( "#form_pet_add #raca" ).val('');
	$( "#form_pet_add #cor" ).val('');
	$( "#form_pet_add #sexo:checked" ).val('');
	$( "#form_pet_add #observacao" ).val('');
	
    //$( "#add_pet #nome" ).val('');
	getEspecie_incluir();
 	//$("#add_pet").html("");
    afed('#add_pet','#pet_lista','','','2','add_pet');
	$("#add_pet #nome").focus();
}


	
