var Phone_Number = '',
    sLogoContent = './img/ui/cellular.gif',
    flag = true,
    sNumber = '',
    nPrvId = 0,
    sPrv = "",
    oInfo = {},
    js = null,
    head = null,
    oProv = null,
    parser = new phoneParser(),
    number,
    realnumber = false,
    r1 = RegExp('^8[( ]{2}[0-9]{2}[) ]{3}$'),
    r2 = RegExp('^8[( ]{2}[0-9][) ]{5}$'),
    nTest = /^\d{10}$/,
    nClean = new RegExp('[ ()-]', 'g'),
    providerButton = {},
    oDiv = null,
    top8allacc = { id: '', block: false, provider: null };

function start() {
    oDiv = $("stars_div");

	number = $("number");
	realnumber = number.value.replace(nClean, '').substr(1);

	providerButton.logo = $('logo').getElementsByTagName('div')[0].style;
	providerButton.text = $('logo').getElementsByTagName('p')[0];

	var oPrv = oProv;
    // log start
	if (oPrv == null) {
	    _log('<pr i="u"></pr>');
	}
    // log stop
	providerButton.logo.backgroundImage = 'url(' + (oPrv != null ? './img/ui_item/' + getFileName(oPrv.logo) : sLogoContent) + ')';
	providerButton.text.innerHTML = oPrv ? (oPrv.buttonName || oPrv.sName) : '';
	vAlignP();

	if (oPrv != null) {
	    if (oPrv.hasOwnProperty('tag') && oPrv.tag.indexOf('top8allacc') != -1) {
	        top8allacc.id = oPrv.id;
	        top8allacc.block = true;
	        top8allacc.provider = new CConfigObject(null, 'prv', oPrv);
	    }
	}
	
	if (oPrv && nNoCommission !== 0) {
	    oDiv.style.width = 23 * nNoCommission;
	    oDiv.style.left = (310 - 23 * nNoCommission) / 2;
	}
	
	storage.put("groupId", "-20");
	startAdvert("Adv_Cellular");
}

function initProvider(provider) {
    // log start
    _log('<p v="c">');
    // log stop
	if(!provider || provider == 'null' || provider == 0) {
		oProv = null;
		start();
	}
	else {
		getScript("./config/" + provider + ".js", loadProvider);
	}
}

function loadProvider() {
    try {
        oProv = window.UIProvider.clone();
        // log start
        _log('<pr i="' + oProv.id + '"></pr>');
        // log stop
    }
    catch (e) {
        // log start
        _log('<e t="0"></e>');
        _log('</p>');
        // log stop
    }
    start();
}

var printTimer;
function press(digit) {
    // log start
    _log('<c v="' + digit + '"></c>');
    // log stop
    if(digit == 'c') {
        new CInnerShadow("btn_del");
        if (oDiv !== null) {
            oDiv.style.width = 0;
            oDiv.style.left = 0;
        }
        flag = true;
        $("btn_forward").style.display = 'none';
        realnumber = realnumber.substr(0, realnumber.length - 1);
    }
    else if (realnumber !== false && realnumber.length < 10) {
        if (digit == '0') {
            new CInnerShadow("btn_0", 24, true);
        }
        else {
            new CInnerShadow("btn_" + digit);
        }
    	if(realnumber == '7' || (realnumber == '8' && digit == '9')) {
    		realnumber = digit;
    	}
    	else {
    		realnumber += digit;
    	}
    }
    if(printTimer) clearTimeout(printTimer);
    printTimer = setTimeout(print, 50);
}

function clearProviderButton() {
	$("btn_forward").style.display = 'none';
	$("num_info").style.display = "none";
	$('container7').className = 'init_l';
	providerButton.logo.backgroundImage = 'url(' + sLogoContent + ')';
	providerButton.text.innerHTML = '';
	vAlignP();
}

function print() {
    if(printTimer) clearTimeout(printTimer);
    var s = parser.spliceNumber(realnumber),
        r = ['8'];
    if(s.str.prefix != '') {
	    r.push(' (', s.str.prefix, parser.nulls(s.str.prefix, 3, '  '), ')');
	    if(s.str.pre != '') {
		    r.push(' ', s.str.pre);
		    if(s.str.number1 != '') {
			    r.push('-', s.str.number1);
			    if(s.str.number2 != '') {
				    r.push('-', s.str.number2);
			    }
		    }
	    }
    }
    number.value = r.join('');
    
    preTest();
}

function preTest() {  
    if(realnumber !== false && realnumber.length == 10) {
        if(flag) {
            flag = false;
            // log start
            _log('<v v="' + realnumber + '"></v>');
            // log stop
		    test(realnumber);
        }
    }
}

function isCorrectPrvInfo(oInfo) {
    return (!$isNoU(oInfo) &&
            oInfo.hasOwnProperty("from") &&
            oInfo.hasOwnProperty("to"));
}


function test(sNumber) {
    nPrvId = 0;
    window.sNumber = sNumber;
    if(nTest.test(sNumber)) {
    	parser.get(sNumber, process);
    }
    else {
    	process();
    }
}

function process(result) {
    var sLogoContent2 = sLogoContent;
    var BEELINE_INTERNET_VALUE = 50;
    var nPrefix = 0;
    var oProvider = {};
    var sRegion = "";
    var sTxt =
        "Проверьте, не ошиблись ли Вы при вводе номера<br /><br />" +
        "Если номер набран верно, нажмите \"Вперед\" для выбора оператора";
    var sNoPrv = "Невозможно оплатить данного провайдера";
    var sNoRegion = "Регион не определен";
    var sCellularProvider = "Сотовая связь";
    var bIsFoundProvider = false;
    var bRegion = false;

	$("btn_forward").style.display = 'block';

//	providerButton.logo.backgroundImage = 'url('+sLogoContent+')';
//	providerButton.text.innerHTML = '';
	vAlignP();

	if (!$isNoU(result) && !$isNoU(result.provider) && !$isNoU(result.provider.sName)) {
        // log start
	    _log('<pr i="' + result.provider.id + '"></pr>');
        // log stop
	    if (top8allacc.block) {
	        if (top8allacc.id != result.provider.id) {
	            top8allacc.block = false;
	        }
	    }

	    if (nNoCommission !== 0) {
	        oDiv.style.width = 23 * nNoCommission;
	        oDiv.style.left = (310 - 23 * nNoCommission) / 2;
	    }
		bIsFoundProvider = true;
		nPrvId = result.provider.id;
		if (nPrvId == 2 && result.priority == BEELINE_INTERNET_VALUE) {
			sPrv = "Билайн Интернет";
		}
		else {
			sPrv = result.provider.sName;
		}
        if (!$isNoU(result) && !$isNoU(result.region)) {
            bRegion = true;
	        sRegion = result.region;
	    }
	}

	if (bIsFoundProvider) {
	    sTxt = sPrv + "<br />" + sRegion;

	    if (!$isNoU(result) && !$isNoU(result.provider)) {
	        oProv = result.provider;
	        if (
				result.provider.hasOwnProperty("logo") &&
				!$isNoU(result.provider.logo) &&
				result.provider.logo.is(String)
			) {
	            providerButton.logo.backgroundImage = 'url(./img/ui_item/' + getFileName(result.provider.logo) + ')';
	        }

	        providerButton.text.innerHTML = result.provider.buttonName || result.provider.sName;
	        vAlignP();
	        vAlignP();
	    }
	    else {
	        result.provider.id = nPrvId.toString(10);
	        result.provider.sName = sPrv != sNoPrv ? sPrv : sCellularProvider;
	        oProv = {};
	    }
	    $('container7').className = 'init_l';
	    $("num_info").style.marginTop = "55px";
	    if (result.provider == "false") {
	        sTxt = sNoPrv;
	        $("btn_forward").style.display = 'none';
	    }
	}
	else {
        // log start
	    _log('<pr i="u"></pr>');
         // log stop
	    if (!top8allacc.block) {
	        providerButton.text.innerHTML = '';
	        vAlignP();
	        $('container7').className = 'init_l undefined';
	        $("num_info").style.marginTop = "10px";
	    }
	}
	$("num_info").style.display = "block";
	if (top8allacc.block) {
	    if (bRegion) {
	        $("num_info_txt").innerHTML = sTxt;
	    }
	    else {
	        $("num_info_txt").innerHTML = '';
	    }
	}
	else {
	    $("num_info_txt").innerHTML = sTxt;
	}

    storage.put("provider", nPrvId.toString());
    storage.put("groupId", "-20");
    setTimeout(function() {
	    startAdvert("Adv_Cellular");
    }, 100);
}

function backward() {
    new CInnerShadow('btn_back');
    // log start
    _log('<et t="b"></et>');
    _log('</p>');
    // log stop
    setTimeout(function () {
        storage.put("pay_info", "null");
        storage.remove("provider");
        location = "./main.html";
    }, 100);
}

function forward() {
    new CInnerShadow('btn_forward');
    // log start
    _log('<et t="f"></et>');
    _log('</p>');
    // log stop
    var oProvider = {};
    oProvider.path = '-20';
    setTimeout(function () {
        storage.put("last_page", document.location.href);
        if (nPrvId == 0) {
            if (top8allacc.block) {
                oProvider.prvId = top8allacc.provider.getId();
                oProvider.prvName = top8allacc.provider.getName();
                oProvider.prvLogo = top8allacc.provider.getLogo();
                oProvider.account = sNumber;
                oProvider.isCellular = 'true';
                storage.put("pay_info", oProvider.serialize());
                storage.put("Phone_Number", $("number").value);
                ff.prv_id.value = oProvider.prvId;
                ff.prv_name.value = oProvider.prvName;
                ff.getAccountNumber.value = oProvider.account;
                if (top8allacc.provider.getMaxSum()) {
                    $("inp").innerHTML = '<input type="hidden" name="MaxCashLimit" value="' + top8allacc.provider.getMaxSum() + '" />';
                }
                ff.komissiya.value = top8allacc.provider.getMinSum();
                ff.action = './validate_confirm.html';
                ff.submit();
            }
            else {
                oProvider.prvId = 0;
                oProvider.prvName = 'cellular';
                oProvider.prvLogo = 'null.gif';
                oProvider.account = sNumber;
                oProvider.isCellular = 'true';
                storage.put("pay_info", oProvider.serialize());
                storage.put("Phone_Number", $("number").value);
                storage.put("bevalValue", "cellular");
                storage.put("group", "-20");
                storage.put("flag_cel", "true");
                ff.prv_id.value = '0';
                ff.prv_name.value = 'cellular';
                ff.getAccountNumber.value = sNumber;
                ff.action = './pages.html';
                ff.submit();
            }
        }
        else {
            oProvider.prvId = nPrvId;
            oProvider.prvName = sPrv;
            oProvider.prvLogo = oProv.logo;
            oProvider.account = sNumber;
            oProvider.isCellular = 'true';
            oProvider.tag = oProv.tag;
            if (oProvider.tag.indexOf('action') != -1) {
                storage.put("sBlockAdv", "ПЛАТЕЖИ МЕГАФОН В QIWI - БЕЗ КОМИССИИ!");
            }
            storage.put("pay_info", oProvider.serialize());
            storage.put("Phone_Number", $("number").value);
            ff.prv_id.value = nPrvId;
            ff.prv_name.value = sPrv;
            ff.getAccountNumber.value = sNumber;
            if (!$isNoU(oProv["maxSum"])) {
                $("inp").innerHTML = '<input type="hidden" name="MaxCashLimit" value="' + oProv["maxSum"] + '" />';
            }

            if (!$isNoU(oProv["minSum"])) {
                ff.komissiya.value = oProv["minSum"];
            }
            ff.action = './validate_confirm.html';
            ff.submit();
        }
    }, 100);
}

function vAlignP() {
	providerButton.text.style.marginTop = (providerButton.text.parentNode.clientHeight - providerButton.text.clientHeight) / 2 + 'px';
}













