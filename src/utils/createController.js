// @flow
'use strict';

export default function createController(path: string, verbs: Object, Router: any) {
  for (let verb in verbs) {
    const verbFunction = verb.toLowerCase();

    Router[verbFunction](path, verbs[verb]);
  }
  return Router;
};
