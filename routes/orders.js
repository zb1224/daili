var express = require('express');
var router = express.Router();

const multiparty = require("multiparty");
const path = require("path");
const session = require('express-session');
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

router.get('/statistics', async function (req, res) {
    let { type } = req.query;
    let data = await client.get("/orders", { submitType: "findJoin", ref: ["shop", "petMaster"] });
    let Arr,
        wlmqObj = { city: "乌鲁木齐市", year2019: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 }, year2018: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 } },
        ktObj = { city: "奎屯市", year2019: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 }, year2018: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 } },
        aksObj = { city: "阿克苏市", year2019: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 }, year2018: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 } },
        klmyObj = { city: "克拉玛依市", year2019: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 }, year2018: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 } },
        cdObj = { city: "成都市", year2019: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 }, year2018: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 } },
        dyObj = { city: "德阳市", year2019: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 }, year2018: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 } },
        myObj = { city: "绵阳市", year2019: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 }, year2018: { month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0, month7: 0, month8: 0, month9: 0, month10: 0, month11: 0, month12: 0 } };
    if (type == "Com") {
        console.log(data[0].buyTime)
        console.log(data[0].buyTime.split("/"))
        choose("购买商品")
    } else if (type == "Serve") {
        choose("购买服务")
    }
    Arr = [wlmqObj, ktObj, aksObj, klmyObj, cdObj, dyObj, myObj]
    res.send(Arr);
    function choose(type){
        data.forEach(function (item) {
            if (item.orderContent == type) {
                if (item.shop.city[1] == "乌鲁木齐市") {
                    if (item.buyTime.split("/")[0] == "2019") {
                        if (item.buyTime.split("/")[1] == "1") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2019.month1 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "2") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2019.month2 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "3") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2019.month3 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "4") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2019.month4 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "5") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2019.month5 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "6") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2019.month6 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "7") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2019.month7 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "8") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2019.month8 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "9") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2019.month9 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "10") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2019.month10 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "11") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2019.month11 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "12") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2019.month12 += ele.commodityCondition * ele.commodityPrice;
                            })
                        }
                    } else if (item.buyTime.split("/")[0] == "2018") {
                        if (item.buyTime.split("/")[1] == "1") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2018.month1 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "2") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2018.month2 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "3") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2018.month3 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "4") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2018.month4 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "5") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2018.month5 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "6") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2018.month6 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "7") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2018.month7 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "8") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2018.month8 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "9") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2018.month9 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "10") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2018.month10 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "11") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2018.month11 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "12") {
                            item.orderCommoditys.forEach(function (ele) {
                                wlmqObj.year2018.month12 += ele.commodityCondition * ele.commodityPrice;
                            })
                        }
                    }
                } else if (item.shop.city[1] == "奎屯市") {
                    if (item.buyTime.split("/")[0] == "2019") {
                        if (item.buyTime.split("/")[1] == "1") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2019.month1 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "2") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2019.month2 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "3") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2019.month3 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "4") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2019.month4 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "5") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2019.month5 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "6") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2019.month6 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "7") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2019.month7 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "8") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2019.month8 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "9") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2019.month9 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "10") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2019.month10 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "11") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2019.month11 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "12") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2019.month12 += ele.commodityCondition * ele.commodityPrice;
                            })
                        }
                    } else if (item.buyTime.split("/")[0] == "2018") {
                        if (item.buyTime.split("/")[1] == "1") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2018.month1 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "2") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2018.month2 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "3") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2018.month3 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "4") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2018.month4 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "5") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2018.month5 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "6") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2018.month6 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "7") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2018.month7 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "8") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2018.month8 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "9") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2018.month9 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "10") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2018.month10 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "11") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2018.month11 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "12") {
                            item.orderCommoditys.forEach(function (ele) {
                                ktObj.year2018.month12 += ele.commodityCondition * ele.commodityPrice;
                            })
                        }
                    }
                } else if (item.shop.city[1] == "阿克苏市") {
                    if (item.buyTime.split("/")[0] == "2019") {
                        if (item.buyTime.split("/")[1] == "1") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month1 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "2") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month2 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "3") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month3 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "4") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month4 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "5") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month5 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "6") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month6 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "7") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month7 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "8") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month8 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "9") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month9 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "10") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month10 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "11") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month11 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "12") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month12 += ele.commodityCondition * ele.commodityPrice;
                            })
                        }
                    } else if (item.buyTime.split("/")[0] == "2018") {
                        if (item.buyTime.split("/")[1] == "1") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month1 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "2") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month2 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "3") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month3 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "4") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month4 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "5") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month5 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "6") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month6 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "7") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month7 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "8") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month8 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "9") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month9 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "10") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month10 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "11") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month11 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "12") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month12 += ele.commodityCondition * ele.commodityPrice;
                            })
                        }
                    }
                } else if (item.shop.city[1] == "克拉玛依市") {
                    if (item.buyTime.split("/")[0] == "2019") {
                        if (item.buyTime.split("/")[1] == "1") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month1 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "2") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month2 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "3") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month3 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "4") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month4 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "5") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month5 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "6") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month6 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "7") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month7 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "8") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month8 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "9") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month9 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "10") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month10 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "11") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month11 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "12") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2019.month12 += ele.commodityCondition * ele.commodityPrice;
                            })
                        }
                    } else if (item.buyTime.split("/")[0] == "2018") {
                        if (item.buyTime.split("/")[1] == "1") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month1 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "2") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month2 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "3") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month3 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "4") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month4 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "5") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month5 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "6") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month6 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "7") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month7 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "8") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month8 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "9") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month9 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "10") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month10 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "11") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month11 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "12") {
                            item.orderCommoditys.forEach(function (ele) {
                                aksObj.year2018.month12 += ele.commodityCondition * ele.commodityPrice;
                            })
                        }
                    }
                } else if (item.shop.city[1] == "成都市") {
                    if (item.buyTime.split("/")[0] == "2019") {
                        if (item.buyTime.split("/")[1] == "1") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2019.month1 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "2") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2019.month2 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "3") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2019.month3 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "4") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2019.month4 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "5") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2019.month5 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "6") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2019.month6 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "7") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2019.month7 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "8") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2019.month8 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "9") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2019.month9 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "10") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2019.month10 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "11") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2019.month11 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "12") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2019.month12 += ele.commodityCondition * ele.commodityPrice;
                            })
                        }
                    } else if (item.buyTime.split("/")[0] == "2018") {
                        if (item.buyTime.split("/")[1] == "1") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2018.month1 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "2") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2018.month2 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "3") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2018.month3 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "4") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2018.month4 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "5") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2018.month5 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "6") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2018.month6 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "7") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2018.month7 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "8") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2018.month8 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "9") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2018.month9 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "10") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2018.month10 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "11") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2018.month11 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "12") {
                            item.orderCommoditys.forEach(function (ele) {
                                cdObj.year2018.month12 += ele.commodityCondition * ele.commodityPrice;
                            })
                        }
                    }
                } else if (item.shop.city[1] == "德阳市") {
                    if (item.buyTime.split("/")[0] == "2019") {
                        if (item.buyTime.split("/")[1] == "1") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2019.month1 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "2") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2019.month2 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "3") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2019.month3 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "4") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2019.month4 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "5") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2019.month5 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "6") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2019.month6 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "7") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2019.month7 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "8") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2019.month8 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "9") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2019.month9 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "10") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2019.month10 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "11") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2019.month11 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "12") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2019.month12 += ele.commodityCondition * ele.commodityPrice;
                            })
                        }
                    } else if (item.buyTime.split("/")[0] == "2018") {
                        if (item.buyTime.split("/")[1] == "1") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2018.month1 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "2") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2018.month2 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "3") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2018.month3 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "4") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2018.month4 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "5") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2018.month5 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "6") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2018.month6 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "7") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2018.month7 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "8") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2018.month8 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "9") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2018.month9 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "10") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2018.month10 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "11") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2018.month11 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "12") {
                            item.orderCommoditys.forEach(function (ele) {
                                dyObj.year2018.month12 += ele.commodityCondition * ele.commodityPrice;
                            })
                        }
                    }
                } else if (item.shop.city[1] == "绵阳市") {
                    if (item.buyTime.split("/")[0] == "2019") {
                        if (item.buyTime.split("/")[1] == "1") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2019.month1 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "2") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2019.month2 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "3") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2019.month3 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "4") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2019.month4 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "5") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2019.month5 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "6") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2019.month6 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "7") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2019.month7 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "8") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2019.month8 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "9") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2019.month9 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "10") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2019.month10 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "11") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2019.month11 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "12") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2019.month12 += ele.commodityCondition * ele.commodityPrice;
                            })
                        }
                    } else if (item.buyTime.split("/")[0] == "2018") {
                        if (item.buyTime.split("/")[1] == "1") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2018.month1 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "2") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2018.month2 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "3") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2018.month3 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "4") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2018.month4 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "5") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2018.month5 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "6") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2018.month6 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "7") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2018.month7 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "8") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2018.month8 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "9") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2018.month9 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "10") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2018.month10 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "11") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2018.month11 += ele.commodityCondition * ele.commodityPrice;
                            })
                        } else if (item.buyTime.split("/")[1] == "12") {
                            item.orderCommoditys.forEach(function (ele) {
                                myObj.year2018.month12 += ele.commodityCondition * ele.commodityPrice;
                            })
                        }
                    }
                }
            }
        });
    }
});



// 显示订单
router.get("/", async function (req, res) {
    let {
        type,
        value,
        page,
        rows,
        shopId,
        petMasterId
    } = req.query;
    console.log(type, value, page, rows, shopId, petMasterId);
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

//通过ID查询
router.get("/:id", async function (req, res) {
    let id = req.params.id;
    let data = await client.get("/orders/" + id);
    res.send(data);
})

// 增加订单
router.post("/", async function (req, res) {
    let {
        shopId,
        petMasterID,
        orderContent,
        orderCommoditys,
        orderStatus,
        buyTime,
    } = req.body;
    let data = await client.post("/orders", {
        shop: {
            $ref: "shop",
            $id: shopId,
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
    res.send(data);
});

//修改订单
router.put('/:id', async function (req, res, next) {
    let id = req.params.id
    let {
        shopId,
        petMasterID,
        orderContent,
        orderCommoditys,
        orderStatus,
        buyTime,
        status
    } = req.body
    await client.put("/orders/" + id, {
        orderContent,
        orderCommoditys,
        orderStatus,
        buyTime,
        status: status || "0",
    })
    res.send({ status: 1 });
});

router.delete("/:id", async function (req, res) {
    let id = req.params.id;
    await client.delete("/orders/" + id);
    res.send({ status: 1 });
})
module.exports = router;