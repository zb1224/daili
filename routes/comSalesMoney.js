var express = require('express');
var router = express.Router();
const session = require('express-session');
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

// 店铺所有商品近6个月的月销售额统计
router.get('/', async function (req, res) {
    let { trueTime, shopId } = req.query;
    console.log("trueTime", trueTime)
    // let data = await client.get("/shopCom", { page, rows, submitType: "findJoin", ref: ["shop","supplier"], "shop.$id": shopId, ...seraObj })
    let data = await client.get("/orders", { submitType: "findJoin", ref: ["shop","petMaster"], "shop.$id": shopId, });
    let axisData = ["近1个月", "近2个月", "近3个月", "近4个月", "近5个月", "近6个月"];
    let seriesData = [{ name: "近1个月", value: 0 }, { name: "近2个月", value: 0 }, { name: "近3个月", value: 0 }, { name: "近4个月", value: 0 }, { name: "近5个月", value: 0 }, { name: "近6个月", value: 0 }];
    let splitTrueTime = trueTime.split("/")
    // splitTrueTime=["2019","3","1"]
    console.log("splitTrueTime", splitTrueTime)
    let Arr=[];
    for (let i = 1; i <= 6; i++) {
        let year =parseInt(splitTrueTime[0]) 
        let month =parseInt(splitTrueTime[1]) 
        if (month-i <= 0) {
            year = year - 1;
            month = month + 12 - i ;
        }else{
            month=month-i
        }
        Arr.push({year,month})
    }
    console.log("Arr",Arr)
    data.forEach(function (ele) {
        if (ele.orderContent == "购买商品") {
            
if(ele.buyTime.split("/")[0]==Arr[0].year&&ele.buyTime.split("/")[1]==Arr[0].month){
    for (let i = 0; i < ele.orderCommoditys.length; i++) {
        seriesData[0].value += ele.orderCommoditys[i].commodityCondition * ele.orderCommoditys[i].commodityPrice;
    }
}else if(ele.buyTime.split("/")[0]==Arr[1].year&&ele.buyTime.split("/")[1]==Arr[1].month){
    for (let i = 0; i < ele.orderCommoditys.length; i++) {
        seriesData[1].value += ele.orderCommoditys[i].commodityCondition * ele.orderCommoditys[i].commodityPrice;
    }
}else if(ele.buyTime.split("/")[0]==Arr[2].year&&ele.buyTime.split("/")[1]==Arr[2].month){
    for (let i = 0; i < ele.orderCommoditys.length; i++) {
        seriesData[2].value += ele.orderCommoditys[i].commodityCondition * ele.orderCommoditys[i].commodityPrice;
    }
}else if(ele.buyTime.split("/")[0]==Arr[3].year&&ele.buyTime.split("/")[1]==Arr[3].month){
    for (let i = 0; i < ele.orderCommoditys.length; i++) {
        seriesData[3].value += ele.orderCommoditys[i].commodityCondition * ele.orderCommoditys[i].commodityPrice;
    }
}else if(ele.buyTime.split("/")[0]==Arr[4].year&&ele.buyTime.split("/")[1]==Arr[4].month){
    for (let i = 0; i < ele.orderCommoditys.length; i++) {
        seriesData[4].value += ele.orderCommoditys[i].commodityCondition * ele.orderCommoditys[i].commodityPrice;
    }
}else if(ele.buyTime.split("/")[0]==Arr[5].year&&ele.buyTime.split("/")[1]==Arr[5].month){
    for (let i = 0; i < ele.orderCommoditys.length; i++) {
        seriesData[5].value += ele.orderCommoditys[i].commodityCondition * ele.orderCommoditys[i].commodityPrice;
    }
}
        }
        console.log(ele.buyTime)
    });
    res.send({ axisData, seriesData });
});

module.exports = router;