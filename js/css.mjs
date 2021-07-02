/** wall-css **/

class WallSheet {
	//#elem;
	constructor(elem) {
		if (elem && (elem.tagName == 'LINK' || elem.tagName == 'STYLE')) {
			this.elem = elem;
		} else {
			this.elem = document.createElement('style');
			document.head.appendChild(this.elem);
		}
	}
	get sheet() {
		return this.elem.sheet;
	}
	insert(data, index) {
		// count '}'
		const rules = data.match(/[^{]+{[^}]+}/g);
		index = index || this.sheet.cssRules.length;
		if (!rules) { // no brackets
			throw new Error('wall-css: invalid rule: ' + data);
		} else if (rules.length == 1) {
			this.insertSingle(data, index);
		} else {
			for (let i=0; i<rules.length; i++) {
				this.insertSingle(rules[i], index + i);
			}
		}
	}
	insertSingle(data, index) {
		//index = index || this.sheet.cssRules.length;
		this.sheet.insertRule(data, index);
	}
	css(...params) {
		params.forEach(this.insert, this);
	}
	clear() {
		for (let i=this.sheet.cssRules.length-1; i>=0; i--) {
			this.sheet.deleteRule(i);
		}
	}
	// mimic the DomStyleElement
	get disabled() {
		return this.elem.disabled;
	}
	set disabled(bool) {
		this.elem.disabled = bool;
	}
	// alternative
	enable() {
		this.disabled = false;
	}
	disable() {
		this.disabled = true;
	}
}

export function link(url) {
	return new Promise(function(resolve) {
		const elem = document.createElement('link');
		Object.assign(elem, {
			href: url,
			rel: 'stylesheet',
			type: 'text/css',
			media: 'all'
		});
		elem.onload=function(){
			resolve(new WallSheet(elem));
		};
		document.head.appendChild(elem);
	});
}

export function sheet() {
	const sheet = new WallSheet();
	return sheet;
}

let globalSheet;
export default function css(...params) {
	if ( !globalSheet ) {
		globalSheet = sheet();
	}
	globalSheet.css(...params);
}
