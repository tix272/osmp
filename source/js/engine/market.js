function postMarketPay() {
    var aInfoPay = Object.deserialize(storage.get('payList_adv_counter'));
    if (aInfoPay != null && aInfoPay.length) {
        var oPay = aInfoPay.pop();
        var oInput = null;
        var oForm = $('ff');
        for (var f in oPay) {
            if (oPay[f]["_typeName"] == "String" && f != "_typeName") {
                oInput = document.createElement('input');
                oInput.type = 'hidden';
                oInput.id = '_extra_MGT_' + f;
                oInput.name = '_extra_MGT_' + f;
                oInput.value = oPay[f];
                oForm.appendChild(oInput);
            }
        }

        if (aInfoPay.length) {
            storage.put('payList_adv_counter', aInfoPay.serialize());
        }
        else {
            storage.remove('payList_adv_counter');
            oForm.action = './index.html';
            $('_extra_result_int_page').value = 'index.html';
        }

        oForm.submit();
    }
    else {
        document.location = './index.html';
    }
}