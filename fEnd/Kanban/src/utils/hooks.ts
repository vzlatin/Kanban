import { useEffect, useRef, useState } from "react";
import { refreshAccessToken } from "../services/token.service";

type Procedure = (...args: any[]) => void;

// Hook to debounce a function
export const useDebounceFn = <F extends Procedure>(
	fn: F,
	ms: number
): ((...args: Parameters<F>) => void) => {
	let timeout: ReturnType<typeof setTimeout>;

	return function (this: ThisParameterType<F>, ...args: Parameters<F>): void {
		const fnCall = () => fn.apply(this, args);

		clearTimeout(timeout);
		timeout = setTimeout(fnCall, ms);
	};
};

// Hook to debounce a value
export const useDebounce = <T>(value: T, ms: number = 350) => {
	const [accumulator, setAccumulator] = useState<T>(value);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setAccumulator(value);
		}, ms);

		return () => {
			clearTimeout(timeout);
		};
	}, [value, ms]);
	return accumulator;
};

// Use effect that skips the first render
export const useEfectAfterMount = (fn: () => void, deps: any[]) => {
	const isMounted = useRef(false);
	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			return;
		}
		fn();
	}, deps);
};
