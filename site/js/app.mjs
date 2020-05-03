/** 
 * App Site
 */

import { css, dom, elem } from './wall/all.mjs';

css(`html {
    height: 100%;
    margin: 0;
}`, `body {
    height: 100%;
    margin: 0;
}`,`outer-main {
    display: block;
    height: 100%;
}`,`outer-footer {
    display: block;
    position: fixed;
    bottom: 0;
    right: 0;
    height: 100px;
    width: 200px;
}`);
// base theming
//background: #191970;
css(`layout-head {
    background: linear-gradient(to bottom, #5252a3, #191970);
    color: #ffffff;
}`,`layout-side {
    background: #afeeee;
}`);

const thLight = css.sheet();
thLight.css(`body {
    color: #000000;
}`, `outer-main {
    background: linear-gradient(to bottom, #dbdbff, #aaaaff);
}`, `outer-footer {
    background: #dbdbff;
    border: 1px solid #aaaaaa;
}`);

const thDark = css.sheet();
thDark.css(`body {
    color: #ffffff;
}`, `outer-main {
    background: linear-gradient(to bottom, #5252a3, #191970);
}`, `outer-footer {
    background: #5252a3;
    border: 1px solid black;
}`);
thLight.disable();

function swapDark(ev) {
    const btn = elem(ev.target);
    if (thLight.disabled) {
        thLight.enable();
        thDark.disable();
        btn.text='Dark (Off)';
    } else {
        thDark.enable();
        thLight.disable();
        btn.text='Dark (On)';
    }
}

const body = elem(document.body);

body.append(elem('outer-main', 'Content?'));
body.append(elem('outer-footer',
    elem('button', {
        onclick: swapDark
    }, 'Dark (On)')
));
