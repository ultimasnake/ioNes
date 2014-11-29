# ioNes

ioNes is a web-based NES emulator written in javascript aimed at IOS devices to compensate for the lack of emulators through the Apple Appstore. The emulation is based on JSNES by Ben Firshman (https://fir.sh/projects/jsnes/). ioNes plugs in to JSNES for rewritting audio, adding touch input and using Dropbox for file handling. 

### ioNes offers the following features:

  - Full video rendering
  - Load roms from your Dropbox account
  - Play audio (needs finetuning)
  - Touchscreen input based controlls

### What features are not offered at this point
- State saves
- Upscaling filtering
- (any requests?)

### ioNes utilizes the following libraries

- JSNES (https://fir.sh/projects/jsnes/)
- Jquery v1.11.1 (https://www.jquery.com)
- JqMultiTouch (http://dev.globis.ethz.ch/jqmultitouch/1.0/)
- Dropbox Dropins (https://www.dropbox.com/developers/dropins)
- RiffWave (http://www.codebase.es/riffwave/)
- Base64Binary (source unkonwn)

### ioNes is currently tested and working on the following devices
###### Iphone 6 Plus, IOS 8.1.1, Mobile Safari
- Steady framerate (56 fps avg) without audio
- Steady framerate (52 fps avg) with audio, minor audio lags

###### Ipad 2, IOS 8.1.1, Mobile Safari
- Horrible framerate (20 fps avg) without audio
- Unplayable with audio

### Version 0.1 (2014-11-29)
Initial commit to github with all basics working as required.