(function nowPlayingOnWSMR() {
    /*  WSMR REST API CONNECTION FOR INITIAL LOAD OF WSMR 'PLAYING NOW'

        When the page loads, we make an asynchronous call to the REST API
        (below) to retrieve what's currently playing on WSMR.
    */
    const playingNowSummaryExists = !!document.querySelector('#playing-now__summary')

    async function currentlyPlaying() {
        try {
            let response = await (await fetch(`https://api.wsmr.org/v2/songs/WSMR/day`)).json()
            response = response.reverse()[0]
            if (playingNowSummaryExists) {
                document.querySelector('#playing-now__summary').innerHTML = response.summary
            }
        } catch(error) {
            console.error(error)
        }
    }

    const path = location.pathname
    const regex = /\/classical[^ ]*/
    if (path.match(regex)) {
        currentlyPlaying()
    }

    /*  WEB SOCKET CONNECTION FOR AUTOMATICALLY UPDATING OF WSMR PIECES
        
        When first loading the page, we make an asynchronous call to the
        REST API (above) to retrieve what's currently playing on WSMR. 
        We also initiate a connection to the websocket API. When the next
        piece plays, a message is sent through the websocket and the 
        'Playing Now' banner updates on the WSMR Home Page so long as a
        title or artist is contained within the message. If that is not
        the case, we fall back to an asynchronous call to our regular 
        REST API. After a set period of time, we automatically close the
        user's connection to the WebSocket API.
    */

    let interval
    const keepAliveInterval = 3
    const disconnectTimeout = 90

    let socket = new WebSocket('wss://websocket.wsmr.org')

    socket.onopen = event => {
        console.log('open', event)

        // Set Heartbeat Interval
        interval = setInterval(ping, 60000 * keepAliveInterval)
        
        // Terminate Web Socket Connection
        setTimeout(closeSocketConnection, 60000 * disconnectTimeout)
    }

    socket.onmessage = event => {
        const msg = JSON.parse(event.data)
        if (msg === 'Pong...') return
        const title = msg.song['M'].extraInfo['M'].title['S']
        const artist = msg.song['M'].extraInfo['M'].artist['S']
        if ((title || artist) && (playingNowSummaryExists)) {
            document.querySelector('#playing-now__summary').innerHTML = `${title} - ${artist}`
        }
        else {
            currentlyPlaying()
        }
    }

    function closeSocketConnection() {
        clearInterval(interval, 60000 * disconnectTimeout)
        socket.close()
        socket.onclose = event => {
            console.log('Web socket closed after 90 minutes')
        }
    }

    function ping() {
        socket.send(JSON.stringify({ 
            "action" : "sendMessage",
            "message": "ping"
        }))
        console.log("Ping...")
    }
})()