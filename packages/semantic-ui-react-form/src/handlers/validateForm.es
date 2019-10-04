import cloneDeep from 'lodash.clonedeep';
import getIn from 'get-value';
import setIn from 'set-value';
import traverse from 'traverse';

import { isFunction } from '../utils/isFunction';


export function validateForm({
  // action,
  afterValidate = () => {
    /* no-op */
  },
  state = {},
  visitAllFields = false
}) {
  // console.debug('validateForm visitAllFields', visitAllFields, 'state', state);
  // const {visitAllFields = false} = action;
  const deref = cloneDeep(state);
  const errors = {}; // forgetting old errors here
  traverse(state.schema).forEach(function(x) {
    // fat-arrow destroys this
    if (this.notRoot && this.isLeaf && isFunction(x)) {
      const { path } = this; // console.debug('path', path);
      const value = getIn(state.values, path); // console.debug('value', value);
      // const prevError = getIn(state.errors, path); console.debug('prevError', prevError);
      const newError = x(value); // console.debug('newError', newError);
      newError && setIn(errors, path, newError);
      visitAllFields && setIn(deref.visits, path, true);
      // console.debug('node', this.node);
    }
  });
  // console.debug('errors', errors);
  // console.debug('visits', visits);
  deref.errors = errors;
  // console.debug('reducer action', action, 'state', state, 'deref', deref);
  afterValidate(deref);
  return deref;
} // function validateForm
