/**
 * Executes passed promise and returns Promise[err, data]
 * This function is a helper function to write cleaner code with async/await
 * err will contain Error object in case of failed promise
 * data will contain data that given promise resolves
 * @param { Promise } promise
 * @param { Record<string, unknown>= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function wrapPromise<T, U = Error>(
	promise: Promise<T>,
	errorExt?: Record<string, unknown>
): Promise<[U, undefined] | [null, T]> {
	return promise
		.then<[null, T]>((data: T) => [null, data])
		.catch<[U, undefined]>((err: U) => {
			if(errorExt) {
				Object.assign(err, errorExt)
			}
			return [err, undefined]
		})
}

/**
 * Simple function to sanize string
 * Removes all non alpha-numeric values(such as *, _, $ etc)
 * and trims
 */
export function sanitizeString(str: string): string {
	return str
		.toString()
		.replace(/[^a-zA-Z0-9,]/g, "")
		.trimLeft()
		.trimRight()
}

/**
 * Simple promise wrapper, this function will return the data
 *
 *
 */

export function promiseWraper<T, U = Error>(
	promise: Promise<T>,
	errorExit?: Record<string, unknown>)
	:Promise<[U, undefined] | [null, T]>{

	return promise
		.then<[null, T]>((data: T) => [null, data])
		.catch<[U, undefined]>((err: U) => {
			if(errorExit) {
				Object.assign(err, errorExit)
			}
			return [err, undefined]
		})
}
