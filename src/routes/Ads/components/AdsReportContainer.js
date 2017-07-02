import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import AdsReportForm from './AdsReportForm';

import { reportAds } from '../redux/ads';

const mapStateToProps = (state) => ({
  form: 'ads-report',
  isLoading: state.ads.isLoadingCreate
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (values) => {
    dispatch(reportAds(values, () => {
      Alert.success('Đã report Ads thành công');
    }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdsReportForm);
