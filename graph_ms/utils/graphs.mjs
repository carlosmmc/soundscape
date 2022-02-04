'use strict'

import QuickChart from 'quickchart-js'

// mandatory
//    config - values going into setConfig

// optional
//    width - int
//    height - int
//    format - png | svg
//    backgroundColor - any valid HTML color works
//    useShort - True/False (uses webservice to create fixed-length URL)

const chart_maker = (async (req, res) => {
    const { config, width, height, format, backgroundColor, useShort } = req.body
    const chart = new QuickChart();

    // main chart settings
    if (typeof config === 'undefined') { throw new Error('Config not sent!') }
    chart.setConfig(config)

    // optional chart settings
    if (typeof width !== 'undefined') { chart.setWidth(width) }
    if (typeof height !== 'undefined') { chart.setHeight(height) }
    if (typeof format !== 'undefined') { chart.setFormat(format) }
    if (typeof backgroundColor !== 'undefined') { chart.setBackgroundColor(backgroundColor) }

    // generate url
    let url
    if (typeof useShort !== 'undefined' && useShort === true) {
        url = await chart.getShortUrl()
    } else {
        url = chart.getUrl()
    }

    const result = { graph_url: url }
    res.send(result)
})

export { chart_maker }