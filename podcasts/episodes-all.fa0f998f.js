var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},s=e.parcelRequirebbd5;null==s&&((s=function(e){if(e in t)return t[e].exports;if(e in i){var s=i[e];delete i[e];var o={id:e,exports:{}};return t[e]=o,s.call(o.exports,o,o.exports),o.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){i[e]=t},e.parcelRequirebbd5=s);var o=s("dpiPf");s("iYIAi");o=s("dpiPf");
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class n extends o.LitElement{static styles=o.css`
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
    `;_clickHandler(e){let t;1===e&&(t=0),2===e&&(t=30),3===e&&(t=60),4===e&&(t=90),this.dispatchEvent(new CustomEvent("offset",{detail:t,bubbles:!0,composed:!0}))}render(){return o.html`
            <ol>
                ${function*(e,t){if(void 0!==e){let i=0;for(const s of e)yield t(s,i++)}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */(function*(e,t,i=1){const s=void 0===t?0:e;null!=t||(t=e);for(let e=s;i>0?e<t:t<e;e+=i)yield e}(4),(e=>o.html`<li @click=${()=>this._clickHandler(e+1)}></li>`))}
            </ol>
        `}}customElements.define("episode-switcher",n);class l extends o.LitElement{static properties={limit:{type:Number},offset:{type:Number},podcastId:{type:String},display:{type:Boolean}};constructor(){super(),this.limit=30,this.offset=0,this.podcastId="",this.display=!0}render(){return o.html`
            <podcast-episodes
            podcastId=${this.podcastId}
            number=${this.limit} 
            offset=${this.offset}
            @offset=${e=>this.offset=e.detail}
            title="Episodes"
            @toggleEpisodeSwitcher=${()=>this.display=!this.display}>
                <episode-switcher ?hidden=${!this.display}></episode-switcher>
            </podcast-episodes>
        `}}customElements.define("episodes-all",l);