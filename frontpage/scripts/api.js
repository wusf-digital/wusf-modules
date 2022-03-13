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