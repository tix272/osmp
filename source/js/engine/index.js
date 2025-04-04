var advert2,
	advert3,
    advert5,
    advert6,
    advert7,
    advert9,
	nAdvTimer = 0,
	startPosY = 200,
    endPosY = 600,
    currentPosY = 440,
    bAdvert3 = false,
    dat = new Date();

function paintBtn() {
    if (nNoCommission > 0 && nNoCommission < 6)
        $("btn_1").style.background = "url('./img/ui/action/btn_" + nNoCommission + ".png')";
    else {
        $("btn_1").style.display = "none";
        $("btn_null").style.background = "url('./img/ui/index/btn_payment" + ".png')";
    }
}

// log start
function to(delay) {
    exitTo = setTimeout(function () {
        _log('<et t="tt"></et>');
        _log('</p>');
        document.location = './return_index.html';
    }, parseInt(delay * 1000, 10));
}
// log stop

function init() {
    // log start
    to(160);
    _log('<p v="i">');
    // log stop
    processEnterSummAdvert();
    paintBtn();
    storage.clearExcept(["_adv_counter", "_group_rotator"]);
    date();
    storage.put("pay_info", "null");
    storage.clearExcept("_adv_counter");
    startAdvert("Index");
    advert2 = $("advert_2");
    advert3 = $("advert_3");
    advert5 = $("advert_5");
    advert6 = $("advert_6");
    advert7 = $("advert_7");
    advert9 = $("advert_9");
    getBtmContent("advert_4");

    if ($("advert_8").innerHTML.length > 0)
        startPosY = 303;

    if (advert6.innerHTML.length == 0)
        if (nNoCommission !== 0)
            advert6.innerHTML = '<embed src="./swf/action_banner.swf" width="100%" height="100%" wmode="transparent" flashvars="microsite_link=./action_microsite.html" quality="best" style="margin: 0; padding: 0;"></embed>';
        else
            advert6.innerHTML = getFlashDef("./swf/kiwi_logo.swf", true);

    if (advert9.innerHTML.length > 0) {
        advert2.style.display = "none";
        advert9.style.display = "block";
    }

    if (advert5.innerHTML.length > 0) {
        advert3.style.display = "none";
        advert5.style.display = "block";
    }
    else {
        if (advert3.innerHTML.length > 0) {
            advert5.style.display = "none";
            advert3.style.display = "block";
            moveAdvert();
        }
    }

    if (advert7.innerHTML.length > 0) {
        $("advert_4").style.display = "none";
        advert7.style.display = "block";
    }

    clock();

    attachEventListener('btn1_click', 'click', function () { onButtonClick(1) });
    attachEventListener('btn_2', 'click', function () { onButtonClick(2) });
    if ($('advert_10').innerHTML.length == 0) {
        initBtn();
        attachEventListener('advert_10', 'click', function () { onButtonClick(3) });
    }
};

function processEnterSummAdvert() {
    var sIsEnterSummAdvert = escape(storage.get('es_advert'));

    if (parseInt(sIsEnterSummAdvert)) {
        storage.put('es_advert', '0');

        // log start
        _log('<et t="post"></et>');
        _log('</p>');
        // log stop

        var ff = $('ff');
        ff.appendChild(createInput('prv_id', '323'));
        ff.appendChild(createInput('prv_name', 'Magitel'));
        ff.appendChild(createInput('getAccountNumber', '0000000000'));
        ff.appendChild(createInput('_extra_fake_provider', 'true'));
        ff.appendChild(createInput('_extra_result_int_page', 'index.html'));
        ff.appendChild(createInput('_extra_no_print_check', 'true'));
        ff.appendChild(createInput('_extra_MGT_project_number', unescape(storage.get('es_prj_id'))));
        ff.appendChild(createInput('_extra_MGT_action_number', unescape(storage.get('es_action_number'))));
        ff.appendChild(createInput('_extra_MGT_phone_number', unescape(storage.get('es_phone_number').substr(0).replace(new RegExp("[ ]", "g"), ""))));
        ff.appendChild(createInput('_extra_MGT_summ', unescape(storage.get('es_summ'))));
        ff.action = './index.html';
        ff.submit();
        document.location.href = './index.html';
    }
}

function clock(bTimeout) {
    now = new Date();
    hours = now.getHours();
    minutes = now.getMinutes();
    timeStr = "" + hours;
    timeStr += ((minutes < 10) ? ":0" : ":") + minutes;
    $("clock").innerHTML = timeStr;
    setTimeout("clock()", 5000);

}

var nMonthNames = ['€нвар€', 'феврал€', 'марта', 'апрел€', 'ма€', 'июн€', 'июл€', 'августа', 'сент€бр€', 'окт€бр€', 'но€бр€', 'декабр€'],
    nDay2Names = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'п€тница', 'суббота'];
function date() {
    var nMonth = 1 + dat.getMonth();
    var nDay = dat.getDate();
    var nDay2 = dat.getDay();

    $("date").innerHTML = [
    		        nDay,
    		        ' ',
    		        nMonthNames[nMonth - 1],
    		        '<br />',
    		        '<span style="width: 100%; font-size: 26px; font-weight: normal;">',
    		        nDay2Names[nDay2],
    		        '</span>'
    	        ].join('');
}

function moveAdvert() {
    if (currentPosY == endPosY)
        bAdvert3 = true;
    if (currentPosY == startPosY)
        bAdvert3 = false;
    if (bAdvert3) {
        advert3.style.top = currentPosY;
        currentPosY--;
    }
    else {
        advert3.style.top = currentPosY;
        currentPosY++;
    }
    setTimeout('moveAdvert()', 40);
}

function onButtonClick(nBtnNum) {
    storage.put("last_page", document.location.href);
    // log start
    _log('<et t="i' + nBtnNum + '"></et>');
    _log('</p>');
    // log stop
    switch (nBtnNum) {
        case 1:
            document.location.href = "./main.html";
            break;
        case 2:
            document.location.href = "./embed_flash_mylk.html";
            break;
        case 3:
            document.location.href = sLink;
            break;
    }
}

function createInput(sName, sValue) {
    var oInput = document.createElement('input');
    oInput.id = oInput.name = sName;
    oInput.type = 'hidden';
    oInput.value = sValue;

    return oInput;
} 