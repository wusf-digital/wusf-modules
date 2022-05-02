import { LitElement, html, css } from "lit"
import moment from "moment"

export class AlertsModule extends LitElement {
    static properties = {
        area: {},
        _data: { state: true },
        _filteredData: { state: true },
        _searchText: { state: true },
    }

    static styles = css`
        section {
            display: flex;
            flex-direction: column;
        }
        input {
            height: 1.5rem;
            font-size: 1rem;
            padding-inline: 1rem;
            padding-block: 0.5rem;
            margin-block: 15px;
            border: 1px solid black;
        }
        header {
            color: var(--PMA__ALERTS-MODULE--header-text, white);
            display: flex;
            background-color: var(--PMA__ALERTS-MODULE--header-background, navy);
            padding-inline: 20px;
        }
        .header__label {
            font-weight: bold;
            flex: 1;
        }
        .margin-left {
            margin-left: 1.5rem;
        }
        .alert__expand {
            cursor: pointer;
            padding-inline: 30px;
        }
        .header__expand-placeholder {
            align-self: center;
            visibility: hidden;
            padding-inline: 30px;
        }
        ul {
            display: flex; 
            align-items: center;
            list-style-type: none;
            margin-block: 0;
            padding-inline: 20px;
            padding-block: 5px;
        }
        .border__alert--collapsed {
            border-block: 1px solid #ccc;
            border-inline: 1px solid #ccc;
        }
        .border__alert--expanded {
            border-block-start: 1px solid #ccc;
            border-inline: 1px solid #ccc;
        }
        .border__alert-summary {
            border-inline: 1px solid #ccc;
        }
        .alerts__item {
            display: inline;
            flex: 1;
        }
        article {
            border-block-end: 1px solid #ccc;
            padding: 5px 20px;
        }
        .invisible {
            display: none;
        }
        .alerts--wrapper {
            margin-block: 15px;
        }
        #message__no-alerts {
            border: 1px solid #ccc;
            padding: 5px 20px;
        }

        @media(max-width: 992px) {
            section {
                font-size: 0.8rem;
            }
            .alert__expand, .header__expand-placeholder {
                padding-inline: 5px;
            }
            header, ul {
                padding-inline: 5px;
            }
            article {
                padding: 5px;
            }
        }
    `

    async firstUpdated() {
        try {
            let alerts = await fetch(`https://api.weather.gov/alerts/active/area/${this.area.toUpperCase()}`, {
                headers: new Headers({ "User-Agent": "frontogenesis@gmail.com" }) 
            })
            alerts = await alerts.json()
            this._data = alerts.features
            this._filteredData = alerts.features
        } catch(error) {
            console.error(error)
        }
    }

    constructor() {
        super()
        this.area = {},
        this._data = []
        this._filteredData = []
        this._searchText = ''
    }

    render() {
        const alertsTable = html`
            ${this._filteredData.map((alert, id) => {
                return html`
                    <div class="alerts--wrapper">
                        <ul id=alert${id} class="border__alert--collapsed">
                            <li class="alerts__item">${alert.properties.event}</li>
                            <li class="alerts__item">${alert.properties.areaDesc.replaceAll(';', ',')}</li>
                            <li class="alerts__item margin-left">${alert.properties.ends ? moment(alert.properties.ends).format('ddd MMM D, h:mm a') :
                            moment(alert.properties.expires).format('ddd MMM D, h:mm a')}</li>
                            <i class="alert__expand" @click=${this._open.bind(this, id)}>&#9660;</i>
                        </ul>
                        <article id=details${id} class="invisible border__alert-summary">
                            ${alert.properties.description}
                        </article>
                    <div>
                `
            })}  
        `

        const noAlertsMessage = html`<p id="message__no-alerts">No alerts are in effect in our area.</p>`
        
        return html`
            <section>
                <h1>Weather Alerts</h1>
                <input @input=${this._search} placeholder="Search for alerts" />
                <header>
                    <p class="header__label">Type</p>
                    <p class="header__label">Location</p>
                    <p class="header__label margin-left">Ending Time</p>
                    <i class="header__expand-placeholder">&#9660;</i>
                </header>
                ${this._filteredData.length > 0 ? alertsTable : noAlertsMessage }
            </section>
        `
    }

    _search(e) {
        this._searchText = e.target.value
        this._filteredData = this._data.filter(alert => {
            return (
                alert.properties.event.toLowerCase().includes(this._searchText.toLowerCase()) ||
                alert.properties.areaDesc.toLowerCase().includes(this._searchText.toLowerCase())
            )
        })
    }

    _open(id, e) {
        const detailsEl = this.renderRoot.querySelector(`#details${id}`)
        const alertEl = this.renderRoot.querySelector(`#alert${id}`)
        detailsEl.classList.toggle('invisible')
        alertEl.classList.toggle('border__alert--collapsed')
        alertEl.classList.toggle('border__alert--expanded')
    }
}

customElements.define('alerts-module', AlertsModule)