const server = require('node-http-server');
const Browser = require('zombie');

describe('User visits demo page', function () {

    const browser = new Browser();

    before(function () {

        server.deploy({
            port: 9001
        });

        return browser.visit('http://localhost:9001/index.html');
    });

    describe('accordions that are tabs', function () {

        before(function (done) {
            browser
                .clickLink('#accordion-4 .silc-accordion__nav-link', done);
        });

        it('should exist', function () {
            browser.assert.element('#accordion-4');
        });

        it('should show only one active tab link', function () {
            browser.assert.elements('#accordion-4 .silc-accordion__nav-link--active', { exactly: 1 });
        });

        it('should show only one active tab content', function () {
            browser.assert.elements('#accordion-4 .silc-accordion__content--visible', { exactly: 1 });
            browser.assert.elements('#accordion-4 .silc-accordion__content--visible-persist', { exactly: 1 });
        });

    });

});
