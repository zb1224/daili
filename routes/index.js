var express = require('express');
var router = express.Router();
const session = require('express-session');
const client = require("ykt-http-client");
const path = require("path");
const multiparty = require("multiparty");
client.url("127.0.0.1:8080");

//获取session
router.get('/getSession', function (req, res) {
    let user = req.session.user
    res.send(user || {});
});

//删除session
router.get('/removeSession', function (req, res) {
    req.session.user = null;
    res.send({ status: 1 });
});

//登录
router.post('/login', async function (req, res) {
    let { logTel, logPwd } = req.body;
    let data = await client.get("/users", { logTel, logPwd, findType: "exact" })
    if (data.length > 0) {
        req.session.user = data[0];
        console.log("data", data[0])
        res.send({
            status: 1,
            user: data[0]
        });
    } else {
        res.send({
            status: 0,
            user: {}
        });
    }
});

//注册验证
router.get('/', async function (req, res) {
    let { logTel } = req.query;
    let data = await client.get("/users", { logTel, findType: "exact" })
    console.log(data)
    if (data.length > 0) {
        res.send({
            data: data[0],
            status: 0
        });
    } else {
        res.send({
            data: data,
            status: 1
        });
    }
});

//上传图片
router.post('/upload', function (req, res) {
    let form = new multiparty.Form({
        uploadDir: "./public/upload"
    })
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send(err)
        } else {
            res.send(path.basename(files[Object.keys(files)[0]][0].path))
        }
    })
});

module.exports = router;
