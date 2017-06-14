import { connect } from 'react-redux';
import { updateSidebarItem } from '@/store/theme.js';
import SidebarItem from './SidebarItem';

const mapStateToProps = (state) => ({
  reduxRouter: state.router,
});

const mapDispatchToProps = (dispatch) => ({
  updateSidebarItem: (item) => dispatch(updateSidebarItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarItem);
