m// JavaScript Document

//FUNCAO CARREGA TODAS AREAS COMUNS
function carrega_areas(){
	var dados = '';
	var dados_select = '<option value="">TODOS</option>';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/area_comum_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val()},
        dataType   : 'json',
		success: function(retorno){
            dados = '<div class="area col button button-big button-raised button-fill link popup-open" style=" margin-bottom: 4%;" onClick="carrega_minha_reserva(\'0\');">MINHAS RESERVAS</div>';
            for (x in retorno) {
                var dado = '<div class="area" onClick="carrega_area(\''+retorno[x]['id_area_comum']+'\',\'1\',\''+retorno[x]['nome']+'\');"><strong>'+retorno[x]['nome']+'</strong></div>';
                var dado_select = '<option value="'+retorno[x]['id_area_comum']+'">'+retorno[x]['nome']+'</option>';
                dados = dados + dado;
                dados_select = dados_select + dado_select;
            }
			$( "#areas_retorno" ).html(dados);
			$( "#filtro_r_area" ).html(dados_select);
			afed('#reservas','#home','','',3,'reservas');

		}
	});	
}

//FUNCAO CARREGA MINHA RESERVA 
function carrega_minha_reserva(filtro=0,scroll=0){
    //"use strict";
    app.controler_pull("minha_reserva");
    
    if(filtro == 0){
        var d1 = new Date();
        var d2 = new Date();
        var d3 = new Date(d2.setDate(d2.getDate() + 180));
        var data_inicio = d1.getFullYear()+'-'+form_data((d1.getMonth()+1))+'-'+form_data(d1.getDate());
        var data_fim = d3.getFullYear()+'-'+form_data((d3.getMonth()+1))+'-'+form_data(d3.getDate());
        var area = '';
        var situacao = '';
        $("#filtro_r_data_inicio").val(data_inicio);
        $("#filtro_r_data_fim").val(data_fim);
    }else{
        var data_inicio = $("#filtro_r_data_inicio").val();
        var data_fim = $("#filtro_r_data_fim").val();
        var area = $("#filtro_r_area").val();
        var situacao = $("#filtro_r_situacao").val();
    }
    $( "#main_mreserva" ).html('');
    //alert(situacao);
    //alert(data_inicio+' ate '+data_fim);
	var dados = '';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/minha_reserva_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_morador : $( "#DADOS #ID_MORADOR" ).val(), id_unidade : $( "#DADOS #ID_UNIDADE" ).val(), inicio : data_inicio, fim : data_fim, id_area : area, situacao : situacao },
        dataType   : 'json',
		success: function(retorno){
			//alert(retorno);
            for (x in retorno) {
                cor_status = retorno[x]['situacao'];
				if(cor_status=='1'){
					cor_class='#28a745';
				}else if(cor_status=='0'){
					cor_class='#ffc107'
				}else if(cor_status=='2') {
					cor_class='#dc3545'
				}
                
                var dados_reserva = retorno[x]['id_reserva']+'||'+retorno[x]['area']+'||'+retorno[x]['morador']+'||'+retorno[x]['descricao']+'||'+retorno[x]['lote']+'||'+retorno[x]['data']+'||'+retorno[x]['inicio']+'||'+retorno[x]['fim']+'||'+retorno[x]['situacao']+'||'+retorno[x]['observacao'];
                
                //alert(dados_reserva);
                
                var dado = '<div class="card"><div class="card-header">'+retorno[x]['area']+'<div class="right"><i class="fa fa-circle" style="color:'+cor_class+'"></i></div></div><div class="card-content card-content-padding"><div class="item-inner"><div class="item-subtitle" style="font-size:12px;">DATA</div><div class="item-title">'+retorno[x]['data']+'  de '+retorno[x]['inicio']+' até '+retorno[x]['fim']+'</div><a class="col button button-fill sheet-open" onclick="carrega_minha_reserva_unica(\''+dados_reserva+'\')" data-sheet=".minha_reserva" >Visualizar</a></div></div></div>';
                dados = dados + dado;
            }
			$( "#main_mreserva" ).html(dados);
            if(filtro == 0){
                afed('#m_reserva','#reservas','','',3,'minha_reserva');
            }
		}
	});	
}

function carrega_minha_reserva_unica(retorno){

    var dados = retorno.split('||');
    $( "#r_area" ).html(dados[1]);
    $( "#r_morador" ).html(dados[2]);
    $( "#r_titulo_quadralote" ).html(localStorage.getItem('ROTULO_QUADRA')+'/'+localStorage.getItem('ROTULO_LOTE'));
    $( "#r_quadralote" ).html(localStorage.getItem('ROTULO_QUADRA')+' '+dados[3]+' / '+localStorage.getItem('ROTULO_LOTE')+' '+dados[4]);
    $( "#r_data" ).html(dados[5]+' das '+dados[6]+' até '+dados[7]);
    var dataout = dados[5].split('/');
    var dt = new Date(dataout[2]+'-'+dataout[1]+'-'+dataout[0]+' 00:00:00');
    var dt_hoje = new Date();
    
    if(dados[8] == 0){
        var status = '<i class="fa fa-circle" style="color:#ffc107;"></i> PENDENTE';
    }else if(dados[8] == 1){
        if(dt <= dt_hoje){
            var status = '<i class="fa fa-circle" style="color:#28a745;"></i> CONCLUIDO'; 
        }else{
            var status = '<i class="fa fa-circle" style="color:#28a745;"></i> CONFIRMADO'; 
        }
               
    }else if(dados[8] == 2){
        var status = '<i class="fa fa-circle" style="color:#dc3545;"></i> CANCELADO';        
    }
    $( "#r_situacao" ).html(status);
    //alert (retorno);
    if(dados[8] != 2){
        if(dt > dt_hoje){
            $( "#r_bt_cancela" ).html('<button class="col button button-fill color-red sheet-close" style="margin-top: 10px;" onclick="delete_reserva();" >Cancelar Reserva</button>');
            $( "#rel_delete_reserva #add_reserva_id" ).val(dados[0]);
        }
        //alert($( "#rel_delete_reserva #add_reserva_id" ).val());
    }else{
        $( "#r_bt_cancela" ).html('<div class="item-subtitle" style="font-size:12px;"><strong>MOTIVO CANCELAMENTO</strong></div><div class="item-title">'+dados[9]+'</div>');
    }
}

//FUNCAO CARREGA UMA AREA COMUM ESPECIFICA 
function carrega_area(id,cale_view,nome){
	//processando(1);
	if(cale_view == 1){
        var dtini = new Date();
        //$( "#dt_festa" ).val(dtini.getDate()+'/'+(dtini.getMonth()+1)+'/'+dtini.getFullYear());
        select_data('#dt_festa','',dtini.getDate(),dtini.getMonth(),dtini.getFullYear());
		$( "#DADOS #AREA_COMUM" ).val(id);
		$( "#area .topo_sub span" ).html(nome);
		cale('#dt_festa','','');
		afed('#area','#reservas','','',3,'area');

	}else{
		var dt_festa = $( "#dt_festa" ).val();
		$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/area_comum_get.php',
            crossDomain: true,
            beforeSend : function() { },
            complete   : function() { },
            data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), id_areacomum : $( "#DADOS #AREA_COMUM" ).val(), dt_festa : dt_festa},
            dataType   : 'json',
			success: function(retorno){
                var dt_mim_age = new Date();
                dt_mim_age.setDate(dt_mim_age.getDate()+parseInt(retorno[0]['data_minima']));
                var hora = dt_mim_age.getHours()+":"+dt_mim_age.getMinutes();
                var dt_max_age = new Date();
                if(retorno[0]['data_maxima'] == 0){
                    dt_max_age.setDate(dt_max_age.getDate()+365);
                }else{
                    dt_max_age.setDate(dt_max_age.getDate()+parseInt(retorno[0]['data_maxima']));
                }
                var dt = dt_festa.split("/");
                var dt_festa_new = new Date(dt[2] +"-"+ dt[1] +"-"+ dt[0] + " "+hora );
                dt_festa_new.setMinutes(dt_festa_new.getMinutes()+5);
                $( "#area .topo_sub span" ).html(retorno[0]['nome']);
                $( "#reserva .topo_sub span" ).html(retorno[0]['nome']);
				$( "#reserva #add_reserva #add_reserva_valor" ).html("R$ "+retorno[0]['valor']);
				$( "#reserva #add_reserva #add_reserva_termo" ).html(retorno[0]['termo']);
                localStorage.setItem('TIPO_PERIODO',retorno[0]['periodo_integral']);
                limpa_calendario();
                if(dt_festa_new > dt_mim_age && dt_festa_new < dt_max_age){                    
                    verifica_data_ativas(retorno[0]['inicio'],retorno[0]['fim'],retorno[0]['ativo']);
                }
                verifica_data_usadas(retorno[0]['reservas']);
                localStorage.setItem('TELA_ATUAL','calendario');
			}
		});	
	}
}

//FUNCAO VERIFICA DATA ATIVA NA AREA COMUM
function verifica_data_ativas(ini,fim,ativo) {
	var dt_festa = $( "#dt_festa" ).val();
	var dt = dt_festa.split("/");
	var startDate = new Date(dt[2] +"-"+ dt[1] +"-"+ dt[0] + " " + ini );
	var endDate = new Date(dt[2] +"-"+ dt[1] +"-"+ dt[0] + " " + fim );
    localStorage.setItem('RESERVA_ATUAL_INI',dt[2] +"-"+ dt[1] +"-"+ dt[0] + " " + ini);
    localStorage.setItem('RESERVA_ATUAL_FIM',dt[2] +"-"+ dt[1] +"-"+ dt[0] + " " + fim);
	var iniDate = new Date(dt[2] +"-"+ dt[1] +"-"+ dt[0] + " 00:00");
	for (i = 0; i < 48; i++) {
		if(iniDate >= startDate && iniDate < endDate && ativo == 1) {
			//alert(iniDate);
			$( "#h_"+i ).css("background-color","white");
			$( "#h_"+i ).css("color","black");
			$( "#h_"+i ).css("border-color","#4caf50")
			var bt_add = document.getElementById('h_'+i);
			bt_add.setAttribute("onclick", "adiciona_reserva('"+i+"')");
		}
		iniDate.setMinutes(iniDate.getMinutes()+30);
	}
}

//FUNCAO VERIFICA DATA USADAS NA AREA COMUM
function verifica_data_usadas(dados){
	var dt_festa = $( "#dt_festa" ).val();
    var dt = dt_festa.split("/");
    for (x in dados) {
		var startDate = new Date(dados[x]['inicio']);
		var endDate = new Date(dados[x]['fim']);
		var ttHoras = ((endDate.getTime() - startDate.getTime())/3600000)*2;
		var conta_agrupa = 0;
		var startHora = dados[x]['inicio'].split(' ');
		var endHora = dados[x]['fim'].split(' ');
		var iniDate = new Date(dt[2] +"-"+ dt[1] +"-"+ dt[0] + " 00:00");
        for (ii = 0; ii < 48; ii++) {
			if(iniDate >= startDate && iniDate < endDate) {
                
				if(dados[x]['morador'] == $( "#DADOS #ID_MORADOR" ).val() ){
					if(conta_agrupa != 0){
						$( "#h_"+ii ).css("border-top-color","#53c7ec");
					}
					$( "#h_"+ii ).css("background-color","#ddd");
                    //alert(dados[x]['situacao']);
                    if(dados[x]['situacao'] == 0){
                        //alert('sim');
                        $( "#h_"+ii ).css("border-color","#f5db00");
                    }else{
                        //alert('nao');
                        $( "#h_"+ii ).css("border-color","#53c7ec");
                    }
					//$( "#h_"+ii ).css("border-color","#53c7ec");
					var bt_edit = document.getElementById('h_'+ii);
					bt_edit.setAttribute("onclick", "edite_reserva('"+dados[x]['id_reserva']+"','"+startHora[0]+"','"+startHora[1]+"','"+endHora[1]+"')");
				}else{
					if(conta_agrupa != 0){
						$( "#h_"+ii ).css("border-top-color","#8c72cd");
					}
					$( "#h_"+ii ).css("background-color","#ddd");
					$( "#h_"+ii ).css("border-color","#8c72cd");
					$( "#h_"+ii ).css("color","black");
					var bt_edit = document.getElementById('h_'+ii);
					bt_edit.setAttribute("onclick", "");
				}
	
				if(conta_agrupa == 0){
					
                    if((ttHoras-1) == 0){
                        $( "#h_"+ii ).html(startHora[1]+" - "+endHora[1]+"<br>");
                    }else{
                        $( "#h_"+ii ).html(startHora[1]+" - "+endHora[1]+"<br>");
                        $( "#h_"+ii ).css("border-radius","11px 11px 0 0");
						$("#h_"+ii).css("margin-bottom","0");
						$("#h_"+ii).css("height","26px");
						$("#h_"+ii).css("border-bottom","0");
                    }	
					
				}else{
                    if((ttHoras-1) == conta_agrupa){
                        $( "#h_"+ii ).html(" ");
                        $( "#h_"+ii ).css("border-radius","0 0 11px 11px");   
						$("#h_"+ii).css("border-top","0");
                    }else{
						$("#h_"+ii).css("margin-bottom","0");
                        $( "#h_"+ii ).html(" ");
                        $( "#h_"+ii ).css("border-radius","0 0 0 0");
						$("#h_"+ii).css("height","26px");
						$("#h_"+ii).css("border-bottom","0");
						$("#h_"+ii).css("border-top","0");
                    }
				}
				conta_agrupa++;
			}
			iniDate.setMinutes(iniDate.getMinutes()+30);
		}
    }
}

//FUNCAO LIMPA CALENDARIO
function limpa_calendario(){
	$( ".hora" ).css("background-color","white");
	$( ".hora" ).css("border-color","red");
	$( ".hora" ).css("border-radius","7px");
	$( ".hora" ).css("margin-bottom","1px");
	$( ".hora" ).css("height","25px");
	$( ".hora" ).css("border-bottom","1px solid red");
	$( ".hora" ).css("border-top"   ,"1px solid red");
	$( "#h_0" ).html("00:00");
	var bt_clear = document.getElementById("h_0");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_1" ).html("00:30");
	var bt_clear = document.getElementById("h_1");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_2" ).html("01:00");
	var bt_clear = document.getElementById("h_2");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_3" ).html("01:30");
	var bt_clear = document.getElementById("h_3");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_4" ).html("02:00");
	var bt_clear = document.getElementById("h_4");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_5" ).html("02:30");
	var bt_clear = document.getElementById("h_5");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_6" ).html("03:00");
	var bt_clear = document.getElementById("h_6");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_7" ).html("03:30");
	var bt_clear = document.getElementById("h_7");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_8" ).html("04:00");
	var bt_clear = document.getElementById("h_8");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_9" ).html("04:30");
	var bt_clear = document.getElementById("h_9");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_10" ).html("05:00");
	var bt_clear = document.getElementById("h_10");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_11" ).html("05:30");
	var bt_clear = document.getElementById("h_11");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_12" ).html("06:00");
	var bt_clear = document.getElementById("h_12");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_13" ).html("06:30");
	var bt_clear = document.getElementById("h_13");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_14" ).html("07:00");
	var bt_clear = document.getElementById("h_14");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_15" ).html("07:30");
	var bt_clear = document.getElementById("h_15");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_16" ).html("08:00");
	var bt_clear = document.getElementById("h_16");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_17" ).html("08:30");
	var bt_clear = document.getElementById("h_17");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_18" ).html("09:00");
	var bt_clear = document.getElementById("h_18");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_19" ).html("09:30");
	var bt_clear = document.getElementById("h_19");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_20" ).html("10:00");
	var bt_clear = document.getElementById("h_20");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_21" ).html("10:30");
	var bt_clear = document.getElementById("h_21");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_22" ).html("11:00");
	var bt_clear = document.getElementById("h_22");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_23" ).html("11:30");
	var bt_clear = document.getElementById("h_23");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_24" ).html("12:00");
	var bt_clear = document.getElementById("h_24");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_25" ).html("12:30");
	var bt_clear = document.getElementById("h_25");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_26" ).html("13:00");
	var bt_clear = document.getElementById("h_26");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_27" ).html("13:30");
	var bt_clear = document.getElementById("h_27");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_28" ).html("14:00");
	var bt_clear = document.getElementById("h_28");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_29" ).html("14:30");
	var bt_clear = document.getElementById("h_29");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_30" ).html("15:00");
	var bt_clear = document.getElementById("h_30");
	bt_clear.setAttribute("onclick", "");
	 
	$( "#h_31" ).html("15:30");
	var bt_clear = document.getElementById("h_31");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_32" ).html("16:00");
	var bt_clear = document.getElementById("h_32");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_33" ).html("16:30");
	var bt_clear = document.getElementById("h_33");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_34" ).html("17:00");
	var bt_clear = document.getElementById("h_34");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_35" ).html("17:30");
	var bt_clear = document.getElementById("h_35");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_36" ).html("18:00");
	var bt_clear = document.getElementById("h_36");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_37" ).html("18:30");
	var bt_clear = document.getElementById("h_37");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_38" ).html("19:00");
	var bt_clear = document.getElementById("h_38");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_39" ).html("19:30");
	var bt_clear = document.getElementById("h_39");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_40" ).html("20:00");
	var bt_clear = document.getElementById("h_40");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_41" ).html("20:30");
	var bt_clear = document.getElementById("h_41");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_42" ).html("21:00");
	var bt_clear = document.getElementById("h_42");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_43" ).html("21:30");
	var bt_clear = document.getElementById("h_43");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_44" ).html("22:00");
	var bt_clear = document.getElementById("h_44");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_45" ).html("22:30");
	var bt_clear = document.getElementById("h_45");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_46" ).html("23:00");
	var bt_clear = document.getElementById("h_46");
	bt_clear.setAttribute("onclick", "");
	
	$( "#h_47" ).html("23:30");
	var bt_clear = document.getElementById("h_47");
	bt_clear.setAttribute("onclick", "");
}

//FUNCAO ADICIONA RESERVA
function adiciona_reserva(h){ 
    afed('','','#add_reserva_hora_inicio,#add_reserva_hora_fim','',2,'reserva');
	var dt_festa = $( "#dt_festa" ).val();
	var dt = dt_festa.split("/");
	var hora_ini = $( "#h_"+h ).html();
	var iniDate = new Date(dt[2] +"-"+ dt[1] +"-"+ dt[0] + " "+hora_ini);
	iniDate.setMinutes(iniDate.getMinutes()+30);
    var hora_fim = pad(iniDate.getHours(),2)+":"+pad(iniDate.getMinutes(),2);
    if(localStorage.getItem('TIPO_PERIODO') == 1){
        var hora_ini_int = localStorage.getItem('RESERVA_ATUAL_INI').split(" ");
        var hora_fim_int = localStorage.getItem('RESERVA_ATUAL_FIM').split(" ");
        hora_ini = hora_ini_int[1];
        hora_fim = hora_fim_int[1];
        afed('','','','#add_reserva_hora_inicio,#add_reserva_hora_fim',2,'reserva');
    }
	afed('#reserva','#area','','',2,'reserva');
	$( "#add_reserva_dt" ).val(dt[2] +"-"+ dt[1] +"-"+ dt[0]);
	$( "#add_reserva_data" ).html(dt_festa);
	$( "#add_reserva_hora_inicio" ).val(hora_ini);
	$( "#add_reserva_hora_fim" ).val(hora_fim);
	$( "#add_reserva_tipo" ).val("0");
    $("#concordo").prop("checked",false);

}

//FUNCAO EDITA RESERVA
function edite_reserva(id_reserva,data,inicio,fim){ 
	var dt_festa = $( "#dt_festa" ).val();
	afed('#reserva','#area','','',2,'reserva')
	$( "#add_reserva_dt" ).val(data);
	$( "#add_reserva_id" ).val(id_reserva);
    $( "#add_reserva_data" ).html(dt_festa);
	$( "#add_reserva_hora_inicio" ).val(inicio);
	$( "#add_reserva_hora_fim" ).val(fim);
	$( "#add_reserva_tipo" ).val("1");
    $("#concordo").attr('checked','checked');
}

// FUNCAO SALVA RESERVA AREA COMUM
function salva_reserva(){

	if($("#concordo").is(':checked')){
        afed('','','#add_reserva_hora_inicio,#add_reserva_hora_fim','',2,'reserva');
		var dados = $( "#add_reserva" ).serialize();
        var dt_ini = new Date($("#add_reserva_dt").val()+' '+$("#add_reserva_hora_inicio").val());
        var dt_fim = new Date($("#add_reserva_dt").val()+' '+$("#add_reserva_hora_fim").val());
        var dt_atual = new Date();
        var dt_valida_ini = new Date(localStorage.getItem('RESERVA_ATUAL_INI'));
        var dt_valida_fim = new Date(localStorage.getItem('RESERVA_ATUAL_FIM'));
        ///alert(dt_ini+' '+dt_fim);
        if(dt_fim < dt_ini){
            notifica('Alerta/Horario final n\u00e3o pode ser menor que o de inicio/Fechar',2000,0);
        }else if(dt_ini < dt_atual){
            notifica('Alerta/Horario inicio n\u00e3o pode ser menor que o Atual/Fechar',2000,0);
        }else if(dt_ini < dt_valida_ini){
            notifica('Alerta/Horario n\u00e3o disponivel/Fechar',2000,0);
        }else if(dt_ini > dt_valida_fim){
            notifica('Alerta/Horario n\u00e3o disponivel/Fechar',2000,0);
        }else if(dt_fim < dt_valida_ini){
            notifica('Alerta/Horario n\u00e3o disponivel/Fechar',2000,0);
        }else if(dt_fim > dt_valida_fim){
            notifica('Alerta/Horario n\u00e3o disponivel/Fechar',2000,0);
        }else{
            $.ajax({
                type: 'POST',
                url: localStorage.getItem('DOMINIO')+'appweb/reserva_insert.php',
                beforeSend : function() { },
                complete   : function() { },
                data: dados+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&morador='+$( "#DADOS #ID_MORADOR" ).val()+'&area='+$( "#DADOS #AREA_COMUM" ).val()+'&observacao=',
                success: function(retorno){

                    //alert(retorno);
                    if(retorno == 'erro1'){
                        notifica('Alerta/Horario n\u00e3o disponivel/Fechar',2000,0);
                    }else if(retorno == 'erro2'){
                        notifica('Alerta/Horario n\u00e3o disponivel/Fechar',2000,0);
                    }else if(retorno != ''){
                        notifica('Erro/Tente novamenta mais tarde/Fechar',2000,0);
                    }else{
                        carrega_area($( "#DADOS #AREA_COMUM" ).val(),'0');
                        afed('#area','#reserva','','',2,'area');     
                    }
                },
                error: function(erro){
                    //alert('erro');
                }
            });
        }
	}else{
		notifica('Termos de utiliza\u00e7\u00e3o/Aceite os termos de utiliza\u00e7\u00e3o/Fechar',2000,0);
	}
    afed('','#wait','','',3);
}

//FUNCAO DELETE RESERVA
function delete_reserva(){
    navigator.notification.confirm(
        'Deseja realmente excluir essa reserva',  // message
        apaga_reserva,              // callback to invoke with index of button pressed
        'Excluir',            // title
        'Sim,Não'          // buttonLabels
    );
}

function apaga_reserva(button){
    if(button == 1){
        if($( "#rel_delete_reserva #add_reserva_id" ).val() == ''){
            var id_reserva = $( "#add_reserva_id" ).val();
        }else{
            var id_reserva = $( "#rel_delete_reserva #add_reserva_id" ).val();
        }
		$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/reserva_delete.php',
            beforeSend : function() { },
            complete   : function() { },
            data:'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&id_reserva='+id_reserva,
			success: function(retorno){
                if($( "#rel_delete_reserva #add_reserva_id" ).val() == ''){
                    afed('#area','#reserva','','',2,'area');
                    carrega_area($( "#DADOS #AREA_COMUM" ).val(),'0');
                }else{
                    carrega_minha_reserva();
                    $( "#rel_delete_reserva #add_reserva_id" ).val('');
                }
			},
            error: function(erro){
                //alert('erro');
            }
		});
    }
}


function pad(str, length) {
  const resto = length - String(str).length;
  return '0'.repeat(resto > 0 ? resto : '0') + str;
}
