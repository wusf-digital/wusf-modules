var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},s=e.parcelRequirebbd5;null==s&&((s=function(e){if(e in t)return t[e].exports;if(e in i){var s=i[e];delete i[e];var a={id:e,exports:{}};return t[e]=a,s.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){i[e]=t},e.parcelRequirebbd5=s);var a=s("dpiPf"),o=s("csfWV");class d extends a.LitElement{static properties={_data:{type:Object,state:!0},_episodePage:{type:String,state:!0},podcastId:{type:String}};static styles=a.css`
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
    `;async firstUpdated(){if(this.podcastId){let e=new o.default(`https://api-dev.wusf.digital/simplecast/podcast/episodes?id=${this.podcastId}`);e=await e.get();const t=e[0].id,i=e[0].slug;this._episodePage=`https://thezestpodcast.com/${i}`;let s=new o.default(`https://api-dev.wusf.digital/simplecast/episode?id=${t}`);s=await s.get(),this._data=s}}constructor(){super(),this._data={},this._episodePage="",this.podcastId=""}render(){return Object.keys(this._data).length>0?a.html`
            <section>
                <h1 class="episode__title">
                    <a .href=${this._episodePage} rel="noreferrer noopener">${this._data.title}</a>
                </h1>
                <img
                    class="episode__image" 
                    src=${this._data.episodeImageUrl??this._data.podcastImageUrl}
                    alt="Episode Image">
            </section>
        `:a.html``}}customElements.define("zest-frontpage-latest",d);