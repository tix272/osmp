CDate = createClass
(
	CControl,
	{
	    ctor: function(oParent, sInstance, sCtrlPlace, sDate) {
	        CDate.base.ctor.call(this, oParent, sInstance, sCtrlPlace);
	        this._aDate = sDate.split('.');
	        this._aDate[0] = parseInt(this._aDate[0], 10);
	        this._aDate[1] = parseInt(this._aDate[1], 10) - 1;
	        this._aDate[2] = parseInt(this._aDate[2], 10);
	        this._nCurrentMounth = this._aDate[1];
	        this._nCurrentYear = this._aDate[2];
	        this._aMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
	        this._aDay = ['6', '0', '1', '2', '3', '4', '5'];
	        this._aM = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	        this._aM[1] = (((this._aDate[2] - 2008) % 4) != 0) ? 28 : 29;
	    },

	    _paint: function() {
	        var oDiv = null,
	            s = '',
	            q = 0,
	            aList = [];
	        oDiv = document.createElement('div')
	        oDiv.id = 'transparent';
	        document.getElementsByTagName('body')[0].appendChild(oDiv);
	        oDiv = null;
	        oDiv = document.createElement('div')
	        oDiv.id = 'calendar';
	        document.getElementsByTagName('body')[0].appendChild(oDiv);
	        oDiv = null;
	        
            s = 
                '<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">' +
                '   <tr style="height: 13%;">' +
                '       <td>' +
                '           <table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">' +
                '               <tr style="height: 13%;">' +
                '                   <td id="date_left" style="width: 22%;"></td>' +
                '                   <td id="date_month" align="center" style="width: 56%; color: white; font-size: 52px;">' + this._aMonth[this._aDate[1]] + ' ' + this._aDate[2] + '</td>' +
                '                   <td id="date_right" style="width: 22%;"></td>' +
                '               </tr>' +
                '           </table>' +
                '       </td>' +
                '   </tr>' +
                '   <tr style="width: 100%; height: 72%;">' +
                '       <td align="center">' +
                '           <table cellpadding="0" cellspacing="0" border="0" width="89%" height="99%" style="margin-top: 5px;">';
                                for (var i = 0; i < 6; i++) {
                                   s += '<tr>';
                                   for (var j = 0; j < 7; j++)
                                       s += '<td align="center" valign="middle"><div  id="date_' + (q++) + '" style="width: 116px; height: 90px; font-size: 58px; padding-top: 10px;"></div></td>';
                                   s += '</tr>';
                                };
            s += 
                '           </table>' +
                '       </td>' +
                '   </tr>' +
                '   <tr style="width: 100%; height: 15%;">' +
                '       <td align="center">' +
                '           <div id="exit_btn" style="width: 270px; height: 108px; margin-top: 15px; margin-left: 20px;"></div>' +
                '       </td>' +
                '   </tr>' +
                '</table>';
            $("calendar").innerHTML = s;
            aList = this.getTableContent();
            for (q = 0; q < 42; q++) {
                $('date_' + q).innerHTML = aList[q];
                attachEventListener(('date_' + q), "click", $delegate(this, this.click));
            };
            attachEventListener("date_left", "click", $delegate(this, this.clickLeft));
            attachEventListener("date_right", "click", $delegate(this, this.clickRight));
            attachEventListener("exit_btn", "click", $delegate(this, this.exit));
	    },
	    
	    exit: function() {
	        discardElement($("calendar"));
	        discardElement($("transparent"));
	    },
	    
	    clickLeft: function() {
	        if ((this._aDate[1]) != 0) {
	            this._aDate[1] = this._aDate[1] - 1;
	        }
	        else {
	            this._aDate[2] = this._aDate[2] - 1;
	            this._aDate[1] = 11;
	            this._aM[1] = (((this._aDate[2] - 2008) % 4) != 0) ? 28 : 29;
	        }
	        this._refrash();
	    },
	    
	    clickRight: function() {
	        if ((this._aDate[1]) != 11) {
	            this._aDate[1] = this._aDate[1] + 1;
	        }
	        else {
	            this._aDate[2] = this._aDate[2] + 1;
	            this._aDate[1] = 0;
	            this._aM[1] = (((this._aDate[2] - 2008) % 4) != 0) ? 28 : 29;
	        }
	        this._refrash();
	    },
	    
	    _refrash: function() {
	        var aList = this.getTableContent();
	        for (var i = 0; i < 42; i++) {
                $("date_" + i).innerHTML = aList[i];
            }
            $("date_month").innerHTML = this._aMonth[this._aDate[1]] + ' ' + this._aDate[2];
	    },
	    
	    getTableContent: function() {
	        var o = new Date(this._aDate[2], this._aDate[1], 1),
	            aList = [],
	            nDay = this._aDay[o.getDay()],
	            nFutureMonth = (this._aDate[1] == 11) ? 0 : (this._aDate[1]+1),
	            nLastMonth = (this._aDate[1] == 0) ? 11 : (this._aDate[1]-1),
	            nOt = (((this._aDate[1] == 0) ? this._aM[11] : this._aM[this._aDate[1]-1]) - (7 - (7 - nDay))),
	            j = 1,
	            x = 1,
	            oEl = null;
	        for (var i = 0; i < 42; i++) {
	            oEl = $("date_" + i);
	            oEl.style.background = '';
	            if (i >= nDay && j <= this._aM[this._aDate[1]]) {
	                if (j == this._aDate[0] && this._nCurrentMounth == this._aDate[1] && this._nCurrentYear == this._aDate[2])
	                    oEl.style.background = '#cde7f8';
	                oEl.style.color = '#2268c6';
	                aList[i] = j++;
	                oEl.abbr = this._aDate[1] + '.' + this._aDate[2];
	            }
	            else {
	                var nYear = this._aDate[2];
	                if (i < nDay) {
	                    if (nLastMonth > this._aDate[1])
	                        nYear--;
	                    aList[i] = ++nOt;
	                    oEl.abbr = nLastMonth + '.' + nYear;
	                }
	                else {
	                    if (this._aDate[1] == 11)
	                        nYear++;
	                    aList[i] = x++;
	                    oEl.abbr = nFutureMonth + '.' + nYear;
	                }
	                oEl.style.color = '#e3e3e3';
	            }
	            oEl = null;
	        }
	        return aList;
	    },
	    
	    click: function(element) {
	        var eventArgs = {},
	            aTemp = element.srcElement.abbr.split('.');
	        eventArgs.day = element.srcElement.innerHTML;
	        eventArgs.month = aTemp[0];
	        eventArgs.year = aTemp[1];
	        this.notify("onClick", eventArgs);
	        this.exit();
	    }
	}
);