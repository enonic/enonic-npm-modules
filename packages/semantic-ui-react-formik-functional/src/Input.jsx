import {getIn} from 'formik';
import {Input as SemanticUiReactInput} from 'semantic-ui-react';


export const Input = ({
	type = 'text',
	name,
	parentPath,
	path = parentPath ? `${parentPath}.${name}` : name,
	formik: {
		errors = {},
		setFieldValue,
		//validateField,
		values
	},
	validate,
	onChange = (event, {
		value: newValue
	}) => {
		setFieldValue(path, newValue);
		validate && validate(newValue);
		//validateField(path);
	},
	value = getIn(values, path, ''),
	...rest
}) => {
	const error = getIn(errors, path);
	return <>
		<SemanticUiReactInput
			name={path}
			onChange={onChange}
			type={type}
			value={value}
			{...rest}
		/>
		{error && <div>{error}</div>}
	</>;
};
