// JavaScript Document
/**********************LAYOUT CALENDARIO**********************************/
var layout = '<div class="cale_titulo"><div class="cale_last" id="cale_last"></div><div class="cale_title"></div><div class="cale_next" id="cale_next"><img width="30" style="margin-top:-10px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKcSURBVFhH7ZfJihRBEIYb9eJyGsVHcGXc8KBeXRF9AnEB9wVhmLP7Q7jg0YNP4YJnt4Pg7k29uJx0Btfvkw4oGruysqqmew79wwfdSUZkkBUZGdkZaaRqWgjjsLmLvx0bmubCbrgJr+BPH17CDdgJ2sy45sEJeAf/C6iMt3Ac9DEj2ghPobjoD7gDF+Eo7Oni70twF35C0eYJrINWdQSmIBZ5D+7kGKS0GE6BNmH/HQ5BK5qE36Bjd+wcLIBcLYLzoA996VPfjeSniuA+w3ZoKn3oK4LcD7W0AaZBR19gObSlFfAV9O3nXgtZ8qTFgTDJt0KZlkFuGXEn4wA9hiz7k6ChXHCgRO70J7gNuUF60mMd06mSXCTqnCcvdSAeQCySG6S3zQfQ9g3MgaR2QSzoTqa0FJ5B3SDPQNhWOoReX042P6rUOdUkSOtk5OI1B1J6DU72hshRkyDvgTbe3aWymEbdM4FzVTfIy+B81y7N+VUQziufqh7VCfIYxPyVDvTTFoiJex2oqd4gb0FZkK4Vc+0n+2rWBzjrP7GFc5iH5BckO6VhlJn7oM2Lf/8Sug5OHlShXgJZhdoHTix02oGEmgSnilfdNgdS0rkPHA1sFlLPxybNghfDR9DW1KrULCjfG7HooNqtww5UlQ2rTaSG5keqy6jTsJpKkXsPIde+sx5sx3Vge26b3pasddHyf4M1UEsHofho2gFN5c75xtGnvvdBIxWfnX4SH+kmd660uQLxWfU5Aa3IR3Z8bvF0Wx6sYSk55yz0PtwPQKvyafgIYhFxN2w2vaq8T730xd+OeUPEjgUeiNo5l5Kn2yYi6mQO1jlLSeVa10SWBKu+16L3Z+RoEceew1Vw7kAC66f5sBo2dfG3YyONVK5O5y8aMCI935Z1rgAAAABJRU5ErkJggg=="></div></div><div class="cale_dia_semana"><div class="dia_semana" style="margin-left:1%;">D</div><div class="dia_semana">S</div><div class="dia_semana">T</div><div class="dia_semana">Q</div><div class="dia_semana">Q</div><div class="dia_semana">S</div><div class="dia_semana">S</div></div><div class="cale_dia_semana"><div class="dia" id="dia_1" style="margin-left:1%;">1</div><div class="dia" id="dia_2">2</div><div class="dia" id="dia_3">3</div><div class="dia" id="dia_4">4</div><div class="dia" id="dia_5">5</div><div class="dia" id="dia_6">6</div><div class="dia" id="dia_7">7</div></div><div class="cale_dia_semana"><div class="dia" id="dia_8" style="margin-left:1%;">8</div><div class="dia" id="dia_9">9</div><div class="dia" id="dia_10">10</div><div class="dia" id="dia_11">11</div><div class="dia" id="dia_12">12</div><div class="dia" id="dia_13">13</div><div class="dia" id="dia_14">14</div></div><div class="cale_dia_semana"><div class="dia" id="dia_15" style="margin-left:1%;">15</div><div class="dia" id="dia_16">16</div><div class="dia" id="dia_17">17</div><div class="dia" id="dia_18">18</div><div class="dia" id="dia_19">19</div><div class="dia" id="dia_20">20</div><div class="dia" id="dia_21">21</div></div><div class="cale_dia_semana"><div class="dia" id="dia_22" style="margin-left:1%;">22</div><div class="dia" id="dia_23">23</div><div class="dia" id="dia_24">24</div><div class="dia" id="dia_25">25</div><div class="dia" id="dia_26">26</div><div class="dia" id="dia_27">27</div><div class="dia" id="dia_28">28</div></div><div class="cale_dia_semana"><div class="dia" id="dia_29" style="margin-left:1%;">29</div><div class="dia" id="dia_30">30</div><div class="dia" id="dia_31">31</div><div class="dia" id="dia_32">32</div><div class="dia" id="dia_33">33</div><div class="dia" id="dia_34">34</div><div class="dia" id="dia_35">35</div></div><div class="cale_dia_semana"><div class="dia" id="dia_36" style="margin-left:1%;">36</div><div class="dia" id="dia_37">37</div><div class="dia" id="dia_38">38</div><div class="dia" id="dia_39">39</div><div class="dia" id="dia_40">40</div><div class="dia" id="dia_41">41</div><div class="dia" id="dia_42">42</div><div class="cale_bts"><p class="row"><button class="col button button-fill color-green" onClick="afed2(\'.cale2_titulo\',\'.cale\',\'\',\'\');carrega_area(\'0\',\'0\');">OK</button></p></div></div>';
/**********************FIM LAYOUT CALENDARIO******************************/

/**********************TRADUZ MES*****************************************/
function formatdata(mes){var mes_str = '';switch(mes){case 1:mes_str = 'Janeiro';break;case 2:mes_str = 'Fevereiro';break;case 3:mes_str = 'Março';break;case 4:mes_str = 'Abril';break;case 5:mes_str = 'Maio';break;case 6:mes_str = 'Junho';break;case 7:mes_str = 'Julho';break;case 8:mes_str = 'Agosto';break;case 9:mes_str = 'Setembro';break;case 10:mes_str = 'Outubro';break;case 11:mes_str = 'Novembro';break;case 12:mes_str = 'Dezembro';break;}return mes_str;}

function formatdata2(mes){var mes_str = '';switch(mes){case 1:mes_str = 'Jan';break;case 2:mes_str = 'Fev';break;case 3:mes_str = 'Mar';break;case 4:mes_str = 'Abr';break;case 5:mes_str = 'Mai';break;case 6:mes_str = 'Jun';break;case 7:mes_str = 'Jul';break;case 8:mes_str = 'Ago';break;case 9:mes_str = 'Set';break;case 10:mes_str = 'Out';break;case 11:mes_str = 'Nov';break;case 12:mes_str = 'Dez';break;}return mes_str;}
/**********************FIM TRADUZ MES*************************************/

/**********************BT CANCELA*****************************************/
function cale_cancel(id,cancela){
	$( id ).val(cancela);
	afed2('','.cale','','')
	//alert(cancela);
}
/**********************FIM BT CANCELA*************************************/

/**********************GERA BT NAVEGACAO DIA******************************/
function cale_nav_dia(id,dt_nav){
	var dt = new Date(dt_nav);
	var dt2 = new Date(); // DATA ATUAL COM HORA
	$( id ).val(dt.getDate()+'/'+(dt.getMonth()+1)+'/'+dt.getFullYear()); //DATA selecionada
	//alert(dt2);

	var dt_last = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()-1);
	var bt_last = document.getElementById('cale2_last');
	if(dt > dt2){
		bt_last.setAttribute("onclick", "cale_nav_dia('"+id+"','"+dt_last+"');");
		$( '#cale2_last' ).html('<img width="30" style="margin-top:-5px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKlSURBVFhH7ZfHqhVBEIYP6sawUvERjBhxoW6NiD6BGMAcEMS1+SG8iksXPoUB16aFYHanbgwrA8bv01MwHJzp6Zm559zF+eGDmaa7quhQXd0ba6x6mg3LYX0fv20bmabDdrgGz+F3Cc/gKmwFx0y6ZsAReA3/C6iKV3AYtDEpWguPoOj0O9yE83AQdvTx+wLcgh9QHPMQVkGnOgBfIZy8AWdyLqQ0D46BY2L8F9gHneg0/AINO2NnYBbkag6cBW1oS5vabiWXKoL7AJuhrbShrQhyNzTSGvgGGvoIi6ArLYZPoG2XeyVkyZMWB8JNvhFyZEpZ+O+zVM5kHKAHkJWGjoID5ZwNGdLRDXgPrkKVPOnhx+1USzqIPOfJyzkQEVw4vQtV8rZ5C/Z9CdMgqW0QDpzJuhoM7jEsgJROQIypdQi9vuzs/qiT51TT4JR5MvbihA0pvQA7e0PUUZvgQrfBsd7dlTKZRt5zA6fURXDqIjhe35V7fimEs9Sp6io4dQjCzhIbyrQBouNOG0pkcNch+rYJTukrbFlPlmrKBzjll9jEOcpD8hOSF8Mo0swdcOzTv38JXQE7DytRz4esRO0DJxwdt6GmmgZZvOo22ZCSjnzgOMBiIef5OBhkqljwYngH9nVr1SoWlO+NcDKscmu/DXVlwWoR6UD3R26pb5CpgtWtFHvvHjgmS6vBclwDlueW6V3JXBcl/2dYAY20F4qPpi3QVs6cbxxtansXtFLx2emS+Eh3c+fKMZcgllWbp6AT+ciO5RZPt+nBHJaSfU7C4MN9D3Qqn4b3IZyIs2Gx6VXlfeqlL37b5g0RMxZ4IBrvuZQ83RYRkSdzMM+ZSmrnujYyJZj1vRa9P2OPFrHtCVwG+w4lsDLNhGWwro/fto01VrV6vT87ZyI9Q4DocAAAAABJRU5ErkJggg==">');
	}else{
		bt_last.setAttribute("onclick", "");
		$( '#cale2_last' ).html('');
	}
	var dt_next = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()+1);
	var bt_next = document.getElementById('cale2_next');
	bt_next.setAttribute("onclick", "cale_nav_dia('"+id+"','"+dt_next+"')");

	var mes_str2 = formatdata2(parseInt(dt.getMonth())+1);
	$( '.cale2_title' ).html( dt.getDate() + ' ' + mes_str2 + ' de ' + dt.getFullYear() );
	carrega_area('0','0');

}
/**********************FIM GERA BT NAVEGACAO******************************/

/**********************SELECIONA DATA*************************************/
function select_data(id,box,dia,mes,ano){
	var dt = new Date(); // DATA ATUAL COM HORA
	var dt2 = new Date(ano,mes,dia); // DATA SELECIONADA
	if(parseInt(mes) == parseInt(dt.getMonth()) && parseInt(ano) == parseInt(dt.getFullYear())){
		var dt_ini = new Date(dt.getFullYear(), dt.getMonth(), 1);
		var ini_mes = dt_ini.getDay()-1;
		var box_loop = (parseInt(ini_mes) + parseInt(dt.getDate()));
	}else{
		var dt_ini = new Date(ano, mes, 1);
		var ini_mes = dt_ini.getDay()-1;
		var box_loop = (parseInt(ini_mes) + parseInt(1));
	}
	$( '.dia' ).css("backgroundColor", "#FFF");
	$( '.dia' ).css("color", "#666");
	$( '#dia_'+box ).css("backgroundColor", "#4678d2");
	$( '#dia_'+box ).css("color", "#FFF");
	for (i = 0; i < box_loop; i++) {
		$( '#dia_'+(i+1) ).css("color", "#CCC");
		$( '#dia_'+(i+1) ).css("backgroundColor", "#FFF");
	}
	cale_nav_dia(id,dt2);
}
/**********************FIM SELECIONA DATA*********************************/

/**********************CALENDARIO*****************************************/
function cale(id,mes,ano){ 
	var dia = 1; // SETA DIA INICIAL
	$( '.cale' ).slideDown("fast", function() { });
	$( '.cale' ).html(layout); //GERA LAYOUT CALENDARIO
	var val_cancel = $( id ).val();
//	var bt_cancel = document.getElementById('cale_btcan');
//	bt_cancel.setAttribute("onclick", "cale_cancel('"+ id +"','"+ val_cancel +"');");
	//bt_cancel.setAttribute("onclick", "alert('teste')");
	//alert(bt_cancel);
	var dt = new Date(); // DATA ATUAL COM HORA
	var dt2 = new Date(dt.getFullYear(), dt.getMonth(), 1); //MES ATUAL
	var dt3 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()); //DATA ATUAL SEM HORA
/**********************VRIFICA DATA INICIAL*******************************/
	if(mes != '' && ano != ''){
		var dt_ini = new Date(ano, mes-1, 1);
		var ultimo_dia = (new Date(ano, mes , 0 )).getDate();
		$( id ).val(''); //DATA INICIAL
	}else{
		if($( id ).val() != ''){  
			var dt_veio = $( id ).val();
			var dt_veio2 = dt_veio.split("/");
			var dt_veio3 = new Date(dt_veio2[2],(dt_veio2[1]-1),dt_veio2[0]);
			var dt_ini = new Date(dt_veio2[2], (dt_veio2[1]-1), 1);
			var ultimo_dia = (new Date(dt.getFullYear(), dt.getMonth() + 1, 0 )).getDate();
			var dt_veio4 = parseInt(dt_ini.getDay())+parseInt(dt_veio2[0]);
//			alert(dt_veio4);
			$( '#dia_'+dt_veio4 ).css("backgroundColor", "#4678d2");
			$( '#dia_'+dt_veio4 ).css("color", "#FFF");
		}else{
			var dt_ini = new Date(dt.getFullYear(), dt.getMonth(), 1);
			var ultimo_dia = (new Date(dt.getFullYear(), dt.getMonth() + 1, 0 )).getDate();
			$( id ).val(dt.getDate()+'/'+(dt.getMonth()+1)+'/'+dt.getFullYear()); //DATA INICIAL
		}
	}
/**********************FIM VRIFICA DATA INICIAL***************************/

/**********************GERA BT NAVEGACAO**********************************/
	var dt_last = new Date(dt_ini.getFullYear(), dt_ini.getMonth()-1, 1);
	var bt_last = document.getElementById('cale_last');
	if(dt_last >= dt2){
		bt_last.setAttribute("onclick", "cale('"+id+"','"+(dt_last.getMonth()+1)+"','"+dt_last.getFullYear()+"');");
		$( '#cale_last' ).html('<img width="30" style="margin-top:-5px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKlSURBVFhH7ZfHqhVBEIYP6sawUvERjBhxoW6NiD6BGMAcEMS1+SG8iksXPoUB16aFYHanbgwrA8bv01MwHJzp6Zm559zF+eGDmaa7quhQXd0ba6x6mg3LYX0fv20bmabDdrgGz+F3Cc/gKmwFx0y6ZsAReA3/C6iKV3AYtDEpWguPoOj0O9yE83AQdvTx+wLcgh9QHPMQVkGnOgBfIZy8AWdyLqQ0D46BY2L8F9gHneg0/AINO2NnYBbkag6cBW1oS5vabiWXKoL7AJuhrbShrQhyNzTSGvgGGvoIi6ArLYZPoG2XeyVkyZMWB8JNvhFyZEpZ+O+zVM5kHKAHkJWGjoID5ZwNGdLRDXgPrkKVPOnhx+1USzqIPOfJyzkQEVw4vQtV8rZ5C/Z9CdMgqW0QDpzJuhoM7jEsgJROQIypdQi9vuzs/qiT51TT4JR5MvbihA0pvQA7e0PUUZvgQrfBsd7dlTKZRt5zA6fURXDqIjhe35V7fimEs9Sp6io4dQjCzhIbyrQBouNOG0pkcNch+rYJTukrbFlPlmrKBzjll9jEOcpD8hOSF8Mo0swdcOzTv38JXQE7DytRz4esRO0DJxwdt6GmmgZZvOo22ZCSjnzgOMBiIef5OBhkqljwYngH9nVr1SoWlO+NcDKscmu/DXVlwWoR6UD3R26pb5CpgtWtFHvvHjgmS6vBclwDlueW6V3JXBcl/2dYAY20F4qPpi3QVs6cbxxtansXtFLx2emS+Eh3c+fKMZcgllWbp6AT+ciO5RZPt+nBHJaSfU7C4MN9D3Qqn4b3IZyIs2Gx6VXlfeqlL37b5g0RMxZ4IBrvuZQ83RYRkSdzMM+ZSmrnujYyJZj1vRa9P2OPFrHtCVwG+w4lsDLNhGWwro/fto01VrV6vT87ZyI9Q4DocAAAAABJRU5ErkJggg==">');
	}
	var dt_next = new Date(dt_ini.getFullYear(), dt_ini.getMonth()+1, 1);
	var bt_next = document.getElementById('cale_next');
	bt_next.setAttribute("onclick", "cale('"+id+"','"+(dt_next.getMonth()+1)+"','"+dt_next.getFullYear()+"');");
/**********************FIM GERA BT NAVEGACAO******************************/

/**********************GERA TOPO CALENDARIO*******************************/
	var mes_str = formatdata(dt_ini.getMonth()+1);
	$( '.cale_title' ).html( mes_str + ' de ' + dt_ini.getFullYear() );
//	var mes_str2 = formatdata2(dt_ini.getMonth()+1);
//	$( '.cale2_title' ).html( dt.getDate() + ' ' + mes_str2 + ' de ' + dt_ini.getFullYear() );
/**********************FIM GERA TOPO CALENDARIO***************************/

/**********************VERICA DATA E POSICAO NO CALENDARIO****************/
	for (i = 0; i < 42; i++) {
		var dia_age =  new Date(dt_ini.getFullYear(), dt_ini.getMonth(), dia+1);
		var dia_age2 =  new Date(dt_ini.getFullYear(), dt_ini.getMonth(), dia);
    	$( '#dia_'+(i+1) ).html('');
/**********************VERICA DATA ANTERIOR*******************************/
		if(i >= dt_ini.getDay() && dia <= ultimo_dia){
			var bt_dia = document.getElementById('dia_'+(i+1));
		//bt_dia.setAttribute("onclick", "select_data('"+(i+1)+"','"+dia+"','"+dt_ini.getMonth()+"','"+dt_ini.getFullYear()+"');");
			bt_dia.setAttribute("onclick", "select_data('"+id+"','"+(i+1)+"','"+dia+"','"+dt_ini.getMonth()+"','"+dt_ini.getFullYear()+"');");
			$( '#dia_'+(i+1) ).html(dia);
			if( dia_age2 <= dt3 ){
				//alert($( id ).val());
				if($( id ).val() == (dt.getDate()+'/'+(dt.getMonth()+1)+'/'+dt.getFullYear())){  
					$( '#dia_'+(i+1) ).css("color", "#FFF");
					$( '#dia_'+(i+1) ).css("backgroundColor", "#4678d2");
				}
			}
			if( dia_age < dt ){
				$( '#dia_'+(i+1) ).css("color", "#CCC");
				$( '#dia_'+(i+1) ).css("backgroundColor", "#FFF");
				bt_dia.setAttribute("onclick", "");
			}
			dia++;
		}
/**********************FIM VERICA DATA ANTERIOR***************************/

	}
/**********************FIM VERICA DATA E POSICAO NO CALENDARIO************/

}
/**********************FIM CALENDARIO*************************************/
