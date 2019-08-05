import {getIn} from 'formik';
import {Input as SemanticUiReactInput} from 'semantic-ui-react';


export const Input = (props) => {
	//console.debug('Input props', props);
	const {
		type = 'text',
		name,
		parentPath,
		path = parentPath ? `${parentPath}.${name}` : name,
		formik: {setFieldValue,	values},
		onChange = (event, {value: newValue}) => setFieldValue(path, newValue),
		value = getIn(values, path, ''),
		...rest
	} = props;

	return <SemanticUiReactInput
		name={path}
		onChange={onChange}
		type={type}
		value={value}
		{...rest}
	/>;
};
