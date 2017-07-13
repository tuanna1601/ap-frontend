import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { UserField } from '@/components/Field';

import { FormControl } from '@/components/FormControl';

const InventoryAssignForm = ({ handleSubmit, submitting, pristine, reset, form, department }) => (
  <form className="modal-form" onSubmit={handleSubmit}>
    <div className="row">
      <div className="col-md-6">
        <Field
          type="text" component={FormControl}
          id={`${form}.name`} name="name"
          label="Tên kho" hasLabel
          readOnly
        />
        <Field
          type="hidden" component={FormControl}
          id={`${form}.id`} name="id"
          readOnly
        />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <UserField
          id={`${form}.userId`} name="userId"
          label="Người duyệt" hasLabel
          userRole="reviewer"
          autoSelect={false}
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

InventoryAssignForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,

  form: PropTypes.string.isRequired,
  department: PropTypes.object.isRequired
};

export default reduxForm()(InventoryAssignForm);
