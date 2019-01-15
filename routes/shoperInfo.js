var express = require('express');
var router = express.Router();
const session = require('express-session');
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");
const multiparty = require("multiparty");
const path = require("path");

//增加店铺信息
router.post("/", async function (req, res) {
    let { shopName, LicenseNumber, LicenseiImg, addr, Location, city, legalPerson, Tel, indexImg, characteristic, VIPLeve, Commission, status, Employee, usersId } = req.body;
    let data = await client.post("/shop", {
        shopName, LicenseNumber, LicenseiImg, addr, Location, city, legalPerson, Tel, indexImg, characteristic, VIPLeve, Commission, status, Employee, users: {
            $ref: "users",
            $id: usersId
        }
    });
    res.send(data);

});

router.get("/", async function (req, res) {
    let { type, text, page, rows, usersId } = req.query;
    let seraObj = {};
        if (type) {
            seraObj = { [type]: text };//正则表达式
        }
        let data = await client.get("/shopCom", { page, rows, submitType: "findJoin", ref: "users", "users.$id": usersId, ...seraObj })
        res.send(data);
    
})


//修改店员(修改店铺信息)
router.put("/:id", async function (req, res) {
    let id = req.params.id;
    let { shopName, LicenseNumber, LicenseiImg, addr, Location, city, legalPerson, Tel, indexImg, characteristic, VIPLeve, Commission, status, Employee, usersId } = req.body;
    let data = await client.put("/shop/" + id, {  shopName, LicenseNumber, LicenseiImg, addr, Location, city, legalPerson, Tel, indexImg, characteristic, VIPLeve, Commission, status, Employee, users: {
        $ref: "users",
        $id: usersId
    } });
    console.log(data)
    res.send(data);
})
// 查询店铺信息(按id查询)
router.get('/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get("/shop/" + id,{submitType:"findJoin",ref:"users"});
      res.send(data);
  })


//  上传文件  这里必须写post
router.post("/upload", function (req, res) {
    let form = new multiparty.Form({
        uploadDir: "./public/upload"
    });

    form.parse(req, function (err, fields, files) {
        console.log(files);
        let key = Object.keys(files)[0];   // 获取一个对象中的属性名
        if (err) {
            res.send(err);
        } else {
            res.send(path.basename(files[key][0].path));
        }
    });
});


module.exports = router;