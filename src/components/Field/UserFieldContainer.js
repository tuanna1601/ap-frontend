import { connect } from 'react-redux';
import * as _ from 'lodash';

import { listUsers } from '@/store/common';
import UserField from './UserField';

const mapStateToProps = (state, ownProps) => ({
  options: _.chain(state.common.users)
    .filter((user) => ownProps.filterOptions.indexOf(user._id) < 0)
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
