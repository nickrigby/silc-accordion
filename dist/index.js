"use strict";
exports.__esModule = true;
var SilkAccordion = (function () {
    function SilkAccordion(element) {
        var _this = this;
        // Save element
        this.element = element;
        // Get tabs behavior
        this.tabs = (this.element.classList.contains('silk-accordion--become-tabs') ||
            this.element.classList.contains('silk-accordion--tabs')) ? true : false;
        // Get labels
        var labels = this.element.querySelectorAll('.silk-accordion__label');
        if (labels.length) {
            // Attach event listener to labels
            [].forEach.call(labels, function (label) {
                label.addEventListener('click', function (event) {
                    _this.toggleLabel(event);
                });
            });
        }
        // Attach event listener to nav
        if (this.tabs) {
            // Get tab elements
            var tabs = this.element.querySelectorAll('.silk-accordion__nav-items');
            // If we have tabs
            if (tabs.length) {
                // Attach event listener to tab elements
                [].forEach.call(tabs, function (tab) {
                    tab.addEventListener('click', function (event) {
                        _this.toggleTab(event);
                    });
                });
                // Show first tab
                this.element.querySelector('.silk-accordion__content').classList.add('silk-accordion__content--visible-persist');
            }
        }
    }
    SilkAccordion.prototype.toggleLabel = function (event) {
        event.preventDefault();
        // Get parent
        var parent = event.target.parentNode;
        // Get content
        var content = parent.nextElementSibling;
        // Toggle visible class
        content.classList.toggle('silk-accordion__content--visible');
    };
    SilkAccordion.prototype.toggleTab = function (event) {
        event.preventDefault();
        // Get target id
        var targetId = event.target.getAttribute('href');
        // Get content element
        var content = this.element.querySelector(targetId + ' .silk-accordion__content');
        // Get current visible elements
        var visible = this.element.querySelectorAll('.silk-accordion__content--visible-persist');
        // Hide all visible elements
        [].forEach.call(visible, function (element) {
            element.classList.remove('silk-accordion__content--visible-persist');
        });
        // Show selected content
        content.classList.toggle('silk-accordion__content--visible-persist');
    };
    return SilkAccordion;
}());
exports["default"] = SilkAccordion;
