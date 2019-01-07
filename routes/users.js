var express = require('express');
var router = express.Router();
const session = require('express-session');
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");
//登录
router.post('/login', async function (req, res) {
  let {
    phone,
    pwd
  } = req.body;
  let data = await client.get("/users", {
    phone,
    pwd,
    findType: "exact"
  })
  if (data.length > 0) {
    req.session.user = data[0];
    console.log("data", data[0])
    res.send({
      status: 1,
      user: data[0]
    });
  } else {
    res.send({
      status: 0,
      user: {}
    });
  }
});

//cha
router.get("/", async function (req, res) {
  let {
    type,
    text,
    page,
    rows
  } = req.query;
  let seraObj = {};
  if (type) {
    seraObj = {
      [type]: text
    }; //正则表达式
  }
  let data = await client.get("/users", {
    page,
    rows,
    ...seraObj
  })
  res.send(data);
})

//通过ID查询
router.get("/:id", async function (req, res) {
  let id = req.params.id;
  let data = await client.get("/users/" + id);
  res.send(data);
})

//增加
router.post("/", async function (req, res) {
  let {
    phone,
    pwd,
    name
  } = req.body;
  let data = await client.post("/users", {
    phone,
    pwd,
    name
  });
  res.send({
    status: 1
  });
});


//删除
router.delete("/:id", async function (req, res) {
  let id = req.params.id;
  await client.delete("/users/" + id);
  res.send({
    status: 1
  });
})

//修改
router.put("/:id", async function (req, res) {
  let id = req.params.id;
  let {
    phone,
    pwd,
    name
  } = req.body;
  await client.put("/users/" + id, {
    phone,
    pwd,
    name
  });
  res.send({
    status: 1
  });
})


module.exports = router;