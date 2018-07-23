// @flow

import fs from 'fs';
import sharp from 'sharp';
import { download } from "../../utils/request";

const height = 50;
const width = 50;

export const Post = (req: Object, res: Object) => {
  const filename = `temp-${Date.now()}`;
  const { body: { uri }} = req;

  // Set the content-type of the response
  res.type(`image/'png'`);

  download(uri, filename)
    .then(() => {
      const fileStream = fs.createReadStream(filename);

      let transform = sharp();

      if (width || height) {
        transform = transform.resize(width, height);
      }

      return fileStream.pipe(transform).pipe(res);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message || 'Internal Server Error!'
      });
    });
};

