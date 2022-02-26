// ** have saveData be triggered on a button click, as if they're clicking to download whatever data
const saveData = async () => {
    // you can paste your graph_url output, I think this only works if the ending url has png or jpg
    const url = graph_url;
    // customize the path you want the image to save to
    // const savePath = '/Users/kenzie/Documents/pokeStats.png';
    const savePath = 'C:\Users\carlo\Downloads\trial.png';

    let sendImgData = {
        url,
        savePath
    };

    // make sure to change the port to whatever port you're running this service on
    const path = 'http://localhost:8095/savePokeChart';

    await fetch(path, {
        method: 'POST',
        body: JSON.stringify(sendImgData),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
    // you shouldn't have to return anything
}