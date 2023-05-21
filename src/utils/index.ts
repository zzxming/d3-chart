/**
 * Checks if a value is a positive number.
 *
 * @param {any} v - The value to check.
 * @return {boolean} Returns true if the value is a positive number, else false.
 */
export const isPositiveNumber = (v: any) => {
	return Object.prototype.toString.call(v) === '[object Number]' && !isNaN(Number(v)) && Number(v) >= 0;
};
