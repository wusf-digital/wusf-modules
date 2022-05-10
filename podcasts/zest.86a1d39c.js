function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},r={},i=t.parcelRequirebbd5;null==i&&((i=function(e){if(e in a)return a[e].exports;if(e in r){var t=r[e];delete r[e];var i={id:e,exports:{}};return a[e]=i,t.call(i.exports,i,i.exports),i.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){r[e]=t},t.parcelRequirebbd5=i);var s=i("800sp"),o=i("45fvw");class d extends s.LitElement{static properties={data:{type:Array,state:!0}};static styles=s.css`
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
    `;async firstUpdated(){let e=await fetch("https://api-dev.wusf.digital/simplecast/podcast/episodes?id=cdfdaf53-a865-42d5-9203-dfb29dda73f0");e=await e.json(),this.data=e.slice(0,6)}constructor(){super(),this.data=[]}render(){return s.html`
            <main>
                <h1>Latest Episodes</h1>
                ${this.data.map((t=>s.html`
                        <article class="card">
                            <img class="card__image" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png">
                            <section class="card__container">
                                <p class="card__container--title">${t.title}</p>
                                <p class="card__container--date">${e(o)(t.publishedDate).format("MMMM D, YYYY")}</p>
                            </section>
                        </article>
                    `))}
            </main>
        `}}customElements.define("wusf-podcasts",d);
//# sourceMappingURL=zest.86a1d39c.js.map
