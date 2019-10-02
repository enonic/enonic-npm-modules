import getIn from 'get-value';
import {Dropdown as SemanticUiReactDropdown} from 'semantic-ui-react';

import {getEnonicContext} from '../Context';
import {setValue} from '../actions';


export function Dropdown(props = {}) {
	//console.debug('Dropdown props', props);

	const [context, dispatch] = getEnonicContext();
	//console.debug('Dropdown context', context);

	const {
		name,
		parentPath,
		path = parentPath ? `${parentPath}.${name}` : name,
		value = getIn(context.values, path),
		...rest
	} = props;
	/*console.debug('Dropdown',
		'name', name,
		'parentPath', parentPath,
		'path', path,
		'value', value,
		'rest', rest
	);*/

	return <SemanticUiReactDropdown
		{...rest}
		onChange={(ignoredEvent,{value: newValue}) => {
			//console.debug('Dropdown newValue', newValue);
			dispatch(setValue({path, value: newValue}));
		}}
		value={value}
	/>;
} // function Dropdown
