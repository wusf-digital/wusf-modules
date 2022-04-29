import { LitElement, html, css } from 'lit';
import moment from 'moment';

export class WusfPodcasts extends LitElement {
    static properties = {
        data: { type: Array, state: true }
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
        let response = await fetch('https://api-dev.wusf.digital/simplecast/podcast/episodes?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0')
        response = await response.json()
        this.data = response.slice(0, 6)
    }

    constructor() {
        super()
        this.data = []
    }

    render() {
        return html`
            <main>
                <h1>Latest Episodes</h1>
                ${this.data.map(podcast => {
                    return html`
                        <article class="card">
                            <img class="card__image" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png">
                            <section class="card__container">
                                <p class="card__container--title">${podcast.title}</p>
                                <p class="card__container--date">${moment(podcast.publishedDate).format('MMMM D, YYYY')}</p>
                            </section>
                        </article>
                    `
                })}
            </main>
        `
    }
}

customElements.define('wusf-podcasts', WusfPodcasts)