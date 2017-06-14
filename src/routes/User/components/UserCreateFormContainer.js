import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { createUser } from '../redux/user';
import UserCreateForm from './UserCreateForm';

const mapStateToProps = (state) => ({
  form: 'user-create',
  isLoading: state.user.isLoadingCreate,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (values) => {
    dispatch(createUser(values, (data) => {
      Alert.success(`${data.name} đã được tạo thành công`);
      dispatch(reset('user-create'));
    }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCreateForm);
