import {Button, Icon} from 'semantic-ui-react';

import {getEnonicContext} from '../Context';
import {validateForm} from '../actions';


export function ValidateFormButton(props) {
	//console.debug('ValidateFormButton props', props);

	const [context, dispatch] = getEnonicContext();
	//console.debug('ValidateFormButton context', context);

	return <Button
		color='yellow'
		onClick={() => dispatch(validateForm({visitAllFields: true}))}
		type='button'
	><Icon name='eye'/>Validate</Button>;
} // ValidateFormButton
