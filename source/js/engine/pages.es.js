var komissprofile = '',
    bTrigger = true,
    bAction = false,
    bPayInfo = true,
    bTable = false,
    bForward = false,
    bIsEnterSumm = true,
    sActionSumm = '',
    sCurrentLine = '',
    sPaddingTop = '15px',
    sFontSize = '18px',
    oPayInfo = null,
    nAmount = 0,
    globalTimeout = setTimeout("timeOut();", 170000);

function init() {
    // log start
    _log('<p v="e">');
    // log stop
    oPayInfo = Object.deserialize(storage.get("pay_info"));
    if ($isNoU(oPayInfo)) {
        // log start
        _log('<e t="4"></e>');
        _log('</p>');
        // log stop
        document.location.href = "./ok.html";
    }
    else if (!$isNoU(oPayInfo["tag"]) && oPayInfo["tag"].indexOf('ranges') != -1) {
        oPayInfo.account = oPayInfo.account.replace(new RegExp("[(]", "g"), ' (');
        oPayInfo.account = oPayInfo.account.replace(new RegExp("[)]", "g"), ') ');
        bAction = true;
        sActionSumm = sPromotion;
    }
    hComission();
    if (!bAction) nNoCommission = 0;
    else if (nNoCommission == 5) $("action_banner").style.display = "block";
    alertDiv(false);
    $("summ_info").innerHTML = 'Сумма будет полностью зачислена на счет ' + oPayInfo.account + ' ' + oPayInfo.prvName;
    $("min_max").innerHTML = 'Вносимая сумма должна быть не меньше ' + $("min_summ").value + ' руб.' + (($("max_cash_summ").value == "не ограничена") ? '' : (' и не больше ' + $("max_cash_summ").value + '.'));

    setData("NominalCommProfile");
    setTimeout(function () {
        bTrigger = false;
        onValueChange(null, "comissionInfoText");
        onValueChange(null, "NominalCommissionInfo");
    }, 200);
}

function alertDiv(b) {
    if (b) {
        // log start
        _log('<e t="10"></e>');
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

    var PROFIL_NORMAL_LENGTH = 2,
        PROFIL_OTHER_LENGTH = 1;

    if (sTable !== '') {
        a = sTable.substr(252).replace(new RegExp("<tr[a-z0-9=#./:;()\" -]*>|</tr></table>|<td[a-z0-9= ]*>|</td>(?=</tr>)|<td alig", "g"), '').split("</tr>");

        for (var i = 0; i < a.length; i++) {
            a[i] = a[i].replace(/для/g, 'Для');
            if (/[<\/td>]{5}[\.]{3}/.test(a[i])) {
                a.splice(i, 1);
            }
            else {
                a[i] = a[i].split("</td>");
            }
        }

        if (a.length > 0 && a[a.length - 1].length > PROFIL_NORMAL_LENGTH) {
            a.pop();
        }
        if (a.length > 0 && a[a.length - 1].length == PROFIL_OTHER_LENGTH) {
            a[a.length - 1] = ["Для других сумм", a[a.length - 1][0].replace(new RegExp("Для остальных условий комиссия ", "g"), "")];
        }

        if (nNoCommission > 1) {
            var aActionSumm = [1000, 500, 300, 0],
                nActionIndex = nNoCommission - 2,
                j = 1,
                nLength = a.length,
                TABLE_SHORT_LENGTH = 2;

            if (nLength == TABLE_SHORT_LENGTH) {
                if (a[nLength - 1].length == PROFIL_NORMAL_LENGTH) {
                    if (a[nLength - 1][0] == "Для любой суммы") {
                        a[nLength - 1][0] = '1 - ' + (aActionSumm[nActionIndex] - 1).toString() + ' руб.';
                    }
                }
            }
            else {
                for (; j < nLength; j++) {
                    if (a[j].length == PROFIL_NORMAL_LENGTH) {
                        if (a[j][0] == "Для любой суммы") {
                            if (aActionSumm[nActionIndex] == 0) {
                                a[j] = 'null';
                            }
                            else {
                                a[j][0] = '1 - ' + (aActionSumm[nActionIndex] - 1).toString() + ' руб.';
                            }
                        }
                        else {
                            var aTemp = a[j][0].match(/\d+(?:\.\d+)?/g);
                            if (aTemp != null) {
                                if (aTemp.length == 2) {
                                    if (parseFloat(aTemp[0]) >= aActionSumm[nActionIndex]) {
                                        a[j] = 'null';
                                    }
                                    else if (parseFloat(aTemp[aTemp.length - 1]) >= aActionSumm[nActionIndex]) {
                                        a[j][0] = aTemp[0].toString() + ' - ' + (aActionSumm[nActionIndex] - 1).toString() + ' руб.';
                                    }
                                }
                                else if (aTemp.length == 1) {
                                    if (parseFloat(aTemp[0]) >= aActionSumm[nActionIndex]) {                                        
                                        if (a[j][0].indexOf("до") != -1) {
                                            a[j][0] = '1 - ' + (aActionSumm[nActionIndex] - 1).toString() + ' руб.';
                                        }
                                        else if (a[j][0].indexOf("более") != -1) {
                                            a[j] = 'null';
                                        }
                                    }
                                    else {
                                        if (a[j][0].indexOf("до") != -1) {
                                            a[j][0] = '1 - ' + aTemp[0] + ' руб.';
                                        }
                                        else if (a[j][0].indexOf("более") != -1) {
	                                        a[j][0] = aTemp[0] + ' - ' + (aActionSumm[nActionIndex] - 1).toString() + ' руб.';
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        var sCoinComiss = getCoinComiss();
        if (sCoinComiss != '') {
            a.push("Дополнительная комиссия на монеты " + sCoinComiss + "%");
        }
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
            break;
        case "really_summ":
            if (oPayInfo != null) {
                oPayInfo.summ = $("really_summ").value;
                oPayInfo.comiss = $("komiss").value;
                oPayInfo.comissCoin = $("coin").value;
                storage.put("pay_info", oPayInfo.serialize());
            }
            if ($("really_summ").value == $("getAmount").value) {
                $("coin").value = '0';
            }
            break;
        case "komissprofile":
            break;
        case "CommProfileLine": 
            insertLine({ "type": "note", "block": cursorIndex() });
            break;
        case "comissionInfoText":
            var sKomissProfile = $("komissprofile").value;
            if (nNoCommission !== 5) {
                var aTable = sTableToArray($("comissionInfoText").value);
                // log start
                _log('<cs v="' + ((aTable.length) ? aTable.length : '1') + '"></cs>');
                // log stop
                if (aTable.length) {
                    $("coin_string_temp").style.display = "none";
                    bTable = true;
                    paintTable(aTable);
                    if (!bComissInfo) {
                        $('comiss_block').style.filter = 'alpha(opacity=0)';
                        $('block_down').style.filter = 'alpha(opacity=0)';
                        $('komiss_div').style.display = 'none';
                        $('coin_div').style.display = 'none';
                        $('comiss_btn').style.display = 'block';
                    }
                    $("comiss_block").innerHTML = 'Комиссия:';
                }
                else {
                    if (sKomissProfile.length) {
                        if (sKomissProfile == '( комиссия 0% )') {
                            $("comiss_block").innerHTML = 'Комиссия 0% ' + getStars('4');
                        }
                        else {
                            if (!bComissInfo) {
                                $('comiss_block').style.display = 'none';
                                $('block_down').style.filter = 'alpha(opacity=0)';
                                $('komiss_div').style.display = 'none';
                                $('coin_div').style.display = 'none';
                                $('comiss_btn').style.display = 'block';
                                $("comiss_block").style.filter = 'alpha(opacity=0)';
                            }
                            var aTemp = $("komissprofile").value.match(/([\.0-9]+%)|([\.0-9]+\sруб\.)/g),
                                sCoinComiss = getCoinComiss();
                            if (aTemp !== null) {
                                $("comiss_block").innerHTML = 'Комиссия ' + aTemp[0] + getStars('4');
                            }
                            if (sCoinComiss != '') {
                                $("coin_string_temp").innerHTML = 'Дополнительная комиссия на монеты ' + sCoinComiss + '%';
                            }
                        }
                    }
                }
            }
            else {
                $("comiss_block").innerHTML = 'Комиссия 0% ' + getStars('4');
            }
            break;
        case "komissprofile":
            break;
        case "NominalCommissionInfo":
            var o = parsCoinString($("NominalCommissionInfo").value);
            if (o !== null)
                insertLine(o);
            break;
    }
}

function getStars(sId) {
    var s = '<div style="float:left; margin-left:7px; margin-top:-3px;">';
    for (var i = 0; i < nNoCommission; i++) {
        s += '<img src="./img/ui/action/star' + sId + '.gif" />';
    }
    s += '</div>';
    return s;
}

function paintTable(aTable) {
    var oContent = $("table_content"),
        oDivLine = null,
        oDivBlock = null,
        sHeight = '53px',
        aText = [],
        nTableLength = aTable.length;

    for (var x = 0; x < aTable.length; x++) {
        if (aTable[x] == 'null') {
            nTableLength--;
        }
    }

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

    if (aTable.length > 7) {
        sHeight = (385 / nTableLength).toString() + "px";
        sPaddingTop = (((385 / nTableLength) - (24 - nTableLength)) / 2).toString() + "px";
        sFontSize = 26 - nTableLength;
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

            oDivLine = document.createElement("div");
            oDivLine.className = "table_block";
            oDivLine.style.height = sHeight;
            oDivLine.id = "block_" + (i + 1);
            oContent.appendChild(oDivLine);

            oDivBlock = document.createElement("div");
            oDivBlock.className = "t_b_left";
            oDivBlock.style.paddingTop = sPaddingTop;
            oDivBlock.style.fontSize = sFontSize;
            if (bAction && aTable[i][0].indexOf(sActionSumm) !== -1 && aTable[i][1] == "0%") {
                aTable[i][1] = '<div style="float:left; font-weight:bold; color:#2665b5; font-size:' + sFontSize + '">без комиссии </div>' + getStars('5');
                aTable[i][0] = "от " + aTable[i][0].replace(/\s-\s[\d\.]+/, "");
                oDivBlock.style.color = "#2665b5";
                oDivBlock.style.fontWeight = "bold";
            }
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
            if (aTable[i] == 'null') {
                oDivLine = document.createElement("div");
                oDivLine.id = "block_" + (i + 1);
                oDivLine.style.display = "none";
                oContent.appendChild(oDivLine);
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
}

function cursorIndex() {
    var nResult = 1,
        nCommProfileLine = parseInt($("CommProfileLine").value, 10);

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
                            $("komiss_div").style.top = (oConfig.top + oConfig.height - 48).toString() + "px";
                        }
                    }
                }
                else {
                    if ($(sCurrentLine) != null) {
                        $(sCurrentLine).style.background = "";
                    }
                    $("komiss_div").style.top = "380px";
                }
                if (bComissInfo) {
                    $("komiss_div").style.display = "block";
                }
                else {
                    $("komiss_div").style.display = "none";
                }
            }
            break;
        case "coin":
            var oCoinLine = $("coin_line");
            if (typeof oMaratlData["NominalCommProfile"] == "string") {
                if (bTable) {
                    if (oCoinLine !== null) {
                        if (oCoinLine.children.length == 0) {
                            oCoinLine.innerHTML = '';
                            var oBlock = document.createElement("div"),
                            oConfig = getElementRect("coin_line");

                            oCoinLine.style.paddingTop = "0px";

                            oBlock.className = "t_b_left";
                            oBlock.id = "coin_left";
                            oBlock.style.fontSize = sFontSize;
                            oBlock.style.paddingTop = sPaddingTop;
                            oBlock.innerHTML = 'Монетами ' + oInfoLine.left + ' руб.';
                            oCoinLine.appendChild(oBlock);
                            oBlock = null;

                            oBlock = document.createElement("div");
                            oBlock.className = "t_b_right";
                            oBlock.id = "coin_right";
                            oBlock.style.fontSize = sFontSize;
                            oBlock.style.paddingTop = sPaddingTop;
                            oBlock.innerHTML = oInfoLine.right + '%';
                            oCoinLine.appendChild(oBlock);
                            oBlock = null;

                            oCoinLine.style.background = "#e3e3e3";
                            $("coin_div").style.top = (oConfig.top + oConfig.height - 48).toString() + "px";
                        }
                        else {
                            $("coin_left").innerHTML = 'Монетами ' + oInfoLine.left + ' руб.';
                            $("coin_right").innerHTML = oInfoLine.right + '%';
                        }
                    }
                }
                else {
                    $("coin_string_temp").style.display = "none";
                    $("coin_string").style.display = "block";
                    $("coin_string").innerHTML = 'Комиссия на ' + oInfoLine.left + ' руб. монетами';
                }
                $("coin").value = oInfoLine.comiss;
                if (bComissInfo) {
                    $("coin_div").style.display = "block";
                }
                else {
                    $("coin_div").style.display = "none";
                }
            }
            break;
    }
}

function getCoinComiss() {
    var aTemp = ((typeof oMaratlData["NominalCommProfile"] == "string") ? oMaratlData["NominalCommProfile"] : '').split("|"),
        aTemp2 = [];
    if (aTemp.length) {
        for (var i = 0; i < aTemp.length; i++) {
            aTemp2 = aTemp[i].split(";");
            if (aTemp2.length == 3 && aTemp2[0] == 'type_coin') {
                aTemp2[1] = aTemp2[2].split("_");
                if (aTemp2[1].length == 2 && aTemp2[1][1] != '0') {
                    return aTemp2[1][1];
                }
            }
            aTemp2 = [];
        }
    }
    return '';
}

function parsCoinString(sParam) {
    var aTemp = sParam.split("|"),
        aTemp2 = [],
        oTemp = {},
        sTemp = '',
        oCoin = { "CoinPercent": "0", "TotalAmount": 0 },
        j = 0;
    if (aTemp.length == 3) {
        aTemp[0] = aTemp[0].split(":");
        aTemp[1] = aTemp[1].split(":");
        aTemp[2] = aTemp[2].split(":");
        if (!(aTemp[0].length == 2 && aTemp[2].length == 2))
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
        if (oCoin["TotalAmount"] !== 0) {
            return { "type": "coin", "left": formatFloatValue(oCoin["TotalAmount"]), "right": formatFloatValue(oCoin["CoinPercent"]), "comiss": formatFloatValue(oCoin["TotalCommAmount"]) };
        }
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
        if (oPayInfo != null && oPayInfo.hasOwnProperty('path')) {
            storage.put("groupId", oPayInfo.path);
        }
        startAdvert('Enter_Summ');
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

function showComiss() {
    $('comiss_btn').style.display = 'none';
    $('comiss_block').style.display = 'block';
    $("comiss_block").style.filter = '';
    $('block_down').style.filter = '';
    if (bForward) {
        $('komiss_div').style.display = 'block';
    }
    if ($('coin').value != '0') {
        $('coin_div').style.display = 'block';
    }
    bComissInfo = true;
}