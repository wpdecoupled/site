// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type fetchFunc = () => Promise<any>;

export type TestedFunction = {
	measure: PerformanceMeasure;
	data: string;
};

export function wrapFunction(func: fetchFunc): () => Promise<TestedFunction> {
	return async () => {
		performance.mark('startFunctionCall');

		const resp = await func();

		performance.mark('endFunctionCall');

		// if(!resp?.ok) {
		// 	throw Error("Hmm, this should be a fetch response")
		// }

		// const data = await resp.text();

		return {
			data: resp.toString(),
			measure: performance.measure('functionCallDuration', 'startFunctionCall', 'endFunctionCall'),
		};
	};
}
