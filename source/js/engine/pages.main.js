CMainPage = createClass
(
	CPage,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace) {
	        CMainPage.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        _log('<p v="m">');
	        this._aTopElements = [];
	        this._sAdvertPlace = "Main";
	        this._nTopElementsMaxCount = 8;
	        this._nRows = 3;
	        this._nColumns = 4;
	        this._aTopElements = [];
	        this._aGroup = UIGroups;
	        if (this._aGroup.length < 12) {
	            var o = getScriptIE('-212');
	            if (o != null) {
	                this._aGroup.push({ "__type": o["__type"], "id": o["id"], "logo": o["logo"], "name": o["name"], "tag": o["tag"] });
	            }
	        }
	        this._drawTopElements();
	        storage.remove("provider");
	        storage.remove("moreExtras");
	    },

	    _paint: function () {
	        var oPlace = $(this.getPlaceId());
	        if (!$isNoU(oPlace)) {
	            oPlace.innerHTML = [
	    		    '<div style="width: 100%; height: 180px; padding-top: 18px">',
	    		    '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="180">',
	    		    '  <tr valign="middle">',
	    		    '    <td width="162" height="180">',
	    		    '        <div style="width: 86px; height: 140px; margin: 8px 0px 0px 51px;"><img alt="" src="./img/ui/qiwicel.gif" /></div>',
	    		    '    </td>',
	    		    '    <td width="1090" height="180">',
	    		    '        <div id="advert_1" style="width: 1090px; height: 180px; margin-left: 5px; overflow: hidden"></div>',
	    		    '    </td>',
	    		    '  </tr>',
	    		    '</table>',
	    		    '</div>',
	    		    '<div id="', this._sInstance, '_page_body" style="width: 100%; height: 691px; overflow: hidden;"></div>',
	    	    	'<div align="center" style="width: 100%; height: 121px;"><div id="' + this._sInstance + '_bottom_menu"></div></div>',
	    	    	'<div style="position: absolute; width: 120px; height: 120px; top: 886px; left: 830px;">' + getFlashDef("./swf/arrow.swf", true) + '</div>'].join('');
	            this._createContent(this._sInstance + "_page_body");
	            this._createBottomMenu(this._sInstance + "_bottom_menu");
	            startAdvert("Main");
	        }
	    },

	    _createBottomMenu: function (sPlace) {
	        CMainPage.base._createBottomMenu.apply(this, arguments);
	        this._oLeftBtmBtn = new CBtmMenuButton(this, "left_btn", "btn_left", "epa.gif");
	        this._oCenterBtmBtn = new CBtmMenuButton(this, "center_btn", "btn_center", "menu.gif");
	        this._oRightBtmBtn = new CBtmMenuButton(this, "right_btn", "btn_right", "search_anim.gif");
	        this._oLeftBtmBtn.render();
	        this._oCenterBtmBtn.render();
	        this._oRightBtmBtn.render();
	        this._oLeftBtmBtn.attachListener("onClick", $delegate(this, this._epaButtonClick));
	        this._oCenterBtmBtn.attachListener("onClick", $delegate(this, this._menuButtonClick));
	        this._oRightBtmBtn.attachListener("onClick", $delegate(this, this._searchButtonClick));
	    },

	    _createContent: function (sPlace) {
	        var splace = $(sPlace);
	        splace.vAlign = "top";
	        splace.innerHTML = [
                '<div id="', this._sInstance, '_top_elements">',
                    '<div id="region_name">',
                        '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%"><tr><td align="center">',
			                '<table cellpadding="0" cellspacing="0" border="0" width="auto" height="100%">',
			                    '<tr>',
			                        '<td><img src="./img/ui/grp_panel/l_c.gif" /></td>',
			                        '<td background="./img/ui/grp_panel/c_c.gif"><p id="region_location"></p></td>',
			                        '<td><img src="./img/ui/grp_panel/r_c.gif" /></td>',
			                    '</tr>',
			                '</table>',
			            '</td></tr></table>',
                    '</div>',
                    '<div id="', this._sInstance, '_top"></div>',
                '</div>',
                '<div id="', this._sInstance, '_groups_holder"></div>'].join('');

	        $("region_location").innerHTML = getLocation();

	        var t = this;
	        setTimeout(function () { t._drawGroups(t._sInstance + "_groups_holder"); t._paintTopElements(t._sInstance + "_top"); }, 10);
	    },

	    _drawTopElements: function (sPlace) {
	        var aTop = (typeof UITopElements != "undefined") ? UITopElements : [],
                l = (aTop.length > this._nTopElementsMaxCount) ? this._nTopElementsMaxCount : aTop.length,
                oElement = null;
	        for (var i = 0; i < l; i++) {
	            if ($browser.agent != BWR_FF) {
	                oElement = getScriptIE(aTop[i]);
	                if (oElement != null) {
	                    this._aTopElements.push(new CConfigObject(this, "top", oElement));
	                    oElement = null;
	                }
	            }
	            else {
	                getScriptFF(aTop[i], './config/', this, function (e) {
	                    if (/^\d+$/.test(e.currentTarget.id)) {
	                        if (typeof UIProvider == "object" && UIProvider != null) {
	                            this._aTopElements.push(new CConfigObject(this, "top", UIProvider.clone()));
	                            UIProvider = null;
	                            delete window.UIProvider;
	                        }
	                    }
	                    else {
	                        if (typeof UIGroup == "object" && UIGroup != null) {
	                            this._aTopElements.push(new CConfigObject(this, "top", UIGroup.clone()));
	                            UIGroup = null;
	                            delete window.UIGroup;
	                        }
	                    }
	                });
	            }
	        }
	    },

	    _paintTopElements: function (sPlace) {
	        var sContent = '',
                w = (1240 - this._aTopElements.length + 1) / this._aTopElements.length,
                m = (w - 146) / 2;
	        for (var i = 0, l = this._aTopElements.length; i < l; i++) {
	            sContent += '<div style="height:100%; float: left;width:' + w + 'px;"><div class="top-element" id="' + this._sInstance + '_top_element_' + i + '" style="margin-left:' + m + 'px;"></div></div>';
	            if ((i + 1) !== l) {
	                sContent += '<div class="top-element-line"></div>';
	            }
	        }
	        $(sPlace).innerHTML = sContent;

	        for (var i = 0, l = this._nTopElementsMaxCount; i < l; i++) {
	            var oPlace = $(this._sInstance + "_top_element_" + i);
	            if (oPlace) {
	                var el = this._aTopElements[i];
	                if (el) {
	                    var oElement = new CTopElementButton(this,
						"el" + i,
						this._sInstance + '_top_element_' + i,
						el);
	                    oElement.attachListener("onClick", $delegate(this, this._elementClick));
	                    oElement.render();
	                }
	            }
	        }
	    },

	    _drawGroups: function (sPlace) {
	        $(sPlace).innerHTML = this._getGroupPlaces();
	        this._createGroups();
	    },

	    _getGroupPlaces: function () {
	        var sContent = [];
	        if (this._aGroup.length) {
	            for (var i = 0; i < (this._nRows * this._nColumns); i++) {
	                if ((i + 1) > this._aGroup.length) {
	                    sContent.push('<div class="group-place group-button" style="background: url(\'./img/ui/logo_b.gif\') no-repeat center;"></div>');
	                }
	                else {
	                    sContent.push('<div id="', this._sInstance, '_group_', i, '" class="group-place"></div>');
	                }
	            }
	        }
	        return sContent.join('');
	    },

	    _createGroups: function () {
	        var oPlace = null;
	        for (var i = 0, l = this._aGroup.length; i < l; i++) {
	            oPlace = $(this._sInstance + "_group_" + i);
	            if (oPlace) {
	                var oGroup = new CGroupButton(this, "grp" + i,
	                                oPlace.id,
	                                new CConfigObject(this, "top", this._aGroup[i]));
	                oGroup.attachListener("onClick", $delegate(this, this._elementClick));
	                oGroup.render();
	            }
	            oPlace = null;
	        }
	    },

	    _elementClick: function (sender, eargs) {
	        var prvId = eargs.getId();

	        if (/^-\d+$/.test(prvId)) {
	            // log start
	            _log('<et t="g"></et>');
	            _log('</p>');
	            // log stop
	            this._clickGroup(eargs);
	        }
	        else if (/^\d+$/.test(prvId)) {
	            // log start
	            _log('<et t="pr"></et>');
	            _log('</p>');
	            // log stop
	            this._clickProvider(eargs);
	        }
	    },

	    _clickGroup: function (oGroup) {
	        storage.put("last_page", document.location.href);
	        if (oGroup.getId() == "-161") {
	            document.location.href = 'bank.html';
	            return;
	        }
	        var sTag = oGroup.getTag();
	        if (oGroup.getId() == "-20") {
	            storage.put("group", "null");
	            document.location.href = "./cellular.html";
	            return;
	        }
	        if (sTag.indexOf('promo') > -1) {
	            var oForm = new CForm(this, "oForm", "./qiwi_promo.html"),
		            dat = new Date(),
                    nMonth = 1 + dat.getMonth(),
                    strDate = dat.getDate() + "." + nMonth + "." + dat.getFullYear() + "," + dat.getHours() + ":" + dat.getMinutes() + ":" + dat.getSeconds();
	            oForm.put("prv_id", "323");
	            oForm.put("prv_name", "QIWI Promo");
	            oForm.put("getAccountNumber", "0000000000");
	            oForm.put("_extra_fake_provider", "true");
	            oForm.put("_extra_result_int_page", "qiwi_promo.html");
	            oForm.put("_extra_no_print_check", "true");
	            oForm.put("_extra_MGT_project_number", "777");
	            oForm.put("_extra_MGT_date", strDate);
	            oForm.submit();
	        }
	        else if (sTag.indexOf('lottery') > -1) {
	            document.location.href = "./embed_flash_ilotomn.html";
	        }
	        else {
	            storage.put("group", oGroup.getId());
	            document.location.href = 'pages.html';
	        }
	    },

	    _clickProvider: function (oProvider) {
	        if (!$isNoU(oProvider)) {
	            storage.put("provider", oProvider.getId());
	            storage.put("last_page", document.location.href);

	            if (oProvider.getTag().indexOf('ranges') > -1) {
	                document.location.href = "./cellular.html";
	            }
	            else if (oProvider.getTag().indexOf('charity') > -1) {
	                document.location.href = "./charity.html";
	            }
	            else {
	                var sPrvPage = oProvider.getPrvPage();
	                if (sPrvPage.length) {
	                    this._postData(sPrvPage, oProvider);
	                }
	                else {
	                    var oForm = new CForm(this, "oForm", "./provider.html");
	                    oForm.put("BarcodeScan", "on");
	                    oForm.submit();
	                }
	            }
	        }
	    },

	    _postData: function (sUrl, oPrv) {
	        var oForm = new CForm(this, "oForm", "./" + sUrl);
	        if (!$isNoU(oPrv)) {
	            oForm.put("prv_id", oPrv.getId());
	            oForm.put("prv_name", oPrv.getName());
	            var oConstParam = oPrv.getConsParam();
	            if (oConstParam != null) {
	                for (var f in oConstParam) {
	                    if (oConstParam.hasOwnProperty(f)) {
	                        if ($is(oConstParam[f], String)) {
	                            oForm.put(f, oConstParam[f]);
	                        }
	                    }
	                }
	            }
	        }
	        oForm.submit();
	    },

	    _epaButtonClick: function (sender, eargs) {
	        // log start
            _log('<et t="ea"></et>');
	        _log('</p>');
            // log stop
	        storage.put("last_page", document.location.href);
	        document.location.href = "./epa.html";
	    },
	    _menuButtonClick: function (sender, eargs) {
	        // log start
	        _log('<et t="m"></et>');
	        _log('</p>');
	        // log stop
	        document.location.href = "./index.html";
	    },

	    _searchButtonClick: function (sender, eargs) {
	        // log start
	        _log('<et t="s"></et>');
	        _log('</p>');
	        // log stop
	        document.location.href = "./search_providers.html";
	    }
	}
)