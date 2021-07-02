/** wall rejected **/
// I waned to keep these, but am not using them currently

// a1,b1,c1,a2,c2,c3
export function merge(...a) {
	a = a.filter(a=>a instanceof Array);
	const res = [];
    for (let i=0; a.length>0; i++) {
        res.push(a.map(a=>a[i]));
        a = a.filter(a=>a.length<=i);
    }
    return res.flat();
}
export function arr(tmpl, ...params) {
	return merge(tmpl, params);
}
export function str(...params) {
	return arr(...params).join('');
}
