console.log("kontrolki started");
var Utils = /** @class */ (function () {
    function Utils() {
        this.getIt = {
            idTag: function (id) {
                document.getElementById(id);
            },
            classTag: function (id) {
                document.getElementsByClassName(id);
            }
        };
        this.show = function (id, text) {
            document.getElementById(id).innerHTML = text;
        };
        this.listen = {
            click: function (id, set) {
                document.getElementById(id).addEventListener("click", set);
            }
        };
        this.append = {
            div: function (idvalue, stylevalue, target, text) {
                this.childNode = document.createElement("div");
                this.childNode.setAttribute("id", idvalue);
                this.childNode.setAttribute("class", stylevalue);
                this.textNode = document.createTextNode(text);
                this.childNode.appendChild(this.textNode);
                document.getElementById(target).appendChild(this.childNode);
            },
            span: function (idvalue, target, text) {
                this.childNode = document.createElement("span");
                if (idvalue.length !== 0) {
                    this.childNode.setAttribute("id", idvalue);
                }
                this.textNode = document.createTextNode(text);
                this.childNode.appendChild(this.textNode);
                document.getElementById(target).appendChild(this.childNode);
            },
            canvas: function (idvalue, target) {
                this.childNode = document.createElement("canvas");
                this.childNode.setAttribute("id", idvalue);
                document.getElementById(target).appendChild(this.childNode);
            },
            header: {
                h1: function (idvalue, stylevalue, target, text) {
                    this.childNode = document.createElement("h1");
                    this.textNode = document.createTextNode(text);
                    this.childNode.appendChild(this.textNode);
                    document.getElementById(target).appendChild(this.childNode);
                },
                h2: function (idvalue, stylevalue, target, text) {
                    this.childNode = document.createElement("h1");
                    this.textNode = document.createTextNode(text);
                    this.childNode.appendChild(this.textNode);
                    document.getElementById(target).appendChild(this.childNode);
                },
                h3: function (idvalue, stylevalue, target, text) {
                    this.childNode = document.createElement("h3");
                    this.textNode = document.createTextNode(text);
                    this.childNode.appendChild(this.textNode);
                    document.getElementById(target).appendChild(this.childNode);
                },
            },
            divSpan: {
                span: function (idvalue, stylevalue, target, textDiv, textId) {
                    utils.append.div(idvalue, stylevalue, target, textDiv);
                    utils.append.span("", idvalue, textId);
                },
                spanId: function (idvalueSpan, idvalueDiv, stylevalue, target, textDiv, textId) {
                    utils.append.div(idvalueDiv, stylevalue, target, textDiv);
                    utils.append.span(idvalueSpan, idvalueDiv, textId);
                }
            }
        };
        console.log("utils started");
    }
    Utils.prototype.removeElements = function (elms) {
        Array.from(elms).forEach(function (el) { return el.remove(); });
    };
    Utils.prototype.reset = function (elms) {
        this.removeElements(document.querySelectorAll(elms));
    };
    return Utils;
}());
;
var utils = new Utils();
