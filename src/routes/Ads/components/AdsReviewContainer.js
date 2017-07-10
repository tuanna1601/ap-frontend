import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Parser } from 'html-to-react';

import Alert from 'react-s-alert';
import AdsReviewForm from './AdsReviewForm';
import {
  updateAd, getAd, getAdsPreview, reloadAdsPreview
} from '../redux/ads';

const htmlParser = new Parser();

const mapStateToProps = (state, ownProps) => ({
  form: 'ads-review',
  isLoadingCreate: state.ads.isLoadingCreate,
  isLoadingList: state.ads.isLoadingList,
  initialValues: state.ads.ads[ownProps.id] ?
    state.ads.ads[ownProps.id] : {},
  enableReinitialize: true,
  preview: htmlParser.parse(state.ads.preview)
});

const mapDispatchToProps = (dispatch) => ({
  navigateToList: () => {
    dispatch(push('/ads'));
  },
  onComponentMounted: (id) => {
    dispatch(getAd(id));
    dispatch(getAdsPreview(id));
  },
  onComponentUnmount: () => {
    dispatch(reloadAdsPreview('<span></span>'));
  },
  onSubmit: (values) => dispatch(updateAd(values, (data) => {
    Alert.success(`${data.name} đã được hậu kiểm thành công`);
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdsReviewForm);
