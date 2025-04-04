CPagesPage = createClass
(
    CPage,
    {
        ctor: function (oParent, sInstance, sCtrlPlace, sGroup) {
            CPagesPage.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
            // log start
            _log('<p v="ps">');
            // log stop
            var t = this;
            this._sGroup = sGroup;
            this._oGroup = ($browser.agent != BWR_FF) ? getScriptIE(this._sGroup) : getScriptFF(aTop[i], './config/', this, function () { t._loadGroup(); });
            this._oSave = {};
            this._sLoadGroup = sGroup;
            this._aStek = [];
            this._aGroup = [];
            this._sFLogo = '';
            this._oGroupName = {};
            this._nCurrentStr = 1;
            this._sPath = '';
            this._getGroup();
            this._nFinalStr = Math.ceil(this._aGroup.length / 16);
            if (/^\d+$/.test(this._aGroup.length / 16))
                this._nFinalStr--;
        },

        _loadGroup: function () {

        },

        _getGroup: function () {
            var oGroup = new CConfigObject(this, "group", this._oGroup);
            this._sFLogo = oGroup.getFaterLogo(UIGroups);
            this._aGroup = oGroup.getChildren();
            this._oGroupName[oGroup.getId()] = oGroup.getName();
            // log start
            _log('<g i="' + oGroup.getId() + '"></g>');
            // log stop
        },

        _paint: function () {
            var oPlace = $(this.getPlaceId());
            if (!Object.isNullOrUndefined(oPlace)) {
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
                        '<div id="' + this._sInstance + '_page_body" class="page_body"></div>' +
    	                '<div id="' + this._sInstance + '_bottom_menu">';
                storage.put("groupId", this._sGroup);
                startAdvert("Pages");
                this._createBottomMenu(this._sInstance + "_bottom_menu");
                this._createContent(this._sInstance + "_page_body");
            }
        },

        _createBottomMenu: function (sPlace) {
            CPagesPage.base._createBottomMenu.apply(this, arguments);
            this._oRightBtmBtn = new CBtmMenuButton(this, "right_btn", "btn_right", "next.gif");
            this._oLeftBtmBtn = new CBtmMenuButton(this, "left_btn", "btn_left", "back.gif");
            this._oCenterBtmBtn = new CBtmMenuButton(this, "center_btn", "btn_center", "menu.gif");
            this._oLeftBtmBtn.render();
            this._oCenterBtmBtn.render();
            this._oRightBtmBtn.render();
            this._oLeftBtmBtn.attachListener("onClick", $delegate(this, this._backButtonClick));
            this._oCenterBtmBtn.attachListener("onClick", $delegate(this, this._menuButtonClick));
            this._oRightBtmBtn.attachListener("onClick", $delegate(this, this._nextButtonClick));
        },

        _createContent: function (sPlace) {
            $(sPlace).vAlign = "top";
            $(sPlace).innerHTML =
                '<div style="height: 18px"></div><div style="width: 1241px; height: 121px; margin: 0; position: relative; left: 20px">' +
                '   <div id="' + this._sInstance + '_groups" style="width: 930px; height: 121px; float: right;"></div>' +
                '   <div id="' + this._sInstance + '_search" style="width: 301px; height: 121px; float: left;">' +
                '   </div>' +
                '</div>' +
	            '<div id="' + this._sInstance + '_elements" style="width: 1241px; height: 495px; margin: 15px 0 0; position: relative; left: 20px"></div>';
            this._drawSearchButton(this._sInstance + "_search");
            this._createGroupPanel(this._sInstance + "_groups");
            this._contentManagement('group');
        },

        _createGroupPanel: function (sPlace) {
            var sContent = '';
            sContent = '<table cellpadding="0" cellspacing="0" border="0">' +
	                   '    <tr>' +
	                   '        <td class="section-holder">' +
	                   '            <div class="section-icon" style="background: url(\'./img/ui_item/' + this._sFLogo + '\') no-repeat;"></div>' +
                       '            <div id="group_name_box">' +
                       '                <table class="w_h_100" border="0" cellpadding="0" cellspacing="0">' +
                       '                    <tr>' +
                       '                        <td align="left" valign="middle">' +
	                   '                            <div id="group_name" class="section-title">' + this._oGroup.name + '</div>' +
                       '                        </td>' +
                       '                    </tr>' +
                       '                </table>' +
                       '            </div>' +
	                   '            <div id="groupPanel" class="page-status"></div>' +
                       '        </td>' +
	                   '    </tr>' +
	                   '</table>';
            $(sPlace).innerHTML = sContent;
        },

        _drawSearchButton: function (sPlace) {
            var oBtn = new CImageButton(this, "search_btn", sPlace, "SEARCH", "./img/ui/navigation/search.gif");
            oBtn.attachListener("onClick", $delegate(this, this._searchButtonClick));
            oBtn.render();
        },

        _drawClaimButton: function (sPlace) {
            var oBtn = new CImageButton(this, "search_btn", sPlace, "SEARCH_2", "./img/ui/navigation/where_btn.gif");
            oBtn.attachListener("onClick", $delegate(this, this._searchButtonClick2));
            oBtn.render();
        },

        _searchButtonClick: function () {
            // log start
            _log('<et t="s"></et>');
            _log('</p>');
            // log stop
            storage.put("search_group", this._sLoadGroup);
            document.location.href = "./search_providers.html";
        },

        _searchButtonClick2: function () {
            // log start
            _log('<et t="c"></et>');
            _log('</p>');
            // log stop
            storage.put("search_group", this._sLoadGroup);
            document.location.href = "./search_providers.html";
        },

        _startAdvert: function () {
            var sGroup = this._aStek.join("|");
            sGroup += ((sGroup.length > 0) ? "|" + this._sLoadGroup.toString() : this._sLoadGroup.toString());
            this._sPath = sGroup;
            storage.put("groupId", sGroup);
            startAdvert("Pages");
        },

        _contentManagement: function (sComand) {
            switch (sComand) {
                case 'group':
                    this._startAdvert();
                    if (this._sGroup != this._sLoadGroup) {
                        if (!$isNoU(this._oSave[this._sLoadGroup])) {
                            this._aGroup = this._oSave[this._sLoadGroup];
                            $("group_name").innerHTML = this._oGroupName[this._sLoadGroup];
                        }
                        else {
                            this._oGroup = getScriptIE(this._sLoadGroup);
                            $("group_name").innerHTML = this._oGroup["name"];
                            this._getGroup();
                        }
                    }
                    this._nFinalStr = Math.ceil(this._aGroup.length / 16);
                    if (this._nCurrentStr == this._nFinalStr)
                        this._oRightBtmBtn.setEnabled(false);
                    else
                        this._oRightBtmBtn.setEnabled(true);
                    break;
                case 'backward':
                    if (this._nCurrentStr > 1) {
                        this._nCurrentStr--;
                        // log start
                        _log('<c t="b" i="' + this._nCurrentStr + '"></c>');
                        // log stop
                    }
                    else {
                        this._sLoadGroup = this._aStek.pop();
                        // log start
                        _log('<g i="' + this._sLoadGroup + '"></g>');
                        // log stop
                        $("group_name").innerHTML = this._oGroupName[this._sLoadGroup];
                        this._startAdvert();
                        this._aGroup = this._oSave[this._sLoadGroup];
                        this._nFinalStr = Math.ceil((this._aGroup.length + 1) / 16);
                        if (/^\d+$/.test((this._aGroup.length + 1) / 16))
                            this._nFinalStr--;
                        this._nCurrentStr = 1;
                    }
                    $(this._sInstance + '_page_body').style.display = 'block';
                    break;
            }
            if (this._nCurrentStr >= this._nFinalStr)
                this._oRightBtmBtn.setEnabled(false);
            else
                this._oRightBtmBtn.setEnabled(true);
            this._drawGroup();
            this._drawElements(this._sInstance + "_elements");
        },

        _drawElements: function (sPlace) {
            var inst = this._sInstance,
                sPlace = $(sPlace);

            while (sPlace.childNodes.length) {
                destroy(sPlace.childNodes[0]);
            }

            for (var i = (this._nCurrentStr - 1) * 16, l = (this._nCurrentStr - 1) * 16 + 16; i < l; i++)
                if (i < this._aGroup.length + 1)
                    sPlace.innerHTML += ['<div id="', inst, "_element_", (i + 1), '" class="element-place">', '</div>'].join('');
            this._createElements();
        },

        _createElements: function () {
            for (var i = (this._nCurrentStr - 1) * 16, l = (this._nCurrentStr - 1) * 16 + 16; i < l; i++) {
                var oPlace = $(this._sInstance + "_element_" + (i + 1));
                if (oPlace)
                    if (i != this._aGroup.length) {
                        var oElement = new CElementButton(this, "el" + (i + 1),
	                                oPlace.id,
	                                new CConfigObject(this, "provider", this._aGroup[i]));
                        oElement.attachListener("onClick", $delegate(this, this._elementClick));
                        oElement.render();
                    }
                    else
                        this._drawClaimButton(this._sInstance + "_element_" + (i + 1));
            }
        },

        _drawGroup: function () {
            if ((this._nFinalStr != 1) && (this._nCurrentStr <= this._nFinalStr))
                $("groupPanel").innerHTML = this._nCurrentStr + "<big>-я страница из </big>" + this._nFinalStr;
            else
                $("groupPanel").innerHTML = "";
        },

        _menuButtonClick: function (sender, eargs) {
            // log start
            _log('<et t="m"></et>');
            _log('</p>');
            // log stop
            location.href = "./index.html";
        },

        _backButtonClick: function (sender, eargs) {
            if (this._nCurrentStr == 1 && this._aStek.length == 0) {
                if (storage.get("bevalValue") == "cellular") {
                    storage.put("provider", "null");
                    storage.put("bevalValue", "null");
                    // log start
                    _log('<et t="b"></et>');
                    _log('</p>');
                    // log stop
                    document.location.href = "./cellular.html";
                }
                else {
                    // log start
                    _log('<et t="b"></et>');
                    _log('</p>');
                    // log stop
                    document.location.href = "./main.html";
                }
            }
            else
                this._contentManagement('backward');
        },

        _nextButtonClick: function () {
            this._nCurrentStr++;
            // log start
            _log('<c t="f" i="' + this._nCurrentStr + '"></c>');
            // log stop
            this._contentManagement('default');
        },

        _elementClick: function (sender, eargs) {
            var sId = eargs.getId();
            if (/^-\d+$/.test(sId)) {
                this._aStek.push(this._sLoadGroup);
                this._oSave[this._sLoadGroup] = this._aGroup;
                this._sLoadGroup = sId;
                this._nCurrentStr = 1;
                this._contentManagement('group');
            }
            else if (/^\d+$/.test(sId))
                this._clickProvider(eargs);
        },

        _clickProvider: function (eargs) {
            // log start
            _log('<et t="pr"></et>');
            _log('</p>');
            // log stop
            var oPayInfo = {},
                oPrv = null,
                sUrl = "",
                sTag = eargs.getTag(),
                sName = eargs.getName(),
                sId = eargs.getId(),
                sLogo = eargs.getLogo();


            if (sTag.indexOf('ranges') > -1) {
                oPrv = getScriptIE(sId);
                oPayInfo = Object.deserialize(storage.get("pay_info"));
                if (oPayInfo != null) {
                    oPayInfo.id = sId;
                    oPayInfo.prvName = sName;
                    oPayInfo.prvLogo = sLogo;
                    oPayInfo.minSum = "1";
                    oPayInfo.maxSum = "";
                    oPayInfo.isCellular == "true";
                    oPayInfo.constParams = {};
                    oPayInfo.tag = sTag;
                    if (!$isNoU(oPrv["minSum"]))
                        oPayInfo.minSum = oPrv.minSum;
                    if (!$isNoU(oPrv["maxSum"]))
                        oPayInfo.maxSum = oPrv.maxSum;
                }
                else {
                    document.location.href = "./cellular.html";
                }

                sUrl = "./validate_confirm.html";
                if (typeof authOnlineCellular !== "undefined") {
                    if (authOnlineCellular == true) {
                        sUrl = "./online_auth.html";
                        oPayInfo.constParams = { "_extra_auth_page": "online_auth.html", "_extra_auth_success": "validate_confirm.html", "_extra_auth_fail": "online_auth_error.html" };
                    }
                }
            }
            else if (sTag.indexOf('charity') > -1) {
                oPayInfo.isCellular = 'false';
                oPayInfo.id = sId;
                oPayInfo.prvName = sName;
                oPayInfo.prvLogo = sLogo;
                sUrl = "./charity.html";
            }
            else {
                oPayInfo.isCellular = 'false';
                oPayInfo.id = sId;
                oPayInfo.prvName = sName;
                oPayInfo.prvLogo = sLogo;
                sUrl = "./provider.html";
            }
            oPayInfo.path = this._sPath;
            storage.put("last_page", "./pages.html");
            storage.put("provider", sId);
            storage.put("pay_info", oPayInfo.serialize());
            this._postData(sUrl, oPayInfo);
        },

        _postData: function (sUrl, oPrv) {
            var oForm = new CForm(this, "oForm", sUrl);
            if (!$isNoU(oPrv)) {
                if (!$isNoU(oPrv["id"])) {
                    oForm.put("prv_id", oPrv["id"]);
                }
                if (!$isNoU(oPrv["prvName"])) {
                    oForm.put("prv_name", oPrv["prvName"]);
                }
                if (oPrv.hasOwnProperty("account")) {
                    oForm.put("getAccountNumber", oPrv["account"]);
                }
                if (!$isNoU(oPrv["minSum"])) {
                    oForm.put("komissiya", oPrv["minSum"]);
                }
                if (sUrl == './provider.html') {
                    oForm.put("BarcodeScan", "on");
                }
                for (var f in oPrv["constParams"]) {
                    if (oPrv["constParams"].hasOwnProperty(f)) {
                        if ($is(oPrv["constParams"][f], String)) {
                            oForm.put(f, oPrv["constParams"][f]);
                        }
                    }
                }
            }
            oForm.submit();
        }
    }
);