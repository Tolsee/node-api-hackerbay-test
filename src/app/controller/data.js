// @flow
'use strict';

const Get = (req: Object, res: Object) => {
  return res.status(200).json({
    data: 'Any string'
  });
};

let apiData = null;

const Post = (req: Object, res: Object) => {
  const { data } = req.body;
  apiData = data;

  return res.status(200).json({
    data: apiData
  });
};

export { Get, Post };