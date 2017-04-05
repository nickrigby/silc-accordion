export default class Accordion
{
    element: HTMLElement;
    tabs: boolean;

    constructor(element: HTMLElement)
    {
        // Save element
        this.element = element;

        // Get tabs behavior
        this.tabs = (
            this.element.classList.contains('silk-accordion--become-tabs') ||
            this.element.classList.contains('silk-accordion--tabs')
        ) ? true : false;

        // Get labels
        let labels = this.element.querySelectorAll('.silk-accordion--section-label');

        if(labels.length)
        {
            // Attach event listener to labels
            [].forEach.call(labels, (label) => {
                label.addEventListener('click', (event) => {
                    this.toggleLabel(event);
                });
            });
        }

        // Attach event listener to nav
        if(this.tabs)
        {
            // Get tab elements
            var tabs = this.element.querySelectorAll('.silk-accordion--nav-list a');

            // If we have tabs
            if(tabs.length)
            {
                // Attach event listener to tab elements
                [].forEach.call(tabs, (tab) => {
                    tab.addEventListener('click', (event) => {
                        this.toggleTab(event);
                    });
                });

                // Show first tab
                this.element.querySelector(tabs[0].getAttribute('href') + ' .silk-accordion--section-content').classList.add('is-visible--persist');
            }
        }
    }

    toggleLabel(event)
    {
        event.preventDefault();

		// Get parent
		let parent = <Element>event.target.parentNode;

		// Get content
		let content = parent.nextElementSibling;

		// Toggle visible class
		content.classList.toggle('is-visible');
    }

    toggleTab(event)
    {
        event.preventDefault();

        // Get target id
        let targetId = event.target.getAttribute('href');

        // Get content element
        let content = this.element.querySelector(targetId + ' .silk-accordion--section-content');

        // Get current visible elements
        var visible = this.element.querySelectorAll('.is-visible--persist');

        // Hide all visible elements
        [].forEach.call(visible, (element) => {
            element.classList.remove('is-visible--persist');
        });

        // Show selected content
        content.classList.toggle('is-visible--persist');
    }
}
