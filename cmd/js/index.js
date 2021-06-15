/** 
 * Cmd Site
 */

import { css, doms, dom, elem } from './wall.js';
import * as cmd from './cmd.js';
css.link('/css/global.css');

const divOutput = elem`div class=l-output`();
const inputCmd = dom`input autofocus`();
const selectHistory = dom`select class=history`();
selectHistory.style.display = 'none';
selectHistory.size = 4;
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
	selectHistory.style.display = 'none';
	selectHistory.selectedIndex = -1;
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
inputCmd.addEventListener('keydown', function(ev){
	if (ev.key == 'Up' || ev.key == 'ArrowUp') {
		selectHistory.style.display = '';
		console.log('::COF:: ', selectHistory.selectedIndex);
		if (selectHistory.selectedIndex == -1) {
			console.log('::COF:: ', selectHistory.children.length);
			selectHistory.selectedIndex = selectHistory.children.length - 1;
			inputCmd.value = selectHistory.value;
		} else if (selectHistory.selectedIndex > 0){
			selectHistory.selectedIndex -= 1;
			inputCmd.value = selectHistory.value;
		}
	} else if (ev.key == 'Down' || ev.key == 'ArrowDown') {
		if (selectHistory.selectedIndex == selectHistory.children.length - 1) {
			selectHistory.selectedIndex = -1;
			inputCmd.value = selectHistory.value;
		} else if (selectHistory.selectedIndex < selectHistory.children.length - 1) {
			selectHistory.selectedIndex += 1;
			inputCmd.value = selectHistory.value;
		}
	}
});

function doSubmit(ev) {
	ev.preventDefault();
	const line = inputCmd.value;
	inputCmd.disabled = true;
	cmd.exec(line).then(function(result){
		console.log('wall-cmd: do submit');
		divOutput.append(page(line, result));
		if (selectHistory.value != line) {
			selectHistory.appendChild(dom`option`(line));
			if (selectHistory.children.length > 1 && selectHistory.children.length < 9) {
				selectHistory.size = selectHistory.children.length;
			}
		} else {
			selectHistory.appendChild(selectHistory.children[selectHistory.selectedIndex]);
		}
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
				selectHistory,
				inputCmd
			)
		)
	);
}));
