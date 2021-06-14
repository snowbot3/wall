// cmds
// simple commands
export function echo(...args) { return args.join(' '); }
export function date() { return '' + new Date(); }
export function clear() { location.reload(); return 'Please wait.'; }
