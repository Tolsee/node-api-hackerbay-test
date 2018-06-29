// @flow
'use strict';

import * as http from 'http';
import dotenv from 'dotenv';

import { normalizePort } from './utils';
import App from './app';

// Import environmental variables
dotenv.config();

const port = normalizePort(process.env.PORT);

// $FlowFixMe: express libdef issue
const server: http.Server = http.createServer(App)

server.listen(port, () => {
  console.log(`${port} is the magic port!!`);
});

export default server;
