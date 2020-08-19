// This concept is changing. (ofcourse)
// I want to allow shorthand and I want something for loading and event tracking, but I do not want the dom templating connected to the shorthand.  Dom Templating should return native dom elements.

function elMain() {
	return dom(div=>div`class=outer`(
		div('Child Div'),
		'Content Text'
	));
}

document.body.appendChild(
	elMain()
);

const cannotOfuscate = dom(div=>div('function argument name is used as the element tagname'));
const staticArgs = dom('div class=temp',d=>d('with static class'));
const sharedName = 'something';
const sharedArgs = dom(`div class=${sharedName}`,d=>d('with variable class')); // has possible split problem
const newConcept = dom`div class=one`;
const part2 = dom(newConcept`class=two`, d=>d('1 or 2 class names?'));

// I like everything functions like this, but it is not from everyone.  How else can I do this?  This is exploring singletons, but the main concept is a larger section.

const layout = dom('div', 'span class="iblock"', (d,s)=>d`id=outer`(
	d('header'),
	d('menubar'),
	d`id=main`(
		s('leftSide'),
		s('content'),
		s('rightSide')
	),
	d('footer')
));

const quick = dom`div class=quick`('quick create');

const span = dom`span`;
span(span(span(span())));

const s2 = span`class=iblock`;
s2(s2(s2(s2())));

// I could rename the layout concept to DomTemplate. domTemp.
// I hate using the word temp... template temporary tempature... too many temps... doms? just adding an 's'?

// would fail?
const l2 = dom('div', 'span', (d,s)=>d(s()));

// ---------------------------
import { css, dom, doms } from '/js/wall.mjs';

// css.link('file for js'); // path based on html file still.
css(`.diff {
	font-weight: bold;
}`,`#outer {
	margin: 0 200px;
}`);

const l3 = doms('div', `span class=diff`, dom`span class=${sharedName}`, (d,s,s2)=>d(s(s2())));

// this step also makes the string version more useful
const l4 = doms((div,span)=>div(span()));

// this would also completly change elem.
// I want a shorthand concept, but I do not know what yet.
// the changes to dom (and doms) will allow jquery and other tools to be more usefull.

const jqDiv = $(doms('div',d=>d`div id=outer class=b1`(
	d( d(), d(), d() )
)));
jqDiv.appendTo(document.body);


import { shorthand as ws } from '/js/wall.mjs';
const d1 = ws(doms(div=>div(
	div(), div()
)));
d1.on('blur', ()=>that.onBlur());

// might stay with elem as name.
import { elem } from '/js/wall.mjs';
const d2 = elem(dom`div id=bar`('some kind of bar?'));
elem(document.body).append(d2);
d2.text += ' Oh!?  A counter top kind!';

// might reverse elem and dom current idea, so we can still skip double calling.
const d3 = elem`div id=sidebar`('like with a judge and lawyers?');
// => elem(dom(...stuff));
// do not call through to doms, just dom.
