import express from 'express';
import bodyParser from 'body-parser';
import createController from "../utils/createController";

import * as index from './controller';
import * as data from './controller/data';

const App = express();
const Router = express.Router();

App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());

createController('/', index, Router);
createController('/data', data, Router);

export default App.use(Router);