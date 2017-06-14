import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormControl from '@/components/FormControl';
import Validator from '@/helpers/validator';

const LoginForm = ({ handleSubmit, submitting }) => (
  <form onSubmit={handleSubmit}>
    <Field type="email" component={FormControl} id="email" name="email" label="Email" hasLabel />
    <Field type="password" component={FormControl} id="password" name="password" label="Mật khẩu" hasLabel />
    <button className="btn btn-success btn-flat" type="submit" disabled={submitting}>Đăng nhập</button>
  </form>
);

LoginForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'login',
  validate: (values) => ({
    email: (new Validator(values.email)).validateRequired().validateEmail().getMessage(),
    password: (new Validator(values.password)).validateRequired().getMessage(),
  }),
})(LoginForm);
