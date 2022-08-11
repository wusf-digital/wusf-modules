const body = document.querySelector('body')
const form = document.getElementById('polly')
const voiceType = document.getElementById('select-voice')
const submitButton = document.getElementById('polly-submit')

function start() {
    const data = {}
    form.addEventListener('submit', e => {
        e.preventDefault()
        removeAudioPlayer()
        let textToSend = "<speak><amazon:domain name='news'>"
        textToSend += document.getElementById('polly-text').value
        textToSend += "</amazon:domain></speak>"
        data.data = {}
        data.data.text = textToSend
        data.data.voice = voiceType.options[voiceType.selectedIndex].value
        console.log(JSON.stringify(data))
        submitButton.disabled = true
        submitToApi(data)
    })
}

async function submitToApi(data) {
    try {
        const response = await fetch('https://api-dev.wusf.digital/polly', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            const audioStreamURL = await response.json()
            createAudioPlayer(audioStreamURL)
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

start()