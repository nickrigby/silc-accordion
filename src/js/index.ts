import SilcAccordion from './SilcAccordion';

function silcAccordionInit() {
  let accordions = <NodeList>document.querySelectorAll('.silc-accordion:not(.silc-accordion--initialized)');
  if (accordions.length > 0) {
    for (let i = 0; i < accordions.length; i++) {
      new SilcAccordion(<HTMLElement>accordions[i]);
    }
  }
}

export { SilcAccordion, silcAccordionInit }
