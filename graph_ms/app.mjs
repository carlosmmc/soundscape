'use strict'

// import modules
import express from 'express'
import 'dotenv/config'
import QuickChart from 'quickchart-js'

// set intiial variables
const PORT = 9000
const app = express()

// endpoints
app.get('/', async (req, res) => {
    const chart = new QuickChart();

    chart.setWidth(500)
    chart.setHeight(300);

    chart.setConfig({
        type: 'radar',
        data: {
            labels: ['danceability', 'energy', 'speechiness', 'instrumentalness',
                'acousticness', 'liveness', 'valence'],
            datasets: [
                {
                    lineTension: .5,
                    backgroundColor: 'rgba(178, 201, 235, 0.4)',
                    borderColor: 'rgb(178, 201, 235)',
                    pointBackgroundColor: 'rgba(94, 154, 238, 0.99)',
                    data: [.53, .2, .43, .4, .5, .7],
                },
            ],
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Musical Analysis',
            },
            scale: { ticks: { display: false } },
        }
    });
    console.log(`<img src="${chart.getUrl()}/>"`)
    res.send(`<img src="${chart.getUrl()}"/>`)

    // const path = 'http://localhost:3000/artist/skizzy mars'
    // const response = await fetch(path, { method: 'GET' })
    // const data = await response.json()
    // res.send(data)
})

// listen on server
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
})