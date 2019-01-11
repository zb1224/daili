var express = require('express');
var router = express.Router();

const multiparty = require("multiparty");
const path = require("path");
const session = require('express-session');
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

// 显示所有商品
router.get("/", async function (req, res) {
    let { type, text, page, rows } = req.query;
    let seraObj = {};
    if (type) {
        seraObj = { [type]: text };//正则表达式
    }
    let data = await client.get("/supplierCom", { page, rows, ...seraObj })
    res.send(data);
});

// 通过商品ID来查询商品
router.get('/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get('/supplierCom/' + id, { submitType: "findJoin", ref: "classes" });
    res.send(data);
})

//增加商品
router.post("/", async function (req, res) {
    let { comName, comKind, comComponent, comSpecifications, exclusiveSpecifications, packingSpecifications,
        Flavor, specialFunctions, place, dateProduction, qualityDate, supplyNumber, characteristicText, price,
        productBigImg, productSmallImg } = req.body;
    productSmallImg = productSmallImg && JSON.parse(productSmallImg)
    await client.post('/supplierCom', {
        comName, comKind, comComponent, comSpecifications, exclusiveSpecifications, packingSpecifications,
        Flavor, specialFunctions, place, dateProduction, qualityDate, supplyNumber, characteristicText, price,
        productBigImg, productSmallImg
    });
    res.send({ status: 1 });
})

// 修改商品
router.put('/:id', async function (req, res, next) {
    let id = req.params.id
    let {
        comName, comKind, comComponent, comSpecifications, exclusiveSpecifications, packingSpecifications,
        Flavor, specialFunctions, place, dateProduction, qualityDate, supplyNumber, characteristicText, price,
        productBigImg
    } = req.body
    // productSmallImg = productSmallImg && JSON.parse(productSmallImg)
    await client.put("/supplierCom/" + id, {
        comName, comKind, comComponent, comSpecifications, exclusiveSpecifications, packingSpecifications,
        Flavor, specialFunctions, place, dateProduction, qualityDate, supplyNumber, characteristicText, price,
        productBigImg
        // supplier: {
        //     $ref: "supplier",
        //     $id: supplierId
        // }
    })
    res.send({ status: 1 });
});

//删除供货商商品
router.delete('/:id', async function (req, res, next) {
    let id = req.params.id
    await client.delete("/supplierCom/" + id)
    res.send({ status: 1 });
});

// 上传产品首页图片
router.post("/upload", function (req, res) {
    let form = new multiparty.Form({
        uploadDir: "./public/upload"
    });
    form.parse(req, function (err, fields, files) {
        console.log(Object.keys(files)[0]);
        if (err) {
            res.send(err);
        } else {
            res.send(path.basename(files[Object.keys(files)[0]][0].path));
        }
    });
});



module.exports = router;