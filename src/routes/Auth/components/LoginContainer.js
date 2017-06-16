import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import { push } from 'react-router-redux';
import { login, goLogin, googleLogin } from '../redux/auth';
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
  onGoogleLogin: (values, redirectURL) => {
    const { tokenId } = values;
    dispatch(googleLogin(tokenId, () => {
      Alert.success('Đăng nhập thành công');
      dispatch(push(getRedirectURL(redirectURL)));
    }));
  },
  onGoogleLoginFailed: (err) => {
    Alert.err('Có lỗi xảy ra khi đăng nhập Google');
    console.error(err);
  },
  onGoLogin: () => dispatch(goLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
