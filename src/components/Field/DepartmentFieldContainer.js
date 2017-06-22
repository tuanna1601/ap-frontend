import { connect } from 'react-redux';
import { reduce } from 'lodash';

import { listDepartments } from '@/store/common';
import DepartmentField from './DepartmentField';

const mapStateToProps = (state) => ({
  departments: reduce(state.common.departments, (deptArr, dept) => {
    deptArr.push(dept);
    return deptArr;
  }, [])
});

const mapDispatchToProps = (dispatch) => ({
  listDepartments: () => dispatch(listDepartments())
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentField);
