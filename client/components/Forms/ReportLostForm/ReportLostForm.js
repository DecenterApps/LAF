/* eslint no-unused-vars: 0 */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputComponent from '../InputComponent';
import reportLostFormValidator from './reportLostFormValidator';
import { reportLostItem } from '../../../actions/reportActions';
import CircleLoader from '../../Decorative/CircleLoader/CircleLoader';

import formStyle from '../forms.scss';
import btn from '../../../common-styles/buttons.scss';

let ReportLostForm = ({
  handleSubmit, pristine, invalid, submitFormError, hash, submittingForm
}) => (
  <form onSubmit={handleSubmit} styleName="formStyle.form-wrapper">
    <Field
      name="prize"
      showErrorText
      component={InputComponent}
      placeholder="Prize amount in ETH"
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

ReportLostForm.defaultProps = {
  hash: ''
};

ReportLostForm.propTypes = {
  submitFormError: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  hash: PropTypes.string,
  submittingForm: PropTypes.bool.isRequired
};

ReportLostForm = reduxForm({ form: 'reportLostForm', validate: reportLostFormValidator })(ReportLostForm);

const mapStateToProps = (state) => ({
  submitFormError: state.items.reportingLostError,
  submittingForm: state.items.reportingLost,
  hash: state.modals.modalProps.hash
});

const mapDispatchToProps = {
  onSubmit: reportLostItem
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportLostForm);
