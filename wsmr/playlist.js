'use strict'

function ClassicalPlaylist() {
    const [ playlist, setPlaylist ] = React.useState([])
    const [ date, setDate ] = React.useState(moment().format('YYYY-MM-DD'))
    const [ displayDate, setDisplayDate ] = React.useState('')
    const [ disabled, setDisabled ] = React.useState(true)

    React.useEffect(() => {
        async function fetchPlaylist(date) {
            try {
                let response = await fetch(`https://api.wsmr.org/v2/songs/WSMR/day?date=${date}`)
                response = await response.json()

                // Reverse the playlist array so the latest is displayed first
                setPlaylist(response.reverse())

                // Set the date displayed to user based on first song returned from the server
                if (typeof response !== undefined && response[0]) {
                    const serverDate = response[0].start.dateTime
                    setDisplayDate(serverDate)
                }

                /* 
                If the date displayed to user is today's date, 
                change the 'Next' button to be disabled. Otherwise, enable the 'Next' button
                */
                moment().isSame(displayDate, 'd') ? setDisabled(true) : setDisabled(false)

            } catch(error) {
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
                    Music Listings for {moment(displayDate).format('dddd, MMMM Do, YYYY')}
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
                        <th>Composer</th>
                        <th>Title</th>
                        <th>Soloist</th>
                        <th>Conductor</th>
                        <th>Ensemble</th>
                        <th className='playlist__label-spine'>Label/Spine No.</th>
                    </tr>
                </thead>
                <tbody>
                {playlist.map((song, rowNumber) => {
                    return (
                        <tr key={song.id} style={{ backgroundColor: rowNumber % 2 == 0 ? '#F2F2F1' : 'white' }}>
                            <td className='playlist__time'>{moment(Date.parse(song.extraInfo.AirStarttime)).format('LT')}</td>
                            <td dangerouslySetInnerHTML={{__html: song.extraInfo.artist}}></td>
                            <td dangerouslySetInnerHTML={{__html: song.extraInfo.title}}></td>
                            <td dangerouslySetInnerHTML={{__html: song.extraInfo.Soloist}}></td>
                            <td dangerouslySetInnerHTML={{__html: song.extraInfo.Conductor}}></td>
                            <td dangerouslySetInnerHTML={{__html: song.extraInfo.Orchestra}}></td>
                            <td>
                                <div dangerouslySetInnerHTML={{__html: song.extraInfo.Label}}></div>
                                <div dangerouslySetInnerHTML={{__html: song.extraInfo['Spine_Number']}}></div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </section>
    )
}