var express = require('express');
var router = express.Router();
const session = require('express-session');
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");


//查询
router.get("/", async function (req, res) {
    let { type, text, page, rows,usersId } = req.query;
    let seraObj = {};
    let data;
    if (type) {
        seraObj = { status: "1", [type]: text };//正则表达式
    }
    if(usersId){
        data = await client.get("/shop", { page, rows, ...seraObj, submitType: "findJoin", ref: ["users"],"users.$id": usersId })
    }else{
        data = await client.get("/shop", { page, rows, ...seraObj, submitType: "findJoin", ref: ["users"] })
    }
    res.send(data);
})

//通过ID查询
router.get("/:id", async function (req, res) {
    let id = req.params.id;
    let data = await client.get("/shop/" + id, { submitType: "findJoin", ref: ["users"] });
    res.send(data);
})

//增加
router.post("/", async function (req, res) {
    let { shopName, LicenseNumber, LicenseiImg, addr, Location, city, legalPerson, Tel, indexImg, characteristic, VIPLeve, Commission, status, Employee, users } = req.body;
    let data = await client.post("/shop", {
        shopName, LicenseNumber, LicenseiImg, addr, Location, city, legalPerson, Tel, indexImg, characteristic, VIPLeve, Commission, status, Employee, users: {
            $ref: "users",
            $id: users,
        }
    });
    res.send({ status: 1 });
});


//修改状态至已关闭
router.delete("/:id", async function (req, res) {
    let id = req.params.id;
    await client.delete("/shop/" + id);
    res.send({ status: 1 });
})

//修改
router.put("/:id", async function (req, res) {
    let id = req.params.id;
    let { shopName, LicenseNumber, LicenseiImg, addr, Location, city, legalPerson, Tel, indexImg, characteristic, VIPLeve, Commission, status, Employee, users } = req.body;
    console.log("状态：", status)
    await client.put("/shop/" + id, {
        shopName, LicenseNumber, LicenseiImg, addr, Location, city, legalPerson, Tel, indexImg, characteristic, VIPLeve, Commission, status, Employee, users: {
            $ref: "users",
            $id: users,
        }
    });
    res.send({ status: 1 });
})


module.exports = router;
