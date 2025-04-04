function getAdvPlace(place) {
    var oPlace = $(place);
    if (!oPlace) {
        var oContent = $('content');
        oPlace = document.createElement('div');
        with (oPlace.style) {
            position = 'absolute';
            top = '0px';
            left = '0px';
            width = '1px';
            height = '1px';
        }
        if (oContent) {
            oContent.appendChild(oPlace);
        }
        else {
            document.body.appendChild(oPlace);
        }
        var oContentBlock = document.createElement('div');
        with (oContentBlock.style) {
            position = 'relative';
            width = '100%';
            height = '100%';
        }
        oPlace.appendChild(oContentBlock);
    }
    else {
        with (oPlace.style) {
            position = 'relative';
            width = '100%';
            height = '100%';
        }
        oPlace = oPlace.parentNode;
    }
    var oRect = getElementRect(oPlace);
    var oBodyRect = getElementRect(document.body);
    oRect.left = oRect.left - ((oBodyRect.width - 1280) / 2);
    with (oPlace.style) {
        position = 'absolute';
        left = oRect.left + 'px';
        overflow = 'hidden';
    }
    return { place: oPlace, rect: oRect };
}

function GetDateTimeString() {
    var dat = new Date();
    var nMonth = 1 + dat.getMonth();
    var strDate = dat.getDate() + "." + nMonth + "." + dat.getFullYear() + "," + dat.getHours() + ":" + dat.getMinutes() + ":" + dat.getSeconds();
    return strDate;
}

function saveMarketInfo(oPay) {
    if (typeof oPay == 'object' && oPay.hasOwnProperty('project_number')) {
        var aInfoPay = Object.deserialize(storage.get('payList_adv_counter'));
        if (aInfoPay == null) {
            aInfoPay = [];
            aInfoPay.push(oPay);
        }
        else {
            var b = true;
            for (var i = 0; i < aInfoPay.length; i++) {
                if (aInfoPay[i]['project_number'] == oPay['project_number']) {
                    aInfoPay[i] = oPay;
                    b = false;
                }
            }
            if (b) {
                aInfoPay.push(oPay);
            }
        }
        storage.put('payList_adv_counter', aInfoPay.serialize());
    }
}

CAdvKeyboard = createClass
(
    CObj,
    {
        ctor: function (oPlace) {
            CAdvKeyboard.base.ctor.call(this);
            this._oPlace = oPlace;
            this._aKey = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', ''];
            this._paint();
        },

        _paint: function () {
            var oBlock = document.createElement('div');
            with (oBlock.style) {
                width = '400px';
                height = '520px';
            }
            this._oPlace.appendChild(oBlock);
            var oKey = null;
            for (var i = 0; i < this._aKey.length; i++) {
                oKey = document.createElement('div');
                with (oKey.style) {
                    width = '33%';
                    height = '25%';
                    styleFloat = 'left';
                    textAlign = 'center';
                    fontSize = '72px';
                    color = 'white';
                    paddingTop = '20px';
                }
                oBlock.appendChild(oKey);
                if (this._aKey[i].length) {
                    oKey.style.background = 'url(\'./img/ui/adv/keyboard/key_b.gif\') no-repeat center';
                    oKey.innerHTML = this._aKey[i];
                    attachEventListener(oKey, 'click', $delegate(this, this._click));
                }
            }
        },

        _click: function (oEl) {
            var sValue = oEl.srcElement.innerHTML;
            this.notify("onClick", { value: sValue });
        }
    }
);

    CAdvInput = createClass
(
    CObj,
    {
        ctor: function (oPlace) {
            CAdvInput.base.ctor.call(this);
            this._oPlace = oPlace;
            this._sNumber = '';
            this._oNum1 = null;
            this._oNum2 = null;
            this._oBrackets = null;
            this._paint();
        },

        _paint: function () {
            var oBlock = document.createElement('div');
            with (oBlock.style) {
                position = 'relative';
                width = '620px';
                height = '82px';
                background = 'url(\'./img/ui/adv/input/input.gif\') no-repeat center';
                fontWeight = 'lighter';
                color = '#363636';
            }
            this._oPlace.appendChild(oBlock);
            oBlock.innerHTML =
            '<p style="float:left;margin:8px 0px 0px 10px;font-size:56px;">8</p>' +
            '<p id="adv_input_brackets" style="float:left;margin-top:5px;font-size:56px;display:none;">&nbsp(&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp)</p>' +
            '<p id="adv_input_num_1" style="position:absolute;top:8px;left:77px;font-size:56px;"></p>' +
            '<p id="adv_input_num_2" style="position:absolute;top:8px;left:205px;font-size:56px;"></p>' +
            '<div id="adv_input_backspace" style="position:absolute;top:8px;left:460px;width:150px;height:66px;background:url(\'./img/ui/adv/input/backspace.gif\') no-repeat center;"></div>';

            this._oNum1 = $('adv_input_num_1');
            this._oNum2 = $('adv_input_num_2');
            this._oBrackets = $('adv_input_brackets');
            attachEventListener($('adv_input_backspace'), 'click', $delegate(this, this._backspace));
        },

        set: function (sValue) {
            this._oBrackets.style.display = 'block';
            if (this._oNum1.innerHTML.length < 3) {
                this._oNum1.innerHTML += sValue;
            }
            else {
                if (this._oNum2.innerHTML.length < 9) {
                    if (this._oNum2.innerHTML.length == 3 || this._oNum2.innerHTML.length == 6) {
                        this._oNum2.innerHTML += '-' + sValue;
                    }
                    else {
                        this._oNum2.innerHTML += sValue;
                    }
                }
            }
            if (this._oNum2.innerHTML.length == 9) {
                this.notify("onValid", { value: true });
            }
        },

        _backspace: function () {
            if (this._oNum2.innerHTML.length) {
                if (this._oNum2.innerHTML.length == 5 || this._oNum2.innerHTML.length == 8) {
                    this._oNum2.innerHTML = this._oNum2.innerHTML.substr(0, this._oNum2.innerHTML.length - 2);
                }
                else {
                    this._oNum2.innerHTML = this._oNum2.innerHTML.substr(0, this._oNum2.innerHTML.length - 1);
                }
            }
            else {
                if (this._oNum1.innerHTML.length) {
                    this._oNum1.innerHTML = this._oNum1.innerHTML.substr(0, this._oNum1.innerHTML.length - 1);
                }
            }
            if (!this._oNum1.innerHTML.length) {
                this._oBrackets.style.display = 'none';
            }
            this.notify("onValid", { value: false });
        },

        get: function () {
            var sResult = '+7 (' + this._oNum1.innerHTML + ') ' + this._oNum2.innerHTML;
            return sResult;
        }
    }
);

CDataManager = createClass
(
	null,
	{
	    ctor: function () {
	        this._sPhoneNumber = '';
	        this._sAccount = '';
	        this._sPrvName = '';
	        this._sPrvId = '';
	        this._oPayInfo = Object.deserialize(storage.get('pay_info'));
	    },

	    getAccount: function () {
	        if (this._sAccount.length == 0) {
	            if (this._oPayInfo != null) {
	                this._sAccount = this._oPayInfo.account;
	            }
	        }
	        return this._sAccount;
	    },

	    getPrvName: function () {
	        if (this._sPrvName.length == 0) {
	            if (this._oPayInfo != null) {
	                this._sPrvName = this._oPayInfo.prvName;
	            }
	        }
	        return this._sPrvName;
	    },

	    getPrvId: function () {
	        if (this._sPrvId.length == 0) {
	            if (this._oPayInfo != null) {
	                this._sPrvId = this._oPayInfo.prvId;
	            }
	        }
	        return this._sPrvId;
	    },

	    getPhone: function () {
	        if (this._sPhoneNumber.length == 0) {
	            this._sPhoneNumber = storage.get('Phone_Number');
	            if (this._sPhoneNumber == null) {
	                this._sPhoneNumber = '';
	            }
	        }
	        return this._sPhoneNumber;
	    }
	}
);

var dataManager = new CDataManager();