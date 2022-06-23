const playingNowSummaryExists = !!document.querySelector('#playing-now__summary')

async function currentlyPlaying() {
    try {
        let response = await (await fetch(`https://api.wusf.org/v2/songs/WSMR/recent`)).json()
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