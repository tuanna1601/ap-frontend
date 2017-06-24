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
          <SidebarTree treeId="department" className={tree.department ? 'treeview active' : 'treeview'}>
            <a onClick={() => toggleMenu('department')}>
              <i className="fa fa-building" />
              <span>
                Quản lý đơn vị
              </span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
              <SidebarItem treeId="department.list" to="/department">
                <i className="fa fa-sitemap" />
                <span>Cây đơn vị</span>
              </SidebarItem>
            </ul>
          </SidebarTree>
          <SidebarTree treeId="inventory" className={tree.inventory ? 'treeview active' : 'treeview'}>
            <a onClick={() => toggleMenu('inventory')}>
              <i className="fa fa-cubes" />
              <span>
                Quản lý kho
              </span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
              <SidebarItem treeId="inventory.list" to="/inventory">
                <i className="fa fa-list" />
                <span>Danh sách kho</span>
              </SidebarItem>
              <SidebarItem treeId="inventory.list" to="/inventory/create">
                <i className="fa fa-pencil" />
                <span>Tạo kho</span>
              </SidebarItem>
              <SidebarItem treeId="inventory.ads" to="/inventory/ads-preview">
                <i className="fa fa-facebook-square" />
                <span>Facebook Ads Preview</span>
              </SidebarItem>
            </ul>
          </SidebarTree>
          <SidebarTree treeId="ordinate" className={tree.ordinate ? 'treeview active' : 'treeview'}>
            <a onClick={() => toggleMenu('ordinate')}>
              <i className="fa fa-random" />
              <span>
                Điều phối
              </span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
              <SidebarItem treeId="ordinate.list" to="/inventory/ordinator?status=unassigned">
                <i className="fa fa-list" />
                <span>Danh sách kho</span>
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
