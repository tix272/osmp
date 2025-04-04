CProviderPage = createClass
(
	CPage,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace, oProvider) {
	        var args = { "0": arguments[3] };
	        Function.validateParams(args, [
                { name: "oProvider", type: Object }
            ]);
	        if (!this._isValidProvider(oProvider)) {
	            // log start
	            _log('<e t="3"></e>');
	            _log('</p>');
	            // log stop
	            document.location.href = "./index.html";
	        }
	        CProviderPage.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._oProvider = oProvider;
	        this._oPostData = { "prv_id": oProvider["id"], "prv_name": oProvider["sName"] };
	        this.aTabs = [];
	        this._aTabsMap = [];
	        this.oTab = null;
	        this._aPagesId = [];
	        this._sContentPlace = '';
	        this._sRealPrvId = '';
	        this._bUseOnline = false;
	        this._bChange = (typeof this._oProvider.tag == "string" && this._oProvider.tag.indexOf("change") != -1) ? true : false;
	        this._sOnlineReturnPage = this._bChange ? 'menu.html' : 'validate_confirm.html';
	        this._nCurrentPage = storage.get("current_page");
	        this._nCurrentPage = (this._nCurrentPage !== null) ? parseInt(this._nCurrentPage, 10) : 0;
	        this._aPath = (storage.get("providers_path") == null) ? [] : Object.deserialize(storage.get("providers_path"));
	        this._bOut = false;
	        this._oFieldData = {};
	        this._bFlagOnline = (storage.get("online") == "QQQQ") ? true : false;
	    },

	    _paint: function () {
	        CProviderPage.base._paint.call(this);
	        var oPayInfo = Object.deserialize(storage.get("pay_info"));
	        if (oPayInfo != null && oPayInfo.hasOwnProperty('path')) {
	            storage.put("groupId", oPayInfo.path);
	        }
	        else {
	            if (this._oProvider.hasOwnProperty('__path')) {
	                storage.put("groupId", this._oProvider.__path);
	            }
	        }
	        startAdvert("Provider");
	    },

	    _createContent: function (sPlace) {
	        createElement({ "name": "p", "id": "format_text_size" });

	        this._sContentPlace = sPlace;
	        var sContent = '';
	        sContent =
	            '<table cellpadding="0" cellspacing="0" border="1" style="width: 100%; height: 100%;">' +
                '  <tr>' +
                '    <td id="' + this._sInstance + '_content" align="center" valign="middle" style="width: 100%; height: 100%;">Provider page content place</td>' +
                '  </tr>' +
                '</table>';
	        $(sPlace).innerHTML = sContent;
	        if (!$isNoU(this._oProvider["prvPage"]) && this._oProvider["prvPage"].length) { this._shortPostData(); return; }
	        this._getPagesId();
	        this._preCreateTab(this._aPagesId[this._nCurrentPage], this._sContentPlace);
	    },

	    _createBottomMenu: function (sPlace) {
	        CProviderPage.base._createBottomMenu.apply(this, arguments);
	        this._oLeftBtmBtn = new CBtmMenuButton(this, "left_btn", "btn_left", "back.gif");
	        this._oCenterBtmBtn = new CBtmMenuButton(this, "center_btn", "btn_center", "menu.gif");
	        this._oRightBtmBtn = new CBtmMenuButton(this, "right_btn", "btn_right", "forward.gif");
	        this._oLeftBtmBtn.render();
	        this._oCenterBtmBtn.render();
	        this._oRightBtmBtn.render();
	        this._oLeftBtmBtn.attachListener("onClick", $delegate(this, this._backButtonClick));
	        this._oCenterBtmBtn.attachListener("onClick", $delegate(this, this._menuButtonClick));
	        this._oRightBtmBtn.attachListener("onClick", $delegate(this, this._forwardButtonClick));
	        this._oRightBtmBtn.setEnabled(true);
	    },

	    _isValidProvider: function (oProvider) {
	        return (!$isNoU(oProvider) &&
                    oProvider.hasOwnProperty("id") &&
                    oProvider.hasOwnProperty("sName") &&
                    oProvider.hasOwnProperty("pages") &&
                    !$isNoU(oProvider["pages"]) &&
                    oProvider["pages"] &&
                    $bool($sizeOf(oProvider["pages"])));
	    },

	    _getPagesId: function () {
	        for (var i = 0; i < this._oProvider.pages.length; i++)
	            this._aPagesId.push(this._oProvider.pages[i].pageId);
	    },

	    _getFields: function (aControls) {
	        var aResult = [];
	        if ($is(aControls, Array)) {
	            for (var i = 0; i < aControls.length; i++) {
	                if (!$isNoU(aControls[i])) {
	                    if (aControls[i]["type"] == "text_input") {
	                        aResult.push(aControls[i]);
	                    }
	                }
	            }
	        }
	        return aResult;
	    },

	    _getKeyboard: function (aControls) {
	        var sResult = "";
	        if ($is(aControls, Array)) {
	            for (var i = 0; i < aControls.length; i++) {
	                if (!$isNoU(aControls[i])) {
	                    if (aControls[i]["type"] == "keyboard") {
	                        if ($is(aControls[i]["layout"], String)) {
	                            sResult = aControls[i]["layout"];
	                            break;
	                        }
	                    }
	                }
	            }
	        }
	        return sResult;
	    },

	    _getDispInput: function (aControls) {
	        var aResult = [];
	        if ($is(aControls, Array)) {
	            for (var i = 0; i < aControls.length; i++) {
	                if (!$isNoU(aControls[i])) {
	                    if (aControls[i]["type"] == "disp_input") {
	                        aResult.push(aControls[i]);
	                    }
	                }
	            }
	        }
	        return aResult;
	    },

	    _getDispButton: function (aControls) {
	        var aResult = [];
	        if ($is(aControls, Array)) {
	            for (var i = 0; i < aControls.length; i++) {
	                if (!$isNoU(aControls[i])) {
	                    if (aControls[i]["type"] == "button" || aControls[i]["type"] == "disp_button") {
	                        aResult.push(aControls[i]);
	                    }
	                }
	            }
	        }
	        return aResult;
	    },

	    _getDispCombined: function (aControls) {
	        var aResult = [];
	        if ($is(aControls, Array)) {
	            for (var i = 0; i < aControls.length; i++) {
	                if (!$isNoU(aControls[i])) {
	                    if (aControls[i]["type"] == "disp_button" || aControls[i]["type"] == "button" || aControls[i]["type"] == "disp_input") {
	                        aResult.push(aControls[i]);
	                    }
	                }
	            }
	        }
	        return aResult;
	    },

	    _convertSIdToNId: function (sPageId) {
	        var nReturn = -1;
	        for (var i = 0; i < this._aPagesId.length; i++)
	            if (sPageId == this._aPagesId[i]) {
	                nReturn = i;
	                break;
	            }
	        return nReturn;

	    },

	    _preCreateTab: function (sPageId, sPlace) {
	        // log start
	        _log('<f i="' + sPageId + '"></f>');
	        // log stop
	        var nPageId = this._convertSIdToNId(sPageId),
	            oPage = {};
	        if (nPageId == -1) {
	            // log start
	            _log('</p>');
	            // log stop
	            document.location = "./index.html";
	        }

	        this._aPath.push(nPageId);
	        this._bOut = false;

	        oPage = this._oProvider["pages"][nPageId];
	        if (!$isNoU(oPage["useOnline"]) && oPage["useOnline"] == "true") {
	            this._bUseOnline = true;
	            this._bOut = true;
	            if (nPageId < this._oProvider["pages"].length - 1 && (($isNoU(oPage["nextPage"]) || oPage["nextPage"] !== "-1"))) {
	                storage.put("providers_path", this._aPath.serialize());
	                this._sOnlineReturnPage = 'provider.html';
	                storage.put("online", "QQQQ");
	                if (!$isNoU(oPage["nextPage"]) && oPage["nextPage"].length)
	                    storage.put("current_page", this._convertSIdToNId(oPage["nextPage"]).toString());
	                else
	                    storage.put("current_page", (nPageId + 1).toString());
	            }
	            else {
	                storage.remove("online");
	                storage.remove("current_page");
	                if (this._bChange)
	                    this._sOnlineReturnPage = 'menu.html';
	                else
	                    this._sOnlineReturnPage = 'validate_confirm.html';
	            }
	        }
	        else if (!$isNoU(oPage["nextPage"]) && oPage["nextPage"].length) {
	            if (oPage["nextPage"] == "-1")
	                this._bOut = true;
	            else
	                this._nCurrentPage = this._convertSIdToNId(oPage["nextPage"]);
	        }
	        else if (!$isNoU(oPage["lastPage"]) && oPage["lastPage"] == "true")
	            this._bOut = true;
	        else
	            this._nCurrentPage++;

	        $(sPlace).innerHTML = '';
	        this._createTab(nPageId, sPlace);


	        //====================================

	        if (nPageId == 0) {
	            switch (this._oProvider.id) {
	                case "4108":
	                    this._createSTab("codg.gif");
	                    break;
	                case "5263":
	                    this._createSTab("spu.gif");
	                    break;
	            }
	        }

	        //====================================      
	    },

	    _createSTab: function (sLogo) {
	        $("phone_btn").style.display = "block";
	        var oBtn = new CImageButton(null, "phone_btn", 'phone_btn', "HELP", "./img/ui/" + sLogo);
	        oBtn.attachListener("onClick", $delegate(this, this._onSPhone));
	        oBtn.render();
	    },

	    _onSPhone: function () {
	        storage.remove("pay_info");
	        storage.remove("current_page");
	        storage.remove("providers_path");
	        storage.remove("online");
	        switch (this._oProvider.id) {
	            case "4108":
	                document.location.href = "./p_cbtk_help.html";
	                break;
	            case "5263":
	                document.location.href = "./p_psk_help.html";
	                break;
	        }

	    },

	    _createTab: function (nIdx, sPlace) {
	        var sDiv = "",
	            page = null,
	            nTabIdx = 0,
	            oTab = null,
	            sKeyboard = "",
	            aFields = [],
	            aDispInput = [],
	            aDispButton = [],
	            aDispCombined = [],
	            o = {},
	            s = '';

	        if (!$isNoU(this._oProvider) && !$isNoU(this._oProvider["pages"]) &&
                this._oProvider["pages"].is(Array)) {
	            sDiv = sPlace + "_tab";
	            page = this._oProvider.pages[nIdx];
	            this.oTab = null;
	            if (!$isNoU(page)) {
	                if ($is(page["__objects"], Array)) {
	                    for (var i = 0; i < page["__objects"].length; i++) {
	                        if (!$isNoU(page["__objects"][i])) {
	                            if (page["__objects"][i]["__type"] == "controls") {
	                                sKeyboard = this._getKeyboard(page["__objects"][i]["__objects"]);
	                                aFields = this._getFields(page["__objects"][i]["__objects"]);
	                                aDispInput = this._getDispInput(page["__objects"][i]["__objects"]);
	                                aDispButton = this._getDispButton(page["__objects"][i]["__objects"]);
	                                aDispCombined = this._getDispCombined(page["__objects"][i]["__objects"]);
	                            }
	                        }
	                    }
	                }
	                var oDiv = document.createElement("DIV");
	                oDiv.id = sDiv;
	                oDiv.style.width = oDiv.style.height = "100%";
	                $(sPlace).appendChild(oDiv);
	                if (!$isNoU(page["buttons"]) && page["buttons"].is(Array)) {
	                    this.oTab = new CBtnTab(this, "tab_", sDiv, page["pageId"], page["buttons"]);
	                    this.oTab.attachListener("onClick", $delegate(this, this._btnClicked));
	                    this.oTab.attachListener("onBtmMenuClick", $delegate(this, this._btmMenuClicked));
	                }
	                else if (aFields.length && sKeyboard.length) {
	                    if (sKeyboard.indexOf("DG") > -1) {
	                        this.oTab = new CDGInputTab(this, "tab_", sDiv, page["pageId"],
                                        this._oProvider.buttonName || this._oProvider["sName"], this._oProvider["logo"],
                                        sKeyboard, aFields);
	                    }
	                    else if (sKeyboard.indexOf("AL") > -1) {
	                        this.oTab = new CALInputTab(this, "tab_", sDiv, page["pageId"],
                                        this._oProvider.buttonName || this._oProvider["sName"], this._oProvider["logo"],
                                        sKeyboard, aFields);
	                    }
	                }
	                else if (aDispButton.length && aDispInput.length == 0) {
	                    this._oRightBtmBtn.setEnabled(false);
	                    this.oTab = new CButtonTab(this, "tab_", sDiv, page["pageId"], page["title"], aDispButton);
	                    this.oTab.attachListener("onClick", $delegate(this, this._dispButtonClick));
	                }
	                else if (aDispInput.length && aDispButton.length == 0) {
	                    this.oTab = new CDispInputTab(this, "tab_", sDiv, page["pageId"], aDispInput, "long");
	                }
	                else if (aDispInput.length && aDispButton.length && aDispCombined.length) {
	                    this.oTab = new CDispCombined(this, "tab_", sDiv, page["pageId"], aDispCombined);
	                    this.oTab.attachListener("onClick", $delegate(this, this._dispButtonClick));
	                }
	                if (!$isNoU(this.oTab)) {
	                    this.oTab.attachListener("onStateChange", $delegate(this, this._onTabStateChange));
	                    this.aTabs.push(this.oTab);
	                }
	            }

	            if (this.oTab)
	                this.oTab.render();
	            else
	                document.location.href = "./index.html";
	        }
	    },

	    _onTabStateChange: function (sender, eargs) {
	        if (eargs.isValid)
	            this._oRightBtmBtn.setEnabled(true);
	        else
	            this._oRightBtmBtn.setEnabled(false);
	    },

	    _getConstParam: function () {
	        if (!($isNoU(this._oProvider.constParams) || $isNoU(this._oPostData))) {
	            for (var f in this._oProvider.constParams) {
	                if (this._oProvider.constParams.hasOwnProperty(f)) {
	                    this._oPostData[f] = "";
	                    if (!$isNoU(this._oProvider.constParams[f])) {
	                        if (f == "real_prv_id")
	                            this._sRealPrvId = this._oProvider.constParams[f].toString();
	                        else
	                            this._oPostData[f] = this._oProvider.constParams[f].toString();
	                    }
	                }
	            }
	        }
	    },

	    _getFieldsValue: function () {
	        var sName = '',
                sType = '',
                sValue = '',
                sDesc = '';
	        for (var i = 0; i < this.aTabs.length; i++) {
	            if (this.aTabs[i].is(CInputTab)) {
	                aFields = this.aTabs[i].getFields();
	                for (var j = 0; j < aFields.length; j++) {
	                    sName = aFields[j].getName();
	                    sType = aFields[j].getExtra();
	                    if (sName.length) {
	                        if (sName.indexOf("_extra_") == -1 && sName !== "getAccountNumber")
	                            sName = "_extra_" + sName;
	                        sValue = aFields[j].getValue();
	                        if (sValue == '..')
	                            this._oPostData[sName] = '';
	                        else
	                            this._oPostData[sName] = sValue;
	                        this._oFieldData[sName] = this._oPostData[sName];

	                        if (sType.indexOf("fixedsum") !== -1) {
	                            this._oPostData['_extra_fixed_int_summ'] = sValue;
	                        }

	                        if (sType.indexOf("receipt") !== -1) {
	                            sDesc = aFields[j].getDesc();
	                            this._oPostData['_receipt_' + sDesc] = sValue;
	                        }

	                        sName = '';
	                        sValue = '';
	                        sType = '';
	                        sDesc = '';
	                    }
	                }
	            }
	        }
	    },

	    _deleteInput: function () {
	        for (var i = 1; i < 13; i++)
	            destroy($("disp" + i));
	        destroy($("BarcodeData"));
	    },

	    _shortPostData: function () {
	        var oForm = new CForm(this, "oForm", './' + this._oProvider["prvPage"]);
	        this._getConstParam();
	        for (var e in this._oPostData) {
	            if (!$isNoU(this._oPostData[e]) && this._oPostData[e].is(String) && e !== "_typeName") {
	                oForm.put(e, this._oPostData[e]);
	            }
	        }
	        this._deleteInput();
	        oForm.submit();
	    },

	    _postData: function () {
	        // log start
	        _log('<et t="f"></et>');
	        _log('</p>');
	        // log stop
	        var oPaymentInfo = Object.deserialize(storage.get("pay_info"));

	        if (oPaymentInfo == null) {
	            oPaymentInfo = {};
	            oPaymentInfo["prvLogo"] = this._oProvider["logo"];
	            oPaymentInfo["input_data"] = {};
	        }

	        if (this._bUseOnline) {
	            var oForm = new CForm(this, "oForm", './online_auth.html');
	            oForm.put("_extra_auth_page", "online_auth.html");
	            oForm.put("_extra_auth_success", this._sOnlineReturnPage);
	            oForm.put("_extra_auth_fail", "online_auth_error.html");
	        }
	        else {
	            if (this._bChange)
	                var oForm = new CForm(this, "oForm", "./menu.html");
	            else
	                var oForm = new CForm(this, "oForm", "./validate_confirm.html");
	            storage.remove("current_page");
	            storage.remove("providers_path");
	        }

	        if (!this._bFlagOnline) {
	            this._getConstParam();
	            if (!$isNoU(this._oProvider["maxSum"])) {
	                this._oPostData["MaxCashLimit"] = this._oProvider["maxSum"];
	            }
	            if (!$isNoU(this._oProvider["minSum"]))
	                this._oPostData["komissiya"] = this._oProvider["minSum"];
	            else
	                this._oPostData["komissiya"] = '1';
	            if (this._sRealPrvId.length) {
	                this._oPostData["prv_id"] = this._sRealPrvId;
	                this._oProvider["id"] = this._sRealPrvId;
	            }
	        }
	        else {
	            if (!$isNoU(this._oPostData["prv_id"]))
	                delete this._oPostData["prv_id"];
	            if (!$isNoU(this._oPostData["prv_name"]))
	                delete this._oPostData["prv_name"];
	        }

	        this._getFieldsValue();

	        for (var e in this._oPostData) {
	            if (!$isNoU(this._oPostData[e]) && this._oPostData[e].is(String) && e !== "_typeName") {
	                oForm.put(e, this._oPostData[e]);
	            }
	        }
	        oPaymentInfo["input_data"] = {};
	        for (var f in this._oFieldData) {
	            if (!$isNoU(this._oFieldData[f]) && this._oFieldData[f].is(String) && e !== "_typeName") {
	                oPaymentInfo["input_data"][f] = this._oFieldData[f];
	            }
	        }

	        if (!$isNoU(this._oFieldData["getAccountNumber"]))
	            oPaymentInfo["account"] = this._oFieldData["getAccountNumber"];

	        this._deleteInput();

	        oPaymentInfo["prvId"] = this._oProvider["id"];
	        oPaymentInfo["prvName"] = this._oProvider["sName"];
	        storage.put("pay_info", oPaymentInfo.serialize());
	        oForm.submit();
	    },

	    _dispButtonClick: function (sender, eargs) {
	        if (eargs.id == "-1")
	            this._bOut = true;
	        else
	            if (eargs.id != '')
	                this._nCurrentPage = this._convertSIdToNId(eargs.id);

	        this._forwardButtonClick();
	    },

	    _backButtonClick: function (sender, eargs) {
	        if (this._bFlagOnline) {
	            storage.put("provider", this._oProvider.id);
	            storage.remove("pay_info");
	            storage.remove("current_page");
	            storage.remove("last_page");
	            storage.remove("providers_path");
	            storage.remove("online");
	            // log start
	            _log('<et t="b"></et>');
	            _log('</p>');
	            // log stop
	            document.location.href = "./provider.html";
	            return;
	        }
	        this._aPath.pop();
	        if (this._aPath.length == 0) {
	            var sBack = storage.get("last_page");
	            sBack = sBack == null ? './main.html' : sBack;
	            storage.remove("pay_info");
	            storage.remove("current_page");
	            storage.remove("last_page");
	            storage.remove("providers_path");
	            storage.remove("online");
	            // log start
	            _log('<et t="b"></et>');
	            _log('</p>');
	            // log stop
	            document.location.href = sBack;
	        }
	        else {
	            this._nCurrentPage = this._aPath.pop();
	            // log start
	            _log('<c t="b" i="' + this._aPagesId[this._nCurrentPage] + '"></c>');
	            // log stop
	            this._preCreateTab(this._aPagesId[this._nCurrentPage], this._sContentPlace);
	        }
	    },

	    _menuButtonClick: function (sender, eargs) {
	        // log start
	        _log('<et t="m"></et>');
	        _log('</p>');
	        // log stop
	        document.location = "./index.html";
	    },

	    _forwardButtonClick: function (sender, eargs) {
	        if (this._bOut || (this._nCurrentPage > (this._oProvider["pages"].length - 1))) {
	            this._postData();
	        }
	        else {
	            this._preCreateTab(this._aPagesId[this._nCurrentPage], this._sContentPlace);
	        }
	    }
	}
);