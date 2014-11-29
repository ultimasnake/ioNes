var ioNesTouch = {
	
	buttons : {
		keypad: {
			width: 0.35
		},
		select: {
			width: 0.15
		},
		start: {
			width: 0.15
		},
		b: {
			width: 0.175
		},
		a: {
			width: 0.175
		}
	},
	
	keypad: null,
	keypadWidth: 0,
	
	initialize: function()
	{
		$.touch.triggerMouseEvents = true;
	
		ioNesTouch.keypad = $('.keypad');
		ioNesTouch.keypad.hide();
		
		$('.toucharea').touchable({
			touchDown: ioNesTouch.touched,
			touchMove: ioNesTouch.touched,
			touchUp: ioNesTouch.untouched
		});
		
		ioNesTouch.calculateTouchAreas();
	},
	
	calculateTouchAreas:function()
	{
		var window_width = $( window ).width();
		var window_height = $( window ).height();
		
		if( ioNesTouch.keypad != null )
		{
			ioNesTouch.keypadWidth =  window_width * ( ioNesTouch.buttons.keypad.width * 0.5 );
			ioNesTouch.keypad.width( ioNesTouch.keypadWidth );
		}
		
		var x_start = 0;
		$.each( ioNesTouch.buttons, function( key, button ){
			ioNesTouch.buttons[ key ].x_start = x_start;
			ioNesTouch.buttons[ key ].x_end	= x_start + (window_width * button.width );
			ioNesTouch.buttons[ key ].y_start = 0;
			ioNesTouch.buttons[ key ].y_end	= window_height;
			x_start = ioNesTouch.buttons[ key ].x_end;
		});
	},
	
	touched: function( e, touchHistory )
	{
		$.each( ioNesTouch.buttons, function( key, button )
		{
			if( e.clientX > button.x_start && e.clientX < button.x_end )
			{
				if( typeof $.touch.allTouches[ e.touch.id ].button != 'undefined' && $.touch.allTouches[ e.touch.id ].button != key )
				{
					ioNesTouch.emulateButtonState( $.touch.allTouches[e.touch.id].button, false );
					if( key == 'keypad' )
					{
						ioNesTouch.keypad.hide();
					}
				}
			
				$.touch.allTouches[ e.touch.id ].button = key;
				
				if( key == 'keypad' )
				{
					if( e.type == 'touchdown' || typeof button.touch_start == 'undefined' )
					{
						button.touch_start = {
							x_start: e.clientX,
							y_start: e.clientY
						};
						
						ioNesTouch.keypad.css({
							left: e.clientX - ( ioNesTouch.keypadWidth / 2 ),
							top: e.clientY - ( ioNesTouch.keypadWidth / 2 )
						}).show();
						
					}else{
						var precentage_horizontal = 100 - ( ( e.clientX / button.touch_start.x_start ) * 100 );
						var precentage_vertical = 100 - ( ( e.clientY / button.touch_start.y_start ) * 100 );
				
						if( precentage_horizontal < -10 && ( precentage_vertical > -10 && precentage_vertical < 10 ) )
						{
							key += 'right';
						}
						if( precentage_horizontal > 10 && ( precentage_vertical > -10 && precentage_vertical < 10 )  )
						{
							key += 'left';
						}
						if( precentage_vertical < -10 && ( precentage_horizontal > -10 && precentage_horizontal < 10 ) )
						{
							key += 'down';
						}
						if( precentage_vertical > 10 && ( precentage_horizontal > -10 && precentage_horizontal < 10 ) )
						{
							key += 'up';
						}
				
						if( key != 'keypad' )
						{
							ioNesTouch.emulateButtonState( key, true );
						}
					}
				}else{
					ioNesTouch.emulateButtonState( key, true );
				}
				
			}
		});
	},
	
	untouched: function( e, touchHistory )
	{
		if( typeof $.touch.allTouches[ e.touch.id ].button != 'undefined' )
		{
			ioNesTouch.emulateButtonState( $.touch.allTouches[ e.touch.id ].button, false );
			if( $.touch.allTouches[ e.touch.id ].button == 'keypad' )
			{
				ioNesTouch.keypad.hide();
			}
		}
	},
	
	emulateButtonState: function( button, pressed )
	{
		var button_state = pressed ? 0x41 : 0x40;
		switch( button )
		{
			case 'keypad':
				ioNesTouch.resetKeypad();
			break;
			case 'keypadup':
				ioNesTouch.resetKeypad();
				nes.keyboard.setKey( 38, button_state );
				break;
			case 'keypadright':
				ioNesTouch.resetKeypad();
				nes.keyboard.setKey( 39, button_state );
				break;
			case 'keypaddown':
				ioNesTouch.resetKeypad();
				nes.keyboard.setKey( 40, button_state );
				break;
			case 'keypadleft':
				ioNesTouch.resetKeypad();
				nes.keyboard.setKey( 37, button_state );
				break;
			case 'select':
				nes.keyboard.setKey( 17, button_state );
				break;
			case 'start':
				nes.keyboard.setKey( 13, button_state );
				break;
			case 'b':
				ioNesTouch.resetBA();
				nes.keyboard.setKey( 89, button_state );
				break;
			case 'a':
				ioNesTouch.resetBA();
				nes.keyboard.setKey( 88, button_state );
				break;
		}
	},
	
	resetKeypad: function()
	{
		nes.keyboard.setKey( 38, false );
		nes.keyboard.setKey( 39, false );
		nes.keyboard.setKey( 40, false );
		nes.keyboard.setKey( 37, false );
	},
	
	resetBA: function()
	{
		nes.keyboard.setKey( 38, false );
		nes.keyboard.setKey( 39, false );
		nes.keyboard.setKey( 40, false );
		nes.keyboard.setKey( 37, false );
	}
}