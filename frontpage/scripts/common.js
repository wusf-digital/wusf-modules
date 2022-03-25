// DOM Elements
const sectionWrapperStories = document.querySelector('.section__wrapper--stories')
const loaderContainer = document.querySelectorAll('.loading-container')
const loaderSpinner = document.querySelectorAll('.loading-spinner')
const loaderText = document.querySelectorAll('.loading-text')
const nprLogo = 'https://media.npr.org/chrome_svg/npr-logo.svg'

function hideLoadingSpinner() {
    loaderContainer.forEach(loader => loader.classList.add('no-display'))
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