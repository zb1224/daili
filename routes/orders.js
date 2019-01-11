var express = require('express');
var router = express.Router();

const multiparty = require("multiparty");
const path = require("path");
const session = require('express-session');

const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

// 显示订单
router.get("/", async function (req, res) {
    let {
        type,
        value,
        page,
        rows,
        shopID,
    } = req.query;
    console.log(type, value, page, rows, shopID);
    let seraObj = {};
    if (type) {
        seraObj = {
            [type]: value,
        }; //正则表达式
    }
    let data = await client.get("/orders", {
        page,
        rows,
        submitType: "findJoin",
        ref: "shop",
        "shop.$id": shopID,
        ...seraObj,
    });
    res.send(data);
});

// 增加订单
router.post("/", async function (req, res) {
    let {
        shopID,
        petMasterID,
        orderContent,
        orderCommoditys,
        orderStatus,
        buyTime,
    } = req.body;
    let data = await client.post("/orders", {
        shop: {
            $ref: "shop",
            $id: shopID,
        },
        petMasterID,
        orderContent,
        orderCommoditys: JSON.parse(orderCommoditys),
        orderStatus,
        buyTime,
        status: "0",
    });
    // console.log(data);
    res.send(data);
});

module.exports = router;