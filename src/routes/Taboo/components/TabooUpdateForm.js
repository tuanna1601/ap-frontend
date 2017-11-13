import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import { FormControl } from '@/components/FormControl';

const TabooUpdateForm = ({ handleSubmit, submitting, pristine, reset, form }) => (
  <form className="modal-form" onSubmit={handleSubmit}>
    <div className="row">
      <div className="col-md-6">
        <Field
          type="text" component={FormControl}
          id={`${form}.name`} name="name"
          label="Tên từ cấm"
        />
      </div>
    </div>
    <div className="button-list">
      <button className="btn btn-success btn-flat" type="submit" disabled={submitting}>
        <i className="fa fa-save" />
      </button>
      <button
        className="btn btn-default btn-flat" type="button"
        disabled={pristine || submitting} onClick={reset}
      >
        <i className="fa fa-undo" />
      </button>
    </div>
  </form>
);

TabooUpdateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,
};

export default reduxForm()(TabooUpdateForm);
