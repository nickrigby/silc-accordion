import * as debounce from 'lodash.debounce';

// .closest() polyfill
import * as elementClosest from 'element-closest';
elementClosest;

interface SilcAccordionSettings {
  openMultiple: boolean;
  openFirst: boolean;
  tabs: boolean;
  becomeTabsBreakpoint: number;
}

export default class {

  protected element: HTMLElement;
  protected settings: SilcAccordionSettings;
  protected sections: NodeListOf<HTMLElement>;
  protected activeSections: number[] = [];
  protected displayingAsTabs: boolean = false;

  /**
   * Constructor
   * @param {HTMLElement} element
   */
  public constructor(element: HTMLElement) {

    if (element) {
      // Set class properties
      this.element = element;
      this.sections = this.element.querySelectorAll('.silc-accordion__section');
      this.settings = this.applySettings();

      this.initiallyHideSections();

      if (this.sections.length) {
        // Label event listener
        this.labelEventListener();

        // Add indices to each label to track active indices
        this.addIndicesToLabels();

        if (this.settings.openFirst) {
          // Open first element
          this.openFirstSection();
        }

        if (this.settings.tabs) {
          // If this should always be a tab component, convert the accordion markup to that
          if (!this.settings.becomeTabsBreakpoint) {
            this.convertToTabs();
            this.openFirstSection();
          } else {
            // Add resize listener to switch between tabs and accordions
            this.becomeTabsResizeListener();
          }
        }

        // Add initialized class
        this.element.classList.add('silc-accordion--initialized');
      }
    }
  }

  /**
   * Toggle the active section when the activeSection property is updated
   * @param {HTMLElement} el
   */
  protected updateActiveSections(label: HTMLElement) {
    if (label) {
      const sectionIndex = parseInt(label.getAttribute('data-index'));

      // Don't do this for tabs since they don't have a .silc-accordion__section element
      if (!this.displayingAsTabs && !(this.settings.tabs && !this.settings.becomeTabsBreakpoint)) {
        this.toggleSection(sectionIndex);
      }
      this.toggleLabel(sectionIndex);
      this.toggleContent(sectionIndex);
      // Store a reference to the current active section(s)
      const activeSectionIndex = this.activeSections.indexOf(sectionIndex);

      // Make sure that we only store one active section unless set to open multiple
      if (!this.settings.openMultiple) {
        this.activeSections = [];
      }

      if (activeSectionIndex !== -1) {
        // If it's in there already, remove it
        delete this.activeSections[this.activeSections.indexOf(activeSectionIndex)];
      } else {
        // If not add it
        this.activeSections.push(sectionIndex);
      }
    }
  }

  /**
   * Add a data-index attribute to each label to track the indices of active accordions
   */
  protected addIndicesToLabels() {
    for (let i = 0; i < this.sections.length; i++) {
      const label = this.sections[i].querySelector('.silc-accordion__label') as HTMLAnchorElement;
      label.setAttribute('data-index', String(i));
    }
  }

  /**
   * Apply accordion settings
   */
  protected applySettings(): SilcAccordionSettings {

    const settings = {
      tabs: this.element.classList.contains('silc-accordion--become-tabs') || this.element.classList.contains('silc-accordion--tabs'),
      openMultiple: this.element.hasAttribute('data-silc-accordion-open-multiple'),
      openFirst: this.element.hasAttribute('data-silc-accordion-open-first')
    } as SilcAccordionSettings;

    if (this.element.classList.contains('silc-accordion--become-tabs')) {
      const beforeContent = window.getComputedStyle(this.element, ":before").content;
      settings.becomeTabsBreakpoint = parseInt(beforeContent.replace(/"*/g, ''));
    }

    return settings;
  }

  /**
   * Hide the content when the component is instantiated
   */
  protected initiallyHideSections() {
    for (let i = 0; i < this.sections.length; i++) {
      this.toggleLabel(i);
      this.toggleContent(i);
    }
  }

  /**
   * Open first section
   */
  protected openFirstSection() {
    const firstLabel = this.element.querySelector('.silc-accordion__label') as HTMLAnchorElement;
    this.updateActiveSections(firstLabel);
  }

  /**
   * Event listener for accordion labels
   */
  protected labelEventListener() {

    const listener = (event) => {

      // Get target from event
      const target = event.target as HTMLElement;

      // If target contains label class update the active section
      if (target.classList.contains('silc-accordion__label')) {
        event.preventDefault();
        // Stop tab from toggling itself
        if (!target.hasAttribute('aria-disabled')) {
          this.updateActiveSections(target);
        }
      }

      event.stopPropagation();
    };

    this.element.addEventListener('click', listener);
    // Add support for space and enter key presses (since we use an anchor tag instead of a button this is necessary)
    this.element.addEventListener('keyup', (event) => {
      if ([13, 32].indexOf(event.keyCode) !== -1) {
        listener(event);
      }
    });
  }

  /**
   * Switch between tabs and accordions on resize
   */
  protected becomeTabsResizeListener() {
    const resizeHandler = () => {
      // Not using matchMedia due to Zombie not supporting it for unit tests, even when using a polyfill
      if (window.innerWidth >= this.settings.becomeTabsBreakpoint) {
        // Switch to tabs
        if (!this.displayingAsTabs) {
          this.convertToTabs();
          // Force first section open if none are selected
          if (!this.activeSections.length) {
            this.openFirstSection();
          }
        }
      } else {
        // Switch to accordion
        if (this.displayingAsTabs) {
          this.convertToAccordions();
        }
      }
    };

    window.addEventListener('resize', debounce(resizeHandler, 100));
    resizeHandler();
  }

  /**
   * Toggle the current section
   * @param {number} sectionIndex
   */
  protected toggleSection(sectionIndex: number) {
    // Toggle currently active section if only one should be open
    if (!this.settings.openMultiple) {
      // Avoid toggling the current section before doing so below
      if (typeof this.activeSections[0] !== 'undefined' && this.activeSections[0] !== sectionIndex) {
        this.sections[this.activeSections[0]].classList.remove('silc-accordion__section--active');
      }
    }

    // Toggle the current element's active class
    this.sections[sectionIndex].classList.toggle('silc-accordion__section--active');
  }

  /**
   * Toggle active label
   * @param {number} sectionIndex
   */
  protected toggleLabel(sectionIndex: number) {
    const labels = this.element.querySelectorAll('.silc-accordion__label') as NodeListOf<HTMLAnchorElement>;
    const ariaAttr = this.displayingAsTabs ? 'aria-selected' : 'aria-expanded';
    const active = !!JSON.parse(labels[sectionIndex].getAttribute(ariaAttr)) as boolean;

    // Toggle currently active label if only one section should be open
    if (!this.settings.openMultiple) {
      // Avoid toggling the current label before doing so below
      if (typeof this.activeSections[0] !== 'undefined' && this.activeSections[0] !== sectionIndex) {
        labels[this.activeSections[0]].setAttribute(ariaAttr, 'false');
        labels[this.activeSections[0]].removeAttribute('aria-disabled');
      }
    }

    if (this.displayingAsTabs) {
      // Prevent active tab from toggling itself
      labels[sectionIndex].setAttribute('aria-disabled', 'true');
    }
    
    // Toggle label if its aria-expanded attr has been set, otherwise initially hide it
    if (labels[sectionIndex].hasAttribute(ariaAttr)) {
      labels[sectionIndex].setAttribute(ariaAttr, String(!active));
    } else {
      labels[sectionIndex].setAttribute(ariaAttr, 'false');
    }
  }

  /**
   * Toggle active content
   * @param {number} sectionIndex
   */
  protected toggleContent(sectionIndex: number) {
    const contents = this.element.querySelectorAll('.silc-accordion__content') as NodeListOf<HTMLElement>;
    const hidden = !!JSON.parse(contents[sectionIndex].getAttribute('aria-hidden')) as boolean;

    // Toggle currently active content if only one section should be open
    if (!this.settings.openMultiple) {
      // Avoid toggling the current content before doing so below
      if (typeof this.activeSections[0] !== 'undefined' && this.activeSections[0] !== sectionIndex) {
        contents[this.activeSections[0]].setAttribute('aria-hidden', 'true');
      }
    }

    // Toggle content if its aria-hidden attr has been set, otherwise initially hide it
    if (contents[sectionIndex].hasAttribute('aria-hidden')) {
      contents[sectionIndex].setAttribute('aria-hidden', String(!hidden));
    } else {
      contents[sectionIndex].setAttribute('aria-hidden', 'true');
    }
  }

  /**
   * Convert from tabs to accordions
   */
  protected convertToAccordions() {
    const newSections = [];
    const labels = this.element.querySelectorAll('.silc-accordion__label') as NodeListOf<HTMLAnchorElement>;

    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      const content = document.getElementById(label.getAttribute('aria-controls'));
      const section = document.createElement('DIV');

      label.setAttribute('role', 'button');
      label.setAttribute('aria-expanded', label.getAttribute('aria-selected'));
      label.removeAttribute('aria-selected');
      label.removeAttribute('aria-disabled');
      content.removeAttribute('role');
      section.className = 'silc-accordion__section';
      section.appendChild(label);
      section.appendChild(content);
      if (this.activeSections.indexOf(i) !== -1) {
        section.classList.add('silc-accordion__section--active');
      }

      newSections.push(section);
    }

    this.element.innerHTML = '';

    for (let i = 0; i < newSections.length; i++) {
      this.element.appendChild(newSections[i]);
    }

    this.displayingAsTabs = false;
  }

  protected convertToTabs() {
    const labels = this.element.querySelectorAll('.silc-accordion__label') as NodeListOf<HTMLAnchorElement>;
    const tabList = document.createElement('DIV');
    const tabPanels = document.createElement('DIV');

    tabList.className = 'silc-accordion__tablist';
    tabList.setAttribute('role', 'tablist');
    tabPanels.className = 'silc-accordion__tabpanels';

    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      const content = document.getElementById(label.getAttribute('aria-controls'));

      label.setAttribute('role', 'tab');
      label.setAttribute('aria-selected', label.getAttribute('aria-expanded'));
      label.removeAttribute('aria-expanded');
      content.setAttribute('role', 'tabpanel');
      tabList.appendChild(label);
      tabPanels.appendChild(content);
    }

    this.element.innerHTML = '';
    this.element.appendChild(tabList);
    this.element.appendChild(tabPanels);

    this.displayingAsTabs = true;
  }
}
