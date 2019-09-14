# silc Accordion [![Build Status](https://travis-ci.org/nickrigby/silc-accordion.svg?branch=master)](https://travis-ci.org/nickrigby/silc-accordion) [![npm version](https://badge.fury.io/js/silc-accordion.svg)](https://badge.fury.io/js/silc-accordion)
The accordion module is an ultra-lightweight web component for the [silc framework](https://github.com/nickrigby/silc). The accordion module is capable of pure accordions, accordions that become tabs, or pure tabs.

## HTML
```html
<div class="silc-accordion" id="accordion-0">
    <div class="silc-accordion__section">
         <button id="accordion-0-section-1-label" class="silc-accordion__label" aria-controls="accordion-0-section-1-content">
             Accordion 1
         </button>
         <div class="silc-accordion__content" id="accordion-0-section-1-content"  aria-labelledby="accordion-0-section-1-label">
             <div class="silc-accordion__content-compartment">
                 <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod perferendis architecto deserunt, et libero culpa obcaecati ab possimus laborum quibusdam, eum harum accusamus. Quisquam, facere suscipit hic maiores voluptatibus perspiciatis?</p>
             </div>
         </div>
    </div>
    <div class="silc-accordion__section">
        <button id="accordion-0-section-2-label" class="silc-accordion__label" aria-controls="accordion-0-section-2-content">
            Accordion 2
        </button>
        <div class="silc-accordion__content" id="accordion-0-section-2-content"  aria-labelledby="accordion-0-section-2-label">
            <div class="silc-accordion__content-compartment">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, id inventore! Labore vel, mollitia quae cum quibusdam, dolore harum doloribus dicta adipisci iusto eligendi consectetur nam, impedit quia atque in.</p>
            </div>
        </div>
    </div>
</div>
```

### Accordion that becomes tabs
```html
<div class="silc-accordion silc-accordion--become-tabs" id="accordion-1" data-silc-accordion-animated>
    <div class="silc-accordion__section">
        <button id="accordion-1-section-1-label" class="silc-accordion__label" aria-controls="accordion-1-section-1-content">
            Tab 1
        </button>
        <div class="silc-accordion__content" id="accordion-1-section-1-content" aria-labelledby="accordion-1-section-1-label">
            <div class="silc-accordion__content-compartment">
                <p>Tab 1 content</p>
            </div>
        </div>
    </div>
    <div class="silc-accordion__section">
        <button id="accordion-1-section-2-label" class="silc-accordion__label" aria-controls="accordion-1-section-2-content">
            Tab 2
        </button>
        <div class="silc-accordion__content" id="accordion-1-section-2-content" aria-labelledby="accordion-1-section-2-label">
            <div class="silc-accordion__content-compartment">
                <p>Tab 2 content</p>
            </div>
        </div>
    </div>
    <div class="silc-accordion__section">
        <button id="accordion-1-section-3-label" class="silc-accordion__label" aria-controls="accordion-1-section-3-content">
            Tab 3
        </button>
        <div class="silc-accordion__content" id="accordion-1-section-3-content" aria-labelledby="accordion-1-section-3-label">
            <div class="silc-accordion__content-compartment">
                <p>Tab 3 Content</p>
            </div>
        </div>
    </div>
</div>
```

### Tabs
```html
<div class="silc-accordion silc-accordion--tabs" id="accordion-2">
    <div class="silc-accordion__section">
        <button id="accordion-2-section-1-label" class="silc-accordion__label" aria-controls="accordion-2-section-1-content">
            Tab 1
        </button>
        <div class="silc-accordion__content" id="accordion-2-section-1-content" aria-labelledby="accordion-2-section-1-label">
            <div class="silc-accordion__content-compartment">
                <p>Tab 1 Content</p>
            </div>
        </div>
    </div>
    <div class="silc-accordion__section">
        <button id="accordion-2-section-2-label" class="silc-accordion__label" aria-controls="accordion-2-section-2-content">
            Tab 2
        </button>
        <div class="silc-accordion__content" id="accordion-2-section-2-content" aria-labelledby="accordion-2-section-2-label">
            <div class="silc-accordion__content-compartment">
                <p>Tab 2 Content</p>
            </div>
        </div>
    </div>
    <div class="silc-accordion__section">
        <button id="accordion-2-section-3-label" class="silc-accordion__label" aria-controls="accordion-2-section-3-content">
            Tab 3
        </button>
        <div class="silc-accordion__content" id="accordion-2-section-3-content" aria-labelledby="accordion-2-section-3-label">
            <div class="silc-accordion__content-compartment">
                <p>Tab 3 Content</p>
            </div>
        </div>
    </div>
</div>
```

## Class modifiers

### Tabs navigation width
Tabs can be set to "stretch" to the entire length of the tabs container by adding the modifier `silc-accordion--stretch-tabs`

```html
<div class="silc-accordion silc-accordion--tabs silc-accordion--stretch-tabs">
...
</div>
```

## Options
The functionality of the accordion can be modified by adding JavaScript data attributes.

 - Open first accordion by default: `data-silc-accordion-open-first`
 - Allow multiple content areas to be open: `data-silc-accordion-open-multiple`
 - Allow slide animations for accordions: `data-silc-accordion-animated`

## Styling
As with all silc components, no deliberate style has been added. However, through a SASS fallback system, a number of [SASS variables](src/scss/_variables.scss) are available to easily apply design without having to write your own selectors.
