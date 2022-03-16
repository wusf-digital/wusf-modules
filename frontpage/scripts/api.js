// DOM Elements
const loaderContainer = document.querySelector('.loading-container')
const loaderSpinner = document.querySelector('.loading-spinner')
const loaderText = document.querySelector('.loading-text')

function hideLoadingSpinner() {
    loaderContainer.classList.add('no-display')
    loaderSpinner.classList.add('no-display')
    loaderText.classList.add('no-display')
}

async function getTopStory() {
    try {
        let response = await fetch('https://api-dev.wusf.digital/grove/topStory')
        response = response.json()
        return response
    } catch(error) {
        console.log(error)
    }
}

async function getHealthNews() {
    try {
        let response = await fetch('https://api-dev.wusf.digital/grove/healthNewsFlorida')
        response = response.json()
        return response
    } catch(error) {
        console.log(error)
    }
}

async function getEducation() {
    try {
        let response = await fetch('https://api-dev.wusf.digital/grove/education')
        response = response.json()
        return response
    } catch(error) {
        console.log(error)
    }
}

async function getLocalState() {
    try {
        let response = await fetch('https://api-dev.wusf.digital/grove/localState')
        response = response.json()
        return response
    } catch(error) {
        console.log(error)
    }
}