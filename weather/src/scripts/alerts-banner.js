import { LitElement, html, css } from "lit";

export class AlertsBanner extends LitElement {

    static properties = {
        area: {},
        _data: { state: true },
    }

    static styles = css`
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
    `

    async firstUpdated() {
        try {
            let alerts = await fetch(`https://api.weather.gov/alerts/active/area/${this.area.toUpperCase()}`, {
                headers: new Headers({ "User-Agent": "frontogenesis@gmail.com" }) 
            })
            alerts = await alerts.json()
            let dedupedAlerts = new Set(alerts.features.map(alert => alert.properties.event))
            dedupedAlerts = [...dedupedAlerts]
            this._data = dedupedAlerts
        } catch(error) {
            console.error(error)
        }
    }

    constructor() {
        super()
        this.area = 'FL'
        this._data = []
    }

    render() {
        const alerts = html`
            <section>
                <p><slot></slot></p>
                <ul>
                    ${this._data?.map(alert => html`<li>${alert}</li>`)}
                </ul>
            </section>
        `

        return html`${this._data.length > 0 ? alerts : html` `}`
    }
}

customElements.define('alerts-banner', AlertsBanner)