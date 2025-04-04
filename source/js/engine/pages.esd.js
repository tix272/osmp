var bTrigger = true,
    bAction = false,
    bPayInfo = true,
    bTable = false,
    bTable2 = false,
    bForward = false,
    bIsEnterSumm = true,
    sCurrentLine = '',
    sPaddingTop = '15px',
    sFontSize = '18px',
    oPayInfo = null,
    oPayInfo2 = null,
    nAmount = 0,
    globalTimeout = setTimeout("timeOut();", 170000);

function init() {
    // log start
    _log('<p v="ey">');
    // log stop
    oPayInfo = Object.deserialize(storage.get("pay_info"));
    oPayInfo2 = Object.deserialize(storage.get("pay_info2"));
    if ($isNoU(oPayInfo) || $isNoU(oPayInfo2)) {
        document.location.href = "./ok.html";
    }
    alertDiv(false);
    $("summ_info").innerHTML = 'Сумма будет полностью зачислена на счет ' + oPayInfo.account + ' ' + oPayInfo.prvName;
    $("summ_info2").innerHTML = 'Сумма будет полностью зачислена на счет ' + oPayInfo2.account + ' ' + oPayInfo2.name;
    $("min_max").innerHTML = 'Вносимая сумма должна быть не меньше ' + $("min_summ").value + ' руб.' + (($("max_cash_summ").value == "не ограничена") ? '' : (' и не больше ' + $("max_cash_summ").value + '.'));

    setTimeout(function () {
        bTrigger = false;
        onValueChange(null, "comissionInfoText");
        onValueChange(null, "comissionInfoText2");
    }, 200);
}

function alertDiv(b) {
    if (b) {
        // log start
        _log('<e t="5"></e>');
        // log stop
        $("alert_block").style.background = '#ff9900';
        $("alert_min").style.display = 'block';
        $("alert_min").innerHTML = '- Внесите еще ' + (parseInt($("min_summ").value, 10) - parseInt($("getAmount").value, 10)) + ' руб.';
    }
    else {
        $("alert_block").style.background = '';
        $("alert_min").style.display = 'none';
    }
}

function alertInput(oEventInfo) {
    var s = oEventInfo.srcElement.value;
    switch (s) {
        case 'Подождите!':
            // log start
            _log('<e t="4"></e>');
            // log stop
            $("wait").style.display = "block";
            setTimeout(function () { $("wait").style.display = "none"; }, 2000);
            break;
        default:
            if (s !== '' && s !== ' ')
                alertDiv(true);
    }
}

function sTableToArray(sTable) {
    var a = [];

    if (sTable !== '') {
        a = sTable.substr(252).replace(new RegExp("<tr[a-z0-9=#./:;()\" -]*>|</tr></table>|<td[a-z0-9= ]*>|</td>(?=</tr>)|<td alig", "g"), '').split("</tr>");
        for (var i = 0, l = a.length; i < l; i++) {
            a[i] = a[i].replace(/для/g, 'Для');
            if (/[<\/td>]{5}[\.]{3}/.test(a[i])) {
                a.splice(i, 1);
            }
            else {
                a[i] = a[i].split("</td>");
            }
        }

        if (a.length > 0 && a[a.length - 1].length > 2)
            a.pop();
        if (a.length > 0 && a[a.length - 1].length == 1)
            a[a.length - 1] = ["Для других сумм", a[a.length - 1][0].replace(new RegExp("Для остальных условий комиссия ", "g"), "")];

//        a.push("Возможна комиссия на монеты");
    }
    return a;
}

function preOnValueChange(oEventInfo, sElementId) {
    if (!bTrigger) onValueChange(null, sElementId);
}

function onValueChange(oEventInfo, sElementId) {
    switch (sElementId) {
        case "getAmount":
            // log start
            _log('<a v="' + (parseInt($("getAmount").value, 10) - nAmount) + '"></a>');
            nAmount = parseInt($("getAmount").value, 10);
            // log stop
            clearTimeout(globalTimeout);
            globalTimeout = setTimeout("timeOut();", 170000);
            $("btn_right").style.filter = "";
            $("message").style.display = "none";
            $("advert_1").style.display = "none";
            alertDiv(false);
            bForward = true;
            $("btn_center").style.display = "none";
            $("komiss_div").style.display = "block";
            break;
        case "really_summ":
            if (oPayInfo != null) {
                oPayInfo.summ = $("really_summ").value;
                storage.put("pay_info", oPayInfo.serialize());
            }
//            if ($("really_summ").value == $("getAmount").value) {
//                $("coin").value = '0';
//            }
            break;
        case "really_summ2":
            $("real_summ2_div").style.display = "block";
            break;
        case "komissprofile":
            break;
//        case "CommProfileLine": 
//            insertLine({ "type": "note", "block": cursorIndex() });
//            break;
        case "CommProfileLine2":
            setTimeout(function() {
                if ($("really_summ2").value != '0') {
                    insertLine({ "type": "note", "block": cursorIndex('2') });
                }
            }, 20)
            break;
        case "comissionInfoText":
            var sKomissProfile = $("komissprofile").value;
            if (sKomissProfile.length) {
                if (sKomissProfile == '( комиссия 0% )') {
                    $("comiss_block").innerHTML = 'Комиссия на платеж 0%';
                }
                else {
                    var aTemp = $("komissprofile").value.match(/([\.0-9]+%)|([\.0-9]+\sруб\.)/g);
                    if (aTemp !== null)
                        $("comiss_block").innerHTML = 'Комиссия на платеж ' + aTemp[0];
                }
            }
            break;
        case "comissionInfoText2":
            var sKomissProfile2 = $("komissprofile2").value,
                aTable = sTableToArray($("comissionInfoText2").value);
            if (aTable.length) {
//                $("coin_string_temp").style.display = "none";
                bTable = true;
                paintTable(aTable);
            }
            else {
                if (sKomissProfile2.length) {
                    if (sKomissProfile2 == '( комиссия 0% )') {
                        $("comiss_block2").innerHTML = 'Комиссия на сдачу 0%';
                    }
                    else {
                        var aTemp = sKomissProfile2.match(/([\.0-9]+%)|([\.0-9]+\sруб\.)/g);
                        if (aTemp !== null)
                            $("comiss_block2").innerHTML = 'Комиссия на сдачу ' + aTemp[0];
                    }
                }
            }
            break;
        case "NominalCommissionInfo":
            var o = parsCoinString();
            if (o !== null)
                insertLine(o);
            break;
    }
}


function paintTable(aTable) {
    var oContent = $("table_content"),
        oDivLine = null,
        oDivBlock = null,
        sHeight = '53px',
        aText = [];

    oDivLine = document.createElement("div");
    oDivLine.className = "table_head";
    oContent.appendChild(oDivLine);

    oDivBlock = document.createElement("div");
    oDivBlock.id = "t_h_left";
    oDivBlock.innerHTML = "Внесенная сумма";
    oDivLine.appendChild(oDivBlock);
    oDivBlock = null;

    oDivBlock = document.createElement("div");
    oDivBlock.id = "t_h_right";
    oDivBlock.innerHTML = "Размер комиссии";
    oDivLine.appendChild(oDivBlock);
    oDivBlock = null;

    if (aTable.length > 4) {
        sHeight = (200 / aTable.length).toString() + "px";
        sPaddingTop = (((200 / aTable.length) - (24 - aTable.length)) / 2).toString() + "px";
        sFontSize = 26 - aTable.length;
        sFontSize = sFontSize < 7 ? "7px" : sFontSize.toString() + "px";
    }
        
    for (var i = 0; i < aTable.length; i++) {
        if (sHeight == "53px") {
            oDivLine = document.createElement("div");
            oDivLine.className = "table_line";
            oContent.appendChild(oDivLine);
            oDivLine = null;

            if (aTable[i].length == 2) {
                aText = aTable[i][1].match(/^([0-9\.]+(?:%|\sруб\.))(.*)$/);
                if (aText !== null) {
                    aText.shift();
                    if (aText.length == 2 && aText[1].length) {
                        aTable[i][1] = '<p style="font-size: 19px;">' + aText[0] + '<br /><span style="font-size: 12px;">' + aText[1].replace(new RegExp("^[, ]{1}", "g"), "") + '</span></p>';
                    }
                }
            }
        }

        if (aTable[i].length == 2) {

            if (bAction && aTable[i][0].indexOf(sActionSumm) !== -1 && aTable[i][1] == "0%")
                aTable[i][1] = '<div style="float:left; font-size:' + sFontSize + '">' + aTable[i][1] + '</div>';

            oDivLine = document.createElement("div");
            oDivLine.className = "table_block";
            oDivLine.style.height = sHeight;
            oDivLine.id = "block_" + (i + 1);
            oContent.appendChild(oDivLine);

            oDivBlock = document.createElement("div");
            oDivBlock.className = "t_b_left";
            oDivBlock.style.paddingTop = sPaddingTop;
            oDivBlock.style.fontSize = sFontSize;
            oDivBlock.innerHTML = aTable[i][0];
            oDivLine.appendChild(oDivBlock);
            oDivBlock = null;

            oDivBlock = document.createElement("div");
            oDivBlock.className = "t_b_right";
            oDivBlock.style.paddingTop = sPaddingTop;
            oDivBlock.style.fontSize = sFontSize;
            oDivBlock.innerHTML = aTable[i][1];
            oDivLine.appendChild(oDivBlock);
            oDivBlock = null;

            oDivLine = null;
        }
        else {
            oDivLine = document.createElement("div");
            oDivLine.style.height = sHeight;
            oDivLine.style.paddingTop = sPaddingTop;
            oDivLine.style.fontSize = sFontSize;
            oDivLine.id = "coin_line";
            oDivLine.innerHTML = aTable[i];
            oContent.appendChild(oDivLine);
            oDivLine = null;
        }
    }
}

function cursorIndex(sIndex) {
    var nResult = 1,
        sId = sIndex || '';
        nCommProfileLine = parseInt($("CommProfileLine" + sId).value, 10);

    if (nCommProfileLine) {
        nResult = nCommProfileLine;
    }
    return nResult;
}

function insertLine(oInfoLine) {
    switch (oInfoLine.type) {
        case "note":
            if ($("getAmount").value !== "0") {
                if ($("block_" + oInfoLine.block) != null) {
                    if (bTable) {
                        var oConfig = getElementRect("block_" + oInfoLine.block);
                        if (sCurrentLine == '') {
                            sCurrentLine = "block_" + oInfoLine.block;
                            $(sCurrentLine).style.background = "#aed3ff";
                        }
                        else {
                            if ($(sCurrentLine) != null) {
                                $(sCurrentLine).style.background = "";
                            }
                            sCurrentLine = "block_" + oInfoLine.block;
                            if ($(sCurrentLine) != null) {
                                $(sCurrentLine).style.background = "#aed3ff";
                            }
                        }
                        if (oConfig != null) {
                            $("komiss_div2").style.top = (oConfig.top + oConfig.height - 48).toString() + "px";
                        }
                    }
                }
                else {
                    if ($(sCurrentLine) != null) {
                        $(sCurrentLine).style.background = "";
                    }
                    $("komiss_div2").style.top = "555px";
                }
                $("komiss_div2").style.display = "block";
            }
            break;
//        case "coin":
//            if (bTable) {
//                var oCoinLine = $("coin_line");
//                if (oCoinLine.children.length == 0) {
//                    oCoinLine.innerHTML = '';
//                    var oBlock = document.createElement("div"),
//                        oConfig = getElementRect("coin_line");

//                    oCoinLine.style.paddingTop = "0px";

//                    oBlock.className = "t_b_left";
//                    oBlock.id = "coin_left";
//                    oBlock.style.fontSize = sFontSize;
//                    oBlock.style.paddingTop = sPaddingTop;
//                    oBlock.innerHTML = 'Монетами ' + oInfoLine.left + ' руб.';
//                    oCoinLine.appendChild(oBlock);
//                    oBlock = null;

//                    oBlock = document.createElement("div");
//                    oBlock.className = "t_b_right";
//                    oBlock.id = "coin_right";
//                    oBlock.style.fontSize = sFontSize;
//                    oBlock.style.paddingTop = sPaddingTop;
//                    oBlock.innerHTML = oInfoLine.right + '%';
//                    oCoinLine.appendChild(oBlock);
//                    oBlock = null;

//                    oCoinLine.style.background = "#e3e3e3";
//                    $("coin_div").style.top = (oConfig.top + oConfig.height - 48).toString() + "px";
//                }
//                else {
//                    $("coin_left").innerHTML = 'Монетами ' + oInfoLine.left + ' руб.';
//                    $("coin_right").innerHTML = oInfoLine.right + '%';
//                }

//            }
//            else {
//                $("coin_string_temp").style.display = "none";
//                $("coin_string").style.display = "block";
//                $("coin_string").innerHTML = 'Комиссия на ' + oInfoLine.left + ' руб. монетами';
//            }
//            $("coin").value = oInfoLine.comiss;
//            $("coin_div").style.display = "block";
//            break;
    }
}

function parsCoinString() {
    var aTemp = [],
        aTemp2 = [],
        oTemp = {},
        sTemp = '',
        oCoin = { "CoinPercent": "0", "TotalAmount": 0 },
        j = 0;

    aTemp = $("NominalCommissionInfo").value.split("|");
    if (aTemp.length == 3) {
        aTemp[0] = aTemp[0].split(":");
        aTemp[1] = aTemp[1].split(":");
        aTemp[2] = aTemp[2].split(":");
        if (!(aTemp[0].length == 2 && aTemp[2].length == 2) && aTemp[0][1].toString() == "0")
            return false;
        else {
            oCoin[aTemp[2][0]] = aTemp[2][1];
            sTemp = aTemp[1][1];
            aTemp = [];
            oCoin["DetalInfo"] = [];
            aTemp = sTemp.split("/");
            for (var i = 0, l = aTemp.length; i < l; i++) {
                aTemp[i] = aTemp[i].split(";");

                for (j = 0; j < aTemp[i].length; j++)
                    aTemp2[j] = aTemp[i][j].split("_");

                for (j = 0; j < aTemp2.length; j++)
                    oTemp[aTemp2[j][0]] = aTemp2[j][1];

                if (oTemp["type"] == "coin") {
                    oCoin["CoinPercent"] = oTemp["percent"];
                    oCoin["TotalAmount"] = oCoin["TotalAmount"] + (parseFloat(oTemp["nominal"]) * parseFloat(oTemp["count"]));
                }
                oCoin["DetalInfo"].push(oTemp);
                oTemp = {};
                aTemp2 = [];
            }
        }
        if (oCoin["TotalAmount"] !== 0)
            return { "type": "coin", "left": formatFloatValue(oCoin["TotalAmount"]), "right": formatFloatValue(oCoin["CoinPercent"]), "comiss": formatFloatValue(oCoin["TotalCommAmount"]) };
        else
            return null;
    }
    else
        return null;
}

function formatFloatValue(sFloat) {
    var sResult = sFloat.toString();
    if (sResult.substr(sResult.length - 1) == "0" && /\d+\.\d+/.test(sResult)) {
        sResult = sResult.substr(0, sResult.length - 1);
        if (sResult.substr(sResult.length - 1) == "0")
            sResult = sResult.substr(0, sResult.length - 2);
    }
    return sResult;
}

function onPaymentBtnClick() {
    if (bForward) {
        startAdvert('Enter_Summ');
        setTimeout(function () {
            if (bIsEnterSumm) {
                // log start
                _log('<et t="f"></et>');
                _log('</p>');
                // log stop
                oPayInfo.summ = $("really_summ").value;
                storage.put("pay_info", oPayInfo.serialize());
                if (oPayInfo.prvId == "4108" || oPayInfo.prvId == "4097" ||
                    oPayInfo.prvId == "4098" || oPayInfo.prvId == "4099" ||
                    oPayInfo.prvId == "4100" || oPayInfo.prvId == "4101" ||
                    oPayInfo.prvId == "4102" || oPayInfo.prvId == "4103" ||
                    oPayInfo.prvId == "4104" || oPayInfo.prvId == "4105" ||
                    oPayInfo.prvId == "4106" || oPayInfo.prvId == "4107") {
                    document.location.href = "./p_cbtk_postpage.html";
                }
                else {
                    if (bCom) {
                        document.location.href = "./pre_ok.html";
                    }
                    else {
                        document.location.href = "./ok.html";
                    }
                }
            }
        }, 50);
    }
    else {
        if ($("message").innerHTML == '') {
            $("message").style.display = "block";
            $("message").innerHTML = '<embed width="100%" height="100%" src="./swf/message.swf"></embed>';
        }
    }
}

function timeOut() {
    // log start
    _log('<et t="tt"></et>');
    _log('</p>');
    // log stop
    var sLink = (bCom) ? "./pre_ok.html" : "./ok.html";
    if (bForward) {
        oPayInfo.summ = $("really_summ").value;
        storage.put("pay_info", oPayInfo.serialize());
        if (oPayInfo.prvId == "4108" || oPayInfo.prvId == "4097" ||
            oPayInfo.prvId == "4098" || oPayInfo.prvId == "4099" ||
            oPayInfo.prvId == "4100" || oPayInfo.prvId == "4101" ||
            oPayInfo.prvId == "4102" || oPayInfo.prvId == "4103" ||
            oPayInfo.prvId == "4104" || oPayInfo.prvId == "4105" ||
            oPayInfo.prvId == "4106" || oPayInfo.prvId == "4107") {
            document.location.href = "./p_cbtk_postpage.html";
        }
        else {
            document.location.href = sLink;
        }
    }
    else {
        document.location.href = sLink;
    }
}