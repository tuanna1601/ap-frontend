import { connect } from 'react-redux';
import axios from 'axios';
import Alert from 'react-s-alert';

import UserField from './UserField';

const listUsers = (userRole, department, auth, callback) => {
  if (!auth) {
    return;
  }

  let url = `${__CONFIG__.API.SERVER_URL}/users`;

  if (userRole === 'reviewer' && department) {
    url = `${__CONFIG__.API.SERVER_URL}/departments/${department.id}/reviewers`;
  }

  const authStr = `Bearer ${auth.token}`;

  axios.get(url, {
    headers: {
      Authorization: authStr,
    },
  }).then((res) => {
    if (callback) {
      callback(res.data);
    }
  }).catch(error => {
    if (typeof error !== 'string') {
      Alert.error(error.message);
    } else {
      Alert.error(error);
    }
  });
};

const mapStateToProps = (state, ownProps) => ({
  listOptions: (callback) => listUsers(ownProps.userRole, ownProps.department, state.auth, callback),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserField);
