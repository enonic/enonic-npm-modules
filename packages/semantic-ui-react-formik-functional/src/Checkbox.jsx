import {getIn} from 'formik';
import {Checkbox as SemanticUiReactCheckbox} from 'semantic-ui-react';
//import {toStr} from './utils/toStr';


export const Checkbox = ({
	defaultChecked = false,
	formik,
	name,
	parentPath,
	path = parentPath ? `${parentPath}.${name}` : name,
	onChange = (event, {checked}) => {
		//console.debug(checked);
		formik.setFieldValue(path, checked);
	},
	checked = getIn(formik.values, path, defaultChecked),
	...rest // label
}) => {
	//console.debug(toStr({path, defaultChecked, checked}));
	return <SemanticUiReactCheckbox
		checked={checked}
		defaultChecked={defaultChecked}
		name={path}
		onChange={onChange}
		{...rest}
	/>;
}
