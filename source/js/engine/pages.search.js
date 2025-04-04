CSearchPage = createClass
(
	CPage,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace) {
	        CMainPage.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._dataProvider = new CJsDataProvider(this, "_dataProvider");
	        this._oKeyboard = null;
	        this._sSearchString = "";
	        this._aProviders = [];
	        this._sAdvertPlace = "Search";
	        this._nCurIdx = 0;
	        this._nStrIdx = 1;
	        this._nRows = 2;
	        this._nColumns = 4;
	        this._counter = 0;
	        this._aDivId = [];
	        this._bClaim = false;
	        this._sGroup = storage.get("search_group");

	        this._applySearchString = $delegate(this, function () {
	            $("SearchProvidersString").value = this._sSearchString;
	        });

	        attachPropertyChangeListener("SearchResult", $delegate(this, this._updatePrvList));
	        // log start
            _log('<p v="s">');
            // log stop
	    },

	    _paint: function () {
	        var oPlace = $(this.getPlaceId());
	        if (!$isNoU(oPlace)) {
	            oPlace.innerHTML =
                        '<div style="height: 18px"></div><table cellpadding="0" cellspacing="0" border="0" width="100%" height="180">' +
                        '  <tr valign="middle">' +
                        '    <td width="162" height="180">' +
                        '        <div style="width: 86px; height: 140px; margin: 8px 0px 0px 51px;"><img alt="" src="./img/ui/qiwicel.gif" /></div>' +
                        '    </td>' +
                        '    <td width="1090" height="180">' +
                        '        <div id="advert_1" style="width: 1090px; height: 180px; margin-left: 5px; overflow: hidden;"></div>' +
                        '    </td>' +
                        '  </tr>' +
                        '</table>' +
                        '<div id="' + this._sInstance + '_page_body" class="search-results" style="width: 100%; height: 691px; overflow: hidden;"></div>' +
    	                '<div align="center" style="width: 100%; height: 121px;"><div id="' + this._sInstance + '_bottom_menu"></div></div>';
	            this._createBottomMenu(this._sInstance + "_bottom_menu");
	            this._createContent(this._sInstance + "_page_body");
	        }
	        startAdvert("Main");
	        var that = this;
	        this._time = setTimeout(function () { that._timeOut() }, 120000);
	    },

	    _createContent: function (sPlace) {
	        $(sPlace).vAlign = "top";
	        $(sPlace).innerHTML =
                '<div style="width: 1260px; height: 121px; margin-top: 10px;">' +
                '  <div style="float: left; width: 934px; height: 100%; position: relative; left: 20px">' +
                '    <table cellpadding="0" cellspacing="0" border="0" width="924" height="121">' +
                '       <tr>' +
                '          <td style="width: 29px; height: 100%; background: url(\'./img/ui/sp/left_pole.gif\') no-repeat;"></td>' +
                '          <td style="height: 100%; overflow: hidden; background: url(\'./img/ui/sp/pole_center.gif\') repeat-x;">' +
                '            <table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">' +
                '               <tr>' +
                '                  <td style="height: 81px;">' +
                '                    <div id="' + this._sInstance + '_field"></div>' +
                '                  </td>' +
                '               </tr>' +
                '               <tr>' +
                '                  <td style="height: 40px;">' +
                '                    <div style="height: 40px; text-align: left; color: #fff; font-size: 22px; padding-top: 5px;">Введите название провайдера</div>' +
                '                  </td>' +
                '               </tr>' +
                '            </table>' +
                '          </td>' +
                '          <td style="width: 29px; height: 100%; background: url(\'./img/ui/sp/right_pole.gif\') no-repeat;"></td>' +
                '       </tr>' +
                '    </table>' +
	            '</div>' +
                '  <div id="' + this._sInstance + '_bs" style="float: right; padding-left: 0px; height: 100%;"></div>' +
                '</div>' +
	            '<div id="' + this._sInstance + '_providers" style="width: 1260px; height: 265px; margin-top: 15px; display: block;"></div>' +
	            '<div id="' + this._sInstance + '_claim" style="width: 1260px; height: 260px; margin-top: 20px; display: none;">' +
	            '   <div style="width: 1040px; height: 230px; margin-top: 15px; margin-left: 120px; background: white; overflow: hidden;">' +
	            '       <div style="width: 17px; height: 230px; float: left; background: url(\'./img/ui/vc/l_p.gif\');"></div>' +
	            '       <div style="width: 1006px; height: 230px; float: left; background: url(\'./img/ui/vc/c_p.gif\');">' +
	            '           <div style="width: 685px; height: 230px; float: left;">' +
	            '               <p style="color: #6d6d6f; font-size: 20px; margin-top: 15px; font-weight: lighter;">Проверьте правильность написания названия компании</p>' +
	            '               <p id="' + this._sInstance + '_addPrv" style="height: 100px; color: #fb6622; font-size: 39px; margin-top: 25px; font-weight: bold;"></p>' +
	            '               <p style="color: #6d6d6f; font-size: 20px; margin-top: 0px; font-weight: bold;">Если Вы не нашли в списке нужную компанию-поставщика услуг,<br />отправьте в QIWI заявку на добавление кнопки.</p>' +
	            '           </div>' +
	            '       </div>' +
	            '       <div style="width: 17px; height: 230px; float: right; background: url(\'./img/ui/vc/r_p.gif\');"></div>' +
	            '   </div>' +
	            '</div>' +
	            '<div id="' + this._sInstance + '_keyboard" style="width: 1050px; height: 229px; margin-top: 6px; margin-left: 120px; overflow: hidden;"></div>';
	        this._drawBackspaceBtn(this._sInstance + "_bs");
	        this._drawKeyboard('rus');
	        this._drawProviders(this._sInstance + "_providers");
	    },

	    _drawBackspaceBtn: function (sPlace) {
	        var oBtn = new CImageButton(this, "bs_btn", sPlace, "BACKSPACE", "./img/ui/sp/delbtn.gif");
	        oBtn.attachListener("onClick", $delegate(this, this._onButtonClick));
	        oBtn.render();
	    },

	    _drawClaimBtn: function (bStep) {
	        if (bStep) {
	            var oDiv = document.createElement('div');
	            document.getElementsByTagName('body')[0].appendChild(oDiv);
	            oDiv.id = "claim_btn";
	            var oBtn = new CImageButton(this, "c_btn", "claim_btn", "CLAIM", "./img/ui/navigation/claim_btn.gif");
	            oBtn.attachListener("onClick", $delegate(this, this._addProviderClick));
	            oBtn.create();
	            oBtn.render();
	        }
	        else {
	            if ($("claim_btn")) {
	                discardElement($("claim_btn"));
	            }
	        }
	    },

	    _drawKeyboard: function (board) {
	        var oKb = new CSearchKeyboard(this, "kb", this._sInstance + "_keyboard");
	        oKb.attachListener("onKeyPress", this._buttonPress);
	        oKb.create();
	        oKb.render();
	    },

	    _buttonPress: function (eargs, sender) {
	        var key = sender.value;

	        if (key == 'ПРОБЕЛ') {
	            key = ' ';
                // log start
	            _log('<c v="space"></c>');
                // log stop
	        }
	        else {
	            // log start
	            _log('<c v="' + sender.value + '"></c>');
	            // log stop
	        }

	        if (eargs._oParent._sSearchString.length < 18) {
	            eargs._oParent._sSearchString += key.toUpperCase();
	            eargs._oParent._drawSearchString();
	        }
	    },

	    _updatePrvList: function () {
	        sList = $("SearchResult").value;
	        this._fillPrvList(sList);
	        this._nCurIdx = 0;
	        insertContent(this._sInstance + "_providers", "");
	        this._drawProviders(this._sInstance + "_providers");
	    },

	    _fillPrvList: function (sList) {
	        this._aProviders = [];
	        if (!$is(sList, String))
	            return;
	        var aList = sList.split(";");
	        for (var i = 0; i < aList.length; i++) {
	            var aFields = aList[i].split("|");
	            if (aFields.length < 3) continue;
	            var o = {};
	            o["id"] = (!$isNoU(aFields[0])) ? aFields[0].toString() : "";
	            o["sName"] = (!$isNoU(aFields[1])) ? aFields[1].toString() : "";

	            var names = o["sName"].split('^');
	            o["sName"] = names[0];
	            o["buttonName"] = names.length > 1 ? names[1] : names[0];

	            o["logo"] = (!$isNoU(aFields[2])) ? aFields[2].toString() : "";
	            o["tag"] = (!$isNoU(aFields[3])) ? aFields[3].toString() : "";
	            if (o.tag.indexOf('no_search') == -1) {
	                this._aProviders.push(o);
	            }
	        }
	        if (this._sSearchString.length > 0) {
	            var oClaim = {};
	            oClaim["id"] = "claim";
	            this._aProviders.push(oClaim);
	        }
	    },

	    _drawProviders: function (sPlace) {
	        this._oRightBtmBtn.setEnabled(false);
	        if (this._aProviders.length) {
	            var nPage = (this._nCurIdx / (this._nRows * this._nColumns)) + 1;
	            var nPages = Math.ceil(this._aProviders.length / (this._nRows * this._nColumns));
	            insertContent(sPlace, this._getProviderPlaces());
	            this._createProviders();
	            this._oRightBtmBtn.setEnabled((this._nCurIdx + (this._nRows * this._nColumns)) < this._aProviders.length);
	        }
	        else {
	            var sContent = "";
	            if (!this._sSearchString.length) {
	                sContent = '<div style="margin: 0; text-align: center; padding-top: 100px; font-size: 50px; font-weight: normal; color: #2268c6;">Выберите первую букву названия</div>';
	            }
	            insertContent(sPlace, sContent);
	        }
	    },

	    _createBottomMenu: function (sPlace) {
	        CMainPage.base._createBottomMenu.apply(this, arguments);
	        this._oLeftBtmBtn = new CBtmMenuButton(this, "left_btn", "btn_left", "back.gif");
	        this._oCenterBtmBtn = new CBtmMenuButton(this, "center_btn", "btn_center", "menu.gif");
	        this._oRightBtmBtn = new CBtmMenuButton(this, "right_btn", "btn_right", "next.gif");
	        this._oLeftBtmBtn.render();
	        this._oCenterBtmBtn.render();
	        this._oRightBtmBtn.render();
	        this._oLeftBtmBtn.attachListener("onClick", $delegate(this, this._backButtonClick));
	        this._oCenterBtmBtn.attachListener("onClick", $delegate(this, this._menuButtonClick));
	        this._oRightBtmBtn.attachListener("onClick", $delegate(this, this._forwardButtonClick));
	        this._oLeftBtmBtn.setEnabled(true);
	        this._oRightBtmBtn.setEnabled(false);
	    },

	    _createProviders: function () {
	        var oPlace = null;
	        var oNamePlace = null;
	        var oProvider = null;
	        var nLastIdx = this._nCurIdx + (this._nRows * this._nColumns);
	        if (nLastIdx > this._aProviders.length) nLastIdx = this._aProviders.length;

	        for (var i = this._nCurIdx; i < nLastIdx; i++) {
	            oPlace = $(this._sInstance + "_prv_" + ((this._nCurIdx ? (i % this._nCurIdx) : i) + 1));
	            oPlace.style.position = "relative";
	            oNamePlace = $(this._sInstance + "_prv_name_" + ((this._nCurIdx ? (i % this._nCurIdx) : i) + 1));
	            if (oPlace) {
	                if (this._aProviders[i]["id"] != "claim") {
	                    oProvider = new CElementButton(this, "prv" + (i + 1),
	                                oPlace.id,
	                                new CConfigObject(this, "provider", this._aProviders[i]));
	                    oProvider.attachListener("onClick", $delegate(this, this._providerClick));
	                    oProvider.render();
	                }
	                else {
	                    oProvider = new CClaimButton(this, "prv" + (i + 1), oPlace.id, (this._sSearchString.length > 5) ? (this._sSearchString.substr(0, 5) + '...') : this._sSearchString);
	                    oProvider.attachListener("onClick", $delegate(this, this._claimClick));
	                    oProvider.render();
	                }
	            }
	        }
	    },

	    _getProviderPlaces: function () {
	        var sContent = [];
	        if (this._aProviders.length) {
	            sContent.push('<table cellpadding="0" cellspacing="0" border="0" style="width: 1240px; height: 100%; margin-left: 20px"><tr>');
	            for (var i = 0, l = this._nRows * this._nColumns; i < l; i++) {
	                if (i > 0 && !(i % this._nColumns)) sContent.push('</tr><tr>');
	                sContent.push('<td align="center" valign="middle" style="width: ', (100 / this._nColumns).toString(10), '%; height: ', (100 / this._nRows).toString(10), '%;"><div style="height:130px;" id="', this._sInstance, "_prv_", (i + 1), '"></div></td>');
	            }
	            sContent.push('</tr></table>');
	        }
	        return sContent.join('');
	    },

	    _claimClick: function (sender, eargs) {
            // log start
	        _log('<c t="clm"></c>');
            // log stop
	        $(this._sInstance + '_providers').style.display = "none";
	        $(this._sInstance + '_claim').style.display = "block";
	        this._drawClaimBtn(true);
	        var str = (this._sSearchString.length > 13) ? this._sSearchString.substr(0, 13) + '...' : this._sSearchString;
	        $(this._sInstance + '_addPrv').innerHTML = 'ДОБАВИТЬ ' + str + ' В QIWI';
	        this._bClaim = true;
	    },

	    _addProviderClick: function (sender, eargs) {
	        this._postData();
	    },

	    _postData: function (sUrl, id) {
	        this._timeOut = null;
	        var sId = id || '0',
	            url = sUrl || 'claim.html',
	            sClaim = (this._bClaim) ? "true" : "false";
	        storage.put("ClaimProvider", this._sSearchString);
	        var oForm = new CForm(this, "oForm", "./" + url);
	        oForm.put("prv_id", "270");
	        oForm.put("prv_name", "test");
	        oForm.put("getAccountNumber", "0000000000");
	        oForm.put("_extra_fake_provider", "true");
	        oForm.put("_extra_result_int_page", url);
	        oForm.put("_extra_no_print_check", "true");
	        oForm.put("_extra_claim_text", this._sSearchString);
	        oForm.put("_extra_page_index", this._nStrIdx.toString());
	        oForm.put("_extra_id_provider", sId);
	        oForm.put("_extra_id_group", (this._sGroup != null) ? this._sGroup : "0");
	        oForm.put("_extra_claim", sClaim);
	        oForm.submit();
	    },

	    _providerClick: function (sender, eargs) {
	        // log start
            _log('<c t="pr" i="' + eargs.getId() + '"></c>');
	        _log('<et t="pr"></et>');
	        _log('</p>');
            // log stop
	        this._getProvider(eargs.getId());
	    },

	    _getProvider: function (sId) {
	        var prv = getScriptIE(sId);
	        if (prv == null) {
	            // log start
	            _log('<e t="6"></e>');
	            _log('</p>');
	            // log stop
	            document.location.href = "./provider_undefined.html";
	        }
	        else {
	            this._applyProvider(prv);
	        }
	    },

	    _applyProvider: function (prv) {
	        var oProvider = prv;
	        this._dataProvider.modifyProvider(oProvider);
	        if (!$isNoU(oProvider)) {
	            storage.put("provider", oProvider["id"]);
	            storage.put("last_page", document.location.href);
	            if (this._dataProvider.isTagO(oProvider, "ranges")) {
	                storage.put("return_page", "cellular.html");
	                this._postData("return.html", oProvider["id"]);
	            }
	            else if (this._dataProvider.isTagO(oProvider, "charity")) {
	                storage.put("return_page", "charity.html");
	                this._postData("return.html", oProvider["id"]);
	            }
	            else {
	                if (!$isNoU(oProvider["prvPage"]) &&
                           oProvider["prvPage"].is(String) &&
                           oProvider["prvPage"].length > 0) {
	                    this._saveData(oProvider["prvPage"], oProvider);
	                }
	                else {
	                    storage.remove("search_group");
	                    storage.put("return_page", "provider.html");
	                    this._postData("return.html", oProvider["id"]);
	                }
	            }
	        }
	    },

	    _saveData: function (sUrl, oPrv) {
	        storage.remove("search_group");
	        if (!$isNoU(oPrv)) {
	            var o = { "constParams": {} };
	            if (!$isNoU(oPrv["id"]))
	                o.id = oPrv["id"];
	            if (!$isNoU(oPrv["sName"]))
	                o.name = oPrv["sName"];
	            for (var f in oPrv["constParams"]) {
	                if (oPrv["constParams"].hasOwnProperty(f))
	                    if ($is(oPrv["constParams"][f], String))
	                        o["constParams"][f] = oPrv["constParams"][f];
	            }
	            o.url = sUrl;
	            storage.put("postData", o.serialize());
	        }
	        this._postData("emb_post.html", o.id);
	    },

	    _drawSearchString: function () {
	        $(this._sInstance + '_providers').style.display = "block";
	        $(this._sInstance + '_claim').style.display = "none";
	        this._drawClaimBtn(false);
	        $(this._sInstance + "_field").innerHTML = this._sSearchString;
	        if (this.applyTimer) clearTimeout(this.applyTimer);
	        this.applyTimer = setTimeout(this._applySearchString, 250);
	    },

	    _makeText: function (nPage, nPages) {
	        return '<span style="color: #2268c6; font-size: 18px;">' + nPage.toString(10) + ' страница из ' + nPages.toString(10) + '</span>';
	    },

	    _onButtonClick: function (sender, eargs) {
	        var sKey = !$isNoU(eargs.key) ? eargs.key : eargs.value;
	        if (sKey == "BACKSPACE") {
                // log start
	            _log('<c v="bs"></c>');
                // log stop
	            if (this._sSearchString.length) {
	                this._sSearchString = this._sSearchString.substr(0, this._sSearchString.length - 1);
	                this._drawSearchString();
	            }
	        }
	        else {
	            if (this._sSearchString.length < 32) {
	                this._sSearchString += sKey;
	                this._drawSearchString();
	            }
	        }
	    },

	    _timeOut: function () {
	        // log start
            _log('<et t="tt"></et>');
	        _log('</p>');
            // log stop
	        storage.remove("search_group");
	        storage.put("return_page", "index.html");
	        this._postData("return.html");
	    },

	    _backButtonClick: function (sender, eargs) {
	        if (this._bClaim) {
	            // log start
                _log('<c t="clm"></c>');
                // log stop
	            $(this._sInstance + '_providers').style.display = "block";
	            $(this._sInstance + '_claim').style.display = "none";
	            this._drawClaimBtn(false);
	            this._bClaim = false;
	        }
	        else
	            if (this._nCurIdx) {
	                // log start
	                _log('<c t="b"></c>');
	                // log stop
	                this._nCurIdx -= this._nRows * this._nColumns;
	                this._nStrIdx--;
	                this._drawProviders(this._sInstance + "_providers");
	                this._oRightBtmBtn.setEnabled(true);
	            }
	            else {
	                // log start
	                _log('<et t="b"></et>');
	                _log('</p>');
	                // log stop
	                if (document.location.hash.indexOf('.html') > -1) {
	                    storage.remove("search_group");
	                    storage.put("return_page", document.location.hash.substr(1).replace(new RegExp("[^a-zA-Z.]", "g"), ""));
	                    this._postData("return.html");
	                }
	                else {
	                    //	            	    window.history.back(-1);
	                    storage.remove("search_group");
	                    storage.put("return_page", "index.html");
	                    this._postData("return.html");
	                }
	            }
	    },

	    _menuButtonClick: function (sender, eargs) {
	        // log start
            _log('<et t="m"></et>');
	        _log('</p>');
            // log stop
	        storage.put("return_page", "index.html");
	        this._postData("return.html");
	    },

	    _forwardButtonClick: function (sender, eargs) {
	        // log start
            _log('<c t="f"></c>');
            // log stop
	        if ((this._nCurIdx + (this._nRows * this._nColumns)) < this._aProviders.length) {
	            this._nCurIdx += this._nRows * this._nColumns;
	            this._nStrIdx++;
	            this._drawProviders(this._sInstance + "_providers");
	        }
	        else {
	            sender.setEnabled(false);
	        }
	    }
	}
);
