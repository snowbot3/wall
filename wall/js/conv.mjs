/**
 * wall_conv
 */

export function camel2dash(camel) {
	return camel.replace(/^([A-Z])/, (g)=>g[0].toLowerCase()).replace(/([A-Z])/g, (g) => '-'+g[0].toLowerCase());
}
