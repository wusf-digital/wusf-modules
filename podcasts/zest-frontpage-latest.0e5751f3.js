var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},s=e.parcelRequirebbd5;null==s&&((s=function(e){if(e in t)return t[e].exports;if(e in i){var s=i[e];delete i[e];var a={id:e,exports:{}};return t[e]=a,s.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){i[e]=t},e.parcelRequirebbd5=s);var a=s("800sp");class o extends a.LitElement{static properties={_data:{type:Object,state:!0},_episodePage:{type:String,state:!0}};static styles=a.css`
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
    `;async firstUpdated(){let e=await fetch("https://api-dev.wusf.digital/simplecast/podcast/episodes?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0");e=await e.json();const t=e[0].id,i=e[0].slug;this._episodePage=`https://thezestpodcast.com/${i}`;let s=await fetch(`https://api-dev.wusf.digital/simplecast/episode?id=${t}`);s=await s.json(),this._data=s}constructor(){super(),this._data={},this._episodePage=""}render(){return Object.keys(this._data).length>0?a.html`
            <section>
                <h1 class="episode__title">
                    <a .href=${this._episodePage} rel="noreferrer noopener">${this._data.title}</a>
                </h1>
                <img
                    class="episode__image" 
                    src=${this._data.episodeImageUrl??this._data.podcastImageUrl}
                    alt="Episode Image">
            </section>
        `:a.html``}}customElements.define("zest-frontpage-latest",o);
//# sourceMappingURL=zest-frontpage-latest.0e5751f3.js.map
