var express = require('express');
var router = express.Router();
const session = require('express-session');
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

router.get('/', async function (req, res) {
    let {shopId} = req.query;
    let data = await client.get("/orders", { submitType: "findJoin", ref: ["shop", "petMaster"], "shop.$id": shopId, });
    // console.log("classesData",studentData);
    // let axisData = ["狗粮", "猫粮", "鱼食", "其他"];
    // let seriesData = [{ name: "狗粮", value: 0 }, { name: "猫粮", value: 0 }, { name: "鱼食", value: 0 }, { name: "其他", value: 0 }];
    let dogFoodObj = { type: "狗粮", year2019: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 }, year2018: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 } };
    let catFoodObj = { type: "猫粮", year2019: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 }, year2018: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 } };
    let fishFoodObj = { type: "鱼食", year2019: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 }, year2018: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 } };
    let otherFoodObj = { type: "其他", year2019: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 }, year2018: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 } };
    data.forEach(function (item) {
        if (item.orderContent == "购买商品") {
            if (item.buyTime.split("/")[0] == 2019) {
                if (item.buyTime.split("/")[1] == "1") {
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month1 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month1 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month1 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month1 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "2"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month2 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month2 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month2 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month2 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "3"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month3 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month3 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month3 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month3 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "4"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month4 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month4 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month4 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month4 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "5"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month5 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month5 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month5 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month5 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "6"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month6 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month6 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month6 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month6 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "7"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month7 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month7 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month7 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month7 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "8"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month8 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month8 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month8 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month8 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "9"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month9 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month9 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month9 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month9 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "10"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month10 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month10 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month10 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month10 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "11"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month11 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month11 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month11 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month11 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else {
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month12 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month12 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month12 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month12 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }
            }else if(item.buyTime.split("/")[0] == 2018){
                if (item.buyTime.split("/")[1] == "1") {
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month1 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month1 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month1 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month1 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "2"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month2 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month2 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month2 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month2 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "3"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month3 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month3 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month3 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month3 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "4"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month4 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month4 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month4 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month4 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "5"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month5 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month5 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month5 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month5 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "6"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month6 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month6 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month6 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month6 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "7"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month7 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month7 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month7 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month7 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "8"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month8 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month8 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month8 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month8 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "9"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month9 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month9 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month9 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month9 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "10"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month10 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month10 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month10 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month10 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else if(item.buyTime.split("/")[1] == "11"){
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month11 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month11 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month11 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month11 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }else {
                    for (let i = 0; i < item.orderCommoditys.length; i++) {
                        if (item.orderCommoditys[i].commodityName == "狗粮") {
                            dogFoodObj.year2019.month12 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "猫粮") {
                            catFoodObj.year2019.month12 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else if (item.orderCommoditys[i].commodityName == "鱼食") {
                            fishFoodObj.year2019.month12 += parseInt(item.orderCommoditys[i].commodityCondition)
                        } else {
                            otherFoodObj.year2019.month12 += parseInt(item.orderCommoditys[i].commodityCondition)
                        }
                    }
                }
            }
            // if (ele.buyTime.split("/")[1] == 1) {
            //     for (let i = 0; i < ele.orderCommoditys.length; i++) {
            //         if (ele.orderCommoditys[i].commodityName == "狗粮") {
            //             seriesData[0].value += parseInt(ele.orderCommoditys[i].commodityCondition)
            //         } else if (ele.orderCommoditys[i].commodityName == "猫粮") {
            //             seriesData[1].value += parseInt(ele.orderCommoditys[i].commodityCondition)
            //         } else if (ele.orderCommoditys[i].commodityName == "鱼食") {
            //             seriesData[2].value += parseInt(ele.orderCommoditys[i].commodityCondition)
            //         } else {
            //             seriesData[3].value += parseInt(ele.orderCommoditys[i].commodityCondition)
            //         }
            //     }
            // } 

        }
        // axisData.push(ele.name);
        // seriesData.push(ele.count);
    });

    //统计每个班级的人数
    res.send([dogFoodObj,catFoodObj,fishFoodObj,otherFoodObj]);
});


module.exports = router;