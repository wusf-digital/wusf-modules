import { LitElement, html } from 'lit'

import './podcast-episodes.js'

export class ZestEpisodesRecent extends LitElement {
    render() {
        return html`
            <podcast-episodes number="7" title="Recent Episodes"></podcast-episodes>
        `
    }
}

customElements.define('zest-episodes-recent', ZestEpisodesRecent)