// base component class definition
CComponent = createClass
(
	null,
	{
	    ctor: function(oParent, sInstance) {
	        Function.validateParams(arguments, [
	                { name: "oParent", type: Object, canBeNull: true },
	                { name: "sInstance", type: String, canBeNull: true }
            ]);
	        this._oParent = oParent;
	        this._sInstance = 
	           !$isNoU(sInstance) ? ((!$isNoU(oParent)) ? oParent.getInstance() + "." + sInstance : sInstance) : "";
	        this._aListeners = new Array();
	    },

	    destructor: function() {
	        this.notify("onDestroy");
	    },

	    create: function() {
	        this._initialize();
	        this.notify("onCreate");
	    },

	    // additional method of initializing (redefine)
	    _initialize: function() {
	        //NOTIMPLEMENTED
	    },

	    attachListener: function(eventType, eventListener) {
	        if (!Function.validateParams(arguments, [
	                { name: "eventType", type: String },
	                { name: "eventListener", type: Function }
	            ])) {
	            return;
	        }

	        if (!this._aListeners[eventType]) {
	            this._aListeners[eventType] = new Array();
	        }
	        this._aListeners[eventType].push(eventListener);
	    },

	    detachListener: function(eventType, eventListener) {
	        if (!Function.validateParams(arguments, [
	                { name: "eventType", type: String },
	                { name: "eventListener", type: Function, canBeNull: true, canBeEmpty: true }
	            ])) {
	            return [];
	        }
	        var a = [];
	        if (!$isNoU(eventListener) && eventListener.is(Function)) {
	            if (this._aListeners[eventType] && this._aListeners[eventType].is(Array)) {
	                for (var i = 0; i < this._aListeners[eventType].length; i++) {
	                    if (this._aListeners[eventType][i].toString() == eventListener.toString()) {
	                        a.push(this._aListeners[eventType].splice(i, 1));
	                        return a;
	                    }
	                }
	            }
	        }
	        else {
	            var a = this._aListeners[eventType];
	            this._aListeners[eventType] = [];
	            return a;
	        }
	    },

	    notify: function(eventType, eventArgs) {
	        if (!Function.validateParams(arguments, [
	                    { name: "eventType", type: String },
	                    { name: "eventArgs", type: Object, canBeNull: true, canBeEmpty: true }
	                ])) return;

	        var listeners = this._aListeners[eventType];
	        if (!listeners || listeners._typeName !== "Array") return;
	        
	        for (var i = 0, l = listeners.length; i < l; i++)
	        {
	            if (Object.isNullOrUndefined(eventArgs)) eventArgs = {};
	            
	            try
	            {
	                listeners[i](this, eventArgs);
	            }
	            catch (e)
	            {
	                al("Exception in " + this.getInstance() +
	                    ".notify(\"" + eventType + "\")\ndescription: " +
	                    e.description);
	            }
	        }
	    },

	    getParent: function() {
	        return this._oParent;
	    },

	    getInstance: function() {
	        return this._sInstance;
	    }
	}
);

	CControl = createClass
(
	CComponent,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace) {
	        var args = { "0": arguments["2"] };
	        Function.validateParams(args, [
	                    { name: "sCtrlPlace", type: String }
            ]);
	        CControl.base.ctor.call(this, oParent, sInstance);
	        this._sPlace = sCtrlPlace;
	        this._sDivCssClass = "";
	        this._sKeyCode = "";
	    },

	    destructor: function() {
	        var oPlace = $(this._sPlace);
	        if (!Object.isNullOrUndefined(oPlace)) {
	            oPlace.innerHTML = "";
	            oPlace = null;
	        }
	        CControl.base.destructor.apply(this, arguments);
	    },

	    _paint: function() {
	        var oPlace = $(this._sPlace);
	        if (!Object.isNullOrUndefined(oPlace)) {
	            with (oPlace.style) {
	                background = "#a4c0c1";
	                borderWidth = "1px";
	                borderStyle = "solid";
	                borderColor = "#000099";
	            }
	            oPlace.align = "center";
	            oPlace.innerHTML = 'Control "' + this._sInstance + '"';
	        }
	    },
	    
	    render: function() {
	        this._paint();
	        this.notify("onRender");
	    },

	    getPlaceId: function() {
	        return this._sPlace;
	    },

	    setCtrlDivCssClass: function(sClass) {
	        this._sDivCssClass = sClass;
	        setCssClass(this.getPlaceId(), sClass);
	    },

	    getCtrlDivCssClass: function() {
	        return this._sDivCssClass;
	    }
	}
);

	CKeyCodesTable = createClass
(
	CComponent,
	{
	    ctor: function() {
	        CKeyCodesTable.base.ctor.call(this, null, null);
	        this._oKeyCodes = {};
	    },

	    registerBtn: function(oBtn, sKeyCode) {
	        Function.validateParams(arguments, [
                { name: "oBtn", type: CButton },
                { name: "sKeyCode", type: String }
            ]);
	        if ($isNoU(this._oKeyCodes[sKeyCode])) {
	            this._oKeyCodes[sKeyCode] = [];
	        }
	        for (var i = 0; i < this._oKeyCodes[sKeyCode].length; i++) {
	            if (this._oKeyCodes[sKeyCode][i] == oBtn) {
	                return;
	            }
	        }
	        this._oKeyCodes[sKeyCode].push(oBtn);
	    },

	    unregisterBtn: function(oBtn, sKeyCode) {
	        Function.validateParams(arguments, [
                { name: "oBtn", type: CButton },
                { name: "sKeyCode", type: String }
            ]);
	        if (!$isNoU(this._oKeyCodes[sKeyCode])) {
	            for (var i = 0; i < this._oKeyCodes[sKeyCode].length; i++) {
	                if (this._oKeyCodes[sKeyCode][i] == oBtn) {
	                    this._oKeyCodes[sKeyCode].splice(i, 1);
	                }
	            }
	        }
	    },

	    processKey: function(sKeyCode) {
	        Function.validateParams(arguments, [
                { name: "sKeyCode", type: String }
            ]);
	        if (!$isNoU(this._oKeyCodes[sKeyCode])) {
	            for (var i = 0; i < this._oKeyCodes[sKeyCode].length; i++) {
	                this._oKeyCodes[sKeyCode][i].click();
	            }
	        }
	    }
	}
);

	CButton = createClass
(
	CControl,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace) {
	        CButton.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._kct = null;
	        this._sKeyCode = "";
	        this._sControlPlace = sCtrlPlace;
	        if (!$isNoU(window.keyCodesTable) && keyCodesTable.is(CKeyCodesTable)) {
	            this._kct = keyCodesTable;
	        }
	    },

	    _initialize: function () {
	        attachEventListener(this.getPlaceId(), "click",
	            $delegate(this, this.click));
	    },

	    _getKeyCodesTable: function () {
	        return this._kct;
	    },

	    setKeyCode: function (sKeyCode) {
	        Function.validateParams(arguments, [
                { name: "sKeyCode", type: String }
            ]);
	        if (!$isNoU(this._kct) && sKeyCode.length > 0) {
	            this._sKeyCode = sKeyCode;
	            this._kct.registerBtn(this, sKeyCode);
	        }
	    },

	    removeKeyCode: function () {
	        if (!$isNoU(this._kct) && this._sKeyCode.length > 0) {
	            this._kct.unregisterBtn(this, this._sKeyCode);
	        }
	    },

	    getKeyCode: function () {
	        return this._sKeyCode;
	    },

	    click: function () {
	        new CInnerShadow(this._sControlPlace);
	        var t = this;
	        setTimeout(function () {
	            t.notify("onClick");
	            return false;
	        }, 100);
	    }
	}
);

	CBtmMenuButton = createClass
(
	CButton,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace, sEnabledImg) {
	        CBtmMenuButton.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._sEnabledImg = sEnabledImg;
	        this._sBaseFolder = "./img/ui/navigation/";
	    },

	    _paint: function () {
	        var oDiv = $(this.getPlaceId());
	        if (!Object.isNullOrUndefined(oDiv)) {
	            this._sControlPlace = oDiv.id + '_img';
	            oDiv.innerHTML = "<img id=\"" + this._sControlPlace + "\" src=\"" + this._sBaseFolder + this._sEnabledImg + "\" />";
	            oDiv.onclick = null;
	            attachEventListener(oDiv.firstChild.id, "click", $delegate(this, this.click));
	        }
	    },

	    setEnabled: function (bEnabled) {
	        var oDiv = $(this.getPlaceId());
	        if (!($isNoU(oDiv) || $isNoU(oDiv.childNodes[0]))) {
	            if ($bool(bEnabled)) {
	                oDiv.childNodes[0].style.display = "block";
	            }
	            else {
	                oDiv.childNodes[0].style.display = "none";
	            }
	        }
	    }
	}
);

	CElementButton = createClass
(
	CButton,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace, oButton) {
	        CElementButton.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._o = oButton;
	        this._sId = this._o.getId();
	        this._sName = this._o.getName();
	        this._sLogo = this._o.getLogo();
	        this._sTag = this._o.getTag();
	        this._nAction = (this._sTag.indexOf('ranges') != -1 && nNoCommission !== 0) ? nNoCommission : 0;
	    },

	    _paint: function () {
	        var oDiv = $(this.getPlaceId());
	        if (!$isNoU(oDiv)) {
	            this._sControlPlace = this.getInstance() + '_div';
	            oDiv.innerHTML =
	            ['<div id="', this._sControlPlace, '" class="provider-button" >',
                    	'<div style="background-image: url(\'./img/ui_item/', getFileName(this._sLogo), '\')"></div>',
                    	'<p>', autohyphen.hyphenizeText(this._sName), '</p>',
                    '</div>'].join('');
	            if (nNoCommission && this._sTag.indexOf('ranges') != -1) {
	                oDiv.style.position = "relative";
	                var o = getElementRect(oDiv.id),
                        oStar = document.createElement("div");
	                oStar.className = "star";
	                oStar.style.top = -9;
	                oStar.style.left = (310 - nNoCommission * 23) / 2;
	                oStar.style.width = nNoCommission * 23;
	                oDiv.appendChild(oStar);
	            }
	            oDiv.onclick = null;

	            var p = oDiv.getElementsByTagName('p')[0];
	            p.style.paddingTop = (oDiv.firstChild.clientHeight - p.clientHeight) / 2 + 'px';

	            attachEventListener(oDiv.firstChild.id, "click", $delegate(this, this.click));
	        }
	    },

	    click: function () {
	        new CInnerShadow(this._sControlPlace);
            // log start
	        if (parseInt(this._sId, 10) < 0) {
	            _log('<c t="g" i="' + this._sId.substr(1) + '"></c>');
	        }
	        else {
	            _log('<c t="pr" i="' + this._sId + '"></c>');
	        }
            // log stop
	        var t = this;
	        setTimeout(function () {
	            t.notify("onClick", t._o);
	        }, 100);
	    }
	}
);

	CDispButton = createClass
(
	CButton,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace, value, type, desc, name, id, extras) {
	        var args = { "0": arguments["3"] };
	        CDispButton.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._value = value;
	        this._type = type;
	        this._desc = desc;
	        this._extraname = name;
	        this._id = id;
	        this._extras = extras;
	    },

	    _paint: function () {
	        var oDiv = $(this.getPlaceId());
	        if (!$isNoU(oDiv)) {
	            this._sControlPlace = this.getInstance() + '_div';
	            oDiv.innerHTML =
	            ['<div id="', this._sControlPlace, '" class="disp_button" >',
                    	'<p>', autohyphen.hyphenizeText(this._value), '</p>',
                    '</div>'].join('');
	            oDiv.onclick = null;

	            var p = oDiv.getElementsByTagName('p')[0];
	            p.style.marginLeft = '10px';
	            p.style.paddingTop = (oDiv.firstChild.clientHeight - p.clientHeight) / 2 + 'px';

	            attachEventListener(oDiv.firstChild.id, "click", $delegate(this, this.click));
	        }
	    },

	    click: function () {
	        new CInnerShadow(this._sControlPlace);
	        var t = this,
                eventArgs = {};
	        eventArgs.value = this._value;
	        eventArgs.type = this._type;
	        eventArgs.desc = this._desc;
	        eventArgs.extraName = this._extraname;
	        eventArgs.id = this._id;
	        eventArgs.extras = this._extras;
	        setTimeout(function () {
	            t.notify("onClick", eventArgs);
	        }, 150);
	    },

	    getId: function () {
	        return this._sId;
	    },

	    getName: function () {
	        return this._sName;
	    },

	    getLogo: function () {
	        return this._sLogo;
	    }
	}
);

	CClaimButton = createClass
(
	CButton,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sName) {
	        CClaimButton.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._sName = "";
	        if ($is(sName, String)) {
	            this._sName = sName;
	        }
	    },

	    _paint: function() {
	        var oDiv = $(this.getPlaceId());
	        if(!$isNoU(oDiv))
	        {
	            oDiv.innerHTML =
	            ['<div id="', this.getInstance(), '_div" class="claim-button">',
                    	'   <p id="claim-content">днаюбхрэ<br />', this._sName, '</p>',
                    '</div>'].join('');
	            oDiv.onclick = null;
                    
	            attachEventListener(oDiv.firstChild.id, "click", $delegate(this, this.click));
	        }
	    },

	    click: function () {
	        new CInnerShadow($(this._sControlPlace).firstChild.id);
	        var t = this,
                eventArgs = {};
	            eventArgs.value = this._sId;
	        setTimeout(function () {
	            t.notify("onClick", eventArgs);
	        }, 100);
	        
	    },

	    getName: function() {
	        return this._sName;
	    }
	}
);

	CTopElementButton = createClass
(
	CElementButton,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace, oButton) {
	        CTopElementButton.base.ctor.call(this, oParent, sInstance, sCtrlPlace, oButton);
	    },

	    _paint: function () {
	        var oDiv = $(this.getPlaceId());
	        if (!$isNoU(oDiv)) {
	            this._sControlPlace = oDiv.id + '_div';
	            if (this._sLogo.length) {
	                oDiv.innerHTML =
	                [
	                    '<div id="' + this._sControlPlace + '" style="background: url(\'./img/ui/grp_panel/' + ((this._nAction !== 0) ? 'bg_tp_a.gif' : 'bg_tp.gif') + '\') no-repeat;">',
	                    '   <table width="100%" height="110" cellpadding="0" cellspacing="0" border="0">',
	                    '       <tr><td width="100%" height="100%" align="center"><img src="./img/ui_item/' + this._sLogo + '" /></td></tr>',
	                    '   </table>',
	                    '</div>'
	                ].join('');
	                if (this._nAction !== 0) {
	                    oDiv.style.position = "relative";
	                    oDiv.style.overflow = "visible";
	                    oDiv.innerHTML += '<div style="position: absolute; top: -9px; left: ' + ((146 - this._nAction * 23) / 2) + 'px; height: 22px; width: ' + (this._nAction * 23) + 'px; background: url(\'./img/ui/action/star1.gif\');"></div>';
	                }
	            }
	            else {
	                oDiv.innerHTML = [
			            '<div id="' + this._sControlPlace + '" style="background: url(\'./img/ui/grp_panel/bg_tp.gif\') no-repeat">',
		            	'<table width="100%" height="110" cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px;"><tr>',
		            	'<td width="100%" height="100%" align="center" valign="middle">', this._sName, '</td>',
		            	'</tr></table></div>'
                    ].join('');
	            }
	            var p = document.createElement("p");
	            p.innerHTML = this._sName;
	            oDiv.appendChild(p);
	            oDiv.onclick = null;
	            oDiv.childNodes[0].onclick = $delegate(this, this.click);
	        }
	    },

	    click: function () {
	        new CInnerShadow(this._sControlPlace, 9);
            // log start
	        _log('<c t="tp" i="' + this._sId + '"></c>');
            // log stop
	        var t = this;
	        setTimeout(function () {
	            t.notify("onClick", t._o);
	        }, 100);
	    }
	}
);

	CGroupButton = createClass
(
	CElementButton,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace, oButton) {
	        CGroupButton.base.ctor.call(this, oParent, sInstance, sCtrlPlace, oButton);
	    },

	    _paint: function () {
	        var placeId = this.getPlaceId(),
	            oDiv = $(placeId);
	        this._sControlPlace = placeId + '_div';
	        oDiv.innerHTML = [
	        	'<div id="' + this._sControlPlace + '" class="group-button logo-bs"><div style="background-image: url(\'./img/ui_item/', this._sLogo, '\')">',
	        		'<table><tr><td>', this._sName, '</td></tr></table>',
	        	'</div></div>'
                ].join('');

	        attachEventListener(this._sControlPlace, "click", $delegate(this, this.click));
	    },

	    click: function () {
	        new CInnerShadow(this._sControlPlace);
            // log start
	        _log('<c t="g" i="' + this._sId.substr(1) + '"></c>');
	        //log stop
	        var t = this;
	        setTimeout(function () {
	            t.notify("onClick", t._o);
	        }, 100);
	    }
    }
);


    CInnerShadow = createClass
(
	null,
	{
	    ctor: function (id, radius, short, type) {
	        this._oParam = getElementRect(id);
	        this._type = type || "click";
	        this._radius = radius || 18;
	        this._bShort = short || false;
	        this._o = { "width": 0, "height": 0, "left": 0, "top": 0, "opacity": (this._bShort) ? 40 : 35 };
	        var oShadow = document.createElement("div");
	        oShadow.id = id + "_shadow";
	        oShadow.style.position = "absolute";
	        oShadow.style.display = "none";
	        oShadow.style.width = this._oParam.width;
	        oShadow.style.height = this._oParam.height;
	        oShadow.style.top = this._oParam.top;
	        oShadow.style.left = this._oParam.left;
	        document.body.appendChild(oShadow);
	        this.createShadow(id + "_shadow");

	        oShadow.style.display = "block";

	        if (this._type == "click")
	            setTimeout(function () { destroy(oShadow) }, 150);
	    },

	    removeShadow: function () {
	        destroy(o);
	    },

	    createDiv: function (oShadow) {
	        var oDiv = document.createElement("div");
	        oShadow.appendChild(oDiv);
	        oDiv.style.overflow = "hidden";
	        oDiv.style.filter = "alpha(opacity=" + this._o.opacity + ")";
	        oDiv.style.background = "black";
	        oDiv.style.position = "absolute";
	        oDiv.style.width = this._o.width;
	        oDiv.style.height = this._o.height;
	        oDiv.style.top = this._o.top;
	        oDiv.style.left = this._o.left;
	    },

	    createShadow: function (sShadow) {
	        var j = 0,
                x = 0,
                y = 0,
                q = this._radius / 2,
                w = this._radius / 3,
                oShadow = $(sShadow);

	        for (var i = this._radius; i > 0; i--) {
	            x = this._radius - Math.sqrt(Math.abs((y - this._radius) * (y - this._radius) - (this._radius * this._radius)));
	            y++;
	            this._o.height = 1;
	            this._o.width = this._oParam.width - (x * 2);
	            this._o.top = j++;
	            this._o.left = x;
	            this._o.opacity--;

	            this.createDiv(oShadow);
	        }

	        if (this._bShort) {
	            while (this._o.opacity > 0) {
	                this._o.height = 5;
	                this._o.width = this._oParam.width;
	                this._o.top = j;
	                this._o.left = 0;
	                this._o.opacity--;
	                j += 5;

	                this.createDiv(oShadow);
	            }
	        }
	        else {
	            this._o.height = this._oParam.height - (this._radius * 2);
	            this._o.width = this._oParam.width;
	            this._o.top = j;
	            this._o.left = "0px";
	            this._o.opacity--;

	            this.createDiv(oShadow);

	            j = j + this._oParam.height - (this._radius * 2);
	            y = 0;

	            for (var k = 1; k <= this._radius; k++) {
	                x = this._radius - Math.sqrt(Math.abs((this._radius * this._radius) - (y * y)));
	                y++;
	                this._o.height = 1;
	                this._o.width = this._oParam.width - (x * 2);
	                this._o.top = j++;
	                this._o.left = x;
	                this._o.opacity++;

	                this.createDiv(oShadow);
	            }
	        }
	    }
	}
);

	CValueButton = createClass
(
	CButton,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace, sValue) {
	        CValueButton.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._sValue = sValue;
	    },

	    click: function () {
	        if (this._sValue == ' ' || this._sValue == '0') {
	            new CInnerShadow($(this._sControlPlace).children[0], 20, true);
	        }
	        else {
	            if (this._sValue == "HELP") {
	                new CInnerShadow($(this._sControlPlace).children[0], 11);
	            }
	            else {
	                new CInnerShadow($(this._sControlPlace).children[0], 20);
	            }
	        }
	        var t = this,
                eventArgs = {};
	        if (this._sValue == "BACKSPACE")
	            eventArgs.key = this._sValue;
	        else
	            eventArgs.value = this._sValue;
	        setTimeout(function () {
	            t.notify("onClick", eventArgs);
	        }, 100);
	    }
	}
);

	CImageButton = createClass
(
	CValueButton,
	{
	    ctor: function (oParent, sInstance, sCtrlPlace, sValue, sPic) {
	        CImageButton.base.ctor.call(this, oParent, sInstance, sCtrlPlace, sValue);
	        this.sPic = sPic;
	    },

	    _paint: function () {
	        var oDiv = $(this.getPlaceId());
	        if (!Object.isNullOrUndefined(oDiv)) {
	            oDiv.innerHTML = '<img id="' + this._sControlPlace + '_img" src="' + this.sPic + '" />';
	            attachEventListener(oDiv.firstChild.id, "click", $delegate(this, this.click));
	        }
	    }
	}
);

	CForm = createClass
(
	CComponent,
	{
	    ctor: function CForm$ctor(oParent, sInstance, sAction, sName, sMethod) {
	        CForm.base.ctor.call(this, oParent, sInstance);
	        this._sName = "ff";
	        this._sMethod = "post";
	        this._sAction = "";
	        this._oFields = {};
	        if (!$isNoU(sName) && sName.is(String)) {
	            this._sName = sName;
	        }
	        if (!$isNoU(sMethod) && sMethod.is(String) &&
	            (sMethod.toLowerCase() === "post" ||
	             sMethod.toLowerCase() === "get")) {
	            this._sMethod = sMethod;
	        }
	        if (!$isNoU(sAction) && sAction.is(String)) {
	            this._sAction = sAction;
	        }
	    },

	    _createHtmlForm: function CForm$_createHtmlForm() {
	        var oForm = $(this._sName);
	        if ($isNoU(oForm))
		        oForm = document.createElement("FORM");
	        var oInput = null;
	        oForm.id = oForm.name = this._sName;
	        oForm.target = '_top';
	        oForm.method = this._sMethod;
	        oForm.action = this._sAction;
	        for (var f in this._oFields) {
	            if (this._oFields.hasOwnProperty(f)) {
	                oInput = document.createElement("INPUT");
	                oInput.id = oInput.name = f;
	                oInput.type = "hidden";
	                oInput.value = this._oFields[f];
	                oForm.appendChild(oInput);
	            }
	        }
	        document.body.appendChild(oForm);
	        return oForm;
	    },

	    put: function CForm$put(sName, sValue) {
	        if ($isNoU(sValue) || !sValue.is(String)) {
	            sValue = "";
	        }
	        if (!$isNoU(sName) && sName.is(String) && sName !== "") {
	            this._oFields[sName] = sValue;
	        }
	    },

	    get: function CForm$get(sName) {
	        var sResult = this._oFields[sName];
	        if ($isNoU(sResult) || !sResult.is(String)) {
	            sResult = null;
	        }
	        return sResult;
	    },

	    submit: function CForm$submit(sAction) {
	        if (!$isNoU(sAction) && sAction.is(String)) {
	            this._sAction = sAction;
	        }
	        if (this._sAction === "") {
	            return;
	        }
	        var oForm = this._createHtmlForm();
	        if (oForm.action != "") {
	            oForm.submit();
	        }
	    }
	}
);

	CObj = createClass
(
	null,
	{
	    ctor: function (oParent) {
	        this._oParent = oParent;
	        this._aListeners = [];
	    },

	    attachListener: function (eventType, eventListener) {
	        if (!Function.validateParams(arguments, [
	                { name: "eventType", type: String },
	                { name: "eventListener", type: Function }
	            ])) {
	            return;
	        }

	        if (!this._aListeners[eventType]) {
	            this._aListeners[eventType] = new Array();
	        }
	        this._aListeners[eventType].push(eventListener);
	    },

	    notify: function (eventType, eventArgs) {
	        if (!Function.validateParams(arguments, [
	                    { name: "eventType", type: String },
	                    { name: "eventArgs", type: Object, canBeNull: true, canBeEmpty: true }
	                ])) return;

	        var listeners = this._aListeners[eventType];
	        if (!listeners || listeners._typeName !== "Array") return;

	        for (var i = 0, l = listeners.length; i < l; i++) {
	            if (Object.isNullOrUndefined(eventArgs)) eventArgs = {};

	            try {
	                listeners[i](this, eventArgs);
	            }
	            catch (e) {
	                al("Exception in " + this.getInstance() +
	                    ".notify(\"" + eventType + "\")\ndescription: " +
	                    e.description);
	            }
	        }
	    }
	}
);


	CMaratl = createClass
(
	CObj,
	{
	    ctor: function CForm$ctor() {
	        CMaratl.base.ctor.call(this);
	        this._oMData = {};
	    },

	    setData: function (sName, sValue) {
	        var val = (typeof sValue == "undefined") ? "true" : sValue;
	        try { Maratl.ProcessCommand(sName, val); return true; } catch (e) { return false; }
	    },

	    destructor: function () {
	        this.notify("onDestroy");
	    },

	    create: function () {
	        this.notify("onCreate");
	    },

	    getData: function (sName) {
	        if (typeof sName == "string" && sName.length) {
	            if (this._oMData.hasOwnProperty(sName)) {
	                return this._oMData["sName"];
	            }
	            else {
	                return null;
	            }
	        }
	    },

	    response: function (sName, sValue) {
	        this._oMData[sName] = sValue;
	        var eargs = { "name": sName, "value": sValue };
	        this.notify(sName, eargs);
	    }
	}
);

var iMaratl = newObject(CMaratl, null, '');

function getData(sName, sValue) {
    if (typeof sName == 'string' && sName == 'TermID') {
        bCom = true;
    }
	var name = sName || '',
        value = sValue || '';
	if (name.length) {
	    iMaratl.response(name, value);
	    oMaratlData[sName] = sValue;
	}
}

function connectionTest() {
    iMaratl.attachListener("TermID", function () { bCom = true; });
    iMaratl.setData("GetTermID");
}

attachEventListener(window, 'load', connectionTest);

function _log(sLog) {
    iMaratl.setData('WriteToLog', sLog);
}

var exitTo = null;

function to(delay) {
    exitTo = setTimeout(function () {
        _log('<et t="tt"></et>');
        _log('</p>');
        document.location = './index.html';
    }, parseInt(delay * 1000, 10));
}

function toStop() {
    clearTimeout(exitTo);
    exitTo = null;
}
