class Player {
    isPlaying = false
    brandLogo = document.querySelector('img.brand-logo')
    buttonStatus = document.querySelector('span.status')
    timePlaying = document.querySelector('time')
    showName = document.querySelector('h1.show-name')
    showArtist = document.querySelector('h3.show-artist')
    showImage = document.querySelector('img.show-img')
    audioButton = document.querySelector('button.audio-toggle')

    constructor(station) {
        this.station = station
        this.buttonStatus.innerHTML = '<i class="fa fa-play"></i>'

        // Click event handler for the play/pause button
        const stationStream = this.getStationStream()
        this.audioButton.addEventListener('click', e => {
            this.isPlaying = !this.isPlaying
            if (this.isPlaying) {
                stationStream.load()
                stationStream.play()
                this.buttonStatus.innerHTML = '<i class="fa fa-pause"></i>'
            } else {
                stationStream.pause()
                stationStream.currentTime = 0
                this.buttonStatus.innerHTML = '<i class="fa fa-play"></i>'
            }
        })
    }

    hidePlayButton() {
        this.audioButton.style.display = 'none'
    }

    hideBrandLogo() {
        this.brandLogo.style.display = 'none'
    }

    getStationStream() {
        const streams = {
            wusf: 'https://streaming.wusf.fm/wusf',
            wsmr: 'https://streaming.floridaclassicalstation.fm/wsmr'
        }
        const audioStream = new Audio(streams[this.station])
        return audioStream
    }

    getStationLogo() {
        const logos = {
            wusf: 'WUSF897_Logo_Horiz_2019_COLOR.png',
            wsmr: 'wsmr_logo_600x600.png'
        }
        return logos[this.station]
    }

    getEndTimeFromOnAir(startTime, str) {
        /*  
        We calculate the show's endTime based on its start time and
        duration and return it to the caller.

        The "onAir" array has the duration defined in the following format:
        0:01:00:00
        The code below removes the first digit and semicolon to simplify
        the duration calculation with the MomentJS library
        */
        let duration = str.split(':').slice(1)
        duration = duration.join(':')
        duration = moment.duration(duration)
        let endTime = moment(startTime).add(duration, 'milliseconds')
        return this.formatTime(endTime)
    }

    getEndTimeFromNowPlaying(startTime, str) {
        /*  
        We calculate the show's endTime based on its start time and
        duration and return it to the caller.

        The "nowPlaying" array has the duration defined in the following format:
        01:00:00
        */
        let duration = moment.duration(str)
        let endTime = moment(startTime).add(duration, 'milliseconds')
        return this.formatTime(endTime)
    }

    formatTime(iso8601) {
        // Returns time in the format of "8:00 pm"
        return moment(new Date(iso8601)).format('h:mm a')
    }

    getNowPlaying(data) {
        // Returns data from the "nowPlaying" array (if available)
        // The "nowPlaying" array includes information about individual stories within a program
        if (Array.isArray(data) && !data.length) return

        let [ showData ] = data

        return {
            title: showData.title ?? undefined,
            startTime: showData.startTime ?? undefined,
            endTime: showData.duration ? this.getEndTimeFromNowPlaying(showData.startTime, showData.duration) : undefined,
            artist: showData.artist ?? '',
            imgBase64: showData.image ?? undefined
        }
    }

    getOnAir(data) {
        // Returns data from the "onAir" array
        // The "onAir" array includes information about the program playing
        if (Array.isArray(data) && !data.length) return

        let [ showData ] = data

        return {
            title: showData.title ?? '',
            startTime: showData.startTime ?? undefined,
            endTime: showData.duration ? this.getEndTimeFromOnAir(showData.startTime, showData.duration) : undefined,
            imgBase64: showData.images[0]?.image ?? undefined
        }
    }

    async apiSignature() {
        try {
            let data = await (await fetch(`https://api.wusf.digital/nowPlaying/${this.station.toUpperCase()}`)).json()
            
            const showData = this.getNowPlaying(data.nowPlaying) ?? this.getOnAir(data.onAir)

            return { 
                title: showData.title, 
                artist: showData.artist, 
                startTime: this.formatTime(showData.startTime ?? showData.startTime), 
                endTime: showData.endTime, 
                imgBase64: showData.imgBase64
            }
        } catch(error) {
            console.error(error)
        }
    }

    async render() {
        this.brandLogo.src = this.getStationLogo()
        const { title, artist, startTime, endTime, imgBase64 } = await this.apiSignature()
        this.showName.innerHTML = title
        artist ? this.showArtist.innerHTML = artist : null
        this.timePlaying.innerHTML = `${startTime} - ${endTime}`
        this.showImage.src = imgBase64 ? `data:image/png;base64,${imgBase64}` : this.getStationLogo()
    }
}

export default Player