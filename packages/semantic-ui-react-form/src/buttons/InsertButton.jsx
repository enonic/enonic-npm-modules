import {Button, Icon} from 'semantic-ui-react';

import {getEnonicContext} from '../Context';
import {insert} from '../actions';


export function InsertButton(props) {
	//console.debug('InsertButton props', props);
	const {
		children = <Icon color='green' name='add'/>,
		icon = true,
		index = 0,
		path,
		value
	} = props;

	const [context, dispatch] = getEnonicContext();
	//console.debug('InsertButton context', context);

	return <Button
		icon={icon}
		onClick={() => {
			/*console.debug('InsertButton onClick', {
				index,
				path,
				value
			});*/
			dispatch(insert({
				index,
				path,
				value
			}));
		}}
		type='button'
	>{children}</Button>;
} // InsertButton
