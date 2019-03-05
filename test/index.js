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
        .fire('#accordion-0 .silc-accordion__label', 'click');
    });

    it('should have exactly one active section element', function () {
      browser.assert.elements('#accordion-0 .silc-accordion__section--active', { exactly: 1 });
    });

    it('should show exactly one active label element', function () {
      browser.assert.elements('#accordion-0 .silc-accordion__label[aria-expanded="true"]', { exactly: 1 });
    });

    it('should show exactly one visible content element', function () {
      browser.assert.elements('#accordion-0 .silc-accordion__content[aria-hidden="false"]', { exactly: 1 });
    });

  });

  describe('accordion with first section open', function () {

    it('should have exactly one active section element', function () {
      browser.assert.elements('#accordion-1 .silc-accordion__section--active', { exactly: 1 });
    });

    it('should show exactly one active label element', function () {
      browser.assert.elements('#accordion-1 .silc-accordion__label[aria-expanded="true"]', { exactly: 1 });
    });

    it('should show exactly one visible content element', function () {
      browser.assert.elements('#accordion-1 .silc-accordion__content[aria-hidden="false"]', { exactly: 1 });
    });

  });

  describe('accordion with option to open multiple sections at once', function () {

    before(function () {
      return browser
        .fire('#accordion-2 .silc-accordion__section:nth-child(1) .silc-accordion__label', 'click', function () {
          browser
            .fire('#accordion-2 .silc-accordion__section:nth-child(2) .silc-accordion__label', 'click');
        });
    });

    it('should have exactly two active section elements', function () {
      browser.assert.elements('#accordion-2 .silc-accordion__section--active', { exactly: 2 });
    });

    it('should show exactly two active label elements', function () {
      browser.assert.elements('#accordion-2 .silc-accordion__label[aria-expanded="true"]', { exactly: 2 });
    });

    it('should show exactly two visible content element', function () {
      browser.assert.elements('#accordion-2 .silc-accordion__content[aria-hidden="false"]', { exactly: 2 });
    });

  });

  describe('accordion that becomes tabs initial state', function () {

    it('the first tab should be active and disabled', function () {
      browser.assert.elements('#accordion-3 .silc-accordion__label:first-child[role="tab"][aria-selected="true"][aria-disabled="true"]', { exactly: 1 });
      browser.assert.elements('#accordion-3 .silc-accordion__label:not(:first-child)[role="tab"][aria-selected="true"][aria-disabled="true"]', { exactly: 0 });
    });

    it('the first tab panel should be the only visible panel', function () {
      browser.assert.elements('#accordion-3 .silc-accordion__content:first-child[aria-hidden="false"]', { exactly: 1 });
      browser.assert.elements('#accordion-3 .silc-accordion__content:not(:first-child)[aria-hidden="false"]', { exactly: 0 });
    });

  });

  describe('accordion that becomes tabs state after clicking second tab', function () {

    before(function () {
      return browser
        .fire('#accordion-3 .silc-accordion__label:nth-child(2)', 'click');
    });

    it('the second tab should be active and disabled', function () {
      browser.assert.elements('#accordion-3 .silc-accordion__label:nth-child(2)[role="tab"][aria-selected="true"][aria-disabled="true"]', { exactly: 1 });
      browser.assert.elements('#accordion-3 .silc-accordion__label:not(:nth-child(2))[role="tab"][aria-selected="true"][aria-disabled="true"]', { exactly: 0 });
    });

    it('the second tab panel should be the only visible panel', function () {
      browser.assert.elements('#accordion-3 .silc-accordion__content:nth-child(2)[aria-hidden="false"]', { exactly: 1 });
      browser.assert.elements('#accordion-3 .silc-accordion__content:not(:nth-child(2))[aria-hidden="false"]', { exactly: 0 });
    });

  });

  describe('tabs initial state', function () {

    it('the first tab should be active and disabled', function () {
      browser.assert.elements('#accordion-4 .silc-accordion__label:first-child[role="tab"][aria-selected="true"][aria-disabled="true"]', { exactly: 1 });
      browser.assert.elements('#accordion-4 .silc-accordion__label:not(:first-child)[role="tab"][aria-selected="true"][aria-disabled="true"]', { exactly: 0 });
    });

    it('the first tab panel should be the only visible panel', function () {
      browser.assert.elements('#accordion-4 .silc-accordion__content:first-child[aria-hidden="false"]', { exactly: 1 });
      browser.assert.elements('#accordion-4 .silc-accordion__content:not(:first-child)[aria-hidden="false"]', { exactly: 0 });
    });

  });

  describe('tabs state after clicking second tab', function () {

    before(function () {
      return browser
        .fire('#accordion-4 .silc-accordion__label:nth-child(2)', 'click');
    });

    it('the second tab should be active and disabled', function () {
      browser.assert.elements('#accordion-4 .silc-accordion__label:nth-child(2)[role="tab"][aria-selected="true"][aria-disabled="true"]', { exactly: 1 });
      browser.assert.elements('#accordion-4 .silc-accordion__label:not(:nth-child(2))[role="tab"][aria-selected="true"][aria-disabled="true"]', { exactly: 0 });
    });

    it('the second tab panel should be the only visible panel', function () {
      browser.assert.elements('#accordion-4 .silc-accordion__content:nth-child(2)[aria-hidden="false"]', { exactly: 1 });
      browser.assert.elements('#accordion-4 .silc-accordion__content:not(:nth-child(2))[aria-hidden="false"]', { exactly: 0 });
    });

  });

  describe('accordion within tabs', function () {

    before(function () {
      return browser
        .fire('#accordion-5 .silc-accordion__label:nth-child(2)', 'click');
    });

    it('the second tab should be active and disabled', function () {
      browser.assert.elements('#accordion-5 .silc-accordion__label:nth-child(2)[role="tab"][aria-selected="true"][aria-disabled="true"]', { exactly: 1 });
      browser.assert.elements('#accordion-5 .silc-accordion__label:not(:nth-child(2))[role="tab"][aria-selected="true"][aria-disabled="true"]', { exactly: 0 });
    });

    it('the second tab panel should be the only visible panel', function () {
      browser.assert.elements('#accordion-5 .silc-accordion__content:nth-child(2)[role="tabpanel"][aria-hidden="false"]', { exactly: 1 });
      browser.assert.elements('#accordion-5 .silc-accordion__content:not(:nth-child(2))[role="tabpanel"][aria-hidden="false"]', { exactly: 0 });
    });

    it('child accordion should have exactly one active label element on load', function () {
      browser.assert.elements('#accordion-6 .silc-accordion__label[aria-expanded="true"]', { exactly: 1 });
    });

    it('child accordion should have exactly one visible content element on load', function () {
      browser.assert.elements('#accordion-6 .silc-accordion__content[aria-hidden="false"]', { exactly: 1 });
    });

  });

});
