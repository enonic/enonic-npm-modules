import {isFunction} from '../utils/isFunction';


export const remove = (array, index) => {
	const copy = array ? [...array] : [];
	if (isFunction(copy.splice)) {
    	copy.splice(index, 1);
	}
	return copy;
};
