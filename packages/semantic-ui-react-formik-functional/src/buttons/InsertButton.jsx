import {getIn} from 'formik';
import {Button, Icon} from 'semantic-ui-react'
import {insert} from '../array/insert'


export const InsertButton = ({
	disabled = false,
	formik,
	index,
	path,
	text = '',
	value,
	...rest
}) => {
	const nextIndex = index + 1;
	const currentValue = getIn(formik.values, path);
	return <Button
		disabled={disabled}
		icon
		onClick={() => {formik.setFieldValue(path, insert(currentValue, nextIndex, value))}}
		type='button'
		{...rest}
	><Icon color='green' name='plus'/>{text}</Button>;
}
