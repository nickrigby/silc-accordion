export default class Accordion
{
    element: HTMLElement;

    constructor(element: HTMLElement)
    {
        // Save element
        this.element = element;

        // Add Event listener
        this.element.addEventListener('click', this.toggle);
    }

    toggle(event)
    {
        event.preventDefault();

		// Get parent
		let parent = <Element>event.target.parentNode;

		// Get content
		let content = parent.nextElementSibling;

		// Toggle visible class
		content.classList.toggle('is-visible');
    }
}
