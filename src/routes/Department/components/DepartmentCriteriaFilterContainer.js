import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import { listCriteria } from '../redux/department';
import DepartmentCriteriaFilter from './DepartmentCriteriaFilter';

const form = 'department-criteria-filter-form';

const mapStateToProps = (state) => ({
  form,
  department: formValueSelector(form)(state, 'department'),
  name: formValueSelector(form)(state, 'name'),
});

const mapDispatchToProps = (dispatch) => ({
  getCriteria: (values) => {
    dispatch(listCriteria(values));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentCriteriaFilter);
