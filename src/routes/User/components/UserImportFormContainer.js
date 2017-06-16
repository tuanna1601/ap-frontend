import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { importUser } from '../redux/user';
import UserImportForm from './UserImportForm';

const mapStateToProps = (state) => ({
  form: 'user-import',
  isLoading: state.user.isLoadingCreate,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (values) => {
    dispatch(importUser(values.importFile), (data) => {
      if (data) {
        Alert.success('Import thành công');
      }
    });
    dispatch(reset('user-import'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserImportForm);
