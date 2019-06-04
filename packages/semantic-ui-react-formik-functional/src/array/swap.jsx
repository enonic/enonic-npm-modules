export const swap = (array, indexA, indexB) => {
	const copy = [...(array || [])];
	const a = copy[indexA];
	copy[indexA] = copy[indexB];
	copy[indexB] = a;
	return copy;
};
