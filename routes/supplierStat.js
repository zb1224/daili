var express = require("express");
var router = express.Router();
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

// 统计各个商品的采购量
router.get("/", async function (req, res) {
    let store = [];
    let num = [];
    let { supplierId } = req.query;
    // console.log(supplierId, "前端传过来的id");
    let shopData = await client.get("/shop");
    let data = await client.get("/shopCom", {
        submitType: "findJoin",
        ref: "suppiler",
        "supplier.$id": supplierId
    });
    // console.log(shopData, "门店的数据");
    // console.log("对应供应商的所有数据", data);
    let obj = {};
    for (let i = 0; i < data.length; i++) {
        obj.number = data[i].shopComNum;
        obj.name = data[i].comName;
        for (let j = i + 1; j < data.length; j++) {
            if (data[i].comName == data[j].comName) {
                obj.number += data[j].shopComNum;
                data.splice(j, 1);
                j--;
            }
        }
        num.push(obj);
        obj = {}
    }
    res.send(num);
});

// 统计各个商品的销售量
router.get("/SalesVolume", async function (req, res) {
    let { supplierId } = req.query;  //获取供应商的ID
    // console.log(supplierId)
    let odData = await client.get("/orders")//获取所有的订单信息
    let commoditysData = await client.get("/shopCom", {
        submitType: "findJoin",
        ref: "suppiler",
        "supplier.$id": supplierId,
    }) //查询来自门店商品中该供应商的所有商品
    let newArr = [];
    for (let i = 0; i < commoditysData.length; i++) {
        for (let j = 0; j < odData.length; j++) {
            for (let k = 0; k < odData[j].orderCommoditys.length; k++) {
                if (odData[j].orderStatus == "已支付") {
                    if (commoditysData[i]._id == odData[j].orderCommoditys[k].commodityId) {
                        if (newArr.length == 0) {
                            newArr.push({ "name": odData[j].orderCommoditys[k].commodityName, "nums": odData[j].orderCommoditys[k].commodityCondition })
                        } else {
                            for (let n = 0; n < newArr.length; n++) {
                                if (odData[j].orderCommoditys[k].commodityName == newArr[n].name) {
                                    newArr[n].nums = parseInt(newArr[n].nums) + parseInt(odData[j].orderCommoditys[k].commodityCondition);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(newArr)
    res.send(newArr);
})
module.exports = router;

