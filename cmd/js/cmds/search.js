// search/fetch commands
import * as view from '../view.js';
import * as views from '../views.js';

// useful maybe? https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/

export async function cat() {
    const result = await fetch('https://cat-fact.herokuapp.com/facts');
    const json = await result.json();
    const text = json.map(r=>r.text);
    return view.ol(...text);
}

export async function tv(...args) {
    // https://www.tvmaze.com/api
    // http://api.tvmaze.com/search/shows?q=golden%20girls
    const query = escape(args.join(' '));
    const result = await fetch('http://api.tvmaze.com/search/shows?q=' + query);
    const json = await result.json();
    return views.tvshow(json);
}

export async function search(...args) {
    // https://api.duckduckgo.com/?q=cats&format=json
    const result = await fetch('https://api.duckduckgo.com/?format=json&pretty=1&q='+args.join('+'));
    const json = await result.json();
    console.log('search: ', json);
    return views.json(json);
    //return 'search unfinished: ' + JSON.stringify(json, null, 4);
}
