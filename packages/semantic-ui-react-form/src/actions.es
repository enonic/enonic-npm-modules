export const DELETE_ITEM = 'DELETE_ITEM';
export const INSERT = 'INSERT';
export const MOVE_DOWN = 'MOVE_DOWN';
export const MOVE_UP = 'MOVE_UP';
//const PUSH = 'PUSH';
export const REMOVE = 'REMOVE';
export const RESET = 'RESET';
export const SET_VALUE = 'SET_VALUE';
export const SET_VISITED = 'SET_VISITED';
export const SORT = 'SORT';
export const SUBMIT = 'SUBMIT';
export const VALIDATE_FIELD = 'VALIDATE_FIELD';
export const VALIDATE_FORM = 'VALIDATE_FORM';
export const VISIT_ALL = 'VISIT_ALL';


export const deleteItem = ({index, path}) => ({
	index,
	path,
	type: DELETE_ITEM
});

export const insert = ({index, path, value}) => ({
	index,
	path,
	type: INSERT,
	value
});

export const moveDown = ({index, path}) => ({
	index,
	path,
	type: MOVE_DOWN
});

export const moveUp = ({index, path}) => ({
	index,
	path,
	type: MOVE_UP
});

/*export const push = ({index, path, value}) => ({
	index,
	path,
	type: PUSH,
	value
});*/

export const remove = () => ({
	type: REMOVE
});

export const reset = () => ({
	type: RESET
});

export const setValue = ({path, value}) => ({
	path,
	type: SET_VALUE,
	value
});

export const setVisited = ({path, value = true}) => ({
	path,
	type: SET_VISITED,
	value
});

export const sort = ({path}) => ({
	path,
	type: SORT
});

export const submit = () => ({
	type: SUBMIT
});

export const validateField = ({path, value}) => ({
	path,
	type: VALIDATE_FIELD,
	value
});

export const validateForm = ({
	visitAllFields = false
} = {}) => ({
	type: VALIDATE_FORM,
	visitAllFields
});

export const visitAll = () => ({
	type: VISIT_ALL
});

export const actions = {
	deleteItem,
	insert,
	moveDown,
	moveUp,
	setValue,
	setVisited,
	sort,
	validateField,
	visitAll
};
