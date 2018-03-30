//FUNCAO CARREGA LIBERACOES TODAS
function carrega_liberacao(tipo){
    //alert('teste');
	app.controler_pull("liberacao");
	if(tipo ==4){
		$("#busca_liberacao").val("");
	}
    if(tipo == 0 || tipo==3 || tipo==4){
        var pg = 1;
    }else{
        //var offset = $("#retorno_liberacao").find(".liberado").size();
        var offset = $(".liberado").length;
        if(offset != 0){
            var pg = (offset/5)+1;
        }else{
            var pg = 1
        }
		if(parseInt(pg) != parseFloat(pg)) { 
			pg = pg+1; 
		}
	}
    //alert(pg);
    var dados = '';
	$.ajax({
		type: 'POST',
		//url: localStorage.getItem('DOMINIO')+"appweb/liberacao_get.php",
		url: localStorage.getItem('DOMINIO')+'appweb/liberacao_get.php',
        crossDomain: true,
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(),id_morador : $( "#DADOS #ID_MORADOR" ).val(),pg : parseInt(pg),tipo : 1,nome : $( "#busca_liberacao" ).val()},
        dataType   : 'json',
		success: function(retorno){
            for (x in retorno) {
                var dado = '<div class="liberado"><div class="liberado_foto" onClick="foto_visita(\''+retorno[x]['visitante']+'\')" ';
                if(retorno[x]['foto'].length>0){
                    dado = dado + 'style="background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+')"';
                }
                dado = dado +'></div><div onClick="carrega_liberacao_visita(\''+retorno[x]['id']+'\',\'1\')"><strong style="font-size:11px" >'+retorno[x]['nome']+'</strong><p style="font-size: 9px;margin-left: 73px">'+retorno[x]['motivo']+'</p><span style="font-size: 10px;margin-left: 8px;">'+retorno[x]['validadeInicio']+' a '+retorno[x]['validadeFim']+'</span><br></div>';
				if(retorno[x]['valido']==1){
					dado = dado + '<button type="button" onClick="gera_qrcode(\''+retorno[x]['id']+'\',\''+retorno[x]['nome']+'\')" class="col button button-fill color-green">Enviar Convite</button>';
				}else{
					dado = dado + '<button type="button" class="col button button-fill color-red">CONVITE VENCIDO</button>';	
				}
				dado  = dado + '</div>';
                dados = dados + dado;
            }
            //alert(dados);
			//dados = '<div class="main">'+dados+'</div>';
			if(tipo == 0 || tipo==3 || tipo==4){
				$("#retorno_liberacao").html("");
			}
			$( "#retorno_liberacao" ).append(dados);
		},
        error   : function() {
            //alert('Erro ao carregar liberacao');
        }
	});
    localStorage.setItem('TELA_ATUAL','liberacao_list');
}

//FUNCAO CRREGA LIBERACAO PRA EDITAR
function carrega_liberacao_visita(visita,tipo){
	if(tipo == 0){
		
	}else{
    var todo_motivos ='';
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/liberacao_get.php',
            crossDomain: true,
            beforeSend : function() { },
            complete   : function() { },
            data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(),id_morador : $( "#DADOS #ID_MORADOR" ).val(),id_liberacao : visita},
            dataType   : 'json',
            success: function(retorno){
                var motivos = retorno[0]['motivos'];
                //alert(motivos)
                for (x in motivos) {
                    if(motivos[x]['motivo'] == retorno[0]['motivo']){
                        var motivo = '<option selected value="'+motivos[x]['id']+'">'+motivos[x]['motivo']+'</option>';
                    }else{
                        var motivo = '<option value="'+motivos[x]['id']+'">'+motivos[x]['motivo']+'</option>';
                    }
                    todo_motivos = todo_motivos + motivo;
                }
                $( "#add_liberacao #visita_motivo" ).html(todo_motivos);
                $( "#add_liberacao #id" ).val(retorno[0]['id']);
                $( "#add_liberacao #tipo" ).val(tipo);
                $( "#add_liberacao #nome" ).val(retorno[0]['nome']);
                $( "#add_liberacao #rg" ).val(retorno[0]['rg']);
                var dt_de = retorno[0]['validadeInicio'].split(' ');
                $( "#add_liberacao #dt_de" ).val(dt_de[0]);
                $( "#add_liberacao #hr_de" ).val(dt_de[1]);
                var dt_ate = retorno[0]['validadeFim'].split(' ');
                $( "#add_liberacao #dt_ate" ).val(dt_ate[0]);
                $( "#add_liberacao #hr_ate" ).val(dt_ate[1]);
                $( "#add_liberacao #visita" ).val(retorno[0]['visitante']);
				closePopUp();
                afed('#liberacao2,#del_lib','#home,#liberacao3','','',3);
                localStorage.setItem('TELA_ATUAL','liberacao_add');
            },
            error      : function() {
                //alert('Erro ao carregar liberacao');
            }
        });
    }
}

//FUNCAO ABRE FORM E LIMPA DADOS LIBERACAO
function adiciona_liberacao(){
	//processando(1);
    var motivos = '';
	$("#more_information").css({"display":"none"});
	$("#collapse_more").css({"display":"block"});
    $.ajax({
        type: 'POST',
        url: localStorage.getItem('DOMINIO')+'appweb/motivo_get.php',
        crossDomain: true,
        beforeSend : function() {  },
        complete   : function() {  },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val()},
        dataType   : 'json',
        success: function(retorno){
            //alert(retorno);
            for (x in retorno) {
                //alert(retorno[x]['id']);
                var motivo = '<option value="'+retorno[x]['id']+'">'+retorno[x]['motivo']+'</option>';
                motivos = motivos + motivo;
            };
            //alert(motivos);
            $( "#add_liberacao #visita_motivo" ).html(motivos);
            localStorage.setItem('TELA_ATUAL','visitantes');
        },
        error      : function() {
            //alert('Erro ao carregar motivos');
        }
    });
    
    var dt_atual_1 = new Date();
    var dt_atual_2 = new Date();
    var dt_atual_1 = new Date();
    var dt_atual_2 = new Date();
    
	var dt_1       = app.getFormattedDate(dt_atual_1);
    dt_atual_2.setDate(dt_atual_2.getDate()+1);
    var dt_2 	   = app.getFormattedDate(dt_atual_2);
	var hora = dt_atual_1.getHours()+":"+dt_atual_1.getMinutes();
    //alert(hora);
    //alert(dt_2);
	$( "#add_liberacao #id" ).val('0');
	$( "#add_liberacao #tipo" ).val('0');
	$( "#add_liberacao #nome" ).val(' ');
	$( "#add_liberacao #rg" ).val(' ');
    //alert(dt_1);
	$( "#add_liberacao #dt_de" ).val(dt_1);
	$( "#add_liberacao #hr_de" ).val(hora);
	$( "#add_liberacao #dt_ate" ).val(dt_2);
	$( "#add_liberacao #hr_ate" ).val(hora);
	$( "#add_liberacao #visita" ).val('0');
    
	afed('#liberacao2','#home,#del_lib','','',3);
    //localStorage.setItem('TELA_ATUAL','liberacao_add');
	$("#new_visit").click();
}

//FUNCAO ADICIONA LIBERACAO
function salva_liberacao(){
	var msg = '';
	if($( "#add_liberacao #visita" ).val() == 0 || $( "#add_liberacao #dt_de" ).val() == '' || $( "#add_liberacao #hr_de" ).val() == '' || $( "#add_liberacao #dt_ate" ).val() == '' || $( "#add_liberacao #hr_ate" ).val() == ''){
		notifica('Preencha o campo/Preencha todos os campos/Ok',1000,0);
	}else{
        
        var dt_atual = new Date();
        dt_atual.setMinutes(dt_atual.getMinutes()-30);
        var dt_de = new Date($('#add_liberacao #dt_de').val()+ " "+$('#add_liberacao #hr_de').val() );
        var dt_ate = new Date($('#add_liberacao #dt_ate').val()+ " "+$('#add_liberacao #hr_ate').val() );
        //alert(dt_atual+'\n'+dt_de+'\n'+dt_ate);
        
        if(dt_de < dt_atual){
           notifica('Data Inválida/Data INICIAL não pode ser inferior a data atual/Ok',0,0);
        }else if(dt_ate < dt_atual){
           notifica('Data Inválida/Data FINAL não pode ser inferior a data atual/Ok',0,0);
        }else if(dt_ate <= dt_de){
           notifica('Data Inválida/Data FINAL não pode ser inferior a data INICIAL/Ok',0,0);
        }else{
            var dados = $( "#add_liberacao" ).serialize();

            $.ajax({
                type: 'POST',
                url: localStorage.getItem('DOMINIO')+'appweb/liberacao_insert.php',
                crossDomain: true,
                data       : dados+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&id_morador='+$( "#DADOS #ID_MORADOR" ).val(),
                success: function(retorno){
                        //alert(retorno);
                        carrega_liberacao(0);
						openPopUp();
                        afed('#home','#liberacao2','','',3);
                },
                error      : function() {
                    //alert('Erro ao carregar liberacao');
                }
            });           
        }
        
	}
}

function gera_qrcode(qrcode_numero,nome){

    localStorage.setItem('TELA_ATUAL','qrcode_gera');
    $.ajax({
        type: 'POST',
        url: localStorage.getItem('DOMINIO')+'appweb/qrcode_insert.php',
        crossDomain: true,
        beforeSend : function() {  },
        complete   : function() {  },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(),id_autorizacao_visita : qrcode_numero},
        dataType   : 'json',
        success: function(retorno){
            $('#qrcodeCanvas').html('');
            jQuery('#qrcodeCanvas').qrcode({
                text	: retorno[0]['code'],
                quiet   : 2,
                ecLevel: 'L',
                radius: 0.5
            });
            //preview();
            var dados_qr = 'Olá '+nome+', <br>essa é sua autorização para acessar o <br>condomínio '+$( "#DADOS #CONDOMINIO" ).val()+' <br>no período de '+retorno[0]['data_inicio']+' a '+retorno[0]['data_validade']+'';
            //var dados_qr = 'Condominio '+$( "#DADOS #CONDOMINIO" ).val()+'<br>Morador: '+$( "#DADOS #NOME_MORADOR" ).val()+'<br>'+$( "#DADOS #QUADRA" ).val()+' '+$( "#DADOS #LOTE" ).val()+'<br>Válido de '+retorno[0]['data_inicio']+'<br>Até '+retorno[0]['data_validade']+'';
            $('#qr_dados').html(dados_qr);
			afed('#qrcode','#home,#del_lib','','',3);
			closePopUp();
            
            //var canvas = document.getElementById('qrcodeCanvas');
            //var dataURL = canvas.toDataURL();
            //alert(dataURL);
        },
        error      : function() {
            //alert('Erro ao carregar qcode');
        }
    });
   
}

//function downloadCanvas(link) {
////    var canvas = document.getElementById('qr_code_img');
////    var dataURL = canvas.toDataURL();
//    var url = 'http://www.planalto.gov.br/ccivil_03/manual/manualredpr2aed.pdf';
//    var filePath = 'qrcode.pdf';
//    alert(filePath);
//    var fileTransfer = new FileTransfer();
//    var uri = encodeURI(url);
//    fileTransfer.download(
//        uri,
//        filePath,
//        function(entry) {
//            console.log("download complete: " + entry.fullPath);
//        },
//        function(error) {
//            console.log("download error source " + error.source);
//            console.log("download error target " + error.target);
//            console.log("upload error code" + error.code);
//        },
//        false,
//        {
//            headers: {
//                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
//            }
//        }
//    );
////    var canvas = document.getElementById('qr_code_img');
////    var dataURL = canvas.toDataURL();
////    //alert(dataURL);
////    link.href = dataURL;
////    link.download = 'qrcode.png';
//}

function preview(){
    //alert(globalteste);
    var element = $("#printscr_qrcode"); // global variable
    var getCanvas; // global variable
    html2canvas(element, {
        onrendered: function (canvas) {
            $("#share_img").html(canvas);
            var dataURL = canvas.toDataURL();
            //alert(dataURL); 
            localStorage.setItem("img_share", dataURL);
        }
    });
    afed('#qrcode_share','#qrcode','','',2);
    localStorage.setItem('TELA_ATUAL','qrcode_share');
    
}

//
//function download_qrcode(){
//        alert('1');
//        var getCanvas = localStorage.getItem("getCanvas");
//        //alert(getCanvas);
//        alert('2');
//        var imgageData = getCanvas.toDataURL("image/png");
//        // Now browser starts downloading it instead of just showing it
//        alert('3');
//        var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
//        alert('4');
//        $("#qrcodeCanvas").attr("download", "your_pic_name.png").attr("href", newData);
//
//}

function download_qrcode(){ 
    console.log('0');
    console.log(cordova.file.externalRootDirectory);
    console.log('1');
    var fileTransfer = new FileTransfer();
    //var uri = encodeURI("http://portal.mec.gov.br/seb/arquivos/pdf/Profa/apres.pdf");
    //var canvas = document.getElementById('qr_s_teste');
    var dataURL = localStorage.getItem("img_share");
    var uri = encodeURI(dataURL);
    var filePath = cordova.file.externalRootDirectory+'Download/qrcode.png';
    console.log('2');
    fileTransfer.download(
        uri,
        filePath,
        function(entry) {
            console.log("download complete: " + entry.fullPath);
            notifica('Download/Download Concluido/ok',0,0);
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
    console.log('3');
}

function whatsapp_qrcode(){
    //var canvas = document.getElementById('qr_s_teste');
    var dataURL = localStorage.getItem("img_share");
    var uri = encodeURI(dataURL);
    window.plugins.socialsharing.shareViaWhatsApp('' /* msg */, uri /* img */, null /* url */, function() {console.log('share ok')}, function(errormsg){alert(errormsg)});
}

function liberacao_delete_notifica(){
    navigator.notification.confirm(
        'Voce tem certeza que deseja excluir essa Liberação',  // message
        liberacao_delete,              // callback to invoke with index of button pressed
        'Excluir Liberação',            // title
        'Sim,Não'          // buttonLabels
    );
}

function liberacao_delete(buttonIndex){
    if(buttonIndex == 1){
        var dados = $( "#liberacao2 #add_liberacao" ).serialize();
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/liberacao_delete.php',
            crossDomain: true,
            beforeSend : function() {  },
            complete   : function() {  },
            data       : dados+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val(),
            success: function(retorno){
                //alert(retorno);
                carrega_liberacao(0);
                openPopUp();
				afed('#home','#liberacao2','','',3);
            },
            error      : function() {
                alert('erro');
            }
        });  
    }
}
function moreInformation(){
	
		$("#more_information").css({"display":"block"});
		$("#collapse_more").css({"display":"none"});

}

function foto_visita(id_visitante){
    afed('#bg_box6','','','',1);
    localStorage.setItem("id_visitante_up_foto",id_visitante);
}