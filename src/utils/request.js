import fs from 'fs';
import request from 'request';

export const download = function(uri, filename){
  return new Promise((resolve, reject) => {
    request.head(uri, function(err, res, body){
      if (err) reject(err);
      request(uri).pipe(fs.createWriteStream(filename)).on('close', () => {
        resolve();
      })
    });
  });
};
