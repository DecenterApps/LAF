import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputComponent from '../InputComponent';
import formStyle from '../forms.scss';
import exampleFormValidator from './exampleFormValidator';

let ExampleForm = ({ handleSubmit, pristine, invalid }) => (
  <form onSubmit={handleSubmit} styleName="form-wrapper">
    <Field
      name="username"
      showErrorText
      component={InputComponent}
      placeholder="Username"
      type="text"
      wrapperClassName={formStyle['form-item-wrapper']}
      inputClassName={formStyle['form-item']}
      errorClassName={formStyle['form-item-error']}
    />

    <Field
      name="password"
      showErrorText
      component={InputComponent}
      placeholder="Password"
      type="text"
      wrapperClassName={formStyle['form-item-wrapper']}
      inputClassName={formStyle['form-item']}
      errorClassName={formStyle['form-item-error']}
    />

    <button
      styleName="submit-button"
      type="submit"
      disabled={pristine || invalid}
    >
      Submit
    </button>
  </form>
);

ExampleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired
};

ExampleForm = reduxForm({ form: 'exampleForm', validate: exampleFormValidator })(ExampleForm);

export default connect(null, { onSubmit: () => (dispatch) => { console.log('action goes here', dispatch); } })(ExampleForm);
