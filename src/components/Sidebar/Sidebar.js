import React from 'react';
import RBAC from '@/components/RBAC';
import SidebarItem from './SidebarItemContainer';
import SidebarTree from './SidebarTreeContainer';

const Sidebar = ({ isLoggedIn, toggleMenu, tree }) => (
  <div className="main-sidebar">
    <div className="sidebar">
      {isLoggedIn &&
        <ul className="sidebar-menu">
          <SidebarTree treeId="user" className={tree.user ? 'treeview active' : 'treeview'}>
            <a onClick={() => toggleMenu('user')}>
              <i className="fa fa-user-secret" />
              <span>
                Quản lý nhân viên
              </span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
              <SidebarItem treeId="user.list" to="/user">
                <i className="fa fa-list" />
                <span>Danh sách</span>
              </SidebarItem>
            </ul>
          </SidebarTree>
        </ul>
      }
    </div>
  </div>
);

Sidebar.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired,
  toggleMenu: React.PropTypes.func.isRequired,
  tree: React.PropTypes.object.isRequired,
};

export default Sidebar;
