import { dom, elem } from '/js/wall.js';

/**
 * view concepts:
 *   The pieces so cmds does not include wall dom
 * raw: string contains html to translate
 * div: div(...div())
 * ol: ol(...li())
 * anchor
 * img
 */
export function div(...args) {
    const div = dom`div`;
    const outer = elem(div());
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
    return dom`a target=_blank href=${url}`(txt || url);
}
export function img(url) {
    return dom`img src=${url}`();
}
export function raw(raw) {
    const div = dom`div`();
    div.innerHTML = raw;
    return Array.from(div.children);
}

const domDiv = dom`div`;
function more(elem, text) {
    const extra = domDiv(elem);
    extra.style.display = 'none';
    const toggle = function(){
        if (extra.style.display == 'none') {
            extra.style.display = '';
        } else {
            extra.style.display = 'none';
        }
    };
    return domDiv(dom`button type=button onclick=${toggle}`(text||'More'), extra);
}
function jsonLine(line){
    const indent = line.search(/\S/);
    const div = domDiv(line);
    div.style.paddingLeft = `${indent}em`;
    return div;
}
function jsonOnly(json) {
    const lines = JSON.stringify(json,null,2).split('\n').map(jsonLine);
    return domDiv(...lines);
};
// json (url, json=>view)
export async function json(url, view) {
    const data = await((await fetch(url)).json());
    const stackView = [];
    const divJson = jsonOnly(data);
    if (view && view.call) {
        stackView.push(view(data));
        stackView.push(more(divJson, 'json'));
    } else {
        stackView.push(divJson);
    }
    return div(...stackView);
}

// hard set 10 max per page
export async function pagination(arr, view) {
    //
}