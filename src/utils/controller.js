// @flow
'use strict';
import express from 'express';

// We use http Restful API convention
// this util will automatically generate routes for the following verbs from controller
const verbsAllowed = ['get', 'post', 'patch', 'put', 'delete'];

type appType = {
  models: Object,
  routes: []
};

const createApi = (app: appType) => (path: string, verbs: Object, Router: express.Router) => {
  for (let verb in verbs) {
    const verbFunction: string = verb.toLowerCase();
    if (verbsAllowed.indexOf(verbFunction) === -1) return;
    // $FlowIgnore:
    Router[verbFunction](path, verbs[verb](app.models));
    app.routes.push(`${verb} ${path}`);
  }
  return Router;
};

const createRoute = (app: appType) => (path: string, verb: string, handler: Function, Router: express.Router) => {
  // $FlowIgnore:
  Router[verb](path, handler(app.models));
  return Router
};

export { createApi, createRoute };