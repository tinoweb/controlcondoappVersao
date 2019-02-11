// JavaScript Document
function carrega_agenda_eventos(){
	$('#calendario_agenda').html('');
	let html       = '';
	let icon       = '';
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
	
	let cor = '';
	
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
			  dayClick: function(calendar, dayEl, year, month, day){
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
				  for(x = 0;x <=7; x++){
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
}

