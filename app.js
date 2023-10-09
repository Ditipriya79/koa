/* global._ = require('lodash')
global.path = require('path');
global.fs = require('fs');
global.moment = require('moment');*/

/* eslint no-console: 0 */

global.icplApp = {};
global.isProductionMode = false;
icplApp.appVersion = 1;

icplApp.appDisplayName = "Starter App";
require("dotenv").config();
const server = require("./server");
server.proxy = true;


const port = process.env.PVT_SALES_APP_PORT || 5000;

server.listen(port, () => console.log(`API server started on ${port}`));
