import { LitElement, html, css } from 'lit';
import { range } from 'lit/directives/range.js';
import { map } from 'lit/directives/map.js';

import './podcast-episodes.js'

export class ZestEpisodesAll extends LitElement {
    static properties = {
        limit: { type: Number },
        offset: { type: Number }
    }

    static styles = css`
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
    `

    constructor() {
        super()
        this.limit = 31
        this.offset = 0
    }

    _clickHandler(num) {
        if (num === 1) { this.offset = 0 }
        if (num === 2) { this.offset = 31 }
        if (num === 3) { this.offset = 62 }
        if (num === 4) { this.offset = 93 }
    }

    render() {
        return html`
            <podcast-episodes number=${this.limit} offset=${this.offset} title="Episodes"></podcast-episodes>
            <ol>
                ${map(range(4), num => html`<li @click=${() => this._clickHandler(num + 1)}></li>`)}
            </ol>
        `
    }
}

customElements.define('zest-episodes-all', ZestEpisodesAll)