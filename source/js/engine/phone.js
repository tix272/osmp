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
    providerButton = {};

function start() {
    // log start
    to(180);
    _log('<p v="pe">');
    // log stop
    $('banner').innerHTML = getFlashDef('./swf/banner.swf');

	number = $("number");
	realnumber = number.value.replace(nClean, '').substr(1);

	providerButton.logo = $('logo').getElementsByTagName('div')[0].style;
	providerButton.text = $('logo').getElementsByTagName('p')[0];

	var oPrv = oProv;
	providerButton.logo.backgroundImage = 'url(' + sLogoContent + ')';
	providerButton.text.innerHTML = '';
	vAlignP();
}

var printTimer;
function press(digit) {
    // log start
    _log('<c v="' + digit + '"></c>');
    // log stop
    if (digit == 'c') {
        new CInnerShadow("btn_del");
        flag = true;
        clearProviderButton();
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
    this;
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
        if (flag) {
            // log start
            _log('<v v="' + realnumber + '"></v>');
            // log stop
		    flag = false;
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
    var sTxt = "На данный телефонный номер не возможно перечислить сдачу";
    var sNoPrv = "На данный телефонный номер не возможно перечислить сдачу";
    var sNoRegion = "Регион не определен";
    var bIsFoundProvider = false;

	$("btn_forward").style.display = 'block';

	providerButton.logo.backgroundImage = 'url('+sLogoContent+')';
	providerButton.text.innerHTML = '';
	vAlignP();

	if(!$isNoU(result) && !$isNoU(result.provider) && !$isNoU(result.provider.sName)) {
		bIsFoundProvider = true;
		nPrvId = result.provider.id;
		if (nPrvId == 2 && result.priority == BEELINE_INTERNET_VALUE) {
			sPrv = "Билайн Интернет";
		}
		else {
			sPrv = result.provider.sName;
		}
		if(!$isNoU(result) && !$isNoU(result.region)) {
	        sRegion = result.region;
	    }
	}
	else
	    $("btn_forward").style.display = 'none';

	if (bIsFoundProvider) {
        // log start
	    _log('<pr i="' + result.provider.id + '"></pr>');
        // log stop
	    sTxt = sPrv + "<br />" + sRegion;

	    if (!$isNoU(result) && !$isNoU(result.provider)) {
		   	oProv = result.provider;
			if(
				result.provider.hasOwnProperty("logo") &&
				!$isNoU(result.provider.logo) &&
				result.provider.logo.is(String)
			) {
				providerButton.logo.backgroundImage = 'url(./img/ui_item/' + getFileName(result.provider.logo) + ')';
			}
			
			providerButton.text.innerHTML = result.provider.buttonName || result.provider.sName;
			vAlignP();
	    }
	    else {
			result.provider.id = nPrvId.toString(10);
			result.provider.sName = sPrv != sNoPrv ? sPrv : sCellularProvider;
		   	oProv = {};
		   	
	    }
    }
    else {
        // log start
        _log('<pr i="u"></pr>');
        // log stop
    }
	
	
    $('container7').className = 'init_l' + (bIsFoundProvider ? '' : ' undefined');

    $("num_info").style.marginTop = (bIsFoundProvider || !$isNoU(result)) ? "55px" : "10px";
    $("num_info").style.display = "block";
        
    if (!$isNoU(result) && !$isNoU(result.provider)) {
        if (result.provider == "false") {
            sTxt = sNoPrv;
            $("btn_forward").style.display = 'none';
        }
    }
    
    $("num_info_txt").innerHTML = sTxt;

    setTimeout(function(){
	    startAdvert("Adv_Cellular");
    }, 100);
}

function getMinSumm(sPrvId) {
    switch (sPrvId.toString()) {
        case '2'    : return '2';
        case '4'    : return '30';
        case '36'   : return '10';
        case '42'   : return '2';
        case '60'   : return '10';
        case '79'   : return '100';
        case '84'   : return '5';
        case '96'   : return '10';
        case '279'  : return '10';
        case '303'  : return '5';
        case '329'  : return '5';
        case '352'  : return '5';
        case '358'  : return '10';
        case '383'  : return '50';
        case '881'  : return '5';
        default: return '1';
    }
}

function backward() {
    new CInnerShadow('btn_back');
    // log start
    _log('<et t="b"></et>');
    _log('</p>');
    // log stop
    setTimeout(function () {
        document.location.href = './menu.html';
    }, 100);
}

function forward() {
    new CInnerShadow('btn_forward');
    // log start
    _log('<et t="f"></et>');
    _log('</p>');
    // log stop
    var o = {};
    setTimeout(function () {
        ff.PrvId2.value = nPrvId;
        ff.PrvName2.value = sPrv;
        ff.AccNum2.value = sNumber;
        ff.MinCashLimit2.value = getMinSumm(nPrvId);
        sNumber = sNumber.replace(new RegExp("[(]", "g"), ' (');
        sNumber = sNumber.replace(new RegExp("[)]", "g"), ') ');
        o.account = sNumber;
        o.id = nPrvId;
        o.name = sPrv;
        storage.put("pay_info2", o.serialize());
        ff.action = './validate_confirm.html';
        ff.submit();
    }, 100);
}

function vAlignP() {
	providerButton.text.style.marginTop = (providerButton.text.parentNode.clientHeight - providerButton.text.clientHeight) / 2 + 'px';
}