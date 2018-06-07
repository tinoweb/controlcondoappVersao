// FUNCAO CARREGA TODOS OS PETS
function carrega_pets(tipo){
	"use strict";	
	app.controler_pull("pets_lista");
	if(tipo === 4){
		$("#busca_pets").val("");
	}
	var pg = 0;
    if(tipo === 0 || tipo===3 || tipo===4){
        pg = 1;
    }else{
        var offset = $('.pet').length;
        if(offset !== 0){
            pg = (offset/6)+1;
        }else{
            pg = 1;
        }
    }
    if(parseInt(pg) !== parseFloat(pg)) { 
        pg = pg+1; 
    }
    var dados = '';
	var dado  = '';
	
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/pet_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&pg='+parseInt(pg)+'&id_morador='+$( "#DADOS #ID_MORADOR" ).val()+'&tipo='+tipo,
        dataType   : 'json',
		
		success: function(retorno){
            
			var cont=0;
            for (var x in retorno) {
				cont++;
   
                dado = '<div class="card_ocorrencia" onClick="carrega_pet(\''+retorno[x]['id_pet']+'\');"  >'
							+'<div class="titulo">'
								+'<label style="font-size: 15px;" >Nome: '+retorno[x]['nome']+'</label>'												
								+'<div style="float: right;" ><label style="font-size:13px;">'+localStorage.getItem('ROTULO_LOTE')+' '+retorno[x]['lote']+' / '+localStorage.getItem('ROTULO_QUADRA')+' '+retorno[x]['desc_quadra']+'</label></div>'	
							+'</div>'
							//CORPO Do card pet
			
							+'<div class="corpo">'							
								
								+'<img style="float: left; border-radius:10%; max-width:20%; max-height: 60px; margin-top:10px; margin-bottom:10px;" src="data:image/jpeg;base64,'+retorno[x]['foto']+'">'
				
								+'<span style="float: right; width: 79%">'+retorno[x]['observacao']+'</span>'
								
							+'</div>';
					
				dado = dado +'</div>';
                dados = dados + dado;
            }
			if(tipo != 1){
				$("#main_pet").html("");
			}
			if (cont == 0){
				var sem_reg = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
				+"<img  width='50%'> </div>";
				
				$("#main_pet").html(sem_reg);
			
			}
			$( "#main_pet" ).append(dados);
			afed('#pet_lista','#home','','',3,'pet_lista');	
            
            //$("pull-comunicados").scrollTop(50);
		},
        error : function() {
            alert('Erro ao carregar página');
        }
	});    
}
//Editar um pet

	//var cor_status='';
function editar_pet(){
	
	var id_pet = $("#form_pet #id_pet").val();
	var id_condominio = $("#form_pet #id_condominio").val();
	var nome = $("#form_pet #nome_pet").html();
	var especie = $("#form_pet #id_especie").val();
	var sexo = $("#form_pet #sexo").val();
	var observacao = $("#form_pet #observacao").val();
	var cor = $("#form_pet #cor").val();
	var raca = $("#form_pet #raca").val();
	var foto = $("#form_pet #foto_up").val();
	
	$("#form_pet_update #id_condominio").val(id_condominio);
	$("#form_pet_update #id_pet").val(id_pet);
	$("#form_pet_update #nome").val(nome);
	$("#form_pet_update #foto_up_pet").val(foto);
	
	$("#form_pet_update #observacao").val(observacao);
	$("#form_pet_update #cor").val(cor);
	$("#form_pet_update #raca").val(raca);
	getEspecie_editar(especie);
	$("#form_pet_update #especie_desc").val(especie);
	
	//$("#form_pet_update #pet_foto").html('<img style="border-radius:10px; max-width:50%; height:100px; margin-top:10px;" class="lazy lazy-fade-in demo-lazy" src="data:image/jpeg;base64,'+foto+'">');                
	
	$('#form_pet_update #pet_foto' ).attr("src", "data:image/jpeg;base64,"+foto+" ");
	afed('#update_pet','#pet','','',3,'update_pet');	
	
	if (sexo == '1'){		
		document.forms['form_pet_update'].sexo_desc[0].checked = true;
	}else{
		document.forms['form_pet_update'].sexo_desc[1].checked = true;
	}
	
}
// FUNCAO CARREGA UM PET ESPECIFICO
function carrega_pet(id){
	"use strict";
    if(id === 0){
        $("#form_pet #id_ocorrencia").val(id);
        $("#form_pet #id_condominio").val($( "#DADOS #ID_CONDOMINIO" ).val());
        $("#form_pet #id_solicitante").val($( "#DADOS #ID_MORADOR" ).val());
        $("#form_pet #criado_por").val(localStorage.getItem('MORADOR_NOME'));
        $("#form_pet #id_situacao").val('1');
        $("#form_pet #solicitante").val(localStorage.getItem('MORADOR_NOME'));
        $("#form_pet #situacao").val('Aberto');
    }else{
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/pet_get.php',
            crossDomain: true,
            beforeSend : function() { },
            complete   : function() { },
            data       : {id_pet : id, id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo : '1'},
            dataType   : 'json',
            success: function(retorno){
				
				if (retorno[0]['sexo'] == 1){
					var sexo = "MASCULINO";
				}else{
					var sexo = "FEMININO";
				}
				//Preenche dados do form form_pet da pagina index.html
							
                $("#form_pet #id_pet").val(retorno[0]['id_pet']);
                $("#form_pet #id_especie").val(retorno[0]['id_especie']);
                $("#form_pet #sexo").val(retorno[0]['sexo']);
                $("#form_pet #foto_up").val(retorno[0]['foto']);
                $("#form_pet #nome").val(retorno[0]['nome']);
                
				$("#form_pet #raca").val(retorno[0]['raca']);
				$("#form_pet #cor").val(retorno[0]['cor']);
				$("#form_pet #observacao").val(retorno[0]['observacao']);
				
				
                $("#form_pet #unidade").html('<label>'+localStorage.getItem('ROTULO_LOTE')+' '+retorno[0]['lote']+' / '+localStorage.getItem('ROTULO_QUADRA')+' '+retorno[0]['desc_quadra']+'</label');
	
                $("#form_pet #id_situacao").val(retorno[0]['id_situacao']);
                $("#form_pet #data_cadastro").val(retorno[0]['data_cadastro']);
		
				$("#form_pet #nome_pet").html(retorno[0]['nome']);
				$("#form_pet #foto").html('<img style="border-radius:10px; max-width:90%; height:auto; margin-top:10px;" class="lazy lazy-fade-in demo-lazy" src="data:image/jpeg;base64,'+retorno[0]['foto']+'">');
                
                $("#form_pet #desc_especie").html(retorno[0]['desc_especie']+' - ');
                $("#form_pet #lbl_raca").html(retorno[0]['raca']+' - ');
				$("#form_pet #lbl_cor").html(retorno[0]['cor']+' - ');
				$("#form_pet #lbl_sexo").html(sexo);
				
				$("#form_pet #lbl_observacao").html(retorno[0]['observacao']);
				
                afed('#pet,#bt_oco_finaliza','#pet_lista,#home,#bt_oco_salva','','#form_pet #desc_especie',3);
                
				carrega_ocorrencia_arq(id);
                localStorage.setItem('TELA_ATUAL','pet');
            },
            error      : function() {
                alert('erro ocorrencia');
            }
        });
    }
    
}

function getEspecie_editar(id_especie){
	
	var dados = '';
	var dado  = '';
	var inicio_select = '<select class="form-control" name="id_especie" id="id_especie">';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/especie_pet_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo:0 },
        dataType   : 'json',
		success: function(retorno){
            for (var x in retorno) {
				if (retorno[x]['id_pet_especie'] == id_especie){
                	var dado = '<option value="'+retorno[x]['id_pet_especie']+'" selected> '+retorno[x]['descricao']+' </option> ';
				}else{
					var dado = '<option value="'+retorno[x]['id_pet_especie']+'" > '+retorno[x]['descricao']+' </option> ';					
				}
				dados = dados + dado;				
            }			
			dados= inicio_select + dados + "</select>";
			$("#form_pet_update #div_especie" ).html(dados);
		}
	});	
}

function getEspecie_incluir(){
	
	var dados = '';
	var dado  = '';
	var inicio_select = '<select class="form-control" name="id_especie" id="id_especie">'
						 +'<option value="0"></option> 	';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/especie_pet_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo:0 },
        dataType   : 'json',
		success: function(retorno){
            for (x in retorno) {
				var dado = '<option value="'+retorno[x]['id_pet_especie']+'" > '+retorno[x]['descricao']+' </option> ';				
				
				dados = dados + dado;				
            }			
			dados= inicio_select + dados + "</select>";
			$("#form_pet_add #div_especie" ).html(dados);
		}
	});	
}
//*****************Funcao DELETAR Pet
function excluir_pet(id_pet){
	"use strict";
	var r=confirm("Tem Certeza que deseja excluir?");
	if (r===true){
	  alert("excluindo: "+id_pet);
	}else{
	  alert("ta loco porra");
	}
}

function replaceAll(str, de, para){
	"use strict";
    var pos = str.indexOf(de);
    while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
    return (str);
}

function pet_insert(){
	"use strict";
	if($( "#form_pet_add #nome" ).val() == ''){
		notifica('Erro Preenchimento/Preencha o campo Nome/Ok',1000,0);
		$("#form_pet_add #nome").focus();
	}else if($( "#form_pet_add #id_especie" ).val() == '0'){
		notifica('Erro Preenchimento/Preencha o campo Espécie/Ok',1000,0);
		$("#form_pet_add #id_especie").focus();
	}else{
		var dados = $( "#form_pet_add" ).serialize();
		$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/pet_insert.php',
            crossDomain: true,
            beforeSend : function() {  },
            complete   : function() {  },
            data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&id_unidade='+$( "#DADOS #ID_UNIDADE" ).val()+'&id_morador='+$( "#DADOS #ID_MORADOR" ).val()+'&'+dados,
			success: function(retorno){
				//alert(retorno);
                voltar('#pet_lista','#pet_add','pet_lista');
//                afed('','#anexo_oco','','','');
//                $("#form_ocorrencia_add #foto_oco").val('');
                carrega_pets(0);

			}
		});
	}
}
		
// FUNCAO CARREGA PAGINA NOVA OCORRENCIA
function carrega_pet_novo(){
	
	
    $( "#add_pet #nome" ).val('');  
	
	getEspecie_incluir();
	
    afed('#add_pet','#pet_lista','','','2','add_pet');
	
	$("#add_pet #nome").focus();
}

