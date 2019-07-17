import {getIn} from 'formik';
import {
	Icon,
	Input as SemanticUiReactInput,
	Message
} from 'semantic-ui-react';


export const Input = ({
	type = 'text',
	name,
	parentPath,
	path = parentPath ? `${parentPath}.${name}` : name,
	formik: {
		errors = {},
		setFieldValue,
		validateField,
		values
	},
	validate,
	onChange = (event, {
		value: newValue
	}) => {
		setFieldValue(path, newValue);
		validate ? validate(newValue) : validateField(path);
	},
	value = getIn(values, path, ''),
	...rest
}) => {
	const error = getIn(errors, path);
	return <>
		<SemanticUiReactInput
			error={!!error}
			name={path}
			onChange={onChange}
			type={type}
			value={value}
			{...rest}
		/>
		{error && <Message error icon><Icon name='warning'/><Message.Content>{error}</Message.Content></Message>}
	</>;
};
