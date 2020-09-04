/** 
 * App Page Notes
 */

import { format as df } from '/js/date.js';
import { css, doms, elem } from '/js/wall.js';

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
const textarea = doms('textarea'); // could return new WallElemTextArea()
const ta = textarea;
div.append(ta);
ta.autogrow();
// or
doms((div,textarea)=>div(
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

function tabIndent(ta) {
	ta.on('keydown', function(e){
		var keyCode = e.keyCode || e.which;
		if (keyCode == 9) {
			e.preventDefault();
			var start = this.selectionStart;
			var end = this.selectionEnd;

			// set textarea value to: text before caret + tab + text after caret
			$(this).val($(this).val().substring(0, start)
				+ "\t"
				+ $(this).val().substring(end));

			// put caret at right position again
			this.selectionStart =
			this.selectionEnd = start + 1;
		}
	});
}

function focusNextElement() {
    //add all elements we want to include in our selection
    var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    if (document.activeElement && document.activeElement.form) {
        var focussable = Array.prototype.filter.call(document.activeElement.form.querySelectorAll(focussableElements),
        function (element) {
            //check for visibility while always include the current activeElement 
            return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
        });
        var index = focussable.indexOf(document.activeElement);
        if(index > -1) {
           var nextElement = focussable[index + 1] || focussable[0];
           nextElement.focus();
        }                    
    }
}


const dfTime = df`h:mm:ss tt`;
class NoteEntry {
	constructor() {
		this.outer = elem(doms((div,textarea)=>div`class=note`(
			this.elemTime = elem(div`class=note-time`()),
			this.textarea = elem(textarea())
		)));
		this.textarea.on('input', this.doOnInput.bind(this));
		autogrow(this.textarea);
		tabIndent(this.textarea);
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
		this.outer = doms((div, textarea)=>div(
			this.stack = elem(div`class=note-stack`()),
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

export function main() {
	const notes = new NoteSystem();
	return notes.outer;
}
