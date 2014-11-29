var ioNesUI = {
	
	fpsTick: 1,
	fpsAvg: 0,
	
	initialize: function()
	{
		$(".download_rom, .click_to_load").on( 'click', ioNesUI.load_rom );
		$(".download_rom, .click_to_load").on( 'touchstart', ioNesUI.load_rom );
		$(".fa-file-audio-o").on( 'click', ioNesUI.toggle_audio ).fadeTo(0,0.5);
		$(".fa-file-audio-o").on( 'touchstart', ioNesUI.toggle_audio ).fadeTo(0,0.5);
	},
	
	load_rom: function()
	{
		Dropbox.choose({
			success: function(files) {
				$('.click_to_load').hide();
				ioNes.load( files[0].link)
			},
			linkType: 'direct',
			extensions: ['.nes']
		});
	},
	
	toggle_audio: function()
	{
		ioNesAudio.toggle();
		if( nes.opts.emulateSound )
		{
			$(".fa-file-audio-o").fadeTo(0,1);
		}else{
			$(".fa-file-audio-o").fadeTo(0,0.5);
		}
	}
}