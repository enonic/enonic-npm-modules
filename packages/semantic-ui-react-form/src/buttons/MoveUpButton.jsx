import {Button, Icon} from 'semantic-ui-react';

import {getEnonicContext} from '../Context';
import {moveUp} from '../actions';


export function MoveUpButton(props) {
	//console.debug('MoveUpButton props', props);
	const {
		index = 0,
		path
	} = props;

	const [context, dispatch] = getEnonicContext();
	//console.debug('MoveUpButton context', context);

	return <Button
		disabled={index===0}
		icon
		onClick={() => dispatch(moveUp({
			index,
			path
		}))}
		type='button'
	><Icon color='blue' name='arrow up'/></Button>;
} // MoveUpButton
