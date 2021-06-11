/** 
 * Cmd Site
 */

import { css, doms, dom, elem } from './wall.js';
css.link('/css/global.css');

const divOutput = elem`div class=l-output`();
const inputCmd = dom`input autofocus`();
const divPage = elem`div class=page`;

function doSubmit(ev) {
	ev.preventDefault();
	const cmd = inputCmd.value;
	divOutput.append(divPage(cmd));
	inputCmd.value = '';
	inputCmd.scrollIntoView();
	console.log('wall-cmd: do submit');
}

const body = elem(document.body);
body.append(doms(function(div, form){
	return div`class=l-outer`(
		divOutput,
		div`class=l-input`(
			form`onsubmit=${doSubmit}`(
				inputCmd
			)
		)
	);
}));
