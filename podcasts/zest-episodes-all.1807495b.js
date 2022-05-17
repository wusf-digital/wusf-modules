function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},a={},s=t.parcelRequirebbd5;null==s&&((s=function(e){if(e in r)return r[e].exports;if(e in a){var t=a[e];delete a[e];var s={id:e,exports:{}};return r[e]=s,t.call(s.exports,s,s.exports),s.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){a[e]=t},t.parcelRequirebbd5=s),s.register("iYIAi",(function(t,r){var a=s("dpiPf"),i=s("iwzak"),o=s("csfWV");class n extends a.LitElement{static properties={_data:{type:Array,state:!0},number:{type:Number},offset:{type:Number},title:{type:String}};static styles=a.css`
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
    `;async getData(){let e=new o.default(`https://api-dev.wusf.digital/simplecast/podcast/episodes?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0&limit=${this.number}&offset=${this.offset}`);e=await e.get(),e.length%3!=0&&(this.number=3*Math.ceil(e.length/3)),this._data=e.slice(0,this.number)}updated(e){e.has("offset")&&(this.getData(),window.scrollTo(0,0))}constructor(){super(),this._data=[],this.number=0,this.offset=0,this.title=""}render(){return this._data.length>0?a.html`
            <section class="episodes">
                <h1>${this.title}</h1>
                ${this._data.map((t=>a.html`
                        <article class="card">
                            <img class="card__image" src=${t.episodeImageUrl??"https://image.simplecastcdn.com/images/be36e542-b186-4b9b-a6bb-6896fd6492ae/9404af68-88bf-4ca3-a523-a5ec59058405/the-zest-logo.jpg"}>
                            <section class="card__container">
                                <p class="card__container--title">
                                    <a .href="https://thezestpodcast.com/${t.slug}" rel="noreferrer noopener">
                                        ${t.title}
                                    </a>
                                </p>
                                <p class="card__container--date">${e(i)(t.publishedDate).format("MMMM D, YYYY")}</p>
                            </section>
                        </article>
                    `))}
            </section>
        `:a.html``}}customElements.define("podcast-episodes",n)})),s.register("csfWV",(function(e,t){var r,a,s,i;r=e.exports,a="default",s=()=>o,Object.defineProperty(r,a,{get:s,set:i,enumerable:!0,configurable:!0});var o=class{constructor(e){this.url=e}async get(){try{let e=await fetch(this.url);return e=e.json(),e}catch(e){throw new Error(e)}}}}));