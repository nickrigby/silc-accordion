"use strict";
exports.__esModule = true;
var SilcAccordion = (function () {
    /**
     * Constructor
     * @param {HTMLElement} element
     */
    function SilcAccordion(element) {
        // Set class properties
        this.element = element;
        this.labels = this.element.querySelectorAll('.silc-accordion__label');
        this.nav = this.element.querySelector('.silc-accordion__nav-items');
        this.settings = this.applySettings();
        // Label event listener
        if (this.labels.length) {
            this.labelEventListener();
        }
        // Nav event listener
        if (this.settings.tabs && this.nav !== undefined) {
            this.navEventListener();
            this.element.querySelector('.silc-accordion__content').classList.add('silc-accordion__content--visible-persist');
        }
        // Open first element
        if (this.settings.openFirst) {
            this.element.querySelector('.silc-accordion__content').classList.add('silc-accordion__content--visible');
        }
    }
    /**
     * Apply accordion settings
     */
    SilcAccordion.prototype.applySettings = function () {
        // Defaults
        var settings = {
            tabs: false,
            openMultiple: false,
            openFirst: false
        };
        if (this.element.classList.contains('silc-accordion--become-tabs') ||
            this.element.classList.contains('silc-accordion--tabs')) {
            settings.tabs = true;
        }
        if (this.element.dataset.silcAccordionOpenMultiple !== undefined) {
            settings.openMultiple = true;
        }
        if (this.element.dataset.silcAccordionOpenFirst !== undefined) {
            settings.openFirst = true;
        }
        return settings;
    };
    /**
     * Event listener for accordion labels
     */
    SilcAccordion.prototype.labelEventListener = function () {
        var _this = this;
        this.element.addEventListener('click', function (e) {
            // Get target from event
            var target = e.target;
            // If target contains label class
            if (target.classList.contains('silc-accordion__label')) {
                e.preventDefault();
                var content = _this.getContent(target);
                _this.showContent(content);
            }
            e.stopPropagation();
        });
    };
    /**
     * Event listener for tabs navigation
     */
    SilcAccordion.prototype.navEventListener = function () {
        var _this = this;
        this.nav.addEventListener('click', function (e) {
            var target = e.target;
            if (target.classList.contains('silc-accordion__nav-link')) {
                e.preventDefault();
                _this.toggleTab(target);
            }
            e.stopPropagation();
        });
    };
    /**
     * Gets content element from clicked label
     * @param {Element} label
     */
    SilcAccordion.prototype.getContent = function (label) {
        return label.parentNode.nextElementSibling;
    };
    /**
     * Gets content based on id
     * @param {String} id - id of content to get
     */
    SilcAccordion.prototype.getContentById = function (id) {
        return this.element.querySelector(id + ' .silc-accordion__content');
    };
    /**
     * Toggle tab from clicked nav link
     * @param {Element} link - link element clicked
     */
    SilcAccordion.prototype.toggleTab = function (link) {
        var targetId = link.getAttribute('href');
        var content = this.getContentById(targetId);
        this.hideAllPersitentVisible();
        this.showContent(content);
        // Ensure that one tab is always open
        content.classList.add('silc-accordion__content--visible-persist');
    };
    /**
     * Show content
     * @param {Element} el
     */
    SilcAccordion.prototype.showContent = function (el) {
        if (!this.settings.openMultiple) {
            this.hideAllVisible();
            el.classList.add('silc-accordion__content--visible');
        }
        else {
            el.classList.toggle('silc-accordion__content--visible');
        }
    };
    /**
     * Hide all visible content
     */
    SilcAccordion.prototype.hideAllVisible = function () {
        [].forEach.call(this.element.querySelectorAll('.silc-accordion__content--visible'), function (el) {
            el.classList.remove('silc-accordion__content--visible');
        });
    };
    /**
     * Hide all persistent visible content
     * Persistent visible class is used for accordions that transform to tabs
     */
    SilcAccordion.prototype.hideAllPersitentVisible = function () {
        // Hide all persitent visible content
        [].forEach.call(this.element.querySelectorAll('.silc-accordion__content--visible-persist'), function (el) {
            el.classList.remove('silc-accordion__content--visible-persist');
        });
    };
    return SilcAccordion;
}());
exports.SilcAccordion = SilcAccordion;
