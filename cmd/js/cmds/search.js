// search/fetch commands
import * as view from '../view.js';
import * as views from '../views.js';

// useful maybe? https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/

async function fetchJson(url) {
    const result = await fetch(url);
    return await result.json();
}

export async function cat() {
    const json = await fetchJson('https://cat-fact.herokuapp.com/facts');
    const text = json.map(r=>r.text);
    return view.ol(...text);
}

export async function ip() {
    const json = await fetchJson('https://api.ipify.org/?format=json');
    return json.ip;
}

export async function joke() {
    // https://v2.jokeapi.dev/joke/Any
    const json = await fetchJson('https://v2.jokeapi.dev/joke/Any');
    const joke = [
        json.joke,
        json.setup,
        json.delivery
    ].filter(j=>j);
    const flags = [];
    for (let key in json.flags) {
        if (json.flags[key]) {
            flags.push(key);
        }
    }
    return view.div(
        ...joke,
        'Flags: ' + flags.join(', ')
    );
}

export async function tv(...args) {
    // https://www.tvmaze.com/api
    // http://api.tvmaze.com/search/shows?q=golden%20girls
    const query = escape(args.join(' '));
    const json = await fetchJson('http://api.tvmaze.com/search/shows?q=' + query);
    return views.tvshow2(json);
}

export async function search(...args) {
    // https://api.duckduckgo.com/?q=cats&format=json
    const json = await fetchJson('https://api.duckduckgo.com/?format=json&pretty=1&q='+args.join('+'));
    console.log('search: ', json);
    return views.json(json);
    //return 'search unfinished: ' + JSON.stringify(json, null, 4);
}

export async function api() {
    // https://github.com/marciovsena/abibliadigital/blob/master/DOCUMENTATION.md/
    const json = await fetchJson('https://api.publicapis.org/entries');
    return views.json(json);
}

export async function bible(...args) {
    // https://github.com/marciovsena/abibliadigital/blob/master/DOCUMENTATION.md/
    // https://www.abibliadigital.com.br/api/versions
    //const json = await fetchJson('https://www.abibliadigital.com.br/api/versions');
    const json = await fetchJson('https://www.abibliadigital.com.br/api/verses/kjv/random');
    return views.div(
        `${json.book.name} ${json.chapter}:${json.number} (${json.book.version})`,
        json.text);
    //return views.json(json);
    //return "God's not done yet.";
}