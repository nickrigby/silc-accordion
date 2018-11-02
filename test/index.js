const server = require('node-http-server');
const Browser = require('zombie');

describe('silc accordion module', function () {

  const browser = new Browser();

  before(function () {

    server.deploy({
      port: 9001
    });

    return browser.visit('http://localhost:9001/index.html');
  });

  describe('accordion', function () {

    before(function () {
      return browser
        .fire('#accordion-1 .silc-accordion__label', 'click');
    });

    it('should show exactly one active label element', function () {
      browser.assert.elements('#accordion-1 .silc-accordion__label[aria-expanded="true"]', { exactly: 1 });
    });

    it('should show exactly one visible content element', function () {
      browser.assert.elements('#accordion-1 .silc-accordion__content[aria-expanded="true"]', { exactly: 1 });
    });

  });

  describe('accordion with first section open', function () {

    it('should have exactly one active label element on load', function () {
      browser.assert.elements('#accordion-2 .silc-accordion__label[aria-expanded="true"]', { exactly: 1 });
    });

    it('should have exactly one visible content element on load', function () {
      browser.assert.elements('#accordion-2 .silc-accordion__content[aria-expanded="true"]', { exactly: 1 });
    });

  });

  describe('accordion with option to open multiple sections at once', function () {

    before(function () {
      return browser
        .fire('#accordion-3 .silc-accordion__section:nth-child(1) .silc-accordion__label', 'click', function () {
          browser
            .fire('#accordion-3 .silc-accordion__section:nth-child(2) .silc-accordion__label', 'click');
        });
    });

    it('should have exactly two active label elements', function () {
      browser.assert.elements('#accordion-3 .silc-accordion__label[aria-expanded="true"]', { exactly: 2 });
    });

    it('should have exactly two visible content elements', function () {
      browser.assert.elements('#accordion-3 .silc-accordion__content[aria-expanded="true"]', { exactly: 2 });
    });

  });

  describe('accordion that becomes tabs', function () {

    before(function () {
      return browser
        .fire('#accordion-4 .silc-accordion__nav-button', 'click');
    });

    it('should have exactly one active tab button element', function () {
      browser.assert.elements('#accordion-4 .silc-accordion__nav-button[aria-expanded="true"]', { exactly: 1 });
    });

    it('should have exactly one visible tab content element', function () {
      browser.assert.elements('#accordion-4 .silc-accordion__content[aria-expanded="true"]', { exactly: 1 });
    });

    it('should have exactly one active label element', function () {
      browser.assert.elements('#accordion-4 .silc-accordion__label[aria-expanded="true"]', { exactly: 1 });
    });

  });

  describe('tabs', function () {

    before(function () {
      return browser
        .fire('#accordion-5 .silc-accordion__nav-button', 'click');
    });

    it('should have exactly one active tab button element', function () {
      browser.assert.elements('#accordion-5 .silc-accordion__nav-button[aria-expanded="true"]', { exactly: 1 });
    });

    it('should have exactly one visible tab content element', function () {
      browser.assert.elements('#accordion-5 .silc-accordion__content[aria-expanded="true"]', { exactly: 1 });
    });

  });

  describe('accordion within tabs', function () {

    before(function () {
      return browser
        .fire('#accordion-6 .silc-accordion__nav-button:nth-child(1)', 'click');
    });

    it('should have exactly one active tab button element', function () {
      browser.assert.elements('#accordion-6 .silc-accordion__nav-button[aria-expanded="true"]', { exactly: 1 });
    });

    it('should have exactly one visible tab content element', function () {
      browser.assert.elements('#accordion-6 .silc-accordion__content[aria-expanded="true"]', { exactly: 2 });
    });

    it('child accordion should have exactly one active label element on load', function () {
      browser.assert.elements('#accordion-7 .silc-accordion__label[aria-expanded="true"]', { exactly: 1 });
    });

    it('child accordion should have exactly one visible content element on load', function () {
      browser.assert.elements('#accordion-7 .silc-accordion__content[aria-expanded="true"]', { exactly: 1 });
    });

  });

});
