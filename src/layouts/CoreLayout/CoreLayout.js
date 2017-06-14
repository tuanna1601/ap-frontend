import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { ConfirmModal, FormModal, InfoModal } from '@/components/Modal';
import Alert from 'react-s-alert';
import 'admin-lte/bootstrap/css/bootstrap.min.css';
import 'admin-lte/dist/css/AdminLTE.min.css';
import 'admin-lte/dist/css/skins/skin-green.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-select/dist/react-select.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import '@/styles/core.scss';

class CoreLayout extends React.Component {
  componentDidMount() {
    if (!this.props.browser.greaterThan.large) {
      this.props.hideSideBar();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.browser.width < this.props.browser.width && !nextProps.browser.greaterThan.large) {
      this.props.hideSideBar();
    }
  }

  render() {
    const { isSidebarOpen, children, isLoggedIn } = this.props;
    const bodyClass = `skin-green sidebar-mini ${isSidebarOpen ? 'sidebar-open' : 'sidebar-collapse'} ${isLoggedIn ? '' : 'auth-layout'}`;

    return (
      <div className={bodyClass} style={{ height: '100%' }}>
        <Alert
          stack={{ limit: 5, spacing: 10 }}
          position="top-right"
          offset={75}
          timeout={5000}
          effect="slide"
        />

        <ConfirmModal />
        <FormModal />
        <InfoModal />
        <div className="wrapper">
          <Header />
          <Sidebar />
          {children}
        </div>
      </div>
    );
  }
}

CoreLayout.propTypes = {
  browser: React.PropTypes.object.isRequired,
  isSidebarOpen: React.PropTypes.bool.isRequired,
  isLoggedIn: React.PropTypes.bool.isRequired,
  hideSideBar: React.PropTypes.func.isRequired,
  children: React.PropTypes.element.isRequired,
};

export default CoreLayout;
