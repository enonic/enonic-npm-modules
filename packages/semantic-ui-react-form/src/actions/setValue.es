export const SET_VALUE = 'SET_VALUE';


export const setValue = ({
	path,
	validate = true,
	value,
	visit = true
}) => ({
	path,
	type: SET_VALUE,
	validate,
	value,
	visit
});
