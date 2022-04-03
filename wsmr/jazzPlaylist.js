'use strict'

function JazzPlaylist() {
    const [ playlist, setPlaylist ] = React.useState([])
    const [ date, setDate ] = React.useState(moment().format('YYYY-MM-DD'))
    const [ displayDate, setDisplayDate ] = React.useState('')

    React.useEffect(() => {
        async function fetchPlaylist(date) {
            try {
                // let response = await fetch(`https://api.wusf.org/v2/songs/WUSF/day?date=${date}`)
                let response = await fetch(`jazzPlaylist_2022-03-31.json`)
                response = await response.json()

                // Reverse the playlist array so the latest is displayed first
                setPlaylist(response.reverse())

                // Check to see if there are song data for current date. If not, subtract one day
                if (Array.isArray(response) && !response.length) {
                    setDate(moment().subtract(1, 'days').format('YYYY-MM-DD'))
                }

                // Set the date displayed to user based on first song returned from the server
                if (typeof response !== undefined && response[0]) {
                    const serverDate = response[0].start.dateTime
                    setDisplayDate(moment(serverDate).format('dddd, MMMM Do, YYYY'))
                }
                
            } catch (error) {
                console.error(error)
            }
            
        }
        fetchPlaylist(date)
    }, [ date ])

    

    return (
        <div className='playlist__app-container'>
            { displayDate && 
                <p className='playlist__title'>
                    Jazz Listings for {displayDate}
                </p>
            }
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
        </div>
    )
}