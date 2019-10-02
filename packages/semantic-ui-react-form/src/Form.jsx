/*

The submit button should be disabled if the form doesn't validate.
(Perhaps also if there are no changes?,
but that could make it impossible to submit a form that is initially valid.)

* Thus we need to validate the entire form on init.

* When you leave a field it should be set to visited.

* When you change or leave a field it should be validated.

*/

import deepEqual from 'fast-deep-equal';
import getIn from 'get-value';
import setIn from 'set-value';
//import {Form as SemanticUiReactForm} from 'semantic-ui-react';
import traverse from 'traverse';

import {
	DELETE_ITEM,
	INSERT,
	MOVE_DOWN,
	MOVE_UP,
	REMOVE,
	RESET,
	SET_VALUE,
	SET_VISITED,
	SORT,
	SUBMIT,
	VALIDATE_FIELD,
	VALIDATE_FORM
} from './actions';
import {EnonicProvider} from './Context';


function isFunction(value) {
	return !!(value && value.constructor && value.call && value.apply); // highly performant from underscore
}


export function Form(props) {
	//console.debug('Form props', props);
	const {
		children,
		onChange = () => {/*no-op*/},
		onDelete,
		onSubmit,
		schema = {},
		validateOnInit = true
	} = props;
	//console.debug('Form schema', schema);

	const initialValues = JSON.parse(JSON.stringify(isFunction(props.initialValues) ? props.initialValues() : props.initialValues));

	function validateValues(values) {
		const errors = {};
		traverse(schema).forEach(function (x) { // fat-arrow destroys this
			if (this.notRoot && this.isLeaf && isFunction(x)) {
				const path = this.path; //console.debug('path', path);
				const value = getIn(values, path); //console.debug('value', value);
				const newError = x(value); //console.debug('newError', newError);
				newError && setIn(errors, path, newError);
			}
		});
		return errors;
	} // validateValues

	const initialState = {
		changes: {},
		errors: validateOnInit ? validateValues(initialValues) : {},
		values: initialValues,
		visits: {}
	};
	//console.debug('Form initialState', initialState);

	const reducer = (state, action) => {
		//console.debug('reducer action', action, 'state', state);
		switch (action.type) {
		case DELETE_ITEM: {
			//console.debug('reducer state', state, 'action', action);
			const deref = JSON.parse(JSON.stringify(state));
			const array = getIn(deref.values, action.path);
			//console.debug('reducer state', state, 'action', action, 'array', array);
			if (!Array.isArray(array)) {
				return state;
			}
			array.splice(action.index, 1);
			const initialValue = getIn(initialValues, action.path);
			setIn(deref.changes, action.path, !deepEqual(array, initialValue));
			//console.debug('reducer action', action, 'state', state, 'deref', deref);
			onChange(deref.values);
			return deref;
		}
		case INSERT: {
			//console.debug('reducer state', state, 'action', action);
			const deref = JSON.parse(JSON.stringify(state));
			const array = getIn(deref.values, action.path);
			//console.debug('reducer state', state, 'action', action, 'array', array);
			if (!Array.isArray(array)) {
				return state;
			}
			array.splice(action.index, 0, action.value);
			const initialValue = getIn(initialValues, action.path);
			setIn(deref.changes, action.path, !deepEqual(array, initialValue));
			//console.debug('reducer state', state, 'action', action, 'array', array);
			//console.debug('reducer action', action, 'state', state, 'deref', deref);
			onChange(deref.values);
			return deref;
		}
		case MOVE_DOWN: {
			const deref = JSON.parse(JSON.stringify(state));
			const array = getIn(deref.values, action.path);
			if (!Array.isArray(array)) {
				console.error(`path: ${action.path}, not an array!`);
				return state;
			}
			if(action.index + 1 >= array.length) {
				console.error(`path: ${action.path} Can't move item beyond array!`);
				return state;
			}
			const tmp = array[action.index];
			array[action.index] = array[action.index + 1];
			array[action.index + 1] = tmp;
			const initialValue = getIn(initialValues, action.path);
			setIn(deref.changes, action.path, !deepEqual(array, initialValue));
			//console.debug('reducer action', action, 'state', state, 'deref', deref);
			onChange(deref.values);
			return deref;
		}
		case MOVE_UP: {
			const deref = JSON.parse(JSON.stringify(state));
			const array = getIn(deref.values, action.path);
			if (!Array.isArray(array)) {
				console.error(`path: ${action.path}, not an array!`);
				return state;
			}
			if(action.index === 0) {
				console.error(`path: ${action.path} Can't move item to index -1!`);
				return state;
			}
			const tmp = array[action.index];
			array[action.index] = array[action.index - 1];
			array[action.index - 1] = tmp;
			const initialValue = getIn(initialValues, action.path);
			setIn(deref.changes, action.path, !deepEqual(array, initialValue));
			//console.debug('reducer action', action, 'state', state, 'deref', deref);
			onChange(deref.values);
			return deref;
		}
		/*case PUSH: {
			const deref = JSON.parse(JSON.stringify(state));
			const array = getIn(deref.values, action.path);
			if (!Array.isArray(array)) {
				return state;
			}
			array.push(action.value)
			const initialValue = getIn(initialValues, action.path);
			setIn(deref.changes, action.path, deepEqual(array, initialValue));
			return deref;
		}*/
		case REMOVE: {
			onDelete(state.values);
			return state;
		}
		case RESET: {
			onChange(initialState.values);
			return initialState;
		}
		case SET_VALUE: {
			//console.debug('reducer action', action, 'state', state);
			if (action.value === getIn(state.values, action.path)) {
				//console.debug('reducer action', action, 'did not change state', state);
				return state;
			}
			const deref = JSON.parse(JSON.stringify(state));
			setIn(deref.values, action.path, action.value);
			const initialValue = getIn(initialValues, action.path);
			setIn(deref.changes, action.path, action.value !== initialValue);
			//console.debug('reducer state', state, 'action', action, 'deref', deref);
			onChange(deref.values);
			return deref;
		}
		case SET_VISITED: {
			if (action.value === getIn(state.visits, action.path)) {
				//console.debug('reducer action', action, 'did not change state', state);
				return state;
			}
			const deref = JSON.parse(JSON.stringify(state));
			setIn(deref.visits, action.path, action.value);
			//console.debug('reducer action', action, 'deref', deref);
			return deref;
		}
		case SORT: {
			const deref = JSON.parse(JSON.stringify(state));
			const array = getIn(deref.values, action.path);
			if (!Array.isArray(array)) {
				console.error(`path: ${action.path}, not an array!`);
				return state;
			}
			array.sort();
			const initialValue = getIn(initialValues, action.path);
			setIn(deref.changes, action.path, !deepEqual(array, initialValue));
			//console.debug('reducer action', action, 'state', state, 'deref', deref);
			onChange(deref.values);
			return deref;
		}
		case SUBMIT: {
			onSubmit(state.values);
			return state;
		}
		case VALIDATE_FIELD: {
			const fn = getIn(schema, action.path);
			if (!isFunction(fn)) {
				//console.debug('reducer action', action, "doesn't have a validator function state", state);
				return state;
			}
			const error = fn(action.value);
			if (error === getIn(state.errors, action.path)) {
				//console.debug('reducer action', action, 'did not change state', state);
				return state;
			}
			const deref = JSON.parse(JSON.stringify(state));
			setIn(deref.errors, action.path, error);
			//console.debug('reducer action', action, 'deref', deref);
			return deref;
		}
		case VALIDATE_FORM: {
			//console.debug('reducer action', action);
			const {visitAllFields} = action;
			const deref = JSON.parse(JSON.stringify(state));
			const errors = {}; // forgetting old errors here
			traverse(schema).forEach(function (x) { // fat-arrow destroys this
				if (this.notRoot && this.isLeaf && isFunction(x)) {
					const path = this.path; //console.debug('path', path);
					const value = getIn(state.values, path); //console.debug('value', value);
					//const prevError = getIn(state.errors, path); console.debug('prevError', prevError);
					const newError = x(value); //console.debug('newError', newError);
					newError && setIn(errors, path, newError);
					visitAllFields && setIn(deref.visits, path, true);
					//console.debug('node', this.node);
				}
			});
			//console.debug('errors', errors);
			//console.debug('visits', visits);
			deref.errors = errors;
			//console.debug('reducer action', action, 'state', state, 'deref', deref);
			return deref;
		}
		default: return state;
		} // switch
	}; // reducer

	return <EnonicProvider
		children={children}
		initialState={initialState}
		reducer={reducer}
	/>;
} // Form
