/* eslint no-unused-vars: 0 */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputComponent from '../InputComponent';
import addItemFormValidator from './addItemFormValidator';
import { addItem } from '../../../actions/reportActions';
import CircleLoader from '../../Decorative/CircleLoader/CircleLoader';

import formStyle from '../forms.scss';
import btn from '../../../common-styles/buttons.scss';

let AddItemForm = ({ handleSubmit, pristine, invalid, submitFormError, submittingForm }) => (
  <form onSubmit={handleSubmit} styleName="formStyle.form-wrapper">
    <Field
      name="hash"
      showErrorText
      component={InputComponent}
      placeholder="Item hash"
      type="text"
      wrapperClassName={formStyle['form-item-wrapper']}
      inputClassName={formStyle['form-item']}
      errorClassName={formStyle['form-item-error']}
    />

    <Field
      name="name"
      showErrorText
      component={InputComponent}
      placeholder="Item name"
      type="text"
      wrapperClassName={formStyle['form-item-wrapper']}
      inputClassName={formStyle['form-item']}
      errorClassName={formStyle['form-item-error']}
    />

    <Field
      name="location"
      showErrorText
      component={InputComponent}
      placeholder="Last location"
      type="text"
      wrapperClassName={formStyle['form-item-wrapper']}
      inputClassName={formStyle['form-item']}
      errorClassName={formStyle['form-item-error']}
    />

    <Field
      name="imageUrl"
      showErrorText
      component={InputComponent}
      placeholder="Image URL"
      type="text"
      wrapperClassName={formStyle['form-item-wrapper']}
      inputClassName={formStyle['form-item']}
      errorClassName={formStyle['form-item-error']}
    />

    <Field
      name="email"
      showErrorText
      component={InputComponent}
      placeholder="Your email"
      type="text"
      wrapperClassName={formStyle['form-item-wrapper']}
      inputClassName={formStyle['form-item']}
      errorClassName={formStyle['form-item-error']}
    />

    <Field
      name="phone"
      showErrorText
      component={InputComponent}
      placeholder="Your phone number"
      type="text"
      wrapperClassName={formStyle['form-item-wrapper']}
      inputClassName={formStyle['form-item']}
      errorClassName={formStyle['form-item-error']}
    />

    {
      submitFormError && <div styleName="formStyle.submit-error">{ submitFormError }</div>
    }

    <button
      styleName="btn.btn btn.btn-md formStyle.submit-button"
      type="submit"
      disabled={pristine || invalid || submittingForm}
    >
      {
        submittingForm && <span styleName="formStyle.loader-wrapper"><CircleLoader /></span>
      }
      <span>{ submittingForm ? 'Submitting' : 'Submit' }</span>
    </button>
  </form>
);

AddItemForm.propTypes = {
  submitFormError: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submittingForm: PropTypes.bool.isRequired
};

AddItemForm = reduxForm({ form: 'addItemForm', validate: addItemFormValidator })(AddItemForm);

const mapStateToProps = (state) => ({
  submitFormError: state.items.addingItemError,
  submittingForm: state.items.addingItem
});

const mapDispatchToProps = {
  onSubmit: addItem
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItemForm);
