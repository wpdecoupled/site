import type { ParamMatcher } from '@sveltejs/kit';

// This function is used to match the parameter in the route
/**
example.php
example.php/
.example
example.PhP7
class-snoopi.php.suspected
example.html
test.css
*/

const regex = /(.php)|^\.|(^\/wp-json)|(^\/var)|(^(\/usr))/gmi;

export const match: ParamMatcher = (param) => {
	const standard = param.toLowerCase();
	return regex.test(standard);
};
