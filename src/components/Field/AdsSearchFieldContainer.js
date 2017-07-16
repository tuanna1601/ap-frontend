import { connect } from 'react-redux';
import { change } from 'redux-form';
import { listAds } from '@/store/common';
import AdsSearchField from './AdsSearchField';

const mapStateToProps = (state) => ({
  ads: state.common.ads,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  listOptions: (keyword) => {
    dispatch(listAds(keyword, false));
  },
  resetOptions: () => dispatch(listAds()),
  onSelectAll: (event, ads) => {
    if (ads && ads.length) {
      if (event.target.checked) {
        ads.forEach((ad, index) => {
          dispatch(change(ownProps.form, `selected[${index}]`, true));
        });
      } else {
        ads.forEach((ad, index) => {
          dispatch(change(ownProps.form, `selected[${index}]`, false));
        });
      }
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdsSearchField);
