# silc Accordion [![Build Status](https://travis-ci.org/nickrigby/silc-accordion.svg?branch=master)](https://travis-ci.org/nickrigby/silc-accordion) [![npm version](https://badge.fury.io/js/silc-accordion.svg)](https://badge.fury.io/js/silc-accordion)
The accordion module is an ultra-lightweight web component for the [silc framework](https://github.com/nickrigby/silc). The accordion module is capable of pure accordions, accordions that become tabs, or pure tabs.

## HTML
```html
<div class="silc-accordion">
    <section class="silc-accordion__section">
        <header class="silc-accordion__header">
            <h2 class="silc-accordion__label">Accordion 1</h2>
        </header>
        <div class="silc-accordion__content">
            <p>Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo.</p>
        </div>
    </section>
    <section class="silc-accordion__section">
        <header class="silc-accordion__header">
            <h2 class="silc-accordion__label">Accordion 2</h2>
        </header>
        <div class="silc-accordion__content">
            <p>Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo.</p>
        </div>
    </section>
</div>
```

### Accordion that becomes tabs
```html
<div class="silc-accordion silc-accordion--become-tabs">
    <nav class="silc-accordion__nav">
        <ul class="silc-accordion__nav-items">
            <li class="silc-accordion__nav-item"><a class="silc-accordion__nav-link" href="#silc-accordion-1-1">Tab 1</a></li>
            <li class="silc-accordion__nav-item"><a class="silc-accordion__nav-link" href="#silc-accordion-1-2">Tab 2</a></li>
        </ul>
    </nav>
    <section class="silc-accordion__section" id="silc-accordion-1-1">
        <header class="silc-accordion__header">
            <h2 class="silc-accordion__label">Tab 1</h2>
        </header>
        <div class="silc-accordion__content">
            <p>Tab 1 content.</p>
        </div>
    </section>
    <section class="silc-accordion__section" id="silc-accordion-1-2">
        <header class="silc-accordion__header">
            <h2 class="silc-accordion__label">Tab 2</h2>
        </header>
        <div class="silc-accordion__content">
            <p>Tab 2 content.</p>
        </div>
    </section>
</div>
```

### Tabs
```html
<div class="silc-accordion silc-accordion--tabs">
    <nav class="silc-accordion__nav">
        <ul class="silc-accordion__nav-items">
            <li class="silc-accordion__nav-item"><a class="silc-accordion__nav-link" href="#silc-accordion-2-1">Tab 1</a></li>
            <li class="silc-accordion__nav-item"><a class="silc-accordion__nav-link" href="#silc-accordion-2-2">Tab 2</a></li>
        </ul>
    </nav>
    <section class="silc-accordion__section" id="silc-accordion-2-1">
        <header class="silc-accordion__header">
            <h2 class="silc-accordion__label">Tab 1</h2>
        </header>
        <div class="silc-accordion__content">
            <p>Tab 1 content.</p>
        </div>
    </section>
    <section class="silc-accordion__section" id="silc-accordion-2-2">
        <header class="silc-accordion__header">
            <h2 class="silc-accordion__label">Tab 2</h2>
        </header>
        <div class="silc-accordion__content">
            <p>Tab 2 content.</p>
        </div>
    </section>
</div>
```

## Class modifiers

### Tabs navigation width
Tabs can be set to "stretch" to the entire length of the tabs container by adding the modifier `silc-accordion__nav-items--stretch`

```html
<ul class="silc-accordion__nav-items silc-accordion__nav-items--stretch">
...
</ul>
```

## Options
The functionality of the accordion can be modified by adding JavaScript data attributes.

 - Open first accordion by default: `data-silc-accordion-open-first`
 - Allow multiple content areas to be open: `data-silc-accordion-open-multiple`

## Styling
As with all silc components, no deliberate style has been added. However, through a SASS fallback system, a number of [SASS variables](src/scss/_variables.scss) are available to easily apply design without having to write your own selectors.
