import SilcAccordion from './SilcAccordion';

function silcAccordionInit() {
    [].forEach.call(document.querySelectorAll('.silc-accordion'), (el) => {
        new SilcAccordion(el);
    });
}

export { SilcAccordion, silcAccordionInit }
