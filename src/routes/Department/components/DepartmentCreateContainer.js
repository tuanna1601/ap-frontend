import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { createDepartment } from '../redux/department';
import DepartmentForm from './DepartmentForm';

const mapStateToProps = (state) => ({
  form: 'department-create',
  isLoading: state.department.isLoadingCreate,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (values) => {
    dispatch(createDepartment(values, (data) => {
      Alert.success(`${data.name} đã được tạo thành công`);
      dispatch(reset('department-create'));
    }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentForm);
