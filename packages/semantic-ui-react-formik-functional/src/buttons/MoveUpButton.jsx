import {getIn} from 'formik';
import {Button, Icon} from 'semantic-ui-react'
import {swap} from '../array/swap';
//import {toStr} from '../utils/toStr';


export const MoveUpButton = ({
	formik,
	index,
	disabled = index < 1,
	path,
	text = '',
	visible = true,
	...rest
}) => {
	if(!visible) { return null; }
	const prevIndex = index - 1;
	const currentValue = getIn(formik.values, path);
	return <Button
		disabled={disabled}
		icon
		onClick={() => {formik.setFieldValue(path, swap(currentValue, index, prevIndex))}}
		type='button'
		{...rest}
	><Icon color='blue' name='arrow up'/>{text}</Button>;
}
