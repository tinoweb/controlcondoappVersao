var home_feed           = '';
var ref_liberacao       = '';
var ref_comunicado      = '';
var ref_correspondencia = '';
var ref_enquete         = '';
var ref_documento       = '';
var ref_ocorrencia       = '';

//localStorage.setItem('DOMINIO','https://www.controlcondo.com.br/controlcondo/');
localStorage.setItem('DOMINIO','https://www.controlcondo.com.br/controlcondo/v2/');


var app = {
	
	escondeTeclado: function(){
		Keyboard.hide();
		
	},
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		
    },
	
    onDeviceReady: function() {
    
		app.receivedEvent('deviceready');
        document.addEventListener("backbutton", onBackKeyDown, false);
		app.remove_pull();
        
        $('#visitante_busca').on('submit', function(e){       
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        });      
        
		$("#box_notificacoes" ).hide();
		$("#boxUp_liberacao"  ).hide();
		$("#boxUp_liberacao2" ).hide();
		$("#boxUp_comunicados").hide();
		$("#boxUp_entregas"   ).hide();
		$("#boxUp_enquetes"   ).hide();
		$("#boxUp_documentos" ).hide();
		$("#boxUp_ocorrencias").hide();	
		$("#boxUp_mudancas").hide();	
		$("#boxUp_tickets").hide();
		$("#boxUp_mreserva").hide();
		$("#boxUp_recorrente" ).hide();
		$("#boxUp_pontual").hide();
		$("#boxUp_mcasa").hide();
		$("#boxUp_pet").hide();
		$("#boxUp_pet1").hide(); 
		
        $('#home').on('mousemove',function(e){
            if(swiper.realIndex != 1){
                afed('#fale_user','#fale_msg','','',2,'fale_user');
            }
            if(swiper.realIndex != 3){
                afed('.smenu,#perfil_abre,#perfil','#perfil_edit,#perfil_fecha','','',2);
            }
        });
        
        $("#busca_morador_chat").on("keypress", function(event){               
            if (event.keyCode === 13) {
                event.preventDefault();
            }
        });
        
        $("#txt_comenta").on("keypress", function(event){               
            if (event.keyCode === 13) {
                comentar();
                event.preventDefault();
            }
        });

        $("#busca_comunicados").on("keypress", function(event){   
            if (event.keyCode === 13) {
                //comentar();
                carrega_comunicados(0);
                event.preventDefault();
            }
        });   
        $("#busca_ocorrencias").on("keypress", function(event){   
            if (event.keyCode === 13) {
                var ordem = $("#ol_ordem").val();
				//alert('device ready'+ordem);
                carrega_ocorrencias(ordem);
                event.preventDefault();
            }
        }); 
        $("#busca_doc").on("keypress", function(event){   
            if (event.keyCode === 13) {
                //comentar();
                carrega_documentos(0);
                event.preventDefault();
            }
        });   		
		
		
	},
	// Update DOM on a Received Event
    receivedEvent: function(id) {
        
        var parentElement = document.getElementById(id);
        console.log('Received Device Ready Event');
        console.log('calling setup push');
		login_user_device();
		
        $("#notificacoes").scroll(function() {
            if ($(this).scrollTop() + $(this).height() > ($(this).get(0).scrollHeight-58)) {
				carrega_notificacoes(1); 
            }
			app.ckBoxUp('#box_notificacoes',"#notificacoes");
        }); 
        
		$('#box_notificacoes').click(function(){
			$('#notificacoes').animate({
				scrollTop: 0
			},600)
		});

		$("#pull-liberacao").scroll(function() { 
            
			var y=(($(this).scrollTop() + $(this).height()) + 85);
			var x=$(this).get(0).scrollHeight;
			//alert('pull liberacao');
			//alert(y+ ' iii '+x);
            if ((($(this).scrollTop() + $(this).height()) + 95) > $(this).get(0).scrollHeight) {
                //alert('scroll');
                carrega_liberacao(1);
            }
			app.ckBoxUp("#boxUp_liberacao","#pull-liberacao");
		});		
		
		$('#boxUp_liberacao').click(function(){
			$('#pull-liberacao').animate({
				scrollTop: 0
			},600)
		});
		
		$("#pull-liberacao2").scroll(function() { 
			var y=(($(this).scrollTop() + $(this).height()) + 71);
			var x=$(this).get(0).scrollHeight;
			//alert('pull liberacao');
			//alert(y+ ' iii '+x);
            if ((($(this).scrollTop() + $(this).height()) + 95) > $(this).get(0).scrollHeight) {
                carrega_liberacao2(1);
            }
			app.ckBoxUp("#boxUp_liberacao2","#pull-liberacao2");
		});		
		
		$('#boxUp_liberacao2').click(function(){
			$('#pull-liberacao2').animate({
				scrollTop: 0
			},600)
		});
		
		$("#pull-comunicados").scroll(function() { 
			var y=(($(this).scrollTop() + $(this).height()) + 71);
			var x=$(this).get(0).scrollHeight;
			//alert(y+ ' iii '+x);
            if ((($(this).scrollTop() + $(this).height()) + 71) > $(this).get(0).scrollHeight) {
                carrega_comunicados(1);
            }
			app.ckBoxUp("#boxUp_comunicados","#pull-comunicados");
		});		
		
		$('#boxUp_comunicados').click(function(){ 
			$('#pull-comunicados').animate({
				scrollTop: 0
			},600)
		});
		
		$("#pull-entregas").scroll(function() { 
		//	var y=(($(this).scrollTop() + $(this).height()) + 71);
//			var x=$(this).get(0).scrollHeight;
//			//alert(y+ ' iii '+x);
//            if ((($(this).scrollTop() + $(this).height()) + 71) > $(this).get(0).scrollHeight) {
//                carrega_entregas(1);
//            }
			app.ckBoxUp("#boxUp_entregas","#pull-entregas");
		});			
		
		$('#boxUp_entregas').click(function(){
			$('#pull-entregas').animate({
				scrollTop: 0
			},600)
		});
	//--------------------------------------	
		$("#pull-documentos").scroll(function() { 
			var y=(($(this).scrollTop() + $(this).height()) + 110);
			var x=$(this).get(0).scrollHeight;
            if ((($(this).scrollTop() + $(this).height()) + 110) > $(this).get(0).scrollHeight) {
                carrega_documentos(1);
            }
			app.ckBoxUp("#boxUp_documentos","#pull-documentos");
		});		
		
		$('#boxUp_documentos').click(function(){
			$('#pull-documentos').animate({
				scrollTop: 0
			},600)
		});
		//-----------------------------------------
		$("#pull-recorrente").scroll(function() {
			//alert('pull');
			var y=(($(this).scrollTop() + $(this).height()) + 110);
			var x=$(this).get(0).scrollHeight;
            if ((($(this).scrollTop() + $(this).height()) + 110) > $(this).get(0).scrollHeight) {
               // meus_recorrentes();
            }
			app.ckBoxUp("#boxUp_recorrente","#pull-recorrente");
		});		
		
		$('#boxUp_recorrente').click(function(){
			$('#pull-recorrente').animate({
				scrollTop: 0
			},400)
		});
		//---------------------------------------------------
			//-----------------------------------------
		$("#pull-pontual").scroll(function() {
			//alert('pull');
			var y=(($(this).scrollTop() + $(this).height()) + 110);
			var x=$(this).get(0).scrollHeight;
            if ((($(this).scrollTop() + $(this).height()) + 110) > $(this).get(0).scrollHeight) {
               // meus_recorrentes();
            }
			app.ckBoxUp("#boxUp_pontual","#pull-pontual");
		});		
		
		$('#boxUp_pontual').click(function(){
			$('#pull-pontual').animate({
				scrollTop: 0
			},400)
		});
		//-----------------------------------------
		$("#pull-mcasa").scroll(function() {
			//alert('pull');
			var y=(($(this).scrollTop() + $(this).height()) + 110);
			var x=$(this).get(0).scrollHeight;
            if ((($(this).scrollTop() + $(this).height()) + 110) > $(this).get(0).scrollHeight) {
               // meus_recorrentes();
            }
			app.ckBoxUp("#boxUp_mcasa","#pull-mcasa");
		});		
		
		$('#boxUp_mcasa').click(function(){
			$('#pull-mcasa').animate({
				scrollTop: 0
			},400)
		});
		//---------------------------------------------------
		
		$("#pull-pet").scroll(function() {
			//alert('pull');
			var y=(($(this).scrollTop() + $(this).height()) + 110);
			var x=$(this).get(0).scrollHeight;
            if ((($(this).scrollTop() + $(this).height()) + 110) > $(this).get(0).scrollHeight) {
                carrega_pets(0);
            }
			app.ckBoxUp("#boxUp_pet","#pull-pet");
		});		
		
		$('#boxUp_pet').click(function(){
			$('#pull-pet').animate({
				scrollTop: 0
			},400)
		});
		
		$("#pull-pet1").scroll(function() {
			//alert('pull');
			var y=(($(this).scrollTop() + $(this).height()) + 110);
			var x=$(this).get(0).scrollHeight;
            if ((($(this).scrollTop() + $(this).height()) + 110) > $(this).get(0).scrollHeight) {
                meus_recorrentes();
            }
			app.ckBoxUp("#boxUp_pet1","#pull-pet1");
		});		
		
		$('#boxUp_pet1').click(function(){
			$('#pull-pet1').animate({
				scrollTop: 0
			},400)
		});
        
		$("#pull-enquetes").scroll(function() { 
			var y=(($(this).scrollTop() + $(this).height()) + 71);
			var x=$(this).get(0).scrollHeight;
			//alert(y+ ' iii '+x);
            if ((($(this).scrollTop() + $(this).height()) + 71) > $(this).get(0).scrollHeight) {
                carrega_enquetes(1);
            }
			app.ckBoxUp("#boxUp_enquetes","#pull-enquetes");
		});		
		
		$('#boxUp_enquetes').click(function(){
			$('#pull-enquetes').animate({
				scrollTop: 0
			},400)
		});
		
		$("#pull-ocorrencias").scroll(function() { 
			var ordem = $("#ol_ordem").val();
			var y=(($(this).scrollTop() + $(this).height()) + 71);
			var x=$(this).get(0).scrollHeight;
			//alert(y+ ' iii '+x);
            if ((($(this).scrollTop() + $(this).height()) + 71) > $(this).get(0).scrollHeight) {
				//alert('recive event'+ordem);
                carrega_ocorrencias(ordem);
            }
			app.ckBoxUp("#boxUp_ocorrencias","#pull-ocorrencias");
		});		
		
		$('#boxUp_ocorrencias').click(function(){
			$('#pull-ocorrencias').animate({
				scrollTop: 0
			},600)
		});
		
		$("#pull-mudancas").scroll(function() { 
			var ordem = $("#ol_ordem").val();
			var y=(($(this).scrollTop() + $(this).height()) + 71);
			var x=$(this).get(0).scrollHeight;
			//alert(y+ ' iii '+x);
            if ((($(this).scrollTop() + $(this).height()) + 71) > $(this).get(0).scrollHeight) {
				//alert('recive event'+ordem);
                carrega_mudancas(ordem);
            }
			app.ckBoxUp("#boxUp_mudancas","#pull-mudancas");
		});	
		
		$('#boxUp_mudancas').click(function(){
			$('#pull-mudancas').animate({
				scrollTop: 0
			},600)
		});
		
		
		$("#pull-tickets").scroll(function() { 
			var y=(($(this).scrollTop() + $(this).height()) + 71);
			var x=$(this).get(0).scrollHeight;
			//alert(y+ ' iii '+x);
            if ((($(this).scrollTop() + $(this).height()) + 71) > $(this).get(0).scrollHeight) {
                carrega_tickets(1);
            }
			app.ckBoxUp("#boxUp_tickets","#pull-tickets");
		});		
		
		$('#boxUp_tickets').click(function(){
			$('#pull-tickets').animate({
				scrollTop: 0
			},600)
		});
		
		$("#pull-mreserva").scroll(function() { 
			var y=(($(this).scrollTop() + $(this).height()) + 71);
			var x=$(this).get(0).scrollHeight;
			//alert(y+ ' iii '+x);
//            if ((($(this).scrollTop() + $(this).height()) + 71) > $(this).get(0).scrollHeight) {
//                alert('fim');
//            }
			app.ckBoxUp("#boxUp_mreserva","#pull-mreserva");
		});		
		
		$('#boxUp_mreserva').click(function(){
			$('#pull-mreserva').animate({
				scrollTop: 0
			},600)
		});
		
    },
  //-------------------------------------------------------------------------------  
    foto_pet_edicao: function() {
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
            	correctOrientation: true,
			destinationType: Camera.DestinationType.DATA_URL,
            saveToPhotoAlbum: true
        });

        function onSuccess(imageURI) {
           
			$( '#form_pet_update #foto_up_pet' ).attr("src", "data:image/jpeg;base64,"+imageURI+" ");
			$( '#form_pet_update #pet_foto' ).val(imageURI);
			

        }
        function onFail(message) {
            alert('Camera Indisponivel');
        }    
    },
	
	foto_pet_inclusao: function() {
		
     
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
				correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL,
			//sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            //saveToPhotoAlbum: true
        });

        function onSuccess(imageURI) {
           
		$( '#form_pet_add #pet_foto' ).attr("src", "data:image/jpeg;base64,"+imageURI+"");
		$( '#form_pet_add #foto_up_pet' ).val(imageURI);
	

        }
		
        function onFail(message) {
			
            alert('Camera Indisponivel');
			
			
        }    
    },
	foto_pet_inclusao_galeria: function() {
		
     
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
			correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: true
        });

        function onSuccess(imageURI) {
           
		$( '#form_pet_add #pet_foto' ).attr("src", "data:image/jpeg;base64,"+imageURI+"");
		$( '#form_pet_add #foto_up_pet' ).val(imageURI);
		
			
        }
		
        function onFail(message) {
			
            alert('Camera Indisponivel');
			
			
        }    
    },
	foto_pet_up: function() {
		
     
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
			correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL,
			//sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            //saveToPhotoAlbum: true
        });

        function onSuccess(imageURI) {
           
		$( '#form_pet_update #pet_foto' ).attr("src", "data:image/jpeg;base64,"+imageURI+"");
		$( '#form_pet_update #foto_up_pet' ).val(imageURI);
	

        }
		
        function onFail(message) {
			
            alert('Camera Indisponivel');
			
			
        }    
    },
	foto_pet_up_galeria: function() {
		
     
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
		   	correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: true
        });

        function onSuccess(imageURI) {
           
		$( '#form_pet_update #pet_foto' ).attr("src", "data:image/jpeg;base64,"+imageURI+"");
		$( '#form_pet_update #foto_up_pet' ).val(imageURI);
		
			
        }
		
        function onFail(message) {
			
            alert('Camera Indisponivel');
			
			
        }    
    },
	
	foto_perfil: function() {
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
			correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL,
            saveToPhotoAlbum: true
        });

        function onSuccess(imageURI) {
            
            $( '.user_foto' ).css("background-image", "url(data:image/jpeg;base64,"+imageURI+")");
            $.ajax({ 
                type: 'POST', 
                url        : localStorage.getItem('DOMINIO')+"appweb/foto/foto_insert.php", 
				crossDomain: true,
				beforeSend : function() { $("#wait").css("display", "block"); },
				complete   : function() { $("#wait").css("display", "none"); },
                data       : { id_condominio: $( "#DADOS #ID_CONDOMINIO" ).val(), id_morador: $( "#DADOS #ID_MORADOR" ).val(), foto: imageURI }, 
                success: function(retorno){ 
                    //$("#erro_box").html(retorno); 
                    //afed('#erro_box','#home','','',3); 
                }, 
                error      : function() { 
                    //alert('Erro'); 
                } 
            }); 
        }
        function onFail(message) {
            //alert('Camera Indisponivel');
        }    
    },

    
	
    foto_perfil2: function() {
        
        navigator.camera.getPicture(onSuccess, onFail, {  
            quality: 50,
			correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL, 
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY 	
        }); 
        
        function onSuccess(imageURI) {
            
            $( '.user_foto' ).css("background-image", "url(data:image/jpeg;base64,"+imageURI+")");
            $.ajax({ 
                type: 'POST', 
                url        : localStorage.getItem('DOMINIO')+"appweb/foto/foto_insert.php", 
				crossDomain: true,
				beforeSend : function() { $("#wait").css("display", "block"); },
				complete   : function() { $("#wait").css("display", "none"); },
                data       : { id_condominio: $( "#DADOS #ID_CONDOMINIO" ).val(), id_morador: $( "#DADOS #ID_MORADOR" ).val(), foto: imageURI }, 
                success: function(retorno){ 
                    //$("#erro_box").html(retorno); 
                    //afed('#erro_box','#home','','',3); 
                }, 
                error      : function() { 
                    //alert('Erro'); 
                } 
            }); 
        }
        function onFail(message) {
            //alert('Camera Indisponível');
        }    
    },


    foto_ticket_camera: function() {
		
		var foto_src = "";
		/* Tratativa para identificar quando a mais de 3 fotos anexadas na ocorrencia*/
		$("#anexo_oco img[name='foto']").each(function(){
			foto_src += "**";
		});
		
		if(foto_src.length > 4){
			alerta("","Impossivel anexar mais que 3 imagens.");
		}else{
			
			navigator.camera.getPicture(onSuccess, onFail, { 
				quality: 50,
				correctOrientation: true,
				destinationType: Camera.DestinationType.DATA_URL,
				saveToPhotoAlbum: true
			});

			function onSuccess(imageURI) {
				var dominio = localStorage.getItem('DOMINIO'); 
				var caminho = "docs/"+($( "#DADOS #ID_CONDOMINIO" ).val())+"/ocorrencia/";

				$.ajax({ 
					type: 'POST', 
					url        : localStorage.getItem('DOMINIO')+"appweb/foto/foto_ocorrencia_insert.php", 
					crossDomain: true,
					beforeSend : function() { $("#wait").css("display", "block"); },
					complete   : function() { $("#wait").css("display", "none"); },
					data       : { id_condominio: $( "#DADOS #ID_CONDOMINIO" ).val(), id_morador: $( "#DADOS #ID_MORADOR" ).val(), foto: imageURI }, 
					success: function(retorno){ 
						/*retorno = retorno.replace(/(\r\n|\n|\r)/gm,"")
						$("#add_ticket #btn_anexo").html("Alterar Imagem");

						$("#add_ticket #foto").val(retorno);

						$("#add_ticket #anexo_foto").attr("src", dominio+caminho+retorno);

						afed('#add_ticket #anexo_oco','','','','');*/
						
						retorno = retorno.replace(/(\r\n|\n|\r)/gm,"")
						//$("#add_ticket #btn_anexo").html("Alterar Imagem");

						$("#add_ticket #foto").val(retorno);

						/*$("#add_ticket #anexo_foto").attr("src", dominio+""+caminho+""+retorno);

						afed('#add_ticket #anexo_oco','','','','');*/
						$("#add_ticket #anexo_oco").append('<img src='+dominio+caminho+retorno+' data-src="'+retorno+'" name="foto" class="img-responsive img-rounded"/>');

						$("#add_ticket #labelfoto").show();
						
						afed('#anexo_oco,#add_ticket #limpa_anexo2','','','','');

					}, 
					error      : function() { 
						//alert('Erro'); 
					} 
				}); 
				
			}
			function onFail(message) {
				//alert('Camera Indisponivel');
				  //alert('Camera Indisponivel');
			} 
			
		}
    },
    

    foto_ticket_galeria: function() {
		
		var foto_src = "";
		/* Tratativa para identificar quando a mais de 3 fotos anexadas na ocorrencia*/
		$("#anexo_oco img[name='foto']").each(function(){
			foto_src += "**";
		});
		
		if(foto_src.length > 4){
			alerta("","Impossivel anexar mais que 3 imagens.");
		}else{
			
			navigator.camera.getPicture(onSuccess, onFail, { 
				quality: 50,
				correctOrientation: true,
				destinationType: Camera.DestinationType.DATA_URL, 
				sourceType: Camera.PictureSourceType.PHOTOLIBRARY 
			});

			function onSuccess(imageURI) {
				var dominio = localStorage.getItem('DOMINIO'); 
				var caminho = "docs/"+($( "#DADOS #ID_CONDOMINIO" ).val())+"/ocorrencia/";

				$.ajax({ 
					type: 'POST', 
					url        : localStorage.getItem('DOMINIO')+"appweb/foto/foto_ocorrencia_insert.php", 
					crossDomain: true,
					beforeSend : function() { $("#wait").css("display", "block"); },
					complete   : function() { $("#wait").css("display", "none"); },
					data       : { id_condominio: $( "#DADOS #ID_CONDOMINIO" ).val(), id_morador: $( "#DADOS #ID_MORADOR" ).val(), foto: imageURI }, 
					success: function(retorno){ 
						retorno = retorno.replace(/(\r\n|\n|\r)/gm,"")
						//$("#add_ticket #btn_anexo").html("Alterar Imagem");

						$("#add_ticket #foto").val(retorno);

						/*$("#add_ticket #anexo_foto").attr("src", dominio+""+caminho+""+retorno);

						afed('#add_ticket #anexo_oco','','','','');*/
						$("#add_ticket #anexo_oco").append('<img src='+dominio+caminho+retorno+' data-src="'+retorno+'" name="foto" class="img-responsive img-rounded"/>');

						$("#add_ticket #labelfoto").show();
						
						afed('#anexo_oco,#add_ticket #limpa_anexo2','','','','');

					}, 
					error      : function() { 
						alert('Erro'); 
					} 
				}); 
			}
			function onFail(message) {
				//alert('Camera Indisponivel');
			} 
		}
    },
    

    
	foto_ocorrencia_camera: function() {
		
		var foto_src = "";
		/* Tratativa para identificar quando a mais de 3 fotos anexadas na ocorrencia*/
		$("#anexo_oco img[name='foto']").each(function(){
			foto_src += "**";
		});
		
		if(foto_src.length > 4){
			alerta("","Impossivel anexar mais que 3 imagens.");
		}else{
		
			var dominio = localStorage.getItem('DOMINIO'); 
			var caminho = "docs/"+($( "#DADOS #ID_CONDOMINIO" ).val())+"/ocorrencia/";
			navigator.camera.getPicture(onSuccess, onFail, { 
				quality: 50,
				correctOrientation: true,
				destinationType: Camera.DestinationType.DATA_URL,
				saveToPhotoAlbum: true
			});

			function onSuccess(imageURI) {

				$.ajax({ 
					type: 'POST', 
					url        : localStorage.getItem('DOMINIO')+"appweb/foto/foto_ocorrencia_insert.php", 
					crossDomain: true,
					beforeSend : function() { $("#wait").css("display", "block"); },
					complete   : function() { $("#wait").css("display", "none"); },
					data       : { id_condominio: $( "#DADOS #ID_CONDOMINIO" ).val(), id_morador: $( "#DADOS #ID_MORADOR" ).val(), foto: imageURI }, 
					success: function(retorno){ 
						/*retorno = retorno.replace(/(\r\n|\n|\r)/gm,"");
						$("#form_ocorrencia_add #btn_anexo").html("Alterar Imagem");
						$("#form_ocorrencia_add #foto_oco").val(retorno);

						$("#form_ocorrencia_add #anexo_foto").attr("src", dominio+caminho+retorno);
						afed('#anexo_oco','','','','');*/
						
						retorno = retorno.replace(/(\r\n|\n|\r)/gm,"")
					   // $("#form_ocorrencia_add #btn_anexo").html("Alterar Imagem");
						$("#form_ocorrencia_add #foto_oco").val(''+retorno+'');
						//$("#anexo_foto").html(retorno);

						$("#form_ocorrencia_add #anexo_oco").append('<img src='+dominio+caminho+retorno+' data-src="'+retorno+'" name="foto" class="img-responsive img-rounded"/>');
						afed('#anexo_oco,#limpa_anexo','','','','');

					}, 
					error      : function() { 
						//alert('Erro'); 
					} 
				}); 
			}
			function onFail(message) {
				//alert('Camera Indisponivel');
			}    
			
	   }
    },
	


	foto_ocorrencia_galeira: function() {
		    
		var foto_src = "";
		/* Tratativa para identificar quando a mais de 3 fotos anexadas na ocorrencia*/
		$("#anexo_oco img[name='foto']").each(function(){
			foto_src += "**";
		});
		
		if(foto_src.length > 4){
			alerta("","Impossivel anexar mais que 3 imagens.")
		}else{
		
		    var dominio = localStorage.getItem('DOMINIO'); 
			var caminho = "docs/"+($( "#DADOS #ID_CONDOMINIO" ).val())+"/ocorrencia/";
			navigator.camera.getPicture(onSuccess, onFail, { 
				quality: 50, 
				correctOrientation: true,
				destinationType: Camera.DestinationType.DATA_URL, 
				sourceType: Camera.PictureSourceType.PHOTOLIBRARY 
			});

			function onSuccess(imageURI) {

				$.ajax({ 
					type: 'POST', 
					url        : localStorage.getItem('DOMINIO')+"appweb/foto/foto_ocorrencia_insert.php", 
					crossDomain: true, 
					beforeSend : function() { }, 
					complete   : function() { }, 
					data       : { id_condominio: $( "#DADOS #ID_CONDOMINIO" ).val(), id_morador: $( "#DADOS #ID_MORADOR" ).val(), foto: imageURI }, 
					success: function(retorno){ 
						retorno = retorno.replace(/(\r\n|\n|\r)/gm,"")
					   // $("#form_ocorrencia_add #btn_anexo").html("Alterar Imagem");
						$("#form_ocorrencia_add #foto_oco").val(''+retorno+'');
						//$("#anexo_foto").html(retorno);

						$("#form_ocorrencia_add #anexo_oco").append('<img src='+dominio+caminho+retorno+' data-src="'+retorno+'" name="foto" class="img-responsive img-rounded"/>');
						afed('#anexo_oco,#limpa_anexo','','','','');


					}, 
					error      : function() { 
						//alert('Erro'); 
					} 
				}); 
			}
			function onFail(message) {
				//alert('Camera Indisponivel');
			}
		}
    },
	
	
    foto_visitante: function() {
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
			correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL,
            saveToPhotoAlbum: true
        });
        function onSuccess(imageURI) { 
            $( '#foto_visitante' ).css("background-image", "url(data:image/jpeg;base64,"+imageURI+")");
            $( '#foto_up_visitante' ).val(imageURI);
			$( '#nophoto' ).hide();
        }

        function onFail(message) {
            //alert('Câmera Indisponível');
        }    
    },
    
    foto_visitante2: function() {
        
	   navigator.camera.getPicture(onSuccess, onFail, {  
            quality: 50,
		  	correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL, 
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY 
        }); 
        
        function onSuccess(imageURI) {
            
            $( '#foto_visitante' ).css("background-image", "url(data:image/jpeg;base64,"+imageURI+")");
            $( '#foto_up_visitante' ).val(imageURI);
			$( '#nophoto' ).hide();

        }

        function onFail(message) {
            //alert('Câmera Indisponível');
        }    
    },

    foto_visitante3: function(id_visitante) {
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
			correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL,
            saveToPhotoAlbum: true
        });
        function onSuccess(imageURI) { 
            $.ajax({ 
                type: 'POST', 
                url        : localStorage.getItem('DOMINIO')+"appweb/foto/foto_visitante_insert.php", 
				crossDomain: true,
				beforeSend : function() { $("#wait").css("display", "block"); },
				complete   : function() { $("#wait").css("display", "none"); },
                data       : { id_condominio: $( "#DADOS #ID_CONDOMINIO" ).val(), id_visitante: localStorage.getItem("id_visitante_up_foto"), foto: imageURI }, 
                success: function(retorno){ 
                    carrega_liberacao(0);
                }, 
                error      : function() { 
                    //alert('Erro'); 
                } 
            }); 
        }

        function onFail(message) {
            //alert('Câmera Indisponível');
        }    
    },
    
    foto_visitante4: function() {
        
	   navigator.camera.getPicture(onSuccess, onFail, {  
            quality: 50,
		  	correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL, 
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY 
        }); 
        
        function onSuccess(imageURI) {

            $.ajax({ 
                type: 'POST', 
                url        : localStorage.getItem('DOMINIO')+"appweb/foto/foto_visitante_insert.php", 
				crossDomain: true,
				beforeSend : function() { $("#wait").css("display", "block"); },
				complete   : function() { $("#wait").css("display", "none"); },
                data       : { id_condominio: $( "#DADOS #ID_CONDOMINIO" ).val(), id_visitante: localStorage.getItem("id_visitante_up_foto"), foto: imageURI }, 
                success: function(retorno){ 
                    carrega_liberacao(0);
                }, 
                error      : function() { 
                    //alert('Erro'); 
                } 
            }); 

        }

        function onFail(message) {
            //alert('Câmera Indisponível');
        }    
    },
	
    foto_mor: function() {
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
			correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL,
            saveToPhotoAlbum: true
        });
        function onSuccess(imageURI) { 
            $( '#foto_morador_edit' ).css("background-image", "url(data:image/jpeg;base64,"+imageURI+")");
            $( '#mor_foto_up' ).val(imageURI);
        }

        function onFail(message) {
            //alert('Câmera Indisponível');
        }    
    },
    
    foto_mor2: function() {
        
	   navigator.camera.getPicture(onSuccess, onFail, {  
            quality: 50,
		   	correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL, 
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY 
        }); 
        
        function onSuccess(imageURI) {
            
            $( '#foto_morador_edit' ).css("background-image", "url(data:image/jpeg;base64,"+imageURI+")");
            $( '#mor_foto_up' ).val(imageURI);

        }

        function onFail(message) {
            //alert('Câmera Indisponível');
        }    
    },

    foto_veiculo: function() {
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
			correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL,
            saveToPhotoAlbum: true
        });
        function onSuccess(imageURI) { 
            $( '#foto_morador_veiculo' ).css("background-image", "url(data:image/jpeg;base64,"+imageURI+")");
			$( '#foto_morador_veiculo' ).html('');
            $( '#foto_veiculo_img' ).val(imageURI);
        }

        function onFail(message) {
            //alert('Câmera Indisponível');
        }    
    }, foto_veiculo4: function() {
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
			correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL,
            saveToPhotoAlbum: true
        });
        function onSuccess(imageURI) { 
            $( '#foto_visitante_veiculo' ).css("background-image", "url(data:image/jpeg;base64,"+imageURI+")");
            $( '#l_foto_veiculo_img' ).val(imageURI);
			$( '.visitante_car').hide();
			// alert('Câmera disponivel');

        }

        function onFail(message) {
            //alert('Câmera Indisponível');
        }    
    },
    
    foto_veiculo2: function() {
        
	   navigator.camera.getPicture(onSuccess, onFail, {  
            quality: 50, 
		  	correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL, 
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY 
        }); 
        
        function onSuccess(imageURI) {
            
            $( '#foto_morador_veiculo' ).css("background-image", "url(data:image/jpeg;base64,"+imageURI+")");
			$( '#foto_morador_veiculo' ).html('');
            $( '#foto_veiculo_img' ).val(imageURI);

        }

        function onFail(message) {
            //alert('Câmera Indisponível');
        }    
    },
	foto_veiculo3: function() {
        
	   navigator.camera.getPicture(onSuccess, onFail, {  
            quality: 50,
		  	correctOrientation: true,
            destinationType: Camera.DestinationType.DATA_URL, 
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY 
        }); 
        
        function onSuccess(imageURI) {
            
            $( '#foto_visitante_veiculo' ).css("background-image", "url(data:image/jpeg;base64,"+imageURI+")");
            $( '#l_foto_veiculo_img' ).val(imageURI);
			$( '.visitante_car').hide();

        }

        function onFail(message) {
            //alert('Câmera Indisponível');
        }    
    },
//---------------------------------------------------------
    setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "12345678"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
            console.log('Received Event: ' + id);
        });
    },
        
    remove_pull: function(){
		
		$("#notificacoes"    ).removeClass("ptr-content");
		$("#pull-liberacao"  ).removeClass("ptr-content");
		$("#pull-liberacao" ).removeClass("ptr-refreshing");
		$("#pull-liberacao2"  ).removeClass("ptr-content");
		$("#pull-liberacao2" ).removeClass("ptr-refreshing");
		$("#pull-comunicados").removeClass("ptr-content");
		$("#pull-mreserva").removeClass("ptr-content");
		$("#pull-entregas"   ).removeClass("ptr-content");
		$("#pull-entregas" ).removeClass("ptr-refreshing");
		$("#pull-enquetes"   ).removeClass("ptr-content");
		$("#pull-enquetes" ).removeClass("ptr-refreshing");
		$("#pull-documentos" ).removeClass("ptr-content");
		$("#pull-documentos" ).removeClass("ptr-refreshing");
		$("#pull-ocorrencias" ).removeClass("ptr-content");
		$("#pull-ocorrencias" ).removeClass("ptr-refreshing");
		$("#pull-tickets" ).removeClass("ptr-content");
		$("#pull-tickets" ).removeClass("ptr-refreshing");
		$("#pull-pet" ).removeClass("ptr-refreshing");
		$("#pull-mudancas" ).removeClass("ptr-content");
		$("#pull-mudancas" ).removeClass("ptr-refreshing");
		$("#pull-recorrente" ).removeClass("ptr-content");
		$("#pull-recorrente" ).removeClass("ptr-refreshing");
		
		//$("#pull-minha-reserva" ).removeClass("ptr-content");
	},
	controler_pull: function(pag){
		"use strict";
		app.remove_pull();
		//alert('controler_pull -> limpando -> '+pag);
		if(pag==='home'){
			$("#notificacoes"    ).addClass("ptr-content");	
		}else if(pag==='liberacao'){
			$("#pull-liberacao"  ).addClass("ptr-content");
		}else if(pag==='liberacao2'){
			$("#pull-liberacao2"  ).addClass("ptr-content");
		}else if(pag==='comunicados'){
			$("#pull-comunicados").addClass("ptr-content");
		}else if(pag==='entregas'){
			$("#pull-entregas").addClass("ptr-content");
		}else if(pag==='enquetes'){
			$("#pull-enquetes").addClass("ptr-content");
			//alert(localStorage.getItem('TELA_ATUAL'));
		}else if(pag==='documentos'){
			$("#pull-documentos").addClass("ptr-content");
			//alert('saindo do controler_pull');
		}else if(pag=='ocorrencias'){
			$("#pull-ocorrencias").addClass("ptr-content");
			
			//$("#pull-ocorrencias" ).addClass("ptr-refreshing");
			//alert('saindo do controler_pull');
		}else if(pag==='ocorrencias_ticket'){
			$("#pull-tickets").addClass("ptr-content");
			//$("#pull-tickets" ).addClass("ptr-refreshing");
			//alert('saindo do controler_pull');
		}else if(pag==='minha_reserva'){
			$("#pull-mreserva").addClass("ptr-content");
			//alert('saindo do controler_pull');
		}else if(pag==='pet'){
			$("#pull-pet").addClass("ptr-content");

		}else if(pag==='mudancas'){
			$("#pull-mudancas").addClass("ptr-content");
			//alert('saindo do controler_pull');
		}else if(pag==='minha_casa_recorrente'){
			$("#pull-recorrente").addClass("ptr-content");
			//alert('saindo do controler_pull');
		}
	},
	pull_to_refresh: function(res){
		
		//alert('pull refresh '+res);
		if(res==='home'){
			carrega_notificacoes(0);
		}else if(res==='liberacao_list'){
			carrega_liberacao(0);
		}else if(res==='liberacao_list2'){
			carrega_liberacao2(0);
		}else if(res==='comunicados'){
			carrega_comunicados(0);
		}else if(res==='entregas'){
			carrega_entregas(0);
		}else if(res==='enquetes'){
			carrega_enquetes(0);
		}else if(res==='documentos'){
			carrega_documentos(0);
		}else if(res=='ocorrencias'){
			var ordem = $("#ol_ordem").val();
			//alert('pull_to_refresh'+ordem);
			carrega_ocorrencias(ordem);
		}else if(res==='ocorrencias_ticket'){
			carrega_tickets(0);
		}else if(res==='minha_reserva'){
			//carrega_tickets(0);
            carrega_minha_reserva(0);
		}else if(res==='pet'){
			//carrega_tickets(0);
            carrega_pets(0);
		}else if(res==='mudancas'){
			//carrega_tickets(0);
            carrega_mudancas(0);
		}else if(res==='minha_casa_recorrente'){
			//carrega_tickets(0);
            meus_recorrentes();
		}
		//alert('terminado');
	},
	// controle de visualizacao do BOXUP
    ckBoxUp: function(id,origem){
		//alert('index.js: ckBoxUp: '+$(origem).scrollTop()+" id:"+id);
		if(($(origem).scrollTop()>40)){
			$(id).fadeIn();
		}else{
			$(id).hide();
		}	
	},
	getFormattedDate: function (date) {
        
        var dt_1 = date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
//	  var year = date.getFullYear();
//
//	  var month = (1 + date.getMonth()).toString();
//	  month = month.length > 1 ? month : '0' + month;
//
//	  var day = date.getDate().toString();
//	  day = day.length > 1 ? day : '0' + day;
//
//	  return year + '/' + month + '/' + day;
        return dt_1;
	}

};




