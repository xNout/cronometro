if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function time_format( counter ){
	var hour    = Math.floor( ( counter / 3600 ), 0);
	var minute  = Math.floor( ( counter % 3600 ) / 60, 0);
	var seconds = Math.floor( ( counter % 3600 ) % 60, 0);
	if( hour < 10 ) { hour = "0"+hour; }
	if( minute < 10 ) { minute = "0"+minute; }
	if( seconds < 10 ) { seconds = "0"+seconds; }
	return "{0}:{1}:{2}".format( hour, minute, seconds );
}

$(document).ready(function(){
	$(".init_crono").on("click", function(){

		if(!iniciado){
			init_crono();
		}

	});

	$(".pause_crono").on("click", function(){
		// alert( interval );
		if( interval != null ){
			show_reanude ( );
		}
		else{
			hidde_reanude ( );
		}
	});

	$(".reset_crono").on("click", function(){
		reset_crono();
	});

	function refresh_crono_display( ){
		$(".cronometro_secs").text(
			time_format( contador )
		);
	}

	function init_interval( ){
		interval = setInterval(
		function()
		{
			contador++;
			refresh_crono_display();
		}, 1000);
	}

	function disable_interval(){
		clearInterval(interval);
		interval = null;
	}

	function init_crono(){
		buttons_hide_show();
		iniciado = true;
		contador = 0;
		init_interval();
	}

	function buttons_hide_show(){
		$(".init_crono").toggleClass("hidden");
		$(".pause_crono").toggleClass("hidden");
		$(".reset_crono").toggleClass("hidden");
	}

	function reset_crono(){
		disable_interval();
		iniciado = false;
		contador = 0;
		buttons_hide_show();
		$(".pause_crono").parent().removeClass("col-md-offset-6");
		$(".pause_crono").parent().addClass("col-md-offset-5");
		$(".pause_crono").text("Pausar Cronometro");
		refresh_crono_display();
	}
	
	function show_reanude ( ){
		disable_interval();
		$(".pause_crono").text("Reanudar");
		$(".pause_crono").parent().removeClass("col-md-offset-5");
		$(".pause_crono").parent().addClass("col-md-offset-6");
	}

	function hidde_reanude ( ){
		$(".pause_crono").parent().removeClass("col-md-offset-6");
		$(".pause_crono").parent().addClass("col-md-offset-5");
		$(".pause_crono").text("Pausar Cronometro");
		init_interval( );
	}

	var iniciado = false;
	var contador = 0;
	var interval;
	refresh_crono_display();
});