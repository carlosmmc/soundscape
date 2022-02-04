const populate_artist_view = async (navigate, setArtistInfo, searchTerm) => {
    const path = `http://localhost:4000/artist/${searchTerm}`
    const response = await fetch(path, { method: 'GET' })
    const data = await response.json()
    data.graph_url = await generate_graph_url(data)

    setArtistInfo(data)
    navigate('/artist')
}

const generate_graph_url = async (data) => {
    const keys = []
    const vals = []

    for (const key in data.style_analytics) {
        keys.push(key)
        vals.push(data.style_analytics[key])
    }

    const template = {
        config: {
            type: 'radar',
            data: {
                labels: keys,
                datasets: [
                    {
                        lineTension: .5,
                        backgroundColor: 'rgba(178, 201, 235, 0.4)',
                        borderColor: 'rgb(178, 201, 235)',
                        pointBackgroundColor: 'rgba(94, 154, 238, 0.99)',
                        data: vals,
                        pointHoverRadius: 30,
                    },
                ],
            },
            options: {
                legend: { display: false },
                title: { display: true, text: 'Musical Analysis' },
                scale: { ticks: { display: false } },
            }
        },
        width: 320,
        height: 240
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