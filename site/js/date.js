// pull from datejs:: Date.prototype.toString
// Not using datejs directly because Date.prototype.toString is not writable.
// so the simple formatting for DateJS is currently broken.
// https://github.com/datejs/Datejs
import './en-US.js';
const $C = Date.CultureInfo;

function p (s, l) {
	if (!l) {
		l = 2;
	}
	return ("000" + s).slice(l * -1);
}

function date2str(x, format) {
	var ord = function (n) {
			switch (n * 1) {
			case 1: 
			case 21: 
			case 31: 
				return "st";
			case 2: 
			case 22: 
				return "nd";
			case 3: 
			case 23: 
				return "rd";
			default: 
				return "th";
			}
		};
	
	return format ? format.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g, 
	function (m) {
		if (m.charAt(0) === "\\") {
			return m.replace("\\", "");
		}
		x.h = x.getHours;
		switch (m) {
		case "hh":
			return p(x.h() < 13 ? (x.h() === 0 ? 12 : x.h()) : (x.h() - 12));
		case "h":
			return x.h() < 13 ? (x.h() === 0 ? 12 : x.h()) : (x.h() - 12);
		case "HH":
			return p(x.h());
		case "H":
			return x.h();
		case "mm":
			return p(x.getMinutes());
		case "m":
			return x.getMinutes();
		case "ss":
			return p(x.getSeconds());
		case "s":
			return x.getSeconds();
		case "yyyy":
			return p(x.getFullYear(), 4);
		case "yy":
			return p(x.getFullYear());
		case "dddd":
			return $C.dayNames[x.getDay()];
		case "ddd":
			return $C.abbreviatedDayNames[x.getDay()];
		case "dd":
			return p(x.getDate());
		case "d":
			return x.getDate();
		case "MMMM":
			return $C.monthNames[x.getMonth()];
		case "MMM":
			return $C.abbreviatedMonthNames[x.getMonth()];
		case "MM":
			return p((x.getMonth() + 1));
		case "M":
			return x.getMonth() + 1;
		case "t":
			return x.h() < 12 ? $C.amDesignator.substring(0, 1) : $C.pmDesignator.substring(0, 1);
		case "tt":
			return x.h() < 12 ? $C.amDesignator : $C.pmDesignator;
		case "S":
			return ord(x.getDate());
		default: 
			return m;
		}
	}
	) : x.toString();
}

// ? decide what params should do
// ? use a kite style compile step
//		also mean move away from datejs code
// intended use df`HH:MM:SS`(dateObj);
export function format(format) { //(arr, ...params) {
	// ignore everything but arr[0] for now.
	if (format instanceof Array) {
		format = format[0];
	}
	return function(date) {
		if (date === undefined) {
			date = new Date(); // now
		}
		if (date instanceof Date) {
			return date2str(date, format);
		}
	}
}