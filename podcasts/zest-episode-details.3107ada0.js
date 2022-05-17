function t(t){return t&&t.__esModule?t.default:t}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},o={},s=e.parcelRequirebbd5;null==s&&((s=function(t){if(t in i)return i[t].exports;if(t in o){var e=o[t];delete o[t];var s={id:t,exports:{}};return i[t]=s,e.call(s.exports,s,s.exports),s.exports}var a=new Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(t,e){o[t]=e},e.parcelRequirebbd5=s);var a=s("dpiPf"),r=s("iwzak");class n extends a.LitElement{static properties={_data:{type:Object,state:!0},_audioIFrame:{type:String,state:!0},listenLink:{type:String},_episodePage:{type:String,state:!0}};static styles=a.css`
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
    `;async firstUpdated(){let t=await fetch("https://api-dev.wusf.digital/simplecast/podcast/episodes?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0");t=await t.json();const e=t[0].id,i=t[0].slug;this._episodeId=e,this._audioIframe=`https://player.simplecast.com/${e}?dark=false`,this._episodePage=`https://thezestpodcast.com/${i}`;let o=await fetch(`https://api-dev.wusf.digital/simplecast/episode?id=${e}`);o=await o.json(),this._data=o}constructor(){super(),this._data={},this._episodePage="",this._audioIframe="",this.listenLink="https://thezestpodcast.com/how-to-listen-to-a-podcast/"}render(){return Object.keys(this._data).length>0?a.html`
            <section>
                <img 
                    src=${this._data.episodeImageUrl??this._data.podcastImageUrl}
                    class="episode__image"
                    alt="The Zest Podcast Logo"

                >
                <h1 class="podcast__title">
                    <a .href=${this._episodePage} rel="noreferrer noopener">${this._data.title}</a>
                </h1>
                <iframe data-tf-not-load="1" frameborder="no" scrolling="no" seamless="" .src=${this._audioIframe}></iframe>
                <p><strong>${t(r)(this._data.publishedDate).format("MMMM D, YYYY")}</strong></p>
                <p class="podcast__button--container">
                    <a class="podcast__button" href=${this.listenLink} rel="noreferrer noopener">Subscribe To The Zest Podcast</a>
                </p>
                <div class="divider"></div>
                <p .innerHTML=${this._data.descriptionLong}></p>
            </section>
        `:a.html``}}customElements.define("zest-episode-details",n);