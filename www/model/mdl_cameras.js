// JavaScript Document

//FUNCAO CARREGA TODAS AREAS COMUNS
function carrega_cameras(){
    afed('#cameras_condominio','#home','','',3,'cameras_condominio');
    var tamanhow = $("#cameras_scroll").width();
    var tamanhoh = (tamanhow * 0.56);
    $(".caixa_camera").width(tamanhow/2)
    $(".caixa_camera").height(tamanhoh/2);
    
	
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/cameras_get.php',
        crossDomain: true,
        beforeSend : function() { },
        complete   : function() { },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val()},
        dataType   : 'json',
		success: function(retorno){
            var ttcan = retorno.length;
            var cont = 0;
            var cont_can = 0;
            dados = '';
            for (x in retorno) {
                cont++;
                cont_can++;
                if(cont_can == 1){ var grid = '<div class="row no-gap">'; var grid2 = ''; };
                if(cont_can == 2){ var grid = ''; var grid2 = '</div>'; cont_can = 0; };
                var dado = grid+'<div class="col"><video id="video_'+cont+'" style="width: 100%;" src="'+retorno[x]['url']+'" autoplay poster="img/bg_sem_video2.jpg" onClick="camera_play('+cont+');"></video></div>'+grid2;
                dados = dados + dado;
            }
            if (ttcan % 2 === 0){
            }else{
                var dado = '<div class="col"><video style="width: 100%;" src="" autoplay  poster="img/bg_sem_video.jpg"></video></div></div>';
                dados = dados + dado;
            }

            $( "#cameras_retorno" ).html(dados);
		}
	});	
}

function camera_play(cam){
    var x = document.getElementById("video_"+cam);
    if (x.paused){
        x.load();
    }else{
        if(x.requestFullScreen){
            x.requestFullScreen();
        } else if(x.webkitRequestFullScreen){
            x.webkitRequestFullScreen();
        } else if(x.mozRequestFullScreen){
            x.mozRequestFullScreen();
        }
    }
}
