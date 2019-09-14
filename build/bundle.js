!function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),i(1),i(2);var n=i(3),s=i(5);n.silcCoreInit(),s.silcAccordionInit()},function(t,e,i){},function(t,e,i){},function(t,e,i){"use strict";e.__esModule=!0;var n=i(4);e.SilcCore=n.default,e.silcCoreInit=function(){new n.default}},function(t,e,i){"use strict";e.__esModule=!0;var n=function(){document.body.classList.add("js")};e.default=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(6);e.SilcAccordion=n.default,e.silcAccordionInit=function(){var t=document.querySelectorAll(".silc-accordion:not(.silc-accordion--initialized)");if(t.length>0)for(var e=0;e<t.length;e++)new n.default(t[e])}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(7),s=(i(9),function(){function t(t){this.labels=[],this.contentAreas=[],this.sections=[],this.activeSections=[],this.displayingAsTabs=!1,t&&(this.element=t,this.sections=this.getChildNodesByClassName("silc-accordion__section"),this.labels=this.getChildNodesByClassName("silc-accordion__label"),this.contentAreas=this.getChildNodesByClassName("silc-accordion__content"),this.settings=this.applySettings(),this.initiallyHideSections(),this.sections.length&&(this.labelEventListener(),this.addAttributesToLabels(),this.settings.openFirst&&this.openFirstSection(),this.settings.tabs&&(this.settings.becomeTabsBreakpoint?this.becomeTabsResizeListener():(this.convertToTabs(),this.openFirstSection())),this.settings.shouldAnimate&&this.contentTransitionListener(),this.element.classList.add("silc-accordion--initialized")))}return t.prototype.getChildNodesByClassName=function(t){for(var e=this.element.querySelectorAll("."+t),i=[],n=0;n<e.length;n++)e[n].closest(".silc-accordion")===this.element&&i.push(e[n]);return i},t.prototype.updateActiveSections=function(t){if(t){var e=parseInt(t.getAttribute("data-index"));this.displayingAsTabs||this.settings.tabs&&!this.settings.becomeTabsBreakpoint||this.toggleSection(e),this.toggleLabel(e),this.toggleContent(e);var i=this.activeSections.indexOf(e);this.settings.openMultiple||(this.activeSections=[]),-1!==i?delete this.activeSections[this.activeSections.indexOf(i)]:this.activeSections.push(e)}},t.prototype.addAttributesToLabels=function(){for(var t=0;t<this.sections.length;t++){var e=this.sections[t].querySelector(".silc-accordion__label");e.setAttribute("data-index",String(t)),e.setAttribute("type","button")}},t.prototype.applySettings=function(){var t={tabs:this.element.classList.contains("silc-accordion--become-tabs")||this.element.classList.contains("silc-accordion--tabs"),openMultiple:this.element.hasAttribute("data-silc-accordion-open-multiple"),openFirst:this.element.hasAttribute("data-silc-accordion-open-first"),shouldAnimate:this.element.hasAttribute("data-silc-accordion-animated")};if(this.element.classList.contains("silc-accordion--become-tabs")){var e=window.getComputedStyle(this.element,":before").content;t.becomeTabsBreakpoint=parseInt(e.replace(/"*/g,""))}return t},t.prototype.initiallyHideSections=function(){for(var t=0;t<this.sections.length;t++)this.toggleLabel(t),this.toggleContent(t)},t.prototype.openFirstSection=function(){var t=this.element.querySelector(".silc-accordion__label");this.updateActiveSections(t)},t.prototype.labelEventListener=function(){var t=this;this.element.addEventListener("click",(function(e){var i=e.target;i.closest(".silc-accordion")===t.element&&i.classList.contains("silc-accordion__label")&&(i.hasAttribute("aria-disabled")||t.updateActiveSections(i))}))},t.prototype.contentTransitionListener=function(){this.element.addEventListener("transitionend",(function(t){var e=t.target;e.classList.contains("silc-accordion__content")&&"height"===t.propertyName&&(e.style.height=null,e.classList.remove("transitioning"))}))},t.prototype.becomeTabsResizeListener=function(){var t=this,e=function(){window.innerWidth>=t.settings.becomeTabsBreakpoint?t.displayingAsTabs||(t.convertToTabs(),t.activeSections.length||t.openFirstSection()):t.displayingAsTabs&&t.convertToAccordions()};window.addEventListener("resize",n(e,100)),e()},t.prototype.toggleSection=function(t){this.settings.openMultiple||void 0!==this.activeSections[0]&&this.activeSections[0]!==t&&this.sections[this.activeSections[0]].classList.remove("silc-accordion__section--active"),this.sections[t].classList.toggle("silc-accordion__section--active")},t.prototype.toggleLabel=function(t){var e=this.labels[t],i=this.displayingAsTabs?"aria-selected":"aria-expanded",n=!!JSON.parse(e.getAttribute(i));this.settings.openMultiple||void 0!==this.activeSections[0]&&this.activeSections[0]!==t&&(this.labels[this.activeSections[0]].setAttribute(i,"false"),this.labels[this.activeSections[0]].removeAttribute("aria-disabled")),this.displayingAsTabs&&e.setAttribute("aria-disabled","true"),e.hasAttribute(i)?e.setAttribute(i,String(!n)):e.setAttribute(i,"false")},t.prototype.toggleContent=function(t){var e=this.contentAreas[t],i=!!JSON.parse(e.getAttribute("aria-hidden"));if(!this.settings.openMultiple&&void 0!==this.activeSections[0]&&this.activeSections[0]!==t){var n=this.contentAreas[this.activeSections[0]];this.slideContent(n,!0),this.toggleTabbingForChildElements(n,!1)}e.hasAttribute("aria-hidden")?(this.slideContent(e,!i),this.toggleTabbingForChildElements(e,i)):(this.toggleTabbingForChildElements(e,!1),e.setAttribute("aria-hidden","true"))},t.prototype.slideContent=function(t,e){this.settings.shouldAnimate&&!this.displayingAsTabs?e?(t.style.height=t.scrollHeight+"px",setTimeout((function(){t.style.height="0px",t.setAttribute("aria-hidden","true")}),50)):(t.style.height=t.scrollHeight+"px",t.setAttribute("aria-hidden","false")):t.setAttribute("aria-hidden",""+e)},t.prototype.toggleTabbingForChildElements=function(t,e){for(var i=t.querySelectorAll("a, input, button, textarea, select, object, area"),n=0;n<i.length;n++)i[n].setAttribute("tabindex",e?"0":"-1")},t.prototype.convertToAccordions=function(){for(var t=[],e=0;e<this.labels.length;e++){var i=this.labels[e],n=document.getElementById(i.getAttribute("aria-controls")),s=document.createElement("DIV");i.setAttribute("role","button"),i.setAttribute("aria-expanded",i.getAttribute("aria-selected")),i.removeAttribute("aria-selected"),i.removeAttribute("aria-disabled"),n.removeAttribute("role"),s.className="silc-accordion__section",s.appendChild(i),s.appendChild(n),-1!==this.activeSections.indexOf(e)&&s.classList.add("silc-accordion__section--active"),t.push(s)}this.element.innerHTML="";for(e=0;e<t.length;e++)this.element.appendChild(t[e]);this.displayingAsTabs=!1},t.prototype.convertToTabs=function(){var t=document.createElement("DIV"),e=document.createElement("DIV");t.className="silc-accordion__tablist",t.setAttribute("role","tablist"),e.className="silc-accordion__tabpanels";for(var i=0;i<this.labels.length;i++)if(this.labels[i].closest(".silc-accordion")===this.element){var n=this.labels[i],s=document.getElementById(n.getAttribute("aria-controls"));n.setAttribute("role","tab"),n.setAttribute("aria-selected",n.getAttribute("aria-expanded")),n.removeAttribute("aria-expanded"),s.setAttribute("role","tabpanel"),t.appendChild(n),e.appendChild(s)}this.element.innerHTML="",this.element.appendChild(t),this.element.appendChild(e),this.displayingAsTabs=!0},t}());e.default=s},function(t,e,i){(function(e){var i="Expected a function",n=NaN,s="[object Symbol]",o=/^\s+|\s+$/g,r=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,c=/^0o[0-7]+$/i,l=parseInt,u="object"==typeof e&&e&&e.Object===Object&&e,d="object"==typeof self&&self&&self.Object===Object&&self,h=u||d||Function("return this")(),p=Object.prototype.toString,f=Math.max,b=Math.min,v=function(){return h.Date.now()};function g(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function m(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&p.call(t)==s}(t))return n;if(g(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=g(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(o,"");var i=a.test(t);return i||c.test(t)?l(t.slice(2),i?2:8):r.test(t)?n:+t}t.exports=function(t,e,n){var s,o,r,a,c,l,u=0,d=!1,h=!1,p=!0;if("function"!=typeof t)throw new TypeError(i);function y(e){var i=s,n=o;return s=o=void 0,u=e,a=t.apply(n,i)}function A(t){var i=t-l;return void 0===l||i>=e||i<0||h&&t-u>=r}function S(){var t=v();if(A(t))return T(t);c=setTimeout(S,function(t){var i=e-(t-l);return h?b(i,r-(t-u)):i}(t))}function T(t){return c=void 0,p&&s?y(t):(s=o=void 0,a)}function _(){var t=v(),i=A(t);if(s=arguments,o=this,l=t,i){if(void 0===c)return function(t){return u=t,c=setTimeout(S,e),d?y(t):a}(l);if(h)return c=setTimeout(S,e),y(l)}return void 0===c&&(c=setTimeout(S,e)),a}return e=m(e)||0,g(n)&&(d=!!n.leading,r=(h="maxWait"in n)?f(m(n.maxWait)||0,e):r,p="trailing"in n?!!n.trailing:p),_.cancel=function(){void 0!==c&&clearTimeout(c),u=0,s=l=o=c=void 0},_.flush=function(){return void 0===c?a:T(v())},_}}).call(this,i(8))},function(t,e){var i;i=function(){return this}();try{i=i||new Function("return this")()}catch(t){"object"==typeof window&&(i=window)}t.exports=i},function(t,e){var i;"function"!=typeof(i=window.Element.prototype).matches&&(i.matches=i.msMatchesSelector||i.mozMatchesSelector||i.webkitMatchesSelector||function(t){for(var e=(this.document||this.ownerDocument).querySelectorAll(t),i=0;e[i]&&e[i]!==this;)++i;return Boolean(e[i])}),"function"!=typeof i.closest&&(i.closest=function(t){for(var e=this;e&&1===e.nodeType;){if(e.matches(t))return e;e=e.parentNode}return null})}]);