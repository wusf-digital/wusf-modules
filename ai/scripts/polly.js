const body = document.querySelector('body')
const form = document.getElementById('polly')
const voiceType = document.getElementById('select-voice')
const submitButton = document.getElementById('polly-submit')

function enterPassword() {
    return prompt('Enter the password')
}

function getToken() {
    return localStorage.getItem('token')
}

function setToken(token) {
    localStorage.setItem('token', token)
}

async function authenticate() {
    const password = enterPassword()

    try {
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": "digital@wusf.org",
                password
            })
        })
        
        if (response.ok) {
            let token = await response.json()
            setToken(token.token)
            collectFormData()
        } else {
            enterPassword()
        }
    }
    catch(error) {
        console.log(error)
    }
}

function run() {
    form.addEventListener('submit', e => {
        e.preventDefault() 
        authenticate()
    })
}

function collectFormData() {
    removeAudioPlayer()
    const data = {}
    let textToSend = "<speak><amazon:domain name='news'>"
    textToSend += document.getElementById('polly-text').value
    textToSend += "</amazon:domain></speak>"
    data.data = {}
    data.data.text = textToSend
    data.data.voice = voiceType.options[voiceType.selectedIndex].value
    submitButton.disabled = true
    submitToApi(data)
}

async function submitToApi(data) {
    try {
        const response = await fetch('http://localhost:3000/polly', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            const audioStreamURL = await response.json()
            createAudioPlayer(audioStreamURL)
        } else {
            alert('An authentication error occurred.')
        }
    } catch(error) {
        console.error(error)
    }
    submitButton.disabled = false
}

function createAudioPlayer(streamUrl) {
    const audioObject = document.createElement('audio')
    audioObject.setAttribute('controls', '')
    audioObject.src = streamUrl
    body.appendChild(audioObject)
}

function removeAudioPlayer() {
    const audioObjectExists = !!document.querySelector('audio')
    if (!audioObjectExists) return
    document.querySelector('audio').remove()
}

run()