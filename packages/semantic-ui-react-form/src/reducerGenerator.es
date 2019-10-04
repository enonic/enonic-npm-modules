/* eslint-disable no-console */
import cloneDeep from 'lodash.clonedeep';
import deepEqual from 'fast-deep-equal';
import getIn from 'get-value';
import setIn from 'set-value';
import traverse from 'traverse';

import {
  DELETE_ITEM,
  INSERT,
  MOVE_DOWN,
  MOVE_UP,
  REMOVE,
  RESET,
  SET_ERROR,
  SET_SCHEMA,
  SET_STATE,
  SET_VALUE,
  SET_VISITED,
  SORT,
  SUBMIT,
  // VALIDATE_FIELD,
  VALIDATE_FORM,
  VISIT_ALL
} from './actions';

import { validateForm } from './handlers/validateForm';
import { visit } from './handlers/visit';
import { setValue } from './handlers/setValue';
import { isFunction } from './utils/isFunction';


export function reducerGenerator({
  afterValidate,
  afterVisit,
  initialState,
  onChange,
  onDelete,
  onSubmit
}) {
  function reducer(state, action) {
    // console.debug('reducer action', action, 'state', state);
    switch (action.type) {
      case DELETE_ITEM: {
        // console.debug('reducer state', state, 'action', action);
        const deref = cloneDeep(state);
        const array = getIn(deref.values, action.path);
        // console.debug('reducer state', state, 'action', action, 'array', array);
        if (!Array.isArray(array)) {
          return state;
        }
        array.splice(action.index, 1);
        const initialValue = getIn(initialState.values, action.path);
        setIn(deref.changes, action.path, !deepEqual(array, initialValue));
        // console.debug('reducer action', action, 'state', state, 'deref', deref);
        onChange(deref.values);
        return deref;
      }
      case INSERT: {
        // console.debug('reducer state', state, 'action', action);
        const deref = cloneDeep(state);
        const array = getIn(deref.values, action.path);
        // console.debug('reducer state', state, 'action', action, 'array', array);
        if (!Array.isArray(array)) {
          return state;
        }
        array.splice(action.index, 0, action.value);
        const initialValue = getIn(initialState.values, action.path);
        setIn(deref.changes, action.path, !deepEqual(array, initialValue));
        // console.debug('reducer state', state, 'action', action, 'array', array);
        // console.debug('reducer action', action, 'state', state, 'deref', deref);
        onChange(deref.values);
        return deref;
      }
      case MOVE_DOWN: {
        const deref = cloneDeep(state);
        const array = getIn(deref.values, action.path);
        if (!Array.isArray(array)) {
          console.error(`path: ${action.path}, not an array!`);
          return state;
        }
        if (action.index + 1 >= array.length) {
          console.error(`path: ${action.path} Can't move item beyond array!`);
          return state;
        }
        const tmp = array[action.index];
        array[action.index] = array[action.index + 1];
        array[action.index + 1] = tmp;
        const initialValue = getIn(initialState.values, action.path);
        setIn(deref.changes, action.path, !deepEqual(array, initialValue));
        // console.debug('reducer action', action, 'state', state, 'deref', deref);
        onChange(deref.values);
        return deref;
      }
      case MOVE_UP: {
        const deref = cloneDeep(state);
        const array = getIn(deref.values, action.path);
        if (!Array.isArray(array)) {
          console.error(`path: ${action.path}, not an array!`);
          return state;
        }
        if (action.index === 0) {
          console.error(`path: ${action.path} Can't move item to index -1!`);
          return state;
        }
        const tmp = array[action.index];
        array[action.index] = array[action.index - 1];
        array[action.index - 1] = tmp;
        const initialValue = getIn(initialState.values, action.path);
        setIn(deref.changes, action.path, !deepEqual(array, initialValue));
        // console.debug('reducer action', action, 'state', state, 'deref', deref);
        onChange(deref.values);
        return deref;
      }
      /* case PUSH: {
        const deref = cloneDeep(state);
        const array = getIn(deref.values, action.path);
        if (!Array.isArray(array)) {
          return state;
        }
        array.push(action.value)
        const initialValue = getIn(initialValues, action.path);
        setIn(deref.changes, action.path, deepEqual(array, initialValue));
        return deref;
      } */
      case REMOVE: {
        onDelete(state.values);
        return state;
      }
      case RESET: {
        onChange(initialState.values);
        return initialState;
      }
      case SET_ERROR: {
        const prevValue = getIn(state.errors, action.path);
        if (deepEqual(action.error, prevValue)) {
          // console.debug('reducer action', action, 'did not change state', state);
          return state;
        }
        const deref = cloneDeep(state);
        setIn(deref.errors, action.path, action.error);
        // console.debug('reducer action', action, 'state', state, 'deref', deref);
        return deref;
      }
      case SET_SCHEMA: {
        // console.debug('reducer action', action);
        const { path, schema } = action;
        const deref = cloneDeep(state);
        setIn(deref.schema, path, schema);
        // console.debug('reducer action', action, 'state', state, 'deref', deref);
        return deref;
      }
      case SET_STATE: {
        // console.debug('reducer action', action);
        return action.value;
      }
      case SET_VALUE: {
        return setValue({action, afterValidate, afterVisit, initialState, onChange, state});
      }
      case SET_VISITED: {
        return visit({action, afterValidate, afterVisit, state});
      }
      case SORT: {
        const deref = cloneDeep(state);
        const array = getIn(deref.values, action.path);
        if (!Array.isArray(array)) {
          console.error(`path: ${action.path}, not an array!`);
          return state;
        }
        array.sort();
        const initialValue = getIn(initialState.values, action.path);
        setIn(deref.changes, action.path, !deepEqual(array, initialValue));
        // console.debug('reducer action', action, 'state', state, 'deref', deref);
        onChange(deref.values);
        return deref;
      }
      case SUBMIT: {
        onSubmit(state.values);
        return state;
      }
      /* case VALIDATE_FIELD: {
        // console.debug('reducer action', action, 'state.schema', state.schema);
        const fn = getIn(state.schema, action.path);
        if (!isFunction(fn)) {
          // console.debug('reducer action', action, "doesn't have a validator function state", state);
          return state;
        }
        const error = fn(action.value);
        if (error === getIn(state.errors, action.path)) {
          // console.debug('reducer action', action, 'did not change state', state);
          return state;
        }
        const deref = cloneDeep(state);
        setIn(deref.errors, action.path, error);
        // console.debug('reducer action', action, 'deref', deref);
        afterValidate(deref);
        return deref;
      } */
      case VALIDATE_FORM: {
        // console.debug('reducer action', action, 'state.schema', state.schema);
        const { visitAllFields } = action;
        return validateForm({
          afterValidate,
          state,
          visitAllFields
        });
      }
      case VISIT_ALL: {
        const deref = cloneDeep(state);
        traverse(state.schema).forEach(function(x) {
          // fat-arrow destroys this
          if (this.notRoot && this.isLeaf && isFunction(x)) {
            setIn(deref.visits, this.path, true);
          }
        });
        return deref;
      }
      default:
        return state;
    } // switch
  } // reducer
  return reducer;
} // export function reducerGenerator
