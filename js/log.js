(function() {
    function log() {
        this.debug = false;
        //使用_htlog.track(uid, scene, action, label, value, nodeid)记录自定义事件
        this.source = "nmgsite";
        this.uid = window.HT_UID;//user id
        this.oid = window.HT_OID;//org id
        this.did = "";//
        this.keys = {
            objectKey:  "_htlog",//window._htlog引用
            didKey: "_htid",//cookie name
            cityKey: "_htci",// city key
            provKey: "_htpr", // province key
            countryKey: "_htco" // country key
        };

        this.didKength = 16;//id length
        this.autoLogView = true;//自动logview
        this.ua = window.navigator.userAgent;
        this.url = document.location.href;
        this.search = (document.location.search ? document.location.search.substr(1) : '');
        this.referrer = document.referrer;
        this.path = document.location.pathname;
        this.host = document.location.host;
    }

    function post(common, data) {
        try {
            if (!data) {
                return;
            }

            var params = [];
            for (var key in data) {
                params.push(key + "=" + encode(data[key]));
            }

            if (common.uid){
                params.push("uid=" + common.uid);
            }else {
                if (window.HT_UID){
                    params.push("uid=" + window.HT_UID);
                }
            }

            if(common.oid){
                params.push("oid=" + common.oid);
            }else {
                if(window.HT_OID){
                    params.push("oid=" + window.HT_OID);
                }
            }

            params.push("sid=" + common.source);
            params.push("did=" + common.did);
            params.push("city=" + encode(common.city));
            params.push("prov=" + encode(common.prov));
            params.push("country=" + encode(common.country));
            params.push("host=" + encode(common.host));
            params.push("path=" + encode(common.path));
            params.push("query=" + encode(common.search));
            params.push("ref=" + encode(common.referrer));
            params.push("_rand=" + Math.floor(2147483648 * Math.random()));
            (new Image).src = "https://stat.htres.cn/log?" + params.join("&")
        } catch (e) {
        }
    }

    function logCnzz(common, data) {
        if (typeof _czc != 'undefined' && data) {
            _czc.push(['_trackEvent', common.source, data.scene, data.action]);
        }
    }

    function encode(s) {
        return encodeURIComponent(s || '');
    }

    function decode(s) {
        return decodeURIComponent(s || '');
    }

    function setCookie(name, value, expireMins) {
        var e = document.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i);
        var d = new Date();
        d.setTime(d.getTime() + ((expireMins || 60 * 24) * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/;domain=" + (e?e[0]:"");
    }

    function getCookie(key) {
        var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return keyValue ? keyValue[2] : null;
    }

    function createDid(length) {
        var chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0'];
        var did=[];
        for(var i=0; i < length; i++) {
            did.push(chars[parseInt(Math.random() * chars.length)]);
        }

        return did.join('');
    }

    function logView() {
        var data = {scene:'normal', action: 'view'};
        post(_logItem, data);
    }

    function logError(type, e) {
        console.log(e);
    }

    function track(uid, scene, action, label, value, nodeid) {
        var data = {scene: scene, action: action, label: label, value: value, nodeid: nodeid};
        if (uid){
            _logItem.uid = uid;
        }
        post(_logItem, data);
        logCnzz(_logItem, data);
    }


    function attachDataPage() {
        var _id = document.domain + "__stat";
        if (document.getElementById(_id) === null) {
            var ifr = document.createElement('iframe');
            ifr.id = _id;
            ifr.src = 'https://stat.htres.cn/statdata.html';
            ifr.style.display = 'none';
            document.body.appendChild(ifr);
        }
    }

    function handlePost(e) {
        //set ip data
        setCookie(_logItem.keys.cityKey, encode(e.data.city || ''));
        setCookie(_logItem.keys.countryKey, encode(e.data.country || ''));
        setCookie(_logItem.keys.provKey, encode(e.data.province || ''));
    }

    function initGetIP() {
        if (!getCookie(_logItem.keys.cityKey) &&
            !getCookie(_logItem.keys.countryKey) &&
            !getCookie(_logItem.keys.provKey) ) {
            // add message listener and iframe
            if (window.addEventListener) {
                window.addEventListener('message', handlePost);
                window.addEventListener('load', attachDataPage, false);
            }
            else if (window.attachEvent) {
                window.attachEvent('message', handlePost );
                window.attachEvent('onload', attachDataPage );
            }
        }
    }

    var _logItem = {};
    try {
        _logItem = new log();
        window[_logItem.keys.objectKey] = _logItem;
        _logItem.did = getCookie(_logItem.keys.didKey);
        if(!_logItem.did) {
            _logItem.did = createDid(_logItem.didKength);
            setCookie(_logItem.keys.didKey, _logItem.did, 24 * 60 * 3650);
        }

        _logItem.city = decode(getCookie(_logItem.keys.cityKey));
        _logItem.prov = decode(getCookie(_logItem.keys.provKey));
        _logItem.country = decode(getCookie(_logItem.keys.countryKey));

        log.prototype.track = track;
        log.prototype.logView = logView;
        log.prototype.logError = logError;
        log.prototype.attachDataPage = attachDataPage;

        if(_logItem.autoLogView) {
            logView();
        }
    } catch (e) {
        logError("stat_error", e);
    }

    initGetIP();
})();
