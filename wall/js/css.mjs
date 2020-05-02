/** wall-css **/

class WallSheet {
    #elem;
    constructor() {
        this.elem = document.createElement('style');
        document.head.appendChild(this.elem);
    }
    get sheet() {
        return this.elem.sheet;
    }
    insert(data, index) {
        console.log(this.sheet);
        index = index || this.sheet.cssRules.length;
        this.sheet.insertRule(data, index);
    }
    css(...params) {
        params.forEach(this.insert, this);
    }
    // mimic the DomStyleElement
    get disabled() {
        return this.elem.disabled;
    }
    set disabled(bool) {
        this.elem.disabled = bool;
    }
    // alternative
    enable() {
        this.disabled = false;
    }
    disable() {
        this.disabled = true;
    }
}

export function sheet() {
    const sheet = new WallSheet();
    // sheet.apply(); // must be done in class constructor.
    return sheet;
}

let globalSheet;
export function css(...params) {
    if ( !globalSheet ) {
        globalSheet = sheet();
    }
    globalSheet.css(...params);
}
