export const insert = (array, index, value) => {
	const copy = [...(array || [])];
	copy.splice(index, 0, value);
	return copy;
};
