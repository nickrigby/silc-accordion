"use strict";
exports.__esModule = true;
var Accordion = (function () {
    function Accordion(element) {
        // Save element
        this.element = element;
        // Add Event listener
        this.element.addEventListener('click', this.toggle);
    }
    Accordion.prototype.toggle = function (event) {
        event.preventDefault();
        // Get parent
        var parent = event.target.parentNode;
        // Get content
        var content = parent.nextElementSibling;
        // Toggle visible class
        content.classList.toggle('is-visible');
    };
    return Accordion;
}());
exports["default"] = Accordion;
