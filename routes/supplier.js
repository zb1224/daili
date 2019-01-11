var express = require('express');
var router = express.Router();
const session = require('express-session');
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");


//查询
router.get("/", async function (req, res) {
  let { type, text, page, rows } = req.query;
  console.log("1", type)
  console.log("2", text)
  console.log("3", page)
  console.log("4", rows)
  let seraObj = {};
  if (type) {
    seraObj = { status: "1", [type]: text };//正则表达式
  }
  let data = await client.get("/supplier", { page, rows, ...seraObj,submitType: "findJoin", ref: ["users"] })
  res.send(data);
})

//通过ID查询
router.get("/:id", async function (req, res) {
  let id = req.params.id;
  let data = await client.get("/supplier/" + id, { submitType: "findJoin", ref: ["users"] });
  res.send(data);
})

//增加
router.post("/", async function (req, res) {
  let { supName, supAddr, supTel, supInternet, supLicense, supImg, supRemarks,status, users } = req.body;
  let data = await client.post("/supplier", {
    supName, supAddr, supTel, supInternet, supLicense, supImg, supRemarks,status, users: {
      $ref: "users",
      $id: users,
    }
  });
  res.send({ status: 1 });
});


//删除
router.delete("/:id", async function (req, res) {
  let id = req.params.id;
  await client.delete("/supplier/" + id);
  res.send({ status: 1 });
})

//修改
router.put("/:id", async function (req, res) {
  let id = req.params.id;
  let { supName, supAddr, supTel, supInternet, supLicense, supImg, supRemarks,status, users } = req.body;
  await client.put("/supplier/" + id, {
    supName, supAddr, supTel, supInternet, supLicense, supImg, supRemarks,status, users: {
      $ref: "users",
      $id: users,
    }
  });
  res.send({ status: 1 });
})


module.exports = router;