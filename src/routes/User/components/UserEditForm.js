import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormControl, FormControlSelect } from '@/components/FormControl';
import Validator from '@/helpers/validator';

const UserEditForm = ({ form,
  handleSubmit, submitting, pristine, reset,
  initialValues }) => (
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className="row">
        1
      </div>
    </form>
);

UserEditForm.propTypes = {
  form: React.PropTypes.string.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  reset: React.PropTypes.func.isRequired,
  initialValues: React.PropTypes.object.isRequired,
};

export default reduxForm({
  validate: (values) => ({
  }),
})(UserEditForm);
