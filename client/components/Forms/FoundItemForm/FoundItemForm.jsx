/* eslint no-unused-vars: 0 */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputComponent from '../InputComponent';
import { reportFoundItem } from '../../../actions/reportActions';
import foundItemFormValidator from './foundItemFormValidator';
import CircleLoader from '../../Decorative/CircleLoader/CircleLoader';

import formStyle from '../forms.scss';
import fif from './found-item-form.scss';
import btn from '../../../common-styles/buttons.scss';

let FoundItemForm = ({ handleSubmit, pristine, invalid, submitFormError, submittingForm }) => (
  <form onSubmit={handleSubmit} styleName="formStyle.form-wrapper fif.find-item-form-wrapper">
    <Field
      name="hash"
      showErrorText
      component={InputComponent}
      placeholder="Lost item hash"
      type="text"
      wrapperClassName={formStyle['form-item-wrapper']}
      inputClassName={formStyle['form-item']}
      errorClassName={formStyle['form-item-error']}
    />

    {
      submitFormError && <div styleName="formStyle.submit-error">{ submitFormError }</div>
    }

    <button
      styleName="btn.btn-orange btn.btn-md formStyle.submit-button"
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

FoundItemForm.propTypes = {
  submitFormError: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submittingForm: PropTypes.bool.isRequired
};

FoundItemForm = reduxForm({ form: 'foundItemForm', validate: foundItemFormValidator })(FoundItemForm);

const mapStateToProps = (state) => ({
  submitFormError: state.items.findingItemError,
  submittingForm: state.items.findingItem
});

const mapDispatchToProps = {
  onSubmit: reportFoundItem
};

export default connect(mapStateToProps, mapDispatchToProps)(FoundItemForm);
