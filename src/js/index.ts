export class SilkAccordion
{
    element: HTMLElement;
    tabs: boolean;
    openMultiple: boolean;
    openFirst: boolean;
    labels: NodeList;
    navItems: NodeList;

    constructor(element: HTMLElement)
    {
        // Save element
        this.element = element;

        // Class attributes
        this.tabs = (
            this.element.classList.contains('silk-accordion--become-tabs') ||
            this.element.classList.contains('silk-accordion--tabs')
        ) ? true : false;

        this.openMultiple = (
            this.element.dataset.silkAccordionOpenMultiple !== undefined
        ) ? true : false;

        this.openFirst = (
            this.element.dataset.silkAccordionOpenFirst !== undefined
        ) ? true : false;

        this.labels = this.element.querySelectorAll('.silk-accordion__label');
        this.navItems = this.element.querySelectorAll('.silk-accordion__nav-items');

        // Label event listener
        if(this.labels.length)
        {
            [].forEach.call(this.labels, (el) => {
                el.addEventListener('click', (event) => {
                    this.toggleLabel(event);
                });
            });
        }

        // Nav item event listener
        if(this.tabs && this.navItems.length)
        {
            [].forEach.call(this.navItems, (el) => {
                el.addEventListener('click', (event) => {
                    this.toggleTab(event);
                });
            });

            // Show first tab
            this.element.querySelector('.silk-accordion__content').classList.add('silk-accordion__content--visible-persist');
        }

        // Open first element
        if(this.openFirst) {
            this.element.querySelector('.silk-accordion__content').classList.add('silk-accordion__content--visible');
        }
    }

    toggleLabel(event)
    {
        event.preventDefault();

		// Get content element to show
		let content = <Element>event.target.parentNode.nextElementSibling;

        // Show the content
        this.showContent(content);
    }

    toggleTab(event)
    {
        event.preventDefault();

        // Get target id
        let targetId = event.target.getAttribute('href');

        // Get content element
        let content = this.element.querySelector(targetId + ' .silk-accordion__content');

        // Hide all persitent visible content
        this.hideAllPersitentVisible();

        // Show content
        this.showContent(content);

        // Ensures that one tab is always open
        content.classList.add('silk-accordion__content--visible-persist');
    }

    showContent(el) {

        if(!this.openMultiple) {

            this.hideAllVisible();

            el.classList.add('silk-accordion__content--visible');

        } else {
            el.classList.toggle('silk-accordion__content--visible');
        }

    }

    hideAllVisible() {

        // Remove all visible content
        [].forEach.call(this.element.querySelectorAll('.silk-accordion__content--visible'), (el) => {
            el.classList.remove('silk-accordion__content--visible');
        });

    }

    hideAllPersitentVisible() {

        // Hide all persitent visible content
        [].forEach.call(this.element.querySelectorAll('.silk-accordion__content--visible-persist'), (el) => {
            el.classList.remove('silk-accordion__content--visible-persist');
        });
    }
}
