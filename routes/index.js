var express = require('express');
var router = express.Router();

const session = require('express-session');
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

// 用户登录
router.post('/login', async function (req, res) {
    let {
        logTel,
        logPwd
    } = req.body;
    let data = await client.get("/users", {
        logTel,
        logPwd,
        findType: "exact"
    });
    req.session.user = data[0];
    res.send(data);
});

// 用户注册
router.post("/", async function (req, res) {
    let {
        Name,
        logPwd,
        logTel,
        logEmail,
        attribute,
    } = req.body;
    let data = await client.post('/users', {
        Name,
        logPwd,
        logTel,
        logEmail,
        attribute,
        status: 0,
    });
    res.send(data);
});

module.exports = router;