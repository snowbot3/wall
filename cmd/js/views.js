import * as view from './view.js';
import { css, doms, dom, elem } from '/js/wall.js';

// css.

// would rather this in 'view.js' and simplified
export function json(json) {
    const divLine = dom`div class=view-json-line`;
    console.log('view json function');
    let temp = JSON.stringify(json, null, 2);
    console.log('0.1: ', temp);
    temp = temp.split('\n');
    console.log('0.2: ', temp);
    temp = temp.map(function(p) {
        console.log('p: ', p);
        const indent = p.search(/\S/);
        const div = divLine(p);
        div.style.paddingLeft = '' + indent + 'em';
        return div;
    });
    console.log('0.3: ', temp);
    return dom`div class=view-json`(...temp);
};

function more(elem, text) {
    return doms(function(div,button){
        const extra = div(elem);
        extra.style.display = 'none';
        const toggle = function(){
            if (extra.style.display == 'none') {
                extra.style.display = '';
            } else {
                extra.style.display = 'none';
            }
        };
        return div`class=view-more`(button`type=button onclick=${toggle}`(text||'More'), extra);
    });
}

// specific
export function tvshow(data) {
    const limit = data.slice(0,5);
    return doms(function(div,ol,li,a){
        const lis = limit.map(function(show){
            const desc = view.raw(show.show.summary);
            return li(
                a`target=_blank href=${show.show.url}`(show.show.name),
                ...desc
            );
        });
        const asJson = data.map(p=>json(p));
        return div(
            ol(...lis),
            more(view.ol(...asJson), 'Show JSON')
        );
    });
}

export function div(...args) {
    const div = elem`div`;
    const outer = div();
    for (let arg of args) {
        outer.append(div(arg));
    }
    return outer;
}
export function ol(...args) {
    const li = dom`li`;
    const ol = elem`ol`();
    for (let arg of args) {
        ol.append(li(arg));
    }
    return ol;
}
export function anchor(url,txt) {
    return dom`a href=${url}`(txt || url);
}


/**
 * view concepts:
 * raw: string contains html to translate
 * div: div(...div())
 * ol: ol(...li())
 *
 */
