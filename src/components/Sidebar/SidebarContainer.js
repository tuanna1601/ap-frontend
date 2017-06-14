import { connect } from 'react-redux';
import { toggleMenu } from '@/store/theme';
import Sidebar from './Sidebar';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  tree: state.theme.tree,
});

const mapDispatchToProps = (dispatch) => ({
  toggleMenu: (menu) => dispatch(toggleMenu(menu)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
