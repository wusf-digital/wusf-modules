// DOM Elements
const loaderContainer = document.querySelector('.loading-container')
const loaderSpinner = document.querySelector('.loading-spinner')
const loaderText = document.querySelector('.loading-text')

function hideLoadingSpinner() {
    loaderContainer.classList.add('no-display')
    loaderSpinner.classList.add('no-display')
    loaderText.classList.add('no-display')
}

async function getData(url) {
    try {
        let response = await fetch(url)
        response = response.json()
        return response
    } catch(error) {
        console.log(error)
    }
}