'use strict'

function JazzPlaylist() {
    const [ playlist, setPlaylist ] = React.useState([])

    React.useEffect(() => {
        async function fetchPlaylist() {
           let response = await fetch('jazzPlaylist.json')
           response = await response.json()
           setPlaylist(response.reverse())
        } 
        fetchPlaylist()
    }, [])

    return (
        <div className='playlist__app-container'>
            <div className='playlist__title'>
                Jazz Listings for {moment().format('dddd, MMMM Do, YYYY')}
            </div>
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