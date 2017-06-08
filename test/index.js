const server = require('node-http-server');
const Browser = require('zombie');

describe('User visits accordion demo page', function () {

    const browser = new Browser();

    before(function () {

        server.deploy({
            port: 9001
        });

        return browser.visit('http://localhost:9001/index.html');
    });

    describe('accordions', function () {

        before(function () {
            return browser
                .clickLink('#accordion-0 .silc-accordion__label');
        });

        it('should exist', function () {
            browser.assert.element('#accordion-0');
        });

        it('should show only one active label', function () {
            browser.assert.elements('#accordion-0 .silc-accordion__label--active', { exactly: 1 });
        });

        it('should show only one active accordion', function () {
            browser.assert.elements('#accordion-0 .silc-accordion__content--visible', { exactly: 1 });
        });

    });

    describe('accordions with first accordion open', function () {

        it('should exist', function () {
            browser.assert.element('#accordion-1');
        });

        it('should show exactly one active label on load', function () {
            browser.assert.elements('#accordion-1 .silc-accordion__label--active', { exactly: 1 });
        });

        it('should show exactly one active accordion on load', function () {
            browser.assert.elements('#accordion-1 .silc-accordion__content--visible', { exactly: 1 });
        });

    });

    describe('accordions with ability to open multiple accordions at once', function () {

        before(function () {
            return browser
                .clickLink('#accordion-2 .silc-accordion__section:nth-child(1) .silc-accordion__label', function () {
                    browser
                        .clickLink('#accordion-2 .silc-accordion__section:nth-child(2) .silc-accordion__label');
                });
        });

        it('should exist', function () {
            browser.assert.element('#accordion-2');
        });

        it('should show two active accordion labels', function () {
            browser.assert.elements('#accordion-2 .silc-accordion__label--active', { exactly: 2 });
        });

        it('should show exactly two visible accordions', function () {
            browser.assert.elements('#accordion-2 .silc-accordion__content--visible', { exactly: 2 });
        });

    });

    describe('accordions that become tabs', function () {

        before(function () {
            return browser
                .clickLink('#accordion-3 .silc-accordion__nav-link');
        });

        it('should exist', function () {
            browser.assert.element('#accordion-3');
        });

        it('should show exactly one active tab link', function () {
            browser.assert.elements('#accordion-3 .silc-accordion__nav-link--active', { exactly: 1 });
        });

        it('should show exactly one active tab content', function () {
            browser.assert.elements('#accordion-3 .silc-accordion__content--visible', { exactly: 1 });
        });

        it('should show exactly one visible tab content', function () {
            browser.assert.elements('#accordion-3 .silc-accordion__content--visible-persist', { exactly: 1 });
        });

    });

    describe('accordions that are tabs', function () {

        before(function () {
            return browser
                .clickLink('#accordion-4 .silc-accordion__nav-link');
        });

        it('should exist', function () {
            browser.assert.element('#accordion-4');
        });

        it('should show exactly one active tab link', function () {
            browser.assert.elements('#accordion-4 .silc-accordion__nav-link--active', { exactly: 1 });
        });

        it('should show exactly one visible tab content', function () {
            browser.assert.elements('#accordion-4 .silc-accordion__content--visible', { exactly: 1 });
        });

        it('should show exactly one persitent visible tab content', function () {
            browser.assert.elements('#accordion-4 .silc-accordion__content--visible-persist', { exactly: 1 });
        });

    });

});
