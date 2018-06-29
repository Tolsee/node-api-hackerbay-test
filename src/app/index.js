import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import rfs from 'rotating-file-stream';
import morgan from 'morgan';
import createController from "../utils/createController";

import * as index from './controller';
import * as data from './controller/data';

const app = express();
const Router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
* Router
* Setup
* ----------------
* */
createController('/', index, Router);
createController('/data', data, Router);

app.use(Router);

export default app;