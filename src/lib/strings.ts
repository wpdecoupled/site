function append(acc: string, arg: string | number): string {
	return acc + arg + ' ';
}

type PossibleClassNames = string | number | string[] | { [key: string]: unknown } | undefined;

export function classNames(...args: PossibleClassNames[]): string {
	let classes = '';

	for (const arg of args) {
		if (typeof arg == undefined) continue;

		if (typeof arg === 'string' || typeof arg === 'number') {
			classes = append(classes, arg);
		} else if (Array.isArray(arg) && arg.length) {
			const inner = classNames(...arg);
			if (inner) classes = append(classes, inner);
		} else if (typeof arg === 'object') {
			for (const [key, value] of Object.entries(arg)) {
				if (value) classes = append(classes, key);
			}
		}
	}

	return classes;
}
