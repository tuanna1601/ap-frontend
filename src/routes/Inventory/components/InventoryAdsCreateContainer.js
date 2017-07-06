import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { change, reset, formValueSelector, getFormValues } from 'redux-form';
import * as _ from 'lodash';
import { Parser } from 'html-to-react';

import InventoryAdsCreateForm from './InventoryAdsCreateForm';

import { getInventory, loadFacebookAdsPreview, createFacebookAds } from '../redux/inventory';

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
  initialValues: {
    inventory: ownProps.inventoryId,
    inventoryObj: state.inventory.inventories[ownProps.inventoryId],
    message: state.inventory.inventories[ownProps.inventoryId] ?
      state.inventory.inventories[ownProps.inventoryId].text.text : ''
  },
  formVal: getFormValues('fb-ads-create')(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateToList: () => {
    dispatch(push('/inventory'));
  },
  onComponentMounted: () => {
    if (ownProps.inventoryId) {
      dispatch(getInventory(ownProps.inventoryId));
    }
  },
  onSubmit: (values) => {
    dispatch(createFacebookAds(values, () => {
      dispatch(reset('fb-ads-create'));
    }));
  },
  onPreviewAd: (props) => {
    const { dirty, valid, formVal } = props;
    if (dirty && valid &&
      formVal.adaccount && formVal.type === 'image') {
      dispatch(loadFacebookAdsPreview(formVal));
    }
  },
  resetMedia: () => {
    dispatch(change, 'fb-ads-create', 'selectedMedia', []);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryAdsCreateForm);
