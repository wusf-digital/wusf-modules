import { LitElement, html, css } from 'lit'
import moment from 'moment'
import ApiRequest from '../../../utils/api.js'

export class PodcastEpisodes extends LitElement {
    static properties = {
        _data: { type: Array, state: true },
        number: { type: Number },
        offset: { type: Number },
        title: { type: String }
    }

    static styles = css`
        section.episodes {
            font-family: 'Josefin Sans', sans-serif;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
            padding: 10px;
            background-color: #D4F4ED;
            border-top: 2px solid #3A7168;
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
        }
        article.card {
            flex: 1;
            border-radius: 5px;
            background-color: white;
            display: flex;
            flex-direction: column;
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
        p.card__container--title {
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
    `

    async getData() {
        let response = new ApiRequest(`https://api-dev.wusf.digital/simplecast/podcast/episodes?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0&limit=${this.number}&offset=${this.offset}`)
        response = await response.get()

        // Display the next multiple of 3 episodes
        // (e.g. if 20 episodes are requested, we will load 21 episodes)
        if (response.length % 3 !== 0) {
            this.number = Math.ceil(response.length / 3) * 3
        }
        
        this._data = response.slice(0, this.number)
    }

    updated(changed) {
        if (changed.has('offset')) {
            this.getData()
            window.scrollTo(0,0)
        }
    }

    constructor() {
        super()
        this._data = []
        this.number = 0
        this.offset = 0
        this.title = ''
    }

    render() {
        return this._data.length > 0 ?
        html`
            <section class="episodes">
                <h1>${this.title}</h1>
                ${this._data.map(podcast => {
                    return html`
                        <article class="card">
                            <img class="card__image" src=${podcast.episodeImageUrl ?? "https://image.simplecastcdn.com/images/be36e542-b186-4b9b-a6bb-6896fd6492ae/9404af68-88bf-4ca3-a523-a5ec59058405/the-zest-logo.jpg"}>
                            <section class="card__container">
                                <p class="card__container--title">
                                    <a .href="https://thezestpodcast.com/${podcast.slug}" rel="noreferrer noopener">
                                        ${podcast.title}
                                    </a>
                                </p>
                                <p class="card__container--date">${moment(podcast.publishedDate).format('MMMM D, YYYY')}</p>
                            </section>
                        </article>
                    `
                })}
            </section>
        ` : html``
    }
}

customElements.define('podcast-episodes', PodcastEpisodes)