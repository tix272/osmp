CKeyboardBtn = createClass
(
	CValueButton,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sValue) {
	        CKeyboardBtn.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sValue);
	    },

	    _paint: function() {
	        var oDiv = $(this.getPlaceId());
	        if (!Object.isNullOrUndefined(oDiv)) {
	            oDiv.innerHTML =
	                '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">' +
	                '  <tr>' +
	                '    <td id="' + this.getInstance() + '_td" align="center" valign="middle" style="width: 100%; height: 100%; font-size: 30px;">' +
	                '       <span id="' + this.getInstance() + '_td_span" class="keyboard_btn_text">' +
	                ((!Object.isNullOrUndefined(this._sValue)) ? this._sValue : "") +
	                '       </span>' +
	                '    </td>' +
	                '  </tr>' +
	                '</table>';
	        }
	    },

	    setValue: function(sValue) {
	        if (sValue == "<"){
	            sValue = "&lt";
	            this._sValue = "<";
	            $(this.getInstance() + "_td_span").innerHTML = sValue;
	        }
	        else
	            $(this.getInstance() + "_td_span").innerHTML = this._sValue = sValue;
	    },

	    setCssClass: function(sClass) {
	        setCssClass(this.getInstance() + "_td_span", sClass);
	    },

	    getCssClass: function() {
	        return getCssClass(this.getInstance() + "_td_span");
	    }
	}
);

	CAlKeyboardBtn = createClass //with text
(
	CKeyboardBtn,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace, sValue, nWidth, nHeight, sActiveImg, sInactiveImg, nFontSize) {
	        CAlKeyboardBtn.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sValue);
	        this._nWidth = $is(nWidth, Number) ? nWidth : 0;
	        this._nHeight = $is(nHeight, Number) ? nHeight : 0;
	        this._nFontSize = $is(nFontSize, Number) ? nFontSize : 50;
	        this._sActiveImg = $is(sActiveImg, String) ? sActiveImg : "";
	        this._sInactiveImg = $is(sInactiveImg, String) ? sInactiveImg : "";
	    },

	    _paint: function () {
	        CAlKeyboardBtn.base._paint.apply(this, arguments);
	        var id = this.getPlaceId(),
	            oDiv = $(id);
	        if (!$isNoU(oDiv)) {
	            oDiv.innerHTML = '<div style="float: left; background: url(' + this._sInactiveImg + ') no-repeat center; width: ' + this._nWidth + 'px; height: ' + this._nHeight + '"><table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%"><tr><td width="100%" height="100%" align="center" valign="middle"><span id="' + this.getInstance() + '_td_span" style="color: #fff; font-size: ' + this._nFontSize + 'px;">' + ($is(this._sValue, String) ? this._sValue : "") + '</span></td></tr></table>';
	        }
	    },

	    _setActive: function (bIsActive) {
	        var oDiv = $(this.getPlaceId());
	        if (!$isNoU(oDiv)) {
	            if ($bool(bIsActive)) {
	                oDiv.style.background = "url('" + this._sActiveImg + "') no-repeat";
	            }
	            else {
	                oDiv.style.background = "url('" + this._sInactiveImg + "') no-repeat";
	            }
	        }
	    },

	    _onMouseOver: function (sender, eargs) {
	        this._setActive(true);
	    },

	    _onMouseOut: function (sender, eargs) {
	        this._setActive(false);
	    }
	}
);

	CSearchKeyboardBtn = createClass //with text
(
	CKeyboardBtn,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace, sValue, nWidth, sActiveImg, sInactiveImg) {
	        CSearchKeyboardBtn.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sValue);
	        this._nWidth = $is(nWidth, Number) ? nWidth : 0;
	        this._sInactiveImg = $is(sInactiveImg, String) ? sInactiveImg : "";
	    },

	    _paint: function () {
	        CSearchKeyboardBtn.base._paint.apply(this, arguments);
	        var oDiv = $(this.getPlaceId());
	        if (!$isNoU(oDiv)) {
	            oDiv.style.width = this._nWidth + "px";
	            oDiv.style.height = "70px";
	            oDiv.style.background = "url('" + this._sInactiveImg + "') no-repeat";
	        }
	    }
	}
);

	CDgKeyboardBtn = createClass //with text
(
	CKeyboardBtn,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace, sValue, nWidth, nHeight, sActiveImg, sInactiveImg, nFontSize, options) {
	        CDgKeyboardBtn.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sValue);
	        this._nWidth = $is(nWidth, Number) ? nWidth : 0;
	        this._nHeight = $is(nHeight, Number) ? nHeight : 0;
	        this._nFontSize = $is(nFontSize, Number) ? nFontSize : 80;
	        this._sActiveImg = $is(sActiveImg, String) ? sActiveImg : "";
	        this._sInactiveImg = $is(sInactiveImg, String) ? sInactiveImg : "";
	        this._options = options || {};
	    },

	    _paint: function () {
	        CDgKeyboardBtn.base._paint.apply(this, arguments);
	        var oDiv = $(this.getPlaceId());
	        if (!$isNoU(oDiv)) {
	            oDiv.innerHTML = '<div style="margin: 2px; width: '+this._nWidth+'px; height: '+this._nHeight+'px; background: url(' + this._sInactiveImg + ') no-repeat center"><table width="100%" height="100%"><tr><td width="100%" height="100%" align="center" valign="middle" style="color: #fff; font-size: ' + this._nFontSize + 'px;">' + ($is(this._sValue, String) ? this._sValue : "") + '</td></tr></table></div>';
	            var options = this._options;
	            if(this._sInactiveImg.indexOf('digital/0_off.gif') > -1) options.height = 78;
	        }
	    }
	}
);

	CDCelKeyboardBtn = createClass //with text
(
	CKeyboardBtn,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sValue) {
	        CDgKeyboardBtn.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sValue);
	    },

	    _paint: function() {
	        CDgKeyboardBtn.base._paint.apply(this, arguments);
	        var oDiv = $(this.getPlaceId());
	        if (!$isNoU(oDiv)) {
	            oDiv.style.width = "146px";
	            oDiv.style.height = "148px";
	            oDiv.style.background = "url('./img/ui/keyboard/digital/button_off.gif') no-repeat";
	            oDiv.onmouseover = $delegate(this, this._onMouseOver);
	            oDiv.onmouseout = $delegate(this, this._onMouseOut);
	        }
	    },

	    _setActive: function(bIsActive) {
	        var oDiv = $(this.getPlaceId());
	        if (!$isNoU(oDiv)) {
	            if ($bool(bIsActive)) {
	                oDiv.style.background = "url('./img/ui/keyboard/digital/newbtn_on.gif') no-repeat";
	                setOpacity(this.getInstance() + "_td_span", 60);
	            }
	            else {
	                oDiv.style.background = "url('./img/ui/keyboard/digital/newbtn_off.gif') no-repeat";
	                setOpacity(this.getInstance() + "_td_span", 100);
	            }
	        }

	    },

	    _onMouseOver: function(sender, eargs) {
	        this._setActive(true);
	    },

	    _onMouseOut: function(sender, eargs) {
	        this._setActive(false);
	    }
	}
);

	CKeyboard = createClass
(
	CControl,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace) {
	        CKeyboard.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	    },

	    keyPress: function (cKey) {
	        if ($is(cKey, String)) {
	            var oArg = { key: cKey };
	            this.notify("onKeyPress", oArg);
	        }
	    }
	}
);

	CDigitalKeyboard = createClass
(
	CKeyboard,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace, sPicFolder) {
	        var args = { "0": arguments["3"] };
	        Function.validateParams(args, [
	                    { name: "sPicFolder", type: String, canBeNull: true, canBeEmpty: true }
            ]);
	        CDigitalKeyboard.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._sPicFolder = ((!Object.isNullOrUndefined(sPicFolder)) ? sPicFolder : "./img/ui/keyboard/digital");
	    },

	    _paint: function () {
	        this._prepareTemplate();
	        this._createObjects();
	    },

	    _prepareTemplate: function () {
	        var inst = this.getInstance();

	        var sContent = ["<table><tr><td width=\"100%\" height=\"100%\" align=\"center\" valign=\"middle\">",
	        "<table class='keyboard-digital'>",
                "<tr>",
                "<td id=\"", inst, "_btn_1\"></td>",
                "<td id=\"", inst, "_btn_2\"></td>",
                "<td id=\"", inst, "_btn_3\"></td>",
                "</tr>",
                "<tr>",
                "<td id=\"", inst, "_btn_4\"></td>",
                "<td id=\"", inst, "_btn_5\"></td>",
                "<td id=\"", inst, "_btn_6\"></td>",
                "</tr>",
                "<tr>",
                "<td id=\"", inst, "_btn_7\"></td>",
                "<td id=\"", inst, "_btn_8\"></td>",
                "<td id=\"", inst, "_btn_9\"></td>",
                "</tr>",
                "<tr>",
                "<td id=\"", inst, "_btn_0\" colspan=\"3\"></td>",
                "</tr>",
	        "</table>",
	        "</td></tr></table>"].join('');

	        insertContent(this.getPlaceId(), sContent);
	    },

	    _createObjects: function () {
	        var sInst = this.getInstance();
	        var sPicFld = this._sPicFolder;

	        this._createBtn("btn_1", sInst + "_btn_1", "1", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_2", sInst + "_btn_2", "2", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_3", sInst + "_btn_3", "3", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_4", sInst + "_btn_4", "4", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_5", sInst + "_btn_5", "5", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_6", sInst + "_btn_6", "6", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_7", sInst + "_btn_7", "7", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_8", sInst + "_btn_8", "8", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_9", sInst + "_btn_9", "9", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_0", sInst + "_btn_0", "0", 366, 105, "0.gif", "0_off.gif");
	    },

	    _createBtn: function (sInstance, sCtrlPlace, sKey, nWidth, nHeight, sActivePic, sInactivePic, nFontSize, options) {
	        var oBtn = null;
	        oBtn = new CDgKeyboardBtn(this, sInstance, sCtrlPlace, sKey, nWidth, nHeight,
                this._sPicFolder + "/" + sActivePic, this._sPicFolder + "/" + sInactivePic, nFontSize, options);
	        oBtn.attachListener("onClick", $delegate(this, this._onButtonClick));
	        oBtn.create();
	        oBtn.render();
	        this[sInstance] = oBtn;
	    },

	    _onButtonClick: function (sender, eargs) {
	        this.keyPress(eargs.value);
	    }
	}
);

	CDigitalKeyboardCel = createClass
(
	CKeyboard,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sPicFolder) {
	        var args = { "0": arguments["3"] };
	        Function.validateParams(args, [
	                    { name: "sPicFolder", type: String, canBeNull: true, canBeEmpty: true }
            ]);
	        CDigitalKeyboard.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._sPicFolder = ((!Object.isNullOrUndefined(sPicFolder)) ? sPicFolder : "./img/ui/keyboard/digital");
	    },

	    _paint: function() {
	        this._prepareTemplate();
	        this._createObjects();
	    },

	    _prepareTemplate: function() {
	        var oDiv = $(this.getPlaceId());

	        if (Object.isNullOrUndefined(oDiv)) {
	            return;
	        }

	        var sContent = "<table cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"100%\" height=\"100%\" align=\"center\" valign=\"middle\">";

	        sContent += "<table border=\"0\" cellpadding=\"0\" cellspacing=\"5\">" +
                        "  <tr>" +
                        "    <td id=\"" + this.getInstance() + "_btn_1\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_2\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_3\"></td>" +
                        "  </tr>" +
                        "  <tr>" +
                        "    <td id=\"" + this.getInstance() + "_btn_4\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_5\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_6\"></td>" +
                        "  </tr>" +
                        "  <tr>" +
                        "    <td id=\"" + this.getInstance() + "_btn_7\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_8\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_9\"></td>" +
                        "  </tr>" +
                        "  <tr>" +
                        "    <td id=\"" + this.getInstance() + "_btn_0\"></td>" +
                        "  </tr>" +
	                    "</table>";
	        sContent += "</td></tr></table>";

	        oDiv.innerHTML = sContent;
	    },

	    _createObjects: function() {
	        var sInst = this.getInstance();
	        var sPicFld = this._sPicFolder;

	        this._createBtn(CDCelKeyboardBtn, "btn_1", sInst + "_btn_1", "1");
	        this._createBtn(CDCelKeyboardBtn, "btn_2", sInst + "_btn_2", "2");
	        this._createBtn(CDCelKeyboardBtn, "btn_3", sInst + "_btn_3", "3");
	        this._createBtn(CDCelKeyboardBtn, "btn_4", sInst + "_btn_4", "4");
	        this._createBtn(CDCelKeyboardBtn, "btn_5", sInst + "_btn_5", "5");
	        this._createBtn(CDCelKeyboardBtn, "btn_6", sInst + "_btn_6", "6");
	        this._createBtn(CDCelKeyboardBtn, "btn_7", sInst + "_btn_7", "7");
	        this._createBtn(CDCelKeyboardBtn, "btn_8", sInst + "_btn_8", "8");
	        this._createBtn(CDCelKeyboardBtn, "btn_9", sInst + "_btn_9", "9");
	        this._createBtn(CDCelKeyboardBtn, "btn_0", sInst + "_btn_0", "0");

	    },

	    _createBtn: function(fType, sInstance, sCtrlPlace, sKey, sActivePic, sInactivePic) {
	        var oBtn = null;
	        if (fType === CDgKeyboardBtn) {
	            oBtn = new fType(this, sInstance, sCtrlPlace, sKey);
	        }
	        else if (fType === CImageButton) {
	            oBtn = new fType(this, sInstance, sCtrlPlace, sKey, sActivePic, sInactivePic);
	        }
	        else {
	            return;
	        }
	        oBtn.attachListener("onClick", $delegate(this, this._onButtonClick));
	        oBtn.create();
	        oBtn.render();
	        this[sInstance] = oBtn;
	    },

	    _onButtonClick: function(sender, eargs) {
	        this.keyPress(eargs.value);
	    }
	}
);



	CDigitalKeyboardT = createClass // with tab
(
	CDigitalKeyboard,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sPicFolder) {
	        CDigitalKeyboardT.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sPicFolder);
	    },

	    _prepareTemplate: function () {
	        var sContent = "<table cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"100%\" height=\"100%\" align=\"center\" valign=\"middle\">";

	        sContent += "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class='keyboard-digital'>" +
                        "  <tr>" +
                        "    <td id=\"" + this.getInstance() + "_btn_1\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_2\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_3\"></td>" +
                        "  </tr>" +
                        "  <tr>" +
                        "    <td id=\"" + this.getInstance() + "_btn_4\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_5\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_6\"></td>" +
                        "  </tr>" +
                        "  <tr>" +
                        "    <td id=\"" + this.getInstance() + "_btn_7\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_8\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_9\"></td>" +
                        "  </tr>" +
                        "  <tr>" +
                        "    <td id=\"" + this.getInstance() + "_btn_tab\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_0\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_empty\"></td>" +
                        "  </tr>" +
	                    "</table>";
	        sContent += "</td></tr></table>";

	        insertContent(this.getPlaceId(), sContent);
	    },

	    _createObjects: function () {
	        var sInst = this.getInstance();
	        var sPicFld = this._sPicFolder;

	        this._createBtn("btn_1", sInst + "_btn_1", "1", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_2", sInst + "_btn_2", "2", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_3", sInst + "_btn_3", "3", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_4", sInst + "_btn_4", "4", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_5", sInst + "_btn_5", "5", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_6", sInst + "_btn_6", "6", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_7", sInst + "_btn_7", "7", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_8", sInst + "_btn_8", "8", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_9", sInst + "_btn_9", "9", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_0", sInst + "_btn_0", "0", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_tab", sInst + "_btn_tab", "TAB", 117, 117, "orange_btn_press.gif", "orange_btn_unpress.gif", 40, { color: 30 });
	        this._createBtn("btn_empty", sInst + "_btn_empty", null, 117, 117, "orange_btn_press.gif", "orange_btn_unpress.gif", null, { color: 30 });
	    }
	}
);

CDigitalKeyboardD = createClass // with dot
(
	CDigitalKeyboard,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sPicFolder) {
	        CDigitalKeyboardD.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sPicFolder);
	    },

	    _prepareTemplate: function () {
	        var sContent = "<table cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"100%\" height=\"100%\" align=\"center\" valign=\"middle\">";

	        sContent += "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class='keyboard-digital'>" +
                        "  <tr>" +
                        "    <td id=\"" + this.getInstance() + "_btn_1\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_2\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_3\"></td>" +
                        "  </tr>" +
                        "  <tr>" +
                        "    <td id=\"" + this.getInstance() + "_btn_4\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_5\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_6\"></td>" +
                        "  </tr>" +
                        "  <tr>" +
                        "    <td id=\"" + this.getInstance() + "_btn_7\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_8\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_9\"></td>" +
                        "  </tr>" +
                        "  <tr>" +
                        "    <td id=\"" + this.getInstance() + "_btn_empty\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_0\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_dot\"></td>" +
                        "  </tr>" +
	                    "</table>";
	        sContent += "</td></tr></table>";

	        insertContent(this.getPlaceId(), sContent);
	    },

	    _createObjects: function () {
	        var sInst = this.getInstance();
	        var sPicFld = this._sPicFolder;

	        this._createBtn("btn_1", sInst + "_btn_1", "1", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_2", sInst + "_btn_2", "2", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_3", sInst + "_btn_3", "3", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_4", sInst + "_btn_4", "4", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_5", sInst + "_btn_5", "5", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_6", sInst + "_btn_6", "6", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_7", sInst + "_btn_7", "7", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_8", sInst + "_btn_8", "8", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_9", sInst + "_btn_9", "9", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_0", sInst + "_btn_0", "0", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_dot", sInst + "_btn_dot", ".", 117, 117, "orange_btn_press.gif", "orange_btn_unpress.gif", null, { color: 30 });
	        this._createBtn("btn_empty", sInst + "_btn_empty", null, 117, 117, "orange_btn_press.gif", "orange_btn_unpress.gif", null, { color: 30 });
	    }
	}
);

CDigitalKeyboardDT = createClass // with dot and tab
(
	CDigitalKeyboard,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sPicFolder) {
	        CDigitalKeyboardDT.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sPicFolder);
	    },

	    _prepareTemplate: function () {
	        var sContent = "<table cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"100%\" height=\"100%\" align=\"center\" valign=\"middle\">";

	        sContent += "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class='keyboard-digital'>" +
                        "  <tr>" +
                        "    <td id=\"" + this.getInstance() + "_btn_1\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_2\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_3\"></td>" +
                        "  </tr>" +
                        "  <tr>" +
                        "    <td id=\"" + this.getInstance() + "_btn_4\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_5\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_6\"></td>" +
                        "  </tr>" +
                        "  <tr>" +
                        "    <td id=\"" + this.getInstance() + "_btn_7\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_8\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_9\"></td>" +
                        "  </tr>" +
                        "  <tr>" +
                        "    <td id=\"" + this.getInstance() + "_btn_tab\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_0\"></td>" +
                        "    <td id=\"" + this.getInstance() + "_btn_dot\"></td>" +
                        "  </tr>" +
	                    "</table>";
	        sContent += "</td></tr></table>";

	        insertContent(this.getPlaceId(), sContent);
	    },

	    _createObjects: function () {
	        var sInst = this.getInstance();
	        var sPicFld = this._sPicFolder;

	        this._createBtn("btn_1", sInst + "_btn_1", "1", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_2", sInst + "_btn_2", "2", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_3", sInst + "_btn_3", "3", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_4", sInst + "_btn_4", "4", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_5", sInst + "_btn_5", "5", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_6", sInst + "_btn_6", "6", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_7", sInst + "_btn_7", "7", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_8", sInst + "_btn_8", "8", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_9", sInst + "_btn_9", "9", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_0", sInst + "_btn_0", "0", 117, 117, "blue_btn_press.gif", "blue_btn_unpress.gif");
	        this._createBtn("btn_dot", sInst + "_btn_dot", ".", 117, 117, "orange_btn_press.gif", "orange_btn_unpress.gif", null, { color: 30 });
	        this._createBtn("btn_tab", sInst + "_btn_tab", "TAB", 117, 117, "orange_btn_press.gif", "orange_btn_unpress.gif", 40, { color: 30 });
	    }
	}
);

	CALKeyboard = createClass
(
	CKeyboard,
	{
	    _typeName: "CALKeyboard",

	    ctor: function (oParent, sInstance, sCtrlPlace, sPicFolder, bIsRus, bIsCaps) {
	        var args = { "0": arguments["3"] };
	        Function.validateParams(args, [
                    { name: "sPicFolder", type: String, canBeNull: true, canBeEmpty: true }
                ]);

	        CALKeyboard.base.ctor.call(this, oParent, sInstance, sCtrlPlace);

	        this._sPicFolder = ((!Object.isNullOrUndefined(sPicFolder)) ? sPicFolder : "./img/ui/keyboard/al");
	        this._nCharIdx = 0;
	        this._bIsEng = !$bool(bIsRus);
	        this._bIsCaps = $bool(bIsCaps);
	        this._bIsShift = false;
	    },

	    _initialize: function () {
	        this._aBtnValues =
	            ['1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999', '0000', '-_-_', '=+=+', '|/|/',
	             'qQéÉ', 'wWöÖ', 'eEóÓ', 'rRêÊ', 'tTåÅ', 'yYíÍ', 'uUãÃ', 'iIøØ', 'oOùÙ', 'pPçÇ', '[{õÕ', ']}úÚ', '@~¸¨',
	             'aAôÔ', 'sSûÛ', 'dDâÂ', 'fFàÀ', 'gGïÏ', 'hHðÐ', 'jJîÎ', 'kKëË', 'lLäÄ', ';:æÆ', '**ýÝ',
	             'zZÿß', 'xX÷×', 'cCñÑ', 'vVìÌ', 'bBèÈ', 'nNòÒ', 'mMüÜ', ',\<áÁ', '.>þÞ', '/?.,'];
	    },

	    _paint: function () {
	        this._prepareTemplate();
	        this._createObjects();
	        this._fillBtn();
	    },

	    _prepareTemplate: function () {
	        var oDiv = $(this.getPlaceId());

	        if (Object.isNullOrUndefined(oDiv)) {
	            return;
	        }

	        var sContent = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"100%\" height=\"100%\" align=\"center\" valign=\"middle\">";

	        sContent +=
	            "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">" +
	            "  <tr>" +
	            "    <td>" +
	            "      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"height: 91px;\">" +
	            "        <tr>";
	        for (var i = 1; i <= 13; i++) {
	            sContent +=
	                "      <td id=\"" + this.getInstance() + "_btn_" + i + "\" width=\"87\" height=\"87\" align=\"center\" valign=\"middle\" style=\"padding: 2px 0px 0px 0px;\"></td>";
	        }
	        sContent +=
	            "        </tr>" +
	            "      </table>" +
	            "    </td>" +
	            "  </tr>" +
	            "  <tr>" +
	            "    <td>" +
	            "      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"height: 91px;\">" +
	            "        <tr>";
	        for (var i = 14; i <= 26; i++) {
	            sContent +=
	                "      <td id=\"" + this.getInstance() + "_btn_" + i + "\" align=\"center\" valign=\"middle\" style=\"padding: 2px 0px 0px 0px;\"></td>";
	        }
	        sContent +=
	            "        </tr>" +
	            "      </table>" +
	            "    </td>" +
	            "  </tr>" +
	            "  <tr>" +
	            "    <td>" +
	            "      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"height: 91px;\">" +
	            "        <tr>";
	        for (var i = 27; i <= 37; i++) {
	            sContent +=
	                "      <td id=\"" + this.getInstance() + "_btn_" + i + "\" align=\"center\" valign=\"middle\"  style=\"padding: 2px 5px 0px 0px;\"></td>";
	        }
	        sContent +=
	            "          <td id=\"" + this.getInstance() + "_btn_tab\" align=\"right\" valign=\"top\" style=\"padding: 2px 0px 0px 0px;\"></td>" +
	            "        </tr>" +
	            "      </table>" +
	            "    </td>" +
	            "  </tr>" +
	            "  <tr>" +
	            "    <td>" +
	            "      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"height: 91px;\">" +
	            "        <tr>";
	        for (var i = 38; i <= 47; i++) {
	            sContent +=
	                "      <td id=\"" + this.getInstance() + "_btn_" + i + "\" align=\"center\" valign=\"middle\" style=\"padding: 2px 5px 0px 0px;\"></td>";
	        }
	        sContent +=
    	        "          <td id=\"" + this.getInstance() + "_btn_lang\" align=\"center\" style=\"padding: 2px 5px 0px 0px;\"></td>" +
	            "          <td id=\"" + this.getInstance() + "_btn_shift\" align=\"right\" valign=\"top\" style=\"padding: 2px 0px 0px 0px;\"></td>" +
	            "        </tr>" +
	            "      </table>" +
	            "    </td>" +
	            "  </tr>" +
	            "  <tr>" +
	            "    <td>" +
	            "      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style='margin-top: 4px'>" +
	            "        <tr>" +
	            "          <td id=\"" + this.getInstance() + "_btn_capslock\" align=\"left\" valign=\"top\" style=\"padding: 2px 3px 0px 0px;\"></td>" +
	            "          <td id=\"" + this.getInstance() + "_btn_space\" align=\"center\" valign=\"top\" style=\"padding: 2px 3px 0px 0px;\"></td>" +
	            "          <td align=\"right\" valign=\"top\"><div id=\"" + this.getInstance() + "_btn_clear\" style=\"width: 100%;\"></div><div id=\"" + this.getInstance() + "_pic_lang\" style=\"clear: both; padding-top: 10px;\"></div></td>" +
	            "        </tr>" +
	            "      </table>" +
	            "    </td>" +
	            "  </tr>" +
	            "</table>";


	        sContent += "</td></tr></table>";


	        oDiv.innerHTML = sContent;
	    },

	    _createObjects: function () {
	        var sInst = this.getInstance();
	        var sPicFld = this._sPicFolder;

	        for (var i = 1, l = this._aBtnValues.length; i <= l; i++)
	        {
	            this._createBtn(CAlKeyboardBtn, ("button_" + i),
	                (sInst + "_btn_" + i), null, 87, 87, sPicFld + "/blue_btn_press.gif", sPicFld + "/blue_btn_unpress.gif");
	        }
	        this._createBtn(CAlKeyboardBtn, "btn_tab", sInst + "_btn_tab", "TAB", 184, 87, sPicFld + "/2btnorange_press.gif", sPicFld + "/2btnorange_unpress.gif");
	        this._createBtn(CAlKeyboardBtn, "btn_lang", sInst + "_btn_lang", "ÀÁÂ", 87, 87, sPicFld + "/orange_btn_press.gif", sPicFld + "/orange_btn_unpress.gif", 30);
	        this._createBtn(CAlKeyboardBtn, "btn_shift", sInst + "_btn_shift", "Shift", 184, 87, sPicFld + "/2btnorange_press.gif", sPicFld + "/2btnorange_unpress.gif");
	        this._createBtn(CAlKeyboardBtn, "btn_capslock", sInst + "_btn_capslock", "CapsLock", 282, 87, sPicFld + "/3btnorange_press.gif", sPicFld + "/3btnorange_unpress.gif", 35);
	        this._createBtn(CAlKeyboardBtn, "btn_space", sInst + "_btn_space", " ", 678, 117, sPicFld + "/space_press.gif", sPicFld + "/space_unpress.gif");
	        this._createBtn(CAlKeyboardBtn, "btn_clear", sInst + "_btn_clear", "Ñòåðåòü âñå", 282, 87, sPicFld + "/3btnorange_press.gif", sPicFld + "/3btnorange_unpress.gif", 35);

	        this._changeState();
	    },

	    _createBtn: function (fBtn, sInstance, sCtrlPlace, sKey, nWidth, nHeight, sActivePic, sInactivePic, nFontSize) {
	        this[sInstance] = null;
	        this[sInstance] = new fBtn(this, sInstance, sCtrlPlace, sKey, nWidth, nHeight, sActivePic, sInactivePic, nFontSize, true);
	        this[sInstance].attachListener("onClick", $delegate(this, this._onButtonClick));
	        this[sInstance].create();
	        this[sInstance].render();
	    },

	    _fillBtn: function () {
	        for (var i = 1, l = this._aBtnValues.length; i <= l; i++)
	        {
	                this["button_" + i.toString(10)].setValue(this._aBtnValues[i - 1].charAt(this._nCharIdx));
	        }
	    },

	    _onButtonClick: function (sender, eargs) {
	        var sValue = (!$isNoU(eargs.value)) ? eargs.value : eargs.key;
	        switch (sValue) {
	            case "CapsLock":
	                this._bIsCaps = !this._bIsCaps;
	                break;
	            case "Shift":
	                this._bIsShift = !this._bIsShift;
	                break;
	            case "ABC":
	                this._bIsEng = !this._bIsEng;
	                break;
	            case "ÀÁÂ":
	                this._bIsEng = !this._bIsEng;
	                break;
	            default:
	                if (sValue == "Ñòåðåòü âñå")
	                    sValue = "CLEAR";
	                this.keyPress(sValue);
	                if (this._bIsShift) {
	                    this._bIsShift = !this._bIsShift;
	                }
	                break;
	        }
	        this._changeState();
	    },

	    _changeState: function () {
	        var nCharIdx = 0;
	        var sPicFld = this._sPicFolder;
	        var oLangPic = $(this.getInstance() + "_pic_lang");

	        if (this._bIsEng) {
	            oLangPic.innerHTML = "<img src=\"" + sPicFld + "/latin.gif\" />";
	            this["btn_lang"].setValue("ÀÁÂ");
	        }
	        else {
	            oLangPic.innerHTML = "<img src=\"" + sPicFld + "/russian.gif\" />";
	            this["btn_lang"].setValue("ABC");
	            nCharIdx += 2;
	        }

	        if ((this._bIsCaps && !this._bIsShift) ||
	            (!this._bIsCaps && this._bIsShift)) {
	            nCharIdx++;
	        }

	        this._nCharIdx = nCharIdx;
	        this._fillBtn();
	    }
	}
);


	CSearchKeyboard = createClass
(
	CControl,
	{
	    _typeName: "CSearchKeyboard",

	    ctor: function (oParent, sInstance, sCtrlPlace) {

	        CSearchKeyboard.base.ctor.call(this, oParent, sInstance, sCtrlPlace);

	        this._aBtnValuesE = [];
	        this._aBtnValuesR = [];
	        this._aBtnValuesD = [];
	        this._bIsRus = true;
	        this._bIsEng = false;
	        this._bIsDigits = false;
	        this._aPosition = ['center', 'center', 'right'];
	    },

	    _initialize: function () {
	        this._aBtnValuesE =
                [
                    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O'],
                    ['ÐÓÑ', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '123'],
                    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ÏÐÎÁÅË']
                ];
	        this._aBtnValuesR =
                [
                    ['É', 'Ö', 'Ó', 'Ê', 'Å', 'Í', 'Ã', 'Ø', 'Ù', 'Ç', 'Õ', 'Ú', 'Ý'],
                    ['ENG', 'Ô', 'Û', 'Â', 'À', 'Ï', 'Ð', 'Î', 'Ë', 'Ä', 'Æ', '123'],
                    ['ß', '×', 'Ñ', 'Ì', 'È', 'Ò', 'Ü', 'Á', 'Þ', 'ÏÐÎÁÅË']
                ];
	        this._aBtnValuesD =
                [
                    [],
                    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '.', 'ÀÁÂ'],
                    ['ÏÐÎÁÅË']
                ];
	    },

	    _paint: function () {
	        this._prepareTemplate('rus');
	        this._createObjects();
	    },

	    _prepareTemplate: function (key) {
	        var sContent = '',
	            aKeqboard = [],
	            oDiv = $(this.getPlaceId()),
	            align = '',
	            id = 1;

	        oDiv.innerHTML = '';

	        switch (key) {
	            case 'rus':
	                aKeqboard = this._aBtnValuesR;
	                break;
	            case 'eng':
	                aKeqboard = this._aBtnValuesE;
	                break;
	            case 'dig':
	                aKeqboard = this._aBtnValuesD;
	                break;
	        }

	        sContent = '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">';
	        for (var i = 0; i < aKeqboard.length; i++) {
	            align = this._aPosition[i];
	            if (aKeqboard[i].length != 0) {
	                sContent += '<tr><td align="' + align + '" valign="middle"><table cellpadding="0" cellspacing="0" border="0" width="auto" height="70"><tr>';
	                for (var j = 0; j < aKeqboard[i].length; j++) {
	                    if (aKeqboard[i][j] == 'ÏÐÎÁÅË')
	                        sContent += '<td width="320" height="70" align="center"><div id="search_btn_' + (id++) + '" class="k_s k_f k_c_b"></div></td>';
	                    else
	                        if (aKeqboard[i][j].length > 1) {
	                            sContent += '<td width="120" height="70" align="center"><div id="search_btn_' + (id++) + '" class="k_b k_f k_c_w"></div></td>';
	                        }
	                        else {
	                            sContent += '<td width="80" height="70" align="center"><div id="search_btn_' + (id++) + '" class="k_v k_f k_c_b"></div></td>';
	                        }
	                }
	                sContent += '</tr></table></td></tr>';
	            }
	            else
	                sContent += '<tr><td width="100%" height="76" ></td></tr>';

	        }
	        sContent += '</table>';

	        oDiv.innerHTML = sContent;
	    },

	    _createObjects: function () {
	        var aKeqboard = [],
	            id = 1,
	            o = null;

	        if (this._bIsRus)
	            aKeqboard = this._aBtnValuesR;
	        if (this._bIsEng)
	            aKeqboard = this._aBtnValuesE;
	        if (this._bIsDigits)
	            aKeqboard = this._aBtnValuesD;

	        for (var i = 0; i < aKeqboard.length; i++) {
	            for (var j = 0; j < aKeqboard[i].length; j++) {
	                o = $('search_btn_' + id++);
	                o.innerHTML = aKeqboard[i][j];
	                attachEventListener(o.id, "click", $delegate(this, this._buttonPress));
	            }
	        }
	    },

	    _buttonPress: function (o) {
	        new CInnerShadow(o.srcElement.id);
	        var eventArgs = {};
	        eventArgs.value = o.srcElement.innerHTML;
	        if (/123|ÀÁÂ|ENG|ÐÓÑ/.test(eventArgs.value))
	            this._change(eventArgs.value);
	        else
	            this.notify("onKeyPress", eventArgs);
	    },

	    _change: function (key) {
	        var s = 'rus';

	        if (key == '123')
	            if (this._bIsRus)
	                this._aBtnValuesD[1][12] = 'ÀÁÂ';
	            else
	                this._aBtnValuesD[1][12] = 'ENG';

	        this._bIsRus = false;
	        this._bIsEng = false;
	        this._bIsDigits = false;

	        switch (key) {
	            case '123':
	                s = 'dig';
	                this._bIsDigits = true;
	                break;
	            case 'ENG':
	                s = 'eng';
	                this._bIsEng = true;
	                break;
	            case 'ÐÓÑ':
	            case 'ÀÁÂ':
	                s = 'rus';
	                this._bIsRus = true;
	                break;
	        }
	        var t = this;
	        setTimeout(function () {
	            t._prepareTemplate(s);
	            t._createObjects();
	        }, 150);
	    }
	}
);






