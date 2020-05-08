/** wall-elem **/

//import { is as isType, isSimpleObject, run as typeRun } from './type.mjs';
import * as wall_type from './type.mjs';

export class WallElem {
    constructor(node) {
        this.elem = node;
    }
    _appendSingle(...args) {
        wall_type.run(this, args,
            [WallElem], function(elem) {
                this.elem.appendChild(elem.elem);
            },
            [Node], function(node) {
                this.elem.appendChild(node);
            },
            function(arg) {
                this.elem.appendChild(
                    document.createTextNode(arg)
                );
            });
    }
    append(...args) {
        args.forEach(function(arg){
            this._appendSingle(arg);
        }, this);
    }
    props(props) {
        for (let key in props) {
            this.prop(key, props[key]);
        }
    }
    // for [String, Object] the prop settings should be recursive
    prop(...args) {
        return wall_type.run(this, args,
            [String], function(key) {
                return this.elem[key];
            },
            [String, 'any'], function(key, val) {
                this.elem[key] = val;
            },
            function(arg){
                throw new Error(`wall-elem: ${args}`);
            });
    }
    get text() {
        return this.elem.textContent;
    }
    set text(val) {
        this.elem.textContent = val;
    }
    query(selector) {
        const list = this.elem.querySelectorAll(selector);
        return Array.prototype.map.call(list, (el)=>new WallElem(el));
    }
    remove() {
        return this.elem.remove();
    }
    comp() {
        return window.getComputedStyle(this.elem);
    }
}

export function elem(node, ...params /*...props, ...children*/) {
    if (wall_type.is(String, node)) {
        node = document.createElement(node);
    } else if (wall_type.is(WallElem, node)) {
        node = node.elem;
    }
    if (!wall_type.is(Node, node)) {
        throw new Error('not allowed argument types');
    }
    const elem = new WallElem(node);
    while (params.length > 0 && wall_type.is('simple', params[0])) {
        elem.props(params.shift());
    }
    elem.append(...params);
    return elem;
}
