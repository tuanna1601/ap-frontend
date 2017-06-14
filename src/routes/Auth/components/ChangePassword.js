import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import FormControl from '@/components/FormControl';
import Validator from '@/helpers/validator';

const ChangePassword = ({ handleSubmit, submitting, isLoading }) => (
  <div className="content-wrapper">
    <section className="content">
      <div className="box box-success">
        <div className="box-header with-border">
          <h3 className="box-title">Đổi mật khẩu</h3>
          <div className="box-tools pull-right">
            {isLoading && <i className="fa fa-refresh fa-spin" />}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="box-body">
            <Field type="password" component={FormControl} id="password" name="password" label="Mật khẩu cũ" hasLabel />
            <Field
              type="password" component={FormControl} id="newPassword" name="newPassword"
              label="Mật khẩu mới" hasLabel
            />
            <Field
              type="password" component={FormControl} id="confirmPassword" name="confirmPassword"
              label="Xác nhận mật khẩu" hasLabel
            />
          </div>
          <div className="box-footer">
            <button className="btn btn-success btn-flat" type="submit" disabled={submitting}>
              <i className="fa fa-save" />
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
);

ChangePassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default reduxForm({
  validate: values => ({
    password: (new Validator(values.password)).validateRequired().getMessage(),
    newPassword: (new Validator(values.newPassword)).validateRequired().getMessage(),
    confirmPassword: (new Validator(values.confirmPassword)).validateRequired().getMessage(),
  }),
})(ChangePassword);
