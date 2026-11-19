/*
 * platform.js — browser/GitHub Pages compatibility shim.
 *
 * The games were written as a Cordova app:
 *   1. they load `cordova.js`, which only exists in a packaged native build;
 *   2. they wait for the `deviceready` event, which only Cordova fires;
 *   3. they speak through `TTS.speak(...)` from cordova-plugin-neutts.
 *
 * None of that exists when the same files are served by a static web host,
 * so this shim provides all three:
 *   - a no-op `cordova` global,
 *   - a `deviceready` event dispatch on DOMContentLoaded,
 *   - a `TTS` object backed by the Web Speech API.
 *
 * Loading this file before the other scripts fixes every game page at once.
 */
(function () {
    'use strict';

    var isCordova = typeof window.cordova !== 'undefined' && window.cordova !== null;
    if (isCordova) {
        // Running inside a real Cordova build: native plugin and lifecycle win.
        return;
    }

    // -- 1. Cordova namespace placeholder -----------------------------------
    window.cordova = window.cordova || {};
    if (typeof window.cordova.platformId === 'undefined') {
        window.cordova.platformId = 'browser';
    }

    // -- 2. deviceready ----------------------------------------------------
    // Cordova fires this on document after the native bridge is ready.
    // In a browser we dispatch it once the DOM is parsed, which is the
    // earliest point at which the games' DOM lookups can succeed.
    function fireReady() {
        var evt;
        try {
            evt = new Event('deviceready');
        } catch (e) {
            // Very old browsers: fall back to a legacy event.
            evt = document.createEvent('Event');
            evt.initEvent('deviceready', true, true);
        }
        document.dispatchEvent(evt);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fireReady, false);
    } else {
        // Scripts are at the end of <body>, so the DOM is already usable.
        setTimeout(fireReady, 0);
    }

    // -- 3. TTS via the Web Speech API --------------------------------------
    // Mirrors cordova-plugin-neutts: TTS.speak({text, locale}, callback?)
    var synth = window.speechSynthesis;
    var supported = !!synth && typeof window.SpeechSynthesisUtterance === 'function';

    var TTS = {
        speak: function (options, onDone) {
            options = options || {};
            var text = options.text == null ? '' : String(options.text);
            if (!text) {
                if (onDone) { onDone(); }
                return;
            }

            if (!supported) {
                // No speech available (or the user's browser lacks it):
                // stay silent rather than throwing, so gameplay continues.
                if (onDone) { onDone(); }
                return;
            }

            var utter = new window.SpeechSynthesisUtterance(text);
            utter.lang = options.locale || 'en-US';

            var finished = false;
            function done() {
                if (finished) { return; }
                finished = true;
                if (onDone) { onDone(); }
            }
            utter.onend = done;
            utter.onerror = done;

            // Cancel anything still queued so the newest prompt wins.
            // Kept last so a rejection cannot block the prompt itself.
            try {
                synth.cancel();
                synth.speak(utter);
            } catch (e) {
                done();
            }
        },
        stop: function () {
            if (supported) {
                try { synth.cancel(); } catch (e) { /* ignore */ }
            }
        }
    };

    window.TTS = window.TTS || TTS;
})();
