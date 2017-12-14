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

        // Label event listener
        if (this.labels.length) {
            this.labelEventListener();
        }

        // Nav event listener
        if (this.settings.tabs && this.nav !== undefined) {
            this.navEventListener();
            this.nav.querySelector('.silc-accordion__nav-link').classList.add('silc-accordion__nav-link--active');
            this.element.querySelector('.silc-accordion__content').classList.add('silc-accordion__content--visible-persist');
        }

        // Open first element
        if (this.settings.openFirst) {
            this.element.querySelector('.silc-accordion__label').classList.add('silc-accordion__label--active');
            this.element.querySelector('.silc-accordion__content').classList.add('silc-accordion__content--visible');
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
            let target = <HTMLElement>event.target;

            // If target contains label class
            if (target.classList.contains('silc-accordion__label')) {

                event.preventDefault();

                // Get clicked labels associated content element
                let content = this.getContent(target);

                // Toggle the content
                this.toggleContent(content);

                // Toggle active element
                this.toggleActiveLabel(target, 'silc-accordion__label--active');
            }

            event.stopPropagation();
        });
    }

    /**
     * Event listener for tabs navigation
     */
    protected navEventListener() {
        this.nav.addEventListener('click', event => {

            let target = <HTMLElement>event.target;

            if (target.classList.contains('silc-accordion__nav-link')) {
                event.preventDefault();
                this.toggleTab(target);
            }

            event.stopPropagation();
        });
    }

    /**
     * Gets content element from clicked label
     * @param {Element} label
     */
    protected getContent(label): Element {
        return <Element>label.parentNode.nextElementSibling;
    }

    /**
     * Gets accordion based on id
     * @param {String} id - id of content to get
     */
    protected getById(id: String) {
        return {
            'content': <Element>this.element.querySelector(id + ' .silc-accordion__content'),
            'label': <Element>this.element.querySelector(id + ' .silc-accordion__label')
        };
    }

    /**
     * Toggle tab from clicked nav link
     * @param {Element} link - link element clicked
     */
    protected toggleTab(link: Element) {

        let targetId = link.getAttribute('href');
        let accordion = this.getById(targetId);

        this.hideAllPersitentVisible();
        this.toggleContent(accordion.content);
        this.toggleActiveTab(link, 'silc-accordion__nav-link--active');
        this.toggleActiveLabel(accordion.label, 'silc-accordion__label--active');

        // Ensure that one tab is always open
        accordion.content.classList.add('silc-accordion__content--visible-persist');
    }

    /**
     * Show content
     * @param {Element} el
     */
    protected toggleContent(el: Element) {

        if (!this.settings.openMultiple) {
            this.removeCssClass('silc-accordion__content--visible', el); 
        }

        el.classList.toggle('silc-accordion__content--visible');
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
        [].forEach.call(this.element.querySelectorAll('.' + className), el => {
            if (el !== excludeEl) {
                el.classList.remove(className);
            }
        });
    }

    /**
     * Set active label
     * @param el 
     * @param className 
     */
    protected toggleActiveLabel(el: Element, className: string) {

        if (!this.settings.openMultiple) {

            let currentActive = this.element.querySelector('.' + className);

            if (currentActive && currentActive !== el) {
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
