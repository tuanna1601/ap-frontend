import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import { showConfirm } from '@/store/modal';
import { listBusiness, deleteBusiness } from '../redux/ads';
import BusinessList from './BusinessList';

const mapStateToProps = (state) => ({
  businesses: state.ads.businesses,
  isLoading: state.ads.isLoadingList
});

const mapDispatchToProps = (dispatch) => ({
  onComponentMounted: () => {
    dispatch(listBusiness());
  },
  onDelete: (business) => {
    dispatch(showConfirm(`Bạn có chắc chắc muốn xoá Business ${business.name}?`,
      () => dispatch(deleteBusiness(business.id, (data) => {
        Alert.success(`${data.name} đã được xoá thành công`);
      }))
    ));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessList);
