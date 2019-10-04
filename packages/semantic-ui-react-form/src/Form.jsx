/*

The submit button should be disabled if the form doesn't validate.
(Perhaps also if there are no changes?,
but that could make it impossible to submit a form that is initially valid.)

* Thus we need to validate the entire form on init.

* When you leave a field it should be set to visited.

* When you change or leave a field it should be validated.

--

Lets think about dynamic loaded child form:

? Should the goal be that the root form reflects the total state at all times ?
* It would be nice to tell who many fields has errors, changes or have been visited in the root form.

! Validating the same field more than once should be avoided

? What if the child form is not the same type of form
! The root form has no (knowledge, reference, callback) to the child form.
! The root form can only pass on state via props.

! It would be preferable that the child form conformed to some interface/API definition.
* Which has a common, importable implementation, so each child form doesn't have to
  understand the inner workings of the root form.

! Allowing the child form direct access to the root form context seems dangerous.

2 Possibilities:
1. Blank new form with no child form data
2. Previously persisted form, perhaps with child form data

How can I know the difference between 1 and 2?
It should be enough to check whether root.context.values.childFormPath is true

Let's consider option 1:

1. On init, root form has a context with no entries related to the child form.
2. User pick's a child form in a drop down.
3. Child form called with root context and dispatch as props.
4. On child form init, it's context should be applied to root context, which
   will immediatly trigger "reflow" since root context is changed.


5.1 At this point we could either call a validate in the child form,
    and apply that data to the root form.

5.2 Since the root schema has been changedm run a validate in the root form,
    and pass on changes to child form
    (by props? root form as no reference or callback to child form)

. Does user activity in root form affect child form?
  Yes, running validate in root form, should trigger validate in child form...

. Any user activity in child form, needs to update root form...
*/

import cloneDeep from 'lodash.clonedeep';
// import {Form as SemanticUiReactForm} from 'semantic-ui-react';
import { EnonicProvider } from './Context';
import { reducerGenerator } from './reducerGenerator';
import { validateForm } from './handlers/validateForm';
import { isFunction } from './utils/isFunction';


export function Form(props) {
  // console.debug('Form props', props);

  const {
    afterValidate = () => {
      /* no-op */
    },
    afterVisit = () => {
      /* no-op */
    },
    children,
    onChange = () => {
      /* no-op */
    },
    onDelete = () => {
      /* no-op */
    },
    onSubmit = () => {
      /* no-op */
    },
    validateOnInit = true
  } = props;

  // const initialSchema = props.schema ? props.schema : {}; // warning no deref!
  const initialSchema = props.schema ? cloneDeep(props.schema) : {}; // deref
  // console.debug('Form initialSchema', initialSchema);

  const initialValues = cloneDeep(
    isFunction(props.initialValues)
      ? props.initialValues()
      : props.initialValues
  );

  /* function validate({ schema, values }) {
    // console.debug('Form validate schema', schema);
    const errors = {};
    traverse(schema).forEach(function(x) {
      // fat-arrow destroys this
      if (this.notRoot && this.isLeaf && isFunction(x)) {
        const { path } = this; // console.debug('path', path);
        const value = getIn(values, path); // console.debug('value', value);
        const newError = x(value); // console.debug('newError', newError);
        newError && setIn(errors, path, newError);
      }
    });
    return errors;
  } // validate */

  let initialState = {
    changes: {},
    errors: {},
    schema: initialSchema,
    values: initialValues,
    visits: {}
  };
  // console.debug('Form initialState', initialState);

  const isFirstRun = React.useRef(true);
  if (isFirstRun.current) {
    isFirstRun.current = false;
    if (validateOnInit) {
      initialState = validateForm({
        afterValidate,
        state: initialState,
        visitAllFields: false
      });
    }
  }

  const reducer = reducerGenerator({
    afterValidate,
    afterVisit,
    initialState,
    onChange,
    onDelete,
    onSubmit
  });

  return (
    <EnonicProvider initialState={initialState} reducer={reducer}>
      {children}
    </EnonicProvider>
  );
} // Form
