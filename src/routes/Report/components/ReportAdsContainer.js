import { connect } from 'react-redux';

import ReportAds from './ReportAds';
import {
  goToPage,
  reloadList,
  loadReport,
  setCurrentPage,
  setFilterQuery
} from '../redux/report';

const mapStateToProps = state => ({
  isLoading: state.report.isLoading,
  ads: state.report.reports,
  pagination: state.report.pagination,
  filterQuery: state.report.filterQuery,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onComponentMounted: () => dispatch(loadReport(ownProps.type)),
  goToPage: (page) => dispatch(goToPage(page, ownProps.type)),
  resetReports: () => {
    dispatch(setCurrentPage(1));
    dispatch(setFilterQuery({}));
    dispatch(reloadList([], 0));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportAds);
