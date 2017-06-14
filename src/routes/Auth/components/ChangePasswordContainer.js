import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import ChangePassword from './ChangePassword';
import { changePassword } from '../redux/auth';

const mapStateToProps = (state) => ({
  form: 'change-password',
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: values => dispatch(changePassword(values, () => {
    Alert.success('Đổi mật khẩu thành công');
    dispatch(reset('change-password'));
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
