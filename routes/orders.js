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
        petMasterId
    } = req.query;
    console.log(type, value, page, rows, shopID);
    let seraObj = {};
    if (type) {
        seraObj = {
            [type]: value,
        }; //正则表达式
    }
    let data
    if (shopId) {
        data = await client.get("/orders", {
            page, rows, submitType: "findJoin", ref: ["shop", "petMaster"],
            "shop.$id": shopId,
            ...seraObj,
        });
    } else if (petMasterId) {
        data = await client.get("/orders", {
            page, rows, submitType: "findJoin", ref: ["shop", "petMaster"],
            "petMaster.$id": petMasterId,
            ...seraObj,
        });
    } else {
        data = await client.get("/orders", {
            page, rows, submitType: "findJoin", ref: ["shop", "petMaster"],
            ...seraObj,
        });
    }
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
        petMaster: {
            $ref: "petMaster",
            $id: petMasterID,
        },
       
        orderContent,
        orderCommoditys: JSON.parse(orderCommoditys),
        orderStatus,
        buyTime,
        status: "0",
    });
    // console.log(data);
    res.send(data);
});

//通过ID查询
router.get("/:id", async function (req, res) {
    let id = req.params.id;
    let data = await client.get("/orders/" + id);
    res.send(data);
})

//修改订单
router.put('/:id',async function (req, res) {
    let  id  = req.params.id;
    let {petMasterID,orderContent, orderCommoditys,orderStatus, buyTime} =req.body;
    let data=await client.put("/orders/"+id,{petMasterID,orderContent, orderCommoditys,orderStatus, buyTime});
    // db.collection("students").update({ _id: db.ObjectID(id) }, { id }, function () {
        res.send({ status: 1 })
    })

    //统计订单的路由
    // router.get('/dingdanTotal',async function(req,res){
    //     let {type,value} = req.query;
    //     let serviceData = await client.get("/orders");
    //     // console.log("classesData",studentData);
    //     let axisData = [];
    //     let seriesData = [];
    //     if(type==year){
    //         serviceData.forEach(function(ele){
    //             console.log("ele",ele)
    //             axisData.push(ele.serviceName);
    //             seriesData.push(5,10,8);
    //         });
    //     }
       
       
    //     //统计每个服务的个数
    //     res.send({axisData,seriesData});
    // });    
module.exports = router;