import {Button, Icon} from 'semantic-ui-react';
import traverse from 'traverse';

import {getEnonicContext} from '../Context';
import {submit} from '../actions';


export function SubmitButton(/* props */) {
	// console.debug('SubmitButton props', props);

	const [context, dispatch] = getEnonicContext();
	// console.debug('SubmitButton context', context);

	/* const changesArr = traverse(context.changes).reduce(function (acc, x) {
		if (this.notRoot && this.isLeaf && x === true) acc.push(x);
		return acc;
	}, []); */
	// console.dir(changesArr);

	// console.debug('SubmitButton context.errors', context.errors);
	const errorsArr = traverse(context.errors).reduce(function (acc, x) {
    	if (this.notRoot && this.isLeaf) acc.push(x);
    	return acc;
	}, []);
 	// console.dir(errorsArr);

	return <Button
		color={errorsArr.length ? 'red' : 'green'}
		disabled={!!errorsArr.length/* || !changesArr.length*/}
		onClick={() => dispatch(submit())}
		type='submit'
	><Icon name='save'/>{errorsArr.length ? `${errorsArr.length} validation error${errorsArr.length > 1 ? 's' : ''}`: 'Submit'}</Button>;
} // SubmitButton
