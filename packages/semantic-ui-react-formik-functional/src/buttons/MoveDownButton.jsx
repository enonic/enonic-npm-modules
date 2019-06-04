import {getIn} from 'formik';
import {Button, Icon} from 'semantic-ui-react'
import {swap} from '../array/swap';
//import {toStr} from '../utils/toStr';


export const MoveDownButton = ({
	formik,
	path,
	currentValue = getIn(formik.values, path),
	index,
	nextIndex = index + 1,
	disabled = nextIndex === currentValue.length,
	text = '',
	visible = true,
	...rest
}) => {
	if(!visible) { return null; }
	return <Button
		disabled={disabled}
		icon
		onClick={() => {formik.setFieldValue(path, swap(currentValue, index, nextIndex))}}
		type='button'
		{...rest}
	><Icon color='blue' name='arrow down'/>{text}</Button>;
}
