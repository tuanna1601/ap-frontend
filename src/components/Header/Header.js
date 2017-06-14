import React from 'react';
import { IndexLink, Link } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userMenuOpen: false,
    };
  }

  render() {
    return (
      <div className="main-header">
        <IndexLink to="/" className="logo">
          <span className="logo-mini"><b>A</b>P</span>
          <span className="logo-lg"><b>Ads</b>Police</span>
        </IndexLink>
        <nav className="navbar navbar-static-top" role="navigation">
          <button className="sidebar-toggle" data-toggle="offcanvas" role="button" onClick={this.props.onToggleSidebar}>
            <span className="sr-only">Toggle navigation</span>
          </button>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              {this.props.isLoggedIn &&
                <li className={`dropdown user user-menu ${this.state.userMenuOpen && 'open'}`}>
                  <a
                    className="dropdown-toggle"
                    onClick={() => this.setState({ userMenuOpen: !this.state.userMenuOpen })}
                  >
                    <i className="fa fa-fw fa-user-secret" />
                    <span className="hidden-xs">{this.props.currentUser.name}</span>
                  </a>
                  <ul className="dropdown-menu" onClick={() => this.setState({ userMenuOpen: false })}>
                    <li className="user-header">
                      <p>
                        {this.props.currentUser.name}
                      </p>
                    </li>
                    <li className="user-footer">
                      <div className="pull-left">
                        <Link to="/auth/change-password" className="btn btn-default btn-flat">
                          Đổi mật khẩu
                        </Link>
                      </div>
                    </li>
                  </ul>
                </li>
              }
              {this.props.isLoggedIn &&
                <li>
                  <a onClick={this.props.onLogout}>
                    <i className="fa fa-fw fa-power-off" /> Đăng xuất
                  </a>
                </li>
              }
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  onLogout: React.PropTypes.func.isRequired,
  onToggleSidebar: React.PropTypes.func.isRequired,
};

export default Header;
