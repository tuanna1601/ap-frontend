import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import { FormControl } from '@/components/FormControl';
import { DepartmentField } from '@/components/Field';

const CriteriaUpdateForm = ({ handleSubmit, submitting, pristine, reset, form }) => (
  <form className="modal-form" onSubmit={handleSubmit}>
    <div className="row">
      <div className="col-md-4">
        <DepartmentField
          id={`${form}.department`} name="department"
          label="Đơn vị"
          hasRoot
        />
      </div>
      <div className="col-md-4">
        <Field
          type="text" component={FormControl}
          id={`${form}.name`} name="name"
          label="Tên tiêu chí"
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

CriteriaUpdateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,
};

export default reduxForm()(CriteriaUpdateForm);
