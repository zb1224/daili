var express = require('express');
var router = express.Router();

const session = require('express-session');
const client = require("ykt-http-client");
const path = require("path");
const multiparty = require("multiparty");
client.url("127.0.0.1:8080");


// 查询用户信息
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
        status: "0",
    });
    res.send(data);
});

// 查询用户信息
// router.get("/", async function (req, res) {
//     let {
//         logTel
//     } = req.query;
//     let data = await client.get('/users', {
//         logTel
//     });
//     res.send(data);
// });

// 获取session
router.get('/getSession', function (req, res) {
    let data = req.session.user;
    // console.log(data);
    res.send(data || {});
});
// 删除session
router.get('/removeSession', function (req, res) {
    req.session.user = null;
    res.send('删除成功');
});

module.exports = router;
