"use strict";
exports.__esModule = true;
var SilkAccordion = (function () {
    function SilkAccordion(element) {
        var _this = this;
        // Save element
        this.element = element;
        // Class attributes
        this.tabs = (this.element.classList.contains('silk-accordion--become-tabs') ||
            this.element.classList.contains('silk-accordion--tabs')) ? true : false;
        this.openMultiple = (this.element.dataset.silkAccordionOpenMultiple !== undefined) ? true : false;
        this.openFirst = (this.element.dataset.silkAccordionOpenFirst !== undefined) ? true : false;
        this.labels = this.element.querySelectorAll('.silk-accordion__label');
        this.navItems = this.element.querySelectorAll('.silk-accordion__nav-items');
        // Label event listener
        if (this.labels.length) {
            [].forEach.call(this.labels, function (el) {
                el.addEventListener('click', function (event) {
                    _this.toggleLabel(event);
                });
            });
        }
        // Nav item event listener
        if (this.tabs && this.navItems.length) {
            [].forEach.call(this.navItems, function (el) {
                el.addEventListener('click', function (event) {
                    _this.toggleTab(event);
                });
            });
            // Show first tab
            this.element.querySelector('.silk-accordion__content').classList.add('silk-accordion__content--visible-persist');
        }
        // Open first element
        if (this.openFirst) {
            this.element.querySelector('.silk-accordion__content').classList.add('silk-accordion__content--visible');
        }
    }
    SilkAccordion.prototype.toggleLabel = function (event) {
        event.preventDefault();
        // Get content element to show
        var content = event.target.parentNode.nextElementSibling;
        // Show the content
        this.showContent(content);
    };
    SilkAccordion.prototype.toggleTab = function (event) {
        event.preventDefault();
        // Get target id
        var targetId = event.target.getAttribute('href');
        // Get content element
        var content = this.element.querySelector(targetId + ' .silk-accordion__content');
        // Hide all persitent visible content
        this.hideAllPersitentVisible();
        // Show content
        this.showContent(content);
        // Ensures that one tab is always open
        content.classList.add('silk-accordion__content--visible-persist');
    };
    SilkAccordion.prototype.showContent = function (el) {
        if (!this.openMultiple) {
            this.hideAllVisible();
            el.classList.add('silk-accordion__content--visible');
        }
        else {
            el.classList.toggle('silk-accordion__content--visible');
        }
    };
    SilkAccordion.prototype.hideAllVisible = function () {
        // Remove all visible content
        [].forEach.call(this.element.querySelectorAll('.silk-accordion__content--visible'), function (el) {
            el.classList.remove('silk-accordion__content--visible');
        });
    };
    SilkAccordion.prototype.hideAllPersitentVisible = function () {
        // Hide all persitent visible content
        [].forEach.call(this.element.querySelectorAll('.silk-accordion__content--visible-persist'), function (el) {
            el.classList.remove('silk-accordion__content--visible-persist');
        });
    };
    return SilkAccordion;
}());
exports.SilkAccordion = SilkAccordion;
