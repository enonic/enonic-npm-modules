import cloneDeep from 'lodash.clonedeep';
import getIn from 'get-value';
import setIn from 'set-value';

import {validateForm} from './validateForm';
import {visit as setVisited} from './visit';


export function setValue({
  action,
  afterValidate = () => {
    /* no-op */
  },
  afterVisit = () => {
    /* no-op */
  },
  initialState,
  onChange = () => {
    /* no-op */
  },
  state
}) {
  const {
    path,
    validate = true,
    value,
    visit = true
  } = action;
  // console.debug('setValue path', path, 'value', value, 'validate', validate, 'visit', visit, 'state', state);

  if (value === getIn(state.values, path)) {
    // console.debug('reducer action', action, 'did not change state', state);
    return state;
  }
  const deref = cloneDeep(state);
  setIn(deref.values, path, value);

  const initialValue = getIn(initialState.values, path);
  setIn(deref.changes, path, value !== initialValue);

  // console.debug('reducer state', state, 'action', action, 'deref', deref);
  onChange(deref.values);
  if (visit) {
    return setVisited({
      action: {
        path,
        validate/* ,
        value: true */
      },
      afterValidate,
      afterVisit,
      state: deref
    });
  }
  if (validate) {
    return validateForm({
      afterValidate,
      state: deref
    });
  }
  return deref;
} // function setValue
