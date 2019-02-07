// JavaScript Document
function carrega_agenda_eventos{
	
	var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
	var calendarInline = app2.calendar.create({
	  containerEl: '#demo-calendar-inline-container',
	  value: [new Date()],
	  weekHeader: false,
	  renderToolbar: function () {
		return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
		  '<div class="toolbar-inner">' +
			'<div class="left">' +
			  '<a href="#" class="link icon-only"><i class="icon icon-back ' + (app2.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
			'</div>' +
			'<div class="center"></div>' +
			'<div class="right">' +
			  '<a href="#" class="link icon-only"><i class="icon icon-forward ' + (app2.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
			'</div>' +
		  '</div>' +
		'</div>';
	  },
	  on: {
		init: function (c) {
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
	
}

function carrega_agenda_evento{
	
	
	
}