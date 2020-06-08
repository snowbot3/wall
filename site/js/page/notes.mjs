/** 
 * App Page Notes
 */

import { format as df } from '/js/date.js';
import { css, dom, elem } from '/js/wall/all.mjs';

css(`div.note-stack {
	margin: 1em;
	padding: 1em;
	border: 1px solid navy;
}`,`div.note {
	position: relative;
}`,`div.note >.note-time {
	font-size: 0.8em;
	color: grey;
	position: absolute;
	top: 2px; right: 20px;
}`,`div.note >textarea {
	box-sizing: border-box;
	width: 100%;
	max-height: 50vh;
	margin: 0;
}`,`textarea.autogrow {
	resize: none;
}`);

// textarea autogrow and reset
// how would I want this?
/*
const textarea = dom('textarea'); // could return new WallElemTextArea()
const ta = textarea;
div.append(ta);
ta.autogrow();
// or
dom((div,textarea)=>div(
	textarea`autogrow`() // but if the function ever has arguments, we start hitting issues...
));
// I need to hit other special behaviors before deciding
*/
function autogrow(ta) {
	ta.elem.classList.add('autogrow');
	const h = ta.comp.height;
	if (h === '') {
		ta.on('focus', function() {
			autogrow(ta);
		}, { once: true });
		return;
	}
	const start = ta.elem.scrollHeight;
	const extra = parseInt(h) - start;
	ta.on('input', function() {
		ta.elem.style.height = 'inherit';
		const sh = ta.elem.scrollHeight + extra;
		ta.elem.style.height = '' + sh + 'px';
	});
}

const dfTime = df`h:mm:ss tt`;
class NoteEntry {
	constructor() {
		this.outer = dom((div,textarea)=>div`class=note`(
			this.elemTime = div`class=note-time`(),
			this.textarea = textarea()
		));
		this.textarea.on('input', this.doOnInput.bind(this));
		autogrow(this.textarea);
	}
	doOnInput(ev) {
		const { value } = this.textarea.elem;
		if ( this.started ) {
			if ( value.length === 0 ) {
				this.elemTime.clear();
				this.started = false;
				this.fireClear();
			}
		} else {
			if ( value.length > 0 ) {
				this.elemTime.text = dfTime(new Date());
				this.started = true;
				this.fireStart();
			}
		}
	}
	onStart(fn) { this.outer.on('NoteStart', fn.bind(this) ); }
	fireStart() { this.outer.fire('NoteStart'); }
	onClear(fn) { this.outer.on('NoteClear', fn.bind(this) ); }
	fireClear() { this.outer.fire('NoteClear'); }
}

/*
	function fn1(...args){
		console.log('::COF:: ', this, ...args);
	}
	fn1.call({a:'b'}, 'c'); // {'a':'b'} 'c'
	const fn2 = fn1.bind({d:'e'});
	fn2.call({f:'g'}, 'h'); // {'d':'e'} 'h'

	// desire?
	notesys.onStart(fn(ev){});
	function fnGoal() {}
* /
function fnReBind(fn, that) {
	that = that ?? this;
	return function(...params) {
		return fn.call(that, this, ...params);
	}
}
*/

class NoteSystem {
	constructor() {
		this.outer = dom((div, textarea)=>div(
			this.stack = div`class=note-stack`(),
		));
		this.createNote();
	}
	createNote() {
		const note = new NoteEntry();
		const that = this;
		this.stack.append(note.outer);
		note.onStart(function(ev){
			that.doOnNoteStart(this, ev);
		});
	}
	doOnNoteStart(note, ev) {
		const kids = this.stack.kids;
		console.log('note system: do on note start: ', kids, note.outer);
		if (kids[kids.length-1] === note.outer.elem) {
			console.log('in if');
			this.createNote();
		}
	}
}

export default function notes() {
	const notes = new NoteSystem();
	return notes.outer;
}
