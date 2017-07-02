import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { listAdsReports } from '../redux/ads';

import AdsReportList from './AdsReportList';

const mapStateToProps = (state) => ({
  reports: state.ads.reports,
  isLoadingList: state.ads.isLoadingList,
});

const mapDispatchToProps = (dispatch) => ({
  onReviewReport: (report) => {
    dispatch(push(`/ads/review-report?id=${report.id}`));
  },
  onComponentMounted: (params) => {
    dispatch(listAdsReports(params));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(AdsReportList);
