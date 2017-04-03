"use strict";
exports.__esModule = true;
var Accordion = (function () {
    function Accordion(element) {
        var self = this;
        // Save element
        this.element = element;
        // Get expanded behavior
        this.expand = (this.element.classList.contains('silk-accordion--expand')) ? true : false;
        // Get labels
        var labels = this.element.querySelectorAll('.silk-accordion--section-label');
        // Attach event listener to labels
        [].forEach.call(labels, function (label) {
            label.addEventListener('click', function (event) {
                self.labelToggle(event);
            });
        });
        // Attach event listener to nav
        if (this.expand) {
            // Get tab elements
            var tabs = this.element.querySelectorAll('.silk-accordion--nav-list a');
            // If we have tabs
            if (tabs.length) {
                // Attach event listener to tab elements
                [].forEach.call(tabs, function (tab) {
                    tab.addEventListener('click', function (event) {
                        self.tabToggle(event, self);
                    });
                });
                // Show first tab
                var targetId = tabs[0].getAttribute('href');
                // Get content element
                var content = self.element.querySelector(targetId + ' .silk-accordion--section-content');
                // 
                content.classList.add('is-visible-persist');
            }
        }
    }
    Accordion.prototype.labelToggle = function (event) {
        event.preventDefault();
        // Get parent
        var parent = event.target.parentNode;
        // Get content
        var content = parent.nextElementSibling;
        // Toggle visible class
        content.classList.toggle('is-visible');
    };
    Accordion.prototype.getTargetContent = function (id) {
    };
    Accordion.prototype.tabToggle = function (event, self) {
        event.preventDefault();
        // Get target id
        var targetId = event.target.getAttribute('href');
        // Get content element
        var content = self.element.querySelector(targetId + ' .silk-accordion--section-content');
        // Get current visible elements
        var visible = self.element.querySelectorAll('.is-visible-persist');
        // Hide all visible elements
        [].forEach.call(visible, function (el) {
            el.classList.remove('is-visible-persist');
        });
        // Show selected content
        content.classList.toggle('is-visible-persist');
    };
    return Accordion;
}());
exports["default"] = Accordion;
