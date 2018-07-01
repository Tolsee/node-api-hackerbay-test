// @flow
'use strict';

import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import rfs from 'rotating-file-stream';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { createApi, createRoute, createModal } from "../utils";

// Import auth
import auth from './auth/passport';

// Import models
import User from './models/user';

// Import controllers
import * as pingController from './controller/ping';
import * as userController from './controller/user';

const app = express();
const Router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Employ passport
app.use(passport.initialize());


// Logger
const accessLog = path.join(__dirname, '../../logs');
fs.existsSync(accessLog) || fs.mkdirSync(accessLog);
const accessLogStream = rfs((time, index) => time ? `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}-${index}.log` : `access-${index}.log`, {
  interval: '1d',
  path: accessLog
});
const logger = morgan('short', { stream: accessLogStream});
app.use(logger);

/*
* ----------------
* App Data
* ----------------
* */
const appData : {
  models: Object,
  routes: []
} = {
  models: {},
  routes: []
};

/*
* ----------------
* Model
* Setup
* ----------------
* */
const model = createModal(appData);

model(User);

/*
* ----------------
* Auth
* Setup
* ----------------
* */
auth(appData.models);

/*
* ----------------
* Router
* Setup
* ----------------
* */
const api = createApi(appData);
const route = createRoute(appData);

api('/ping', pingController, Router);

// Auth routes
route('/user/login', 'post', userController.login, Router);
route('/user/signup', 'post', userController.signup, Router);

app.use(Router);

export { app, appData };
