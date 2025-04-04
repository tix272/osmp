var sLink = './bank.html';

function getId(id) {
    var sResult = '';
    switch (id) {
        case '95':
        case '96':
        case '97':
        case '99':
        case '100':
        case '101':
        case '102':
        case '104':
            sResult = 'bank';
            break;
        case '76':
        case '77':
        case '78':
        case '79':
        case '80':
        case '81':
        case '82':
        case '83':
        case '84':
        case '85':
        case '86':
        case '94':
            sResult = 'tr600';
            break;
    }
    return sResult;
}


function getBtn() {
    var sResult = 'tr900';
    var dDate = new Date();
    if (dDate.getMonth() == 9) {
        if (typeof region_hierarchy !== "undefined") {
            for (var i = region_hierarchy.length - 1; i >= 0; i--) {
                if ((getId(region_hierarchy[i]["id"])).length) {
                    sResult = getId(region_hierarchy[i]["id"]);
                    return sResult;
                }
            }
        }
    }
    else {
        sResult = 'bank';
    }
    return sResult;
}

function initBtn() {
    sValue = getBtn();
    switch (sValue) {
        case 'bank':
            $('advert_10').style.background = "url('./img/ui/index/btn_bank.png') no-repeat";
            break;
        case 'tr900':
            $('advert_10').style.background = "url('./adv/tricolor.gif') no-repeat";
            sLink = './adv/flash_1951_10102012/embed_flash_params.html';
            break;
        case 'tr600':
            $('advert_10').style.background = "url('./adv/tricolor.gif') no-repeat";
            sLink = './adv/flash_1949_10102012/embed_flash_params.html';
            break;
    }
}