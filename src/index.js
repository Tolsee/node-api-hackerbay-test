// @flow
'use strict';

import * as http from 'http';

import { normalizePort } from './utils';
import App from './app';

const port = normalizePort(process.env.PORT);

const server = http.createServer(App)

server.listen(port, () => {
  console.log(`${port} is the magic port!!`);
});

export default server;
