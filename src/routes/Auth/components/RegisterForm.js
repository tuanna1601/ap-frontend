import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormControl from '@/components/FormControl';
import Validator from '@/helpers/validator';

const RegisterForm = ({ handleSubmit, submitting }) => (
  <form onSubmit={handleSubmit}>
    <Field
      type="text" component={FormControl}
      id="name" name="name"
      label="Tên" hasLabel
    />
    <Field
      type="email" component={FormControl}
      id="email" name="email"
      label="Email" hasLabel
    />
    <Field
      type="password" component={FormControl}
      id="password" name="password"
      label="Mật khẩu" hasLabel
    />
    <button className="btn btn-success btn-flat" type="submit" disabled={submitting}>Đăng ký</button>
  </form>
);

RegisterForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'register',
  validate: (values) => ({
    name: (new Validator(values.name)).validateRequired().getMessage(),
    email: (new Validator(values.email)).validateRequired().validateEmail().getMessage(),
    password: (new Validator(values.password)).validateRequired().getMessage(),
  }),
})(RegisterForm);
