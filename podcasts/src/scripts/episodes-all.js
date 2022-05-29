import { LitElement, html } from 'lit'

import './podcast-episodes.js'
import './episode-switcher.js'

export class EpisodesAll extends LitElement {
    static properties = {
        limit: { type: Number },
        offset: { type: Number },
        podcastId: { type: String },
        display: { type: Boolean }
    }

    constructor() {
        super()
        this.limit = 30
        this.offset = 0
        this.podcastId = ''
        this.display = true
    }

    render() {
        return html`
            <podcast-episodes
            podcastId=${this.podcastId}
            number=${this.limit} 
            offset=${this.offset}
            @offset=${(e) => this.offset = e.detail}
            title="Episodes"
            @toggleEpisodeSwitcher=${() => this.display = !this.display}>
                <episode-switcher ?hidden=${!this.display}></episode-switcher>
            </podcast-episodes>
        `
    }
}

customElements.define('episodes-all', EpisodesAll)