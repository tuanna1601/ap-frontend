import { connect } from 'react-redux';
import { reset } from 'redux-form';
import Alert from 'react-s-alert';
import { createStep } from '../redux/department';

import DepartmentStepCreate from './DepartmentStepCreate';

const mapStateToProps = (state, ownProps) => ({
  form: 'step-create-form',
  initialValues: {
    department: ownProps.department
  },
  criteria: state.department.criteria,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (values) => {
    dispatch(createStep(values, (data) => {
      Alert.success(`${data.title} đã được tạo thành công`);
      dispatch(reset('step-create-form'));
    }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentStepCreate);
