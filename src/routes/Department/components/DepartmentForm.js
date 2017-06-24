import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormControl } from '@/components/FormControl';
import { DepartmentField } from '@/components/Field';
import Validator from '@/helpers/validator';

const DepartmentForm = ({ handleSubmit, submitting, pristine, reset, form, filterOptions }) => (
  <form className="modal-form" onSubmit={handleSubmit}>
    <div className="row">
      <div className="col-md-6">
        <DepartmentField
          id={`${form}.parent`} name="parent"
          filterOptions={filterOptions}
          label="Đơn vị cha"
          hasLabel hasRoot
        />
      </div>
      <div className="col-md-6">
        <Field type="text" component={FormControl} id={`${form}.name`} name="name" label="Tên (*)" hasLabel />
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

DepartmentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,

  filterOptions: PropTypes.array,
};

export default reduxForm({
  validate: values => ({
    name: (new Validator(values.name)).validateRequired().getMessage(),
    barcodePrefix: (new Validator(values.barcodePrefix)).validateRequired().getMessage(),
  }),
})(DepartmentForm);
