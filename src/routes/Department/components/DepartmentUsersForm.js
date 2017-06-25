import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';

import { map } from 'lodash';

import { FormControl } from '@/components/FormControl';
import { UserField } from '@/components/Field';

class DepartmentUsersForm extends Component {
  constructor(props) {
    super(props);

    this.renderUser = this.renderUser.bind(this);
    this.renderUsers = this.renderUsers.bind(this);
  }

  renderUser(fields, user, index) {
    return (
      <tr key={user}>
        <td>
          <Field
            id={`${user}.id`} name={`${user}.id`}
            type="hidden" component={FormControl}
            readOnly
          />
          <Field
            id={`${user}.name`} name={`${user}.name`}
            type="text" component={FormControl}
            readOnly
          />
        </td>
        <td>
          <Field
            id={`${user}.email`} name={`${user}.email`}
            type="text" component={FormControl}
            readOnly
          />
        </td>
        <td>
          <button
            className="btn btn-xs btn-flat btn-danger" type="button"
            onClick={() => this.props.onFieldArrayRemoved(fields, index)}
          >
            <i className="fa fa-trash" />
          </button>
        </td>
      </tr>
    );
  }

  renderUsers(users) {
    const fields = users.fields;

    return (
      <tbody>
        {fields.map((user, index) => this.renderUser(fields, user, index))}
      </tbody>
    );
  }

  render() {
    const { handleSubmit, submitting, pristine, filterRole,
      reset, form, userRole, addUser, users } = this.props;
    return (
      <div className="modal-form">
        <div className="row">
          <div className="col-md-6">
            <UserField
              label={userRole === 'reviewers' ? 'Người duyệt' : 'Điều phối'}
              id="users" name="users"
              filterOptions={map(users, (user) => user.id)}
              userRole={filterRole}
              onSelect={(event) => addUser(event)}
              autoSelect={false}
              hasLabel
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <table className="table table-condensed table-striped table-bordered table-field-array">
            <thead>
              <tr>
                <th style={{ width: '45%' }}>
                  Tên
                </th>
                <th style={{ width: '45%' }}>
                  Email
                </th>
                <th style={{ width: '10%' }}>
                  &nbsp;
                </th>
              </tr>
            </thead>
            <FieldArray id={`${form}.${userRole}`} name={userRole} component={this.renderUsers} />
          </table>
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
      </div>
    );
  }
}

DepartmentUsersForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,

  users: PropTypes.array.isRequired,
  userRole: PropTypes.string.isRequired,
  filterRole: PropTypes.string.isRequired,

  addUser: PropTypes.func.isRequired,
  onFieldArrayRemoved: PropTypes.func.isRequired,
};

export default reduxForm()(DepartmentUsersForm);
