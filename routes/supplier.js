var express = require('express');
var router = express.Router();

const multiparty = require('multiparty');
const path = require('path');

const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

// 根据Id来查询供应商信息
router.get('/:id', async function (req, res) {
    let id = req.params.id;
    // console.log(_id);
    let data = await client.get('/supplier/' + id);
    res.send(data);
});

// 供货商的信息未注册时，添加供应商信息
router.post('/', async function (req, res) {
    let {
        supName,
        supAddr,
        supTel,
        supInternet,
        supLicense,
        supImg,
        supRemarks
    } = req.query;
    let data = await client.post('/supplier', {
        supName,
        supAddr,
        supTel,
        supInternet,
        supLicense,
        supImg,
        supRemarks,
        status: "0"
    })
    res.send(data);
});

// 供应商自己修改一些信息提交并重新审核
router.put('/:id', async function (req, res) {
    let id = req.params.id;
    let {
        supName,
        supAddr,
        supTel,
        supInternet,
        supLicense,
        supImg,
        supRemarks
    } = req.query;
    console.log(id, supName);
    let data = await client.put('/supplier/' + id, {
        supName,
        supAddr,
        supTel,
        supInternet,
        supLicense,
        supImg,
        supRemarks,
        status: "0"
    })
    res.send(data);
});

// 将完善后供应商ID绑定在供应商管理员身上
router.post("/user", async function (req, res) {
    let {
        _id,
        supplierId
    } = req.query;
    // console.log(_id,supplierId);
    let data = await client.put('/users/' + _id, {
        supplier: supplierId
    });
    res.send(data);
});

// 上传营业执照图片
router.post('/upload', function (req, res) {
    // console.log(req);
    let form = new multiparty.Form({
        uploadDir: './public/upload'
    });
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send(err);
        } else {
            res.send(path.basename(files[Object.keys(files)[0]][0].path));
        }
    });
});


module.exports = router;