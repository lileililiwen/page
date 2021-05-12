// JavaScript Document
$(document).ready(function () {

    $(".WrapHid").each(function () {
        checkFocus({
            obj_input: $(this),
            msgBox: $(this).siblings(".CentHid"),
            Tip: "CentHid"
        });
        clearInput({
            obj_input: $(this),
            msgBox: $(this).siblings("._CentHid"),
            Tip: "_CentHid"
        });
    });

    $(".ToolChoese").each(function () {
        _select({
            select: $(this).find(".SearChoese"),
            options: $(this).find("ul.SearChoese-show"),
            option: $(this).find("ul.SearChoese-show li a"),
            t: "slide", //鏁堟灉锛堝彲閫夊弬鏁帮級
            parents: $(".ToolChoese")//澶氫釜select鏃讹紝浼犲叆鐖剁骇锛堝彲閫夊弬鏁帮級
        });
    });



});


//SearchWrapHid-Cent
var checkFocus = function (options) {
    var thisCheck = options.obj_input; //褰撳墠input
    var msgBox = options.msgBox; //褰撳墠鎻愮ず鏍囩
    checkValue = thisCheck.val();
    var trime = options.trime !== undefined ? options.trime : 200;
    thisCheck.focus(function () {
        msgBox.fadeOut(trime);
    });
    thisCheck.blur(function () {
        if ($(this).val() == "") {
            if (msgBox.hasClass(options.Tip)) {
                msgBox.stop(true, true).fadeIn(trime);
            }
            return false;
        } else {
            msgBox.stop(true, true).fadeOut(trime);
            return true;
        }
    });
    msgBox.click(function () {
        thisCheck.mousedown();
        thisCheck.focus();
    });

    function init() {
//        if (!options.isselchk)
//            $(".publicSearch input[type='text']:first").focus().select();
        if (checkValue !== '') {
            msgBox.stop(true, true).fadeOut(trime);
        } else {
            msgBox.stop(true, true).fadeIn(trime);
        }
    }
    init();
};
var clearInput = function (options) {
    var thisCheck = options.obj_input; //褰撳墠input
    var msgBox = options.msgBox; //褰撳墠鎻愮ず鏍囩
    checkValue = thisCheck.val();
    var trime = options.trime !== undefined ? options.trime : 100;
    thisCheck.bind("blur keyup", function () {
        if ($(this).val() == "") {
            if (msgBox.hasClass(options.Tip)) {
                msgBox.stop(true, true).fadeOut(trime);
            }
        } else {
            msgBox.stop(true, true).fadeIn(trime);
        }
    });
    msgBox.click(function () {
        thisCheck.focus();
        msgBox.stop(true, true).fadeOut(trime);
        thisCheck.val("");
    });

    function init() {
        $("input[type='text']:first").focus().select();
        if (checkValue !== '') {
            msgBox.stop(true, true).fadeIn(trime);
        } else {
            msgBox.stop(true, true).fadeOut(trime);
        }
    }
    init();
};
var _select = function (settings) {
    settings.select.bind("selectstart", function () { return false; }); //绂佺敤閫変腑IE锛屽叾浠�-moz-user-select:none;
    settings.select.click(function (e) {
        if (settings.parents)
            if (settings.parents.length > 1) settings.parents.find("ul").not(settings.options).hide(); //濡傛灉鏈夊涓猻elect闅愯棌闈炲綋鍓嶇殑鎵€鏈夌浉鍏硊l
    e.stopPropagation();
    if (settings.options.is(":visible")) showType(0);
    else showType(1);
    if (settings.selectcallback) settings.selectcallback(this);
});
settings.option.click(function () {
    settings.select.text($(this).text());
    settings.select.next().val($(this).attr("val"));
    showType(0);
    if (settings.callback) settings.callback(this);
});
$(document).click(function () {
    if (settings.options.is(":visible")) showType(0);
});

function showType(flage) {
    switch (settings.t) {
        case "slide":
            if (flage) {
                settings.options.slideDown(50);
                settings.select.siblings("span").addClass("corUp");
            }
            else {
                settings.options.slideUp(50);
                settings.select.siblings("span").removeClass("corUp");
            }
            break;
        case "fade":
            if (flage) {
                settings.options.fadeIn(200);
                settings.select.siblings("span").addClass("corUp");
            }
            else {
                settings.options.fadeOut(200);
                settings.select.siblings("span").removeClass("corUp");
            }
            break;
        default:
            if (flage) {
                settings.options.show();
                settings.select.siblings("span").addClass("corUp");
            }
            else {
                settings.options.hide();
                settings.select.siblings("span").removeClass("corUp");
            }
            break;
    }
}
};

function getid(id) {
    return (typeof id == 'string') ? document.getElementById(id) : id
};

var tools = {
	    clear: function (array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i]) {
                array[i].value = '';
                $(array[i]).siblings("b").show();
            }
        }
    },
    encryptDecode: {
        
        textEncrypt: function () {
            $("#encrypt").click(function () {
                var v = jQuery('input[name="encrypt_type"]').val();
                if (!v) return;
                switch (v) {
                    case "aes":
                        jQuery("#result").val(CryptoJS.AES.encrypt(jQuery("#content").val(), jQuery("#pwd").val()));
                        break;
                    case "des":
                        jQuery("#result").val(CryptoJS.DES.encrypt(jQuery("#content").val(), jQuery("#pwd").val()));
                        break;
                    case "rabbit":
                        jQuery("#result").val(CryptoJS.Rabbit.encrypt(jQuery("#content").val(), jQuery("#pwd").val()));
                        break;
                    case "rc4":
                        jQuery("#result").val(CryptoJS.RC4.encrypt(jQuery("#content").val(), jQuery("#pwd").val()));
                        break;
                    case "tripledes":
                        jQuery("#result").val(CryptoJS.TripleDES.encrypt(jQuery("#content").val(), jQuery("#pwd").val()));
                        break;
                }
                if (jQuery("#result").val()) $("#result").siblings().hide();
            });
            $("#decrypt").click(function () {
                switch (jQuery('input[name="encrypt_type"]').val()) {
                    case "aes":
                        jQuery("#content").val(CryptoJS.AES.decrypt(jQuery("#result").val(), jQuery("#pwd").val()).toString(CryptoJS.enc.Utf8));
                        break;
                    case "des":
                        jQuery("#content").val(CryptoJS.DES.decrypt(jQuery("#result").val(), jQuery("#pwd").val()).toString(CryptoJS.enc.Utf8));
                        break;
                    case "rabbit":
                        jQuery("#content").val(CryptoJS.Rabbit.decrypt(jQuery("#result").val(), jQuery("#pwd").val()).toString(CryptoJS.enc.Utf8));
                        break;
                    case "rc4":
                        jQuery("#content").val(CryptoJS.RC4.decrypt(jQuery("#result").val(), jQuery("#pwd").val()).toString(CryptoJS.enc.Utf8));
                        break;
                    case "tripledes":
                        jQuery("#content").val(CryptoJS.TripleDES.decrypt(jQuery("#result").val(), jQuery("#pwd").val()).toString(CryptoJS.enc.Utf8));
                        break;
                }
                if (jQuery("#content").val()) $("#content").siblings().hide();
            });
            $("#clear").click(function () {
                tools.clear([getid("content"), getid("result")]);
                $(".CentHid").show();
            });
        },
        
        
        
    },
}
var ted = tools.encryptDecode;