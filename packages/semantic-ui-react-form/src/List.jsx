import getIn from 'get-value';

import {getEnonicContext} from './Context';


export function List(props) {
	// console.debug('List props', props);

	const [context, dispatch] = getEnonicContext();
	// console.debug('List context', context);

	const {
		path,
		render,
		value = getIn(context, `values.${path}`, [])
	} = props;
	// console.debug('List path', path, 'value', value);

	return render(value);
} // List
