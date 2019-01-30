"use strict";
exports.__esModule = true;
var SilcAccordion_1 = require("./SilcAccordion");
exports.SilcAccordion = SilcAccordion_1["default"];
function silcAccordionInit() {
    var accordions = document.querySelectorAll('.silc-accordion:not(.silc-accordion--initialized)');
    if (accordions.length > 0) {
        for (var i = 0; i < accordions.length; i++) {
            new SilcAccordion_1["default"](accordions[i]);
        }
    }
}
exports.silcAccordionInit = silcAccordionInit;
