(function (window, document, $, undefined) {
    function runTests() {
            module('Third party config', {
                setup: function () {
                    FT.ads.config.clear();
                    window.iframe = $('<iframe>').appendTo('body');
                },
                teardown: function () {
                   window.iframe.remove();
                }
            });

            test('Config get/set', function () {
                var result, obj,
                    key = 'key',
                    invalid = 'invalid',
                    value = 'value',
                    value2 = 'value2';

                expect(7);

                strictEqual(typeof FT.ads.config, 'function', 'The set method exists');

                result = FT.ads.config(key, value);
                deepEqual(result, value, 'passing a key+value returns the value.');

                result = FT.ads.config();
                obj = {};
                obj[key] = value;
                deepEqual(result, obj, 'calling without params returns all config.');

                result = FT.ads.config(key);
                deepEqual(result, value, 'passing a valid key returns the value.');

                result = FT.ads.config(invalid);
                deepEqual(result, undefined, 'passing an invalid key returns undefined.');

                result = FT.ads.config(key, value2);
                deepEqual(result, value2, 'set an existing key returns the new value.');

                result = FT.ads.config(key);
                deepEqual(result, value2, 'get returns the new value.');
          });

        test('Config fetchMetaConfig', function () {
            QUnit.stop();
            iframe.load(function () {

                    // Use the iframe context for our assertions
                  expect(1);
                    var win = this.contentWindow;
                    var FT = win.FT;
                    var result =  FT.ads.config();

                ok(result.hasOwnProperty('metaconf1'), 'Meta value has been added to config');
                QUnit.start();
              });
              iframe.attr('src', '../iframes/third.party.switcher.meta.html');
        });

        test('Config fetchCookieConfig', function () {
            QUnit.stop();
            iframe.load(function () {

                    // Use the iframe context for our assertions
                expect(1);
                var win = this.contentWindow;
                var FT = win.FT;
                var result =  FT.ads.config();
                ok(result.hasOwnProperty('cookieconf1'), 'Cookie values have been added to config');
                QUnit.start();
              });
              iframe.attr('src', '../iframes/third.party.switcher.meta.html');
        });

        test('Config fetchGlobalConfig', function () {
            QUnit.stop();
            iframe.load(function () {
            // Use the iframe context for our assertions
                expect(1);
                var win = this.contentWindow;
                var FT = win.FT;
                var result =  FT.ads.config();
                ok(result.hasOwnProperty('globablconf1'), 'Global (env) values have been added to config');
                QUnit.start();
              });
              iframe.attr('src', '../iframes/third.party.switcher.global.html');
        });

    }
    $(runTests);
}(window, document, jQuery));
