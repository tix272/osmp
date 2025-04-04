function marketData() {
    var aInfoPay = Object.deserialize(storage.get('payList_adv_counter'));
    if (aInfoPay != null && aInfoPay.length) {
        document.location = './market.html';
    }
}

marketData();