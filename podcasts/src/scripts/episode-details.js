import { LitElement, html, css } from "lit"
import moment from 'moment'

import ApiRequest from '../../../utils/api.js'

export class EpisodeDetails extends LitElement {
    static properties = {
        _data: { type: Object, state: true },
        _audioIFrame: { type: String, state: true },
        listenLink: { type: String },
        _episodePage: { type: String, state: true },
        podcastId: { type: String },
        episodeId: { type: String },
    }

    static styles = css`
        section {
            font-family: 'Josefin Sans', sans-serif;
            font-weight: 200;
            font-size: 20px;
            line-height: 22px;
            color: #383838;
        }
        .episode__image {
            width: 100%;
            height: auto;
        }
        a {
            text-decoration: none;
            color: #f26522;
        }
        a:hover {
            color: rgb(58, 113, 104);
        } 
        p {
            margin-bottom: 1.3em;
        }
        li {
            padding: 0;
            margin-bottom: 1em;
        }
        iframe {
            height: 200px;
            width: 100%;
        }
        .podcast__title {
            font-size: 60px;
            line-height: 1.4em;
            color: #f26522;
            font-weight: normal;
            text-align: center;
        }
    `

    async getData() {
        let response = new ApiRequest(`https://api-dev.wusf.digital/simplecast/podcast/episodes?id=${this.podcastId}`)
        response = await response.get()
        this._audioIframe = `https://player.simplecast.com/${this.episodeId}?dark=false`

        // Get episode-specific data
        if (this.episodeId) {
            let episodeResponse = new ApiRequest(`https://api-dev.wusf.digital/simplecast/episode?id=${this.episodeId}`)
            episodeResponse = await episodeResponse.get()
            this._data = episodeResponse
        }
    }

    willUpdate(changed) {
        // Forces the component to update when parent elements want to display more podcast episodes
        if (changed.has('episodeId')) {
            this.getData()
            window.scrollTo(0,0)
        }
    }

    constructor() {
        super()
        this._data = {}
        this._episodePage = ''
        this._audioIframe = ''
        this.podcastId = ''
        this.episodeId = ''
    }

    render() {
        return Object.keys(this._data).length > 0 ? 
        html`
            <section>
                <img 
                    src=${this._data.episodeImageUrl ?? this._data.podcastImageUrl}
                    class="episode__image"
                    alt="The Zest Podcast Logo"
                >
                <h1 class="podcast__title">
                    ${this._data.title}
                </h1>
                <iframe data-tf-not-load="1" frameborder="no" scrolling="no" seamless="" .src=${this._audioIframe}></iframe>
                <p><strong>${moment(this._data.publishedDate).format('MMMM D, YYYY')}</strong></p>
                <p .innerHTML=${this._data.descriptionLong}></p>
            </section>
        ` : html``
    }
}

customElements.define('episode-details', EpisodeDetails)