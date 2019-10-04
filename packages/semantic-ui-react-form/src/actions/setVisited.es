export const SET_VISITED = 'SET_VISITED';


export const setVisited = ({
  path,
  validate = true,
  value = true
}) => ({
	path,
	type: SET_VISITED,
  validate,
	value
});
