console.log("kontrolki started");

class Utils {
  childNode: any;
  textNode: any;
  constructor() {
    console.log("utils started");
  }
  removeElements(elms): any {
    Array.from(elms).forEach(el => el.remove());
  }
  reset(elms) {
    this.removeElements(document.querySelectorAll(elms));
  }
  getIt = {
    idTag(id: string): any {
      document.getElementById(id);
    },
    classTag(id: string): any {
      document.getElementsByClassName(id);
    }
  }
  show = (id: string, text: any): any => {
    document.getElementById(id).innerHTML = text;
  }
  listen = {
    click(id: string, set: any) {
      document.getElementById(id).addEventListener("click", set);
    }
  }
  append = {
    div(idvalue: string, stylevalue: string, target: string, text: any): any {
      this.childNode = document.createElement("div");
      this.childNode.setAttribute("id", idvalue);
      this.childNode.setAttribute("class", stylevalue);
      this.textNode = document.createTextNode(text);
      this.childNode.appendChild(this.textNode);
      document.getElementById(target).appendChild(this.childNode);
    },
    span(idvalue: string, target: string, text: any): any {
      this.childNode = document.createElement("span");
      if (idvalue.length !== 0) {
        this.childNode.setAttribute("id", idvalue);
      }
      this.textNode = document.createTextNode(text);
      this.childNode.appendChild(this.textNode);
      document.getElementById(target).appendChild(this.childNode);
    },
    canvas(idvalue: string, target: string): any {
      this.childNode = document.createElement("canvas");
      this.childNode.setAttribute("id", idvalue);
      document.getElementById(target).appendChild(this.childNode);
    },
    header: {
      h1(idvalue: string, stylevalue: string, target: string, text: any): any {
        this.childNode = document.createElement("h1");
        this.textNode = document.createTextNode(text);
        this.childNode.appendChild(this.textNode);
        document.getElementById(target).appendChild(this.childNode);
      },
      h2(idvalue: string, stylevalue: string, target: string, text: any): any {
        this.childNode = document.createElement("h1");
        this.textNode = document.createTextNode(text);
        this.childNode.appendChild(this.textNode);
        document.getElementById(target).appendChild(this.childNode);
      },
      h3(idvalue: string, stylevalue: string, target: string, text: any): any {
        this.childNode = document.createElement("h3");
        this.textNode = document.createTextNode(text);
        this.childNode.appendChild(this.textNode);
        document.getElementById(target).appendChild(this.childNode);
      },
    },
    divSpan: {
      span(idvalue: string, stylevalue: string, target: string, textDiv: any, textId: any): any {
        utils.append.div(idvalue, stylevalue, target, textDiv);
        utils.append.span("", idvalue, textId);
      },
      spanId(idvalueSpan: string, idvalueDiv: string, stylevalue: string, target: string, textDiv: any, textId: any): any {
        utils.append.div(idvalueDiv, stylevalue, target, textDiv);
        utils.append.span(idvalueSpan, idvalueDiv, textId);
      }
    }
  };
};

let utils = new Utils();