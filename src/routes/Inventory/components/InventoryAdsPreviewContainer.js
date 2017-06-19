import { connect } from 'react-redux';
import InventoryAdsPreviewForm from './InventoryAdsPreviewForm';

import { loadFacebookAdsPreview } from '../redux/inventory';

const mapStateToProps = (state) => ({
  isLoading: state.inventory.isLoadingUpdate,
  form: 'fb-ads-preview'
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (values) => {
    dispatch(loadFacebookAdsPreview(values, (data) => {
      console.log(data);
    }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryAdsPreviewForm);
