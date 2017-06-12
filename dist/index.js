"use strict";
exports.__esModule = true;
var SilcAccordion_1 = require("./SilcAccordion");
exports.SilcAccordion = SilcAccordion_1["default"];
function silcAccordionInit() {
    [].forEach.call(document.querySelectorAll('.silc-accordion'), function (el) {
        new SilcAccordion_1["default"](el);
    });
}
exports.silcAccordionInit = silcAccordionInit;
