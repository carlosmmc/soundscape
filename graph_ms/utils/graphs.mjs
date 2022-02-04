'use strict'

import QuickChart from 'quickchart-js'

/**
 * This function creates the graph based on the user inputs.
 * 
 * REQUIRED
 * --------
 * config: see chart.js requirements for details
 * 
 * OPTIONAL
 * --------
 * width - int representing width of chart of pixels, defaults to 500
 * height - int representing height of chart in pixels, defaults to 300
 * format - sets format of chat, default is png, the only other acceptable value is svg
 * backgroundColor - background color of chart, any valid HTML color is acceptable
 * useShort - boolean indicating whether to use quickchart web service to create fixed length URL 
 */

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