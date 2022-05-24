import { LitElement, html, css } from "lit"

import ApiRequest from '../../../utils/api.js'

export class ZestFrontPageLatest extends LitElement {
    static properties = {
        _data: { type: Object, state: true },
        _episodePage: { type: String, state: true },
        podcastId: { type: String }
    }

    static styles = css`
        section {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: 'Josefin Sans', sans-serif;
            font-weight: 200;
            font-size: 20px;
            line-height: 22px;
            color: #383838;
        }
        a {
            text-decoration: none;
            color: #f26522;
        }
        a:hover {
            color: rgb(58, 113, 104);
        }
        .episode__title {
            font-size: 50px;
            line-height: 1.4em;
            color: #f26522;
            font-weight: bold;
            text-align: center;
        }
        .episode__image {
            max-width: 640px;
            max-height: 480px;
        }
    `

    async firstUpdated() {
        if (this.podcastId) {
            // Get slugs and episode IDs from the podcast
            let response = new ApiRequest(`https://api-dev.wusf.digital/simplecast/podcast/episodes?id=${this.podcastId}`)
            response = await response.get()
            const episodeId = response[0].id
            const slug = response[0].slug
            this._episodePage = `https://thezestpodcast.com/${slug}`

            // Get episode-specific data
            let episodeResponse = new ApiRequest(`https://api-dev.wusf.digital/simplecast/episode?id=${episodeId}`)
            episodeResponse = await episodeResponse.get()
            this._data = episodeResponse
        }
        
    }

    constructor() {
        super()
        this._data = {}
        this._episodePage = ''
        this.podcastId = ''
    }

    render() {
        return Object.keys(this._data).length > 0 ? 
        html`
            <section>
                <h1 class="episode__title">
                    <a .href=${this._episodePage} rel="noreferrer noopener">${this._data.title}</a>
                </h1>
                <img
                    class="episode__image" 
                    src=${this._data.episodeImageUrl ?? this._data.podcastImageUrl}
                    alt="Episode Image">
            </section>
        ` : html``
    }
}

customElements.define('zest-frontpage-latest', ZestFrontPageLatest)