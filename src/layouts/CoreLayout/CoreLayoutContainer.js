import { connect } from 'react-redux';
import { hideSideBar } from '@/store/theme';
import CoreLayout from './CoreLayout';

const mapStateToProps = (state) => ({
  isSidebarOpen: state.theme.isSidebarOpen,
  isLoggedIn: state.auth.isLoggedIn,
  browser: state.browser,
});

const mapDispatchToProps = (dispatch) => ({
  hideSideBar: () => dispatch(hideSideBar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
