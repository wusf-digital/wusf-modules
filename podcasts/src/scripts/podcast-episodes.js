import { LitElement, html } from 'lit'
import moment from 'moment'

import { podcastEpisodesStyles } from '../styles/podcast-episodes-styles.js'
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
        _sectionEpisodes: { type: String, state: true }
    }

    static styles = [ podcastEpisodesStyles ]

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
            const episodeDetailsExists = !!this.renderRoot.querySelector('episode-details')
            const sectionEpisodesExists = !!this.renderRoot.querySelector('section.episodes')

            // Handles going back to showing all section episodes
            if (episodeDetailsExists) this._showEpisodes()
            
            // Handles going forward to showing the episode details
            if (sectionEpisodesExists) this._showEpisodeDetails()
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
        this._sectionEpisodes = ''
    }

    render() {
        return this._data.length > 0 ?
        html`
            <main>
                <section class="episodes">
                    <h1>${this.title}</h1>
                    ${this._data.map(podcast => {
                        return html`
                            <article class="card">
                                <img class="card__image" src=${podcast.episodeImageUrl ?? this._podcastArtwork} alt={podcast.title}>
                                <section class="card__container">
                                    <a class="card__container--title" @click=${() => this._handleRouting(podcast.id)}>${podcast.title}</a>
                                    <p class="card__container--date">${moment(podcast.publishedDate).format('MMMM D, YYYY')}</p>
                                </section>
                            </article>
                        `
                    })}    
                </section>
                <slot></slot>
            </main>
        ` : html``
    }

    _handleRouting(id) {
        this._episodeId = id
        const url = new URL(window.location)
        url.searchParams.set('episodeId', this._episodeId)
        history.pushState(null, null, url)
        this._showEpisodeDetails()
    }

    _showEpisodeDetails() {
        this.dispatchEvent(new CustomEvent('toggleEpisodeSwitcher', { bubbles: true, composed: true }))

        this._sectionEpisodes = this.renderRoot.querySelector('section.episodes')
        this._sectionEpisodes.remove()

        const episodeDetails = document.createElement('episode-details')
        episodeDetails.setAttribute('podcastId', this.podcastId)
        episodeDetails.setAttribute('episodeId', this._episodeId)
        this.renderRoot.appendChild(episodeDetails)
    }

    _showEpisodes() {
        this.dispatchEvent(new CustomEvent('toggleEpisodeSwitcher', { bubbles: true, composed: true }))
        this.renderRoot.querySelector('episode-details').remove()
        const main = this.renderRoot.querySelector('main')
        main.insertAdjacentElement('afterbegin', this._sectionEpisodes)
    }
}

customElements.define('podcast-episodes', PodcastEpisodes)