// JavaScript Document
var layout = '<div class="cale_titulo"><div class="cale_last" id="cale_last"></div><div class="cale_title">Setembro de 2017</div><div class="cale_next" id="cale_next">></div></div><div class="cale_dia_semana"><div class="dia_semana" style="margin-left:1%;">D</div><div class="dia_semana">S</div><div class="dia_semana">T</div><div class="dia_semana">Q</div><div class="dia_semana">Q</div><div class="dia_semana">S</div><div class="dia_semana">S</div></div><div class="cale_dia_semana"><div class="dia" id="dia_1" style="margin-left:1%;">1</div><div class="dia" id="dia_2">2</div><div class="dia" id="dia_3">3</div><div class="dia" id="dia_4">4</div><div class="dia" id="dia_5">5</div><div class="dia" id="dia_6">6</div><div class="dia" id="dia_7">7</div></div><div class="cale_dia_semana"><div class="dia" id="dia_8" style="margin-left:1%;">8</div><div class="dia" id="dia_9">9</div><div class="dia" id="dia_10">10</div><div class="dia" id="dia_11">11</div><div class="dia" id="dia_12">12</div><div class="dia" id="dia_13">13</div><div class="dia" id="dia_14">14</div></div><div class="cale_dia_semana"><div class="dia" id="dia_15" style="margin-left:1%;">15</div><div class="dia" id="dia_16">16</div><div class="dia" id="dia_17">17</div><div class="dia" id="dia_18">18</div><div class="dia" id="dia_19">19</div><div class="dia" id="dia_20">20</div><div class="dia" id="dia_21">21</div></div><div class="cale_dia_semana"><div class="dia" id="dia_22" style="margin-left:1%;">22</div><div class="dia" id="dia_23">23</div><div class="dia" id="dia_24">24</div><div class="dia" id="dia_25">25</div><div class="dia" id="dia_26">26</div><div class="dia" id="dia_27">27</div><div class="dia" id="dia_28">28</div></div><div class="cale_dia_semana"><div class="dia" id="dia_29" style="margin-left:1%;">29</div><div class="dia" id="dia_30">30</div><div class="dia" id="dia_31">31</div><div class="dia" id="dia_32">32</div><div class="dia" id="dia_33">33</div><div class="dia" id="dia_34">34</div><div class="dia" id="dia_35">35</div></div><div class="cale_dia_semana"><div class="dia" id="dia_36" style="margin-left:1%;">36</div><div class="dia" id="dia_37">37</div><div class="dia" id="dia_38">38</div><div class="dia" id="dia_39">39</div><div class="dia" id="dia_40">40</div><div class="dia" id="dia_41">41</div><div class="dia" id="dia_42">42</div></div>';function formatdata(mes){var mes_str = '';switch(mes){case 1:mes_str = 'Janeiro';break;case 2:mes_str = 'Fevereiro';break;case 3:mes_str = 'Março';break;case 4:mes_str = 'Abril';break;case 5:mes_str = 'Maio';break;case 6:mes_str = 'Junho';break;case 7:mes_str = 'Julho';break;case 8:mes_str = 'Agosto';break;case 9:mes_str = 'Setembro';break;case 10:mes_str = 'Outubro';break;case 11:mes_str = 'Novembro';break;case 12:mes_str = 'Dezembro';break;}return mes_str;}





function cale(id,mes,ano){ 
	var dia = 1;
	$( '.cale' ).slideDown("fast", function() { });
	$( '.cale' ).html(layout);
	var dt = new Date();
	var dt2 = new Date(dt.getFullYear(), dt.getMonth(), 1);
	if(mes != '' && ano != ''){
		var dt_ini = new Date(ano, mes-1, 1);
		var ultimo_dia = (new Date(ano, mes , 0 )).getDate();
	}else{
		var dt_ini = new Date(dt.getFullYear(), dt.getMonth(), 1);
		var ultimo_dia = (new Date(dt.getFullYear(), dt.getMonth() + 1, 0 )).getDate();
	}
	var dt_last = new Date(dt_ini.getFullYear(), dt_ini.getMonth()-1, 1);
	var bt_last = document.getElementById('cale_last');
	if(dt_last >= dt2){
		bt_last.setAttribute("onclick", "cale('"+id+"','"+(dt_last.getMonth()+1)+"','"+dt_last.getFullYear()+"');");
		$( '#cale_last' ).html('<');
	}
	var dt_next = new Date(dt_ini.getFullYear(), dt_ini.getMonth()+1, 1);
	var bt_next = document.getElementById('cale_next');
	bt_next.setAttribute("onclick", "cale('"+id+"','"+(dt_next.getMonth()+1)+"','"+dt_next.getFullYear()+"');");
	var mes_str = formatdata(dt_ini.getMonth()+1);
	$( '.cale_title' ).html( mes_str + ' de ' + dt_ini.getFullYear() );
	for (i = 0; i < 42; i++) { 
    	$( '#dia_'+(i+1) ).html('');
		if(i >= dt_ini.getDay() && dia <= ultimo_dia){
			$( '#dia_'+(i+1) ).html(dia);
			dia++;
		}
	}
}