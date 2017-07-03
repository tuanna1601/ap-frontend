import { connect } from 'react-redux';
import * as _ from 'lodash';
import { listAds } from '@/store/common';
import AdsField from './AdsField';

const mapStateToProps = (state) => ({
  options: _.chain(state.common.ads)
    .orderBy(['name'], ['asc'])
    .map((ad) => ({
      value: ad.id,
      label: `${ad.name}`,
      ad
    }))
    .value(),
});

const mapDispatchToProps = (dispatch) => ({
  listOptions: (keyword) => dispatch(listAds(keyword)),
  resetOptions: () => dispatch(listAds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdsField);
