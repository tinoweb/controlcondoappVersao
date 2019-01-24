// JavaScript Document

// FUNCAO CARREGA TODOS OS COMUNICADOS
function carrega_ocorrencias(tipo){
	$("#anexo_oco img[name='foto']").remove();
	$("#anexo_oco").hide();
	"use strict";
	localStorage.setItem('TELA_ATUAL','ocorrencias');
	$("#ol_ordem").val(tipo);
	//tipo 0 = todas || 4 = data crescente || 5 = data decrescente || 6 = Situacao || 7= Prioridade
	app.controler_pull("ocorrencias");
	var pg = 0;
    if(tipo == 0 || tipo==3 || tipo==4){
        pg = 1;
    }
    if(parseInt(pg) !== parseFloat(pg)) { 
        pg = pg+1; 
    }
	
    var dados = '';
	var dado  = '';
	var cor_status='yellow';
	var cor  = '';
    var dados_form = $( "#form_busca_ocorrencias" ).serialize();
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/ocorrencia_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : 'id_usuario_condominio='+$( "#DADOS #ID_USER" ).val()+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&pg='+parseInt(pg)+'&titulo='+$("#f_ocorrencia").val()+'&id_morador='+$( "#DADOS #ID_MORADOR" ).val()+'&tipo='+tipo+'&'+dados_form,
        dataType   : 'json',
		
		success: function(retorno){            
			var cont=0;
            for (x in retorno) {
				cont++;
                cor_status = retorno[x].id_situacao;
				if(cor_status == 1){
					cor_status = 'rgba(238, 238, 238, 0);border: 1px solid black;border-radius: 13px;';
				}else if(cor_status=='10'){
					cor_status='#80ce38';
				}else{
					cor_status='yellow';
				}
				
				if(retorno[x].visualizacao != null ){
				    cor = 'background:#e85252 !important;color:white';
			     }else{
					cor = '';
				 }
							
                 dado = '<div class="card" onClick="carrega_tickets(0);check_leitura(5,'+retorno[x].id_ocorrencia+');carrega_ocorrencia(\''+retorno[x].id_ocorrencia+'\');"  >'
							+'<div class="feed-ocorrencia cabecalho_card card-header" style="'+cor+'">'
								+'<span style="font-size: 15px;" >Ocorrência nº <span style="color: white;" class="chip color-">'+retorno[x].id_ocorrencia+'</span></span>'
												
								+'<div style="float: right;" ><i class="fa fa-warning"></i></div>'	
							+'</div>'
								
//								*CORPO Do card ocorrencia na listagem
//								
							+'<div class="card-content card-content-padding">'
								+'<div style="margin-top:7px" class="chip"><div class="chip-media bg-color-yellow"><span class="fa fa-calendar"></span></div><div class="chip-label">'+retorno[x].data_criacao+'</div></div>'	
								+'<div><div style="margin-top:7px" class="chip"><div class="chip-media bg-color-blue"><span class="fa fa-user"></span></div><div class="chip-label">'+limitanome(retorno[x].nome)+'</div></div></div>'
				                +'<div style="margin-top:7px" class="chip"><div class="chip-media bg-color-orange"><span class="fa fa-edit"></span></div><div class="chip-label">'+retorno[x].situacao_descricao+'</div></div>'
								+'<div style="margin: 8px 0 0 6px;" class="titulo_descricao">'
									//+'<p style="0 0 0px"> Descrição</p>' //Tag <p> traz icone com o balao antes do conteudo do paragrafo
								//+'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKASURBVDhP1ZTbThNRFIbnUl/AeKGP4DOZGBMPYJQECSAIV8RoEaEUiEJbKQxMW1qkrQUplul0epgypSfKwUgoYGkpDfHKRKO/e0+2FVKQGuKFK/mzDjP7mzV77Rnu/7Knd02XexrMt3ob+Qe1St9mbdE3C400NpC4r3m8/tnt0UsMyXF9Tbxrxpn66nalUYtmvVn43q3C485gbjaLBd8avO7Md/1DfoYhOa6/1SoH1D2cJSVdxFK2RHQAKV5AJL2P+HoZykoJ0nIBhke2EEPWDk1ulJH6UD4RSB808NgeYcjaoOHU/qkd0jrNBzunYgxZDfWHtjG/+LEif3ALwfA2fOImxHAO6toBAiT3R3YqQKqhjqk4Q1ZDHYIK/qWoaXI4AKtRqsR2cxBSdAcTJPdMJypADdrpTDBkNfS9nKvqcFHeQkjZJh3mtFxJFY8BFdLxHwfltKlVHdpMQQgjJH8lavWAvKnB6OAoMKAWQDkMeRyaXC/VNBSqjdwhdoufIS8XtbWnQiOp08/hUSBVLEv8aklbdyLUTzZfJqCQmodEXiUY20U0VUA0U4Sf7OtSpgQluYdoIq9NX1Y/QVTy2jU6gxOhNj4Ch2MJIzoPPL4sRvvnwY+ImHYlYXzuhdubxviwCMvgAjzzKxjWvcWUk5wSswTTizl4xQ30tx2FtlkVizmAMQvRKPUSLNSz+KifEMKwexOwe5Yxzocq91FPfiy/v6gn9yxXepvGGvtahNazpG8RspOOmAY2tNu+/KrT9ZTDkH9nujvGqwMd9oLNFcdQ1/S3juumC+zS+ay7znjN0G7ND3W9+dFz//UNVj6/dTcIF3V1xpvd9cZ6VvqXxnE/ATLUlbEEZFlVAAAAAElFTkSuQmCC"> Descrição' //Tag <p> traz icone com o balao antes do conteudo do paragrafo
								+'<!--<i class="material-icons" style="color:#ffb734">insert_comment</i>-->'
				
								+'</div>'
					
								+'<div class="descricao_card_ocorrencia" ><strong>'+retorno[x].titulo_ocorrencia.substr(0,45)+'</strong></div>'
								
								
							+'</div>'
							+'<div class="card-footer">'
										+'<img width="15" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFUSURBVEhLzZO9SsRAEIDzCFYK9qIWIuIjiKAPoCIIgTN/rT+NYGfjT2FpaSN21naCvZWNlnIqCBY+gn5zzsgJyWVyG8EPhuzM7s53u8lF/5Isy9bSNH3n+VkTb8SCbvPDpg0EL3mez2qpEtausPZWUx8m4DmlpV9QX2J+jx8wITnjGeK+N+mhTpAkySrzD8Qha16LohhtJBEB8VwlEGh2xnyh42tOs+iWeAQCzZZZ80ScM+7GcTzikngFBlc2zwk2YUzyWokJuNtJLTVmoKQNgVApEQET3VCBQI85+t1p+k2bAoFeB8SlplHEC1tvWbBLPHY6nXEt9U7xwVcxrWkQpQKB4g1xrOnQ0GOnVCDIn0deEnGkpcYMFBghIpfAMBEb3FfH+m23wGgiGkpgeERBAqPvHZ1o6QeabwULjDJRqwKj7+pOee63LjBUdIHg6k8E4UTRF4p0/Md1ny5VAAAAAElFTkSuQmCC"></img>'
										+'<span style="font-size: 10px;color: #7f8c8d">&nbsp;'+retorno[x].q_ticket+' </span>'
								+'</div>'

				dado = dado +'</div>';
                dados = dados + dado;
            }
			if(tipo !== 1){
				$("#main_ocorrencia").html("");
			}
			if (cont == 0){
				var sem_reg = "<div align='center' style='margin-top: 50%; width:100%'><h4>Ops! Nenhum registro encontrado aqui :(</h4><br>"
				+"<img  width='50%' src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABMTExMUExUYGBUeIB0gHiwoJSUoLEMwMzAzMENlP0o/P0o/ZVlsWFJYbFmhfnBwfqG6nJScuuHJyeH///////8BExMTExQTFRgYFR4gHSAeLCglJSgsQzAzMDMwQ2U/Sj8/Sj9lWWxYUlhsWaF+cHB+obqclJy64cnJ4f/////////AABEIAPkA+gMBIgACEQEDEQH/xACLAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBBxAAAgICAAQEBQQBAgYDAAAAAQIAAwQRBRIhMRNBUXEGIlJhkRQyQoFTI2IVM2NyocEkJbEBAAMBAQEAAAAAAAAAAAAAAAACAwEEBREAAwACAgEEAwACAwAAAAAAAAECAxEhMRIEE0FRMkJxUmEzQ4H/2gAMAwEAAhEDEQA/ALrERABBIA6mIIBGjADQzHs3byIm2i09VJmm2vkmtebfyye2qK6Tk7ImNa8qzKUJCIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiACIiAGq/sJnjptZhka2upnS2kifuO/wAEZRE8tsFSM3oIzelsTs8yMquhdSIfPuJ+UBZyO7WOWY9TMJ5+T1F0+HpHdGCJXK2zuXPuB6hTJTFza7Pl1ppAohZwsISlikHs0IzZJa3ytheHG09cMscO6VqzOwCgbJMStfEd5CUUA9H2zT0DhNmT8RUJsUVl/ueiyFfjnE2bYv5PsonFh0ePeobog6uftNnEKPByXK/sclki7H0TnD/iJ1cJlAEfXLQCCAQdgz5bLn8O5xep8dz1r6rNTMaJ+JEZXEmrsZK0HQ6JMjrc3JtBBs0PQdJOs0IZYqZaIlQS2ytuZHYGSdHFbUYeIARMnPL7WjXipdck5EKwZQQdgiJckIiIAIiIAIiIAIiIAIiIAIiIAar/ACihuhE2XJ8k5UblYGI+KKLmGjrnJnb8BvcTrnPnlFxmXuSRMy/8d/wzH+c/0gJtqq8VgP4jvM6K1djzeQnRe/6WhnRAQuuk4MWLy1T6O671wuz2jl8MsK2X5iCCOvQwlbXWHaqALBykdyo9Zwpxao/vqYSQpyUevxU2QJ1anX+iDVf+kpIDNqpv4wi26ITHBCyfR1dQynYIlO48v/2dP3RJd9HPPZLrQmJXZ+mqXnY7Ck63MsvHpyqWWzsNkMO4mWTfVQA1gOj06Dc4v+K09kpcyWy6na6K5dg30oLApaphsOBOngtvh8So9H2ks1mVTTUj3NyB5VkuR+K121jSm9SI6ZOlosWZiMcoFe1nWEwqCP8AmFvXRkpkgFqj9yPyJzIbAdOqAeWjJuJ8mPFNyjkOFSToGwGR1tZqsZPQyd5bOfYs6b/boa1OPMpDvUV6Mx1J3C1wh0yR4axbET7Eids58BFqrCHrqdE6o/Cf4c1fkxERGFEREAERMWcKwGu8AMojmG9RABERABERABOa2softOmCAZjWxprTNNVxToZssrqtUBhuaLKyntMVdl7RN/FIfx3zLI+7HsVmZU0vNpQJ0V1OKuW0d52Nk1IjPYeVVGyZr8ejIQPTargHW1MmsMy3SY/u09S0QV/DWZ18MBQT1kzRjIKxUNhANTfWisJ0AADQjzBl5H0FUKAJUviRNXYz+qES2uwUEyv8bqOTRWV6FHj00kSmap8I14WTTn43g2/vA0w/9iZaxOHJuy0b/wDJmnhfDnxme20jmI0oE48/BtfLstdgEc9JJ6XJefN6S7ZHZ2a+ZbzEaUdFWMLFyLbqnSpiqupLdh0M7q6Kq+y9fUybTMQ8laK1j6Gwo6L7mZORU9JG3hcJOmdmVkIgrLDpzyHs4kRYeUD8Ts4lyhKQD5mQllfP7xLp+emzYU6Nz519raBP9dJ2/qTa2OCPmV+pnGrBKVrUa+ozOhGe1AvkQYjfKSGei1VJyAzOeU3eRns7VrXBx1vfIiImmCIiAGKWKxM0sw8TfpPb1CMCD3M0SdNlZlPk31gsxczfses5lRnHfpNvhLNW9dC1rfZsiIjiCIiACIiACarKNdVm2JjSZqbRwMoYMrDoRoiVLht/6HOtoc6RmKH3EuOY6UBHchVJ5ST5T55mWLbl5Dr1VrCRMme0Ndfi/kvtqF63QOyFhrmU6ImHDMx7cdVuO3rYo/usqVHGcymoJ8r67FpnwvParLYWN8tzfN9mgppJg6mmi6ZFiK9altFt6kZlZNfK9fckaP2mebUHr5ydFJDzmy29s7MGJNJ76J6iwPUh32GjI3MuFjgA9FnHMXQujIvdhoSbt0kiqxqG6OR8h7HWqgbZjoGWOmurEpWkudkbZvUznwuH1YKm2whrJi7l2LGd2DCn/DzfUeopd8t/AtCb6OW94FdRXtMI3O144etymef7l/FNGaVV9+5nqpzWgJ0J85rUE9plph5GZ7UJcSkHuW3urbJdGBUafevOdVF5DFWbue8g6W0to3/CZvd+0jqWTTTn9mlbSZ1+/LhNon4kdh5+iEt/ppIzKly9M2aVLaEEhQSegEEgdTIXMy/FPIh+T/8AYRDpmXahGrJyTdaCp0q/tnTj3m1lQqd/aRkncPH8FOZh87S2WYUJNfwjhvI7bT/p2AaiInOdIiIgAiIgAiIgAiIgBqzsYZGJdSe7pPlxBBIPefVp874xQKOI3qOzHnHs01C0RkzRGsdUQbZjoCYTt4aC2fjAfXNfRi7Rd6qWsp8NzzaQAn1Mg7F5Hdd70SJbK05EAlXyVK5FwP1mceedJM9H017ql8Gia2vWp0GizkjSibJvCr8p0NgdDD02FZae3wjfV53ghaXLNrWWWaLkb+3aKgLHsQd1qLmc91y0oWb+h6mdvAqi9GTe/e19T07tY0pk8aIeR1VHPPCZkwKkg+R1MTLEDZV/6m+coOtTMuTAxmM6b8WykBj1UjvMMZPEvrX77/EsRAI0ZLJkc0i+PGrllWnXTmXUjXdfQztyeG92q/EinR6zp1IjJxkQrm8bN9+Xbd07L6Ccs9HU6Ek8bBJIe0eywbnGjEryMYWLvVrj/tElYictU6e2dkSpWkIiIowiIgAiIgAiIgAiIgAMgOIeGV6/py2j0uHf2M7OJ8RGHSwrHNd5CUazOy7ajVZczL6GHi3oFaW0ckmeArvidX2VzIaSnB3ariGO+iVLcrezRyZf77RTUznyEqju1js7HZJ2ZL8Vs6V1/wBmQs4M9brX0ep6WNR5fLExsueqssqhtTKJPHdY63LLZcU5Yc0iHdrsku568oH9bOp9BwqP02JTT9K9feRXCeHVJjsx6l7A39IZPMQqkzvT3z9nlUvHc/RXMgg326+ozQdzInZJ9Z4SBO9LSR5ze2wOwiBE0wkuGqDY59FkvIPAflyAPqBEnJy5fzOzD+AggHuIiSKmK1ovZQJlEQAREQAREQAREQAREQAREQATG6wV1O/kqkzKcfEm5cO721BGU9JsqTu1js7HbMdma2RG7qDMoljh2zWKqx2RfxNgJUgjyiIBtm/jOWz5NXIxAFS/lpFjLvH8gfcTVaxaxifXX4muclTLb2j1oqlM6b6Ov9bd6LPDmXHzA/qcsRfCPpFPcv8AyZcPh7KNld1TnZVuaTeWSmPYftKZwK3k4ii76OpWXe6hbqirEjcvGuDlyp8/bKxE8vsqoybKGfqsemp3Jprg85pp8nsTTRaLk5vuRNrMqDbMB7zTNGxG5HVvQgyzAggGVfDajLvNS29QNy0IoRQo7AanNmabR1YFST2IiJEuIiIAIiIAIiIAIiIAIiIAIiIAJCcau0lVXqeYyblPzrvHyrG8geUewjSuSWatT/TkiJJ8LxvGv5yPlrlG9I5ZXk0jRmYpxvB3/JNn3nHLRxikNjBh3QyrzJe0Pknxoi2/c3uZjPW/cfczyczPTXSEREDTpw38LLx39LFn0ifLt66z6d4gNIc9uTcaSV/B894g/iZ2U3/UM50tsTorkCYMxZix8yT+Z5OhHK+TNXdNhXI330ZiST1JJk9gcIGXgWW9rGb/AEzIOyt6nZHUqynRBhs3RlTc9FqWodMh2J9Iw8qvIoS5PMT5lJ/gOf4F/gO2ksP4aLS2NL0y5RESZQREQAREQAREQAREQAREQAREQA5M+/wMZ2Hc9F9zKfJfi9/PctQ7JIiVlaRyZa3X8ABJAA2TLlhYwxqFTz7t7yG4Tic7+Ow6L0WWKLT+CmGNLyZ5dULanQ9mUiUYgqSD3B0ZepUuJVeFmWejfMIQGdcJkA9VgY/Ke5mqTmM3JkVN/uEshrrY9UU+4ElkXizpwW8k8/BQlR3/AGozew3N64WY3bGs/EvIAA0OkSey2ioJwbiNg/5GvdhLZlFsfhdgbutGpIqNASI46/Jw5x9bKJaUQutlFnqqWYKvckATySvBqPGz6vRNuZZkEXfGpFFFVQ7IoEj+M8I/VJ4tQHjKPzJWJLZXR8vIKkgggg6IiXLjnCOfeTQvz/zWUyUT2Sa0fQ+DcRGXijnPzp0ed0+e8OzDhZSWfwPR59CUhgGB2CNgxKWmUl7QiIijCIiACIiACIiACInLlZtOKPmO28lEDG0ltnUSFBJMiMni9SbWkc59fKQ2Vm35R0x0nkommmi69tVoWjqfshWVviUYO7O7Ox2WJJm/FxnybQi9v5H0El8fg6jTXtv/AGiTNdVdShUQKPtNdL4MnE290K0SpFRBoKNCZREmdIlb4xZW16KP3IOssN1i1VO7dlBMpLu1js7d2JJjwiOatLQRWd1VRtiQBLX1HeR3CMbZN7D7JJN9FjJ5n0U9LLSb+zGZINsJ5o63MqzphJLtHU+mdcrnxI+qKE9XJljlX+JVcHE9nl57Ry10VaWz4cp1Xfd6sEEqcv3BVVeG0f2Y9dCT2ScREmVEq3HOE+EWyaV6d3WWmCAQQZqejGtny6XP4ezS9LUOetUq2bQcbLvp+lzqSHAX5M8L9aMJR8onPDLvERJFRERABERABzKDrcwturqXmdwonO5BYkSLyeH5WTeW2oTQ0SY2kTdv4Wxk8XJ2tA1/vMjKsfJymJVS2z1Yyeo4TRX1s/1DJQAKAANCb5JdCe3V82yHx+D1J1uPOfTsJMIiooCqAB5CIittlZmZ6QiImDCIiAERxi7koWsd3P8A4EgKamvtSte7GdfE7fFy3HknyyS4RjcqG9h1bosp1Jyte5lJVUWikIo0FXQnLOu9vlnOg2wnPfLR3xxLZ0iv/S1OQ9J2zTenKdzaXBkVybam2u/ORvHMbxsGzQ616cTsoYhiJvIBBBHQxpfCEtctHy6Xb4dtD4ZQ/wAHMqWZjnGybqfpbp7Sb+HLdX31fUgaVrlEZ4ZbYiJMqIiIAVP4kxuS+m76l5TIjhlnh8QxW/6gEuPGsfxsC36k04lDrfksR/pYH8GUnlE64o+nRAOwIkygiIgAiIgByKNsAfWdc0FGFnbzm+axJWtiIiYOIiIAIiIAJhdYKqnsPZVJmcr3FcznY0Ieg/fNS2xLpTLZG0VPlZCp5sdsZc1UIoUDQA0BIfg+PyVtcR1foPaTE2nyLinU7+Wc1zrzBZsoXoTOC089re+pJ1pyIq+k54p1dfSOmuISPYYAgiIliZxFxU/XynaCCARODKqKPza6NOjGfmr16SMU/OpZSuZVFe+I8XRqyF/7GkPwm7weIY7eRblP9y852L+pxLaj3ZZ83+at/RlP4InVPK0c9cPZ9PiYUWi6mtx2dQ0zkygiIgAYBlIPUET5pkUmi+6o/wAGKz6XKFxiiynOtLnfifOseBLLrhWC3Ex3B71rOiQ3AH5sAD6HYSSzMqvEx7Ln7L2HqYr7GXRviQHDfiDxrkpto0znQZJPzDRERABERABERABERABERADVdYQCq99SsY2FZbleHYCAOryx2/vM2UMAW3H3pEWvK1s2qoVQANADQhzyqT6Cec6DuwkZxHPShEVdMXMlVJJl5ltpGzGTms5j5SQkbgZuK6HTaI7huk7P1NH+VPzJ4tTPLWxr266N0TT+qx/8qfmP1OP/AJU/Mp5T/khdP6Nt1XPWROHFblt0fOdX6mj/ACp+ZwWMotLIwI3uRytKptMeE2nJKShcZrWviWQF+xl6TIqdAVddH7yA+I0R6KrVX9rzpilvslSejf8AD15fDKHqa3IEm5SuBZqY19q2WhEdJdQQQCD0hXYT0IiJholY+JKT/wDGt91Ms8iOPVs/Dn0N8ro01PTMa2iD4PxPHwkuW7n6sCAonLxbif690CKVqScNWJk3MAlFh2e4Uyx4HAGqvL5RRlQ9FEGYjfwPhvgJ+ptHzuPkHossMRMGEREAEREAE57MuivvYN+g6zl4kuQAvLvk111IWc2XM4elJWMapbbJpuKVj9tbGc7cTuPZFEjYkHmyP5KrHC+DsOflH+evYTUcnIPe5poiI7t/sxvGfpEjiXFuZXYk9xszretbBphsSDnvM31H8y8eo1HjU7I3g3Xkq0dWTjLUAy9tyFvJ8QzvmuysOPv5GT8589qdItCcrTezkpcI/XsZ28y/UJHlHU6KmecrfSY1Sq52OScTRQGCaII69JrbIYMda1JeLbaRh0O4RSZwm2wqVLnXpD2M52Z7VXzt9pWZUrbA2Y76bl9Zq4g+q0T1O5ouvNFjJX3HdjON7HsO3YkysYm7V/BDLkWnKFdb2tyoNmWeu22tFVbGAUADrIXh9ZNjP5AakvE9Rb89J9BhleO2jqXNyl7WmbV4jkD6TOCJFZLX7Mr4T9Ilk4oR+6r8GdNfEcZiOba+4kBEdZ8i+divFBa0etxtWBE9lYpFpceFvm+0s6c3KObvrrOrFkeRPjRC48X2IiJUQREQAREQATTbiUOfmQEzdExpPtGptEa/DKj+12E0Nwy3+NimTMSbw43+oyyWvkgDw/K8kB9jNRxMkd6mlkiTfp4+2N7tFXNNo71P+DMCrDuplrnkR+nX+Q3vP6KpEsVk4LJOsevkor38EZE6GmkyehtmM0tTW3lqbp7BNo05f0y/UZuRFQaE3rOhI3Ndsxsi3xaHYsydT95iMLH/AMZ/JlkrncktM2/+xkqcr9EVdKSqhUqIHoBNwx7z2qf8SzRN9hPumL7r+EivLg5TdqjNi8NvPcqJOiI69PH'> </div>";
				
			}
			$( "#main_ocorrencia" ).append(dados);
			afed('#ocorrencias','#home','','',3,'','ocorrencias');	
            
            $("pull-ocorrencias").scrollTop(25);
		},
        error      : function() {
            alert('Erro Ocorrencia');
			$("#main_ocorrencia").append(sem_reg);
			
        }
	});    
}


// FUNCAO CARREGA UMA OCORRENCIA ESPECIFICO
function carrega_ocorrencia(id){
	"use strict";
	afed('','#bt_oco_reabre','','','',''); // esconde botao reabrir
	afed('','#bt_oco_finaliza','','','',''); //esconde botao finalizar
	
    if(id === 0){
        $("#form_ocorrencia #id_ocorrencia").val(id);
        $("#form_ocorrencia #id_condominio").val($( "#DADOS #ID_CONDOMINIO" ).val());
        $("#form_ocorrencia #id_solicitante").val($( "#DADOS #ID_MORADOR" ).val());
        $("#form_ocorrencia #criado_por").val(localStorage.getItem('MORADOR_NOME'));
        $("#form_ocorrencia #id_situacao").val('1');
        $("#form_ocorrencia #solicitante").val(localStorage.getItem('MORADOR_NOME'));
        $("#form_ocorrencia #situacao").val('Aberto');
    }else{
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/ocorrencia_get.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : {id_ocorrencia : id, id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo : '1'},
            dataType   : 'json',
            success: function(retorno){
				//console.log(retorno);
				var cor_status  ='';
				var responsavel = '';
				cor_status=retorno[0]['id_situacao'];
				//cor_status='1';
				
				if(cor_status == '1'){
					cor_status = '#696969';
				}else if(cor_status=='10'){
					cor_status='#a1cf77';
				}else{
					cor_status='yellow';
				}
				
				if(retorno[0].nome==null){
					responsavel = "Não atribuido";
				}else{
					responsavel = retorno[0].nome;
				} 				
				//Preenche dados do form form_ocorrencia da pagina index.html
                $("#form_ocorrencia #id_ocorrencia").val(retorno[0].id_ocorrencia);
                $("#form_ocorrencia #id_condominio").val(retorno[0].id_condominio);
                $("#form_ocorrencia #id_solicitante").val(retorno[0].id_solicitante);
                $("#form_ocorrencia #id_responsavel").val(retorno[0].responsavel);
                $("#form_ocorrencia #criado_por").val(retorno[0].nome);
                $("#form_ocorrencia #id_situacao").val(retorno[0].id_situacao);
				
				$("#form_ocorrencia #txt_categoria").html("Categoria - "+retorno[0].categoria_descricao);
				
                $("#form_ocorrencia #privada").val(retorno[0].privada);

                if(retorno[0].privada === 1){
                	$("#form_ocorrencia #txt_privada").html("Tipo - Privada");	
                }else{
                	$("#form_ocorrencia #txt_privada").html("Tipo - Pública");	
				}
				//$("#form_ocorrencia #statusbar").css('background-color', cor_status);
                
				$("#form_ocorrencia #solicitante").html("Solicitante - "+limitanome(responsavel));
                
                $("#form_ocorrencia #descricao").html("Descrição - "+retorno[0].titulo_ocorrencia);
				
				$("#form_ocorrencia #titulo_ocorrencia").html("Ocorrência&nbsp-&nbsp<span> "+retorno[0].id_ocorrencia+" </span>");
                
				
				$("#form_ocorrencia #icone_ocorrencia").css('color', cor_status);
				$("#form_ocorrencia #situacao").html(" "+retorno[0].situacao_descricao);
				$("#form_ocorrencia #data_criacao").html(retorno[0].data_criacao);
				
                afed('#ocorrencia','#ocorrencias,#home,#bt_oco_salva,#bt_oco_finaliza','','#form_ocorrencia #titulo_ocorrencia',3);
        

                if( ($( "#DADOS #ID_MORADOR" ).val() == retorno[0].id_solicitante) && (retorno[0].id_situacao != 10) ){
                    afed('#bt_oco_finaliza','','','','','');
                }
    	
                if( ($( "#DADOS #ID_MORADOR" ).val() == retorno[0].id_solicitante) && (retorno[0].id_situacao == 10) ){
                    afed('#bt_oco_reabre','','','','','');
                }

					
				// carrega_ocorrencia_arq(id);
				//get_anexo();
                localStorage.setItem('TELA_ATUAL','ocorrencia');
            },
            error : function() {
                //alert('Erro Ocorrencia');
            }
        });
    }
	
	$("#add_ticket #oco_voltar").attr("onclick","carrega_ocorrencia("+id+")");
	$("#ticket #oco_detalhe_voltar").attr("onclick","carrega_ocorrencia("+id+");carrega_tickets(0);");
	
    
}

function finaliza_ocorrencia(){
	"use strict";
    navigator.notification.confirm(
        'Deseja realmente Finalizar essa ocorrência',  // message
        finaliza_ocorrencia2,              // callback to invoke with index of button pressed
        'Finalizar',            // title
        'Sim,Não'          // buttonLabels
    );    
}

function finaliza_ocorrencia2(res){
	"use strict";
    if(res===1){
        var dados = $( "#form_ocorrencia" ).serialize();
 		$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/ocorrencia_update.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&id_solicitante='+$( "#DADOS #ID_MORADOR" ).val()+'&'+dados,
			success: function(retorno){
                voltar('#ocorrencias','#ocorrencia','ocorrencias');
                carrega_ocorrencias(0);
			}
		});
   }else{
        
    }
}

// FUNCAO CARREGA UM ANEXO
function carrega_ocorrencia_arq(id){
	
    var dados = '';
    var dado  = '';
	var ext;
	var num;
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/ocorrencia_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_ocorrencia : id, tipo : '2', id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val()},
        dataType   : 'json',
		success: function(retorno){
            for (x in retorno) {
				num  = parseInt(x);
				num += 1;
				ext = replaceAll(retorno[x].arquivo, "\/","_");
				
				dado = '<div onClick=download_arq_ocorrencia("'+ext+'"); > <img src="img/anexo_ocorrencia.png" width="30" height="30" alt=""/> Anexo ' +num+  ' 	<p></p> </div> ' ; 
 
                dados = dados + dado;
            }
           
			$("#ocorrencia_anexo_retorno").html(dados);
		},
        error : function() {
			alert('Erro ao carregar arquivos');
        }
	});	
}


// FUNCAO CARREGA UM ANEXO
function carrega_ticket_anexo(id_ticket){
	"use strict";
    var dados = '';
    var dado  = '';
	var ext;
	var num;
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/ticket_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_ocorrencia_ticket : id_ticket, tipo : '2', id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val()},
        dataType   : 'json',
		success: function(retorno){
            for (x in retorno) {
				num  = parseInt(x);
				num += 1;
				ext = replaceAll(retorno[x]['caminho'], "\/","_");
				
				

				dado = '<div> <span onClick=download_arq_ocorrencia("'+ext+'"); class="col button button-raised button-round" style="margin: 8px 0px 8px 0;">Anexo ' +num+  ' </span></div> ' ; 
                //alert(retorno[x]['caminho']);
                dados = dados + dado;
            }
           
			$("#form_ticket #tv_anexo").html(dados);
		},
        error : function() {
			alert('Erro ao carregar arquivos');
        }
	});	
}



function replaceAll(str, de, para){ 
    //"use strict";
	/*var pos = str.indexOf(de); 
    while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}*/
    return (str);
}

function download_arq_ocorrencia(arquivo) {  
	
    arquivo      = replaceAll(arquivo,"..","");

	arquivo      = replaceAll(arquivo,"_","\/");


    var path     = localStorage.getItem('DOMINIO')+fmt_lin(arquivo);
	//alert(path);
	var extencao = arquivo.split(".");
	var ext      = extencao[1];
    //alert(path);
    console.log(cordova.file.externalRootDirectory);

	statusDom    = document.querySelector('#status');
	$('#downloadProgress').css({"display":"block"});
  	app2.progressbar.set('#status', "0");
	
    var fileTransfer = new FileTransfer();
    //var uri = encodeURI("http://portal.mec.gov.br/seb/arquivos/pdf/Profa/apres.pdf");
    var uri = encodeURI(path);
	
    var filePath = cordova.file.externalApplicationStorageDirectory+'Download/'+fmt_lin(arquivo);
	//alert(filePath);
	fileTransfer.onprogress = function(progressEvent) {
		if (progressEvent.lengthComputable) {
			var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
			statusDom.innerHTML = perc + "%...";
			app2.progressbar.set('#status', perc);
		}
	};
    //var filePath = cordova.file.applicationStorageDirectory+'Download/'+arquivo;
    fileTransfer.download(
        uri,
        filePath,
        function(entry) {
            console.log("download complete: " + entry.fullPath);
			$('#downloadProgress').css({"display":"none"});
            //notifica('Download/Download Concluído90 /ok',0,0);
			var path = entry.toURL(); //**THIS IS WHAT I NEED**
			//alert(path);
			var ref = cordova.InAppBrowser.open(uri, '_system', 'location=yes');
			//alert(JSON.stringify(ref, null, 4));
            //window.open(path, "_system");
			//alert("ok");
			

        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
			$('#downloadProgress').css({"display":"none"});
            //console.log("upload error code" + error.code);
			//alert("erro");
        },
        false,
        {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );
	
}


function getCategoria_incluir(){
	
	var dados = '';
	var dado  = '';
	var inicio_select = '<select class="form-control-lg" name="id_categoria" id="id_categoria">'
						 +'<option value="99"></option> 	';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/categoria_ocorrencia_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo:0 },
        dataType   : 'json',
		success: function(retorno){
            for (x in retorno) {
				var dado = '<option value="'+retorno[x]['id_categoria']+'" > '+retorno[x]['desc_categoria']+' </option> ';				
				
				dados = dados + dado;				
            }			
			dados= inicio_select + dados + "</select>";
			$("#add_ocorrencia #div_categoria" ).html(dados);
		}
	});	
}


function getSituacao_incluir(div_destino, valor_padrao){
	
	var dados = '';
	var dado  = '';
	var inicio_select = '<select name="id_situacao" id="id_situacao">'
						 +'<option value="99"></option>';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/situacao_ocorrencia_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo:0 },
        dataType   : 'json',
		success: function(retorno){
            for (x in retorno) {
            	
            	if(valor_padrao == retorno[x]['id_situacao']){
            		
					var dado = '<option value="'+retorno[x]['id_situacao']+'"  selected> '+retorno[x]['descricao']+' </option> ';
				}else{
					var dado = '<option value="'+retorno[x]['id_situacao']+'" > '+retorno[x]['descricao']+' </option> ';
				}
				
				dados = dados + dado;				
            }			
			dados= inicio_select + dados + "</select>";
	
			$(div_destino).html(dados);
		}
	});	
}

//FUNCAO CARREGA PAGINA NOVA OCORRENCIA
function ocorrencia_novo(){
	$("#anexo_oco img[name='foto']").each(function(){

		 $(this).remove();
    });
	
	afed('#add_ocorrencia','#ocorrencias, #anexo_foto2, #form_ocorrencia_add #limpa_anexo','','','2','add_ocorrencia');
	var inicio_select = '<select name="id_situacao" id="id_situacao">'
						 +'<option value="1" selected>Aberto</option></select>';

    	
	$('#add_ocorrencia #div_situacao').html(inicio_select);
	
	$("#add_ocorrencia #privada").val("99");

	$('#add_ocorrencia #foto_oco').val('');
	
    //getSituacao_incluir('#add_ocorrencia #div_situacao','1');
	getCategoria_incluir();

	$( "#add_ocorrencia #nome" ).val('');    
    $( "#add_ocorrencia #descricao" ).val('');
    $( "#add_ocorrencia #titulo_ocorrencia" ).val('');
    $( "#add_ocorrencia #anexo_foto" ).html('');
	$( "#add_ocorrencia #id_condominio" ).val( $( "#DADOS #ID_CONDOMINIO" ).val() );
	$( "#add_ocorrencia #id_solicitante" ).val( $( "#DADOS #ID_MORADOR" ).val() );
	$( "#add_ocorrencia #criado_por" ).val(localStorage.getItem('MORADOR_NOME'));
	$( "#form_ocorrencia_add #id_categoria").val("99").change();
	$("#form_ocorrencia_add #privada").val("99").change();

    afed('#add_ocorrencia','#ocorrencias','','','2','add_ocorrencia');

}

function clean_picture(){
	
	app2.dialog.confirm('Deseja realmente limpar anexos ?','Excluir', function () {
		
		$("#anexo_oco img[name='foto']").fadeOut();
		$("#anexo_oco").fadeOut();
		$("#limpa_anexo").fadeOut();
		$("#limpa_anexo2").fadeOut();
		$("#labelfoto").fadeOut();

		setTimeout(function(){
		  $("#anexo_oco img[name='foto']").remove();
		},500);
			
	});
	
}

function ocorrencia_insert(){
	/* Monta string com fotos inseridas pelo usuario*/
	var foto_src = "";
	$("#anexo_oco img[name='foto']").each(function(){

		 foto_src += $(this).data("src")+"**";
	});

	$("#limpa_anexo").hide();
	if($( "#form_ocorrencia_add #descricao" ).val() == ''){
		notifica('Preencha o campo/Preencha o campo Descrição/Ok',1000,0);
	}else if($( "#form_ocorrencia_add #titulo_ocorrencia" ).val() == ''){
		notifica('Campo não preenchido/Você deve preencher o campo de Resumo/Ok',1000,0);
	}else if($( "#form_ocorrencia_add #privada" ).val() == '99'){
		notifica('Campo não preenchido/Você deve preencher o campo Privacidade/Ok',1000,0);
	}else if($( "#form_ocorrencia_add #id_categoria" ).val() == '99'){
		notifica('Campo não preenchido/Você deve preencher o campo Categoria/Ok',1000,0);
	}else if($( "#form_ocorrencia_add #id_situacao" ).val() == '99'){
		notifica('Campo não preenchido/Você deve preencher o campo Situação/Ok',1000,0);
	}else{
		var dados = $( "#form_ocorrencia_add" ).serialize();
		$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/ocorrencia_insert.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&id_solicitante='+$( "#DADOS #ID_MORADOR" ).val()+'&'+dados,
            data       : 'str_img='+foto_src+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&id_solicitante='+$( "#DADOS #ID_MORADOR" ).val()+'&'+dados,
			success: function(retorno){
				
				//notifica('Ocorrência Criada/Você criou a ocorrência: '+retorno+'/Ok',1000,0);
				openNotificacao('glyphicon glyphicon-warning-sign','Ocorrência Criada','','Você criou a ocorrência:'+retorno);
                afed('','#add_ocorrencia','','','',''); //esconde ocorrencia add
				afed('','#anexo_oco','','','','');
				
				carrega_ocorrencia(retorno);
				carrega_tickets(0);
				alerta(1);
             }
		});
	}
}


function getCategoria_incluir(){
	
	var dados = '';
	var dado  = '';
	var inicio_select = '<label for="id_situacao">Categoria</label><select class="form-control" name="id_categoria" id="id_categoria">'
						 +'<option value="99"></option> 	';
	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/categoria_ocorrencia_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo:0 },
        dataType   : 'json',
		success: function(retorno){
            for (x in retorno) {
				var dado = '<option value="'+retorno[x]['id_categoria']+'" > '+retorno[x]['desc_categoria']+' </option> ';				
				
				dados = dados + dado;				
            }			
			dados= inicio_select + dados + "</select>";
			$("#add_ocorrencia #div_categoria" ).html(dados);
		}
	});	
}

//FUNCAO CARREGA PAGINA NOVO TICKET
function ticket_novo(operacao){
	
	$("#anexo_oco img[name='foto']").each(function(){
       $(this).remove();
    });
	
    $("#form_ticket_add #ti_descricao" ).val('');  
      
    $("#form_ticket_add #operacao").val(operacao);
	$("#form_ticket_add #id_ocorrencia").val($("#form_ocorrencia #id_ocorrencia").val());
	$("#form_ticket_add #id_condominio").val( $( "#DADOS #ID_CONDOMINIO" ).val() );
	$("#form_ticket_add #id_solicitante").val( $( "#DADOS #ID_MORADOR" ).val() );
	$("#form_ticket_add #id_responsavel").val( $("#form_ocorrencia #id_responsavel").val() );
	$("#form_ticket_add #id_criador").val( $("#form_ocorrencia #id_solicitante").val() );
	
	/*$("#form_ticket_add #id_situacao").val($("#form_ocorrencia #id_situacao").val());*/
	
	
	
	$("#form_ticket_add #privada").val($("#form_ocorrencia #privada").val());
    $("#add_ticket #btn_anexo").html("Anexar Imagem");
	$("#add_ticket #foto_oco").val("");
	$("#add_ticket #anexo_foto").attr("src", "");
	$("#add_ticket #labelfoto").hide();
	$("#add_ticket #limpa_anexo2").hide();
	
    if(operacao == 0){ //nova ocorrencia
		getSituacao_incluir('#add_ticket #ti_div_situacao', '1');
	    $("#ti_titulo").html("Novo ticket");
		afed('#add_ticket','#ocorrencia','','','2','add_ticket');
		afed('','#ocorrencias_ticket','','','2','');
		setTimeout(function(){
			$("#form_ticket_add #id_situacao").val($("#form_ocorrencia #id_situacao").val()).change();
	    },500);
		
	}else if(operacao == 2){ //Reabertura
		
		/* Como estava getSituacao_incluir('#add_ticket #ti_div_situacao', '1');
		$("#ti_titulo").html("Reabertura de Ocorrência");
		
		afed('','#v','','','2','');
		afed('#add_ticket','#ocorrencia','','','2','add_ticket');*/
		
		getSituacao_incluir('#add_ticket #ti_div_situacao', '1');
		$("#ti_titulo").html("Reabertura de Ocorrência");
		afed('#add_ticket','#ocorrencia','','','2','add_ticket');
		afed('','#ocorrencias_ticket','','','2','');

	}else if(operacao == 4){ //Finalizar
		
		getSituacao_incluir('#add_ticket #ti_div_situacao', '10');
		$("#ti_titulo").html("Encerrar de Ocorrência");
		afed('#add_ticket','#ocorrencia','','','2','add_ticket');
		afed('','#ocorrencias_ticket','','','2','');
	}else{ //Novo
		//getSituacao_incluir('#add_ticket #ti_div_situacao', $("#form_ocorrencia #id_situacao").val() );
		setTimeout(function(){
			$("#form_ticket_add #id_situacao").val($("#form_ocorrencia #id_situacao").val()).change();
	    },500);
		afed('#add_ticket','#ocorrencias_ticket','','','2','add_ticket');
		afed('','#ocorrencia','','','2','');
				
    }	
}


function ticket_insert(){
	var operacao = $( "#form_ticket_add #operacao" ).val();
	/* Monta string com fotos inseridas pelo usuario*/
	var foto_src = "";
	$("#anexo_oco img[name='foto']").each(function(){

		 foto_src += $(this).data("src")+"**";
	});

	
	if($( "#form_ticket_add #ti_descricao" ).val() == ''){
		notifica('Preencha o campo/Preencha o campo Descrição/Ok',1000,0);
	}else{
		
		var dados = $( "#form_ticket_add" ).serialize();
		$.ajax({
			type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/ticket_insert.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : 'str_img='+foto_src+'&id_condominio='+$("#DADOS #ID_CONDOMINIO" ).val()+'&criado_por='+localStorage.getItem('MORADOR_NOME')+'&'+dados,
			success: function(retorno){
				//notifica('Tocket Criado/Você criou o ticket: '+retorno+'/Ok',1000,0);
				openNotificacao('glyphicon glyphicon-warning-sign','Ticket Criado','','Voce Criou o Ticket'+retorno);
				//alert("Retonro ajax de ticket_insert: "+retorno);
				
                alerta(1);
				afed('','#add_ticket','','','',''); //esconde ocorrencia add
				
                afed('','#anexo_oco','','','','','');   
                
                carrega_ticket(retorno,$("#form_ocorrencia #id_ocorrencia").val() );
                
				$("#form_ocorrencia #id_situacao").val($("#form_ticket_add #id_situacao").val());
				$('#form_ticket_add #descricao').val('');    
                $("#form_ticket_add #foto_oco").val('');
			    $("#add_ticket #btn_anexo").html("Anexar Imagem");			                    
				$("#add_ticket #foto_oco").val("");			                    
				$("#add_ticket #anexo_foto").attr("src", "");
			}
		});
	}
}


// FUNCAO CARREGA TODOS OS TICKETS
function carrega_tickets(tipo){
    "use strict";
	setTimeout(function(){
		
	       localStorage.setItem('TELA_ATUAL','ocorrencias_ticket');
            //app.controler_pull("pull-tickets");

			var id_ocorrencia = $("#form_ocorrencia #id_ocorrencia").val();
			status = $("#form_ocorrencia #id_situacao").val();

			if(status == '10'){
				$("#tl_botao_novo").css('display','none');
			}else{
				$("#tl_botao_novo").css('display','block');
			}


			var pg = 0;
			if(tipo == 0){
				pg = 1;
			}else{
				var offset = $('.ocorrencias_ticket').length;
				if(offset !== 0){
					pg = (offset/6)+1;
				}else{
					pg = 1;
				}
			}
			if(parseInt(pg) !== parseFloat(pg)) { 
				pg = pg+1; 
			}
			var dados = '';
			var dado  = '';
			var cor_status='yellow';
			var cont = 0;
		    var new_field = "";
		    var descricao  = "";

			$( "#main_ticket" ).html("");


			$.ajax({
				type: 'POST',
				url: localStorage.getItem('DOMINIO')+'appweb/ticket_get.php',
				crossDomain: true,
				beforeSend : function() { $("#wait").css("display", "block"); },
				complete   : function() { $("#wait").css("display", "none"); },
				data       : 'id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&pg='+parseInt(pg)+'&id_ocorrencia='+id_ocorrencia+'&tipo='+tipo,
				dataType   : 'json',
				success: function(retorno){
					
					for (x in retorno) {
						
						cor_status = retorno[x]['id_situacao'];
						
						if(cor_status == 1){
							cor_status = 'gray';
						}else if(cor_status=='10'){
							cor_status='green';
						}else{
							cor_status='yellow'
						}
						
						if(retorno[x]['q_anexo'] > 0){
							new_field = '<tr class="anexo-ticket" onclick="get_anexo(\''+retorno[x]['id_ocorrencia_ticket']+'\')"><td><span class="col button button-raised button-round" style="margin: 8px 0px 8px 0;">Ver Anexo</span></td></tr>';
							
						}else{
							new_field = "";
						}
						
					   $("#tl_btn_voltar").attr('onclick', 'carrega_ocorrencia('+retorno[x]['id_ocorrencia']+');');
						  dados += '<li class="accordion-item">'
										+'<div class="item-inner">'
										  +'<div class="item-title"><table><tr><td>Data Criação: '+retorno[x]['data_criacao']+'</td></tr>'
						                  +'<tr><td>Descrição: '+retorno[x]['descricao']+'</td></tr>'
						                  +'<tr><td>Autor: '+limitanome(retorno[x]['nome'])+'</td></tr>'
						                   +new_field
						                  +'<tr><td><span class="chip color-'+cor_status+'">'+retorno[x]['situacao_descricao']+'</span></td></tr>'
						                +'</table></div>'
						            '</div></li>';

					}
					
					$("#main_ticket").append(dados);
				},
				error      : function() {
					//alert('Erro tickets');
				}
			});   
	},800);
	
	
}

function carrega_ticket(id,id_ocorrencia){
    if(id === 0){
        $("#form_ticket #id_ocorrencia_ticket").val(id);
        $("#form_ticket #id_ocorrencia").val(id_ocorrencia);
        $("#form_ticket #id_condominio").val($( "#DADOS #ID_CONDOMINIO" ).val());
        $("#form_ticket #id_situacao").val('1');
        $("#form_ticket #situacao").val('Aberto');
    }else{
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('DOMINIO')+'appweb/ticket_get.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : {id_ocorrencia_ticket : id, id_ocorrencia : id_ocorrencia, id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo : '1'},
            dataType   : 'json',
            success: function(retorno){
				var cor_status='';
				cor_status=retorno[0]['id_situacao'];
				
				if(cor_status == '1'){
					cor_status = '#696969';
				}else if(cor_status=='10'){
					cor_status='#a1cf77';
				}else{
					cor_status='yellow';
				}
				
				cor_status = '<i class="fa fa-circle" style="color:'+cor_status+';" id="icon_status_ticket"></i>';
                
                $("#form_ticket #id_ocorrencia_ticket").val(retorno[0]['id_ocorrencia_ticket']);
                $("#form_ticket #id_ocorrencia").val(retorno[0]['id_ocorrencia']);
                $("#form_ticket #id_condominio").val(retorno[0]['id_condominio']);
				$("#form_ticket #data_ticket").html(retorno[0]['data_criacao']);
                $("#form_ticket #id_situacao_atual").val(retorno[0]['id_situacao']);
                $("#form_ticket #situacao").html(cor_status +' '+ retorno[0]['situacao_descricao']);


                $("#form_ticket #descricao").html(retorno[0]['descricao']);

                
                carrega_ticket_anexo(id);
                
                getHistorico_Situacao_Ticket(id, id_ocorrencia);
			
                //$("#form_ticket #tv_imagem").attr("src", "https://leo.controlcondo.com.br/controlcondo/docs/26/ocorrencia/15338320823664.jpg");

                //$("#form_ticket #icon_status_ticket").css("color", cor_status);
				
				
                afed('#ticket,#bt_ticket_finaliza','#ocorrencias_ticket,#home,#bt_ticket_salva','','#form_ticket #descricao',3);
           
                localStorage.setItem('TELA_ATUAL','ticket');
            },
            error      : function() {
                //alert('erro ticket');
            }
        });
    }
    
}



function getHistorico_Situacao_Ticket(id,id_ocorrencia){

	$.ajax({
		type: 'POST',
		url: localStorage.getItem('DOMINIO')+'appweb/ticket_get.php',
		crossDomain: true,
		beforeSend : function() { $("#wait").css("display", "block"); },
		complete   : function() { $("#wait").css("display", "none"); },
        data       : {id_ocorrencia_ticket : id, id_ocorrencia : id_ocorrencia, id_condominio : $( "#DADOS #ID_CONDOMINIO" ).val(), tipo : '7'},
        dataType   : 'json',
		success: function(retorno){	
			if(retorno == ''){
				$("#form_ticket #div_historico" ).html('Ticket Inicial');
			}else{
				$("#form_ticket #div_historico" ).html(retorno);
			}
		}
	});	
}


function finaliza_ticket(){
    navigator.notification.confirm(
        'Deseja realmente Finalizar esse ticket',  // message
        finaliza_ticket2,              // callback to invoke with index of button pressed
        'Finalizar',            // title
        'Sim,Não'          // buttonLabels
    );    
}


function up_down(){
	
	let status = sessionStorage.getItem("up_down");
	if(status == "open"){
	   $("#up_down").attr("class","fa fa-angle-up");
	   sessionStorage.setItem("up_down","close")
	}else{
	   $("#up_down").attr("class","fa fa-angle-down");
	   sessionStorage.setItem("up_down","open")
	}	
}

function fmt_lin(string){
	
	let valor   = string.substr(0,6);
	let retorno = "";
	
	if(valor.indexOf("../../") >= 0){
		retorno = string.substr(5);
	}else 
	if(valor.indexOf("../") >= 0){
	    retorno = string.substr(2);
	}else{
		retorno = "";
	}
	
	return retorno;	
}


function get_anexo(id){	
	"use strict";
	let status         = false;
	let array_photo    = "";
	let formata_link   = "";
    let caminho        = "";
	let link           = "";
	let x              = 0;
	let tamanho        = 0;
	
	$.ajax({
			type: 'POST',
			dataType:'JSON',
            url: localStorage.getItem('DOMINIO')+'appweb/ocorrencia_get.php',
			crossDomain: true,
			beforeSend : function() { $("#wait").css("display", "block"); },
			complete   : function() { $("#wait").css("display", "none"); },
            data       : 'id_ocorrencia_ticket='+id+'&id_condominio='+$( "#DADOS #ID_CONDOMINIO" ).val()+'&tipo=3',
			success: function(retorno){

			    for(x in retorno){
					caminho        = fmt_lin(retorno[x].caminho);
					array_photo   += localStorage.getItem('DOMINIO')+caminho+"**";
				}
				
				/* Formata string */
				tamanho      = array_photo.length;
                formata_link = array_photo.substr(0,tamanho-2);
				link         = formata_link;
				
				/* Chama funcao */
				abre_photo(link);
				localStorage.setItem('TELA_ATUAL','ocorrencia_ticket_foto');
			 }
     });	
}



 		




        
  

