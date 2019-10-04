import cloneDeep from 'lodash.clonedeep';
import deepEqual from 'fast-deep-equal';
import getIn from 'get-value';
import setIn from 'set-value';

import {validateForm} from './validateForm';


export function visit({
  action,
  afterValidate = () => {
    /* no-op */
  },
  afterVisit = () => {
    /* no-op */
  },
  state = {}
}) {
  const {
    path,
    validate = true,
    value
  } = action;
  const prevValue = getIn(state.visits, path);
  if (deepEqual(value, prevValue)) {
    // console.debug('reducer action', action, 'did not change state', state);
    return state;
  }
  const deref = cloneDeep(state);
  setIn(deref.visits, path, value);
  // console.debug('reducer action', action, 'state', state, 'deref', deref);
  afterVisit(deref);
  if (validate) {
    return validateForm({
      afterValidate,
      state: deref
    });
  }
  return deref;
} // function visit
