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
        // console.log("type",type,value);
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

 //统计服务的路由(销量)
    router.get('/serviceTotal',async function(req,res){
        let {type,value} = req.query;
        let serviceData = await client.get("/service");
        // console.log("type,value",type,value);
        let data=[];
        if(type=="年"){
            serviceData.forEach(function(ele){
                // console.log("ele",ele)      
                let namecountdata={count:0};      
                namecountdata.name=ele.serviceName
                let time=ele.serviceTime.split("-")[0]
                if(time.split("/")[0]==value){
                    namecountdata.count++;
                    data.push(namecountdata)
                }
            });
        }else if(type=="月"){
            serviceData.forEach(function(ele){
                // console.log("ele",ele)      
                let namecountdata={count:0};      
                namecountdata.name=ele.serviceName
                let time=ele.serviceTime.split("-")[0]
                if(time.split("/")[1]==value){
                    namecountdata.count++;
                    data.push(namecountdata)
                }
            });
    }
        //统计每个服务的个数
        console.log("data",data)
        res.send(data);
    });    

//统计服务的路由(销售额)
router.get('/salesvolume',async function(req,res){
    let {time} = req.query;
    let serviceData = await client.get("/service");
    // console.log("time",time);
    let data=[];
    serviceData.forEach(function(ele){
        // console.log("ele",ele)  
        let salesvolumedata={};    
        salesvolumedata.name=ele.serviceName
        let serviceTime=ele.serviceTime.split("-")[0];
        let serviceTimemonth=serviceTime.split("/")[1];
        let xtmonth=time.split("/")[1];
        let xtyear=time.split("/")[0];
        if(xtmonth>=6&&xtmonth<=12){
            if(xtmonth-6<serviceTimemonth&&serviceTimemonth<=xtmonth)
            salesvolumedata.price=ele.price
            data.push(salesvolumedata)
        }else{
            if(xtmonth==5){
                if(serviceTimemonth==5||serviceTimemonth==4||serviceTimemonth==3||serviceTimemonth==2||serviceTimemonth==1||serviceTimemonth==12){
                    salesvolumedata.price=ele.price
                    data.push(salesvolumedata)
                }
            }else if(xtmonth==4){
                if(serviceTimemonth==4||serviceTimemonth==3||serviceTimemonth==2||serviceTimemonth==1||serviceTimemonth==12||serviceTimemonth==11){
                    salesvolumedata.price=ele.price
                     data.push(salesvolumedata)
                }
            }else if(xtmonth==3){
                if(serviceTimemonth==3||serviceTimemonth==2||serviceTimemonth==1||serviceTimemonth==12||serviceTimemonth==11||serviceTimemonth==10){
                    salesvolumedata.price=ele.price
                    data.push(salesvolumedata)
                }
            }else if(xtmonth==2){
                if(serviceTimemonth==2||serviceTimemonth==1||serviceTimemonth==12||serviceTimemonth==11||serviceTimemonth==10||serviceTimemonth==9){
                    salesvolumedata.price=ele.price
                    data.push(salesvolumedata)
                }
            }else if(xtmonth==1){
                console.log("一月风")
                if(serviceTimemonth==1||serviceTimemonth==12||serviceTimemonth==11||serviceTimemonth==10||serviceTimemonth==9||serviceTimemonth==8){
                    salesvolumedata.price=ele.price
                    data.push(salesvolumedata)
                }
            }
        }
    });
    //统计每个服务的销售额
    console.log("data",data)
    res.send(data);
});    

    //获取session
router.get('/getSession', function (req, res) {
    //  res.send("获取session:"+req.session.phone)
    // console.log(req.session.name)
    res.send(req.session)
  })
  //删除session
  router.get('/removeSession', function (req, res) {
    req.session.name = null;
    res.send("删除成功");
  })
module.exports = router;