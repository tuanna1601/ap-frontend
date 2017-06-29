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
  }
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
    dispatch(createFacebookAds(values, (data) => {
      console.log(data);
      dispatch(reset('fb-ads-create'));
    }));
  },
  onFormValuesChange: () => {
    const values = getFormValues('fb-ads-create');
    // const tmp = _.omit(values, ['adaccount', 'inventory']);
    // console.log(tmp);
    // dispatch(loadFacebookAdsPreview(values.adaccount, tmp));
  },
  resetMedia: () => {
    dispatch(change, 'fb-ads-create', 'selectedMedia', []);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryAdsCreateForm);
