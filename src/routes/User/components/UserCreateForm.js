import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormControl, FormControlSelect } from '@/components/FormControl';
import Validator from '@/helpers/validator';

const UserCreateForm = ({ handleSubmit, isLoading, submitting, pristine, reset }) => (
  <form className="table-row" onSubmit={handleSubmit}>
    <div className="row">
      1
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
  validate: () => ({
  }),
})(UserCreateForm);
