var express = require('express');
var router = express.Router();
const session = require('express-session');
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

//增加服务
router.post('/',async function (req, res) {
    let { serviceName, serviceType,serviceTime,appropriateSpec,serviceSpec,time,serviceLeve,price,shopId } = req.body;
    // console.log("servicetime",serviceTime)
    let data=await client.post("/service",{serviceName, serviceType,serviceTime,appropriateSpec,serviceSpec,time,serviceLeve,price,shop:{
        $ref:"shop",
        $id:shopId,
    }});
    // db.collection("students").insert({ name, gender, age, src }, function () {
        res.send({ status: 1 })
    });

//修改服务
router.put('/:id',async function (req, res) {
    let  id  = req.params.id;
    let {serviceName, serviceType,serviceTime,appropriateSpec,serviceSpec,time,serviceLeve,price} =req.body;
    let data=await client.put("/service/"+id,{serviceName, serviceType,serviceTime,appropriateSpec,serviceSpec,time,serviceLeve,price});
    // db.collection("students").update({ _id: db.ObjectID(id) }, { id }, function () {
        res.send({ status: 1 })
    })
//查询服务
router.get('/',async function (req, res) {
    let { page, rows, type, value } = req.query; 
        console.log("type",type,value);
    let searchObj = {};
    if (type) {
            searchObj = { [type]: value }
     }
    let data=await client.get("/service",{page,rows,...searchObj,});
        // db.collection("students").findByPage(page, rows, searchObj, function (data) {
        res.send(data);
    })
//删除服务
router.delete('/:id',async function (req, res) {
    let id = req.params.id;
    let data=await client.delete("/service/"+id);
    // db.collection("students").remove({ _id: db.ObjectID(id) }, function () {
        res.send({ status: 1 });
    })

//     //获取session
// router.get('/getSession', function (req, res) {
//     //  res.send("获取session:"+req.session.phone)
//     // console.log(req.session.name)
//     res.send(req.session)
//   })
//   //删除session
//   router.get('/removeSession', function (req, res) {
//     req.session.name = null;
//     res.send("删除成功");
//   })
module.exports = router;