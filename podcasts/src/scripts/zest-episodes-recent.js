import { LitElement, html } from 'lit'

import './podcast-episodes.js'

export class ZestEpisodesRecent extends LitElement {
    render() {
        return html`
            <podcast-episodes 
                number="6" 
                title="Recent Episodes" 
                podcastId="cdfdaf53-a865-42d5-9203-dfb29dda73f0"
            >
            </podcast-episodes>
        `
    }
}

customElements.define('zest-episodes-recent', ZestEpisodesRecent)