import { connect } from 'react-redux';
import { Parser } from 'html-to-react';

import AdsResolveReportForm from './AdsResolveReportForm';

import { getAdsPreview, reloadAdsPreview } from '../redux/ads';

const htmlParser = new Parser();

const mapStateToProps = (state) => ({
  preview: htmlParser.parse(state.ads.preview),
});

const mapDispatchToProps = (dispatch) => ({
  getAdsPreview: (values) => {
    dispatch(getAdsPreview(values.ad.id));
  },
  onComponentUnmount: () => {
    dispatch(reloadAdsPreview('<span></span>'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdsResolveReportForm);
