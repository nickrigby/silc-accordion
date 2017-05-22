# Silk Accordion
The accordion module is an ultra-lightweight web component for the [silk framework](https://github.com/nickrigby/silk). The accordion module is capable of pure accordions, accordions that become tabs, or pure tabs.

## HTML
```html
<div class="silk-accordion">
    <section class="silk-accordion__section">
        <header class="silk-accordion__header">
            <h2 class="silk-accordion__label">Accordion 1</h2>
        </header>
        <div class="silk-accordion__content">
            <p>Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo.</p>
        </div>
    </section>
    <section class="silk-accordion__section">
        <header class="silk-accordion__header">
            <h2 class="silk-accordion__label">Accordion 2</h2>
        </header>
        <div class="silk-accordion__content">
            <p>Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo.</p>
        </div>
    </section>
</div>
```

### Accordion that becomes tabs
```html
<div class="silk-accordion silk-accordion--become-tabs">
    <nav class="silk-accordion__nav">
        <ul class="silk-accordion__nav-items">
            <li class="silk-accordion__nav-item"><a class="silk-accordion__nav-link" href="#silk-accordion-1-1">Tab 1</a></li>
            <li class="silk-accordion__nav-item"><a class="silk-accordion__nav-link" href="#silk-accordion-1-2">Tab 2</a></li>
        </ul>
    </nav>
    <section class="silk-accordion__section" id="silk-accordion-1-1">
        <header class="silk-accordion__header">
            <h2 class="silk-accordion__label">Tab 1</h2>
        </header>
        <div class="silk-accordion__content">
            <p>Tab 1 content.</p>
        </div>
    </section>
    <section class="silk-accordion__section" id="silk-accordion-1-2">
        <header class="silk-accordion__header">
            <h2 class="silk-accordion__label">Tab 2</h2>
        </header>
        <div class="silk-accordion__content">
            <p>Tab 2 content.</p>
        </div>
    </section>
</div>
```

### Tabs
```html
<div class="silk-accordion silk-accordion--tabs">
    <nav class="silk-accordion__nav">
        <ul class="silk-accordion__nav-items">
            <li class="silk-accordion__nav-item"><a class="silk-accordion__nav-link" href="#silk-accordion-2-1">Tab 1</a></li>
            <li class="silk-accordion__nav-item"><a class="silk-accordion__nav-link" href="#silk-accordion-2-2">Tab 2</a></li>
        </ul>
    </nav>
    <section class="silk-accordion__section" id="silk-accordion-2-1">
        <header class="silk-accordion__header">
            <h2 class="silk-accordion__label">Tab 1</h2>
        </header>
        <div class="silk-accordion__content">
            <p>Tab 1 content.</p>
        </div>
    </section>
    <section class="silk-accordion__section" id="silk-accordion-2-2">
        <header class="silk-accordion__header">
            <h2 class="silk-accordion__label">Tab 2</h2>
        </header>
        <div class="silk-accordion__content">
            <p>Tab 2 content.</p>
        </div>
    </section>
</div>
```

## Options
The functionality of the accordion can be modified by adding JavaScript data attributes.

 - Open first accordion by default: `data-silk-accordion-open-first`
 - Allow multiple content areas to be open: `data-silk-accordion-open-multiple`

## Styling
As with all Silk components, no deliberate style has been added. However, through a SASS fallback system, a number of [SASS variables](src/scss/_variables.scss) are available to easily apply design without having to write your own selectors.
