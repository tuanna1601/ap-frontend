import { connect } from 'react-redux';
import { listAds } from '@/store/common';
import AdsSearchField from './AdsSearchField';

const mapStateToProps = (state) => ({
  ads: state.common.ads,
});

const mapDispatchToProps = (dispatch) => ({
  listOptions: (keyword) => {
    dispatch(listAds(keyword));
  },
  resetOptions: () => dispatch(listAds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdsSearchField);
