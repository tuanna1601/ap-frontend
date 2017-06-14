import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class Login extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-md-offset-4 col-md-4">
              <div className="box box-success">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    {this.props.mode === 'login' && <span>Đăng nhập</span>}
                    {this.props.mode === 'register' && <span>Đăng ký</span>}
                  </h3>
                  <div className="box-tools pull-right">
                    {this.props.isLoading && <i className="fa fa-refresh fa-spin" />}
                  </div>
                </div>
                <div className="box-body">
                  {this.props.mode === 'login' &&
                    <div>
                      <LoginForm
                        onSubmit={(values) => this.props.onLogin(values, this.props.lastURL)}
                      />
                    </div>
                  }
                  {this.props.mode === 'register' &&
                    <RegisterForm
                      onSubmit={(values) => this.props.onRegister(values, this.props.lastURL)}
                    />
                  }
                </div>
                <div className="box-footer">
                  <ul className="pull-right login-buttons">
                    {this.props.mode !== 'login' &&
                      <li>
                        <a onClick={this.props.onGoLogin}>
                          Đăng nhập
                        </a>
                      </li>
                    }
                    {this.props.mode !== 'register' &&
                      <li>
                        <a onClick={this.props.onGoRegister}>
                          Đăng ký
                        </a>
                      </li>
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  mode: React.PropTypes.string.isRequired,
  onCodeLogin: React.PropTypes.func.isRequired,
  onLogin: React.PropTypes.func.isRequired,
  onRegister: React.PropTypes.func.isRequired,
  onGoLogin: React.PropTypes.func.isRequired,
  onGoRegister: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  lastURL: React.PropTypes.string,
};

export default Login;
