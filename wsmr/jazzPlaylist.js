'use strict'

function JazzPlaylist() {
    const [ playlist, setPlaylist ] = React.useState([])
    const [ date, setDate ] = React.useState(moment().format('YYYY-MM-DD'))
    const [ displayDate, setDisplayDate ] = React.useState('')
    const [ disabled, setDisabled ] = React.useState(true)

    React.useEffect(() => {
        async function fetchPlaylist(date) {
            try {
                //let response = await fetch(`https://api.wusf.org/v2/songs/WUSF/day?date=${date}`)
                let response = await fetch(`jazzPlaylist_2022-03-31.json`)
                response = await response.json()

                // Reverse the playlist array so the latest is displayed first
                setPlaylist(response.reverse())

                /* 
                Check to see if there are song data for current date. If not, subtract one day,
                and store the data.
                */
                if (Array.isArray(response) && !response.length) {
                    setDate(moment().subtract(1, 'days').format('YYYY-MM-DD'))
                }

                // Set the date displayed to user based on first song returned from the server
                if (typeof response !== undefined && response[0]) {
                    const serverDate = response[0].start.dateTime
                    setDisplayDate(serverDate)
                }

                /* 
                From 9 o'clock until midnight, we show today's playlist. Thus, the
                'Next' button would be disabled (since we have no data yet for tomorrow)

                At all other times, the date displayed to user is typically yesterday's date. 
                Thus, the 'Next' button needs to be enabled so the user can navigate forward in time
                for dates before yesterday's date.
                */
                if (moment().hour() >= 21) {
                    moment().isSame(displayDate, 'd') ? setDisabled(true) : setDisabled(false)
                }
                else {
                    moment().diff(displayDate, 'd') >= 1 ? setDisabled(false) : setDisabled(true)
                }
                
            } catch (error) {
                console.error(error)
            }
        }
        fetchPlaylist(date)
    }, [ date, displayDate ])
    

    function previousDate() {
        setDate(moment(date).subtract(1, 'days').format('YYYY-MM-DD'))
    }

    function nextDate() {
        setDate(moment(date).add(1, 'days').format('YYYY-MM-DD'))
    }

    return (
        <section className='playlist__app-container'>
            { displayDate && 
                <header className='playlist__title'>
                    Jazz Listings for {moment(displayDate).format('dddd, MMMM Do, YYYY')}
                </header>
            }
            <nav className='playlist__button-group'>
                <button className='playlist__button--previous' onClick={previousDate}>Previous</button>
                <button className='playlist__button--next' disabled={disabled} onClick={nextDate}>Next</button>
            </nav>
            <table className='table align-middle'>
                <thead>
                    <tr className='playlist__headers'>
                        <th><i className="fa-solid fa-clock"></i></th>
                        <th>Artist</th>
                        <th>Song Title</th>
                        <th>Label</th>
                    </tr>
                </thead>
                <tbody>
                {playlist.map((song, rowNumber) => {
                    return (
                        <tr key={song.id} style={{ backgroundColor: rowNumber % 2 == 0 ? '#F2F2F1' : 'white' }}>
                            <td className='playlist__time'>{moment(Date.parse(song.extraInfo.AirStarttime)).format('LT')}</td>
                            <td dangerouslySetInnerHTML={{__html: song.extraInfo.artist}}></td>
                            <td dangerouslySetInnerHTML={{__html: song.extraInfo.title}}></td>
                            <td dangerouslySetInnerHTML={{__html: song.extraInfo.Label}}></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </section>
    )
}