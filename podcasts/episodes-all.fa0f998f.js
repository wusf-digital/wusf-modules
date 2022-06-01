var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},s={},i=e.parcelRequirebbd5;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in s){var i=s[e];delete s[e];var o={id:e,exports:{}};return t[e]=o,i.call(o.exports,o,o.exports),o.exports}var d=new Error("Cannot find module '"+e+"'");throw d.code="MODULE_NOT_FOUND",d}).register=function(e,t){s[e]=t},e.parcelRequirebbd5=i);var o=i("dpiPf");i("iYIAi");o=i("dpiPf");
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var d=i("csfWV");class n extends o.LitElement{static properties={podcastsDisplayed:{type:Number},podcastId:{type:String},_numberOfPages:{type:Number,state:!0},_numberOfEpisodes:{type:Number,state:!0}};static styles=o.css`
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
    `;async firstUpdated(){let e=new d.default("https://api-dev.wusf.digital/simplecast/podcasts");e=await e.get();const[t]=e.filter((e=>e.id===this.podcastId)).map((e=>e.count));this._numberOfEpisodes=t}constructor(){super(),this.podcastsDisplayed=0,this.podcastId=""}_clickHandler(e){let t;1===e&&(t=0),2===e&&(t=30),3===e&&(t=60),4===e&&(t=90),this.dispatchEvent(new CustomEvent("offset",{detail:t,bubbles:!0,composed:!0}))}render(){return o.html`
            <ol>
                ${function*(e,t){if(void 0!==e){let s=0;for(const i of e)yield t(i,s++)}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */(function*(e,t,s=1){const i=void 0===t?0:e;null!=t||(t=e);for(let e=i;s>0?e<t:t<e;e+=s)yield e}(4),(e=>o.html`<li @click=${()=>this._clickHandler(e+1)}></li>`))}
            </ol>
        `}}customElements.define("episode-switcher",n);class l extends o.LitElement{static properties={limit:{type:Number},offset:{type:Number},podcastId:{type:String},display:{type:Boolean}};constructor(){super(),this.limit=30,this.offset=0,this.podcastId="",this.display=!0}render(){return o.html`
            <podcast-episodes
                podcastId=${this.podcastId}
                number=${this.limit} 
                offset=${this.offset}
                @offset=${e=>this.offset=e.detail}
                title="Episodes"
                @toggleEpisodeSwitcher=${()=>this.display=!this.display}
            >
                <episode-switcher 
                    ?hidden=${!this.display}
                    podcastId=${this.podcastId}
                    podcastsDisplayed=${this.limit-this.offset}
                >
                </episode-switcher>
            </podcast-episodes>
        `}}customElements.define("episodes-all",l);