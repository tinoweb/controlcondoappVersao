// JavaScript Document

// FUNCAO CARREGA TODOS OS COMUNICADOS
function carrega_ocorrencias(tipo){
	"use strict";
	
	app.controler_pull("ocorrencias");
	if(tipo === 4){
		$("#busca_ocorrencia").val("");
	}
	var pg = 0;
    if(tipo === 0 || tipo===3 || tipo===4){
        pg = 1;
    }else{
        var offset = $('.ocorrencia').length;
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
	var cor_status='yellow';
    //alert($("#busca_ocorrencias").val());
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/ocorrencia_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&pg='+parseInt(pg)+'&titulo='+$("#busca_ocorrencias").val()+'&id_morador='+$( "#DADOS #ID_MORADOR" ).val()+'&tipo='+tipo,
        dataType   : 'json',
		
		success: function(retorno){
            
			var cont=0;
            for (x in retorno) {
				cont++;
                cor_status = retorno[x]['id_situacao'];
				if(cor_status == 1){
					cor_status = '#696969';
				}else if(cor_status=='10'){
					cor_status='green';
				}else{
					cor_status='yellow;'
				}
                dado = '<div class="card_ocorrencia" onClick="carrega_ocorrencia(\''+retorno[x]['id_ocorrencia']+'\');"  >'
							+'<div class="titulo">'
								+'<label style="font-size: 15px;" >Ocorrência nº '+retorno[x]['id_ocorrencia']+'</label>'
												
								+'<div style="float: right;" ><i class="fa fa-circle" style="color:'+cor_status+'"></i>&nbsp;<label style="font-size:13px;">'+retorno[x]['situacao_descricao']+'</label></div>'	
							+'</div>'
			/*
			*CORPO Do card ocorrencia na listagem
			*/
							+'<div class="corpo">'
								
								
								+'<div class="data_o_criacao"><h6>Data de Criação: '+retorno[x]['data_criacao']+'</h6></div>'	
								+'<div class="titulo_descricao">'
									//+'<p style="0 0 0px"> Descrição</p>' //Tag <p> traz icone com o balao antes do conteudo do paragrafo
								+'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKASURBVDhP1ZTbThNRFIbnUl/AeKGP4DOZGBMPYJQECSAIV8RoEaEUiEJbKQxMW1qkrQUplul0epgypSfKwUgoYGkpDfHKRKO/e0+2FVKQGuKFK/mzDjP7mzV77Rnu/7Knd02XexrMt3ob+Qe1St9mbdE3C400NpC4r3m8/tnt0UsMyXF9Tbxrxpn66nalUYtmvVn43q3C485gbjaLBd8avO7Md/1DfoYhOa6/1SoH1D2cJSVdxFK2RHQAKV5AJL2P+HoZykoJ0nIBhke2EEPWDk1ulJH6UD4RSB808NgeYcjaoOHU/qkd0jrNBzunYgxZDfWHtjG/+LEif3ALwfA2fOImxHAO6toBAiT3R3YqQKqhjqk4Q1ZDHYIK/qWoaXI4AKtRqsR2cxBSdAcTJPdMJypADdrpTDBkNfS9nKvqcFHeQkjZJh3mtFxJFY8BFdLxHwfltKlVHdpMQQgjJH8lavWAvKnB6OAoMKAWQDkMeRyaXC/VNBSqjdwhdoufIS8XtbWnQiOp08/hUSBVLEv8aklbdyLUTzZfJqCQmodEXiUY20U0VUA0U4Sf7OtSpgQluYdoIq9NX1Y/QVTy2jU6gxOhNj4Ch2MJIzoPPL4sRvvnwY+ImHYlYXzuhdubxviwCMvgAjzzKxjWvcWUk5wSswTTizl4xQ30tx2FtlkVizmAMQvRKPUSLNSz+KifEMKwexOwe5Yxzocq91FPfiy/v6gn9yxXepvGGvtahNazpG8RspOOmAY2tNu+/KrT9ZTDkH9nujvGqwMd9oLNFcdQ1/S3juumC+zS+ay7znjN0G7ND3W9+dFz//UNVj6/dTcIF3V1xpvd9cZ6VvqXxnE/ATLUlbEEZFlVAAAAAElFTkSuQmCC"> Descrição' //Tag <p> traz icone com o balao antes do conteudo do paragrafo
				
								+'</div>'
								+'<div class="descricao_card_ocorrencia" >'+retorno[x]['descricao']+'</div>'
								+'<div class="feed_home">'
										+'<img width="15" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFUSURBVEhLzZO9SsRAEIDzCFYK9qIWIuIjiKAPoCIIgTN/rT+NYGfjT2FpaSN21naCvZWNlnIqCBY+gn5zzsgJyWVyG8EPhuzM7s53u8lF/5Isy9bSNH3n+VkTb8SCbvPDpg0EL3mez2qpEtausPZWUx8m4DmlpV9QX2J+jx8wITnjGeK+N+mhTpAkySrzD8Qha16LohhtJBEB8VwlEGh2xnyh42tOs+iWeAQCzZZZ80ScM+7GcTzikngFBlc2zwk2YUzyWokJuNtJLTVmoKQNgVApEQET3VCBQI85+t1p+k2bAoFeB8SlplHEC1tvWbBLPHY6nXEt9U7xwVcxrWkQpQKB4g1xrOnQ0GOnVCDIn0deEnGkpcYMFBghIpfAMBEb3FfH+m23wGgiGkpgeERBAqPvHZ1o6QeabwULjDJRqwKj7+pOee63LjBUdIHg6k8E4UTRF4p0/Md1ny5VAAAAAElFTkSuQmCC"></img>'
										+'<span style="font-size: 10px;color: #7f8c8d">&nbsp;'+retorno[x]['q_ticket']+' </span>'
								+'</div>'
							+'</div>';
					
				dado = dado +'</div>';
                dados = dados + dado;
            }
			if(tipo != 1){
				$("#main_ocorrencia").html("");
			}
			if (cont == 0){
				var sem_reg = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4></div>";
				$("#main_comunicado").html(sem_reg);
			}
			$( "#main_ocorrencia" ).append(dados);
			afed('#ocorrencias','#home','','',3,'ocorrencias');	
            
            //$("pull-comunicados").scrollTop(50);
		},
        error      : function() {
            alert('Erro Ocorrencia');
        }
	});    
}

// FUNCAO CARREGA UMA OCORRENCIA ESPECIFICO
function carrega_ocorrencia(id){
	//var cor_status='';
    if(id === 0){
        $("#form_ocorrencia #id_ocorrencia").val(id);
        $("#form_ocorrencia #id_condominio").val($( "#DADOS #ID_CONDOMINIO" ).val());
        $("#form_ocorrencia #id_solicitante").val($( "#DADOS #ID_MORADOR" ).val());
        $("#form_ocorrencia #criado_por").val(localStorage.getItem('MORADOR_NOME'));
        $("#form_ocorrencia #id_situacao").val('1');
        $("#form_ocorrencia #solicitante").val(localStorage.getItem('MORADOR_NOME'));
        $("#form_ocorrencia #situacao").val('Aberto');
    }else{
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/ocorrencia_get.php',
            crossDomain: true,
            beforeSend : function() { },
            complete   : function() { },
            data       : {id_ocorrencia : id, id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo : '1'},
            dataType   : 'json',
            success: function(retorno){
				var cor_status='';
				cor_status=retorno[0]['id_situacao'];
				
				if(cor_status == '1'){
					cor_status = '#696969';
				}else if(cor_status=='10'){
					cor_status='green';
				}else{
					cor_status='yellow';
				}
				
				//Preenche dados do form form_ocorrencia da pagina index.html
                $("#form_ocorrencia #id_ocorrencia").val(retorno[0]['id_ocorrencia']);
                
                $("#form_ocorrencia #id_condominio").val(retorno[0]['id_condominio']);
                $("#form_ocorrencia #id_solicitante").val(retorno[0]['id_solicitante']);
                $("#form_ocorrencia #criado_por").val(retorno[0]['criado_por']);
                $("#form_ocorrencia #id_situacao").val(retorno[0]['id_situacao']);
				
				//$("#form_ocorrencia #statusbar").css('background-color', cor_status);
                
				$("#form_ocorrencia #solicitante").html(retorno[0]['nome']);
                
                $("#form_ocorrencia #descricao").val(retorno[0]['descricao']);
				
				$("#form_ocorrencia #titulo_ocorrencia").html("Ocorrencia <span style='background-color:#a1cf77;color: #fff;border: 3px solid #a1cf77; border-radius: 20%;'>"+retorno[0]['id_ocorrencia']+"</span>");
                
				
				$("#form_ocorrencia #icone_ocorrencia").css('color', cor_status);
				$("#form_ocorrencia #situacao").html(" "+retorno[0]['situacao_descricao']);
				$("#form_ocorrencia #data_criacao").html(retorno[0]['data_criacao']);
				
                afed('#ocorrencia,#bt_oco_finaliza','#ocorrencias,#home,#bt_oco_salva','','#form_ocorrencia #descricao',3);
                if(retorno[0]['id_situacao'] == 10){
                    afed('','#bt_oco_finaliza','','',3);
                }
				carrega_ocorrencia_arq(id);
                localStorage.setItem('TELA_ATUAL','ocorrencia');
            },
            error      : function() {
                alert('erro ocorrencia');
            }
        });
    }
    
}

function finaliza_ocorrencia(){
    navigator.notification.confirm(
        'Deseja realmente Finalizar essa ocorrencia',  // message
        finaliza_ocorrencia2,              // callback to invoke with index of button pressed
        'Finalizar',            // title
        'Sim,Não'          // buttonLabels
    );    
}

function finaliza_ocorrencia2(res){
    if(res==1){
        var dados = $( "#form_ocorrencia" ).serialize();
 		$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/ocorrencia_update.php',
            crossDomain: true,
            beforeSend : function() {  },
            complete   : function() {  },
            data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&id_solicitante='+$( "#DADOS #ID_MORADOR" ).val()+'&'+dados,
			success: function(retorno){
                voltar('#ocorrencias','#ocorrencia','ocorrencias');
                carrega_ocorrencias(0);
//                $('#form_ocorrencia_add #descricao').val('');
//                $('#form_ocorrencia_add #foto_oco').val('');
			}
		});
   }else{
        
    }
}

//Buscar anexo de ocorrencia 


// FUNCAO CARREGA UM ANEXO
function carrega_ocorrencia_arq(id){
	
    var dados = '';
    var dado  = '';
	var ext;
	var num;
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/ocorrencia_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : {id_ocorrencia : id, tipo : '2', id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val()},
        dataType   : 'json',
		success: function(retorno){
            for (x in retorno) {
				num  = parseInt(x);
				num += 1;
				ext = replaceAll(retorno[x]['arquivo'], "\/","_");
				
				 
              	//  dado = '<button class="col button button-small button-fill color-gray" style="top: 18px; margin-top:10px">teste</button>';
				//<input type="hidden" id="num_anexo_"+num >
                //dado = '<button type="button" class="btn btn-default; border-radius: 30;" onClick=download_arq_ocorrencia("'+ext+'"); >'
				//			+' <span class="glyphicon glyphicon-paperclip"></span>  Anexo ' +num+  '  </button><p></p>';
				
				dado = '<div onClick=download_arq_ocorrencia("'+ext+'"); > <img src="img/anexo_ocorrencia.png" width="30" height="30" alt=""/> Anexo ' +num+  ' 	<p></p> </div> ' ; 
                //alert(retorno[x]['caminho']);
                dados = dados + dado;
            }
           
			$("#ocorrencia_anexo_retorno").html(dados);
		},
        error : function() {
			alert('Erro ao carregar arquivos');
            

        }
	});	
}

function replaceAll(str, de, para){
    var pos = str.indexOf(de);
    while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
    return (str);
}

function download_arq_ocorrencia(arquivo) {
    //salert(path); /controlcondo/docs/26/ocorrencia/f90553d3a2d733013c29b379b7667b3d.jpg
	
    arquivo      = replaceAll(arquivo,"..","");

	arquivo      = replaceAll(arquivo,"_","\/");


    var path     = localStorage.getItem('DOMINIO')+arquivo;
	var extencao = arquivo.split(".");
	var ext      = extencao[1];
    //alert(path);
    console.log(cordova.file.externalRootDirectory);

	statusDom    = document.querySelector('#status');
	$('#downloadProgress').css({"display":"block"});
  	app2.progressbar.set('#status', "0");
	
    var fileTransfer = new FileTransfer();
    //var uri = encodeURI("http://portal.mec.gov.br/seb/arquivos/pdf/Profa/apres.pdf");
    var uri = encodeURI(path);
	
    var filePath = cordova.file.externalRootDirectory+'Download/'+arquivo;
	fileTransfer.onprogress = function(progressEvent) {
		if (progressEvent.lengthComputable) {
			var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
			statusDom.innerHTML = perc + "%...";
			app2.progressbar.set('#status', perc);
		}
	};
    //var filePath = cordova.file.applicationStorageDirectory+'Download/'+arquivo;
    fileTransfer.download(
        uri,
        filePath,
        function(entry) {
            console.log("download complete: " + entry.fullPath);
			$('#downloadProgress').css({"display":"none"});
            //notifica('Download/Download Concluído90 /ok',0,0);
			var path = entry.toURL(); //**THIS IS WHAT I NEED**
			//alert(path);
			var ref = cordova.InAppBrowser.open(path, '_system', 'location=yes');
			//alert(JSON.stringify(ref, null, 4));
            //window.open(path, "_system");

        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            //console.log("upload error code" + error.code);
        },
        false,
        {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );
	
}



// FUNCAO CARREGA PAGINA NOVA OCORRENCIA
function ocorrencia_novo(){

    $( "#add_ocorrencia #nome" ).val('');    

    
    afed('#add_ocorrencia','#ocorrencias','','','2','add_ocorrencia');


	$("#add_ocorrencia #nome").focus();
}

// FUNCAO CARREGA PAGINA NOVA OCORRENCIA
function ticket_novo(){

    $("#add_ticket #descricao" ).val('');  
	
	$("#form_ticket_add #id_ocorrencia").val($("#form_ocorrencia #id_ocorrencia").val());
	$("#form_ticket_add #id_condominio").val($("#form_ocorrencia #id_condominio").val());
    
    afed('#add_ticket','#ocorrencias_ticket','','','2','add_ticket');


	$("#add_ticket #descricao").focus();
}

function ticket_insert(){
	if($( "#form_ticket_add #descricao" ).val() == ''){
		notifica('Preencha o campo/Preencha o campo Descrição/Ok',1000,0);
	}else{
		
		var dados = $( "#form_ticket_add" ).serialize();
		$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/ticket_insert.php',
            crossDomain: true,
            beforeSend : function() {  },
            complete   : function() {  },
            data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&id_solicitante='+$( "#DADOS #ID_MORADOR" ).val()+'&criado_por='+localStorage.getItem('MORADOR_NOME')+'&'+dados,
			success: function(retorno){
				//alert(retorno);
                voltar('#ocorrencias_ticket','#ticket_add','ocorrencias_ticket');
                carrega_tickets(0);
                $('#form_ticket_add #descricao').val('');                
			}
		});
	}
}

function ocorrencia_insert(){
	if($( "#form_ocorrencia_add #descricao" ).val() == ''){
		notifica('Preencha o campo/Preencha o campo Descrição/Ok',1000,0);
	}else{
		var dados = $( "#form_ocorrencia_add" ).serialize();
		$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/ocorrencia_insert.php',
            crossDomain: true,
            beforeSend : function() {  },
            complete   : function() {  },
            data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&id_solicitante='+$( "#DADOS #ID_MORADOR" ).val()+'&criado_por='+localStorage.getItem('MORADOR_NOME')+'&'+dados,
			success: function(retorno){
				//alert(retorno);
                voltar('#ocorrencias','#ocorrencia_add','ocorrencias');
                afed('','#anexo_oco','','','');
                $("#form_ocorrencia_add #foto_oco").val('');
                carrega_ocorrencias(0);
                $('#form_ocorrencia_add #descricao').val('');
                $('#form_ocorrencia_add #foto_oco').val('');
			}
		});
	}
}

// FUNCAO CARREGA TODOS OS TICKETS
function carrega_tickets(tipo){
    //alert('tickets');
    afed('','#add_ocorrencia','','','');
    var id_ocorrencia = $("#form_ocorrencia #id_ocorrencia").val();
	"use strict";
	app.controler_pull("tickets");
	var pg = 0;
    if(tipo === 0){
        pg = 1;
    }else{
        var offset = $('.ocorrencia').length;
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
	var cor_status='yellow';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/ticket_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&pg='+parseInt(pg)+'&id_ocorrencia='+id_ocorrencia+'&tipo='+tipo,
        dataType   : 'json',
		success: function(retorno){
            //alert(retorno);
            for (x in retorno) {
              
                cor_status = retorno[x]['id_situacao'];
				if(cor_status == 1){
					cor_status = 'green';
				}else if(cor_status=='10'){
					cor_status='red';
				}else{
					cor_status='yellow;'
				}
				
                dado = '<div class="card_ocorrencia" onClick="carrega_ticket(\''+retorno[x]['id_ocorrencia_ticket']+'\',\''+retorno[x]['id_ocorrencia']+'\');">'
						+'<div style="float:left">'
						+'<img width="15" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFUSURBVEhLzZO9SsRAEIDzCFYK9qIWIuIjiKAPoCIIgTN/rT+NYGfjT2FpaSN21naCvZWNlnIqCBY+gn5zzsgJyWVyG8EPhuzM7s53u8lF/5Isy9bSNH3n+VkTb8SCbvPDpg0EL3mez2qpEtausPZWUx8m4DmlpV9QX2J+jx8wITnjGeK+N+mhTpAkySrzD8Qha16LohhtJBEB8VwlEGh2xnyh42tOs+iWeAQCzZZZ80ScM+7GcTzikngFBlc2zwk2YUzyWokJuNtJLTVmoKQNgVApEQET3VCBQI85+t1p+k2bAoFeB8SlplHEC1tvWbBLPHY6nXEt9U7xwVcxrWkQpQKB4g1xrOnQ0GOnVCDIn0deEnGkpcYMFBghIpfAMBEb3FfH+m23wGgiGkpgeERBAqPvHZ1o6QeabwULjDJRqwKj7+pOee63LjBUdIHg6k8E4UTRF4p0/Md1ny5VAAAAAElFTkSuQmCC"></img> Ticket '+retorno[x]['id_ocorrencia_ticket']
						+'</div>'
						+'<div style="float: right">'
						+'<i class="fa fa-circle" style="color:'+cor_status+'"></i> <label style="font-weight: normal;">'+retorno[x]['situacao_descricao']+'</label>'
						+'</div><br>'
						+'<div class="data_o_criacao"><h6>Data de Criação: '+retorno[x]['data_criacao']+'</h6></div>'	
						
						+'<label style="font-weight: normal;">Descrição</label><br>'		
						+'<div class="descricao_card_ocorrencia" >'+retorno[x]['descricao']+'</div>'
						
						
								
				dado = dado +'</div>';
                dados = dados + dado;
            }
			if(tipo != 1){
				$("#main_ticket").html("");
			}
			$( "#main_ticket" ).append(dados);
			afed('#ocorrencias_ticket','#ocorrencia','','',3,'tickets');	
            
            //$("pull-comunicados").scrollTop(50);
		},
        error      : function() {
            alert('Erro tickets');
        }
	});    
}

function carrega_ticket(id,id_ocorrencia){
    if(id === 0){
        $("#form_ticket #id_ocorrencia_ticket").val(id);
        $("#form_ticket #id_ocorrencia").val(id_ocorrencia);
        $("#form_ticket #id_condominio").val($( "#DADOS #ID_CONDOMINIO" ).val());
        $("#form_ticket #id_situacao").val('1');
        $("#form_ticket #situacao").val('Aberto');
    }else{
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/ticket_get.php',
            crossDomain: true,
            beforeSend : function() { },
            complete   : function() { },
            data       : {id_ocorrencia_ticket : id, id_ocorrencia : id_ocorrencia, id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo : '1'},
            dataType   : 'json',
            success: function(retorno){
				var cor_status='';
				cor_status=retorno[0]['id_situacao'];
				
				if(cor_status == '1'){
					cor_status = 'green';
				}else if(cor_status=='10'){
					cor_status='red';
				}else{
					cor_status='yellow';
				}
				
				cor_status = '<i class="fa fa-circle" style="color:'+cor_status+';" id="icon_status_ticket"></i>';
                $("#form_ticket #id_ocorrencia_ticket").val(retorno[0]['id_ocorrencia_ticket']);
                $("#form_ticket #id_ocorrencia").val(retorno[0]['id_ocorrencia']);
                $("#form_ticket #id_condominio").val(retorno[0]['id_condominio']);
				$("#form_ticket #data_ticket").html(retorno[0]['data_criacao']);
                $("#form_ticket #id_situacao_atual").val(retorno[0]['id_situacao']);
                $("#form_ticket #situacao").html(cor_status +' '+ retorno[0]['situacao_descricao']);
                $("#form_ticket #descricao").val(retorno[0]['descricao']);
				
                //$("#form_ticket #icon_status_ticket").css("color", cor_status);
				
				
                afed('#ticket,#bt_ticket_finaliza','#ocorrencias_ticket,#home,#bt_ticket_salva','','#form_ticket #descricao',3);
                if(retorno[0]['id_situacao'] == 10){
                    afed('','#bt_ticket_finaliza','','',3);
                }
                localStorage.setItem('TELA_ATUAL','ticket');
            },
            error      : function() {
                alert('erro ticket');
            }
        });
    }
    
}

function finaliza_ticket(){
    navigator.notification.confirm(
        'Deseja realmente Finalizar esse ticket',  // message
        finaliza_ticket2,              // callback to invoke with index of button pressed
        'Finalizar',            // title
        'Sim,Não'          // buttonLabels
    );    
}

function finaliza_ticket2(res){
    if(res==1){
        var dados = $( "#form_ticket" ).serialize();
        //alert(dados);
 		$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/ticket_update.php',
            crossDomain: true,
            beforeSend : function() {  },
            complete   : function() {  },
            data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&'+dados,
			success: function(retorno){
                //alert(retorno);
                voltar('#tickets','#ticket','tickets');
                carrega_tickets(0);
//                $('#form_ocorrencia_add #descricao').val('');
//                $('#form_ocorrencia_add #foto_oco').val('');
			}
		});
   }else{
        
    }
}

//
//
//// FUNCAO CARREGA UM ANEXO
//function carrega_comunicado_arq(id){
//	
//    var dados = '';
//    var dado  = '';
//	var ext;
//	var num;
//	$.ajax({
//		type: 'POST',
//		url: localStorage.getItem('DOMINIO')+'appweb/comunicado_get.php',
//        crossDomain: true,
//        beforeSend : function() { },
//        complete   : function() { },
//        data       : {id_comunicado : id, tipo : '2'},
//        dataType   : 'json',
//		success: function(retorno){
//            for (x in retorno) {
//				num  = parseInt(x);
//				num += 1;
//				ext = retorno[x]['nome_arquivo'];
//				ext = ext.split('.');
//                dado = '<button class="col button button-small button-fill color-gray" onClick="download_arq_comunicado(\''+retorno[x]['caminho']+'\',\''+retorno[x]['nome_arquivo']+'\');" style="top: 18px;margin-top:10px"><i class="fa fa-cloud-download"></i>DOWNLOAD ANEXO ' + num + '  ('+ext[1]+')</button>';
//                dados = dados + dado;
//            }
//            $("#comunicado_anexo_retorno").html(dados);
//		},
//        error      : function() {            
//
//        }
//	});	
//}

//function download_arq_comunicado(caminho,arquivo) {
//    caminho      = caminho.replace("../","");
//    var path     = localStorage.getItem('DOMINIO')+caminho+arquivo;
//	var extencao = arquivo.split(".");
//	var ext      = extencao[1];
//    console.log(cordova.file.externalRootDirectory);
//	statusDom    = document.querySelector('#status');
//	$('#downloadProgress').css({"display":"block"});
//  	app2.progressbar.set('#status', "0");
//	
//    var fileTransfer = new FileTransfer();
//    var uri = encodeURI(path);
//	
//    var filePath = cordova.file.externalRootDirectory+'Download/'+arquivo;
//	fileTransfer.onprogress = function(progressEvent) {
//		if (progressEvent.lengthComputable) {
//			var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
//			statusDom.innerHTML = perc + "%...";
//			app2.progressbar.set('#status', perc);
//		}
//	};
//    fileTransfer.download(
//        uri,
//        filePath,
//        function(entry) {
//            console.log("download complete: " + entry.fullPath);
//			$('#downloadProgress').css({"display":"none"});
//			var path = entry.toURL(); //**THIS IS WHAT I NEED**
//			var ref = cordova.InAppBrowser.open(path, '_system', 'location=yes');
//
//        },
//        function(error) {
//            console.log("download error source " + error.source);
//            console.log("download error target " + error.target);
//        },
//        false,
//        {
//            headers: {
//                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
//            }
//        }
//    );
//}

