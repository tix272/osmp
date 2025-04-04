var charityImg = null;

function start() {
	var oPrv = oProv;

	nPrvId = oProv.id;
	sPrv = oProv.sName;
	$('keyboard').style.visibility = 'hidden';

	charityImg = document.createElement('div');
	charityImg.className = 'charity-img';
	charityImg.innerHTML = '<img src="./img/ui_item/charity/' + getFileName(oPrv.charity_logo) + '" />';
	document.getElementsByTagName('body')[0].appendChild(charityImg);

	number = $("number");
	realnumber = number.value.replace(nClean, '').substr(1);

	providerButton.logo = $('logo').getElementsByTagName('div')[0].style;
	providerButton.text = $('logo').getElementsByTagName('p')[0];

	providerButton.logo.backgroundImage = 'url(' + (oPrv != null ? './img/ui_item/' + getFileName(oPrv.logo) : sLogoContent) + ')';
	providerButton.text.innerHTML = oPrv ? (oPrv.buttonName || oPrv.sName) : '';
	vAlignP();
	
	startAdvert("Adv_Cellular");
}

function forward() {
	var oProvider = {};
	if (charityImg) {
	    new CInnerShadow('btn_forward');
	    setTimeout(function () {
	        document.getElementsByTagName('body')[0].removeChild(charityImg);
	        charityImg = null;

	        $('btn_forward').firstChild.src = $('btn_forward').firstChild.getAttribute('nextsrc');
	        $('keyboard').style.visibility = 'visible';

	        var oDiv = $('sound');
	        var oSound = document.createElement('bgsound');
	        oSound.src = './sound/enter_number.wav';
	        oSound.loop = '1';
	        oDiv.appendChild(oSound);
	    }, 100);
	}
	else {   
		sNumber = realnumber.length < 10 ? '0000000000' : realnumber;
		oProvider.prvId = nPrvId;
		oProvider.prvName = sPrv;
		oProvider.prvLogo = oProv.logo;
		oProvider.account = sNumber;
		oProvider.isCellular = 'true';
		oProvider.isCharity = 'true';
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
}

function press(digit) {
    if (digit == 'c') {
        new CInnerShadow("btn_del");
        if (oDiv !== null) {
            oDiv.style.width = 0;
            oDiv.style.left = 0;
        }
        flag = true;
        realnumber = realnumber.substr(0, realnumber.length - 1);
    }
    else if (realnumber !== false && realnumber.length < 10) {
        if (digit == '0') {
            new CInnerShadow("btn_0", 24, true);
        }
        else {
            new CInnerShadow("btn_" + digit);
        }
        if (realnumber == '7' || (realnumber == '8' && digit == '9')) {
            realnumber = digit;
        }
        else {
            realnumber += digit;
        }
    }
    if (printTimer) clearTimeout(printTimer);
    printTimer = setTimeout(print, 50);
}

function preTest(){};
function clearProviderButton(){};

