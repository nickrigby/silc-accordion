import "../scss/_variables.scss";
import "../scss/_index.scss";

import { SilkCore } from "silk-core";
import { SilkAccordion } from "./index.ts";

new SilkCore();

[].forEach.call(document.querySelectorAll('.silk-accordion'), (el) => {
    new SilkAccordion(el);
});
