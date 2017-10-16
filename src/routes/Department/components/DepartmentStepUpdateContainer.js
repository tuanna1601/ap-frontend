import { connect } from 'react-redux';

import DepartmentStepUpdate from './DepartmentStepUpdate';

const mapStateToProps = (state) => ({
  criteria: state.department.criteria,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentStepUpdate);
