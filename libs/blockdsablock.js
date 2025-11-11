// BlockAdBlock
//
// Detects ad blockers
//
// (c) 2017-2022 Nicholas Westerhof
//
// This is a refactored and updated version of the original BlockAdBlock script
// created by an unknown author. It is licensed under the MIT license.

(function(window) {
    // --- Private Variables ---
    let BlockAdBlock = function(options) {
        this._options = {
            checkOnLoad: true,
            resetOnEnd: true,
            loopCheckTime: 50,
            loopMaxNumber: 5,
            baitClass: 'pub_300x250 pub_300x250m pub_728x90 text-ad text-banner text-adv text-ads text-advert text-advertisement text-advertisements',
            baitStyle: 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;',
            debug: false,
        };
        this._var = {
            version: '3.2.1',
            bait: null,
            checking: false,
            loop: null,
            loopNumber: 0,
            event: {
                detected: [],
                notDetected: [],
            }
        };
        if (options !== undefined) {
            this.setOption(options);
        }

        let self = this;
        let eventCallback = function() {
            setTimeout(function() {
                if (self._options.checkOnLoad === true) {
                    if (self._var.bait === null) {
                        self._creatBait();
                    }
                    setTimeout(function() {
                        self.check();
                    }, 1);
                }
            }, 1);
        };

        if (window.addEventListener) {
            window.addEventListener('load', eventCallback, false);
        } else {
            window.attachEvent('onload', eventCallback);
        }
    };

    BlockAdBlock.prototype._creatBait = function() {
        let bait = document.createElement('div');
        bait.setAttribute('class', this._options.baitClass);
        bait.setAttribute('style', this._options.baitStyle);
        this._var.bait = window.document.body.appendChild(bait);

        this._var.bait.offsetParent;
        this._var.bait.offsetHeight;
        this._var.bait.offsetLeft;
        this._var.bait.offsetTop;
        this._var.bait.offsetWidth;
        this._var.bait.clientHeight;
        this._var.bait.clientWidth;

        if (this._options.debug === true) {
            this._log('Bait has been created');
        }
    };
    BlockAdBlock.prototype._destroyBait = function() {
        window.document.body.removeChild(this._var.bait);
        this._var.bait = null;

        if (this._options.debug === true) {
            this._log('Bait has been removed');
        }
    };

    BlockAdBlock.prototype.check = function(loop) {
        if (loop === undefined) {
            loop = true;
        }

        if (this._options.debug === true) {
            this._log('Checking...');
        }

        if (this._var.checking === true) {
            if (this._options.debug === true) {
                this._log('Already checking...');
            }
            return false;
        }
        this._var.checking = true;

        if (this._var.bait === null) {
            this._creatBait();
        }

        let self = this;
        this._var.loopNumber = 0;
        if (loop === true) {
            this._var.loop = setInterval(function() {
                self._checkBait(loop);
            }, this._options.loopCheckTime);
        }
        setTimeout(function() {
            self._checkBait(loop);
        }, 1);

        if (this._options.debug === true) {
            this._log('Checking has been started');
        }

        return true;
    };

    BlockAdBlock.prototype._checkBait = function(loop) {
        let detected = false;

        if (this._var.bait === null) {
            this._creatBait();
        }

        if (window.document.body.getAttribute('abp') !== null ||
            this._var.bait.offsetParent === null ||
            this._var.bait.offsetHeight == 0 ||
            this._var.bait.offsetLeft == 0 ||
            this._var.bait.offsetTop == 0 ||
            this._var.bait.offsetWidth == 0 ||
            this._var.bait.clientHeight == 0 ||
            this._var.bait.clientWidth == 0) {
            detected = true;
        }
        if (window.getComputedStyle !== undefined) {
            let baitTemp = window.getComputedStyle(this._var.bait, null);
            if (baitTemp.getPropertyValue('display') == 'none' ||
                baitTemp.getPropertyValue('visibility') == 'hidden') {
                detected = true;
            }
        }

        if (this._options.debug === true) {
            this._log('Bait properties: ' +
                'offsetParent=' + this._var.bait.offsetParent + ', ' +
                'offsetHeight=' + this._var.bait.offsetHeight + ', ' +
                'offsetLeft=' + this._var.bait.offsetLeft + ', ' +
                'offsetTop=' + this._var.bait.offsetTop + ', ' +
                'offsetWidth=' + this._var.bait.offsetWidth + ', ' +
                'clientHeight=' + this._var.bait.clientHeight + ', ' +
                'clientWidth=' + this._var.bait.clientWidth
            );
        }

        if (loop === true) {
            this._var.loopNumber++;
            if (this._var.loopNumber >= this._options.loopMaxNumber) {
                this._stopLoop();
            }
        }

        if (detected === true) {
            this._stopLoop();
            this._destroyBait();
            this.emitEvent(true);
            if (loop === true) {
                this._var.checking = false;
            }
        } else if (this._var.loop === null || loop === false) {
            this._destroyBait();
            this.emitEvent(false);
            if (loop === true) {
                this._var.checking = false;
            }
        }
    };
    BlockAdBlock.prototype._stopLoop = function() {
        clearInterval(this._var.loop);
        this._var.loop = null;
        this._var.loopNumber = 0;

        if (this._options.debug === true) {
            this._log('Loop has been stopped');
        }
    };

    BlockAdBlock.prototype.emitEvent = function(detected) {
        if (this._options.debug === true) {
            this._log('Event e_detected with value ' + detected);
        }

        let fns = detected ? this._var.event.detected : this._var.event.notDetected;
        for (let i in fns) {
            if (this._options.debug === true) {
                this._log('Call function ' + i + ' in event ' + (detected ? 'e_detected' : 'e_notDetected'));
            }
            fns[i]();
        }
        if (this._options.resetOnEnd === true) {
            this.clearEvent();
        }
        return this;
    };
    BlockAdBlock.prototype.clearEvent = function() {
        this._var.event.detected = [];
        this._var.event.notDetected = [];

        if (this._options.debug === true) {
            this._log('Event has been cleared');
        }
    };

    BlockAdBlock.prototype.on = function(detected, fn) {
        let events = detected ? this._var.event.detected : this._var.event.notDetected;
        events.push(fn);
        return this;
    };
    BlockAdBlock.prototype.onDetected = function(fn) {
        return this.on(true, fn);
    };
    BlockAdBlock.prototype.onNotDetected = function(fn) {
        return this.on(false, fn);
    };

    BlockAdBlock.prototype.setOption = function(options, value) {
        if (value !== undefined) {
            let key = options;
            options = {};
            options[key] = value;
        }

        for (let key in options) {
            this._options[key] = options[key];
            if (this._options.debug === true) {
                this._log('Option "' + key + '" has been set to "' + options[key] + '"');
            }
        }
        return this;
    };

    BlockAdBlock.prototype._log = function(message) {
        console.log('[BlockAdBlock] ' + message);
    };

    window.BlockAdBlock = BlockAdBlock;
    
    // For backwards compatibility
    window.blockAdBlock = new BlockAdBlock();
    
})(window);