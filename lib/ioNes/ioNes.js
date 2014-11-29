// look into https://github.com/phoboslab/js-hqx

var ioNes = {
	JSNESScreen: null,
	JSNESStatus: null,
	
	Pad: 		null,
	PadWidth: 	null,
	Controls:	null,
	
	AudioInitialize: false,
	AudioPlayer: null,
	AudioWave: null,
	
	cpuState: null,
	ppuState: null,
	
	fpsTicks: 0,
	fpsAvg: 0,
	
	initialize: function(){
		$('.nes-controls, .nes-roms').hide();
		
		ioNes.JSNESScreen = $('.nes-screen');
		ioNes.JSNESStatus = $('.nes-status');
		
		/* Autoload
			ioNes.load( 'roms/[ROM HERE]' );
			$('.click_to_load').hide();
		*/
		
		$( window ).resize( ioNes.resize );
		ioNes.resize();
		
		nes.printFps = ioNes.printFps;
	},
	
	resize: function()
	{
		// Nes is 256*240 based keep the dimensions in tact
		
		var window_width = $( window ).width();
		var window_height = $( window ).height();
		var zoom = window_width / 256;
		if( 240 * zoom > window_height )
		{
			zoom = window_height / 240;
		}
		
		var width = 256 * zoom;
		var height = 240 * zoom;
		var halign = height < window_height ? ( window_height - height ) / 2 : 0; 
		var valign = width < window_width ? ( window_width - width ) / 2 : 0;
		ioNes.JSNESScreen.css({
			zoom: zoom,
			marginLeft: valign / zoom,
			marginTop: halign / zoom
		});
		
		ioNesTouch.calculateTouchAreas();
	},
	
    load: function( url ){
		 $.ajax({
            url: url,
            xhr: function() {
                var xhr = $.ajaxSettings.xhr();
                if (typeof xhr.overrideMimeType !== 'undefined') {
                    // Download as binary
                    xhr.overrideMimeType('text/plain; charset=x-user-defined');
                }
               	var  xhr = xhr;
                return xhr;
            },
            complete: function(xhr, status) {
                var i, data;
                if (JSNES.Utils.isIE()) {
                    var charCodes = JSNESBinaryToArray(
                        xhr.responseBody
                    ).toArray();
                    data = String.fromCharCode.apply(
                        undefined, 
                        charCodes
                    );
                }
                else {
                    data = xhr.responseText;
                }
                nes.loadRom(data);
                nes.start();
            }
        });
    },
	
	saveState:function()
	{
		ioNes.cpuState = nes.cpu.mem.slice(0);
		//ioNes.ppuState = nes.ppu.toJSON();
	},
	loadState:function()
	{
		if( ioNes.cpuState != null )
		{
			nes.cpu.mem = ioNes.cpuState.slice(0);
		//	nes.ppu.fromJSON( ioNes.ppuState );
		}
	},
	
	printFps: function( s )
	{
        var now = +new Date();
		var currentfps = ( nes.fpsFrameCount / ((now - nes.lastFpsTime) / 1000));
        var s = '';
        if (nes.lastFpsTime) {
            s += currentfps.toFixed(2)+' FPS';
        }
		
		if( ioNes.fpsTicks > 0 )
		{
			ioNes.fpsAvg = ( ( ioNes.fpsAvg * ( ioNes.fpsTicks - 1 ) ) + currentfps ) / ioNes.fpsTicks;
		}else{
			ioNes.fpsAvg = currentfps;
		}
		ioNes.fpsTicks++;
	
		s += "("+ioNes.fpsAvg.toFixed(2)+' AVG)';
			nes.ui.updateStatus(s);
        nes.fpsFrameCount = 0;
        nes.lastFpsTime = now;
		
		
		
		
	}
};