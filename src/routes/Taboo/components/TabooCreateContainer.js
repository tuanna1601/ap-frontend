import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

import { createTaboo } from '../redux/taboo';
import TabooForm from './TabooForm';

const mapStateToProps = () => ({
  form: 'taboo-create',
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (values) => {
    dispatch(createTaboo(values, () => {
      Alert.success('Tiêu chí đã được tạo thành công');
      dispatch(reset('taboo-create'));
    }));
  },
  onFieldArrayRemoved(fields, index) {
    fields.remove(index);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TabooForm);
