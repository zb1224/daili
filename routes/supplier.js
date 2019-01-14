var express = require('express');
var router = express.Router();
const multiparty = require('multiparty');
const path = require('path');
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
    let data = await client.get("/supplier", { page, rows, ...seraObj, submitType: "findJoin", ref: ["users"]})
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
    let { supName, supAddr, supTel, supInternet, supLicense, supImg, supRemarks, status, users } = req.body;
    let data = await client.post("/supplier", {
        supName, supAddr, supTel, supInternet, supLicense, supImg, supRemarks, status, users: {
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
    let { supName, supAddr, supTel, supInternet, supLicense, supImg, supRemarks, status, users } = req.body;
    await client.put("/supplier/" + id, {
        supName, supAddr, supTel, supInternet, supLicense, supImg, supRemarks, status, users: {
            $ref: "users",
            $id: users,
        }
    });
    res.send({ status: 1 });
})


// 显示供货商信息
// router.get('/', async function (req, res) {
//     let { type, text, page, rows } = req.query;
//     let serObj = {};
//     if (type) {
//         serObj[type] = { [type]: value };
//     }
//     let data = await client.get('/supplier', { page, rows, submitType: "findJoin", ref: "users", ...serObj })
//     res.send(data);
// })

// 根据Id来查询供应商信息
// router.get('/:id', async function (req, res) {
//     let id = req.params.id;
//     // console.log(_id);
//     let data = await client.get('/supplier/' + id);
//     res.send(data);
// });

// 供货商的信息未注册时，添加供应商信息
// router.post('/', async function (req, res) {
//     let {
//         supName,
//         supAddr,
//         supTel,
//         supInternet,
//         supLicense,
//         supImg,
//         supRemarks
//     } = req.query;
//     let data = await client.post('/supplier', {
//         supName,
//         supAddr,
//         supTel,
//         supInternet,
//         supLicense,
//         supImg,
//         supRemarks,
//         status: "0"
//     })
//     res.send(data);
// });

// 供应商自己修改一些信息提交并重新审核
// router.put('/:id', async function (req, res) {
//     let id = req.params.id;
//     let {
//         supName,
//         supAddr,
//         supTel,
//         supInternet,
//         supLicense,
//         supImg,
//         supRemarks
//     } = req.query;
//     console.log(id, supName);
//     let data = await client.put('/supplier/' + id, {
//         supName,
//         supAddr,
//         supTel,
//         supInternet,
//         supLicense,
//         supImg,
//         supRemarks,
//         status: "0"
//     })
//     res.send(data);
// });

// 将完善后供应商ID绑定在供应商管理员身上
// router.post("/user", async function (req, res) {
//     let {
//         _id,
//         supplierId
//     } = req.query;
//     // console.log(_id,supplierId);
//     let data = await client.put('/users/' + _id, {
//         supplier: supplierId
//     });
//     res.send(data);
// });

// 上传营业执照图片
// router.post('/upload', function (req, res) {
//     // console.log(req);
//     let form = new multiparty.Form({
//         uploadDir: './public/upload'
//     });
//     form.parse(req, function (err, fields, files) {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(path.basename(files[Object.keys(files)[0]][0].path));
//         }
//     });
// });

module.exports = router;
