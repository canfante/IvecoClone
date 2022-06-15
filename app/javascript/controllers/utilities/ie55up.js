function $_global_ie55up() {
    StrNewNamespace = "http://schemas.microsoft.com/WebPart/v2";
    StateService = new StateServiceDef;
    WPSC = new WPSCDef;
    MSOWPSC_SavePerformed = false;
    MSOLayout_inDesignMode = false;
    MSOLayout_currentDragMode = "";
    MSOLayout_zoneDragOver = null;
    MSOLayout_cellToDrop = 0;
    MSOLayout_oDropLocation = undefined;
    MSOLayout_iBar = document.createElement != null ? document.createElement("div") : null;
    MSOLayout_horzZoneIBar = undefined;
    MSOLayout_vertZoneIBar = undefined;
    MSOLayout_horzBodyZoneIBar = undefined;
    MSOLayout_vertBodyZoneIBar = undefined;
    MSOLayout_moveObject = undefined;
    MSOLayout_maintainOriginalZone = 0;
    MSOLayout_topObject = document.body;
    MSOLayout_galleryView = false;
    MSOLayout_unsavedChanges = [];
    MSOLayout_FormSubmit = null;
    MSOLayout_FormSubmitHref = null;
    MenuWebPartID = null;
    MenuWebPart = null;
    MSOConn_SourceWpNode = null;
    MSOConn_TargetWpNode = null;
    MSOConn_XformInfo1 = null;
    MSOConn_XformInfo2 = null;
    MSOConn_AspXformInfo = null;
    MSOConn_ConnCancelled = false;
    MSOConn_MultipleTargetGroups = false;
    MSOConn_TargetGroupNode = null;
    MSOConn_SourceGroupNode = null;
    MSOConn_BackButtonClicked = false;
    MSOTlPn_prevBuilder = null;
    MSOTlPn_prevWidth = 0;
    MSOTlPn_prevHeight = 0;
    MSOTlPn_shownViewChangeWarning = false;
    MSOWebPartPage_hideNextBeforeUnload = false;
    MSOWebPartPage_partDeleted = "";
    MSOChangeInToolPaneWidth = 120;
    browserScript = {
        MSOLayout_ChangeLayoutMode: _MSOLayout_ChangeLayoutMode,
        MSOWebPartPage_OpenMenu: MSOWebPartPage_OpenMenu,
        MSOLayout_ToggleView: MSOLayout_ToggleView,
        MSOMenu_KeyboardClick: MSOMenu_KeyboardClick,
        MSOTlPn_ShowToolPane2Wrapper: MSOTlPn_ShowToolPane2Wrapper,
        MSOWebPartPage_SetupFixedWidthWebParts: MSOWebPartPage_SetupFixedWidthWebParts
    };
    typeof Sys != "undefined" && Sys != null && typeof Sys.Application != "undefined" && Sys.Application != null && typeof Sys.Application.notifyScriptLoaded == "function" && Sys.Application.notifyScriptLoaded();
    typeof NotifyScriptLoadedAndExecuteWaitingJobs == "function" && NotifyScriptLoadedAndExecuteWaitingJobs("ie55up.js")
}

function ULSfXY() {
    var a = {};
    a.ULSTeamName = "Microsoft SharePoint Foundation";
    a.ULSFileName = "ie55up.commentedjs";
    return a
}
var StrNewNamespace;

function SplitIndex(a) {
    a:;
    var d = "",
        c = "",
        b = a.lastIndexOf("#");
    if (-1 == b) b = a.lastIndexOf(":");
    if (-1 == b) c = a;
    else {
        c = a.substring(b + 1, a.length);
        d = a.substring(0, b)
    }
    var e = {
        PropURN: d,
        PropName: c
    };
    return e
}

function String2XML(c) {
    a:;
    var a = "",
        b = /&/g;a = c.replace(b, "&amp;");b = /</g;a = a.replace(b, "&lt;");b = />/g;a = a.replace(b, "&gt;");b = /"/g;a = a.replace(b, "&quot;");b = /'/g;a = a.replace(b, "&apos;");
    return a
}

function URL2Unicode(a) {
    a:;
    return Utf8ToUnicode(unescape(a))
}

function Unicode2URL(a) {
    a:;
    return URLEncode(a)
}

function URLEncode(e) {
    a:;
    var f = " <>\"#%{}|^~[]`'&?+=",
        a = "",
        d, b, c;e += "";
    for (d = 0; d < e.length; d++) {
        b = e.charAt(d);
        c = b.charCodeAt(0);
        if (c <= parseInt(127))
            if (f.indexOf(b) != -1) a += "%" + c.toString(16).toUpperCase();
            else a += b;
        else a += GetUTFCode(c)
    }
    return a
}

function GetUTFCode(a) {
    a:;
    var f = 11,
        d = 2,
        e = "",
        c = 192,
        b;
    while (a >= 1 << f) {
        c = c >> 1;
        f += 5;
        d++
    }
    for (b = 0; b < d; b++) {
        var g = 128 | a & 63;
        a = a >>> 6;
        if (b == d - 1) g |= c;
        e = "%" + g.toString(16).toUpperCase() + e
    }
    return e
}

function Utf8ToUnicode(d) {
    a:;
    if (d == null) return "";
    var f = "",
        h = d.length,
        a = 0,
        b = h,
        i = 0,
        c, e, g;
    while (a < h) {
        c = d.charCodeAt(a);
        if ((c & 128) == 0) {
            if (b < 1) break;
            f += String.fromCharCode(c & 127);
            a++;
            b -= 1
        } else if ((c & 224) == 192) {
            e = d.charCodeAt(a + 1);
            if (b < 2 || (e & 192) != 128) break;
            f += String.fromCharCode((c & 63) << 6 | e & 63);
            a += 2;
            b -= 2
        } else if ((c & 240) == 224) {
            e = d.charCodeAt(a + 1);
            g = d.charCodeAt(a + 2);
            if (b < 3 || (e & 192) != 128 || (g & 192) != 128) break;
            f += String.fromCharCode((c & 15) << 12 | (e & 63) << 6 | g & 63);
            a += 3;
            b -= 3
        } else break
    }
    if (0 != b) f = "";
    return f
}

function SPSoapRequestBuilder(d) {
    a:;
    var a = {};

    function c(c, b) {
        a:;
        var a = this.parameterNameList.length;this.parameterNameList[a] = c;this.parameterValueList[a] = b
    }

    function b(b) {
        a:;
        var e = this.functionName,
            d = this.parameterNameList,
            c = this.parameterValueList;b.setRequestHeader("Content-Type", "text/xml; charset=utf-8");b.setRequestHeader("SOAPAction", "http://microsoft.com/sharepoint/webpartpages/" + e);
        for (var f = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><' + e + ' xmlns="http://microsoft.com/sharepoint/webpartpages">', a = 0; a < d.length; a++) {
            var g = typeof c[a] == "string" ? String2XML(c[a]) : c[a];
            f += "<" + d[a] + ">" + g + "</" + d[a] + ">"
        }
        f += "</" + e + "></soap:Body></soap:Envelope>";b.send(f);
        return b
    }
    a.functionName = d;a.parameterNameList = [];a.parameterValueList = [];a.AddParameter = c;a.SendSOAPMessage = b;
    return a
}

function Collection() {
    a:;

    function g(b) {
        a:;
        var c = null;
        if (b != null) {
            var a = parseInt(b);
            if (!isNaN(a) && a >= 0 && a < this.length) c = this[a]
        }
        return c
    }

    function f(c) {
        a:;
        for (var b = null, a = 0; a < this.length; a++)
            if (this[a] == c) {
                b = this[a];
                break
            } return b
    }

    function c(d, c) {
        a:;
        for (var b = null, a = 0; a < this.length; a++)
            if (this[a].Name == d && this[a].Qualifier == c) {
                b = this[a];
                break
            } return b
    }

    function h(b) {
        a:;
        var a = this.length;this[a] = b;
        return this[a]
    }

    function d(c) {
        a:;
        var a, b = parseInt(c);
        if (isFinite(b) && b >= 0 && b < this.length) {
            for (a = b; a < this.length - 1; a++) this[a] = this[a + 1];
            this.length--
        }
    }

    function b(b) {
        a:;
        for (var a = 0; a < this.length; a++)
            if (this[a] == b) {
                this.Remove(a);
                break
            }
    }

    function e() {
        a:;
        return this.length
    }
    var a = Array();a.Item = g;a.Count = e;a.Add = h;a.Remove = d;a.Find = f;a.FindByName = c;a.RemoveObject = b;
    return a
}

function PartDef(b, d, e) {
    a:;

    function a(a) {
        a:;
        var b = a.NamespaceURN.toLowerCase() != StrNewNamespace.toLowerCase();
        return currentXML = "<" + a.SchemaElement + (b ? " xmlns='" + String2XML(a.NamespaceURN) + "'" : " ") + ">" + String2XML(a.Value.toString()) + "</" + a.SchemaElement + ">"
    }

    function f(async, callBack) {
        a:;
        if (!this.Properties.PropertiesLoaded) return;
        var partXml = null;
        if (this.Properties.IsWebPartFile) {
            var xmlDoc = this.Properties.ResponseXML;
            if (null != xmlDoc) {
                var propertiesElement = xmlDoc.selectSingleNode("webParts/webPart/data/properties");
                if (null != propertiesElement) {
                    var properties = propertiesElement.selectNodes("property");
                    if (null != properties) {
                        var index = properties.length;
                        while (index > 0) {
                            --index;
                            propertiesElement.removeChild(properties[index])
                        }
                    }
                    for (var index = 0; index < this.Properties.length; index++) {
                        var propNode = this.Properties[index],
                            xmlAttribute, propertyElement = xmlDoc.createElement("property");
                        xmlAttribute = xmlDoc.createAttribute("name");
                        xmlAttribute.value = String2XML(propNode.SchemaElement);
                        propertyElement.setAttributeNode(xmlAttribute);
                        if (null != propNode.Type) {
                            xmlAttribute = xmlDoc.createAttribute("type");
                            xmlAttribute.value = String2XML(propNode.Type);
                            propertyElement.setAttributeNode(xmlAttribute)
                        }
                        xmlAttribute = xmlDoc.createAttribute("xmlns");
                        xmlAttribute.value = "http://schemas.microsoft.com/WebPart/v3";
                        propertyElement.setAttributeNode(xmlAttribute);
                        propertyElement.text = String2XML(propNode.Value.toString());
                        propertiesElement.appendChild(propertyElement)
                    }
                }
                partXml = xmlDoc.xml
            }
        } else {
            partXml = "<WebPart xmlns= '" + StrNewNamespace + "'>" + a(this.Properties.AssemblyInfo) + a(this.Properties.TypeNameInfo);
            for (var index = 0; index < this.Properties.length; index++) partXml += a(this.Properties[index]);
            partXml += "</WebPart>"
        }
        var wpxml = document.getElementById("wpxml");
        if (wpxml == null) try {
            var varPart = eval("varPart" + this.WebPartQualifier),
                xmlhttp = GetXMLHttpRequestObject();
            this.xmlhttp = xmlhttp;
            varPart.callBackUsed = false;
            var postDataUrl = GetUrlFromWebUrlAndWebRelativeUrl(WPSC.WebPartPage.WebServerRelativeURL, "_vti_bin/WebPartPages.asmx");
            xmlhttp.open("POST", postDataUrl, async !=true ? false : true);
            if (callBack != null) {
                this.callBackFunction = callBack;
                xmlhttp.onreadystatechange = new Function("varPart" + this.WebPartQualifier + ".SaveHandler()")
            }
            var soapBuilder = SPSoapRequestBuilder("SaveWebPart2");
            soapBuilder.AddParameter("pageUrl", document.location.href);
            soapBuilder.AddParameter("storageKey", this.StorageKey);
            soapBuilder.AddParameter("webPartXml", partXml);
            soapBuilder.AddParameter("storage", "None");
            soapBuilder.AddParameter("allowTypeChange", "false");
            soapBuilder.SendSOAPMessage(xmlhttp)
        } catch (exception) {
            var varPart = eval("varPart" + this.WebPartQualifier);
            if (callBack != null && varPart.callBackUsed != true) {
                callBack(false, "");
                varPart.callBackUsed = true
            }
        } else {
            wpxml.value = partXml;
            callBack != null && callBack(true, "", 200)
        }
    }

    function c() {
        a:;
        var varPart = eval("varPart" + this.WebPartQualifier);
        if (this.xmlhttp.readyState == 4 && this.callBackFunction != null && varPart.callBackUsed != true) {
            var saveSucceeded = this.xmlhttp.responseXML.getElementsByTagName("SaveWebPart2Response")[0] != null,
                soapStatus = this.xmlhttp.status,
                soapExceptionText = "";
            if (!saveSucceeded) {
                var soapException = this.xmlhttp.responseXML.getElementsByTagName("soap:Fault")[0];
                if (soapException != null) {
                    var soapExceptionTextXml = soapException.getElementsByTagName("detail")[0];
                    if (soapExceptionTextXml != null) soapExceptionText = soapExceptionTextXml.text
                }
            }
            varPart.callBackUsed = true;
            this.callBackFunction(saveSucceeded, soapExceptionText, soapStatus)
        }
    }
    this.SaveHandler = c;this.DOMObject = e;this.WebPartQualifier = b;this.StorageKey = d;this.Properties = new PropColDef;this.Properties.Owner = this;this.Save = f
}

function PropertyDef(d, b, a, c) {
    a:;this.OriginalValue = a;this.NamespaceURN = d;this.SchemaElement = b;this.Value = a;this.Type = c
}

function PropColDef() {
    a:;
    var a = new Collection;

    function c(w) {
        a:;
        var b = [];
        try {
            var m = document.getElementById("wpxml"),
                a = GetXMLHttpRequestObject();
            if (a == null) return;
            var u = GetUrlFromWebUrlAndWebRelativeUrl(WPSC.WebPartPage.WebServerRelativeURL, "_vti_bin/WebPartPages.asmx");
            a.open("POST", u, false);
            var d = SPSoapRequestBuilder("GetWebPart2");
            d.AddParameter("pageurl", document.location.href);
            d.AddParameter("storageKey", w);
            d.AddParameter("storage", "None");
            d.AddParameter("behavior", "Version3");
            d.SendSOAPMessage(a);
            if (m != null && m.value.length > 0) a.responseXML.loadXML(m.value);
            else a.responseXML.loadXML(a.responseXML.text);
            var h = null,
                k = false,
                f = null,
                i = false,
                g = a.responseXML.getElementsByTagName("WebPart");
            if (null != g && g.length > 0) {
                h = g[0];
                if (h.namespaceURI == "http://schemas.microsoft.com/WebPart/v2") k = true
            }
            if (false == k) {
                var e = a.responseXML.getElementsByTagName("webPart");
                if (null != e && e.length > 0) {
                    f = e[0];
                    if (f.namespaceURI == "http://schemas.microsoft.com/WebPart/v3") i = true
                }
            }
            b.IsWebPartFile = i;
            if (i) {
                var p = f.selectSingleNode("data/properties");
                if (null != p) {
                    var j = p.selectNodes("property");
                    if (null != j)
                        for (var c = 0; c < j.length; c++) {
                            var l = j[c],
                                t = l.getAttributeNode("name").value,
                                o = null,
                                r = l.getAttributeNode("type");
                            if (null != r) o = r.value;
                            var v = l.nodeTypedValue,
                                s = new PropertyDef("", t, v, o);
                            b[b.length] = s
                        }
                }
                b.ResponseXML = a.responseXML
            } else if (k)
                for (var q = h.childNodes, c = 0; c < q.length; c++) {
                    var n = q.item(c),
                        s = new PropertyDef(n.namespaceURI, n.baseName, n.nodeTypedValue, null);
                    b[b.length] = s
                } else alert(Strings.STS.L_GetPropertiesFailure_ERR)
        } catch (y) {
            alert(Strings.STS.L_GetPropertiesFailure_ERR)
        }
        return b
    }

    function d(b) {
        a:;
        var e = -1,
            c = null;
        if (isNaN(b))
            for (var g = SplitIndex(b), l = g.PropURN, k = g.PropName, d = 0; d < a.Count(); d++) {
                var f = a[d],
                    i = new String(f.NamespaceURN),
                    j = f.SchemaElement.toLowerCase() == k.toLowerCase(),
                    h = i.toLowerCase() == l.toLowerCase();
                if (j && h) {
                    e = d;
                    c = f;
                    break
                }
            } else if (b < 0 || b >= a.Count()) {
            e = -1;
            c = null
        } else {
            e = b;
            c = a[b]
        } return c
    }

    function g(b) {
        a:;
        var a = null;
        if (b != null) {
            !this.PropertiesLoaded && this.LoadProperties();
            a = d(b)
        }
        return a
    }

    function f(a, d) {
        a:;this.Owner = d;this.IsWebPartFile = a.IsWebPartFile;this.ResponseXML = a.ResponseXML;
        for (var c = 0; c < a.length; c++) {
            var b = a[c];
            if (b.SchemaElement == "Assembly" && !a.IsWebPartFile) this.AssemblyInfo = b;
            else if (b.SchemaElement == "TypeName" && !a.IsWebPartFile) this.TypeNameInfo = b;
            else this[this.length] = b
        }
    }

    function e() {
        a:;!this.PropertiesLoaded && this.LoadProperties();
        return this.length
    }

    function b() {
        a:;this.Init(c(this.Owner.StorageKey, false), this.Owner);this.PropertiesLoaded = true
    }
    a.Owner = null;a.Item = g;a.Init = f;a.Count = e;a.LoadProperties = b;a.PropertiesLoaded = false;a.AssemblyInfo = null;a.TypeNameInfo = null;a.IsWebPartFile = false;a.ResponseXML = null;
    return a
}

function PartColDef() {
    a:;
    var a = new Collection;

    function b(b) {
        a:;
        var c = -1;
        if (isNaN(b)) {
            for (var d = 0; d < a.Count(); d++)
                if (a.Item(d).WebPartQualifier == b) {
                    c = d;
                    break
                }
        } else if (b < 0 || b >= a.Count()) c = -1;
        else c = b;
        return c
    }

    function e(d) {
        a:;
        var e = null;
        if (d != null) {
            var c = b(d);
            if (c >= 0) e = a.Item(c)
        }
        return e
    }

    function d(d, f, g) {
        a:;
        var c, e = b(d);
        if (e >= 0) c = a.Item(e);
        else {
            c = new PartDef(d, f, g);
            a.Add(c);
            this.Count = a.Count()
        }
        return c
    }

    function c(c) {
        a:;a.Remove(b(c));this.Count = a.Count()
    }
    this.Item = e;this.Register = d;this.UnRegister = c;this.Count = a.Count()
}

function WebPartPageDef(a) {
    a:;this.Parts = new PartColDef;this.DOMObject = a;this.Properties = new PropColDef
}

function EventDef(e) {
    a:;
    var a = new Collection;

    function b(b) {
        a:;
        return a.Find(b)
    }

    function d(b) {
        a:;
        return a.Add(b)
    }

    function c(b) {
        a:;a.RemoveObject(b)
    }

    function f(c) {
        a:;
        for (var b = 0; b < a.Count(); b++) a.Item(b)(c)
    }
    this.Name = e;this.FindEventHandler = b;this.AddHandler = d;this.RemoveHandler = c;this.Raise = f
}

function NotificationServiceDef() {
    a:;
    var a = new Collection;

    function c(b, a) {
        a:;
        switch (b) {
            case "onafterprint":
            case "onbeforeprint":
            case "onbeforeunload":
            case "onblur":
            case "onclose":
            case "onload":
            case "onresize":
            case "onfocus":
                AttachEvent("focus", a, window);
                break;
            case "onclick":
            case "onhelp":
                AttachEvent("help", a, window.document)
        }
    }

    function b(b, a) {
        a:;
        switch (b) {
            case "onafterprint":
            case "onbeforeprint":
            case "onbeforeunload":
            case "onblur":
            case "onclose":
            case "onload":
            case "onresize":
            case "onfocus":
                DetachEvent("focus", a, window);
                break;
            case "onclick":
            case "onhelp":
                DetachEvent("help", a, window.document)
        }
    }

    function f(d, b, e) {
        a:;
        var b, c;c = d + "::" + b;b = a.FindByName(c);null != b && b.Raise(e)
    }

    function e(f, h, d, g) {
        a:;
        var b, e;e = f + "::" + h;b = a.FindByName(e, g);
        if (b == null) {
            b = new EventDef(e);
            b.Qualifier = g;
            a.Add(b)
        }
        if (b.FindEventHandler(d) == null) {
            f == "urn:schemas-microsoft-com:dhtml" && c(h, d);
            b.AddHandler(d)
        }
    }

    function d(f, g, d, h) {
        a:;
        var c, e;e = f + "::" + g;c = a.FindByName(e, h);
        if (c != null && c.FindEventHandler(d) != null) {
            f == "urn:schemas-microsoft-com:dhtml" && b(g, d);
            c.RemoveHandler(d)
        }
    }
    this.RegisterForEvent = e;this.RaiseEvent = f;this.UnRegisterForEvent = d
}

function MessageDef(a) {
    a:;this.Name = a;this.Value = ""
}

function StateServiceDef() {
    a:;
    var a = [];

    function e() {
        a:;
        var b = false;
        if (window.event) {
            var a = event.srcElement;
            while (a != null && a.tagName != "A" && a.tagName != "BODY") a = a.parentNode;
            if (a != null && a.tagName == "A") {
                var c = a.href.toLowerCase();
                b = c.indexOf("javascript:") == 0 || c.indexOf("vbscript:") == 0
            }
        }
        return b
    }

    function d() {
        a:;
        if (typeof MSOWebPartPage_hideNextBeforeUnload == "undefined") return;
        if (!MSOWebPartPage_hideNextBeforeUnload) {
            try {
                WPSCinpreview == true
            } catch (a) {
                WPSC.RaiseEvent("urn:schemas-microsoft-com:dhtml", "onunload", null)
            }
            b()
        }
        MSOWebPartPage_hideNextBeforeUnload = false
    }

    function b() {
        a:;
        if (MSOWPSC_SavePerformed == false && a.length > 0) {
            for (var c = false, b = 0; b < a.length; b++) {
                a[b].Dirty = a[b].IsDirtyCallbackFunction(a[b].Param);
                c = c || a[b].Dirty
            }
            if (c == true && window.confirm(Strings.STS.L_SaveDirtyParts_TXT))
                for (b = 0; b < a.length; b++)
                    if (a[b].Dirty == true) {
                        a[b].SaveCallbackFunction(a[b].Param);
                        a[b].Dirty = false
                    }
        }
        if (window.event && typeof event.returnValue == "undefined") MSOWPSC_SavePerformed = true
    }

    function c(b, c, e) {
        a:;
        var d = new CallbackParamDef(b, c, e);a[a.length++] = d
    }
    this.BeforeUnloading = d;this.IsScriptHREF = e;this.RegisterForPromptedSave = c;this.ProcessDirtyParts = b
}

function CallbackParamDef(a, b, c) {
    a:;this.IsDirtyCallbackFunction = a;this.SaveCallbackFunction = b;this.Param = c;this.Dirty = false
}

function WPSCDef() {
    a:;
    var j, b = new NotificationServiceDef;

    function c(connectedParts, isInit) {
        a:;
        for (var interfaceObject, i = 0; i < connectedParts.length; i++) {
            interfaceObject = eval(connectedParts[i]);
            if (interfaceObject != null)
                if (isInit) try {
                    interfaceObject.PartCommunicationInit(WPSC)
                } catch (e) {} else try {
                    interfaceObject.PartCommunicationMain()
                } catch (e) {}
        }
    }

    function f(b) {
        var a = new ActiveXObject("Microsoft.XMLDOM");
        a.async = false;
        if (null != b && typeof a.loadXML != "undefined") {
            a.loadXML(b.outerHTML);
            if (typeof a.documentElement != "undefined" && a.documentElement != null) b = a.documentElement
        }
        return b
    }

    function i() {
        a:;
        var b;
        if (MSOConnections == null) return;
        var k = f(MSOConnections);b = SelectNodes(k, XPathForBrowser("Connections/Connection"));
        if (b == null) return;
        for (var a = [], j = false, i = false, e = null, d = null, g = 0; g < b.length; g++) {
            e = SelectSingleNode(b.item(g), XPathForBrowser("@ProviderObject"));
            d = SelectSingleNode(b.item(g), XPathForBrowser("@ConsumerObject"));
            j = false;
            i = false;
            if (e != null && d != null) {
                for (var h = 0; h < a.length; h++) {
                    if (a[h] == e.text) j = true;
                    if (a[h] == d.text) i = true
                }
                if (!j) a[a.length] = e.text;
                if (!i) a[a.length] = d.text
            }
        }
        c(a, true);c(a, false)
    }

    function g(InterfaceName, EventName, EventArgsNames, EventArgsValues) {
        a:;
        var eventArgs = {},
            tempNames = d(EventArgsNames),
            tempValues = d(EventArgsValues);
        if (tempNames.length == tempValues.length) {
            for (var i = 0; i < tempNames.length; i++) eval("eventArgs." + tempNames[i] + " = ConvertVBArrayIfNecessary(tempValues[i])");
            e(InterfaceName, EventName, eventArgs)
        }
    }

    function d(a) {
        a:;
        try {
            var b = new VBArray(a);
            return b.toArray()
        } catch (c) {
            return a
        }
    }

    function e(InterfaceName, EventName, EventParams) {
        a:;
        var fProvider = false,
            xmlNodes, xmlSourceRef, xmlTargetRef, strEval, connectionXml = f(MSOConnections),
            providerIntNameXPath = XPathForBrowser("Connections/Connection[@ProviderIntName = '{0}']"),
            consumerIntIntNameXPath = XPathForBrowser("Connections/Connection[@ConsumerIntName ='{0}']");providerIntNameXPath = providerIntNameXPath.replace(/\{0\}/g, InterfaceName);consumerIntIntNameXPath = consumerIntIntNameXPath.replace(/\{0\}/g, InterfaceName);
        if (SelectSingleNode(connectionXml, providerIntNameXPath)) fProvider = true;
        if (fProvider) xmlNodes = SelectNodes(connectionXml, providerIntNameXPath);
        else xmlNodes = SelectNodes(connectionXml, consumerIntIntNameXPath);
        if (xmlNodes != null)
            for (var i = 0; i < xmlNodes.length; i++) {
                if (fProvider) {
                    xmlSourceRef = SelectSingleNode(xmlNodes.item(i), XPathForBrowser("@ProviderObject"));
                    xmlTargetRef = SelectSingleNode(xmlNodes.item(i), XPathForBrowser("@ConsumerObject"))
                } else {
                    xmlSourceRef = SelectSingleNode(xmlNodes.item(i), XPathForBrowser("@ConsumerObject"));
                    xmlTargetRef = SelectSingleNode(xmlNodes.item(i), XPathForBrowser("@ProviderObject"))
                }
                if (xmlSourceRef != null && xmlTargetRef != null) {
                    strEval = xmlTargetRef.text;
                    strEval += "." + EventName;
                    strEval += "(" + xmlSourceRef.text + ", EventParams)";
                    eval(strEval)
                }
            }
    }

    function h(a, b, c) {
        a:;StateService.RegisterForPromptedSave(a, b, c)
    }

    function r(a) {
        a:;AttachEvent("beforeunload", StateService.BeforeUnloading, window);null != document.body && AttachEvent("click", new Function("if(StateService.IsScriptHREF()) {MSOWebPartPage_hideNextBeforeUnload = true;}"), document.body);this.WebPartPage = new WebPartPageDef(a);
        return this.WebPartPage
    }

    function q(a, d, c) {
        a:;
        var b = a;
        if ("URL" == d) {
            if ("UNICODE" == c) b = URL2Unicode(a)
        } else if ("UNICODE" == d)
            if ("URL" == c) b = Unicode2URL(a);
        return b
    }

    function a(c, d) {
        a:;
        var a = null,
            b = document.all.item(c);
        if (b != null) a = b.all.item(d);
        return a
    }

    function n(c, d, e) {
        a:;
        var b = a(c, d);
        if (b != null) b.checked = e ? "true" : "false"
    }

    function p(c, d, e) {
        a:;
        var b = a(c, d);
        if (b != null) b.style.display = e ? "" : "none"
    }

    function o(c, d, e) {
        a:;
        var b = a(c, d);
        if (b != null) b.disabled = !(e == true)
    }

    function k(c, d) {
        a:;
        var b = a(c, d);
        return b != null ? b.checked == "true" ? true : false : null
    }

    function m(c, d) {
        a:;
        var b = a(c, d);
        return b != null ? b.style.display != "none" ? true : false : null
    }

    function l(c, d) {
        a:;
        var b = a(c, d);
        return b != null ? b.disabled != true ? true : false : null
    }
    this.RaiseConnectionEvent = e;this.RaiseConnectionEventSpecial = g;this.InitPartCommunication = i;this.RaiseEvent = b.RaiseEvent;this.RegisterForEvent = b.RegisterForEvent;this.UnRegisterForEvent = b.UnRegisterForEvent;this.RegisterForPromptedSave = h;this.Init = r;this.WebPartPage = j;this.Convert = q;this.MSOMenu_SetChecked = n;this.MSOMenu_SetVisible = p;this.MSOMenu_SetEnabled = o;this.MSOMenu_GetChecked = k;this.MSOMenu_GetVisible = m;this.MSOMenu_GetEnabled = l
}
var StateService, WPSC, MSOWPSC_SavePerformed;

function MSOWPSC_OnSubmit() {
    a:;StateService.ProcessDirtyParts()
}

function Row2ParamsIn_GetRow(m, n, d) {
    a:;
    for (var c = new Array(d.length), a = new Array(d.length), b = 0; b < c; b++) c[b] = -1;
    for (var b = 0; b < a; b++) a[b] = -1;
    var g = d,
        f = n,
        h = m,
        e = 0;this.RowProviderInit = j;this.RowReady = l;this.ParametersInConsumerInit = k;

    function k(h, f) {
        a:;
        var a = f.ParameterInProperties;e = a.length;
        if (a != null && a.length > 0)
            for (var b = 0; b < a.length; b++)
                for (var d = 0; d < g.length; d++)
                    if (a[b].ParameterName == g[d]) c[d] = b
    }

    function j(g, e) {
        a:;
        var b = e.FieldList;
        if (b != null && b.length > 0)
            for (var c = 0; c < b.length; c++)
                for (var d = 0; d < f.length; d++)
                    if (b[c] == f[d]) a[d] = c
    }

    function i(a) {
        a:;this.ParameterValues = a
    }

    function l(n, l) {
        a:;
        var j = l.Rows;
        if (l.SelectionStatus == "Standard" || l.SelectionStatus == "New") {
            if (j != null) {
                j.MoveFirst();
                for (var d = new Array(e), b = 0; b < e; b++) {
                    var k = false;
                    try {
                        for (var f = 0; f < c.length; f++)
                            if (c[f] == b) {
                                if (j.Fields.Item(a[f]).Value != null) {
                                    var g = j.Fields.Item(a[f]).Type,
                                        m = j.Fields.Item(a[f]).Value;
                                    d[b] = String(m);
                                    if (g == 12) {
                                        if (typeof m == "date") d[b] = P2P_DateToString(d[b])
                                    } else if (g == 7 || g == 133 || g == 134 || g == 135) d[b] = P2P_DateToString(d[b])
                                } else d[b] = "";
                                k = true
                            }
                    } catch (o) {
                        k = false
                    }
                    if (!k) d[b] = ""
                }
                WPSC.RaiseConnectionEvent(h, "ParametersInReady", new i(d))
            }
        } else WPSC.RaiseConnectionEvent(h, "NoParametersIn", null)
    }
}

function Row2Cell_GetRow(h, i) {
    a:;
    var d = i,
        a = -1,
        b = h;this.RowProviderInit = e;this.RowReady = g;

    function e(j, i) {
        a:;
        var e = i.FieldList,
            g = i.FieldDisplayList;
        if (e != null && e.length > 0)
            for (var c = 0; c < e.length; c++)
                if (e[c] == d) {
                    a = c;
                    var h = null;
                    if (g != null && g.length > c) h = g[c];
                    WPSC.RaiseConnectionEvent(b, "CellProviderInit", new f(d, h))
                }
    }

    function f(b, a) {
        a:;this.FieldName = b;this.FieldDisplayName = a
    }

    function c(a) {
        a:;this.Cell = a
    }

    function g(f, e) {
        a:;
        var d = e.Rows;
        if (d != null) {
            d.MoveFirst();
            if (e.SelectionStatus && (e.SelectionStatus == "Standard" || e.SelectionStatus == "New") && a != -1 && d.Fields != null && d.Fields.Item(a) != null) WPSC.RaiseConnectionEvent(b, "CellReady", new c(d.Fields.Item(a).Value));
            else WPSC.RaiseConnectionEvent(b, "CellReady", new c(null))
        }
    }
}

function Row2Cell_GetCell() {
    a:;this.CellConsumerInit = a;

    function a() {}
}

function Row2Filter_GetFilter() {
    a:;this.FilterConsumerInit = a;

    function a() {}
}

function Row2Filter_GetRow(h, i, j) {
    a:;
    var k = j,
        e = i,
        a = -1,
        b = h;this.RowProviderInit = g;this.RowReady = f;

    function g(e, d) {
        a:;
        var b = d.FieldList;
        if (b != null && b.length > 0)
            for (var c = 0; c < b.length; c++)
                if (b[c] == k) a = c
    }

    function c(a) {
        a:;this.FilterExpression = a
    }

    function d(d) {
        a:;

        function c(a) {
            a:;
            return a < 10 ? "0" + a : a
        }
        var b = new Date(Date.parse(d)),
            a = c(b.getMonth() + 1) + "/";a += c(b.getDate()) + "/";a += b.getFullYear() + " ";a += c(b.getHours()) + ":";a += c(b.getMinutes()) + ":";a += c(b.getSeconds());
        return a
    }

    function f(k, i) {
        a:;
        var h = i.Rows;
        if ((i.SelectionStatus == "Standard" || i.SelectionStatus == "New") && a != -1)
            if (h != null) {
                h.MoveFirst();
                var f = "";
                try {
                    if (h.Fields.Item(a).Value != null) {
                        var j = h.Fields.Item(a).Value,
                            g = h.Fields.Item(a).Type;
                        f = String(j);
                        if (g == 12) {
                            if (typeof j == "date") f = d(f)
                        } else if (g == 7 || g == 133 || g == 134 || g == 135) f = d(f)
                    }
                } catch (l) {}
                WPSC.RaiseConnectionEvent(b, "SetFilter", new c("FilterField1=" + WPSC.Convert(e, "UNICODE", "URL") + "&FilterValue1=" + WPSC.Convert(f, "UNICODE", "URL")))
            } else WPSC.RaiseConnectionEvent(b, "SetFilter", new c("FilterField1=" + WPSC.Convert(e, "UNICODE", "URL") + "&FilterValue1="));
        else WPSC.RaiseConnectionEvent(b, "NoFilter", null)
    }
}

function ParamsOut2In_GetParamsOut(m, n, c) {
    a:;
    var b = new Array(c.length),
        d = new Array(c.length),
        f = c,
        e = n,
        g = m,
        a = 0;this.ParametersOutProviderInit = h;this.ParametersOutReady = k;this.ParametersInConsumerInit = l;this.NoParametersOut = i;

    function i() {
        a:;WPSC.RaiseConnectionEvent(g, "NoParametersIn", null)
    }

    function l(h, g) {
        a:;
        var c = g.ParameterInProperties;a = c.length;
        if (c != null && c.length > 0)
            for (var d = 0; d < c.length; d++)
                for (var e = 0; e < f.length; e++)
                    if (c[d].ParameterName == f[e]) b[e] = d
    }

    function h(g, f) {
        a:;
        var a = f.ParameterOutProperties;
        if (a != null && a.length > 0)
            for (var b = 0; b < a.length; b++)
                for (var c = 0; c < e.length; c++)
                    if (a[b].ParameterName == e[c]) d[c] = b
    }

    function j(a) {
        a:;this.ParameterValues = a
    }

    function k(l, k) {
        a:;
        var h = k.ParameterValues;
        if (h != null && h.length > 0) {
            for (var f = new Array(a), c = 0; c < a; c++) {
                for (var i = false, e = 0; e < b.length; e++)
                    if (b[e] == c) {
                        f[c] = h[d[e]];
                        i = true
                    } if (!i) f[c] = ""
            }
            WPSC.RaiseConnectionEvent(g, "ParametersInReady", new j(f))
        }
    }
}
var MSOLayout_inDesignMode, MSOLayout_currentDragMode, MSOLayout_zoneDragOver, MSOLayout_cellToDrop, MSOLayout_oDropLocation, MSOLayout_iBar, MSOLayout_horzZoneIBar, MSOLayout_vertZoneIBar, MSOLayout_horzBodyZoneIBar, MSOLayout_vertBodyZoneIBar, MSOLayout_moveObject, MSOLayout_maintainOriginalZone, MSOLayout_topObject, MSOLayout_galleryView, MSOLayout_unsavedChanges, MSOLayout_FormSubmit, MSOLayout_FormSubmitHref, MenuWebPartID, MenuWebPart, MSOConn_SourceWpNode, MSOConn_TargetWpNode, MSOConn_XformInfo1, MSOConn_XformInfo2, MSOConn_AspXformInfo, MSOConn_ConnCancelled, MSOConn_MultipleTargetGroups, MSOConn_TargetGroupNode, MSOConn_SourceGroupNode, MSOConn_BackButtonClicked;

function MSOConn_DialogFeatures() {
    a:;
    return typeof window.showModalDialog != "undefined" ? "dialogHeight:210px;dialogWidth:460px;center:yes;help:no;status:no;scroll:no;resizable:no;" : "resizable=no,status=no,scrollbars=no,menubar=no,directories=no,location=no,width=460,height=210"
}

function MSOLayout_RemoveQueryParametersFromUrl(a) {
    a = RemoveQueryParameterFromUrl(a, "[p|P][a|A][g|G][e|E][v|V][i|I][e|E][w|W]");
    a = RemoveQueryParameterFromUrl(a, "[tT][oO][[oO][lL][pP][aA][nN][eE][vV][iE][eE][wW]");
    a = RemoveQueryParameterFromUrl(a, "[dD][iI][sS][pP][lL][aA][yY][mM][oO][dD][eE]");
    return a
}

function MSOLayout_hasAttribute(a, b) {
    return typeof a.hasAttribute == "function" || typeof a.hasAttribute == "object" ? a.hasAttribute(b) : false
}

function MSOLayout_GetTopElement() {
    a:;
    return document.getElementById("s4-workspace") != null ? document.getElementById("s4-workspace") : document.body
}

function MSOLayout_GetParentWPZoneDiv(b) {
    for (var a = b; true; a = a.parentNode) {
        if (a == document.body) return 0;
        if (MSOLayout_hasAttribute(a, "zoneid")) break
    }
    return a
}

function _MSOLayout_ChangeLayoutMode(e, d) {
    a:;
    var a;typeof MSOWebPartPageFormName == "undefined";
    if (e != null) {
        MSOLayout_SaveChanges();
        a = document.forms[MSOWebPartPageFormName].action;
        a = RemoveQueryParameterFromUrl(a, "[p|P][a|A][g|G][e|E][v|V][i|I][e|E][w|W]");
        a = RemoveQueryParameterFromUrl(a, "[tT][oO][[oO][lL][pP][aA][nN][eE][vV][iE][eE][wW]");
        a = RemoveQueryParameterFromUrl(a, "[dD][iI][sS][pP][lL][aA][yY][mM][oO][dD][eE]");
        a = RemoveQueryParameterFromUrl(a, "InitialTabId");
        a = RemoveQueryParameterFromUrl(a, "VisibilityContext");
        var b = a.indexOf("#"),
            c = null;
        if (b >= 0) {
            c = a.substring(b);
            a = a.substring(0, b)
        }
        if (a.indexOf("?") < 0) a += "?";
        else a += "&";
        if (e == true) {
            document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value = 1;
            document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value = "Design";
            a += "PageView=Personal";
            if (FV4UI()) a += "&InitialTabId=Ribbon.WebPartPage&VisibilityContext=WSSWebPartPage";
            document.forms[MSOWebPartPageFormName].action = a
        } else {
            document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value = 1;
            document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value = "Design";
            a += "PageView=Shared";
            if (FV4UI()) a += "&InitialTabId=Ribbon.WebPartPage&VisibilityContext=WSSWebPartPage";
            document.forms[MSOWebPartPageFormName].action = a
        }
        if (Boolean(c)) a += c
    } else if (d != null && d) {
        a = document.forms[MSOWebPartPageFormName].action;
        a = RemoveQueryParameterFromUrl(a, "[tT][oO][[oO][lL][pP][aA][nN][eE][vV][iE][eE][wW]");
        a = RemoveQueryParameterFromUrl(a, "[dD][iI][sS][pP][lL][aA][yY][mM][oO][dD][eE]");
        document.forms[MSOWebPartPageFormName].MSOWebPartPage_Shared.value = "";
        document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value = 0;
        document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value = "Browse";
        document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_ExitingDesignMode.value = "true";
        document.forms[MSOWebPartPageFormName].action = a
    }
    document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_EndWebPartEditing.value = "true";__doPostBack(MSOWebPartPageFormName, "")
}

function MSOLayout_ToggleLayoutMode() {
    a:;
    var a = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
    if (a != 1) {
        document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value = 1;
        document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value = "Design"
    } else {
        document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value = 0;
        document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value = "Browse"
    }
    __doPostBack(MSOWebPartPageFormName, "")
}

function MSOLayout_ToggleView(b) {
    a:;
    var a = document.forms[MSOWebPartPageFormName].action;a = MSOLayout_RemoveQueryParametersFromUrl(a);document.forms[MSOWebPartPageFormName].action = a;
    if (b == true) document.forms[MSOWebPartPageFormName].MSOWebPartPage_Shared.value = "false";
    else document.forms[MSOWebPartPageFormName].MSOWebPartPage_Shared.value = "true";document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value = 0;document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value = "Browse";__doPostBack(MSOWebPartPageFormName, "")
}

function MSOLayout_SetupLayoutFlags() {
    a:;MSOLayout_inDesignMode = true;MSOLayout_topObject = document.getElementById("MSOTlPn_WebPartPageDiv") != null ? document.getElementById("MSOTlPn_WebPartPageDiv") : document.body
}

function MSOLayout_GetRealOffset(f, d, b) {
    var c = 0;
    if (!Boolean(b)) b = document.body;
    for (var e = b.offsetParent, g = document.body, a = f; Boolean(a) && a != e && a != g; a = a.offsetParent)
        if (d.charAt(0) == "L") c += a.offsetLeft;
        else if (d.charAt(0) == "T") c += a.offsetTop;
    return c
}

function MSOLayout_IsWikiEditMode() {
    a:;
    var a = document.getElementById("_wikiPageMode");
    return !Boolean(a) ? false : a.value == "Edit"
}

function MSOLayout_MoveWebPartStart(k, a, f, h) {
    if (window.event == null || window.event.button != 1) return;
    MSOLayout_currentDragMode = "move";
    document.selection.empty();
    MSOLayout_galleryView = h == true ? true : false;
    MSOLayout_CreateDragObject(f);
    MSOLayout_CreateIBar();
    MSOLayout_oDropLocation = a;
    var e = a.getAttribute("allowZoneChange");
    if (e == "0") MSOLayout_maintainOriginalZone = MSOLayout_GetParentWPZoneDiv(a);
    else MSOLayout_maintainOriginalZone = "0";
    var j = a.getAttribute("zoneid");
    if (MSOLayout_galleryView && typeof a.dzc != "undefined" && a.dzc != null) {
        var b = GetElementsByName("MSOZone");
        if (b != null && b.length > 1)
            for (var c = 0; c < b.length; c++)
                if (b[c].zoneID == j) {
                    MSOLayout_maintainOriginalZone = b[c];
                    break
                }
    }
    MSOLayout_iBar.setAttribute("goodDrop", "false");
    var d = MSOLayout_GetParentWPZoneDiv(a);
    if (d.id == "MSOZone") {
        MSOLayout_zoneDragOver = d;
        Sys.UI.DomElement.addCssClass(MSOLayout_zoneDragOver, "ms-SPZoneSelected")
    }!MSOLayout_galleryView && !MSOLayout_IsWikiEditMode() && MSOLayout_MoveIBar(a);
    AddEvtHandler(document.body, "ondragover", MSOLayout_MoveWebPartBodyDragOver);
    if (typeof document.body.ondragend != "undefined") var g = document.body.ondragend;
    if (typeof document.body.ondrop != "undefined") var i = document.body.ondrop;
    document.body.ondragend = new Function("window.event.returnValue = false;");
    document.body.ondrop = new Function("MSOLayout_iBar.setAttribute('goodDrop', 'true');");
    a.ondragstart = new Function("try {event.dataTransfer.effectAllowed = 'move';} catch (exception) {}");
    AddEvtHandler(a, "ondrag", MSOLayout_MoveDragObject);
    a.dragDrop();
    DetachEvent("dragover", MSOLayout_MoveWebPartBodyDragOver, document.body);
    document.body.ondragend = g;
    document.body.ondrop = i;
    DetachEvent("drag", MSOLayout_MoveDragObject, a);
    MSOLayout_moveObject.style.display = "none";
    MSOLayout_currentDragMode = "";
    event.returnValue = false
}

function MSOLayout_CalculateZoneCellIndex(d) {
    var f = MSOLayout_GetParentWPZoneDiv(d);
    if (f == null) return 0;
    var e = 0,
        a = f.getElementsByTagName("DIV");
    if (a != null)
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            if (c == d) return e;
            if (MSOLayout_hasAttribute(c, "data-iszonecell")) e++
        }
    return 0
}

function MSOLayout_MoveWebPartDragZoneEnter(a, b) {
    a:;
    if (MSOLayout_currentDragMode != "move") return;
    if (a != MSOLayout_zoneDragOver) {
        MSOLayout_zoneDragOver != null && Sys.UI.DomElement.removeCssClass(MSOLayout_zoneDragOver, "ms-SPZoneSelected");
        MSOLayout_zoneDragOver = a;
        event.dataTransfer.dropEffect = "move"
    }
    MSOLayout_MoveWebPartDragOver(b, MSOLayout_GetWPZoneCell(a, 0), "False");MSOLayout_MoveWebPartStopEventBubble()
}

function MSOLayout_MoveWebPartDragEnter(a) {
    if (MSOLayout_currentDragMode != "move") return;
    event.dataTransfer.dropEffect = "move";
    MSOLayout_cellToDrop = MSOLayout_CalculateZoneCellIndex(a)
}

function MSOLayout_GetWPZoneCell(f, e) {
    var c = 0,
        a = f.getElementsByTagName("DIV");
    if (a != null)
        for (var b = 0; b < a.length; b++) {
            var d = a[b];
            if (MSOLayout_hasAttribute(d, "data-iszonecell")) {
                if (e == c) return d;
                c++
            }
        }
    return null
}

function MSOLayout_MoveWebPartDragOver(f, b, c) {
    a:;
    if (MSOLayout_currentDragMode != "move") return;event.dataTransfer.dropEffect = "move";
    var d = c == "True" ? true : false;MSOLayout_SetupDropLocation(b, d);
    var e = MSOLayout_GetParentWPZoneDiv(b),
        a = MSOLayout_GetWPZoneCell(e, MSOLayout_cellToDrop);
    if (a == null) return;MSOLayout_oDropLocation = a;MSOLayout_MoveIBar(MSOLayout_oDropLocation);MSOLayout_galleryView && MSOLayout_maintainOriginalZone == "0" && MSOLayout_UpdateZoneDropDown();MSOLayout_MoveWebPartStopEventBubble()
}

function MSOLayout_MoveWebPartBodyDragOver() {
    a:;
    if (MSOLayout_currentDragMode != "move") return;event.dataTransfer.dropEffect = "none";MSOLayout_iBar.style.display = "none";MSOLayout_zoneDragOver != null && Sys.UI.DomElement.removeCssClass(MSOLayout_zoneDragOver, "ms-SPZoneSelected");window.event.returnValue = false
}

function MSOLayout_MoveWebPartStopEventBubble() {
    a:;
    if (MSOLayout_currentDragMode != "move" || MSOLayout_iBar.style.display == "none") return;window.event.returnValue = false;window.event.cancelBubble = true
}

function MSOLayout_MoveWebPart(OriginalZoneCell, DestinationZoneCell) {
    MSOLayout_iBar.style.display = "none";
    Sys.UI.DomElement.removeCssClass(MSOLayout_zoneDragOver, "ms-SPZoneSelected");
    if (MSOLayout_currentDragMode != "move" || MSOLayout_iBar.getAttribute("goodDrop") != "true" || OriginalZoneCell == DestinationZoneCell) return;
    var newTableCell, originalZone = MSOLayout_GetParentWPZoneDiv(OriginalZoneCell),
        originalIndex, originalOrientation = OriginalZoneCell.getAttribute("orientation");
    originalIndex = MSOLayout_CalculateZoneCellIndex(OriginalZoneCell);
    var destinationZone, destinationIndex;
    destinationZone = MSOLayout_GetParentWPZoneDiv(DestinationZoneCell);
    var zonesChanged = destinationZone != originalZone,
        destinationOrientation = DestinationZoneCell.getAttribute("orientation");
    destinationIndex = MSOLayout_CalculateZoneCellIndex(DestinationZoneCell);
    var zoneCellPlaceHolder = document.createElement("div");
    DestinationZoneCell.parentNode.insertBefore(zoneCellPlaceHolder, DestinationZoneCell);
    zoneCellPlaceHolder.swapNode(OriginalZoneCell);
    zoneCellPlaceHolder.removeNode(true);
    OriginalZoneCell.setAttribute("orientation", destinationOrientation);
    if (zonesChanged) {
        var originalEmptyZoneText = getFirstElementByName(originalZone, "MSOZoneCell_emptyZoneText"),
            destinationEmptyZoneText = getFirstElementByName(destinationZone, "MSOZoneCell_emptyZoneText");
        if (originalEmptyZoneText != null) {
            var strNumWebParts = originalEmptyZoneText.getAttribute("webPartsInZone");
            if (strNumWebParts != null) {
                var numWebParts = Number(strNumWebParts);
                numWebParts--;
                if (numWebParts == 0) {
                    originalEmptyZoneText.style.display = "";
                    originalEmptyZoneText.parentNode.style.padding = ""
                }
                originalEmptyZoneText.setAttribute("webPartsInZone", String(numWebParts))
            }
        }
        if (destinationEmptyZoneText != null) {
            var strDestNumWebParts = destinationEmptyZoneText.getAttribute("webPartsInZone");
            if (strDestNumWebParts != null) {
                var numDestWebParts = Number(strDestNumWebParts);
                numDestWebParts++;
                destinationEmptyZoneText.setAttribute("webPartsInZone", String(numDestWebParts))
            }
            destinationEmptyZoneText.style.display = "none";
            destinationEmptyZoneText.parentNode.style.padding = "0"
        }
    }
    if (zonesChanged || destinationIndex != originalIndex && destinationIndex != originalIndex + 1) {
        if (originalZone != destinationZone) {
            var destZoneId = destinationZone.getAttribute("zoneID"),
                relatedWebPart = OriginalZoneCell.getAttribute("relatedwebpart");
            relatedWebPart != null && destZoneId != null && MSOLayout_AddChange(eval(relatedWebPart), "Zone", destZoneId);
            MSOLayout_UpdatePartOrderAfterMove(originalZone, 0)
        }
        MSOLayout_UpdatePartOrderAfterMove(destinationZone, 0)
    }
    if (zonesChanged)
        if (destinationOrientation == "Horizontal") MSOLayout_AdjustHorizontalZoneCells(destinationZone);
        else Sys.UI.DomElement.removeCssClass(OriginalZoneCell, "ms-webpart-cell-horizontal")
}

function MSOLayout_AdjustHorizontalZoneCells(c) {
    for (var d = MSOLayout_CountZoneCells(c) - 1, b = 0; b < d; b++) {
        var a = MSOLayout_GetWPZoneCell(c, b);
        if (a != null) a.className.indexOf("ms-webpartcell-horizontal") < 0 && Sys.UI.DomElement.addCssClass(a, "ms-webpart-cell-horizontal")
    }
}

function MSOLayout_CountZoneCells(d) {
    if (d == null) return 0;
    var c = 0,
        a = d.getElementsByTagName("DIV");
    if (a != null)
        for (var b = 0; b < a.length; b++) {
            var e = a[b];
            if (MSOLayout_hasAttribute(e, "data-iszonecell")) c++
        }
    return c
}

function MSOLayout_UpdatePartOrderAfterMove(Zone, StartingIndex) {
    a:;
    for (var wpCell, index = StartingIndex; true; index++) {
        wpCell = MSOLayout_GetWPZoneCell(Zone, index);
        if (wpCell == null) break;
        var relatedWebPart = wpCell.getAttribute("relatedwebpart");
        MSOLayout_AddChange(eval(relatedWebPart), "ZoneIndex", index)
    }
}

function MSOLayout_CreateDragObject(b) {
    a:;
    var a;
    if (!Boolean(MSOLayout_moveObject)) {
        MSOLayout_moveObject = insertAdjacentElement(document.body, "afterBegin", document.createElement("DIV"));
        MSOLayout_moveObject.className = "UserCellSelected";
        MSOLayout_moveObject.style.cssText = "font-size:8pt;position:absolute;overflow:hidden;display:none;z-index:100";
        MSOLayout_moveObject.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=75)";
        a = MSOLayout_moveObject.insertBefore(document.createElement("NOBR"));
        a.style.cssText = "padding-top:2px;width:147px;height:1.5em;overflow:hidden;text-overflow:ellipsis"
    } else a = MSOLayout_moveObject.children(0);a.innerText = b
}

function MSOLayout_MoveDragObject() {
    a:;
    if (MSOLayout_currentDragMode != "move") return;
    if (MSOLayout_moveObject.style.display == "none") MSOLayout_moveObject.style.display = "";
    if (MSOLayout_moveObject.style.width == "") {
        MSOLayout_moveObject.realWidth = MSOLayout_moveObject.offsetWidth;
        MSOLayout_moveObject.realHeight = MSOLayout_moveObject.offsetHeight
    }
    var a = MSOLayout_moveObject.realWidth,
        b = MSOLayout_moveObject.realHeight,
        c = event.clientX + document.body.scrollLeft - a / 2,
        d = event.clientY + document.body.scrollTop + 1;
    if (c + a > document.body.scrollWidth) a -= c + a - document.body.scrollWidth;
    if (d + b > document.body.scrollHeight) b -= d + b - document.body.scrollHeight;
    if (b <= 0 || a <= 0) {
        MSOLayout_moveObject.style.display = "none";
        a = b = 0
    } else MSOLayout_moveObject.style.display = "";MSOLayout_moveObject.width = String(a);MSOLayout_moveObject.height = String(b);MSOLayout_moveObject.style.pixelLeft = c;MSOLayout_moveObject.style.pixelTop = d
}

function MSOLayout_Contains(c, a) {
    if (a == null) return false;
    var b = false;
    do {
        b = c == a;
        if (b) break;
        a = a.parentNode
    } while (a != null);
    return b
}

function MSOLayout_ShowWPMenuAndCheckbox(b) {
    a:;
    var a = document.getElementById(b);
    if (a != null) {
        Sys.UI.DomElement.removeCssClass(a, "ms-webpart-controlBox-hide");
        Sys.UI.DomElement.addCssClass(a, "ms-webpart-controlBox-show")
    }
}

function MSOLayout_HideWPMenuAndCheckbox(c, d) {
    a:;
    var b = document.getElementById(d),
        a = document.getElementById(c);
    if (a != null && b != null && !b.checked) {
        Sys.UI.DomElement.removeCssClass(a, "ms-webpart-controlBox-show");
        Sys.UI.DomElement.addCssClass(a, "ms-webpart-controlBox-hide")
    }
}

function MSOLayout_CreateIBar() {
    a:;
    if (!Boolean(MSOLayout_vertZoneIBar) || !Boolean(MSOLayout_horzZoneIBar)) {
        var a = document.createElement("TABLE"),
            f = FV4UI() ? " margin:1px;" : "";
        a.style.cssText = "font-size:1pt; position:absolute; display:none; border-collapse:collapse;" + f;
        a.cellSpacing = 0;
        a.cellPadding = 0;
        AddEvtHandler(a, "ondragenter", MSOLayout_MoveWebPartStopEventBubble);
        AddEvtHandler(a, "ondragover", MSOLayout_MoveWebPartStopEventBubble);
        var e = a.insertRow(-1).insertCell(-1);
        e.align = "center";
        var d = e.insertBefore(document.createElement("DIV"));
        d.className = "ms-SPZoneIBar";
        d.style.backgroundColor = a.currentStyle.borderColor;
        d.style.borderWidth = "2px";
        d.style.position = "relative";
        MSOLayout_topObject = document.body;
        MSOLayout_horzZoneIBar = MSOLayout_topObject.appendChild(a.cloneNode(true));
        MSOLayout_vertZoneIBar = MSOLayout_topObject.appendChild(a.cloneNode(true));
        var b = getFirstElementByProperty(MSOLayout_horzZoneIBar, "className", "ms-SPZoneIBar"),
            c = getFirstElementByProperty(MSOLayout_vertZoneIBar, "className", "ms-SPZoneIBar");
        MSOLayout_horzZoneIBar.width = "2";
        MSOLayout_horzZoneIBar.style.borderStyle = "solid none";
        b.className = "ms-SPZoneIBar";
        b.height = "100%";
        b.width = "33%";
        b.style.borderStyle = "none solid none none";
        b.style.posTop = 0;
        b.name = "MSOLayout_insideIBar";
        MSOLayout_vertZoneIBar.height = "6";
        MSOLayout_vertZoneIBar.style.borderStyle = "none solid";
        c.className = "ms-SPZoneIBar";
        c.width = "100%";
        c.height = "2";
        c.style.borderStyle = "solid none none none";
        c.style.posTop = 1;
        c.name = "MSOLayout_insideIBar";
        if (MSOLayout_topObject != document.body) {
            MSOLayout_horzBodyZoneIBar = document.body.appendChild(MSOLayout_horzZoneIBar.cloneNode(true));
            MSOLayout_vertBodyZoneIBar = document.body.appendChild(MSOLayout_vertZoneIBar.cloneNode(true))
        }
    }
    MSOLayout_iBar = MSOLayout_vertZoneIBar
}

function MSOLayout_MoveIBar(a) {
    if (Boolean(MSOLayout_iBar)) MSOLayout_iBar.style.display = "none";
    var f = MSOLayout_Contains(MSOLayout_topObject, a);
    if (MSOLayout_zoneDragOver == null) return;
    if (MSOLayout_maintainOriginalZone == "0" || MSOLayout_GetParentWPZoneDiv(a) == MSOLayout_maintainOriginalZone) {
        var b, d = 0,
            c = FV4UI() ? 2 : 0,
            g = a.getAttribute("orientation");
        if (g == "Horizontal") {
            var k = document.dir == "rtl" ? a.offsetWidth - (MSOLayout_CalculateZoneCellIndex(a) == 0 ? 3 : 0) : 0;
            MSOLayout_iBar = f ? MSOLayout_iBar = MSOLayout_horzZoneIBar : MSOLayout_horzBodyZoneIBar;
            b = getFirstElementByName(MSOLayout_iBar, "MSOLayout_insideIBar");
            MSOLayout_iBar.style.pixelLeft = MSOLayout_GetRealOffset(a, "Left", MSOLayout_topObject) - (MSOLayout_CalculateZoneCellIndex(a) == 0 ? 0 : 3);
            MSOLayout_iBar.style.pixelLeft += k;
            MSOLayout_iBar.style.pixelTop = MSOLayout_GetRealOffset(MSOLayout_zoneDragOver, "Top", MSOLayout_topObject) + 1;
            d = MSOLayout_zoneDragOver.clientHeight >= c ? MSOLayout_zoneDragOver.clientHeight - c : MSOLayout_zoneDragOver.clientHeight;
            MSOLayout_iBar.height = String(d);
            if (a.id == "MSOZone_EmptyZoneCell") {
                var i = getFirstElementByName(a, "MSOZoneCell_emptyZoneText"),
                    h = i != null ? i.getAttribute("webPartsInZone") : null;
                if (h != null && Number(h) > 0) MSOLayout_iBar.style.pixelLeft -= 3
            }
        } else {
            MSOLayout_iBar = f ? MSOLayout_vertZoneIBar : MSOLayout_vertBodyZoneIBar;
            b = getFirstElementByName(MSOLayout_iBar, "MSOLayout_insideIBar");
            MSOLayout_iBar.style.pixelLeft = MSOLayout_GetRealOffset(MSOLayout_zoneDragOver, "Left", MSOLayout_topObject) + 1;
            MSOLayout_iBar.style.pixelTop = MSOLayout_GetRealOffset(a, "Top", MSOLayout_topObject) - (MSOLayout_CalculateZoneCellIndex(a) == 0 ? 0 : 4);
            MSOLayout_iBar.width = String(MSOLayout_zoneDragOver.clientWidth >= c ? MSOLayout_zoneDragOver.clientWidth - c : MSOLayout_zoneDragOver.clientWidth);
            if (a.id == "MSOZone_EmptyZoneCell") MSOLayout_iBar.style.pixelTop -= 1
        }
        if (FV4UI() && MSOLayout_topObject.id != "MSOTlPn_WebPartPageDiv") {
            var e = document.getElementById("s4-workspace");
            if (Boolean(e)) {
                MSOLayout_iBar.style.pixelTop -= e.scrollTop;
                MSOLayout_iBar.style.pixelLeft -= e.scrollLeft
            }
        }
        if (FV4UI() && Boolean(b) && g == "Horizontal") {
            b.style.minHeight = String(d - 6) + "px";
            var j = b.parentNode;
            if (Boolean(j)) j.align = "left"
        }
        Sys.UI.DomElement.addCssClass(MSOLayout_zoneDragOver, "ms-SPZoneSelected");
        MSOLayout_iBar.style.display = "inline"
    }
}

function MSOLayout_UpdateZoneDropDown() {
    a:;
    if (MSOLayout_zoneDragOver == null) return;
    var d = MSOLayout_zoneDragOver.getAttribute("zoneID");
    if (typeof zoneChooserID != "undefined" && Boolean(window.zoneChooserID)) {
        var b = GetElementsByName(zoneChooserID);
        if (b != null && b.length > 0)
            for (var c = b[0], a = 0; a < c.options.length; a++)
                if (c.options[a].value == d) c.options[a].selected = true
    }
}

function MSOLayout_GetRibbonHeight() {
    a:;
    var a = 0,
        c = document.getElementById("suiteBar");
    if (c != null) a += c.offsetHeight;
    var b = document.getElementById("s4-ribbonrow");
    if (b != null) a += b.offsetHeight;
    return a
}

function MSOLayout_SetupDropLocation(a, c) {
    var e = a.getAttribute("orientation"),
        b = MSOLayout_CalculateZoneCellIndex(a);
    if (e == "Vertical") {
        var g = MSOLayout_GetParentRow(a);
        if (!Boolean(g)) return;
        if (a.id != "MSOZone_EmptyZoneCell" && MSOLayout_hasAttribute(a, "data-iszonecell") && (!c || event.clientY + MSOLayout_GetTopElement().scrollTop - MSOLayout_GetRealOffset(a, "Top") > a.offsetHeight / 2)) MSOLayout_cellToDrop = b + 1;
        else MSOLayout_cellToDrop = b
    } else {
        var d = document.dir == "rtl",
            h = a.parentNode.childNodes.length,
            f = b + 1;
        if (a.id != "MSOZone_EmptyZoneCell" && (!c || event.clientX + MSOLayout_topObject.scrollLeft - MSOLayout_GetRealOffset(a, "Left") > a.offsetWidth / 2)) MSOLayout_cellToDrop = d ? b : b + 1;
        else if (d) MSOLayout_cellToDrop = f >= h ? b : b + 1;
        else MSOLayout_cellToDrop = b
    }
}

function MSOLayout_UpdatePropertySheet(h, e, g) {
    a:;
    var d, c, b, a, f = document.getElementById("MSOTlPn_MainTD");
    if (typeof h.SelectedWebPart != "undefined" && Boolean(h.SelectedWebPart) && typeof f != "undefined" && Boolean(f) && typeof f.all != "undefined")
        for (d = f.all, c = 0; c < d.length; c++)
            if (d[c].layoutID == e)
                if (e == "ChromeState") {
                    for (b = d[c].all, a = 0; a < b.length; a++)
                        if (b[a].value == g) {
                            b[a].checked = true;
                            break
                        }
                } else if (e == "Height" || e == "Width") {
                    for (b = d[c].all, a = 0; a < b.length; a++)
                        if (b[a].id.indexOf("YesOption") != -1) b[a].checked = true;
                        else if (b[a].id.indexOf("SizeTextBox") != -1) b[a].value = g;
                        else if (b[a].id.indexOf("UnitsDropdown") != -1) b[a].value = "Pixel"
                } else d[c].value = g
}

function MSOLayout_MinimizeRestore(a) {
    var c, b;
    if (a.style.display != "none") {
        c = "Minimized";
        b = 1;
        a.style.display = "none"
    } else {
        c = "Normal";
        b = 0;
        a.style.display = ""
    }
    MSOLayout_UpdatePropertySheet(a, "ChromeState", c);
    MSOLayout_AddChange(a, "chromeState", b);
    RefreshCommandUI()
}

function MSOLayout_PageViewerMinimizeRestore(c, b) {
    var a = document.getElementById(b);
    if (a != null)
        if (c.style.display != "none")
            if (typeof a.ddf_src != "undefined" && a.src != a.ddf_src) a.src = a.ddf_src
}

function MSOLayout_FindAncestorByAttribute(a, b) {
    while (a != null) {
        if (a.getAttribute(b) != null) break;
        a = a.parentNode
    }
    return a
}

function MSOLayout_MinimizeRestoreToolPart(f, j, e, i, h) {
    a:;
    var g = f + "ChromeState",
        a = f + "Chrome",
        b, c;
    if (document.getElementById(a).style.display == "none") {
        document.getElementById(a).style.display = "inline";
        document.images[e].src = "/_layouts/15/images/TPMin1.gif";
        c = Strings.STS.L_ToolPartCollapseToolTip_TXT;
        b = "Normal"
    } else {
        document.getElementById(a).style.display = "none";
        document.images[e].src = "/_layouts/15/images/TPMax1.gif";
        c = Strings.STS.L_ToolPartExpandToolTip_TXT;
        b = "Minimized"
    }
    var d = c.replace("%0", j);document.images[e].alt = d;document.getElementById(h).title = d;document.getElementById(i).title = d;
    if (document.getElementById(g) != null) document.getElementById(g).value = b
}

function MSOLayout_RemoveWebPart(a) {
    MSOLayout_AddChange(a, "isIncluded", "False");
    document.forms[MSOWebPartPageFormName].MSOWebPartPage_PostbackSource.value = 19;
    if (typeof a.SelectedWebPart != "undefined" && Boolean(a.SelectedWebPart)) MSOTlPn_onToolPaneCloseClick();
    else __doPostBack(MSOWebPartPageFormName, "")
}

function MSOLayout_RefreshIFrame(a) {
    document.forms[MSOWebPartPageFormName].MSOWebPartPage_PostbackSource.value = 23;
    a.src = a.src
}

function MSOLayout_GetStyleFromClass(sClass, sRule) {
    a:;insertAdjacentHTML(document.body, "beforeEnd", "<div style = 'display:none' id='temp' class='" + sClass + "'></div>");
    var sReturnValue = eval("temp.currentStyle." + sRule);eval("temp.removeNode();");
    return sReturnValue
}

function MSOLayout_AddChange(a, c, b) {
    if (!Boolean(a)) return;
    var f = a.getAttribute("WebPartID");
    if (typeof a.layoutChanges != "undefined" && Boolean(a.layoutChanges)) {
        var e = MSOLayout_SearchArray(a.layoutChanges, c);
        if (e != -1) a.layoutChanges[e + 1] = b;
        else {
            var d = a.layoutChanges;
            d.push(c);
            d.push(b)
        }
    } else {
        a.layoutChanges = [];
        a.layoutChanges.push(c);
        a.layoutChanges.push(b)
    }
    if (MSOLayout_SearchArray(MSOLayout_unsavedChanges, f) == -1) {
        MSOLayout_unsavedChanges.push((Boolean(MSOLayout_unsavedChanges.length) ? "|" : "") + f);
        MSOLayout_unsavedChanges.push(a.layoutChanges)
    }
    document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges.value = MSOLayout_unsavedChanges;
    MSOLayout_UpdatePropertySheet(a, c, b);
    if (MSOLayout_FormSubmit == null) {
        MSOLayout_FormSubmit = document.forms[MSOWebPartPageFormName].submit;
        MSOLayout_FormSubmitHref = ajaxNavigate.get_href();
        document.forms[MSOWebPartPageFormName].submit = new Function("MSOLayout_OnSubmit(); if(MSOLayout_FormSubmit.call) MSOLayout_FormSubmit.call(document.forms[MSOWebPartPageFormName]); else MSOLayout_FormSubmit();");
        AddEvtHandler(document.forms[MSOWebPartPageFormName], "onsubmit", MSOLayout_OnSubmit);
        AddEvtHandler(window, "onunload", MSOLayout_SaveChanges)
    }
}

function MSOLayout_ClearOnSubmitHooks() {
    a:;DetachEvent("unload", MSOLayout_SaveChanges, window);DetachEvent("submit", MSOLayout_OnSubmit, document.forms[MSOWebPartPageFormName]);
    if (null != MSOLayout_FormSubmit) document.forms[MSOWebPartPageFormName].submit = MSOLayout_FormSubmit;MSOLayout_FormSubmitHref = null
}

function MSOLayout_OnSubmit() {
    a:;MSOLayout_ClearOnSubmitHooks()
}

function MSOLayout_SaveChanges() {
    a:;
    if (document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges != null && document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges.value != "") {
        var a = MSOLayout_FormSubmitHref;
        if (null != a) {
            var d = /\#/,
                c = a.search(d);
            if (c != -1) a = a.substring(0, c);
            a = encodeURI(a);
            var b = GetXMLHttpRequestObject();
            b.open("POST", a, false);
            var e = "&__REQUESTDIGEST=" + URLEncode(document.forms[MSOWebPartPageFormName].__REQUESTDIGEST.value) + "&MSOLayout_LayoutChanges=" + URLEncode(document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges.value);
            b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            b.send(e);
            document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges.value = ""
        }
    }
    MSOLayout_ClearOnSubmitHooks()
}

function MSOLayout_SearchArray(b, c) {
    for (var a = 0; a < b.length; a++)
        if (b[a] == c || b[a] == "#" + c) return a;
    return -1
}

function MSOWebPartPage_OpenMenu(v, q, w, t, u) {
    a:;
    var e = document.getElementById(v),
        a = document.getElementById(w);
    if (e != null && typeof e.length != "undefined") e = e[0];
    if (Boolean(a)) {
        MenuWebPart = a;
        MenuWebPartID = a.getAttribute("WebPartID");
        if (typeof vwpcm != "undefined" && Boolean(vwpcm)) {
            var p = a.getAttribute("WebPartID2");
            if (!Boolean(p)) p = MenuWebPartID
        }
        for (var n = null, i = null, l = null, j = null, k = null, h = null, m = null, d = null, r = e.getElementsByTagName("ie:menuitem"), s = e.getElementsByTagName("menuitem"), g = [], b = 0; b < r.length; b++) g.push(r[b]);
        for (b = 0; b < s.length; b++) g.push(s[b]);
        for (b = 0; b < g.length; ++b) {
            var c = g[b];
            switch (c.id) {
                case "MSOMenu_Minimize":
                    n = c;
                    break;
                case "MSOMenu_Restore":
                    i = c;
                    break;
                case "MSOMenu_Close":
                    l = c;
                    break;
                case "MSOMenu_Delete":
                    j = c;
                    break;
                case "MSOMenu_Export":
                    k = c;
                    break;
                case "MSOMenu_RestorePartDefaults":
                    h = c;
                    break;
                case "MSOMenu_Help":
                    m = c;
                    break;
                case "MSOMenu_Connections":
                    d = c
            }
        }
        if (Boolean(n)) n.style.display = a.getAttribute("allowMinimize") == "false" || a.style.display == "none" ? "none" : "";
        if (Boolean(i)) i.style.display = a.getAttribute("allowMinimize") == "false" || a.style.display != "none" ? "none" : "";
        if (Boolean(l)) l.style.display = a.getAttribute("allowRemove") == "false" ? "none" : "";
        if (Boolean(j)) j.style.display = a.getAttribute("allowDelete") != "false" ? "" : "none";
        if (Boolean(k)) k.style.display = a.getAttribute("allowExport") == "false" ? "none" : "";
        if (Boolean(m)) m.style.display = a.getAttribute("helpLink") == null ? "none" : "";
        if (Boolean(h)) h.style.display = MSOLayout_inDesignMode && a.getAttribute("HasPers") == "true" && typeof a.OnlyForMePart != "undefined" && a.OnlyForMePart != "true" ? "" : "none";
        if (Boolean(d)) d.style.display = MSOLayout_inDesignMode ? "" : "none";
        if (t != "False") {
            var o = document.getElementById("MSOMenu_Connections" + a.id);
            if (d != null && o != null)
                if (browseris.ie) try {
                    d.outerHTML = o.innerHTML
                } catch (x) {} else {
                    var f = o.firstChild;
                    while (f != null && f.nodeType != 1) f = f.nextSibling;
                    if (f != null) {
                        f.style.display = d.style.display;
                        d.parentNode.replaceChild(f.cloneNode(true), d)
                    }
                }
        }
    }
    u && SP.Ribbon.PageManager.get_instance().get_commandDispatcher().executeCommand("appstatechanged", null);q != null && MenuHtc_show(e, q, true, null, null);
    return true
}

function MSOConn_IsXFormUINeeded(b) {
    a:;
    var a = SelectSingleNode(MSOConn_TargetGroupNode, XPathForBrowser("tInterface")),
        d = false,
        c = SelectSingleNode(a, XPathForBrowser("xForm")),
        e = SelectSingleNode(a, "mi");
    if (c != null && GetXmlAttributeValueForBrowser(e, "isXFormUINeeded") == "True") {
        d = true;
        if (GetXmlAttributeValueForBrowser(MSOConn_TargetGroupNode, "isConn") == "True") document.getElementById("MSOConn_Button").value = "edit";
        if (c.getAttribute("type") == "RowCellTransform") MSOConn_ShowRowCellXForm(a, b);
        else if (c.getAttribute("type") == "RowFilterTransform") MSOConn_ShowRowFilterXForm(a, b);
        else MSOConn_ShowAspXForm(a, b)
    }
    if (!d) {
        if (GetXmlAttributeValueForBrowser(MSOConn_TargetGroupNode, "isConn") == "True" && MSOConn_BackButtonClicked == false) document.getElementById("MSOConn_Button").value = "remove";
        b()
    }
}

function MSOConn_ShowRowFilterXForm(targetInterface, fnCallback) {
    var rowProInitArgNode, filConInitArgNode, providerPart, consumerPart, cref, strVal, args, displayListSet, sMatchInterfaceName = SelectSingleNode(targetInterface, "mi").getAttribute("id"),
        miNode = SelectSingleNode(targetInterface, "mi"),
        xFormInfo = GetXmlAttributeValueForBrowser(miNode, "xInfo"),
        sInterfaceNode = SelectSingleNode(MSOConn_SourceGroupNode, XPathForBrowser("sInterfaces/sInterface") + "[@id = '" + sMatchInterfaceName + "']");
    rowProInitArgNode = SelectSingleNode(targetInterface, XPathForBrowser("InitEventArgs/RowProviderInitEventArgs"));
    var isConnected = GetXmlAttributeValueForBrowser(MSOConn_TargetGroupNode, "isConn");
    if (rowProInitArgNode == null) {
        rowProInitArgNode = SelectSingleNode(sInterfaceNode, XPathForBrowser("InitEventArgs/RowProviderInitEventArgs"));
        filConInitArgNode = SelectSingleNode(targetInterface, XPathForBrowser("InitEventArgs/FilterConsumerInitEventArgs"));
        consumerPart = MSOConn_TargetWpNode;
        providerPart = MSOConn_SourceWpNode
    } else {
        filConInitArgNode = SelectSingleNode(sInterfaceNode, XPathForBrowser("InitEventArgs/FilterConsumerInitEventArgs"));
        consumerPart = MSOConn_SourceWpNode;
        providerPart = MSOConn_TargetWpNode
    }
    if (rowProInitArgNode != null && filConInitArgNode != null) {
        var rowFieldList = [],
            rowFieldDisplayList = [],
            rowFieldListNodes = SelectNodes(rowProInitArgNode, XPathForBrowser("Field")),
            filterFieldListNodes = SelectNodes(filConInitArgNode, XPathForBrowser("Field")),
            filterFieldList = [],
            filterFieldDisplayList = [],
            i;
        if (rowFieldListNodes == null || rowFieldListNodes.length == 0) {
            cref = rowProInitArgNode.getAttribute("cref");
            if (cref != null) {
                strVal = cref + ".GetInitEventArgs()";
                args = null;
                try {
                    args = eval(strVal)
                } catch (e) {}
                if (args != null) {
                    if (typeof args.FieldList != "undefined") rowFieldList = args.FieldList;
                    if (typeof args.FieldDisplayList != "undefined") rowFieldDisplayList = args.FieldDisplayList
                }
            }
        } else
            for (i = 0; i < rowFieldListNodes.length; i++) {
                displayListSet = false;
                rowFieldList[i] = rowFieldListNodes[i].getAttribute("FieldName");
                if (rowFieldListNodes[i].getAttribute("FieldDisplayName") != null) {
                    rowFieldDisplayList[i] = rowFieldListNodes[i].getAttribute("FieldDisplayName");
                    displayListSet = true
                } else if (displayListSet == true) rowFieldDisplayList = null
            }
        if (filterFieldListNodes == null || filterFieldListNodes.length == 0) {
            cref = filConInitArgNode.getAttribute("cref");
            if (cref != null) {
                strVal = cref + ".GetInitEventArgs()";
                args = null;
                try {
                    args = eval(strVal)
                } catch (e) {}
                if (args != null) {
                    filterFieldList = args.FieldList;
                    filterFieldDisplayList = args.FieldDisplayList
                }
            }
        } else
            for (i = 0; i < filterFieldListNodes.length; i++) {
                displayListSet = false;
                filterFieldList[i] = filterFieldListNodes[i].getAttribute("FieldName");
                if (filterFieldListNodes[i].getAttribute("FieldDisplayName") != null) {
                    filterFieldDisplayList[i] = filterFieldListNodes[i].getAttribute("FieldDisplayName");
                    displayListSet = true
                } else if (displayListSet == true) filterFieldDisplayList = null
            }
        if (rowFieldList != null && rowFieldList.length != 0 && filterFieldList != null && filterFieldList.length != 0 || isConnected == "True") {
            var rfxFormInfo, rowList = rowFieldList;
            if (rowFieldDisplayList != null && rowFieldDisplayList.length == rowFieldList.length) rowList = rowFieldDisplayList;
            var sFeatures = MSOConn_DialogFeatures(),
                url = document.getElementById("MSOConn_RFProXform").value + "?part=provider",
                dialogArgs = [rowList, isConnected, providerPart.getAttribute("title"), consumerPart.getAttribute("title"), MSOConn_MultipleTargetGroups, xFormInfo, rowFieldList];
            commonShowModalDialog(url, sFeatures, function(a) {
                a:;
                var c = true;
                if (a == null || a == "undefined") MSOConn_ConnCancelled = true;
                else if (a == "remove") {
                    document.getElementById("MSOConn_Button").value = "remove";
                    rfxFormInfo = ""
                } else if (a == "choose") MSOConn_ShowTargetGroupsDialog(MSOConn_ShowXFormsAndPersistEx);
                else {
                    c = false;
                    var b = filterFieldList;
                    if (filterFieldDisplayList != null && filterFieldList.length == filterFieldDisplayList.length) b = filterFieldDisplayList;
                    var d = rowList[a];
                    dialogArgs = [b, d, isConnected, consumerPart.getAttribute("title"), xFormInfo, filterFieldList];
                    commonShowModalDialog(document.getElementById("MSOConn_RFConXform").value, sFeatures, function(b) {
                        a:;
                        if (b == null) MSOConn_ConnCancelled = true;
                        else if (b == "remove") {
                            document.getElementById("MSOConn_Button").value = "remove";
                            rfxFormInfo = ""
                        } else if (b == "previous") MSOConn_ShowRowFilterXForm(targetInterface);
                        else if (MSOConn_ConnCancelled != true) {
                            MSOConn_XformInfo1 = filterFieldList[b];
                            MSOConn_XformInfo2 = rowFieldList[a]
                        }
                        fnCallback()
                    }, dialogArgs)
                }
                c && fnCallback()
            }, dialogArgs)
        } else {
            MSOConn_InitArgsError();
            MSOConn_ConnCancelled = true
        }
    } else {
        MSOConn_InitArgsError();
        MSOConn_ConnCancelled = true
    }
}

function MSOConn_ShowRowCellXForm(targetInterface, fnCallback) {
    a:;
    var rowProInitArgNode = null,
        cellConInitArgNode = null,
        providerPart = null,
        consumerPart = null,
        rcxFormInfo = null,
        cref, strVal, args, sMatchInterfaceName = SelectSingleNode(targetInterface, "mi").getAttribute("id"),
        miNode = SelectSingleNode(targetInterface, "mi"),
        xFormInfo = GetXmlAttributeValueForBrowser(miNode, "xInfo"),
        sInterfaceNode = SelectSingleNode(MSOConn_SourceGroupNode, "sInterfaces/sInterface[@id = '" + sMatchInterfaceName + "']");rowProInitArgNode = SelectSingleNode(targetInterface, XPathForBrowser("InitEventArgs/RowProviderInitEventArgs"));
    var isConnected = GetXmlAttributeValueForBrowser(MSOConn_TargetGroupNode, "isConn");
    if (rowProInitArgNode == null) {
        rowProInitArgNode = SelectSingleNode(sInterfaceNode, XPathForBrowser("InitEventArgs/RowProviderInitEventArgs"));
        cellConInitArgNode = SelectSingleNode(targetInterface, XPathForBrowser("InitEventArgs/CellConsumerInitEventArgs"));
        providerPart = MSOConn_SourceWpNode;
        consumerPart = MSOConn_TargetWpNode
    } else {
        cellConInitArgNode = SelectSingleNode(sInterfaceNode, "InitEventArgs/CellConsumerInitEventArgs");
        providerPart = MSOConn_TargetWpNode;
        consumerPart = MSOConn_SourceWpNode
    }
    if (rowProInitArgNode != null && cellConInitArgNode != null) {
        var fieldList = [],
            fieldDisplayList = [],
            fieldListNodes = SelectNodes(rowProInitArgNode, XPathForBrowser("Field"));
        if (fieldListNodes == null || fieldListNodes.length == 0) {
            cref = rowProInitArgNode.getAttribute("cref");
            if (cref != null) {
                strVal = cref + ".GetInitEventArgs()";
                args = null;
                try {
                    args = eval(strVal)
                } catch (e) {}
                if (args != null) {
                    if (typeof args.FieldList != "undefined") fieldList = args.FieldList;
                    if (typeof args.FieldDisplayList != "undefined") fieldDisplayList = args.FieldDisplayList
                }
            }
        } else
            for (var i = 0; i < fieldListNodes.length; i++) {
                var displayListSet = false;
                fieldList[i] = fieldListNodes[i].getAttribute("FieldName");
                if (fieldListNodes[i].getAttribute("FieldDisplayName") != null) {
                    fieldDisplayList[i] = fieldListNodes[i].getAttribute("FieldDisplayName");
                    displayListSet = true
                } else if (displayListSet == true) fieldDisplayList = null
            }
        var cell = cellConInitArgNode.getAttribute("FieldName"),
            cellDisplayName = cellConInitArgNode.getAttribute("FieldDisplayName");
        if (cell == null) {
            cref = cellConInitArgNode.getAttribute("cref");
            if (cref != null) {
                strVal = cref + ".GetInitEventArgs()";
                args = null;
                try {
                    args = eval(strVal)
                } catch (e) {}
                if (args != null) {
                    if (typeof args.FieldName != "undefined") cell = args.FieldName;
                    if (typeof args.cellDisplayName != "undefined") cellDisplayName = args.cellDisplayName
                }
            }
        }
        if (fieldList != null && fieldList.length != 0 && cell != null || isConnected == "True") {
            var cellName = cell,
                rowList = fieldList;
            if (fieldDisplayList != null && fieldDisplayList.length == fieldList.length) rowList = fieldDisplayList;
            if (cellDisplayName != null) cellName = cellDisplayName;
            var dialogArgs = [rowList, cellName, isConnected, providerPart.getAttribute("title"), consumerPart.getAttribute("title"), MSOConn_MultipleTargetGroups, xFormInfo, fieldList],
                sFeatures = MSOConn_DialogFeatures();
            commonShowModalDialog(document.getElementById("MSOConn_RCXform").value, sFeatures, function(a) {
                a:;
                if (a == "undefined" || a == null) MSOConn_ConnCancelled = true;
                else if (a == "remove") {
                    document.getElementById("MSOConn_Button").value = "remove";
                    rcxFormInfo = ""
                } else if (a == "choose") MSOConn_ShowTargetGroupsDialog(MSOConn_ShowXFormsAndPersistEx);
                else {
                    rcxFormInfo = fieldList[a];
                    if (rcxFormInfo != null && MSOConn_ConnCancelled != true) MSOConn_XformInfo1 = rcxFormInfo
                }
                fnCallback()
            }, dialogArgs)
        } else {
            MSOConn_InitArgsError();
            MSOConn_ConnCancelled = true
        }
    } else {
        MSOConn_InitArgsError();
        MSOConn_ConnCancelled = true
    }
    if (rcxFormInfo != null && MSOConn_ConnCancelled != true) MSOConn_XformInfo1 = rcxFormInfo
}

function MSOConn_ShowAspXForm(b, e) {
    a:;
    var h = SelectSingleNode(b, XPathForBrowser("xForm")),
        i = h.getAttribute("type"),
        k = SelectSingleNode(b, "mi"),
        g = GetXmlAttributeValueForBrowser(k, "xInfo"),
        d = GetXmlAttributeValueForBrowser(MSOConn_TargetGroupNode, "isConn"),
        j = b.getAttribute("id"),
        c;
    if (MSOConn_MultipleTargetGroups) c = "True";
    else c = "False";
    var f = MSOConn_DialogFeatures(),
        a = document.getElementById("MSOConn_AspXformUrl").value;a += "?pageUrl=";a += escapeProperly(ajaxNavigate.get_href());a += "&sWpId=";a += escapeProperly(document.getElementById("MSOConn_SWpId").value);a += "&sGroupId=";a += escapeProperly(document.getElementById("MSOConn_SGroupId").value);a += "&tWpId=";a += escapeProperly(document.getElementById("MSOConn_TWpId").value);a += "&tGroupId=";a += escapeProperly(j);a += "&xFormType=";a += escapeProperly(i);a += "&xFormInfo=";a += escapeProperly(g);a += "&isMultiGroup=";a += escapeProperly(c);a += "&isConnected=";a += escapeProperly(d);commonShowModalDialog(a, f, function(a) {
        a:;
        if (a == null) a = [null, null];
        var b = a[0],
            c = a[1];
        if (b == "undefined" || b == null) MSOConn_ConnCancelled = true;
        else if (b == "remove") {
            document.getElementById("MSOConn_Button").value = "remove";
            c = ""
        } else b == "choose" && MSOConn_ShowTargetGroupsDialog(MSOConn_ShowXFormsAndPersistEx);
        if (c != null && MSOConn_ConnCancelled != true) MSOConn_AspXformInfo = c;e()
    }, null)
}

function MSOConn_InitArgsError() {
    a:;document.body.style.cursor = "auto";alert(Strings.STS.L_NoInitArgs_ERR)
}

function MSOConn_TargetGroupDlgCallback(b) {
    a:;
    if (b != null) {
        document.getElementById("MSOConn_Button").value = b[0];
        for (var a = SelectNodes(MSOConn_TargetWpNode, "tg"), c = 0; a.length; c++)
            if (a[c].getAttribute("id") == b[1]) {
                MSOConn_TargetGroupNode = a[c];
                break
            }
    } else MSOConn_ConnCancelled = true
}

function MSOConn_ShowTargetGroupsDialog(c) {
    a:;
    var d = false;
    if (SelectNodes(MSOConn_TargetWpNode, "tg") != null && SelectNodes(MSOConn_TargetWpNode, "tg").length != 0) {
        var a = SelectNodes(MSOConn_TargetWpNode, "tg");
        if (a != null)
            for (var b = 0; b < a.length; b++) {
                var e = a[b];
                if (GetXmlAttributeValueForBrowser(e, "isConn") == "True") {
                    d = true;
                    MSOConn_TargetGroupNode = e;
                    break
                }
            }
        if (!d) {
            var f = MSOConn_DialogFeatures(),
                g = function(a) {
                    a:;MSOConn_TargetGroupDlgCallback(a);c()
                };
            commonShowModalDialog(document.getElementById("MSOConn_GroupUrl").value, f, g, MSOConn_TargetWpNode)
        } else c()
    } else MSOConn_ConnCancelled = true
}

function MSOConn_ConfirmRemoveConnection(d, e) {
    a:;
    var c = Strings.STS.L_RemoveConnection_TXT,
        a = [];a[0] = d;a[1] = e;
    if (a != null)
        for (var b = 0; b < a.length; b++) c = c.replace("%" + String(b), a[b]);
    return c
}

function MSOConn_ShowAndPersistCallback() {
    a:;
    if (!MSOConn_ConnCancelled)
        if (document.getElementById("MSOConn_Button").value == "remove") {
            var a = MSOConn_ConfirmRemoveConnection(MSOConn_SourceWpNode.getAttribute("title"), MSOConn_TargetWpNode.getAttribute("title"));
            confirm(a) && MSOConn_PersistConnection()
        } else MSOConn_PersistConnection();document.getElementById("MSOConn_Button").value = "none";MSOConn_ConnCancelled = false;MSOConn_XformInfo1 = null;MSOConn_XformInfo2 = null;MSOConn_AspXformInfo = null;MSOConn_SourceWpNode = null;MSOConn_TargetWpNode = null;MSOConn_MultipleTargetGroups = false;MSOConn_TargetGroupNode = null;MSOConn_SourceGroupNode = null
}

function MSOConn_ShowXFormsAndPersistEx() {
    a:;MSOConn_ShowXFormsAndPersist();MSOConn_ConnCancelled = true
}

function MSOConn_ShowXFormsAndPersist() {
    a:;
    if (!MSOConn_ConnCancelled && MSOConn_TargetGroupNode != null) {
        if (document.getElementById("MSOConn_Button").value != "remove") {
            MSOConn_IsXFormUINeeded(MSOConn_ShowAndPersistCallback);
            return
        }
        MSOConn_ShowAndPersistCallback();
        return
    }
    document.getElementById("MSOConn_Button").value = "none";MSOConn_ConnCancelled = false;MSOConn_XformInfo1 = null;MSOConn_XformInfo2 = null;MSOConn_AspXformInfo = null;MSOConn_SourceWpNode = null;MSOConn_TargetWpNode = null;MSOConn_MultipleTargetGroups = false;MSOConn_TargetGroupNode = null;MSOConn_SourceGroupNode = null
}

function MSOConn_CreateConnectionStep1(g, h, e, f, i, c, b, a) {
    a:;document.getElementById("MSOConn_SWpId").value = g;document.getElementById("MSOConn_TWpId").value = h;document.getElementById("MSOConn_SGroupId").value = i;document.getElementById("MSOConn_Button").value = "save";document.getElementById("MSOConn_TGroupId").value = "";document.getElementById("MSOConn_XForm1").value = "";document.getElementById("MSOConn_XForm2").value = "";document.getElementById("MSOConn_AspXForm").value = "";
    var d = true;
    if (Boolean(a)) document.getElementById("MSOConn_TGroupId").value = a;
    if (c == "True" && a != null && b != null && b == "False") {
        var j = MSOConn_ConfirmRemoveConnection(e, f);
        if (confirm(j)) document.getElementById("MSOConn_Button").value = "remove";
        else d = false
    } else if (c == "True" && a == null) document.getElementById("MSOConn_Button").value = "edit";
    if (d == true) {
        document.getElementById("MSOConn_CreationStep").value = "1";
        document.body.style.cursor = "wait";
        __doPostBack(MSOWebPartPageFormName, "")
    }
}

function XPathForBrowser(a) {
    a = a + "|" + a.toLowerCase();
    return a
}

function GetXmlAttributeValueForBrowser(c, b) {
    var a = c.getAttribute(b);
    if (null == a) a = c.getAttribute(b.toLowerCase());
    return a
}

function SelectSingleNode(b, a) {
    a = a.replace(/[\r\n \t]*$/, "").replace(/^[\r\n \t]*/, "");
    if (browseris.ie) return b.selectSingleNode(a);
    else {
        var c = b.ownerDocument.evaluate(a, b, null, XPathResult.ANY_TYPE, null),
            e = c.resultType,
            d = c.iterateNext();
        return d
    }
}

function SelectNodes(a, d) {
    if (browseris.ie) return a.selectNodes(d);
    var c = a.ownerDocument.evaluate(d, a, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null),
        e = [];
    if (c.resultType == XPathResult.ORDERED_NODE_ITERATOR_TYPE) {
        var b = c.iterateNext();
        while (b != null) {
            e.push(b);
            b = c.iterateNext()
        }
    }
    return e
}

function MSOConn_CreateConnectionStep2(l, m, n, o, k, h) {
    a:;
    var q = null,
        r = null;document.getElementById("MSOConn_SWpId").value = l;document.getElementById("MSOConn_TWpId").value = m;document.getElementById("MSOConn_SGroupId").value = k;document.getElementById("MSOConn_TGroupId").value = h;
    var p = XPathForBrowser("ConnDesign/sWebPart") + "[@id = 'MSOConn_" + n + "']",
        b = document.getElementById("MSOConn_Compatibility");
    if (browseris.ie) try {
        var a = new ActiveXObject("Microsoft.XMLDOM");
        a.async = false;
        if (null != b && typeof a.loadXML != "undefined") {
            a.loadXML(b.outerHTML);
            if (typeof a.documentElement != "undefined" && a.documentElement != null) b = a.documentElement
        }
    } catch (s) {
        return null
    }
    var f = SelectSingleNode(b, p);
    if (f != null) {
        MSOConn_SourceWpNode = f;
        for (var c = null, e = SelectNodes(f, "sg"), i = 0; e.length; i++)
            if (e[i].getAttribute("id") == k) {
                c = e[i];
                break
            } if (c != null) {
            MSOConn_SourceGroupNode = c;
            var g = SelectSingleNode(c, XPathForBrowser("tParts/tWebPart") + "[@id = 'MSOConn_" + o + "']");
            if (g != null) {
                MSOConn_TargetWpNode = g;
                if (!Boolean(h)) {
                    MSOConn_MultipleTargetGroups = true;
                    MSOConn_ShowTargetGroupsDialog(MSOConn_ShowXFormsAndPersist)
                } else {
                    for (var d = SelectNodes(g, "tg"), j = 0; d.length; j++)
                        if (d[j].getAttribute("id") == h) {
                            MSOConn_TargetGroupNode = d[j];
                            break
                        } MSOConn_ShowXFormsAndPersist()
                }
            }
        }
    }
    document.body.style.cursor = "auto"
}

function MSOConn_PersistConnection() {
    a:;document.getElementById("MSOConn_SGroupId").value = MSOConn_SourceGroupNode.getAttribute("id");document.getElementById("MSOConn_TGroupId").value = MSOConn_TargetGroupNode.getAttribute("id");
    if (document.getElementById("MSOConn_Button").value != "remove" && document.getElementById("MSOConn_Button").value != "edit") document.getElementById("MSOConn_Button").value = "save";
    if (MSOConn_XformInfo1 != null) document.getElementById("MSOConn_XForm1").value = MSOConn_XformInfo1;
    if (MSOConn_XformInfo2 != null) document.getElementById("MSOConn_XForm2").value = MSOConn_XformInfo2;
    if (MSOConn_AspXformInfo != null) document.getElementById("MSOConn_AspXForm").value = MSOConn_AspXformInfo;__doPostBack(MSOWebPartPageFormName, "")
}

function MSOLayout_ShowErrorDetails() {
    a:;
    var a = event.srcElement.parentNode;MSOLayout_ShowHideErrorDetails(a.nextSibling, a)
}

function MSOLayout_HideErrorDetails() {
    a:;
    var a = event.srcElement.parentNode.parentNode;MSOLayout_ShowHideErrorDetails(a.previousSibling, a)
}

function MSOLayout_ShowHideErrorDetails(b, a) {
    a:;a.style.display = "none";b.style.display = "inline"
}

function MoveSiteTitle() {
    a:;
    var b = documentGetElementsByName("titlewpTitleArea");
    if (b == null || b[0] == null) return;
    var a = b[0],
        c = documentGetElementsByName("onetidProjectPropertyTitle");
    if (c == null || c[0] == null) return;
    var e = c[0],
        d = document.getElementById("onetidPageTitleSeparator");
    if (d == null) return;
    if (Boolean(a.insertAdjacentElement)) {
        a.insertAdjacentElement("afterBegin", d);
        a.insertAdjacentElement("afterBegin", e)
    } else {
        a.insertBefore(d, a.firstChild);
        a.insertBefore(e, a.firstChild)
    }
}

function MSOLayout_ShowQuickAddDialog(j, k, c, e, d, f, g, b, h, i) {
    a:;
    var a = "?SiteId=" + j + "&WebId=" + k;
    if (c != "") a += "&Groups=" + c;
    if (e == false) a += "&ShowListsAndLibraries=false";a += "&NumberOfWebPartsInZone=" + d;a += "&MaxWebPartsInZone=" + f;
    if (b != "") a += "&ZoneDisplayName=" + b;commonShowModalDialog(h + a, i, g, undefined)
}
var MSOTlPn_prevBuilder, MSOTlPn_prevWidth, MSOTlPn_prevHeight, MSOTlPn_shownViewChangeWarning, MSOWebPartPage_hideNextBeforeUnload, MSOWebPartPage_partDeleted, MSOChangeInToolPaneWidth;

function ConvertToAspPartDisplayMode(b) {
    a:;
    var a;
    switch (b) {
        case "-1":
            a = "ExtensibleView";
            break;
        case "0":
            a = "Browse";
            break;
        case "1":
            a = "Edit";
            break;
        case "2":
            a = "Catalog";
            break;
        case "3":
            a = "GallerySearch";
            break;
        case "4":
            a = "Navigation";
            break;
        case "5":
            a = "Import";
            break;
        case "6":
            a = "DownLevelWebPartMenu";
            break;
        case "7":
            a = "ToolPaneErr"
    }
    return a
}

function MSOTlPn_ShowToolPane2(a) {
    a:;
    if (document.forms[MSOWebPartPageFormName].MSOGallery_FilterVisible) document.forms[MSOWebPartPageFormName].MSOGallery_FilterVisible.value = "false";document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value = a;
    if (arguments.length > 1) {
        document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_StartWebPartEditingName.value = "true";
        document.forms[MSOWebPartPageFormName].MSOTlPn_SelectedWpId.value = arguments[1]
    }
    __doPostBack(MSOWebPartPageFormName, "")
}

function MSOTlPn_ShowToolPane2Wrapper(a, b) {
    a:;document.forms[MSOWebPartPageFormName].MSOWebPartPage_PostbackSource.value = b;
    if (arguments[2] == null) MSOTlPn_ShowToolPane2(a);
    else MSOTlPn_ShowToolPane2(a, arguments[2])
}

function MSOTlPn_ShowToolPane(a) {
    a:;
    if (arguments.length > 1) MSOTlPn_ShowToolPane2(ConvertToAspPartDisplayMode(a), arguments[1]);
    else MSOTlPn_ShowToolPane2(ConvertToAspPartDisplayMode(a))
}

function MSOTlPn_ShowToolPaneWrapper(b, a) {
    a:;
    if (arguments[2] == null) MSOTlPn_ShowToolPane2Wrapper(ConvertToAspPartDisplayMode(b), a);
    else MSOTlPn_ShowToolPane2Wrapper(ConvertToAspPartDisplayMode(b), a, arguments[2])
}

function MSOLayout_CheckAndSaveChanges() {
    a:;document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges != null && document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges.value != "" && MSOLayout_SaveChanges()
}

function MSOWebPartPage_ExportCheckWarning(d, c) {
    a:;
    var b = true;
    if (c)
        if (!confirm(Strings.STS.L_ExportPersonalization_TXT)) b = false;
    if (b) {
        var a = false;
        if (typeof MSOWPSC_SavePerformed == "boolean") a = MSOWPSC_SavePerformed;
        MSOWebPartPage_SetWindowLocation(d);
        if (typeof MSOWPSC_SavePerformed == "boolean") {
            MSOWPSC_SavePerformed = a;
            MSOWebPartPage_hideNextBeforeUnload = true
        }
    }
}

function MSOMode_SetMode(b) {
    var a = MSOMode_GetNewUrl(b);
    MSOLayout_CheckAndSaveChanges();
    if (document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value != "Navigation") {
        document.forms[MSOWebPartPageFormName].MSOSPWebPartManager_DisplayModeName.value = "Browse";
        var c = /[& | \?]ToolPaneView=[-0-9A-Z]*/ig,
            d = /[& | \?]DisplayMode=[a-zA-Z]*/ig;
        a = MSOMode_RemoveMode(a, c);
        a = MSOMode_RemoveMode(a, d)
    }
    document.forms[MSOWebPartPageFormName].MSOWebPartPage_Shared.value = b ? "true" : "false";
    document.forms[MSOWebPartPageFormName].action = a;
    __doPostBack(MSOWebPartPageFormName, "")
}

function MSOMode_GetNewUrl(d, a) {
    if (a == null) a = ajaxNavigate.get_href();
    var c = /[& | \?]PageView=Personal/ig,
        b = /[& | \?]PageView=Shared/ig,
        e = "PageView=" + (d ? "Shared" : "Personal");
    a = MSOMode_RemoveMode(a, c);
    a = MSOMode_RemoveMode(a, b);
    a = MSOMode_AddMode(a, b, e);
    return a
}

function MSOMode_RemoveMode(a, g) {
    a:;
    var f = /\#/,
        d = a.search(f);
    if (d != -1) a = a.substring(0, d);
    var e = /\?/,
        c = a.search(e);
    if (c != -1) {
        var h = a.substring(0, c),
            b = a.substring(c, a.length);
        b = b.replace(g, "");
        if (b.length != 0 && b.charAt(0) != "?") b = "?" + b;
        a = h + b
    }
    return a
}

function MSOMode_AddMode(a, g, d) {
    a:;
    var f = /\#/,
        c = a.search(f);
    if (c != -1) a = a.substring(0, c);
    var e = /\?/,
        b = a.search(e);
    if (b == -1) a += "?" + d;
    else {
        var h = a.substring(b, a.length);
        if (h.search(g) == -1) a += "&" + d
    }
    return a
}

function MSOPGrid_BuilderVisible(a) {
    MSOPGrid_HidePrevBuilder();
    MSOTlPn_prevBuilder = null;
    a.style.display = "inline"
}

function MSOPGrid_HidePrevBuilder() {
    a:;
    if (MSOTlPn_prevBuilder != null)(eval(MSOTlPn_prevBuilder)).style.display = "none"
}

function MSOPGrid_doBuilder(d, a, b) {
    var c = showModalDialog(d, a, b);
    a.value = c;
    try {
        a.focus()
    } catch (e) {}
}

function MSOWebPartPage_RestorePageDefault() {
    a:;
    if (confirm(Strings.STS.L_ResetPagePersonalizationDialog_TXT)) {
        var a = document.createElement("INPUT");
        try {
            a.type = "hidden"
        } catch (b) {
            a.style.display = "none"
        }
        a.name = "MSOWebPartPage_RestorePageDefault";
        a.value = "true";
        document.forms[MSOWebPartPageFormName].appendChild(a);
        if (document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges != null) document.forms[MSOWebPartPageFormName].MSOLayout_LayoutChanges.value = "";
        MSOMode_SetMode(false)
    }
}

function MSOWebPartPage_RestorePartDefaults(b) {
    a:;
    if (confirm(Strings.STS.L_ResetPartPersonalizationDialog_TXT)) {
        var a = document.createElement("INPUT");
        try {
            a.type = "hidden"
        } catch (c) {
            a.style.display = "none"
        }
        a.name = "MSO_RestoreSettings";
        a.value = b;
        document.forms[MSOWebPartPageFormName].appendChild(a);
        MSOMode_SetMode(false)
    }
}

function MSOWebPartPage_MenuDoPostBack(e, d) {
    a:;
    var c = document.forms[MSOWebPartPageFormName];
    if (typeof c.__EVENTTARGET != "undefined") var b = c.__EVENTTARGET;
    if (typeof c.__EVENTARGUMENT != "undefined") var a = c.__EVENTARGUMENT;
    if (b == null) {
        b = document.createElement("INPUT");
        b.style.display = "none";
        b.name = "__EVENTTARGET";
        document.forms[MSOWebPartPageFormName].appendChild(b)
    }
    if (a == null) {
        a = document.createElement("INPUT");
        a.style.display = "none";
        a.name = "__EVENTARGUMENT";
        document.forms[MSOWebPartPageFormName].appendChild(a)
    }
    __doPostBack(e, d)
}

function MSOWebPartPage_SignIn() {
    a:;
    var a = document.createElement("INPUT");
    try {
        a.type = "hidden"
    } catch (b) {
        a.style.display = "none"
    }
    a.name = "MSOWebPartPage_AnonymousAccessLogIn";a.value = "1";document.forms[MSOWebPartPageFormName].appendChild(a);__doPostBack(MSOWebPartPageFormName, "")
}

function MSOWebPartPage_SetWindowLocation(b) {
    var a = b.toLowerCase();
    if (a.indexOf("javascript:") == 0 || a.indexOf("vbscript:") == 0) MSOWebPartPage_hideNextBeforeUnload = true;
    window.location.href = b
}

function MSOWebPartPage_SetNewWindowLocation(b, a) {
    a:;
    if (a == 0 || a == 1)
        if (a == 0) {
            var c = "edge: Sunken; center: yes; help: no; resizable: yes; status: no";
            window.commonShowModalDialog(b, c)
        } else window.open(b, null, "scrollbars=yes,resizable=yes,status=no,toolbar=no,menubar=no,location=no");
    else if (a == 2) window.location.href = b
}

function MSOTlPn_onToolPaneCloseClick() {
    a:;
    var b = "Browse",
        a = "49";MSOTlPn_ShowToolPane2Wrapper(b, a)
}

function MSOPGrid_InvokeFPBuilder(c, b, a) {
    if (typeof window.external != "undefined" && typeof window.external.InvokeBuilder != "undefined") a.value = window.external.InvokeBuilder(c, b, a.id);
    a.focus()
}

function MSOMenu_KeyboardClick(c, d, e, b) {
    if (b != null && Boolean(c))
        for (var a = 1; a < arguments.length - 1; a++)
            if (b.keyCode == arguments[a] && b.keyCode != 13) {
                c.onclick();
                return false
            } return
}

function MSOTlPn_ToggleDisplay(i, l, k, c, b, j) {
    a:;
    var m = i + "_STATEFIELD",
        d, e = document.getElementById(i),
        a = document.getElementById(l),
        g = document.getElementById(k),
        f = document.getElementById(j);
    if (e.style.display == "none") {
        e.style.display = "";
        a.src = "/_layouts/15/images/TPMin2.gif";
        a.alt = b;
        f.title = b;
        g.title = b;
        d = "1"
    } else {
        e.style.display = "none";
        a.src = "/_layouts/15/images/TPMax2.gif";
        a.alt = c;
        f.title = c;
        g.title = c;
        d = "0"
    }
    var h = document.getElementById(m);
    if (h != null) h.value = d
}

function MSOTlPn_onToolPaneMaxClick() {
    a:;
    var d = 1,
        a = document.getElementById("MSOTlPn_minMaxIcon"),
        b = a.src.substring(0, a.src.lastIndexOf("/") + 1);
    if (document.forms[MSOWebPartPageFormName].MSOTlPn_Maximized.value == "False") {
        document.getElementById("MSOTlPn_Tbl").style.width = (document.getElementById("MSOTlPn_Tbl").offsetWidth + MSOChangeInToolPaneWidth).toString() + "px";
        b += document.dir == "rtl" ? "tpmax.gif" : "tpmin.gif";
        a.title = Strings.STS.L_ToolPaneShrinkToolTip_TXT;
        a.alt = Strings.STS.L_ToolPaneShrinkToolTip_TXT;
        a.parentNode.title = Strings.STS.L_ToolPaneShrinkToolTip_TXT;
        document.forms[MSOWebPartPageFormName].MSOTlPn_Maximized.value = "True"
    } else {
        document.getElementById("MSOTlPn_Tbl").style.width = "225px";
        b += document.dir == "rtl" ? "tpmin.gif" : "tpmax.gif";
        a.title = Strings.STS.L_ToolPaneWidenToolTip_TXT;
        a.alt = Strings.STS.L_ToolPaneWidenToolTip_TXT;
        a.parentNode.title = Strings.STS.L_ToolPaneWidenToolTip_TXT;
        d = -1;
        document.forms[MSOWebPartPageFormName].MSOTlPn_Maximized.value = "False"
    }
    a.src = b;
    var c = document.getElementById("MSOTlPn_Tbl");
    try {
        if (c != null && c.getAttribute("ms-TlPnWiden") == "true") c.style.pixelWidth += d * MSOChangeInToolPaneWidth
    } catch (e) {}
}

function MSOTlPn_WindowResize() {
    a:;
    var c = document.getElementById("MSOTlPn_MainTD");
    if (c == null || c.offsetWidth == 0) return;
    var g = c.offsetWidth,
        h = document.body.offsetWidth - document.body.clientWidth,
        f = document.getElementById("MSOTlPn_WebPartPageDiv");
    if (f.offsetWidth + c.offsetWidth == document.body.clientWidth) return;
    var e = 0,
        a = f.offsetParent,
        b = 0;
    while (a != null) {
        if (document.dir != "rtl") {
            b = a.offsetLeft + (a.offsetWidth - (a.clientLeft + a.clientWidth));
            if (a.offsetParent != null) b += a.offsetParent.clientLeft
        } else b = a.offsetParent != null ? a.offsetParent.offsetWidth - (a.offsetLeft + a.offsetWidth) : 0;
        e += b;
        a = a.offsetParent
    }
    e -= h;
    var d = document.body.clientWidth - (e + g);
    if (d < 250) d = 250;document.getElementById("MSO_tblPageBody").style.pixelWidth = d + g;f.style.pixelWidth = d;window.event.type == "load" && document.getElementById("MSOTlPn_TlPnCaptionSpan") != null && document.getElementById("MSOTlPn_TlPnCaptionSpan").scrollIntoView(false)
}

function MSOTlPn_CheckUrl() {
    a:;
    var b = /[& | \?]ToolPaneView=[-0-9A-Z]*/ig,
        c = /[& | \?]DisplayMode=[a-zA-Z]*/ig,
        d = document.forms[MSOWebPartPageFormName].action,
        a;a = MSOMode_RemoveMode(document.forms[MSOWebPartPageFormName].action, b);a = MSOMode_RemoveMode(document.forms[MSOWebPartPageFormName].action, c);document.forms[MSOWebPartPageFormName].action = a
}

function MSOTlPn_Resize(b) {
    if (MSOTlPn_prevWidth != b.clientWidth) {
        MSOTlPn_prevWidth = b.clientWidth;
        MSOTlPn_WindowResize()
    }
    if (MSOTlPn_prevHeight != document.body.clientHeight) {
        MSOTlPn_prevHeight = document.body.clientHeight;
        var a = document.getElementById("MSOTlPn_WebPartPageDiv");
        a.style.height = "100%";
        a.style.height = String(a.offsetHeight)
    }
}

function MSOWebPartPage_SetupFixedWidthWebParts() {
    a:;
    var a = documentGetElementsByName("MSOFixedWidthTitle");
    if (a != null)
        if (a.length > 0)
            for (var b = 0; b < a.length; b++) a[b].style.width = String(MSOWebPartPage_AllocateSpaceForFirstTD(a[b])) + "px"
}

function MSOWebPartPage_AllocateSpaceForFirstTD(f) {
    var c = document.createElement("DIV");
    c.style.width = f.getAttribute("fixedWidth");
    document.body.appendChild(c);
    var d = c.offsetWidth;
    document.body.removeChild(c);
    var e = MSOLayout_GetParentTable(f);
    if (e != 0)
        for (var b = e.rows[0], a = 2; a < b.cells.length; a++)
            if (b.cells[a].style.display != "none" && GetCurrentEltStyle(b.cells[a], "display") != "none") d -= b.cells[a].offsetWidth;
    return d < 1 ? 1 : d
}

function MSOWebPartPage_FindControlName(d) {
    a:;
    var b = document.getElementsByTagName("label");
    if (b != null)
        for (var c = 0; c < b.length; c++) {
            var a = b[c];
            if (a.innerText == d)
                if (typeof a.htmlFor != "undefined" && typeof a.htmlFor.indexOf != "undefined")
                    if (a.htmlFor.indexOf("_EDITOR") != -1) return a.htmlFor
        }
    return null
}

function MSOTlPn_ListViewChange(a) {
    a:;
    if (MSOTlPn_shownViewChangeWarning) return;alert(a);MSOTlPn_shownViewChangeWarning = true
}

function MSOTlPn_CustomWindowResize() {
    a:;
    var a = document.getElementById("MSOTlPn_Tbl");
    if (a == null || a.offsetWidth == 0) return;a.style.pixelWidth = document.body.clientWidth
}

function MSOTlPn_ShowListFilter() {
    a:;
    if (document.getElementById("WebPartListFilter").style.display == "none") {
        document.getElementById("WebPartListFilter").style.display = "block";
        document.forms[MSOWebPartPageFormName].MSOGallery_FilterVisible.value = "true"
    } else {
        document.getElementById("WebPartListFilter").style.display = "none";
        document.forms[MSOWebPartPageFormName].MSOGallery_FilterVisible.value = "false"
    }
}

function MSOGallery_GetCookie(d) {
    a:;
    var c = d + "=",
        a = document.cookie.indexOf(c);
    if (a == -1) return null;
    var b = document.cookie.indexOf(";", a + c.length);
    if (b == -1) b = document.cookie.length;
    return unescape(document.cookie.substring(a + c.length, b))
}

function MSOTlPn_ShowAllUsersToolPane(a, c, b) {
    a:;MSOLayout_CheckAndSaveChanges();document.forms[MSOWebPartPageFormName].action = MSOMode_GetNewUrl(true);MSOTlPn_ShowToolPane2Wrapper(a, c, b)
}

function MSOLayout_MakeInvisibleIfEmpty() {
    a:;
    for (var b = document.getElementsByName("_invisibleIfEmpty"), c = navigator.userAgent.toLowerCase(), d = c.indexOf("mozilla") != -1 && c.indexOf("spoofer") == -1 && c.indexOf("compatible") == -1, e = c.indexOf("msie") != -1, a = 0; a < b.length; a++)
        if (e && b[a].childNodes.length == 0 || d && b[a].childNodes.length <= 1) b[a].style.display = "none"
}

function MSOLayout_GetParentRow(b) {
    a:;
    var a = b.parentNode;
    while (a.tagName != "TR" && a.tagName != "BODY") a = a.parentNode;
    return a.tagName != "TR" ? null : a
}

function MSOLayout_GetParentTable(b) {
    for (var a = b; a.tagName != "TABLE"; a = a.parentNode)
        if (a == document.body) return 0;
    return a
}
var browserScript;
$_global_ie55up();