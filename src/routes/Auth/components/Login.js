import React from 'react';
import GoogleLogin from 'react-google-login';
import LoginForm from './LoginForm';

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
                  <hr />
                  <GoogleLogin
                    className="btn btn-success btn-flat"
                    clientId="223830990877-7cae8v3l7pohk9q976m73qk56pu240e6.apps.googleusercontent.com"
                    buttonText="Đăng nhập bằng Google"
                    onSuccess={(values) => this.props.onGoogleLogin(values, this.props.lastURL)}
                    onFailure={(err) => this.props.onGoogleLoginFailed(err)}
                  />
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
  onLogin: React.PropTypes.func.isRequired,
  onGoogleLogin: React.PropTypes.func.isRequired,
  onGoogleLoginFailed: React.PropTypes.func.isRequired,
  onGoLogin: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  lastURL: React.PropTypes.string,
};

export default Login;
