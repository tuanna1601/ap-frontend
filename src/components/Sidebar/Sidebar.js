import React from 'react';
import RBAC from '@/components/RBAC';
import SidebarItem from './SidebarItemContainer';
import SidebarTree from './SidebarTreeContainer';

const Sidebar = ({ isLoggedIn, toggleMenu, tree }) => (
  <div className="main-sidebar">
    <div className="sidebar">
    </div>
  </div>
);

Sidebar.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired,
  toggleMenu: React.PropTypes.func.isRequired,
  tree: React.PropTypes.object.isRequired,
};

export default Sidebar;
