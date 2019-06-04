import {Button} from 'semantic-ui-react';
//import {toStr} from '../utils/toStr';


export const SetButton = ({
	children,
	formik,
	name = '',
	parentPath,
	path = parentPath ? `${parentPath}.${name}` : name,
	value,
	onClick = () => {
		//console.debug(toStr({path, value}));
		formik.setFieldValue(path, value)
	},
	type, // So it doesn't end up in rest
	...rest
}) => {
	//console.debug(toStr({parentPath, name, path, value}));
	return <Button
		onClick={onClick}
		type='button'
		{...rest}
	>{children}</Button>;
};
