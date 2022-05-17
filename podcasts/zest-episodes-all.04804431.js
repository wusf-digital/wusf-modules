var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},o=e.parcelRequirebbd5;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in i){var o=i[e];delete i[e];var s={id:e,exports:{}};return t[e]=s,o.call(s.exports,s,s.exports),s.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){i[e]=t},e.parcelRequirebbd5=o);var s=o("dpiPf");
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */o("iYIAi");class n extends s.LitElement{static properties={limit:{type:Number},offset:{type:Number}};static styles=s.css`
        ol {
            display: flex;
            justify-content: center;
            gap: 20px;
            font-family: 'Open Sans', sans-serif;
            font-size: 1.4rem;
            font-weight: 300;
            list-style: none;
            counter-reset: episode-counter;
            padding: 0;
        }
        ol li {
            display: inline;
            counter-increment: episode-counter;
            color: #F26522;
            cursor: pointer;
        }
        ol li::before {
            content: counter(episode-counter);
            counter-reset: item;
        }  
    `;constructor(){super(),this.limit=31,this.offset=0}_clickHandler(e){1===e&&(this.offset=0),2===e&&(this.offset=31),3===e&&(this.offset=62),4===e&&(this.offset=93)}render(){return s.html`
            <podcast-episodes number=${this.limit} offset=${this.offset} title="Episodes"></podcast-episodes>
            <ol>
                ${
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function*(e,t){if(void 0!==e){let i=0;for(const o of e)yield t(o,i++)}}(function*(e,t,i=1){const o=void 0===t?0:e;null!=t||(t=e);for(let e=o;i>0?e<t:t<e;e+=i)yield e}(4),(e=>s.html`<li @click=${()=>this._clickHandler(e+1)}></li>`))}
            </ol>
        `}}customElements.define("zest-episodes-all",n);