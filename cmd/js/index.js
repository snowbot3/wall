/** 
 * Cmd Site
 */

import { css, doms, dom, elem } from './wall.js';
import * as cmd from './cmd.js';
css.link('/css/global.css');

const divOutput = elem`div class=l-output`();
const inputCmd = dom`input autofocus`();
const divPage = elem`div class=page`;

function page(title, content) {
	return doms(function(div){
		return div`class=page`(
			div`class=page-title`(title),
			div`class=page-content`(content)
		);
	});
}

function refocus() {
	inputCmd.scrollIntoView();
	inputCmd.focus();
}
function afterCmd() {
	inputCmd.value = '';
	inputCmd.disabled = false;
	refocus();
}
document.documentElement.addEventListener('keydown', function(ev){
	if (ev.key == 'Escape') {
		refocus();
	}
});

function doSubmit(ev) {
	ev.preventDefault();
	const line = inputCmd.value;
	inputCmd.disabled = true;
	cmd.exec(line).then(function(result){
		console.log('wall-cmd: do submit');
		divOutput.append(page(line, result));
		afterCmd();
	}).catch(function(er){
		console.error(er);
		divOutput.append(divPage('ERROR: ' + er));
		afterCmd();
	});
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
