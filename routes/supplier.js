var express = require('express');
var router = express.Router();
const session = require('express-session');
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

// 显示供货商信息
router.get('/', async function (req, res) {
    let { type, text, page, rows } = req.query;
    let serObj = {};
    if (type) {
        serObj[type] = { [type]: value };
    }
    let data = await client.get('/supplier', { page, rows, submitType: "findJoin", ref: "users", ...serObj })
    res.send(data);
})




module.exports = router;