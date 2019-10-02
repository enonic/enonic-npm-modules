import {Button, Icon} from 'semantic-ui-react';

import {getEnonicContext} from '../Context';
import {sort} from '../actions';


export function SortButton(props) {
	//console.debug('SortButton props', props);
	const {
		children = <Icon color='blue' name='sort alphabet down'/>,
		path
	} = props;

	const [context, dispatch] = getEnonicContext();
	//console.debug('SortButton context', context);

	return <Button
		icon
		onClick={() => dispatch(sort({
			path
		}))}
		type='button'
	>{children}</Button>;
} // SortButton
