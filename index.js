

const DcsBiosApi = require('dcs-bios-api');

const XTouch = require('./xtouch.js');

const xtouch = new XTouch();
xtouch.on('msg', (msg, knob, delta, pushed) => {
  console.log(msg, knob, delta, pushed)
})

var api = new DcsBiosApi({ logLevel: 'INFO' });
api.startListening();

process.on('SIGINT', () => {
  xtouch.close();
  api.stopListening();
  process.exit();
});

const hsiPage = xtouch.addPageButton(1)
const amRadioPage = xtouch.addPageButton(2)
const uhfRadioPage = xtouch.addPageButton(3)
const fmRadioPage = xtouch.addPageButton(4)
const lightsPage = xtouch.addPageButton(5)

hsiPage.on('knob_1_turn', (knob, delta, pushed) => {
  api.sendMessage(`HSI_HDG_KNOB ${delta * 320 * (pushed ? 10 : 1)}\n`);
});
hsiPage.on('knob_2_turn', (knob, delta, pushed) => {
  api.sendMessage(`HSI_CRS_KNOB ${delta * 320 * (pushed ? 10 : 1)}\n`);
});

hsiPage.on('knob_3_turn', (knob, delta, pushed) => {
  api.sendMessage(`ALT_SET_PRESSURE ${delta * 320 * (pushed ? 10 : 1)}\n`);
  console.log(`ALT_SET_PRESSURE ${delta * 320 * (pushed ? 10 : 1)}`);
});

hsiPage.on('knob_4_turn', (knob, delta, pushed) => {
  api.sendMessage(`CMSP_MODE  ${delta > 0 ? 'INC' : 'DEC'}\n`);
  console.log(`CMSP_MODE  ${delta > 0 ? 'INC' : 'DEC'}\n`);
});

hsiPage.on('knob_5_turn', (knob, delta, pushed) => {
  api.sendMessage(`TACAN_10 ${delta > 0 ? 'INC' : 'DEC'}\n`);
  console.log(`TACAN_10 ${delta > 0 ? 'INC' : 'DEC'}\n`);
});
hsiPage.on('knob_6_turn', (knob, delta, pushed) => {
  api.sendMessage(`TACAN_1 ${delta > 0 ? 'INC' : 'DEC'}\n`);
  console.log(`TACAN_1 ${delta > 0 ? 'INC' : 'DEC'}\n`);
});
hsiPage.on('knob_6_up', (knob, delta, pushed) => {
  api.sendMessage(`TACAN_XY TOGGLE\n`);
  console.log(`TACAN_XY TOGGLE\n`);
});

hsiPage.on('knob_7_turn', (knob, delta, pushed) => {
  api.sendMessage(`ILS_MHZ  ${delta > 0 ? 'INC' : 'DEC'}\n`);
  console.log(`ILS_MHZ ${delta > 0 ? 'INC' : 'DEC'}\n`);
});
hsiPage.on('knob_8_turn', (knob, delta, pushed) => {
  api.sendMessage(`ILS_KHZ ${delta > 0 ? 'INC' : 'DEC'}\n`);
  console.log(`ILS_KHZ ${delta > 0 ? 'INC' : 'DEC'}\n`);
});


amRadioPage.on('knob_1_turn', (knob, delta, pushed) => {
  api.sendMessage(`VHFAM_FREQ1 ${delta > 0 ? 'INC' : 'DEC'}\n`);
});

amRadioPage.on('knob_2_turn', (knob, delta, pushed) => {
  api.sendMessage(`VHFAM_FREQ2 ${delta > 0 ? 'INC' : 'DEC'}\n`);
});

amRadioPage.on('knob_3_turn', (knob, delta, pushed) => {
  api.sendMessage(`VHFAM_FREQ3 ${delta > 0 ? 'INC' : 'DEC'}\n`);
});

amRadioPage.on('knob_4_turn', (knob, delta, pushed) => {
  api.sendMessage(`VHFAM_FREQ4 ${delta > 0 ? 'INC' : 'DEC'}\n`);
});



uhfRadioPage.on('knob_1_turn', (knob, delta, pushed) => {
  api.sendMessage(`UHF_100MHZ_SEL ${delta > 0 ? 'INC' : 'DEC'}\n`);
  console.log(`UHF_100MHZ_SEL ${delta > 0 ? 'INC' : 'DEC'}`);
});

uhfRadioPage.on('knob_2_turn', (knob, delta, pushed) => {
  api.sendMessage(`UHF_10MHZ_SEL ${delta > 0 ? 'INC' : 'DEC'}\n`);
  console.log(`UHF_10MHZ_SEL ${delta > 0 ? 'INC' : 'DEC'}`);
});

uhfRadioPage.on('knob_3_turn', (knob, delta, pushed) => {
  api.sendMessage(`UHF_1MHZ_SEL ${delta > 0 ? 'INC' : 'DEC'}\n`);
  console.log(`UHF_1MHZ_SEL ${delta > 0 ? 'INC' : 'DEC'}`);
});

uhfRadioPage.on('knob_4_turn', (knob, delta, pushed) => {
  api.sendMessage(`UHF_POINT1MHZ_SEL ${delta > 0 ? 'INC' : 'DEC'}\n`);
  console.log(`UHF_POINT1MHZ_SEL ${delta > 0 ? 'INC' : 'DEC'}`);
});

uhfRadioPage.on('knob_4_turn', (knob, delta, pushed) => {
  api.sendMessage(`UHF_POINT25_SEL ${delta > 0 ? 'INC' : 'DEC'}\n`);
  console.log(`UHF_POINT25_SEL ${delta > 0 ? 'INC' : 'DEC'}`);
});

uhfRadioPage.on('knob_5_turn', (knob, delta, pushed) => {
  api.sendMessage(`UHF_PRESET_SEL ${delta > 0 ? 'INC' : 'DEC'}\n`);
  console.log(`UHF_PRESET_SEL ${delta > 0 ? 'INC' : 'DEC'}`);
});



fmRadioPage.on('knob_1_turn', (knob, delta, pushed) => {
  api.sendMessage(`VHFFM_FREQ1 ${delta > 0 ? 'INC' : 'DEC'}\n`);
  console.log(`VHFFM_FREQ1 ${delta > 0 ? 'INC' : 'DEC'}`);
});

fmRadioPage.on('knob_2_turn', (knob, delta, pushed) => {
  api.sendMessage(`VHFFM_FREQ2 ${delta > 0 ? 'INC' : 'DEC'}\n`);
  console.log(`VHFFM_FREQ2 ${delta > 0 ? 'INC' : 'DEC'}`);
});

fmRadioPage.on('knob_3_turn', (knob, delta, pushed) => {
  api.sendMessage(`VHFFM_FREQ3 ${delta > 0 ? 'INC' : 'DEC'}\n`);
  console.log(`VHFFM_FREQ3 ${delta > 0 ? 'INC' : 'DEC'}`);
});

fmRadioPage.on('knob_4_turn', (knob, delta, pushed) => {
  api.sendMessage(`VHFFM_FREQ4 ${delta > 0 ? 'INC' : 'DEC'}\n`);
  console.log(`VHFFM_FREQ4 ${delta > 0 ? 'INC' : 'DEC'}`);
});

 

/*

8 pagine, comandate con gli 8 bottoni della fila in basso
ogni pagina ha 8 bottoni (toggle o pushbutton) e 8 knob. 
ogni knob può avere due "velocità" (premuto o non premuto) oppure un ulteriore pushbutton

il fader è globale

i due bottoni layer a/b cambiano layer. i due layer hanno le stesse pagine, e consentono di passare rapidamente
tra la pagina selezionata nel primo e la pagina selezionata nel secondo

pagine a-10c:
volume mixer
radio am
radio uhf
radio fm
luci
heading, course, altimeter, cmsp mode, tacan 1+2, ils 1+2

https://stackoverflow.com/questions/39435550/changing-leds-on-x-touch-mini-mackie-control-mc-mode

KNOB PUSH
32  33  34  35  36  37  38  39
input down: message { channel: 0, note: 32, velocity: 127, _type: 'noteon' }
input up: message { channel: 0, note: 32, velocity: 0, _type: 'noteon' }

KNOB TURN (cc)
16  17  18  19  20  21  22  23
input CW: message { channel: 0, controller: 16, value: 1, _type: 'cc' }
input CCW: message { channel: 0, controller: 16, value: 65, _type: 'cc' }

output:
output.send('cc', { channel: 0, controller: 48, value: 36 });
controller: 48  49  50  51  52  53  54  55
value:
0 = OFF
1-11 = SINGLE
17-27 = TRIM
33-43 = FAN
49-54 = SPREAD


BUTTONS
89  90  40  41  42  43  44  45      84
87  88  91  92  86  93  94  95      85
input down: message { channel: 0, note: 89, velocity: 0, _type: 'noteon' }
input up: message { channel: 0, note: 89, velocity: 0, _type: 'noteon' }
output on: output.send('noteon', {  channel: 0, note: 89, velocity: 127 });
output off: output.send('noteon', {  channel: 0, note: 89, velocity: 0 });
output blink: output.send('noteon', {  channel: 0, note: 89, velocity: 1 });





Button LEDs

Note:

Same as the input note when pressing down the button.
40-45, 84-95
Velocity:

0 = OFF
1 = BLINK
127 = ON
Example:

ShortMessage(NOTE_ON, 0, note, velocity);
As noted by CL.'s answer use the constant NOTE_ON (144). You are currently providing 8 which is an invalid command.

Knob LEDs

CC (Control Change):

48-55
Value:

0 = OFF
1-11 = SINGLE
17-27 = TRIM
33-43 = FAN
49-54 = SPREAD
Example:

ShortMessage(CONTROL_CHANGE, 0, cc, value);
*/

/* DEBUG */
/*
input.on('noteoff', function (msg) {
  console.log('noteoff', msg.note, msg.velocity, msg.channel);
});

input.on('noteon', function (msg) {
  console.log('noteon', msg.note, msg.velocity, msg.channel);
});

input.on('poly aftertouch', function (msg) {
  console.log('poly aftertouch', msg.note, msg.pressure, msg.channel);
});

input.on('cc', function (msg) {
  console.log('cc', msg.controller, msg.value, msg.channel);

});

input.on('program', function (msg) {
  console.log('program', msg.number, msg.channel);
});

input.on('channel aftertouch', function (msg) {
  console.log('channel aftertouch', msg.pressure, msg.channel);
});

input.on('pitch', function (msg) {
  console.log('pitch', msg.value, msg.channel);
});

input.on('position', function (msg) {
  console.log('position', msg.value);
});

input.on('select', function (msg) {
  console.log('select', msg.song);
});

input.on('clock', function () {
  console.log('clock');
});

input.on('start', function () {
  console.log('start');
});

input.on('continue', function () {
  console.log('continue');
});

input.on('stop', function () {
  console.log('stop');
});

input.on('reset', function () {
  console.log('reset');
});
*/