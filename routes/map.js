var express = require('express');
var router = express.Router();
const session = require('express-session');
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

// 获取各个城市的店铺数
router.get("/cityShopNum", async function (req, res) {
    let data = await client.get("/shop", { submitType: "findJoin", ref: ["users"] })
    let wluqNum = 0, ktNum = 0, aksNum = 0, klmyNum = 0, cdNum = 0, myNum = 0, dyNum = 0
    data.forEach((item) => {
        if (item.city[1] == "乌鲁木齐市") {
            wluqNum++
        } else if (item.city[1] == "奎屯市") {
            ktNum++
        } else if (item.city[1] == "阿克苏市") {
            aksNum++
        } else if (item.city[1] == "克拉玛依市") {
            klmyNum++
        } else if (item.city[1] == "成都市") {
            cdNum++
        } else if (item.city[1] == "德阳市") {
            myNum++
        } else if (item.city[1] == "绵阳市") {
            dyNum++
        }
    });
    let shopsshopCityLocationArr = [
        [87.61, 43.83, wluqNum, "乌鲁木齐市"],
        [84.91, 44.43, ktNum, "奎屯市"],
        [80.27, 41.17, aksNum, "阿克苏市"],
        [84.90, 45.59, klmyNum, "克拉玛依市"],
        [104.06, 30.67, cdNum, "成都市"],
        [104.40, 31.13, myNum, "德阳市"],
        [104.69, 31.48, dyNum, "绵阳市"],
    ];
    res.send(shopsshopCityLocationArr);
});

router.get("/cityShopLocation",async function (req, res) {
    let data = await client.get("/shop", { submitType: "findJoin", ref: ["users"] })
    let shopsArr = [];
    data.forEach(function (item) {
        let shopArr = [parseInt(item.Location.latitude), parseInt(item.Location.longitude), item.shopName, item.addr]
        shopsArr.push(shopArr)
    })
    res.send(shopsArr);
});
module.exports = router;
