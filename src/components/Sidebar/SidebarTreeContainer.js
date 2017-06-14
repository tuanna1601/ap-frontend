import { connect } from 'react-redux';
import SidebarTree from './SidebarTree';

const mapStateToProps = (state) => ({
  currentItem: state.theme.item
});

export default connect(mapStateToProps)(SidebarTree);
