import fs from 'fs'
import request from 'request'

var download = function (uri, filename, callback) {
  const download_path = process.env.USERPROFILE + "\\Downloads\\" + filename
  request.head(uri, function (err, res, body) {
    request(uri).pipe(fs.createWriteStream(download_path)).on('close', callback);
  });
};

export const save = async (req, res) => {
  const { url, savePath } = req.body
  console.log('recieved request to save photo!')

  download(url, savePath, function () {
    console.log('finished saving photo!')
  });

  res.send('complete')
}
