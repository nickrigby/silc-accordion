interface SilcAccordionSettings {
    openMultiple: boolean;
    openFirst: boolean;
    tabs: boolean;
}

export class SilcAccordion {

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

        if (this.element.dataset !== undefined) {
            if (this.element.dataset.silcAccordionOpenMultiple !== undefined) {
                settings.openMultiple = true;
            }
            if (this.element.dataset.silcAccordionOpenFirst !== undefined) {
                settings.openFirst = true;
            }
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

                let content = this.getContent(target);
                this.showContent(content);
                this.setActiveElement(target, 'silc-accordion__label--active');
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
     * Gets content based on id
     * @param {String} id - id of content to get
     */
    protected getContentById(id: String): Element {
        return <Element>this.element.querySelector(id + ' .silc-accordion__content');
    }

    /**
     * Toggle tab from clicked nav link
     * @param {Element} link - link element clicked
     */
    protected toggleTab(link: Element) {

        let targetId = link.getAttribute('href');
        let content = this.getContentById(targetId);

        this.hideAllPersitentVisible();
        this.showContent(content);
        this.setActiveElement(link, 'silc-accordion__nav-link--active');

        // Ensure that one tab is always open
        content.classList.add('silc-accordion__content--visible-persist');
    }

    /**
     * Show content
     * @param {Element} el
     */
    protected showContent(el: Element) {

        if (!this.settings.openMultiple) {
            this.hideAllVisible();
            el.classList.add('silc-accordion__content--visible');
        } else {
            el.classList.toggle('silc-accordion__content--visible');
        }
    }

    /**
     * Hide all visible content
     */
    protected hideAllVisible() {
        this.removeCssClass('silc-accordion__content--visible');
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
    protected removeCssClass(className: string) {
        // Hide all persitent visible content
        [].forEach.call(this.element.querySelectorAll('.' + className), el => {
            el.classList.remove(className);
        });
    }

    /**
     * Set active element
     * @param el 
     * @param className 
     */
    protected setActiveElement(el: Element, className: string) {
        if (this.settings.openMultiple) {
            el.classList.toggle(className);
        } else {
            let currentActive = this.element.querySelector('.' + className);
            if (currentActive !== null) {
                currentActive.classList.remove(className);
            }

            el.classList.add(className);
        }
    }
}
