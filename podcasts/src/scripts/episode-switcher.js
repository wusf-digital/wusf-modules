import { LitElement, html, css } from "lit";
import { map } from 'lit/directives/map.js'
import { range } from 'lit/directives/range.js'

export class EpisodeSwitcher extends LitElement {
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

    _clickHandler(num) {
        let offset
        if (num === 1) { offset = 0 }
        if (num === 2) { offset = 30 }
        if (num === 3) { offset = 60 }
        if (num === 4) { offset = 90 }

        this.dispatchEvent(new CustomEvent('offset', { 
            detail: offset, 
            bubbles: true, 
            composed: true 
        }))
    }

    render() {
        return html`
            <ol>
                ${map(range(4), num => html`<li @click=${() => this._clickHandler(num + 1)}></li>`)}
            </ol>
        `
    }
}

customElements.define('episode-switcher', EpisodeSwitcher)