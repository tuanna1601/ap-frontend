import { connect } from 'react-redux';
import * as _ from 'lodash';

import { listDepartments } from '@/store/common';
import DepartmentField from './DepartmentField';

const mapStateToProps = (state, ownProps) => ({
  departments: _.chain(state.common.departments)
    .filter((department) => (ownProps.filterOptions ?
      ownProps.filterOptions.indexOf(department.id) < 0 :
      true))
    .value()
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  listDepartments: () => dispatch(listDepartments(ownProps.params))
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentField);
