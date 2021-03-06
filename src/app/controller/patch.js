// @flow
import jsonpatch from 'jsonpatch';

export const Post = (req: Object, res: Object) => {
  const { body: {object, patch } } = req;
  if (!object || !patch) {
    return res.status(400).json({
      error: 'Please provide object and patch'
    });
  }
  const patcheddoc = jsonpatch.apply_patch(object, patch);
  return res.status(200).json({ data: patcheddoc });
  // patcheddoc now equals {"baz": "boo", "foo": "bar"}}
};

