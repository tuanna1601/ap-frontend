import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

import { createBusiness } from '../redux/ads';
import BusinessForm from './BusinessForm';

const mapStateToProps = () => ({
  form: 'business-create',
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (values) => {
    dispatch(createBusiness(values, (data) => {
      Alert.success(`${data.name} đã được thêm thành công`);
      dispatch(reset('business-create'));
    }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessForm);
