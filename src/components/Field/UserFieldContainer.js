import { connect } from 'react-redux';
import * as _ from 'lodash';

import { listUsers } from '@/store/common';
import UserField from './UserField';

const mapStateToProps = (state, ownProps) => ({
  options: _.chain(state.common.users)
    .filter((user) => (ownProps.filterOptions ? ownProps.filterOptions.indexOf(user.id) < 0 : true))
    .filter((user) => (ownProps.userRole ? user.roles.indexOf(ownProps.userRole) > -1 : true))
    .map((user) => ({
      value: user.id,
      label: user.name,
      user
    }))
    .value()
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  listOptions: () => dispatch(listUsers(ownProps.userRole, ownProps.department)),
  resetOptions: () => dispatch(listUsers(ownProps.userRole, ownProps.department)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserField);
