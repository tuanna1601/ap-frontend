import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { change, reset, formValueSelector, getFormValues } from 'redux-form';
import { Parser } from 'html-to-react';
import Alert from 'react-s-alert';

import InventoryAdsCreateForm from './InventoryAdsCreateForm';

import {
  getLatestAcceptedInventory, loadFacebookAdsPreview,
  createFacebookAds, resetFacebookAdsPreview
} from '../redux/inventory';

const htmlParser = new Parser();

const mapStateToProps = (state, ownProps) => ({
  isLoadingPreview: state.inventory.isLoadingUpdate,
  isLoadingCreate: state.inventory.isLoadingCreate,
  isLoadingList: state.inventory.isLoadingList,
  form: 'fb-ads-create',
  adsPreview: htmlParser.parse(state.inventory.adsPreview),
  inventory: state.inventory.inventories[ownProps.inventoryId],
  adaccount: formValueSelector('fb-ads-create')(state, 'adaccount'),
  adcampaign: formValueSelector('fb-ads-create')(state, 'adcampaign'),
  media: formValueSelector('fb-ads-create')(state, 'media'),
  type: formValueSelector('fb-ads-create')(state, 'type'),
  callToAction: formValueSelector('fb-ads-create')(state, 'callToAction'),
  initialValues: {
    inventory: ownProps.inventoryId,
    inventoryObj: state.inventory.inventories[ownProps.inventoryId],
  },
  formVal: getFormValues('fb-ads-create')(state),
  enableReinitialize: true
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateToList: () => {
    dispatch(push('/inventory'));
  },
  onComponentMounted: () => {
    if (ownProps.inventoryId) {
      dispatch(getLatestAcceptedInventory(ownProps.inventoryId, (data) => {
        if (!data) {
          dispatch(push('/inventory'));
        }
      }));
    }
  },
  resetAdsPreview: () => {
    dispatch(resetFacebookAdsPreview());
  },
  onSubmit: (values) => {
    dispatch(createFacebookAds(values, () => {
      Alert.success('Tạo Ads thành công!');
      dispatch(reset('fb-ads-create'));
    }));
  },
  onPreviewAd: (props) => {
    const { dirty, valid, formVal, submit } = props;
    if (!valid) {
      submit();
    }
    if (dirty && valid &&
      formVal.adaccount && formVal.type === 'image') {
      dispatch(loadFacebookAdsPreview(formVal));
    }
  },
  resetMedia: () => {
    dispatch(change('fb-ads-create', 'selectedMedia', []));
  },
  resetCampaign: () => {
    dispatch(change('fb-ads-create', 'adcampaign', ''));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryAdsCreateForm);
