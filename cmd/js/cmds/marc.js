// marc table concept command?
import { css, dom, elem } from '../wall.js';
import exdata from './marcdata.js';

css(`
table.marc {
    width: 100%;
    box-sizing: border-box;
    border-collapse: collapse;
}
`,`
table.marc >tbody:nth-child(even) >tr {
    background: #eee;
}
`,`
table.marc td > input {
    width: 100%;
    box-sizing: border-box;
}
`,`
table.marc:focus {
    outline:none;
}
`,`
table.marc:focus td.point {
    outline: 2px auto;
}
`,`
table.marc button {
    display: none;
}
`,`
table.marc:focus tr.point button {
    display: inline-block;
}
`);

const table = dom`table`;
const thead = dom`thead`;
const tbody = dom`tbody`;
const tr = dom`tr`;
const th = dom`th`;
const td = dom`td`;
const input = dom`input`;
const button = dom`button type=button`;

function mapSubfield(key, field, subfield, ind) {
    const subkey = Object.keys(subfield)[0];
    if (ind == 0) {
        return tr(
            td(key),
            td(field.ind1),
            td(field.ind2),
            td(subkey),
            td(subfield[subkey]),
            td(button('...'))
        );
    }
    return tr(
        td(),td(),td(),
        td(subkey),
        td(subfield[subkey]),
        td(button('...'))
    );
}

function mapField(field) {
    const key = Object.keys(field)[0];
    function wrapSub(subfield, ind) {
        return mapSubfield(key, field[key], subfield, ind);
    }
    //return doms(function(tbody, tr,td){
        if (field[key].subfields) {
            var temp = field[key];
            temp = temp.subfields;
            temp = temp.map(wrapSub);
            return tbody(
                ...temp
            );
        }
        return tbody( tr(
            td(key),
            td(),
            td(),
            td(),
            td(field[key]),
            td(button('...'))
        ));
    //});
}

export function marc() {
    //return doms(function(table, thead, tr, th, tbody, td){
        const bug = elem(table`class=marc`(
            thead(tr(
                th('Tag'),
                th('Ind1'),
                th('Ind2'),
                th('Code'),
                th('Data'),
                th('Action')
            )),
            tbody(
                tr(
                    td('LDR'),
                    td(),
                    td(),
                    td(),
                    td(exdata.leader),
                    td(button('...'))
                )
            ),
            ...(
                exdata.fields.map(mapField)
            )
        ));
        bug.elem.setAttribute('tabindex', '0');
        let row = 0;
        let column = 4;
        function movePoint() {
            bug.query('.point').forEach(e=>e.classList.remove('point'));
            const tr = bug.query('tbody >tr').get(row);
            tr.elem.classList.add('point');
            const point = tr.query('td')[column];
            point.classList.add('point');
            point.scrollIntoViewIfNeeded();
        }
        bug.query('button').forEach(e=>e.setAttribute('tabindex','-1'));
        bug.on('focus', function(ev){
            console.log('table focused: ', ev.target);
            movePoint();
        });
        bug.on('blur', function(ev){
            console.log('table blur: ', ev.target);
        });
        bug.on('keydown', function(ev) {
            if (ev.key == 'Down' || ev.key == 'ArrowDown') {
                ev.preventDefault();
                const length = bug.query('tbody >tr').length;
                if (row < length - 1) {
                    row += 1;
                    movePoint();
                }
            } else if (ev.key == 'Up' || ev.key == 'ArrowUp') {
                ev.preventDefault();
                if (row > 0) {
                    row -= 1;
                    movePoint();
                }
            } else if (ev.key == 'Left' || ev.key == 'ArrowLeft') {
                ev.preventDefault();
                if (column > 0) {
                    // TODO: smart skipping?
                    // do not go to cells that cannot be changed?
                    // such as tag,ind1,ind2 and code for LDR row.
                    column -= 1;
                    movePoint();
                }
            } else if (ev.key == 'Right' || ev.key == 'ArrowRight') {
                ev.preventDefault();
                if (column < 5) {
                    column += 1;
                    movePoint();
                }
            }
        });
        return bug.elem;
    //});
}
