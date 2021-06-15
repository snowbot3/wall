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
