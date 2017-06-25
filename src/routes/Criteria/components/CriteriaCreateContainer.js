import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

import { createCriteria } from '../redux/criteria';
import CriteriaForm from './CriteriaForm';

const mapStateToProps = () => ({
  form: 'criteria-create',
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (values) => {
    dispatch(createCriteria(values, () => {
      Alert.success('Tiêu chí đã được tạo thành công');
      dispatch(reset('criteria-create'));
    }));
  },
  onFieldArrayRemoved(fields, index) {
    fields.remove(index);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CriteriaForm);
