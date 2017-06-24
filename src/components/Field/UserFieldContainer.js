import { connect } from 'react-redux';
import * as _ from 'lodash';

import { listUsers } from '@/store/common';
import UserField from './UserField';

const mapStateToProps = (state, ownProps) => ({
  options: _.chain(state.common.users)
    .filter((user) => (ownProps.filterOptions ? ownProps.filterOptions.indexOf(user._id) < 0 : true))
    .filter((user) => (ownProps.userRole ? user.roles.indexOf(ownProps.userRole) > -1 : true))
    .filter((user) => (ownProps.department ?
      ownProps.department.reviewers.indexOf(user._id) > -1 :
      true))
    .map((user) => ({
      value: user._id,
      label: user.name,
      user
    }))
    .value()
});

const mapDispatchToProps = (dispatch) => ({
  listOptions: () => dispatch(listUsers()),
  resetOptions: () => dispatch(listUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserField);
