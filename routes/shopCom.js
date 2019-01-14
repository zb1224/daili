var express = require('express');
var router = express.Router();
const session = require('express-session');
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");
const multiparty = require("multiparty");
const path = require("path");

// 显示所有商品
router.get("/", async function (req, res) {
    let { type, text, page, rows, shopId } = req.query;
    let seraObj = {};
    if (type == "findSupplierCom") {
        let dataSuppliersCom = await client.get("/supplierCom");
        res.send(dataSuppliersCom);
    } else {
        if (type) {
            seraObj = { [type]: text };//正则表达式
        }
        let data = await client.get("/shopCom", { page, rows, submitType: "findJoin", ref: ["shop","supplier"], "shop.$id": shopId, ...seraObj })
        res.send(data);
    }
})

// router.get("/", async function (req, res) {
//     let {
//         shopId
//     } = req.query;
//     let data = await client.get("/shopCom", {
//         submitType: "findJoin",
//         ref: "shop",
//         "shop.$id": shopId,
//     });
//     res.send(data);
// })

// 通过商品ID来查询商品
router.get('/:id', async function (req, res) {
    let { id } = req.params;
    console.log("111",req.params)
    let { type } = req.query
    console.log("111",req.query)
    if (type == "findSupplierComById") {
        // let data = await client.get('/supplierCom/' + id, { submitType: "findJoin", ref: "supplierCom" });
        let data = await client.get('/supplierCom/' + id, { submitType: "findJoin", ref: "shop" });
        res.send(data);
    } else {
        // let data = await client.get('/shopCom/' + id, { submitType: "findJoin", ref: "shopCom" });
        let data = await client.get('/shopCom/' + id, { submitType: "findJoin", ref: "shop" });
        
        res.send(data);
    }

})

//增加商品
router.post("/", async function (req, res) {
    let { comName, comKind, comComponent, comSpecifications, exclusiveSpecifications, packingSpecifications,
        Flavor, specialFunctions, place, dateProduction, qualityDate, supplyNumber, characteristicText, price,
        productBigImg, productSmallImg, shopComNum, type, shopId } = req.body;
    // productSmallImg = productSmallImg && JSON.parse(productSmallImg)
    if (type == "fromSupplierCom") {
        //data是一个数组
        let data = await client.post("/shopCom", {
            comName, comKind, comComponent, comSpecifications, exclusiveSpecifications, packingSpecifications,
            Flavor, specialFunctions, place, dateProduction, qualityDate, supplyNumber, characteristicText, price,
            productBigImg, productSmallImg, shopComNum, shop: {
                $ref: "shop",
                $id: shopId
            }
        })
        res.send(data);
    } else {
        let data = await client.post('/shopCom', {
            comName, comKind, comComponent, comSpecifications, exclusiveSpecifications, packingSpecifications,
            Flavor, specialFunctions, place, dateProduction, qualityDate, supplyNumber, characteristicText, price,
            productBigImg, productSmallImg, shopComNum, shop: {
                $ref: "shop",
                $id: shopId
            }
        });
        res.send(data);
    }

})

// 修改商品
router.put('/:id', async function (req, res, next) {
    let id = req.params.id
    let {
        comName, comKind, comComponent, comSpecifications, exclusiveSpecifications, packingSpecifications,
        Flavor, specialFunctions, place, dateProduction, qualityDate, supplyNumber, characteristicText, price,
        productBigImg, productSmallImg, shopComNum
    } = req.body
    // productSmallImg = productSmallImg && JSON.parse(productSmallImg)
    await client.put("/shopCom/" + id, {
        comName, comKind, comComponent, comSpecifications, exclusiveSpecifications, packingSpecifications,
        Flavor, specialFunctions, place, dateProduction, qualityDate, supplyNumber, characteristicText, price,
        productBigImg, productSmallImg, shopComNum
    })
    res.send({ status: 1 });
});

//删除供货商商品
router.delete('/:id', async function (req, res, next) {
    let id = req.params.id
    await client.delete("/shopCom/" + id)
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