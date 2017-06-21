import { connect } from 'react-redux';
import { reduce } from 'lodash';

import { listDepartments } from '@/routes/Department/redux/department';
import DepartmentField from './DepartmentField';

const mapStateToProps = (state) => ({
  departments: reduce(state.department.departments, (deptArr, dept) => {
    deptArr.push(dept);
    return deptArr;
  }, [])
});

const mapDispatchToProps = (dispatch) => ({
  listDepartments: () => dispatch(listDepartments())
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentField);
