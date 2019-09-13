"use strict";
exports.__esModule = true;
var debounce = require("lodash.debounce");
// .closest() polyfill
var elementClosest = require("element-closest");
elementClosest;
var default_1 = /** @class */ (function () {
    /**
     * Constructor
     * @param {HTMLElement} element
     */
    function default_1(element) {
        this.labels = [];
        this.contentAreas = [];
        this.sections = [];
        this.activeSections = [];
        this.displayingAsTabs = false;
        if (element) {
            // Set class properties
            this.element = element;
            this.sections = this.getChildNodesByClassName('silc-accordion__section');
            this.labels = this.getChildNodesByClassName('silc-accordion__label');
            this.contentAreas = this.getChildNodesByClassName('silc-accordion__content');
            this.settings = this.applySettings();
            this.initiallyHideSections();
            if (this.sections.length) {
                // Label event listener
                this.labelEventListener();
                // Add indices to each label to track active indices
                // and set type to button to prevent form submissions
                this.addAttributesToLabels();
                if (this.settings.openFirst) {
                    // Open first element
                    this.openFirstSection();
                }
                if (this.settings.tabs) {
                    // If this should always be a tab component, convert the accordion markup to that
                    if (!this.settings.becomeTabsBreakpoint) {
                        this.convertToTabs();
                        this.openFirstSection();
                    }
                    else {
                        // Add resize listener to switch between tabs and accordions
                        this.becomeTabsResizeListener();
                    }
                }
                // Add support for slide transitions
                if (this.settings.shouldAnimate) {
                    this.contentTransitionListener();
                }
                // Add initialized class
                this.element.classList.add('silc-accordion--initialized');
            }
        }
    }
    /**
     * Get all nodes of specified className that belong to this accordion
     */
    default_1.prototype.getChildNodesByClassName = function (className) {
        var allNodes = this.element.querySelectorAll("." + className);
        var childNodes = [];
        for (var i = 0; i < allNodes.length; i++) {
            if (allNodes[i].closest('.silc-accordion') === this.element) {
                childNodes.push(allNodes[i]);
            }
        }
        return childNodes;
    };
    /**
     * Toggle the active section when the activeSection property is updated
     * @param {HTMLElement} el
     */
    default_1.prototype.updateActiveSections = function (label) {
        if (label) {
            var sectionIndex = parseInt(label.getAttribute('data-index'));
            // Don't do this for tabs since they don't have a .silc-accordion__section element
            if (!this.displayingAsTabs && !(this.settings.tabs && !this.settings.becomeTabsBreakpoint)) {
                this.toggleSection(sectionIndex);
            }
            this.toggleLabel(sectionIndex);
            this.toggleContent(sectionIndex);
            // Store a reference to the current active section(s)
            var activeSectionIndex = this.activeSections.indexOf(sectionIndex);
            // Make sure that we only store one active section unless set to open multiple
            if (!this.settings.openMultiple) {
                this.activeSections = [];
            }
            if (activeSectionIndex !== -1) {
                // If it's in there already, remove it
                delete this.activeSections[this.activeSections.indexOf(activeSectionIndex)];
            }
            else {
                // If not add it
                this.activeSections.push(sectionIndex);
            }
        }
    };
    /**
     * Add a data-index attribute to each label to track the indices of active accordions
     * and explicitly set the type attribute to button to prevent accidental form submissions
     */
    default_1.prototype.addAttributesToLabels = function () {
        for (var i = 0; i < this.sections.length; i++) {
            var label = this.sections[i].querySelector('.silc-accordion__label');
            label.setAttribute('data-index', String(i));
            label.setAttribute('type', 'button');
        }
    };
    /**
     * Apply accordion settings
     */
    default_1.prototype.applySettings = function () {
        var settings = {
            tabs: this.element.classList.contains('silc-accordion--become-tabs') || this.element.classList.contains('silc-accordion--tabs'),
            openMultiple: this.element.hasAttribute('data-silc-accordion-open-multiple'),
            openFirst: this.element.hasAttribute('data-silc-accordion-open-first'),
            shouldAnimate: this.element.hasAttribute('data-silc-accordion-animated')
        };
        if (this.element.classList.contains('silc-accordion--become-tabs')) {
            var beforeContent = window.getComputedStyle(this.element, ':before').content;
            settings.becomeTabsBreakpoint = parseInt(beforeContent.replace(/"*/g, ''));
        }
        return settings;
    };
    /**
     * Hide the content when the component is instantiated
     */
    default_1.prototype.initiallyHideSections = function () {
        for (var i = 0; i < this.sections.length; i++) {
            this.toggleLabel(i);
            this.toggleContent(i);
        }
    };
    /**
     * Open first section
     */
    default_1.prototype.openFirstSection = function () {
        var firstLabel = this.element.querySelector('.silc-accordion__label');
        this.updateActiveSections(firstLabel);
    };
    /**
     * Event listener for accordion labels
     */
    default_1.prototype.labelEventListener = function () {
        var _this = this;
        this.element.addEventListener('click', function (event) {
            // Get target from event
            var target = event.target;
            // Only update the active section if this section belongs to the current accordion
            if (target.closest('.silc-accordion') === _this.element) {
                // If target contains label class update the active section
                if (target.classList.contains('silc-accordion__label')) {
                    // Stop tab from toggling itself
                    if (!target.hasAttribute('aria-disabled')) {
                        _this.updateActiveSections(target);
                    }
                }
            }
        });
    };
    /**
     * Listen for transitionend event of accordion content areas to set height to auto
     */
    default_1.prototype.contentTransitionListener = function () {
        this.element.addEventListener('transitionend', function (event) {
            // Get target from event
            var target = event.target;
            if (target.classList.contains('silc-accordion__content') && event.propertyName === 'height') {
                // Remove inline height style used to transition
                target.style.height = null;
                target.classList.remove('transitioning');
            }
        });
    };
    /**
     * Switch between tabs and accordions on resize
     */
    default_1.prototype.becomeTabsResizeListener = function () {
        var _this = this;
        var resizeHandler = function () {
            // Not using matchMedia due to Zombie not supporting it for unit tests, even when using a polyfill
            if (window.innerWidth >= _this.settings.becomeTabsBreakpoint) {
                // Switch to tabs
                if (!_this.displayingAsTabs) {
                    _this.convertToTabs();
                    // Force first section open if none are selected
                    if (!_this.activeSections.length) {
                        _this.openFirstSection();
                    }
                }
            }
            else {
                // Switch to accordion
                if (_this.displayingAsTabs) {
                    _this.convertToAccordions();
                }
            }
        };
        window.addEventListener('resize', debounce(resizeHandler, 100));
        resizeHandler();
    };
    /**
     * Toggle the current section
     * @param {number} sectionIndex
     */
    default_1.prototype.toggleSection = function (sectionIndex) {
        // Toggle currently active section if only one should be open
        if (!this.settings.openMultiple) {
            // Avoid toggling the current section before doing so below
            if (typeof this.activeSections[0] !== 'undefined' && this.activeSections[0] !== sectionIndex) {
                this.sections[this.activeSections[0]].classList.remove('silc-accordion__section--active');
            }
        }
        // Toggle the current element's active class
        this.sections[sectionIndex].classList.toggle('silc-accordion__section--active');
    };
    /**
     * Toggle active label
     * @param {number} sectionIndex
     */
    default_1.prototype.toggleLabel = function (sectionIndex) {
        var selectedLabel = this.labels[sectionIndex];
        var ariaAttr = this.displayingAsTabs ? 'aria-selected' : 'aria-expanded';
        var active = !!JSON.parse(selectedLabel.getAttribute(ariaAttr));
        // Toggle currently active label if only one section should be open
        if (!this.settings.openMultiple) {
            // Avoid toggling the current label before doing so below
            if (typeof this.activeSections[0] !== 'undefined' && this.activeSections[0] !== sectionIndex) {
                this.labels[this.activeSections[0]].setAttribute(ariaAttr, 'false');
                this.labels[this.activeSections[0]].removeAttribute('aria-disabled');
            }
        }
        if (this.displayingAsTabs) {
            // Prevent active tab from toggling itself
            selectedLabel.setAttribute('aria-disabled', 'true');
        }
        // Toggle label if its aria-expanded attr has been set, otherwise initially hide it
        if (selectedLabel.hasAttribute(ariaAttr)) {
            selectedLabel.setAttribute(ariaAttr, String(!active));
        }
        else {
            selectedLabel.setAttribute(ariaAttr, 'false');
        }
    };
    /**
     * Toggle active content
     * @param {number} sectionIndex
     */
    default_1.prototype.toggleContent = function (sectionIndex) {
        var selectedContent = this.contentAreas[sectionIndex];
        var visible = !!JSON.parse(selectedContent.getAttribute('aria-hidden'));
        // Toggle currently active content if only one section should be open
        if (!this.settings.openMultiple) {
            // Avoid toggling the current content before doing so below
            if (typeof this.activeSections[0] !== 'undefined' && this.activeSections[0] !== sectionIndex) {
                var previousContent = this.contentAreas[this.activeSections[0]];
                this.slideContent(previousContent, true);
                this.toggleTabbingForChildElements(previousContent, false);
            }
        }
        // Toggle content if its aria-hidden attr has been set, otherwise initially hide it
        if (selectedContent.hasAttribute('aria-hidden')) {
            this.slideContent(selectedContent, !visible);
            this.toggleTabbingForChildElements(selectedContent, visible);
        }
        else {
            this.toggleTabbingForChildElements(selectedContent, false);
            selectedContent.setAttribute('aria-hidden', 'true');
        }
    };
    default_1.prototype.slideContent = function (content, hidden) {
        // Inline height style to trigger transition
        if (this.settings.shouldAnimate && !this.displayingAsTabs) {
            // If we're hiding the content set the height in the next frame to trigger slide up transition
            if (hidden) {
                content.style.height = content.scrollHeight + "px";
                setTimeout(function () {
                    content.style.height = "0px";
                    content.setAttribute("aria-hidden", "true");
                }, 50);
            }
            else {
                content.style.height = content.scrollHeight + "px";
                content.setAttribute("aria-hidden", "false");
            }
        }
        else {
            content.setAttribute("aria-hidden", "" + hidden);
        }
    };
    default_1.prototype.toggleTabbingForChildElements = function (el, enabled) {
        var tabbableChildren = el.querySelectorAll('a, input, button, textarea, select, object, area');
        for (var i = 0; i < tabbableChildren.length; i++) {
            tabbableChildren[i].setAttribute('tabindex', enabled ? '0' : '-1');
        }
    };
    /**
     * Convert from tabs to accordions
     */
    default_1.prototype.convertToAccordions = function () {
        var newSections = [];
        for (var i = 0; i < this.labels.length; i++) {
            var label = this.labels[i];
            var content = document.getElementById(label.getAttribute('aria-controls'));
            var section = document.createElement('DIV');
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
        for (var i = 0; i < newSections.length; i++) {
            this.element.appendChild(newSections[i]);
        }
        this.displayingAsTabs = false;
    };
    default_1.prototype.convertToTabs = function () {
        var tabList = document.createElement('DIV');
        var tabPanels = document.createElement('DIV');
        tabList.className = 'silc-accordion__tablist';
        tabList.setAttribute('role', 'tablist');
        tabPanels.className = 'silc-accordion__tabpanels';
        for (var i = 0; i < this.labels.length; i++) {
            // Prevent child accordions from being affected
            if (this.labels[i].closest('.silc-accordion') === this.element) {
                var label = this.labels[i];
                var content = document.getElementById(label.getAttribute('aria-controls'));
                label.setAttribute('role', 'tab');
                label.setAttribute('aria-selected', label.getAttribute('aria-expanded'));
                label.removeAttribute('aria-expanded');
                content.setAttribute('role', 'tabpanel');
                tabList.appendChild(label);
                tabPanels.appendChild(content);
            }
        }
        this.element.innerHTML = '';
        this.element.appendChild(tabList);
        this.element.appendChild(tabPanels);
        this.displayingAsTabs = true;
    };
    return default_1;
}());
exports["default"] = default_1;
