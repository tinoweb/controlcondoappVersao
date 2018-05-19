// JavaScript Document

function carrega_notificacoes(tipo){
var dados = '';
var id_condominio = $( "#DADOS #ID_CONDOMINIO" ).val();
var id_usuario_condominio = $( "#DADOS #ID_USER" ).val();
var foto = '';
app.controler_pull("home");
if(tipo == 0){	
    var pg = 1;
}else{
    var offset = $('.notificacao').length;
    //alert(offset);
    //var offset = $("#main_feed").find(".notificacao").size();

    if(offset != 0){
        var pg = (offset/10)+1;
    }else{
        var pg = 1;
    }
	if(parseInt(pg) != parseFloat(pg)) { 
		pg = pg+1; 
	}	
}
var dados_grupo = '';
var grupos      = '';
var width       = 0 ;
var grupo       = '';
var feed        = '';
$.ajax({
    type       : "POST",
    url        : localStorage.getItem('DOMINIO')+"appweb/feed_get.php",
    crossDomain: true,
    beforeSend : function() { },
    complete   : function() { },
    data       : {id_condominio : id_condominio,id_usuario_condominio : id_usuario_condominio, pg : parseInt(pg)},
    dataType   : 'json',
    success    : function(retorno) {
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
            dados_grupo = retorno[x]['grupo'];
            //alert(dados_grupo);
            grupos = '';
            width  = 0 ;
            for(y in dados_grupo){
                width = width + (y*15);
                if(dados_grupo[y]['titulo'] == 'Morador'){
                    grupo = '';
                }else{
                    grupo = '<div class="TagPadrao" style="background-color:'+dados_grupo[y]['fundo_cor']+';color: '+dados_grupo[y]['texto_cor']+';border: 1px solid '+dados_grupo[y]['fundo_cor']+';">'+dados_grupo[y]['titulo']+'</div>';
                }
                grupos = grupos+grupo;
                //alert(grupos);
            }
            feed  = '';
            if(grupos.length>0){
                if(width==0){
                    width = 10;
                }else if(width>100){
                    width = 100;
                }
                grupos = '<div style="margin-left: 8px;float:left; width: '+width+'%; ">'+grupos+'</div>';
            }
            //alert(retorno[x]['id']);
            if(retorno[x]['tipo'] == 'Comunicado'){
                feed = '<div class="notificacao" onClick="carrega_comunicado(\''+retorno[x]['id']+'\');"><div class="noti_titulo"><div class="noti_tipo">'+retorno[x]['tipo']+'</div><div class="noti_icone"></div></div><div class="noti_corpo"><div class="topo_comunicado"><div class="morador_foto" style="'+foto+'"></div><span>'+retorno[x]['datanormal']+'</span><strong>'+retorno[x]['autor']+'</strong>'+grupos+'<span class="criou">Criou um Comunicado</span></div><div style="float: left; width: 90%; padding: 10px;font-size: 14px;">'+retorno[x]['titulo1']+'</div><div class="feed_home">';
                
                if(retorno[x]['comentario']>0){
                    feed = feed + '<img width="15" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKFSURBVHhe7ZpNThwxEIUni5A7kEjJ6YgghAMEqXsLsi3Ekmsku5A1YcHfVTJiP7E7hdSUbeia107NdPuT3oJx+fnVUDM9Cy8qlUqlUqlUOG3b7rTGHbXWXXs9eq02XI+Nsb8ba7+E7NTGerSnp7ve6D5xyHbIuLvQA7Uj4+v5+bvW2Iek8RbJ/wNv15oE/+4dpgy3UsYdUFvD8RvDZ75nZL9/c+49LW8sIWNj3I9+9vCdQMvD8Ruff+GdnHygpY0nZH2W3bolLQ2HGazo5a0Bzg8bKAPnhw2UgfPDBsrA+WEDZeD8sIEycH6pAa8vLTo2i7Q+QmrA60uLjs0irY+QGvD60qJjs0jrI6QGvL606Ngs0voI2EAZOD9soAycHzZQBs4PGygD55ca8PrSomOzSOsjpAa8vrTo2CzS+gipAa8vLTo2i7Q+QmrA60uLjs0irY+ADZSB88MGysD5YQNl4PywgTJwfqkBr5eKbEYD9pca8HqpyGY0YH+pAa+XimxGA/aXGvB6qchmNGB/2EAZOD9soAycHzZQBs4PGygD54cNlIHzwwbKwPn9pnlfkAjXSvom4drJvK7I/L9LUsvGuc+L1eoNHZ0ksW+41rok9e+C5F3SsIAaay+PjflIx0ek9gzUzd7FxVuykUEXJW8TpqWUnYZE7RDdrH1R8okwCd21U2uvvOGSHVBEqWlI1WXkM9or77EPX5UtTXt29sl/zH4lmuga6U8DX+8MJoFvMDQaGuZNdjLuZ5gG/jrtng6hyTD6vNEg/xj7w1+jbRPjtWnoiXZMk5em4UlUOmFemQaqmj65aaDlmZCYBlqZF93j0D8WZ/sGdPhp8L/09uivSmUUFou/iNJ/GAhnlLQAAAAASUVORK5CYII="><span style="font-size: 10px;color: #7f8c8d">&nbsp;'+retorno[x]['comentario']+'&nbsp; &nbsp; &nbsp; </span>';
                }
                if(retorno[x]['curtida']>0){
                    feed = feed + '<img width="15" src="data:image/png;base64,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"><span style="font-size:10px; color: #7f8c8d">&nbsp;'+retorno[x]['curtida']+'</span>&nbsp; &nbsp; </span>';
                }
                if(retorno[x]['anexo']>0){
                    feed = feed + '<img width="15" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASkSURBVHhe7Zr7ixNXFMejVeuzP0gfouCzLfZhtegvohSkFFFBRBFKi7+0ICgrRcUf7Ca5UKiYufcmG7u2u7oiiiDkLxAR/UXQForV1QqyylZrH2uhLYIIbd1+z+TcZPLYvDY7mZudDwwk58zcnM/cO3deiYSEhISEhIRYiUilFgqtN8aV+jgm5SZ8fpVT7YsQYpJQ6hMh1U2h9HCZ5Y6QugPrTeFN2geRSMyNS/VtGenSBTuo03GW8Kb2g15/HVI/G8G41I+wfBlT6v2oUu/GtF6HQ0HElX6Y3xHqj7Y4LIrlMcQzIp1+gdMF7NV6GtY/ZtbFDrmFw2Eqp4NJVOvlkPpCOM4cDuUolVc9keHhCZwekcKdoD7jcPBAoWtxXD/OyumvOewSTSRea0SecEdCfttBDgeLQnn1DN+3cKpEHr34Ta3yBmwTM9sLKd/mcDAolseE9imnmiJPxJzkGtMGJsltHG491eQxcT0YrTwRTaXeMO3gN3dyuLXUI+/OCQ3KExj275m2AjECKsnT+bqZ8gTaiOfaU2oph1tDPfIY9kdHLS96p+N3fuE2BzjcGvyWJ/AbJ02bGAkdHPafSvJ0rT5G8ol8m/p6y26M6pFHL3U3Wx6/OSSSycWc8pexkN+eyTyHdiRNkOV6taDncbMknNQKTvlLNXkI3M8VqtRXtcpju4zZDneBH3DKpVie7i845S9+yGO7a947PCvk6Vhshjza/QG/8yKn7ZTH5yO1yKOXJ9Uqj9xQ28sfTKdf4rQ98hjqP5lC8TkdylehWJ4uZKyT75RykR/ywnHe4ZS/1CMPoa4Gh/2NcSuPnu+vMuyXccpfqskjPpgvdBzJu+/oPPIYBanxI4+bEgh/n5doTB7t3rROnoDwrlyhSvWNhXzLHmnT0xoU8RcXUiJPYOdcoTyG78MDicQsDo9IOXkIvszp4Mjvl3IGirnNhZSVJ5B7Susgf4JDI2KNPIGh3ZkrRqlDHC4Bhf6bLRizfgWK5TFiblWSjyaTb3HKf+jNK4b2n1woPVObyKkSsN5dLvw7DpVglTwR13p7viC5lcNloVk/t26Zty87e3snF8sf7Op6hdMF8sj93nJ5AkW5j5Rp9t+TTj/P4bJ8rvU8rPe3K+EeDkrFnNRqXBgtwOctZpLk/I+BlydQdPZvKFJf4FBFILoZcu5kONICwX4r5AkU5V7VYUec4lBVqNdxOFwzUmaB3D/YOT2iu3smrxpseQKF3XMLlPoMh2oDF0EimVyF7XZD8oBw9EfeyY4olkf+TU4FBxR3lQu8xKGmYIU8gWM6+/8aqZ7QS0YOjwpr5AmavXPFSrmDww3jlcdO/S3Q8gRfBj/iogdwIdPwy0Xr5A0YBftM4ZA4zuG6sFaeQK9P9Z7WICMrXRJ7oas/bHvUK0//1+G0PYjDXfNR/FBeRJ+vds52T4NKXbZe3kDCEBkwQpjB/8OOOIce3kNvaLGsxLIek+VeyF7E8syzbj+9EOWm7EVoPRvCZ71yFZfsPUGf9+qvLaB/ZUPwtOcMUbCgx3+lCdOqya4R6JU1PaSMSbkBh8OHdAi40jU8DwwJCQkJCQkKkcj/IsxYDdBU2bkAAAAASUVORK5CYII="><span style="font-size: 10px;color: #7f8c8d">&nbsp;'+retorno[x]['anexo']+'&nbsp;&nbsp;</span>';
                }
                feed = feed + '</div></div></div>';
            }
            if(retorno[x]['tipo'] == 'Documento'){
                feed = '<div class="notificacao"><div class="noti_titulo"><div class="noti_tipo">'+retorno[x]['tipo']+'</div><div class="noti_icone" style="background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAT9SURBVHhe7ZtNbxtVFIazYsEP4CcipGSPkICKVaF21rQsEqmLGCoCpQu6KCpC/IAGqarSRQuFBlqpUpI2NJ+O8Ts5j7kdH9tnxuPxVPIrPWo6Z47vee7Y8bhplhZZZLpce//au+2V9U/ay+vb/T9PVlfWezWy01/z80uXbrxj49Sb1gfX32uvrN1zBquX5bXLNlJ9Mfn7GuDqpzcGw5zsPi7M2at/er3DvYxu/2vveArnPPlti3V3bKx6ksp/9dm3vdv3X5begLLywLo22uzjyd95fFxqA6aVP917Uu8GjJIvswFVyJ+/3q1vA8bJF92AquRVY90RVPMuMUl+8gb83use7mZfVykvWHcs07xLROTHb8CFvNIdIVZWXrDu7vbdIR7+fJt6uXeJqLxgkHRggfwgJ68Ly3eP9lx5wbreBgjqphRPdoe3vL6l5knygoUYOiW78srxq8LyZwfPs9bz4wP3XNb15AV104pndWXtYzXqJmeS/M1f/8oWufrRxmDwgQCSJa782cGz/uvmLNuA3nm3/xj/Dp2PoCcvqJtWPP0NeEhzlF+++WkwfF6yqHz3aP9CPJ/Tozd6WNuTF9RNK54iH2x05SV/+OKRK1lUXmSveT3tdeWV+p8BF43pUFEqkecbnqQVR14wpycvqJtWPDSmg0WoVB5yT/sU5vTkBXXTiofGdLhJzER+AszpyQvqphUPjemA45iHvGBOT15QN614aEyH9Nj4YnOwSFE2rmxmjyH5TuuHoXqnfcuVTuFcT15QN614aMwL5+m0bw4WKUqn9d3gyn+9emuormOedArnevKCumnFQ6MnDfN62qcwpycvqJtWPDSmA6c0QV4wpycvqJtWPDSmQ0Mq2blS/iWQJ/Kaz0OvJy+om1Y8NI6T11XV65hzpyXyms9DrycvqJtWPDSOk/eOp8zqaZ/CnJ68oG5a8dDoSTZFXjCnJy+om1Y8NOYlmyQvmNOTF9RNKx4amywvmNOTF9RNKx4aWWiUfKc1fAMzLdF3A81EjycvqJtWPDSykCcvvDu4aYm8GzATPZ68oG5a8dA4Tj4/DMz6aZ+ux5yevKBuWvHQyEJNlBfM6ckL6qYVD41aZJx8kU+DZe70UvLytWzApCtf5E6wzJ0eePKCx/bkBXXTiofGyDB1P+1TmNOTF9RNKx4aJw0zT3nBnJ68oG5a8dA4bph5ywvm9OQFddOKh8ZRwzRBXjCnJy+om1Y8NOaH0Q87T/f/bIS8YE5PXlA3rXhozMtn6Z72B90fGrwKisgL5vTkBXXTiofGdDFd+Uz+6KU7/LQUlRfM6ckL6qYVD40s9P9rvhlXHpjTkxfUTSseGvVv9+k3PH36y9/RTX2s9f0bUrq75GcGk44xpycvqJtWPDSK9Bsex1KJKo6lYkWPCU9eUDeteNIH9wau4lj34NngmCcWPSY8eUHdtOKhMX//rr9XcUzyktBnCZGKFTnGnJ68oG5a8dCYClQF8lXAnJ68oG5a8dDoCUxDlfKCOT15Qd204qHRkyhL1fKCOT15Qd204mkvr/2txqcPHrkyRZmF/B9b9zK5Lz+87sqL0hug/15Kc9O5s77pygvOMa149B+MbRN2eJCmoSsv+RcPfHnBuaZVXXhgb9EmsdiAxQbMaAN4l9i++6O7cBPQbLYB1f9S1dv0LjGTX6t7G94l+uxoxrn9YuUiiyzS8Cwt/QfJiFjbBxkPMAAAAABJRU5ErkJggg==);"></div></div><div class="noti_corpo"><div class="topo_comunicado"><div class="morador_foto" style="'+foto+'"></div><span>'+retorno[x]['datanormal']+'</span><strong>'+retorno[x]['autor']+'</strong>'+grupos+'<span class="criou">Criou um Documento</span></div><div style="float: left; width: 90%; padding: 10px;font-size: 14px;">'+retorno[x]['titulo1']+'</div></div></div>';
            }
            if(retorno[x]['tipo'] == 'Enquete'){
                feed = '<div class="notificacao" onClick="carrega_enquete(\''+retorno[x]['id']+'\');"><div class="noti_titulo"><div class="noti_tipo">'+retorno[x]['tipo']+'</div><div class="noti_icone" style="background-image:url(data:image/png;base64,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);border-color:#4167b2"></div></div><div class="noti_corpo"><div class="topo_comunicado"><div class="morador_foto" style="'+foto+'"></div><span>'+retorno[x]['datanormal']+'</span><strong>'+retorno[x]['autor']+'</strong>'+grupos+'<span class="criou">Criou uma Enquete</span></div><div style="float: left; width: 90%; padding: 10px;font-size: 14px;">'+retorno[x]['titulo1']+'</div></div></div>';
            }
            if(retorno[x]['tipo'] == 'Correspondencia'){  
				titulo1 = retorno[x]['titulo1'];
				if(titulo1==null){
					titulo1='';
				}
                feed = '<div class="notificacao"><div class="noti_titulo"><div class="noti_tipo">Correspondência</div><div class="noti_icone" style="background-image:url(data:image/png;base64,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);"></div></div><div class="noti_corpo"><div class="topo_comunicado"><span>'+retorno[x]['datanormal']+'</span><strong>'+retorno[x]['autor']+'</strong><span class="criou">Recebeu uma correspondência ('+retorno[x]['tipo_cor']+')</span></div><div style="float: left;margin-left: 48px; width: 90%; padding: 10px;font-size: 14px;">'+titulo1+'</div></div></div>';
            }if(retorno[x]['tipo'] == 'Ocorrencia'){ 
				  
				titulo1 = retorno[x]['titulo1'];
				if(titulo1==null){
					titulo1='';
				}
                feed = '<div class="notificacao" onClick="carrega_ocorrencia(\''+retorno[x]['id']+'\');" ><div class="noti_titulo"><div class="noti_tipo">Ocorrência</div><div class="noti_icone" style="background-image:url(data:image/png;base64,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);"></div></div><div class="noti_corpo"><div class="topo_comunicado"><span>'+retorno[x]['datanormal']+'</span><strong>'+retorno[x]['autor']+'</strong><span class="criou">Ocorrência ('+retorno[x]['id']+')</span></div><div style="float: left; width: 90%; padding: 10px;font-size: 14px;">'+titulo1+'</div></div></div>';
            
			}
            dados = dados+feed;
        }
		if(tipo == 0){
			$("#main_feed").html("");
		}
        $( "#main_feed" ).append(dados);
    },
    error: function(error) {
        console.dir(error);
        //alert('Erro ao carregar ');                  
    }
}).done(function(){
	console.log("feito");
});
}