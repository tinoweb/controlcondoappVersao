// JavaScript Document

//FUNCAO CARREGA TODAS AREAS COMUNS
function carrega_areas(){
	var dados = '';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/area_comum_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val()},
        dataType   : 'json',
		success: function(retorno){
            for (x in retorno) {
                var dado = '<div class="area" onClick="carrega_area(\''+retorno[x]['id_area_comum']+'\',\'1\',\''+retorno[x]['nome']+'\');"><strong>'+retorno[x]['nome']+'</strong></div>';
                dados = dados + dado;
            }
			$( "#areas_retorno" ).html(dados);
			afed('#reservas','#home','','',3,'reservas');

		}
	});	
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
		if(iniDate >= startDate && iniDate < endDate) {
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
					$( "#h_"+ii ).css("border-color","#53c7ec");
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
	var dt_festa = $( "#dt_festa" ).val();
	var dt = dt_festa.split("/");
	var hora_ini = $( "#h_"+h ).html();
	var iniDate = new Date(dt[2] +"-"+ dt[1] +"-"+ dt[0] + " "+hora_ini);
	iniDate.setMinutes(iniDate.getMinutes()+30);
	afed('#reserva','#area','','',2,'reserva');
	$( "#add_reserva_dt" ).val(dt[2] +"-"+ dt[1] +"-"+ dt[0]);
	$( "#add_reserva_data" ).html(dt_festa);
	$( "#add_reserva_hora_inicio" ).val(hora_ini);
	$( "#add_reserva_hora_fim" ).val(pad(iniDate.getHours(),2)+":"+pad(iniDate.getMinutes(),2));
	$( "#add_reserva_tipo" ).val("0");
	//alert(hora_ini);
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
		var dados = $( "#add_reserva" ).serialize();
        var dt_ini = new Date($("#add_reserva_dt").val()+' '+$("#add_reserva_hora_inicio").val());
        var dt_fim = new Date($("#add_reserva_dt").val()+' '+$("#add_reserva_hora_fim").val());
        var dt_atual = new Date();
        var dt_valida_ini = new Date(localStorage.getItem('RESERVA_ATUAL_INI'));
        var dt_valida_fim = new Date(localStorage.getItem('RESERVA_ATUAL_FIM'));
        //alert(dt_valida_ini+' '+dt_valida_fim+' '+dt_ini+' '+dt_fim);
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
        var id_reserva = $( "#add_reserva_id" ).val();
        //alert(id_reserva);
		$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/reserva_delete.php',
            beforeSend : function() { },
            complete   : function() { },
            data:'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&id_reserva='+id_reserva,
			success: function(retorno){
                afed('#area','#reserva','','',2,'area');
                carrega_area($( "#DADOS #AREA_COMUM" ).val(),'0');
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
