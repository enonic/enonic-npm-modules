import {getIn} from 'formik';
import {Button, Icon} from 'semantic-ui-react'
import {remove} from '../array/remove';
//import {toStr} from '../utils/toStr';


export const RemoveButton = ({
	formik,
	path,
	currentValue = getIn(formik.values, path),
	disabled = false, //currentValue.length < 2,
	index,
	text = '',
	visible = true, //currentValue.length > 1
	...rest
}) => {
	if(!visible) { return null; }
	//console.debug(toStr({index, path, currentValue}));
	return <Button
		disabled={disabled}
		icon
		onClick={() => {formik.setFieldValue(path, remove(currentValue, index))}}
		type='button'
		{...rest}
	><Icon color='red' name='minus'/>{text}</Button>;
}
