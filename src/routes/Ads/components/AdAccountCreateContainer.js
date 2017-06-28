import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

import { createAdAccount } from '../redux/ads';
import AdAccountForm from './AdAccountForm';

const mapStateToProps = () => ({
  form: 'ad-account-create',
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (values) => {
    dispatch(createAdAccount(values, (data) => {
      Alert.success(`${data.name} đã được thêm thành công`);
      dispatch(reset('ad-account-create'));
    }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdAccountForm);
