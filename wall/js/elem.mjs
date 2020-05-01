/** wall-elem **/

import { is as isType, isSimpleObject, run as typeRun } from './type.mjs';

export class WallElem {
    constructor(node) {
        this.elem = node;
    }
    _appendSingle(...args) {
        typeRun(this, args,
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
        return typeRun(this, args,
            [String], function(key) {
                return this.elem[key];
            },
            [String, String], function(key, val) {
                this.elem[key] = val;
            },
            function(arg){
                throw new Error(`wall-elem: ${args}`);
            });
    }
    get text() {
        return this.elem.innerText;
    }
    set text(val) {
        this.elem.innerText = val;
    }
    query(selector) {
        const list = this.elem.querySelectorAll(selector);
        return Array.prototype.map.call(list, (el)=>new WallElem(el));
    }
}

export function elem(node, props, ...children) {
    if (isType(String, node)) {
        node = document.createElement(node);
    } else if (isType(WallElem, node)) {
        node = node.elem;
    }
    if (!isType(Node, node)) {
        throw new Error('not allowed argument types');
    }
    const elem = new WallElem(node);
    if (props) {
        if (isSimpleObject(props)) {
            elem.props(props);
        } else {
            children.unshift(props);
        }
    }
    elem.append(...children);
    return elem;
}
