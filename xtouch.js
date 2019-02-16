const easymidi = require('easymidi');
const EventEmitter = require('events').EventEmitter;


var XTouch = function () {
    const input = new easymidi.Input('X-TOUCH MINI 0');
    const output = new easymidi.Output('X-TOUCH MINI 1');

    const pages = {

    }

    var currentPage

    /*
    89  90  40  41  42  43  44  45      84
    87  88  91  92  86  93  94  95      85
    */
    const notesToButtons = {
        // first row
        89: 1,
        90: 2,
        40: 3,
        41: 4,
        42: 5,
        43: 6,
        44: 7,
        45: 8,
        // second row
        87: 9,
        88: 10,
        91: 11,
        92: 12,
        86: 13,
        93: 14,
        94: 15,
        95: 16
    }

    const notesToKnobs = {
        32: 1,
        33: 2,
        34: 3,
        35: 4,
        36: 5,
        37: 6,
        38: 7,
        39: 8
    }

    const knobLedsToContorller = {
        48: 1,
        49: 2,
        50: 3,
        51: 4,
        52: 5,
        53: 6,
        54: 7,
        55: 8
    }

    const controllerToKnob = {
        16: 1,
        17: 2,
        18: 3,
        19: 4,
        20: 5,
        21: 6,
        22: 7,
        23: 8
    }

    const notesToLayer = {
        84: 'A',
        85: 'B'
    }

    const knobState = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false
    }

    // MC mode (l'unico con movimenti relativi degli encoder)
    output.send('cc', {
        channel: 0,
        controller: 127,
        value: 1
    });

    // spengo tutti i led
    for (var note in notesToButtons)
        output.send('noteon', {
            channel: 0,
            note: note,
            velocity: 0
        });

    for (var note in notesToLayer)
        output.send('noteon', {
            channel: 0,
            note: note,
            velocity: 127
        });

    for (var controller in knobLedsToContorller)
        output.send('cc', {
            channel: 0,
            controller: controller,
            value: 0
        });

    // listener per bottoni e knob up/down
    input.on('noteon', msg => {
        if (notesToButtons[msg.note]) {
            const button = notesToButtons[msg.note];
            if (currentPage && !pages[button]) {
                if (msg.velocity == 127) {
                    currentPage.emit(`button_${button}_down`)
                    currentPage.emit('button_down', button)
                    currentPage.emit('msg', 'button_down', button)
                } else if (msg.velocity == 0) {
                    currentPage.emit(`button_${button}_up`)
                    currentPage.emit('button_up', button)
                    currentPage.emit('msg', 'button_up', button)
                }
            }
            if (msg.velocity == 127) {
                this.emit(`button_${button}_down`)
                this.emit('button_down', button)
                this.emit('msg', 'button_down', button)
            } else if (msg.velocity == 0) {
                this.emit(`button_${button}_up`)
                this.emit('button_up', button)
                this.emit('msg', 'button_up', button)
            }
        } else if (notesToKnobs[msg.note]) {
            const knob = notesToKnobs[msg.note];
            if (msg.velocity == 127) {
                knobState[knob] = true
                this.emit('knob_down', knob)
                this.emit('msg', 'knob_down', knob)
                if (currentPage) {
                    currentPage.emit('knob_down', knob)
                    currentPage.emit('msg', 'knob_down', knob)
                }
            } else if (msg.velocity == 0) {
                this.emit('knob_up', knob)
                this.emit('msg', 'knob_up', knob)
                if (currentPage) {
                    currentPage.emit('knob_up', knob)
                    currentPage.emit('msg', 'knob_up', knob)
                }
                knobState[knob] = false
            }
        } else if (notesToLayer[msg.note]) {
            if (msg.velocity == 0) {
                this.emit('layer', notesToLayer[msg.note])
                this.emit('msg', 'layer', notesToLayer[msg.note])
            }
        }
    })

    // listener per knob turn
    input.on('cc', msg => {
        if (controllerToKnob[msg.controller]) {
            var delta = msg.value
            if (delta > 64) {
                delta = 64 - delta
            }
            if (currentPage) {
                currentPage.emit(`knob_${controllerToKnob[msg.controller]}_turn`, controllerToKnob[msg.controller], delta, knobState[controllerToKnob[msg.controller]])
                currentPage.emit('knob_turn', controllerToKnob[msg.controller], delta, knobState[controllerToKnob[msg.controller]])
                currentPage.emit('msg', 'knob_turn', controllerToKnob[msg.controller], delta, knobState[controllerToKnob[msg.controller]])                
            }
            this.emit(`knob_${controllerToKnob[msg.controller]}_turn`, controllerToKnob[msg.controller], delta, knobState[controllerToKnob[msg.controller]])
            this.emit('knob_turn', controllerToKnob[msg.controller], delta, knobState[controllerToKnob[msg.controller]])
            this.emit('msg', 'knob_turn', controllerToKnob[msg.controller], delta, knobState[controllerToKnob[msg.controller]])
        }
    })

    // listener per fader
    input.on('pitch', msg => {
        this.emit('fader', msg.value / 128 / 127 * 100)
        this.emit('msg', 'fader', msg.value / 128 / 127 * 100)
    })

    // gestione pagine
    this.on('button_up', button => {
        if (pages[button]) {
            setCurrentPage(button)
        }
    });

    var setCurrentPage = function(button)  {
        if (pages[button]) {
            currentPage = pages[button]

            for (var note in notesToButtons) {
                output.send('noteon', {
                    channel: 0,
                    note: note,
                    velocity: notesToButtons[note] == button ? 127 : 0
                });
            }
        }
    }

    this.addPageButton = function (button) {
        pages[button] = new EventEmitter()

        if (!currentPage) {
            setCurrentPage(button)
        }
        return pages[button]
    };

    this.close = function () {
        input.close();
        output.close();
    };
    
}

XTouch.prototype = Object.create(EventEmitter.prototype);


module.exports = XTouch;