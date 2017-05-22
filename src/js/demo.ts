import "../scss/_variables.scss";
import "../scss/_index.scss";

import { SilcCore } from "silc-core";
import { SilcAccordion } from "./index.ts";

new SilcCore();

[].forEach.call(document.querySelectorAll('.silc-accordion'), (el) => {
    new SilcAccordion(el);
});
