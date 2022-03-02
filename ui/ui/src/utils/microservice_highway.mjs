const populate_artist_view = async (navigate, setArtistInfo, searchTerm, spotifyToken) => {
    try {
        const path = 'http://localhost:4000/compendium'
        const response = await fetch(path, {
            method: 'POST',
            body: JSON.stringify(
                {
                    'artist': searchTerm,
                    'token': spotifyToken
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        data.graph_url = await generate_graph_url(data)
        setArtistInfo(data)
        navigate('/artist')
    } catch {
        navigate('/error')
    }
}

const generate_graph_url = async (spotify_info) => {
    const labels = []
    const artist_data = []
    const user_data = []

    for (const key in spotify_info.artist_analytics) {
        labels.push(key)
        artist_data.push(spotify_info.artist_analytics[key])
        user_data.push(spotify_info.user_analytics[key])
    }

    const template = {
        config: {
            type: 'radar',
            data: {
                labels,
                datasets: [
                    {
                        lineTension: .4,
                        backgroundColor: 'rgba(33, 0, 112, 0.4)',
                        borderColor: 'rgb(33, 0, 112)',
                        pointBackgroundColor: 'rgba(33, 0, 112, 0.99)',
                        data: artist_data,
                        pointRadius: 2,
                        borderWidth: 1,
                        label: spotify_info.name
                    },
                    {
                        lineTension: .4,
                        backgroundColor: 'rgba(123, 216, 195, 0.4)',
                        borderColor: 'rgb(123, 216, 195)',
                        pointBackgroundColor: 'rgba(123, 216, 195, 0.99)',
                        data: user_data,
                        pointRadius: 2,
                        borderWidth: 1,
                        label: "Your Top Tracks"
                    }
                ],
            },
            options: {
                legend: {
                    display: true,
                    labels: {
                        fontSize: 7,
                        boxWidth: 7,
                        padding: 3
                    }
                },
                title: {
                    display: true,
                    text: 'Musical Analysis',
                    fontSize: 9,
                    padding: 3
                },
                scale: {
                    pointLabels: {
                        fontSize: 6,
                    },
                    ticks: {
                        display: true,
                        beginAtZero: true,
                        max: 100,
                        stepSize: 25,
                        fontSize: 7,
                    }
                },
            }
        },
        width: 300,
        height: 250
    }

    const path = 'http://localhost:8000/generateGraph'

    const response = await fetch(path, {
        method: 'POST',
        body: JSON.stringify(template),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    const val = await response.json()
    return val.graph_url
}

export default populate_artist_view