const debounce = require('lodash.debounce');

// .closest() pollyfill
import * as elementClosest from 'element-closest';
elementClosest;

interface SilcAccordionSettings {
  openMultiple: boolean;
  openFirst: boolean;
  tabs: boolean;
}

export default class {

  protected element: HTMLElement;
  protected settings: SilcAccordionSettings;
  protected labels: NodeList;
  protected nav: Element;
  protected activeAccordionIds: String[];

  /**
   * Constructor
   * @param {HTMLElement} element
   */
  public constructor(element: HTMLElement) {

    // Set class properties
    this.element = element;
    this.labels = this.element.querySelectorAll('.silc-accordion__label');
    this.nav = this.element.querySelector('.silc-accordion__nav-items');
    this.settings = this.applySettings();
    this.activeAccordionIds = [];

    this.switchBetweenTabsAndAccordion = this.switchBetweenTabsAndAccordion.bind(this);

    // Label event listener
    if (this.labels.length) {
      this.labelEventListener();
    }

    // Nav event listener
    if (this.settings.tabs && this.nav !== undefined) {
      this.navEventListener();

      const accordionId = this.nav.querySelector('.silc-accordion__nav-button').getAttribute('aria-controls');
      const accordion = this.getById(accordionId);

      // Set initial state of component
      accordion.tab.setAttribute('aria-expanded', 'true');
      accordion.label.setAttribute('aria-expanded', 'true');
      accordion.content.setAttribute('aria-expanded', 'true');

      if (this.element.classList.contains('silc-accordion--become-tabs')) {
        // Listen on window resize to trigger the change between states
        const resizeListener = debounce(this.switchBetweenTabsAndAccordion, 150);
        window.addEventListener('resize', resizeListener);
      }
    }

    // Open first element
    if (this.settings.openFirst) {
      const firstId = this.element.querySelector('.silc-accordion__label').getAttribute('aria-controls');
      const accordion = this.getById(firstId);

      this.activeAccordionIds.push(firstId);
      accordion.label.setAttribute('aria-expanded', 'true');
      accordion.content.setAttribute('aria-expanded', 'true');
    }
  }

  /**
   * Apply accordion settings
   */
  protected applySettings(): SilcAccordionSettings {

    // Defaults
    let settings = <SilcAccordionSettings>{
      tabs: false,
      openMultiple: false,
      openFirst: false
    };

    if (this.element.classList.contains('silc-accordion--become-tabs') ||
      this.element.classList.contains('silc-accordion--tabs')) {
      settings.tabs = true;
    }

    if (this.element.getAttribute('data-silc-accordion-open-multiple') !== null) {
      settings.openMultiple = true;
    }

    if (this.element.getAttribute('data-silc-accordion-open-first') !== null) {
      settings.openFirst = true;
    }

    return settings;
  }

  /**
   * Event listener for accordion labels
   */
  protected labelEventListener() {
    this.element.addEventListener('click', event => {

      // Get target from event
      const target = <HTMLElement>event.target;

      // If target contains label class
      if (target.classList.contains('silc-accordion__label')) {
        event.preventDefault();

        const accordionId = target.getAttribute('aria-controls');
        const accordion = this.getById(accordionId);

        this.toggleActiveContent(accordion.content);
        this.toggleActiveLabel(target);

        // If the component also contains tabs,
        // toggle the state of the corresponding tab
        if (this.settings.tabs) {
          this.toggleActiveTab(accordion.tab);
        }

        this.updateAccordionIds(accordionId);
      }

      event.stopPropagation();
    });
  }

  /**
   * Event listener for tabs navigation
   */
  protected navEventListener() {
    this.nav.addEventListener('click', event => {

      const target = <HTMLElement>event.target;

      if (target.classList.contains('silc-accordion__nav-button')) {
        event.preventDefault();
        const expanded = JSON.parse(target.getAttribute('aria-expanded'));

        if (!expanded) {
          const accordionId = target.getAttribute('aria-controls');
          const accordion = this.getById(accordionId);
          
          this.toggleActiveContent(accordion.content);
          this.toggleActiveLabel(accordion.label);
          this.toggleActiveTab(target);

          this.updateAccordionIds(accordionId);
        }
      }

      event.stopPropagation();
    });
  }

  /**
   * Gets accordion based on id
   * @param {String} id - id of content to get
   */
  protected getById(id: String) {
    return {
      'tab': <Element>this.element.querySelector('.silc-accordion__nav-button[aria-controls="' + id + '"]'),
      'label': <Element>this.element.querySelector('.silc-accordion__label[aria-controls="' + id + '"]'),
      'content': <Element>this.element.querySelector('#' + id)
    };
  }

  /**
   * Show content
   * @param {Element} el
   */
  protected toggleActiveContent(el: Element) {
    const expanded = JSON.parse(el.getAttribute('aria-expanded'));

    // Hide any other open content sections
    if (!this.settings.openMultiple) {
      this.hideAriaExpanded('silc-accordion__content', el);
    }

    // Toggle the aria-expanded value for the current content
    el.setAttribute('aria-expanded', String(!expanded));
  }

  /**
   * Set active label
   * @param el 
   */
  protected toggleActiveLabel(el: Element) {
    const expanded = JSON.parse(el.getAttribute('aria-expanded'));

    // Remove active state from any other labels
    if (!this.settings.openMultiple) {
      this.hideAriaExpanded('silc-accordion__label', el);
    }

    // Toggle the aria-expanded value for the current label
    el.setAttribute('aria-expanded', String(!expanded));
  }

  /**
   * Set active tab
   * @param {Element} el
   */
  protected toggleActiveTab(el: Element) {
    // Remove active state from any other labels
    if (!this.settings.openMultiple) {
      this.hideAriaExpanded('silc-accordion__nav-button', el);
    }

    // For tabs we need to always have one selected so
    // clicking the same tab shouldn't toggle its own state
    el.setAttribute('aria-expanded', 'true');
  }

  /**
   * Update the activeAccordionIds array
   * to reflect the current state change
   * @param {String} id
   */
  protected updateAccordionIds(id: String) {
    const index = this.activeAccordionIds.indexOf(id);
    
    if (index === -1) {
      // Add it if it wasn't in the array
      this.activeAccordionIds.push(id);
    } else {
      // Remove it if it was
      this.activeAccordionIds.splice(index, 1);
    }
  }

  /**
   * Set aria-expanded to false for all
   * visible nodes with the provided class
   * @param {Element} className
   */
  protected hideAriaExpanded(className: string, excludeEl?) {
    const nodes = <NodeList>this.element.querySelectorAll('.' + className + '[aria-expanded="true"]');

    for (let i = 0; i < nodes.length; i++) {
      const node = <HTMLElement>nodes[i];
      if (node !== excludeEl) {
        node.setAttribute('aria-expanded', 'false');
      }
    }
  }

  protected switchBetweenTabsAndAccordion() {
    const styles = window.getComputedStyle(this.element, ':after');
    const isTabs = styles.content === '"tabs"';

    if (isTabs) {
      /*
        Force the first tab to be open if none are active
        (we don't track the id in the activeAccordionIds prop because
        this state wasn't triggered by user interaction).
      */
      if (this.activeAccordionIds.length === 0) {
        const accordionId = this.nav.querySelector('.silc-accordion__nav-button').getAttribute('aria-controls');
        const accordion = this.getById(accordionId);

        accordion.tab.setAttribute('aria-expanded', 'true');
        accordion.label.setAttribute('aria-expanded', 'true');
        accordion.content.setAttribute('aria-expanded', 'true');
      }
    } else {
      /*
        If changing back to accordion, restore state to
        cached version using activeAccordionIds.
      */
      const labels = <NodeList>this.element.querySelectorAll('.silc-accordion__label');

      for (let i = 0; i < labels.length; i++) {
        const label = <HTMLElement>labels[i];
        const accordionId = label.getAttribute('aria-controls');
        const accordion = this.getById(accordionId);
        const expanded = this.activeAccordionIds.indexOf(accordionId) !== -1;

        accordion.tab.setAttribute('aria-expanded', String(expanded));
        accordion.label.setAttribute('aria-expanded', String(expanded));
        accordion.content.setAttribute('aria-expanded', String(expanded));
      }
    }
  }
}