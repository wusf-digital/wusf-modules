'use strict'

function ClassicalPlaylist() {
    const [ playlist, setPlaylist ] = React.useState([])

    React.useEffect(() => {
        async function fetchPlaylist() {
           let response = await fetch('playlist.json')
           response = await response.json()
           console.log(response)
           setPlaylist(response.reverse())
        } 
        fetchPlaylist()
    }, [])

    return (
        <div className='playlist__app-container'>
            <div className='playlist__title'>
                Music Listings for {moment().format('dddd, MMMM Do, YYYY')}
            </div>
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
        </div>
    )
}