import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import {
  listAds, setFilterQuery, goToPage, removeAd
} from '../redux/ads';
import AdsList from './AdsList';

const mapStateToProps = (state) => ({
  ads: state.ads.ads,
  isLoadingList: state.ads.isLoadingList,
  pagination: state.ads.pagination,
});

const mapDispatchToProps = (dispatch) => ({
  goToPage: (page) => dispatch(goToPage(page)),
  onReviewAds: (ad) => {
    dispatch(push(`/ads/review?id=${ad.id}`));
  },
  onComponentMounted: (params) => {
    dispatch(setFilterQuery(params));
    dispatch(listAds());
  },
  onRemoveAds: (ad) => {
    dispatch(removeAd(ad.id, () => {
      Alert.success(`${ad.name} đã được gỡ bỏ thành công`);
    }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdsList);
