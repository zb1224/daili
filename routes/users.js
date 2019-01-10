var express = require('express');
var router = express.Router();

const session = require('express-session');
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");



module.exports = router;