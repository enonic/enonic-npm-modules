import {Button, Icon} from 'semantic-ui-react';

import {getEnonicContext} from '../Context';
import {remove} from '../actions';


export function DeleteButton(props) {
	//console.debug('DeleteButton props', props);

	const [context, dispatch] = getEnonicContext();
	//console.debug('DeleteButton context', context);

	// disabled={}
	return <Button
		color='red'
		onClick={() => dispatch(remove())}
		type='button'
	><Icon name='alternate outline trash'/>Delete</Button>;
} // DeleteButton
