var home_feed           = '';
var ref_liberacao       = '';
var ref_comunicado      = '';
var ref_correspondencia = '';
var ref_enquete         = '';
var ref_documento       = '';
localStorage.setItem('DOMINIO','https://www.controlcondo.com.br/controlcondo/');
//localStorage.setItem('DOMINIO','https://leo.controlcondo.com.br/controlcondo/');
var app = {
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
		$("#boxUp_comunicados").hide();
		$("#boxUp_entregas"   ).hide();
		$("#boxUp_enquetes"   ).hide();
		$("#boxUp_documentos" ).hide();
		
        $('#home').on('mousemove',function(e){
            if(swiper.realIndex != 1){
                afed('#fale_user','#fale_msg','','',2);
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
			var y=(($(this).scrollTop() + $(this).height()) + 71);
			var x=$(this).get(0).scrollHeight;
			//alert('pull liberacao');
			//alert(y+ ' iii '+x);
            if ((($(this).scrollTop() + $(this).height()) + 71) > $(this).get(0).scrollHeight) {
                carrega_liberacao(1);
            }
			app.ckBoxUp("#boxUp_liberacao","#pull-liberacao");
		});		
		
		$('#boxUp_liberacao').click(function(){
			$('#pull-liberacao').animate({
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
			var y=(($(this).scrollTop() + $(this).height()) + 71);
			var x=$(this).get(0).scrollHeight;
			//alert(y+ ' iii '+x);
            if ((($(this).scrollTop() + $(this).height()) + 71) > $(this).get(0).scrollHeight) {
                carrega_entregas(1);
            }
			app.ckBoxUp("#boxUp_entregas","#pull-entregas");
		});		
		
		$('#boxUp_entregas').click(function(){
			$('#pull-entregas').animate({
				scrollTop: 0
			},600)
		});
		
		$("#pull-documentos").scroll(function() { 
			var y=(($(this).scrollTop() + $(this).height()) + 71);
			var x=$(this).get(0).scrollHeight;
			//alert(y+ ' iii '+x);
            if ((($(this).scrollTop() + $(this).height()) + 71) > $(this).get(0).scrollHeight) {
                carrega_documentos(1);
            }
			app.ckBoxUp("#boxUp_documentos","#pull-documentos");
		});		
		
		$('#boxUp_documentos').click(function(){
			$('#pull-documentos').animate({
				scrollTop: 0
			},600)
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
			},600)
		});
		
    },
    
    foto_perfil: function() {
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            saveToPhotoAlbum: true
        });

        function onSuccess(imageURI) {
            
            $( '.user_foto' ).css("background-image", "url(data:image/jpeg;base64,"+imageURI+")");
            $.ajax({ 
                type: 'POST', 
                url        : localStorage.getItem('DOMINIO')+"appweb/foto/foto_insert.php", 
                crossDomain: true, 
                beforeSend : function() { }, 
                complete   : function() { }, 
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
            destinationType: Camera.DestinationType.DATA_URL, 
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY 
        }); 
        
        function onSuccess(imageURI) {
            
            $( '.user_foto' ).css("background-image", "url(data:image/jpeg;base64,"+imageURI+")");
            $.ajax({ 
                type: 'POST', 
                url        : localStorage.getItem('DOMINIO')+"appweb/foto/foto_insert.php", 
                crossDomain: true, 
                beforeSend : function() { }, 
                complete   : function() { }, 
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
    
    foto_visitante: function() {
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            saveToPhotoAlbum: true
        });
        function onSuccess(imageURI) { 
            $( '#foto_visitante' ).css("background-image", "url(data:image/jpeg;base64,"+imageURI+")");
            $( '#foto_up_visitante' ).val(imageURI);
        }

        function onFail(message) {
            //alert('Câmera Indisponível');
        }    
    },
    
    foto_visitante2: function() {
        
	   navigator.camera.getPicture(onSuccess, onFail, {  
            quality: 50, 
            destinationType: Camera.DestinationType.DATA_URL, 
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY 
        }); 
        
        function onSuccess(imageURI) {
            
            $( '#foto_visitante' ).css("background-image", "url(data:image/jpeg;base64,"+imageURI+")");
            $( '#foto_up_visitante' ).val(imageURI);

        }

        function onFail(message) {
            //alert('Câmera Indisponível');
        }    
    },

    foto_visitante3: function(id_visitante) {
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            saveToPhotoAlbum: true
        });
        function onSuccess(imageURI) { 
            $.ajax({ 
                type: 'POST', 
                url        : localStorage.getItem('DOMINIO')+"appweb/foto/foto_visitante_insert.php", 
                crossDomain: true, 
                beforeSend : function() { }, 
                complete   : function() { }, 
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
            destinationType: Camera.DestinationType.DATA_URL, 
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY 
        }); 
        
        function onSuccess(imageURI) {

            $.ajax({ 
                type: 'POST', 
                url        : localStorage.getItem('DOMINIO')+"appweb/foto/foto_visitante_insert.php", 
                crossDomain: true, 
                beforeSend : function() { }, 
                complete   : function() { }, 
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
		$("#pull-comunicados").removeClass("ptr-content");
		$("#pull-entregas"   ).removeClass("ptr-content");
		$("#pull-enquetes"   ).removeClass("ptr-content");
		$("#pull-documentos" ).removeClass("ptr-content");
	},
	controler_pull: function(pag){
		"use strict";
		app.remove_pull();
		//alert('controler_pull -> limpando -> '+pag);
		if(pag==='home'){
			$("#notificacoes"    ).addClass("ptr-content");	
		}else if(pag==='liberacao'){
			$("#pull-liberacao"  ).addClass("ptr-content");
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
		}
	},
	pull_to_refresh: function(res){
		"use strict";
		//alert('pull refresh '+res);
		if(res==='home'){
			carrega_notificacoes(0);
		}else if(res==='liberacao_list'){
			carrega_liberacao(0);
		}else if(res==='comunicados'){
			carrega_comunicados(0);
		}else if(res==='entregas'){
			carrega_entregas(0);
		}else if(res==='enquetes'){
			carrega_enquetes(0);
		}else if(res==='documentos'){
			carrega_documentos(0);
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
