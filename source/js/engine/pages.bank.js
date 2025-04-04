CBankPage = createClass
(
    CPage,
    {
        ctor: function (oParent, sInstance, sCtrlPlace, oGroup) {
            CBankPage.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
            // log start
            _log('<p v="b">');
            _log('<g i="-161"></g>');
            // log stop
            this._oGroup = oGroup;
            this._oInfoText = null;
            this._nCurrentPage = 0;
            this._aButtonPlace = [];
            this._aCurrentGroup = [];
            this._sCurrentId = '-161';
            this._sCurrentGroupName = this._oGroup.name;
            this._correctContent();
        },

        _correctContent: function () {
            if (this._oGroup.hasOwnProperty('__objects')) {
                for (var i = 0; i < this._oGroup.__objects.length; i++) {
                    if (this._oGroup.__objects[i].__type == 'children') {
                        this._aCurrentGroup = this._preparationGroup(this._oGroup.__objects[i].__objects);
                        for (var j = 0; j < this._oGroup.__objects[i].__objects.length; j++) {
                            if (this._oGroup.__objects[i].__objects[j].__type == 'provider') {
                                if (this._oGroup.__objects[i].__objects[j].tag.indexOf('link2group') !== -1) {
                                    var aTemp = this._oGroup.__objects[i].__objects[j].tag.split(',');
                                    for (var x = 0; x < aTemp.length; x++) {
                                        if (aTemp[x].indexOf('link2group') !== -1) {
                                            var oTemp = getScriptIE('-' + aTemp[x].split('_')[1]);
                                            if (oTemp !== null) {
                                                this._oGroup.__objects[i].__objects[j].__type = 'group';
                                                this._oGroup.__objects[i].__objects[j].tag = oTemp.tag;
                                                if (oTemp.__objects.length > 1) {
                                                    this._oGroup.__objects[i].__objects[j].__objects.push(this._hiddenProvider(oTemp.__objects[1], this._oGroup.__objects[i].__objects[j].id));
                                                }
                                                this._oGroup.__objects[i].__objects[j].trueId = this._oGroup.__objects[i].__objects[j].id;
                                                this._oGroup.__objects[i].__objects[j].id = '-' + this._oGroup.__objects[i].__objects[j].id;
                                                if (this._oGroup.__objects[i].__objects[j].hasOwnProperty('buttonName')) {
                                                    this._oGroup.__objects[i].__objects[j].name = this._oGroup.__objects[i].__objects[j].buttonName;
                                                }
                                                else {
                                                    this._oGroup.__objects[i].__objects[j].name = this._oGroup.__objects[i].__objects[j].sName;
                                                }
                                            }
                                        }
                                    }
                                    if (this._oGroup.__objects[i].__objects[j].id == '-4492' && bUnekt) {
                                        var oOceanBank = getScriptIE('32646');
                                        if (oOceanBank !== null) {
                                            this._oGroup.__objects[i].__objects[j].__objects[1].__objects.unshift(oOceanBank);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },

        _hiddenProvider: function (oChildren, sId) {
            oResult = {
                __type: 'children',
                __objects: []
            };
            for (var i = 0; i < oChildren.__objects.length; i++) {
                var bPush = true;
                if (oChildren.__objects[i].hasOwnProperty('tag') && oChildren.__objects[i].tag.indexOf('hiddenIn') !== -1) {
                    var aTemp = oChildren.__objects[i].tag.split(',');
                    for (var j = 0; j < aTemp.length; j++) {
                        if (aTemp[j].indexOf('hiddenIn') == 0 && aTemp[j].indexOf(sId) !== -1) {
                            bPush = false;
                            break;
                        }
                    }
                }
                if (bPush) {
                    oResult.__objects.push(oChildren.__objects[i]);
                }
            }
            return oResult;
        },

        _preparationGroup: function(aElements) {
            var aResult = [];
            var l = aElements.length;
            var j = 0;
            var q = 0;
            while (l !== 0){
                var length = (l > 16) ? 16 : l;
                aResult[j] = [];
                for (var i = 0; i < length; i++) {
                    aResult[j].push(aElements[q]);
                    q++;
                    l--;
                }
                j++;
            }
            if (aResult[aResult.length - 1].length == 16) {
                aResult.push([{ id: 'search' }]);
            }
            else {
                aResult[aResult.length - 1].push({ id: 'search' });
            }
            return aResult;
        },

        _paint: function () {
            var oPlace = $(this.getPlaceId());
            if (oPlace !== null) {

                oPlace.innerHTML =
                    '<div id="qiwiLogo" class="p_a"></div>' +
                    '<div id="advert_1" class="p_a"></div>' +
                    '<div id="' + this._sInstance + '_page_body" class="p_a"></div>' +
                    '<div id="' + this._sInstance + '_page_text" class="p_a">Операции по переводу денежных средств в целях погашения кредитов,пополнения счета и/или иного использования<br />плательщиками услуг Банков, указанных выше, осуществляются КИВИ Банк (ЗАО). Лицензия № 2241 на осуществление<br />банковских операций в рублях и иностранной валюте со средствами физических лиц, выдана Банком России 22.02.2011.</div>' +
    	            '<div id="' + this._sInstance + '_bottom_menu">';

                startAdvert('Bank_Page');
                this._oInfoText = $(this._sInstance + '_page_text');
                this._createContent(this._sInstance + '_page_body');
                this._createBottomMenu(this._sInstance + '_bottom_menu');
            }
            else {
                document.location = './index.html';
            }
        },

        _createBottomMenu: function (sPlace) {
            CBankPage.base._createBottomMenu.apply(this, arguments);
            this._oRightBtmBtn = new CBtmMenuButton(this, "right_btn", "btn_right", "next.gif");
            this._oLeftBtmBtn = new CBtmMenuButton(this, "left_btn", "btn_left", "back.gif");
            this._oCenterBtmBtn = new CBtmMenuButton(this, "center_btn", "btn_center", "menu.gif");
            this._oLeftBtmBtn.render();
            this._oCenterBtmBtn.render();
            this._oRightBtmBtn.render();
            this._oLeftBtmBtn.attachListener("onClick", $delegate(this, this._backButtonClick));
            this._oCenterBtmBtn.attachListener("onClick", $delegate(this, this._menuButtonClick));
            this._oRightBtmBtn.attachListener("onClick", $delegate(this, this._nextButtonClick));
            this._oRightBtmBtn.setEnabled(false);
        },

        _createContent: function (sPlace) {
            $(sPlace).vAlign = "top";
            $(sPlace).innerHTML =
                '<div style="height: 18px"></div><div style="width: 1241px; height: 121px; margin: 0; position: relative; left: 20px">' +
                '   <div id="' + this._sInstance + '_groups" style="width: 930px; height: 121px; float: right;"></div>' +
                '   <div id="' + this._sInstance + '_search" style="width: 301px; height: 121px; float: left;">' +
                '   </div>' +
                '</div>' +
	            '<div id="' + this._sInstance + '_elements" style="width: 1241px; height: 495px; margin: 10px 0 0; position: relative; left: 20px"></div>';
            this._drawSearchButton(this._sInstance + "_search");
            this._createGroupPanel(this._sInstance + "_groups");
            this._drawElements(this._sInstance + '_elements');
        },

        _createGroupPanel: function (sPlace) {
            var sContent = '';
            sContent = '<table cellpadding="0" cellspacing="0" border="0">' +
	                   '    <tr>' +
	                   '        <td class="section-holder">' +
	                   '            <div class="section-icon" style="background: url(\'./img/ui_item/' + getLogo(this._oGroup) + '\') no-repeat;"></div>' +
                       '            <div id="group_name_box">' +
                       '                <table class="w_h_100" border="0" cellpadding="0" cellspacing="0">' +
                       '                    <tr>' +
                       '                        <td align="left" valign="middle">' +
	                   '                            <div id="group_name" class="section-title">' + this._sCurrentGroupName + '</div>' +
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

        _drawElements: function (sPlace) {
            var oPlace = $(sPlace);
            var oDiv = document.createElement('div');
            oDiv.className = 'btnPlace';
            for (var i = 0; i < 16; i++) {
                var oBtnPlace = oDiv.cloneNode(true);
                oBtnPlace.id = 'place_' + i;
                oPlace.appendChild(oBtnPlace);
                oBtnPlace.innerHTML = i;
                this._aButtonPlace.push(oBtnPlace);
            }
            this._createElements();
        },

        _createElements: function () {
            this._showText();
            for (var i = 0; i < 16; i++) {
                this._aButtonPlace[i].innerHTML = '';
            }
            for (var i = 0; i < this._aCurrentGroup[this._nCurrentPage].length; i++) {
                var oPlace = this._aButtonPlace[i];
                if (oPlace) {
                    if (this._aCurrentGroup[this._nCurrentPage][i].hasOwnProperty('id') && this._aCurrentGroup[this._nCurrentPage][i].id == 'search') {
                        var oElement = new CImageButton(this, "search_btn2", oPlace.id, "SEARCH_2", "./img/ui/navigation/where_btn.gif");
                        oElement.attachListener("onClick", $delegate(this, this._searchButtonClick2));
                    }
                    else {
                        var oElement = new CElementButton(this, "el" + (i + 1), oPlace.id, new CConfigObject(this, "provider", this._aCurrentGroup[this._nCurrentPage][i]));
                        oElement.attachListener("onClick", $delegate(this, this._elementClick));
                    }
                    oElement.render();
                }
            }
        },

        _showText: function () {
            switch (this._sCurrentId) {
                case '-162':
                case '-4492':
                case '-4493':
                    this._oInfoText.style.display = 'block';
                    break;
                default:
                    this._oInfoText.style.display = 'none';
                    break;
            }
        },

        _drawGroup: function () {
            $('group_name').innerHTML = this._sCurrentGroupName;
            if ((this._aCurrentGroup.length != 1) && (this._nCurrentPage < this._aCurrentGroup.length)) {
                $("groupPanel").innerHTML = (this._nCurrentPage + 1) + "<big>-я страница из </big>" + this._aCurrentGroup.length;
            }
            else {
                $("groupPanel").innerHTML = "";
            }
        },

        _elementClick: function (sender, eargs) {
            var sId = eargs.getId();
            if (/^-\d+$/.test(sId)) {
                this._clickGroup(sId);
            }
            else if (/^\d+$/.test(sId))
                this._clickProvider(sId);
        },

        _clickGroup: function (sId) {
            this._sCurrentId = sId;
            // log start
            _log('<g i="' + sId + '"></g>');
            // log stop
            for (var i = 0; i < this._oGroup.__objects[1].__objects.length; i++) {
                if (this._oGroup.__objects[1].__objects[i].id == sId) {
                    if (this._oGroup.__objects[1].__objects[i].__objects.length == 1) {
                        var oConfig = getScriptIE(sId);
                        if (oConfig === null) {
                            document.location = './group_undefined.html';
                        }
                        else {
                            this._oGroup.__objects[1].__objects[i].__objects.push(this._hiddenProvider(oConfig.__objects[1], sId));
                        }
                    }
                    this._aCurrentGroup = this._preparationGroup(this._oGroup.__objects[1].__objects[i].__objects[1].__objects);
                    if (this._aCurrentGroup.length > 1) {
                        this._oRightBtmBtn.setEnabled(true);
                    }
                    this._sCurrentGroupName = this._oGroup.__objects[1].__objects[i].name;
                }
            }
            this._nCurrentPage = 0;
            this._createElements();
            this._drawGroup();
        },

        _clickProvider: function (sId) {
            var oPrv = getScriptIE(sId);
            if (oPrv === null) {
                document.location = './provider_undefined.html';
            }
            else {
                oPrv = new CConfigObject(this, "provider", oPrv);
                var oConstParam = oPrv.getConsParam();
                var sConstPage = oPrv.getPrvPage();
                var sGrpId = 0;
                switch (this._sCurrentId) {
                    case '-162':
                        sGrpId = 2;
                        break;
                    case '-4492':
                        sGrpId = 3;
                        break;
                    case '-4493':
                        sGrpId = 1;
                        break;
                }
                if (sGrpId) {
                    if (oConstParam.hasOwnProperty('EmbedParams')) {
                        var aParams = oConstParam.EmbedParams.split(';');
                        if (aParams.length > 1) {
                            aParams[1] = sGrpId;
                        }
                        else {
                            aParams.push(sGrpId);
                        }
                        oConstParam.EmbedParams = aParams.join(';');
                    }
                }
                // log start
                _log('<et t="pr" v="' + oPrv.getId() + '"></et>');
                _log('</p>');
                // log stop
                if (sConstPage.length) {
                    this._postData(sConstPage, oConstParam);
                }
                else {
                    this._transitionToProvider(oPrv.getId());
                }
            }
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
            _log('<et t="s2"></et>');
            _log('</p>');
            // log stop
            storage.put("search_group", this._sLoadGroup);
            document.location.href = "./search_providers.html";
        },

        _menuButtonClick: function (sender, eargs) {
            // log start
            _log('<et t="m"></et>');
            _log('</p>');
            // log stop
            location.href = "./index.html";
        },

        _backButtonClick: function (sender, eargs) {
            if (this._nCurrentPage) {
                this._nCurrentPage--;
                // log start
                _log('<c t="b" i="' + (this._nCurrentPage + 1) + '"></c>');
                // log stop
                this._oRightBtmBtn.setEnabled(true);
            }
            else {
                if (this._sCurrentId == this._oGroup.id) {
                    // log start
                    _log('<et t="b"></et>');
                    _log('</p>');
                    // log stop
                    var s = storage.get("last_page");
                    if (s === null) {
                        s = "./index.html";
                    }
                    document.location = s;
                }
                else {
                    // log start
                    _log('<g i="' + this._oGroup.id + '"></g>');
                    // log stop
                    this._oRightBtmBtn.setEnabled(false);
                    this._sCurrentId = this._oGroup.id;
                    this._sCurrentGroupName = this._oGroup.name;
                    this._aCurrentGroup = this._preparationGroup(this._oGroup.__objects[1].__objects);
                    if (this._aCurrentGroup.length > 1) {
                        this._oRightBtmBtn.setEnabled(true);
                    }
                }
            }
            this._createElements();
            this._drawGroup();
        },

        _nextButtonClick: function () {
            if (this._aCurrentGroup.length - 1 > this._nCurrentPage) {
                this._nCurrentPage++;
            }
            if (this._aCurrentGroup.length - 1 == this._nCurrentPage) {
                this._oRightBtmBtn.setEnabled(false);
            }
            // log start
            _log('<c t="f" i="' + (this._nCurrentPage + 1) + '"></c>');
            // log stop
            this._createElements();
            this._drawGroup();
        },

        _transitionToProvider: function(sId) {
            storage.put('provider', sId);
            storage.put("last_page", "bank.html");
            document.location = './provider.html';
        },

        _postData: function (sUrl, oParam) {
            var oForm = new CForm(this, "oForm", sUrl);
            for (var f in oParam) {
                if (typeof oParam[f] == 'string' && f !== '_typeName') {
                    oForm.put(f, oParam[f]);
                }
            }
            oForm.submit();
        }
    }
);