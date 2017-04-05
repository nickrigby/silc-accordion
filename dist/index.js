"use strict";
exports.__esModule = true;
var Accordion = (function () {
    function Accordion(element) {
        var _this = this;
        // Save element
        this.element = element;
        // Get tabs behavior
        this.tabs = (this.element.classList.contains('silk-accordion--become-tabs') ||
            this.element.classList.contains('silk-accordion--tabs')) ? true : false;
        // Get labels
        var labels = this.element.querySelectorAll('.silk-accordion--section-label');
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
            var tabs = this.element.querySelectorAll('.silk-accordion--nav-list a');
            // If we have tabs
            if (tabs.length) {
                // Attach event listener to tab elements
                [].forEach.call(tabs, function (tab) {
                    tab.addEventListener('click', function (event) {
                        _this.toggleTab(event);
                    });
                });
                // Show first tab
                this.element.querySelector(tabs[0].getAttribute('href') + ' .silk-accordion--section-content').classList.add('is-visible--persist');
            }
        }
    }
    Accordion.prototype.toggleLabel = function (event) {
        event.preventDefault();
        // Get parent
        var parent = event.target.parentNode;
        // Get content
        var content = parent.nextElementSibling;
        // Toggle visible class
        content.classList.toggle('is-visible');
    };
    Accordion.prototype.toggleTab = function (event) {
        event.preventDefault();
        // Get target id
        var targetId = event.target.getAttribute('href');
        // Get content element
        var content = this.element.querySelector(targetId + ' .silk-accordion--section-content');
        // Get current visible elements
        var visible = this.element.querySelectorAll('.is-visible--persist');
        // Hide all visible elements
        [].forEach.call(visible, function (element) {
            element.classList.remove('is-visible--persist');
        });
        // Show selected content
        content.classList.toggle('is-visible--persist');
    };
    return Accordion;
}());
exports["default"] = Accordion;
