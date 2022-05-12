import { LitElement, html, css } from 'lit';
import moment from 'moment';

export class ZestEpisodes extends LitElement {
    static properties = {
        _data: { type: Array, state: true },
        number: { type: Number },
        title: { type: String }
    }

    static styles = css`
        main {
            font-family: 'Josefin Sans', sans-serif;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
            padding: 10px;
            background-color: #D4F4ED;
            border-top: 2px solid #3A7168;
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
        section.card__container {
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

    async firstUpdated() {
        let response = await fetch(`https://api-dev.wusf.digital/simplecast/podcast/episodes?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0&limit=${this.number}`)
        response = await response.json()
        //this._data = response.slice(0, 6)
        this._data = response
    }

    constructor() {
        super()
        this._data = []
        this.number = 0
        this.title = ''
    }

    render() {
        return this._data.length > 0 ?
        html`
            <main>
                <h1>${this.title}</h1>
                ${this._data.map(podcast => {
                    return html`
                        <article class="card">
                            <img class="card__image" src=${podcast.episodeImageUrl ?? "https://image.simplecastcdn.com/images/be36e542-b186-4b9b-a6bb-6896fd6492ae/9404af68-88bf-4ca3-a523-a5ec59058405/the-zest-logo.jpg"}>
                            <section class="card__container">
                                <p class="card__container--title">${podcast.title}</p>
                                <p class="card__container--date">${moment(podcast.publishedDate).format('MMMM D, YYYY')}</p>
                            </section>
                        </article>
                    `
                })}
            </main>
        ` : html``
    }
}

customElements.define('zest-episodes', ZestEpisodes)