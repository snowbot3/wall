/**
 * Concept
 * Wall Page
 * and Pager
 */

/*
This concept is to simulate some simple page/window concepts for ajax paging...
*/

class WallPage {
    constructor(){
    }
    /** Events
     * onload, onbeforeunload
     */
    get title() {
        return window.title;
    }
    set title(title) {
        window.title = title;
    }
}

/*
All this concept does currently is manage which pages are loaded
not really needed since import(previously imported js) should be fast.
*/
class WallPager {
    #map = {};
    #path;
    #default;
    constructor(path, default) {
        if (path[path.length-1] != '/') {
            path += '/';
        }
        this.#path = path;
        this.#default = default;
    }
    async #safeLoad(url) {
        // returns null if no module
        try {
            const module = await import(url);
            if  (module && module.page) {
                this.#map[mjs] = module;
                return module;
            }
        } finally() {}
        return null;
    }
    async #loadDefault() {
        // is this faster than (typeof default === 'string')
        if (this.#default instanceof WallPage) {
            return this.#default;
        }
        if (this.#default instanceof String) {
            const url = this.#path + this.#default;
            return this.#default = this.#safeLoad(url);
        }
        return null;
    }
    async load(mjs) {
        if (mjs in this.#map) {
            return this.#map[mjs];
        }
        const url = this.#path + mjs;
        // there should be a default like 404
        let module = this.#safeLoad(url);
        if (module === null) {
            module = this.#loadDefault();
        }
        // might be swap out time.
        // swap would run events.
        return module;
    }
}
