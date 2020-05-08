/** wall-css **/

class WallSheet {
    #elem;
    constructor(url) {
        if (url) {
            this.#elem = document.createElement('link');
            Object.assign(this.#elem, {
                href: url,
                rel: 'stylesheet',
                type: 'text/css',
                media: 'all'
            });
        } else {
            this.#elem = document.createElement('style');
        }
        document.head.appendChild(this.#elem);
    }
    get sheet() {
        return this.#elem.sheet;
    }
    insert(data, index) {
        index = index || this.sheet.cssRules.length;
        this.sheet.insertRule(data, index);
    }
    css(...params) {
        params.forEach(this.insert, this);
    }
    clear() {
        for (let i=this.sheet.cssRules.length-1; i>=0; i--) {
            this.sheet.deleteRule(i);
        }
    }
    // mimic the DomStyleElement
    get disabled() {
        return this.#elem.disabled;
    }
    set disabled(bool) {
        this.#elem.disabled = bool;
    }
    // alternative
    enable() {
        this.disabled = false;
    }
    disable() {
        this.disabled = true;
    }
}

export function sheet(url) {
    const sheet = new WallSheet(url);
    return sheet;
}

let globalSheet;
export function css(...params) {
    if ( !globalSheet ) {
        globalSheet = sheet();
    }
    globalSheet.css(...params);
}
