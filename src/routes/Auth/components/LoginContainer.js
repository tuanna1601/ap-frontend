import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import { push } from 'react-router-redux';
import { login, goLogin } from '../redux/auth';
import Login from './Login';

const mapStateToProps = (state) => ({
  mode: state.auth.mode,
  isLoading: state.auth.isLoading,
  lastURL: state.auth.lastURL,
});

function getRedirectURL(redirectURL) {
  if (!redirectURL || redirectURL === '/auth') {
    return '/';
  }
  return redirectURL;
}

const mapDispatchToProps = (dispatch) => ({
  onLogin: (values, redirectURL) => {
    const { email, password } = values;

    dispatch(login(email, password, () => {
      Alert.success('Đăng nhập thành công');
      dispatch(push(getRedirectURL(redirectURL)));
    }));
  },
  onGoLogin: () => dispatch(goLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
