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
          <SidebarTree treeId="ads" className={tree.ads ? 'treeview active' : 'treeview'}>
            <a onClick={() => toggleMenu('ads')}>
              <i className="fa fa-facebook-square" />
              <span>
                Quản lý Ads
              </span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
              <SidebarItem treeId="ads.list" to="/ads">
                <i className="fa fa-list" />
                <span>Danh sách Ads</span>
              </SidebarItem>
              <SidebarItem treeId="ads.list-flagged" to="/ads/flagged">
                <i className="fa fa-list" />
                <span>Danh sách Ads Bị gắn cờ</span>
              </SidebarItem>
              <SidebarItem treeId="ads.accounts" to="/ads/accounts">
                <i className="fa fa-users" />
                <span>Danh sách Business</span>
              </SidebarItem>
              <SidebarItem treeId="ads.report-list" to="/ads/reports">
                <i className="fa fa-flag" />
                <span>Danh sách vi phạm</span>
              </SidebarItem>
              <SidebarItem treeId="ads.report" to="/ads/report">
                <i className="fa fa-bug" />
                <span>Báo cáo Ads</span>
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
              <SidebarItem treeId="department.criteria" to="/criteria">
                <i className="fa fa-align-left" />
                <span>Tiêu chí</span>
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
              <SidebarItem treeId="inventory.taboo" to="/taboo">
                <i className="fa fa-ban" />
                <span>Quản lý từ cấm</span>
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
          <SidebarTree treeId="review" className={tree.review ? 'treeview active' : 'treeview'}>
            <a onClick={() => toggleMenu('review')}>
              <i className="fa fa-tasks" />
              <span>
                Duyệt kho
              </span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
              <SidebarItem treeId="review.list" to="/inventory/reviewer?status=assigned">
                <i className="fa fa-list" />
                <span>Danh sách kho</span>
              </SidebarItem>
            </ul>
          </SidebarTree>
          <SidebarTree treeId="report" className={tree.report ? 'treeview active' : 'treeview'}>
            <a onClick={() => toggleMenu('report')}>
              <i className="fa fa-book" />
              <span>
                Báo cáo
              </span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
              <SidebarItem treeId="report.inventory" to="/report">
                <i className="fa fa-cubes" />
                <span>Báo cáo kho</span>
              </SidebarItem>
              <SidebarItem treeId="report.ads" to="/report/ads">
                <i className="fa fa-facebook-square" />
                <span>Báo cáo Ads</span>
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
