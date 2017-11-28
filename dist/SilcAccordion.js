"use strict";
exports.__esModule = true;
var default_1 = /** @class */ (function () {
    /**
     * Constructor
     * @param {HTMLElement} element
     */
    function default_1(element) {
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
            this.nav.querySelector('.silc-accordion__nav-link').classList.add('silc-accordion__nav-link--active');
            this.element.querySelector('.silc-accordion__content').classList.add('silc-accordion__content--visible-persist');
        }
        // Open first element
        if (this.settings.openFirst) {
            this.element.querySelector('.silc-accordion__label').classList.add('silc-accordion__label--active');
            this.element.querySelector('.silc-accordion__content').classList.add('silc-accordion__content--visible');
        }
    }
    /**
     * Apply accordion settings
     */
    default_1.prototype.applySettings = function () {
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
        if (this.element.getAttribute('data-silc-accordion-open-multiple') !== null) {
            settings.openMultiple = true;
        }
        if (this.element.getAttribute('data-silc-accordion-open-first') !== null) {
            settings.openFirst = true;
        }
        return settings;
    };
    /**
     * Event listener for accordion labels
     */
    default_1.prototype.labelEventListener = function () {
        var _this = this;
        this.element.addEventListener('click', function (event) {
            // Get target from event
            var target = event.target;
            // If target contains label class
            if (target.classList.contains('silc-accordion__label')) {
                event.preventDefault();
                // Get clicked labels associated content element
                var content = _this.getContent(target);
                // Toggle the content
                _this.toggleContent(content);
                // Toggle active element
                _this.toggleActiveElement(target, 'silc-accordion__label--active');
            }
            event.stopPropagation();
        });
    };
    /**
     * Event listener for tabs navigation
     */
    default_1.prototype.navEventListener = function () {
        var _this = this;
        this.nav.addEventListener('click', function (event) {
            var target = event.target;
            if (target.classList.contains('silc-accordion__nav-link')) {
                event.preventDefault();
                _this.toggleTab(target);
            }
            event.stopPropagation();
        });
    };
    /**
     * Gets content element from clicked label
     * @param {Element} label
     */
    default_1.prototype.getContent = function (label) {
        return label.parentNode.nextElementSibling;
    };
    /**
     * Gets content based on id
     * @param {String} id - id of content to get
     */
    default_1.prototype.getContentById = function (id) {
        return this.element.querySelector(id + ' .silc-accordion__content');
    };
    /**
     * Toggle tab from clicked nav link
     * @param {Element} link - link element clicked
     */
    default_1.prototype.toggleTab = function (link) {
        var targetId = link.getAttribute('href');
        var content = this.getContentById(targetId);
        this.hideAllPersitentVisible();
        this.toggleContent(content);
        this.toggleActiveElement(link, 'silc-accordion__nav-link--active');
        // Ensure that one tab is always open
        content.classList.add('silc-accordion__content--visible-persist');
    };
    /**
     * Show content
     * @param {Element} el
     */
    default_1.prototype.toggleContent = function (el) {
        if (!this.settings.openMultiple) {
            this.removeCssClass('silc-accordion__content--visible', el);
            el.classList.toggle('silc-accordion__content--visible');
        }
        else {
            el.classList.toggle('silc-accordion__content--visible');
        }
    };
    /**
     * Hide all persistent visible content
     * Persistent visible class is used for accordions that transform to tabs
     */
    default_1.prototype.hideAllPersitentVisible = function () {
        this.removeCssClass('silc-accordion__content--visible-persist');
    };
    /**
     * Remove CSS class from all matching elements
     * @param className
     */
    default_1.prototype.removeCssClass = function (className, excludeEl) {
        // Hide all persitent visible content
        [].forEach.call(this.element.querySelectorAll('.' + className), function (el) {
            if (el !== excludeEl) {
                el.classList.remove(className);
            }
        });
    };
    /**
     * Set active element
     * @param el
     * @param className
     */
    default_1.prototype.toggleActiveElement = function (el, className) {
        if (!this.settings.openMultiple) {
            var currentActive = this.element.querySelector('.' + className);
            if (currentActive !== null) {
                currentActive.classList.remove(className);
            }
            else {
                el.classList.add(className);
            }
            if (this.settings.tabs) {
                el.classList.add(className);
            }
        }
        else {
            el.classList.toggle(className);
        }
    };
    return default_1;
}());
exports["default"] = default_1;
