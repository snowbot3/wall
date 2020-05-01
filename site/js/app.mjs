/** 
 * App Notes
 */

import { css, dom, elem } from './wall/all.mjs';

css(`html {
    height: 100%;
    margin: 0;
}`, `body {
    height: 100%;
    margin: 0;
}`, `layout-outer {
    min-height: 100%;
    display: grid;
    grid-template-rows: 150px auto;
    grid-template-columns: 200px auto;
    grid-template-areas:
        "head head"
        "side content"
}`, `layout-head {
    grid-area: head;
}`, `layout-side {
    grid-area: side;
}`, `layout-content {
    grid-area: content;
}`);
// base theming
//background: #191970;
css(`layout-head {
    background: linear-gradient(to bottom, #5252a3, #191970);
    color: #ffffff;
}`,`layout-side {
    background: #afeeee;
}`);

const head = elem('layout-head');
const side = elem('layout-side');
const content = elem('layout-content');
const outer = dom((layoutOuter)=>layoutOuter( head, side, content ));

const body = elem(document.body);
body.append(outer);
