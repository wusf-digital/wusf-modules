import { LitElement, html, css } from 'lit'
import moment from 'moment'

import ApiRequest from '../../../utils/api.js'
import './episode-details.js'

export class PodcastEpisodes extends LitElement {
    static properties = {
        _data: { type: Array, state: true },
        number: { type: Number },
        offset: { type: Number },
        podcastId: { type: String },
        _podcastArtwork: { type: String, state: true },
        title: { type: String },
        _episodeId: { type: String, state: true },
        _episodeDetailsHidden: { type: Boolean, state: true },
        _episodesHidden: { type: Boolean, state: true }
    }

    static styles = css`
        .episodes {
            font-family: 'Josefin Sans', sans-serif;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
            padding: 10px;
            background-color: #D4F4ED;
            border-top: 2px solid #3A7168;
            padding-block: 2em;
        }
        a {
            text-decoration: none;
            color: #f26522;
        }
        a:hover {
            color: rgb(58, 113, 104);
        }
        h1 {
            flex-basis: 100%;
            font-size: 50px;
            font-weight: 700;
            color: #3A7168;
            margin: 0;
        }
        article.card {
            flex: 1;
            border-radius: 5px;
            background-color: white;
            display: flex;
            flex-direction: column;
            max-width: calc(33% - 20px);
        }
        article.card {
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
        }
        article.card:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }
        img.card__image {
            height: 350px;
            border-start-start-radius: 5px;
            border-start-end-radius: 5px;
        }
        .card__container {
            padding: 15px;
        }
        .card__container--title {
            cursor: pointer;
            font-weight: 400;
            color: #F26522;
            font-size: 25px;
        }
        p.card__container--date {
            font-weight: 300;
            font-size: 1.1rem;
            color: #383838;
            text-align: center;
        }
        [hidden] {
            display: none !important;
        }
    `

    async getData() {
        let response = new ApiRequest(`https://api-dev.wusf.digital/simplecast/podcast/episodes?id=${this.podcastId}&limit=${this.number}&offset=${this.offset}`)
        response = await response.get()  
        this._data = response.slice(0, this.number)
    }

    async firstUpdated() {
        // Get show artwork
        let response = new ApiRequest(`https://api-dev.wusf.digital/simplecast/podcasts`)
        response = await response.get()
        const [ podcastArtwork ] = response.filter(podcast => podcast.id === this.podcastId).map(podcast => podcast.imageUrl)
        this._podcastArtwork = podcastArtwork
    }

    willUpdate(changed) {
        // Forces the component to update when parent elements want to display more podcast episodes
        if (changed.has('offset')) this.getData()
    }

    connectedCallback() {
        super.connectedCallback()
        addEventListener('popstate', _ => {
            this._episodesHidden = !this._episodesHidden
            this._episodeDetailsHidden = !this._episodeDetailsHidden
        })
    }

    constructor() {
        super()
        this._data = []
        this.number = 0
        this.offset = 0
        this.podcastId = ''
        this.title = ''
        this._episodeId = ''
        this._episodeDetailsHidden = true
        this._episodesHidden = false
    }

    render() {
        return this._data.length > 0 ?
        html`
            <section ?hidden=${this._episodesHidden} class="episodes">
                <h1>${this.title}</h1>
                ${this._data.map(podcast => {
                    return html`
                        <article class="card">
                            <img class="card__image" src=${podcast.episodeImageUrl ?? this._podcastArtwork} alt={podcast.title}>
                            <section class="card__container">
                                <a class="card__container--title" @click=${() => this.showEpisodeDetails(podcast.id)}>${podcast.title}</a>
                                <p class="card__container--date">${moment(podcast.publishedDate).format('MMMM D, YYYY')}</p>
                            </section>
                        </article>
                    `
                })}    
            </section>
            <slot></slot>
            <episode-details podcastId=${this.podcastId} episodeId=${this._episodeId} ?hidden=${this._episodeDetailsHidden}></episode-details>
        ` : html``
    }

    showEpisodeDetails(id) {
        this._episodeId = id
        this._episodesHidden = !this._episodesHidden
        this._episodeDetailsHidden = !this._episodeDetailsHidden
        const url = new URL(window.location);
        url.searchParams.set('episodeId', this._episodeId);
        history.pushState(null, null, url)
        this.dispatchEvent(new CustomEvent('detailsPaneLoading', { bubbles: true, composed: true }))
    }
}

customElements.define('podcast-episodes', PodcastEpisodes)