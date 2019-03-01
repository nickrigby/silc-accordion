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
  protected sections: NodeListOf<HTMLElement>;
  protected _activeSection: HTMLElement;
  
  /**
   * Toggle the active section when the activeSection property is updated
   * @param {HTMLElement} el
   */
  set activeSection(el: HTMLElement) {
    if (el) {
      this.toggleSection(el);
      this.toggleLabel(el);
      this.toggleContent(el);
    }
    
    // Store a reference to the current active section
    this._activeSection = el;
  }

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
      this.activeSection = null;

      this.initiallyHideSections();

      // Label event listener
      if (this.sections.length) {
        this.labelEventListener();
      }

      // Open first element
      if (this.settings.openFirst) {
        const firstSection = this.element.querySelector('.silc-accordion__section') as HTMLElement;
        this.activeSection = firstSection;
      }

      // Add initialized class
      this.element.classList.add('silc-accordion--initialized');
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

    return settings;
  }

  /**
   * Hide the content when the component is instantiated
   */
  protected initiallyHideSections() {
    for (let i = 0; i < this.sections.length; i++) {
      this.toggleLabel(this.sections[i]);
      this.toggleContent(this.sections[i]);
    }
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
        this.activeSection = target.closest('.silc-accordion__section') as HTMLElement;
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
   * Gets accordion based on id
   * @param {String} id - id of content to get
   */
  protected getById(id: String) {
    return {
      'content': this.element.querySelector(id + ' .silc-accordion__content') as HTMLElement,
      'label': this.element.querySelector(id + ' .silc-accordion__label') as HTMLElement
    };
  }

  /**
   * Toggle the current section
   * @param {HTMLElement} el
   */
  protected toggleSection(el: HTMLElement) {
    // Toggle currently active section if only one should be open
    if (!this.settings.openMultiple) {
      // Avoid toggling the current section before doing so below
      if (this._activeSection && this._activeSection !== el) {
        this._activeSection.classList.remove('silc-accordion__section--active');
      }

      // Toggle the current element's active class
      el.classList.toggle('silc-accordion__section--active');
    }
  }

  /**
   * Toggle active label
   * @param {HTMLElement} section
   */
  protected toggleLabel(section: HTMLElement) {
    const label = section.querySelector('.silc-accordion__label') as HTMLElement;
    const expanded = !!JSON.parse(label.getAttribute('aria-expanded')) as boolean;

    // Toggle currently active label if only one section should be open
    if (!this.settings.openMultiple) {
      // Avoid toggling the current label before doing so below
      if (this._activeSection && this._activeSection !== section) {
        const activeLabel = this._activeSection.querySelector('.silc-accordion__label');
        activeLabel.setAttribute('aria-expanded', 'false');
      }
    }
    
    // Toggle label if its aria-expanded attr has been set, otherwise initially hide it
    if (label.hasAttribute('aria-expanded')) {
      label.setAttribute('aria-expanded', String(!expanded));
    } else {
      label.setAttribute('aria-expanded', 'false');
    }
  }

  /**
   * Toggle active content
   * @param {HTMLElement} section
   */
  protected toggleContent(section: HTMLElement) {
    const content = section.querySelector('.silc-accordion__content') as HTMLElement;
    const hidden = !!JSON.parse(content.getAttribute('aria-hidden')) as boolean;

    // Toggle currently active content if only one section should be open
    if (!this.settings.openMultiple) {
      // Avoid toggling the current content before doing so below
      if (this._activeSection && this._activeSection !== section) {
        const activeContent = this._activeSection.querySelector('.silc-accordion__content');
        activeContent.setAttribute('aria-hidden', 'true');
      }
    }

    // Toggle content if its aria-hidden attr has been set, otherwise initially hide it
    if (content.hasAttribute('aria-hidden')) {
      content.setAttribute('aria-hidden', String(!hidden));
    } else {
      content.setAttribute('aria-hidden', 'true');
    }
  }

  /**
   * Hide all persistent visible content
   * Persistent visible class is used for accordions that transform to tabs
   */
  protected hideAllPersitentVisible() {
    this.removeCssClass('silc-accordion__content--visible-persist');
  }

  /**
   * Remove CSS class from all matching elements
   * @param className 
   */
  protected removeCssClass(className: string, excludeEl?) {

    // Hide all persitent visible content
    let children = <NodeList>this.element.querySelectorAll('.' + className);
    if (children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        let el = <HTMLElement>children[i];
        if (el !== excludeEl && this.element === el.closest('.silc-accordion')) {
          el.classList.remove(className);
        }
      }
    }
  }

  /**
   * Set active label
   * @param el 
   * @param className 
   */
  protected toggleActiveLabel(el: Element, className: string) {

    if (!this.settings.openMultiple) {

      let currentActive = this.element.querySelector('.' + className);

      if (currentActive && currentActive !== el && this.element === currentActive.closest('.silc-accordion')) {
        currentActive.classList.remove(className);
      }
    }

    el.classList.toggle(className);
  }

  /**
   * Set active tab
   * @param el
   * @param className 
   */
  protected toggleActiveTab(el: Element, className: string) {

    // Get current active tab
    let currentActive = this.element.querySelector('.' + className);

    // Remove active class
    currentActive.classList.remove(className);

    // Add active class to clicked tab
    el.classList.add(className);
  }
}
