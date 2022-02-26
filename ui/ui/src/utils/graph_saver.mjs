const save_graph = async (url, artist) => {
    const savePath = `${artist}_musical_analysis.png`
    let sendImgData = { url, savePath }

    const path = 'http://localhost:8095/savePokeChart'

    await fetch(path, {
        method: 'POST',
        body: JSON.stringify(sendImgData),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

export default save_graph