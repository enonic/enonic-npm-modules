import classNames from 'classnames';
import {getIn} from 'formik';

import {Dropdown as SemanticUiReactDropdown} from 'semantic-ui-react';


export const Dropdown = ({
	className,
	fluid,
	multiple = false,
	placeholder,
	search,
	selection,

	name,
	parentPath,
	path = parentPath ? `${parentPath}.${name}` : name,

	formik: {
		setFieldValue,
		values
	},
	onChange = (event, {
		value: newValue
	}) => {
		setFieldValue(path, newValue);
	},
	defaultValue = getIn(values, path), // , multiple ? [] : '' makes placeholder fail
	...rest
}) => {
	return <SemanticUiReactDropdown
		className={classNames(
			className,
			{fluid, search, selection}
		)}
		defaultValue={defaultValue}
		multiple={multiple}
		name={path}
		onChange={onChange}
		placeholder={placeholder}
		{...rest}
	/>;
}
