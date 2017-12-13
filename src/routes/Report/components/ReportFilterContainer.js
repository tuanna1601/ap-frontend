import { connect } from 'react-redux';

import ReportFilter from './ReportFilter';
import { loadReport, setCurrentPage, setFilterQuery } from '../redux/report';

const mapStateToProps = () => ({
  form: 'report-filter',
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (values) => {
    dispatch(setCurrentPage(1));
    dispatch(setFilterQuery(values));
    dispatch(loadReport(ownProps.type));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportFilter);
