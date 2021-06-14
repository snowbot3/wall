// cmd
import * as cmds from './cmds.js';

//s.match(/(?:[^\s"]+|"[^"]*")+/g)
const regSplit = /(?:[^\s"]+|"[^"]*")+/g;

function split(line) {
    // cmd arg1 'arg 2' "arg 3" -arg4 +arg5
    return line.match(regSplit);
}

export async function exec(line) {
    if (typeof line == 'string') {
        line = split(line.trim());
    }
    if (!line || (line.length == 0 && line == '')) {
        return '';
    }
    const arg0 = line.shift();
    if (arg0 == 'cmds') {
        return Object.keys(cmds).join(' ');
    } else if (arg0 in cmds) {
        const cmd = cmds[arg0];
        if (cmd.apply) {
            return await cmd.apply(this, line);
        } else {
            return 'Non-Function: ' + cmd;
        }
    } else {
        return 'Unknown cmd: ' + arg0 + ' ' + line.join(' ');
    }
};
