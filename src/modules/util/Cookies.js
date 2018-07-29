var Cookies = {

  set(name, value) {
    var argv = arguments;
    var argc = arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : '/';
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape(value) +
      ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
      ((path == null) ? "" : ("; path=" + path)) +
      ((domain == null) ? "" : ("; domain=" + domain)) +
      ((secure === true) ? "; secure" : "");
  },

  get(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    var j = 0;
    while (i < clen) {
      j = i + alen;
      if (document.cookie.substring(i, j) === arg)
        return window.Cookies.getCookieVal(j);
      i = document.cookie.indexOf(" ", i) + 1;
      if (i === 0)
        break;
    }
    return null;
  },

  clear(name) {
    if (Cookies.get(name)) {
      document.cookie = name + "=" +
        "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
  },

  getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr === -1) {
      endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
  },

  delAllCookie() {
    var data = document.cookie;
    var dataArray = data.split("; ");
    for (var i = 0; i < dataArray.length; i++) {
      var varName = dataArray[i].split("=");
      if (varName[0] !== "username") {
        this.set(varName[0], "")
      }
    }
  }
}

export default Cookies;