import { connect } from 'react-redux';
import RBAC from './RBAC';

const mapStateToProps = (state) => ({
  token: state.auth.token,
  user: state.auth.user,
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(RBAC);
