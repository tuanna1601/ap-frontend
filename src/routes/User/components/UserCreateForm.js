import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormControl, FormControlMultiSelect } from '@/components/FormControl';
import Validator from '@/helpers/validator';
import { generateRoleOptions } from '@/helpers/helper';

const UserCreateForm = ({ handleSubmit, isLoading, submitting, pristine, reset }) => (
  <form className="modal-form" onSubmit={handleSubmit}>
    <div className="row">
      <div className="col-md-4">
        <div className="form-group">
          <Field
            type="text" component={FormControl}
            id="name"
            name="name"
            label="Họ và tên"
          />
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <Field
            type="email" component={FormControl}
            id="email"
            name="email"
            label="Email"
          />
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <Field
            type="text" component={FormControlMultiSelect}
            options={generateRoleOptions()}
            id="roles"
            name="roles"
            label="Chức vụ"
          />
        </div>
      </div>
      <div className="col-xs-12">
        <button className="btn btn-success btn-flat" type="submit" disabled={submitting || isLoading}>
          {isLoading ? <i className="fa fa-refresh fa-spin" /> : <i className="fa fa-save" />}
        </button>
        <button
          className="btn btn-default btn-flat" type="button"
          disabled={pristine || submitting || isLoading} onClick={reset}
        >
          <i className="fa fa-undo" />
        </button>
      </div>
    </div>
  </form>
);

UserCreateForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  reset: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
};

export default reduxForm({
  validate: (values) => ({
    email: (new Validator(values.email))
      .validateEmail()
      .validateRequired()
      .getMessage(),
    name: (new Validator(values.name))
      .validateRequired()
      .getMessage()
  }),
})(UserCreateForm);
