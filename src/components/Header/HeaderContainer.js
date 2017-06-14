import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logout } from '@/routes/Auth/redux/auth';
import { toggleSidebar } from '@/store/theme';
import Header from './Header';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  currentUser: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => {
    dispatch(logout(() => {
      dispatch(push('/auth'));
    }));
  },
  onToggleSidebar: () => dispatch(toggleSidebar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
