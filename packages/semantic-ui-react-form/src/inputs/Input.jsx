import getIn from 'get-value';
import {
	Icon,
	Input as SemanticUiReactInput,
	Message
} from 'semantic-ui-react';

import {getEnonicContext} from '../Context';
import {
	setValue,
	setVisited,
	//validateField,
	validateForm
} from '../actions';


export function Input(props = {}) {
	//console.debug('Input props', props);
	const [context, dispatch] = getEnonicContext();
	//console.debug('Input context', context);
	const {
		path,
		validateOnBlur = true,
		validateOnChange = true,
		value = getIn(context.values, path, ''),
		...rest
	} = props;
	//console.debug('Input context', context);


	//const changed = getIn(context.changes, path);
	const errorMsg = getIn(context.errors, path);
	const visited = getIn(context.visits, path);
	const error = !!(visited && errorMsg);
	//console.debug('Input value', value);

	return <>
		<SemanticUiReactInput
			autoComplete='off'
			{...rest}
			error={error}
			name={path}
			onBlur={() => {
				dispatch(setVisited({path}));
				//validateOnBlur && dispatch(validateField({path, value}));
				validateOnBlur && dispatch(validateForm());
			}}
			onChange={(event, {value: newValue}) => {
				dispatch(setValue({path, value: newValue}));
				dispatch(setVisited({path}));
				//validateOnChange && dispatch(validateField({path, value: newValue}));
				validateOnChange && dispatch(validateForm());
			}}
			value={value}
		/>
		{error && <Message icon negative>
			<Icon name='warning'/>
			<Message.Content>
				<Message.Header>{path}</Message.Header>
				{errorMsg}
			</Message.Content>
		</Message>}
	</>;
} // Input
