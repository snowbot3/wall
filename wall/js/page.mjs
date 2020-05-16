/**
 * Concept
 * Wall Page
 * and Pager
 */

import { WallElem } from './elem.mjs';

/*
This concept is to simulate some simple page/window concepts for ajax paging...
I would also like WallPage to be the root WallElem
*/
class WallPage extends WallElem {
    constructor(elemName){
        super(elemName);
    }
    get title() {
        return window.title;
    }
    set title(title) {
        window.title = title;
    }
    /** Events
     * mimic: onload, onbeforeunload
     * onWallPageLoad, onWallPageBeforeUnload?
     */
    /*
    const static EVLOAD = 'WallPageLoad';
    const static EVUNLOAD = 'WallPageBeforeUnload';
    load() {
        this.fire?('WallPageLoad') // Dispatches?
    }
    onload(fn) {
        this.on('WallPageLoad', fn);
    }
    unload() {
        this.fire?('WallPageBeforeUnload');
    }
    onunload(fn) {
        this.on('WallPageBeforeUnload', fn);
    }
    */
}

/*
All this concept does currently is manage which pages are loaded
not really needed since import(previously imported js) should be fast.
*/
class WallPager {
    #pather;
    #default;
    constructor(path, default) {
        if (path instanceof String) {
            if (path[path.length-1] != '/') {
                path += '/';
            }
            this.#pather = key=>`${path}${key}.mjs`;
        } else (path instanceof Function) {
            this.#pather = path;
        } else {
            throw 'WallPager requires a function for url path from hash key';
        }
        this.#default = default; // should be a default key
    }
    async #safeLoad(url) {
        // returns null if no module
        try {
            const module = await import(url);
            if  (module && module.default) {
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
    async load(key) { // do I need this?
        const url = this.#pather(key);
        let module = this.#safeLoad(url);
        if (module === null) {
            module = this.#loadDefault();
        }
        return module;
    }
    /**
     * Concepts:
     *  pager.nav('settings');
     *  pager.load('settings').then(mod=>mod.count()&&pager.nav(mod));
     */
    async nav(key) {
        // async if this front ends and calls load,
        // not-async(sync) if load calls it, or they are called separately
        // could allow mjs to be String or module.
        if (key instanceof String) {
            key = await this.load(key);
        }
        // triggers load events as well as swapping the pages.
        if (key) {
            const page = key.default();
            if (page instanceof WallPage) {
                return page;
            }
        }
        // cannot fire events until the elem is on the document...
        return null;
    }
}
