
(function ($) {

    //插件列表
    var pluginList = {
        flash: {
            activex: "ShockwaveFlash.ShockwaveFlash",
            plugin: /flash/gim
        },
        pdf: {
            activex: "PDF.PdfCtrl",
            plugin: /adobe\s?acrobat/gim
        },
        qtime: {
            activex: "QuickTime.QuickTime",
            plugin: /quicktime/gim
        },
        wmp: {
            activex: "WMPlayer.OCX",
            plugin: /(windows\smedia)|(Microsoft)/gim
        },
        rp: {
            activex: "RealPlayer",
            plugin: /realplayer/gim
        },
        java: {
            activex: navigator.javaEnabled(),
            plugin: /java/gim
        }
    };

    //是否支持
    var isSupport = function (p) {
        var r;
        if (window.ActiveXObject) {
            try {
                new ActiveXObject(pluginList[p].activex);
                r = true;
            } catch (e) {
                r = false;
            }
        } else {
            $.each(navigator.plugins, function () {
                if (this.name.match(pluginList[p].plugin)) {
                    r = true;
                    return false
                } else {
                    r = false;
                }
            });
        }
        return r;
    };

    //
    var _flashSupport = isSupport("flash");
    var _pdfSupport = isSupport("pdf");
    var _quickTimeSupport = isSupport("qtime");
    var _windowsMediaPlayerSupport = isSupport("wmp");
    var _realplayerSupport = isSupport("rp");
    var _javaSupport = isSupport("java");
    var _cookieEnabled = navigator.cookieEnabled;
    var _language = (navigator.language || navigator.userLanguage || navigator.systemLanguage).toLowerCase();
    var _ajaxSupport = $.support.ajax;
    var _opacitySupport = $.support.opacity;

    //
    $.uaplus = {
        flashSupport: _flashSupport,
        pdfSupport: _pdfSupport,
        quickTimeSupport: _quickTimeSupport,
        windowsMediaPlayerSupport: _windowsMediaPlayerSupport,
        realplayerSupport: _realplayerSupport,
        javaSupport: _javaSupport,
        cookieEnabled: _cookieEnabled,
        language: _language,
        ajaxSupport: _ajaxSupport,
        opacitySupport: _opacitySupport
    };

})(jQuery);
