import { LitElement, html, css } from "lit"
import moment from 'moment'

export class ZestFrontPageLatest extends LitElement {
    static properties = {
        _data: { type: Object, state: true },
        _episodeId: { type: String },
        _audioIFrame: { type: String },
        _listenLink: { type: String },
        episodePage: { type: String },
    }

    static styles = css`
        section {
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
        .podcast__button--container {
            text-align: center;
            font-weight: bold;
        }
        .podcast__button {
            cursor: pointer;
            color: white;
            background-color: #f26522;
            padding: 0.625em 1.25em;
            text-align: center;
            border-radius: 8px;
        }
        .podcast__button:hover {
            color: white;
        }
        .divider {
            border-bottom: 1px solid #f26522;
            margin-top: 2em;
        }
    `

    async firstUpdated() {
        let response = await fetch('https://api-dev.wusf.digital/simplecast/podcast/episodes?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0')
        response = await response.json()
        const episodeId = response[0].id
        const slug = response[0].slug
        this._episodeId = episodeId
        this._audioIframe = `https://player.simplecast.com/${episodeId}?dark=false`
        this.episodePage = `https://thezestpodcast.com/${slug}`
        let episodeResponse = await fetch(`https://api-dev.wusf.digital/simplecast/episode?id=${episodeId}`)
        episodeResponse = await episodeResponse.json()
        this._data = episodeResponse
    }

    constructor() {
        super()
        this._data = {}
        this._episodeId = ''
        this.episodePage = ''
        this._audioIframe = ''
        this._listenLink = 'https://thezestpodcast.com/how-to-listen-to-a-podcast/'
    }

    render() {
        return html`
            <section>
                <h1 class="podcast__title">
                    <a .href=${this.episodePage} rel="noreferrer noopener">${this._data?.title}</a>
                </h1>
                <iframe data-tf-not-load="1" frameborder="no" scrolling="no" seamless="" .src=${this._audioIframe}></iframe>
                <p><strong>${moment(this._data?.publishedDate).format('MMMM D, YYYY')}</strong></p>
                <p class="podcast__button--container">
                    <a class="podcast__button" href=${this._listenLink} rel="noreferrer noopener">Subscribe To The Zest Podcast</a>
                </p>
                <div class="divider"></div>
                <p .innerHTML=${this._data?.descriptionLong}></p>
            </section>
        `
    }
}

customElements.define('zest-frontpage-latest', ZestFrontPageLatest)