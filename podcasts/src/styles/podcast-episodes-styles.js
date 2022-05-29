import { css } from 'lit'

export const podcastEpisodesStyles = css`
    .episodes {
        font-family: 'Josefin Sans', sans-serif;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;
        padding: 10px;
        background-color: #D4F4ED;
        border-top: 2px solid #3A7168;
        padding-block: 2em;
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
        margin: 0;
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
    .card__container--title {
        cursor: pointer;
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

    @media (min-width: 992px) {
        article.card {
            max-width: calc(33% - 20px);
        }
    }
`