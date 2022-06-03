var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},a=e.parcelRequire8fb7;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in r){var a=r[e];delete r[e];var i={id:e,exports:{}};return t[e]=i,a.call(i.exports,i,i.exports),i.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){r[e]=t},e.parcelRequire8fb7=a);var i=a("dpiPf");class l extends i.LitElement{static properties={area:{},_data:{state:!0}};static styles=i.css`
        section {
            font-weight: bold;
            display: flex;
            align-items: center;
            background-color: var(--PMA__ALERTS-BANNER--title-background, rgb(2, 144, 205));   
        }
        ul {
            width: 100%;
            color: var(--PMA__ALERTS-BANNER--title-text, white);
            background-color: var(--PMA__ALERTS-BANNER--alerts-background, rgb(2, 144, 205));
            display: flex;
            flex-wrap: wrap;
            list-style-type: none;
            margin-block: 0;
            padding-inline: 0.3rem;
            padding-block: 0.7rem;
        }
        li {
            
            padding-inline: 0.3rem;
            color: var(--PMA__ALERTS-BANNER--alerts-text, white)
        }
        li:not(:last-child):after {
            content: ","
        }
        p {
            color: var(--PMA__ALERTS-BANNER--title-text, white);
            margin-block: 0;
            padding-inline: 0.7rem;
            padding-block: 0.7rem;
            flex-shrink: 0;
        }
    `;async firstUpdated(){try{let e=await fetch("https://api-dev.wusf.digital/weather/alerts");e=await e.json();let t=new Set(e.features.map((e=>e.properties.event)));t=[...t],this._data=t}catch(e){console.error(e)}}constructor(){super(),this.area="FL",this._data=[]}render(){const e=i.html`
            <section>
                <p><slot></slot></p>
                <ul>
                    ${this._data?.map((e=>i.html`<li>${e}</li>`))}
                </ul>
            </section>
        `;return i.html`${this._data.length>0?e:i.html` `}`}}customElements.define("alerts-banner",l);