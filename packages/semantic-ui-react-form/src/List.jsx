import getIn from 'get-value';

import {getEnonicContext} from './Context';


export function List(props) {
	const {path, render} = props;
	const [context, dispatch] = getEnonicContext();
	//console.debug('List context', context);
	const array = getIn(context.values, path, []);
	//console.debug('List array', array);
	return render(array);
} // List
