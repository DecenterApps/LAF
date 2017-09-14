/* eslint no-unused-vars: 0 */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputComponent from '../InputComponent';
import reportLostFormValidator from './reportLostFormValidator';
import { reportLostItem } from '../../../actions/itemsActions';

import formStyle from '../forms.scss';
import btn from '../../../common-styles/buttons.scss';

let ReportLostForm = ({ handleSubmit, pristine, invalid, submitFormError, hash }) => (
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
      hash && <h1>HASH: {hash}</h1>
    }

    {
      submitFormError && <div styleName="formStyle.submit-error">{ submitFormError }</div>
    }

    <button
      styleName="btn.btn btn.btn-md formStyle.submit-button"
      type="submit"
      disabled={pristine || invalid}
    >
      Submit
    </button>
  </form>
);

ReportLostForm.propTypes = {
  submitFormError: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  hash: PropTypes.string.isRequired
};

ReportLostForm = reduxForm({ form: 'reportLostForm', validate: reportLostFormValidator })(ReportLostForm);

const mapStateToProps = (state) => ({
  submitFormError: state.items.reportingLostError,
  hash: state.modals.modalProps.hash
});

const mapDispatchToProps = {
  onSubmit: reportLostItem
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportLostForm);