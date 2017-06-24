import { connect } from 'react-redux';
import { arrayPush, formValueSelector } from 'redux-form';
import * as _ from 'lodash';

import { listUsers } from '@/store/common';

import DepartmentUsersForm from './DepartmentUsersForm';

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    ...ownProps.department,
  },
  users: formValueSelector(ownProps.form)(state, ownProps.userRole) ?
    formValueSelector(ownProps.form)(state, ownProps.userRole) : []
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  listUsers: () => dispatch(listUsers()),
  addUser: (value) => {
    if (value) {
      dispatch(arrayPush(ownProps.form, ownProps.userRole, value.user));
    }
  },
  onFieldArrayRemoved: (fields, index) => {
    fields.remove(index);
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(DepartmentUsersForm);
