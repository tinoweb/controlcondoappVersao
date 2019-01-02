// JavaScript Document

function carrega_notificacoes(){
var dados = '';
var id_condominio = $( "#DADOS #ID_CONDOMINIO" ).val();
var id_usuario_condominio = $( "#DADOS #ID_USER" ).val();
//alert(id_usuario_condominio);
var foto = '';
//alert(id_condominio);    
//	if(zera ==1){
//		$( "#notificacoes" ).html("")
//	}
//	//processando(1);
//	//var offset = $( ".notificacao" ).length;
//	//var offset = $("#notificacoes").find(".notificacao").size();
//	//alert(offset);
    //alert('entro');
    //var SERVIDOR_CAMINHO = 'https://www.controlcondo.com.br/controlcondo/';
    //alert(ID_CONDOMINIO);
//	$.ajax({
//		type: 'POST',
//        crossDomain: true,
//		url: 'https://www.controlcondo.com.br/controlcondo/appweb/feed_get.php',
//		data: { condominio: '4' },
//        dataType   : 'json',
//        contentType: "application/json; charset=utf-8",
//		success: function(retorno){
//            alert('ok');
//            //alert(retorno);
//			//$( "#notificacoes" ).html(retorno);
//			//$( "#notificacoes" ).append(retorno);
//			processando(0);
//		},
//        error: function(e){
//            alert('erro');
//        }
//	});
$.ajax({
    type       : "POST",
    url        : "https://www.controlcondo.com.br/controlcondo/appweb/feed_get.php",
    crossDomain: true,
    beforeSend : function() { },
    complete   : function() { },
    data       : {id_condominio : id_condominio,id_usuario_condominio : id_usuario_condominio},
    dataType   : 'json',
    success    : function(retorno) {
        //alert(retorno);
        
        for (x in retorno) {
            if(retorno[x]['foto'] == ''){
                if(retorno[x]['masculino'] == 1){
                    foto = 'background-image:url(img/user2.png);';
                }else{
                    foto = 'background-image:url(img/user2.png);';
                }
            }else{
                foto = 'background-image:url(data:image/jpeg;base64,'+retorno[x]['foto']+');';
            }
            var dados_grupo = retorno[x]['grupo'];
            //alert(dados_grupo);
            var grupos = '';
            for(y in dados_grupo){
                if(dados_grupo[y]['titulo'] == 'Morador'){
                    var grupo = '';
                }
                if(dados_grupo[y]['titulo'] == 'Diretoria'){
                    var grupo = '<div class="TagUserDiretoria">'+dados_grupo[y]['titulo']+'</div>';
                }
                if(dados_grupo[y]['titulo'] == 'Síndico'){
                    var grupo = '<div class="TagUserSindico">'+dados_grupo[y]['titulo']+'</div>';
                }
                if(dados_grupo[y]['titulo'] == 'Administração'){
                    var grupo = '<div class="TagUserAdministracao">'+dados_grupo[y]['titulo']+'</div>';
                }
                if(dados_grupo[y]['titulo'] == 'Administradora'){
                    var grupo = '<div class="TagUserAdministradora">'+dados_grupo[y]['titulo']+'</div>';
                }
                
                grupos = grupos+grupo;
                //alert(grupos);
            }
            var feed = '';
            if(grupos.length>0){
                    grupos = '<div style="float:left; width: 100%; ">'+grupos+'</div>';
            }
            //alert(retorno[x]['id']);
            if(retorno[x]['tipo'] == 'Comunicado'){
                feed = '<div class="notificacao" onClick="carrega_comunicado(\''+retorno[x]['id']+'\');"><div class="noti_titulo"><div class="noti_tipo"><strong>'+retorno[x]['tipo']+'</strong></div><div class="noti_icone"></div></div><div class="noti_corpo"><div class="topo_comunicado"><div class="morador_foto" style="'+foto+'"></div><span>'+retorno[x]['datanormal']+'</span><strong>'+retorno[x]['autor']+'</strong>'+grupos+'<span class="criou">Criou um Comunicado</span></div><div style="float: left; width: 90%; padding: 10px;font-size: 14px;">'+retorno[x]['titulo1']+'</div><div class="feed_home"><img width="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJnSURBVHhe7ZrBThtBEETtA+QfQiRy8MkXa23JnwQiRPk4uEHOMQeb8CuJuJMepRwtPTurbddO2t6dJ5VAsz3VNeu2TzMpFAqFQqFQ0Mzn8/PlcvlN9LRarV5Fb0eukHEjeW9DdhzjMKqq+ihGP1WDk5Fkfw5nwHFszGazD2Lyok1PTfISdgdNgmz+qs1OVfISvuBY3ZFN4TtfN7pbLBYXeHy0hIyS9V5l3+Bxd2TTux+89Xr9CY+OnpC1nl0+zN941J26QRCWTwY6P23gDJ2fNnCGzk8bOEPnpw2cofPTBs7Q+a0Guj630DaJtT7CaqDrcwttk1jrI6wGuj630DaJtT7CaqDrcwttk1jrI2gDZ+j8tIEzdH7awBk6P23gDJ3faqDrcwttk1jrI6wGuj630DaJtT7CaqDrcwttk1jrI6wGuj630DaJtT6CNnCGzk8bOEPnpw2cofPTBs7Q+a0Gut4q2PQG7W810PVWwaY3aH+rga63Cja9QftbDXS9VbDpDdqfNnCGzk8bOEPnpw2cofPTBs7Q+WkDZ+j8tIEzdH7ZNPoLEpu6ieh+bFdk/sslqfDpyN9raTn927kZvc+igy5J4YLkc5NhDkmvx6qqLtE+omlPR21FZ7CxgYuSO2WYTW3ToGs7anvwRck9mIRbMfuBgE2NelXTNDTVNQkZQ9Yb+qpsbuQH67OE/V4/wF44yL9p0M/D2lCYhoOmpkvWH8I06HXsHQ7hkHLYR33QIFn/pdewbXC0TkNdqB8mbdOwF0oHTes0oGb4pKYBj0dDNA1YHxeYhofRvgAwlZdwhf8LhV6YTP4AVala2n5mOjUAAAAASUVORK5CYII="><span style="font-size: 10px">'+retorno[x]['comentario']+'</span><img width="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAVGSURBVHhe7ZtNaFxVFMcn8RMXKoLYUlGQWWgEkziTZERKBEUX6koHrUihLmqVFguCFEpLi65Fomi7EBQJgtiNC3UhflRoXYifWKOg1G5MCW0tSGqlpv7O5H+HN2/evK+ZzHvzmD8c3pv/Pefec869c995N5PSEEMM0VdUKpWr7lxFxQTcCj262lp8jBD0AkFf9Arc0uTk5BbpFBcEe40/eJ/sk2oxQYDNBDDr81zryDbu/3Q8sknqxQPBeVfALtElln+Zz6eNJxmnZmZmblBTsUCAgQkwkITHPG2viC4WCKxjAgxwX1gbq2B5YmLietHFAcGFJqBard7nad8uujggqNAEAHtM/q72w+KKA4KKSkCJBLyq9vOzs7NXii4GCCoyAfCbnA4bY1V0MUBQcVbARqdDAh4WXQwQ3BOeBGwT3QJ0Zjw6j4ouBEYJ7mcFdmZ8fPxa8S3wJsmSIXrw4Zv9/aLbgN5L0lmp1WrXiR54xJp9A+2HTQ/9BVGDj7izb4892v9RAt4UPfCw2XdnAKGzj9790rtIVfi46MFG3Nk3oDtnelwvFOX7H3v2Dej+oQR8KWqwQSCxZ5+i5w6P7m7R/QMO3MzAR3D6t26EPr7nWqHLpLO/R7q2Ahatrx7JN/T5GvGVNVQwUHzOOdCt0NccEnv2DejbEVlLP70U+j/HtXNlabuuR/lzru8lFez+5Wp9HOQ+9uwbpqambsfmbeunx/I14hJxnpVwm4ZsBYPXnGLaRxC2f5k9fXkPOSNnf61B0HbctiJ/3hLdCmZgnRRMAt/UooBdIwEeiTX7/QC+fCKfjotqBzO3bEpc3xCVCNi2JIB+9qgpc+DLu/JpUVQ7UDgmpQ9FJQK2LgFHWXZb6vX6JWrKFHbASkxLiu0z0e2wwBXAMVGJgJ3bA14XlRVGmIC77JAVeQp/flFcdsjypHTageIBBbAsKhHykgB82Gd+BMghmkdWtQKAwi6nbJui6NjALhcJYPwXXRxO4D7lbfNSqQTDVwvURMcGdnn5Coyy1O/Fl/3I3+YTYq/ZN6k9GBa0lFPVAtjlJQFN4MuDLiYk/B2j21oAm9wlwIA/p+TXvKjOQCl1LZDHBPhOmaJjQjF1LYBd3hJgb6TuL03hj0AHFD+SQeJaAJvME8DYDyDzyPv48qtiMZ8WxsbGLpdaZ6CYuhbALvMEMP5x88Er+HOCanBMKuHAIHUtgE0eVsBefDjjYpDE39C7qQWwyc0egB/34Mei/Dk7PT19tZrCYUGbkUnSWgCbXG2C+LLZxYJPD4kORze1APq5SgC7fvOg1V6KREeDAFLVAnlLAH486xLA/UbR0cAgVS2ATS4SYN93/NiMH2flz4lyuXyFmqOBUapaAP1MEsBSrzJmo9z1C/wFrsl+Z4BRaC3AgHbI+AHyAh+b79d8ziQBjLfVxvUL/FKalzoLpGMtQPBlOrasuoHqasosAVbhMeZOxj7k9Y3gJ6WSDGG1ANzdrk2yQ02ZJcALxrbX38YROPdzopPBgrYOTAKW0Aj8O8h/yBHvsTefc7EJMv5X5gdyVFQyxKkF4C/TbRNwjQQg9vppP34+jTM/sivfKJW+gHHdT25/EJUcGLta4ICoSKDvEtAi9LFTKmsOPRHcn+iC/woUBxi7WuBbZGtMaSQN+Qk5iLiXkpO0Pe/T7akwxtNcX+bqzgBX+Jz4XLMJOvhYHSUWBm7sAdxv97f1Ubr7jQEd7PB1GFdWrE5QN/ZVegbupE9nLeU7Nu5HNHx3wPn1dHZLEun03x48LTYE6fdSivS7wiGGGGKIIdYepdL/BmpipX1GtvYAAAAASUVORK5CYII="><span style="font-size: 10px">'+retorno[x]['curtida']+'</span></div><div>Anexo:'+retorno[x]['anexo']+'</div></div></div>';
            }
            if(retorno[x]['tipo'] == 'Documento'){
                feed = '<div class="notificacao"><div class="noti_titulo"><div class="noti_tipo"><strong>'+retorno[x]['tipo']+'</strong></div><div class="noti_icone" style="background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAT9SURBVHhe7ZtNbxtVFIazYsEP4CcipGSPkICKVaF21rQsEqmLGCoCpQu6KCpC/IAGqarSRQuFBlqpUpI2NJ+O8Ts5j7kdH9tnxuPxVPIrPWo6Z47vee7Y8bhplhZZZLpce//au+2V9U/ay+vb/T9PVlfWezWy01/z80uXbrxj49Sb1gfX32uvrN1zBquX5bXLNlJ9Mfn7GuDqpzcGw5zsPi7M2at/er3DvYxu/2vveArnPPlti3V3bKx6ksp/9dm3vdv3X5begLLywLo22uzjyd95fFxqA6aVP917Uu8GjJIvswFVyJ+/3q1vA8bJF92AquRVY90RVPMuMUl+8gb83use7mZfVykvWHcs07xLROTHb8CFvNIdIVZWXrDu7vbdIR7+fJt6uXeJqLxgkHRggfwgJ68Ly3eP9lx5wbreBgjqphRPdoe3vL6l5knygoUYOiW78srxq8LyZwfPs9bz4wP3XNb15AV104pndWXtYzXqJmeS/M1f/8oWufrRxmDwgQCSJa782cGz/uvmLNuA3nm3/xj/Dp2PoCcvqJtWPP0NeEhzlF+++WkwfF6yqHz3aP9CPJ/Tozd6WNuTF9RNK54iH2x05SV/+OKRK1lUXmSveT3tdeWV+p8BF43pUFEqkecbnqQVR14wpycvqJtWPDSmg0WoVB5yT/sU5vTkBXXTiofGdLhJzER+AszpyQvqphUPjemA45iHvGBOT15QN614aEyH9Nj4YnOwSFE2rmxmjyH5TuuHoXqnfcuVTuFcT15QN614aMwL5+m0bw4WKUqn9d3gyn+9emuormOedArnevKCumnFQ6MnDfN62qcwpycvqJtWPDSmA6c0QV4wpycvqJtWPDSmQ0Mq2blS/iWQJ/Kaz0OvJy+om1Y8NI6T11XV65hzpyXyms9DrycvqJtWPDSOk/eOp8zqaZ/CnJ68oG5a8dDoSTZFXjCnJy+om1Y8NOYlmyQvmNOTF9RNKx4amywvmNOTF9RNKx4aWWiUfKc1fAMzLdF3A81EjycvqJtWPDSykCcvvDu4aYm8GzATPZ68oG5a8dA4Tj4/DMz6aZ+ux5yevKBuWvHQyEJNlBfM6ckL6qYVD41aZJx8kU+DZe70UvLytWzApCtf5E6wzJ0eePKCx/bkBXXTiofGyDB1P+1TmNOTF9RNKx4aJw0zT3nBnJ68oG5a8dA4bph5ywvm9OQFddOKh8ZRwzRBXjCnJy+om1Y8NOaH0Q87T/f/bIS8YE5PXlA3rXhozMtn6Z72B90fGrwKisgL5vTkBXXTiofGdDFd+Uz+6KU7/LQUlRfM6ckL6qYVD40s9P9rvhlXHpjTkxfUTSseGvVv9+k3PH36y9/RTX2s9f0bUrq75GcGk44xpycvqJtWPDSK9Bsex1KJKo6lYkWPCU9eUDeteNIH9wau4lj34NngmCcWPSY8eUHdtOKhMX//rr9XcUzyktBnCZGKFTnGnJ68oG5a8dCYClQF8lXAnJ68oG5a8dDoCUxDlfKCOT15Qd204qHRkyhL1fKCOT15Qd204mkvr/2txqcPHrkyRZmF/B9b9zK5Lz+87sqL0hug/15Kc9O5s77pygvOMa149B+MbRN2eJCmoSsv+RcPfHnBuaZVXXhgb9EmsdiAxQbMaAN4l9i++6O7cBPQbLYB1f9S1dv0LjGTX6t7G94l+uxoxrn9YuUiiyzS8Cwt/QfJiFjbBxkPMAAAAABJRU5ErkJggg==);"></div></div><div class="noti_corpo"><div class="topo_comunicado"><div class="morador_foto" style="'+foto+'"></div><span>'+retorno[x]['datanormal']+'</span><strong>'+retorno[x]['autor']+'</strong>'+grupos+'<span class="criou">Criou um Documento</span></div><div style="float: left;margin-left: 48px; width: 80%; padding: 10px;font-size: 14px;">'+retorno[x]['titulo1']+'</div></div></div>';
            }
            if(retorno[x]['tipo'] == 'Enquete'){
                feed = '<div class="notificacao" onClick="carrega_enquete(\''+retorno[x]['id']+'\');"><div class="noti_titulo"><div class="noti_tipo"><strong>'+retorno[x]['tipo']+'</strong></div><div class="noti_icone" style="background-image:url(data:image/png;base64,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);border-color:#4167b2"></div></div><div class="noti_corpo"><div class="topo_comunicado"><div class="morador_foto" style="'+foto+'"></div><span>'+retorno[x]['datanormal']+'</span><strong>'+retorno[x]['autor']+'</strong>'+grupos+'<span class="criou">Criou uma Enquete</span></div><div style="float: left;margin-left: 48px; width: 80%; padding: 10px;font-size: 14px;">'+retorno[x]['titulo1']+'</div></div></div>';
            }
            if(retorno[x]['tipo'] == 'Correspondencia'){
                feed = '<div class="notificacao"><div class="noti_titulo"><div class="noti_tipo"><strong>'+retorno[x]['tipo']+'</strong></div><div class="noti_icone" style="background-image:url(data:image/png;base64,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);"></div></div><div class="noti_corpo"><div class="topo_comunicado"><div class="morador_foto" style="'+foto+'"></div><span>'+retorno[x]['datanormal']+'</span><strong>'+retorno[x]['autor']+'</strong>'+grupos+'<span class="criou">Recebeu a correspondência</span></div><div style="float: left;margin-left: 48px; width: 80%; padding: 10px;font-size: 14px;">'+retorno[x]['titulo1']+'</div></div></div>';
            }
            dados = dados + feed;
        }
        dados = '<div class="scrollable"><div class="wrap"><div class="topcoat-list__container list">'+dados+'</div></div></div>'
        $( "#notificacoes" ).html(dados);
    },
    error      : function() {
        alert('Erro ao carregar');                  
    }
});     
}


setTimeout(function(){
	
	$(".panel-open").on("click",function(){

		var status = $(this).attr("class");

		if(status.indexOf("aberto") >=0){
			$(".panel-backdrop").next().addClass("panel-cover").removeClass("aberto");
			$(this).removeClass("aberto");
			alert(1);
		}else{
			$(this).addClass("aberto");
			$(".panel-backdrop").next().removeClass("panel-cover").removeClass("aberto").addClass("panel panel-left panel-reveal");
			alert(2);
		}

		});
   },500);
