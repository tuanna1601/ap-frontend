import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import * as _ from 'lodash';
import { Parser } from 'html-to-react';

import InventoryAdsPreviewForm from './InventoryAdsPreviewForm';

import { loadFacebookAdsPreview } from '../redux/inventory';

const htmlParser = new Parser();

const mapStateToProps = (state) => ({
  isLoading: state.inventory.isLoadingUpdate,
  form: 'fb-ads-preview',
  adsPreview: htmlParser.parse(state.inventory.adsPreview),
  inventory: state.common.inventories[formValueSelector('fb-ads-preview')(state, 'inventory')],
  initialValues: {
    ad_account: 159499896,
    access_token: 'EAACSK1lmeoIBAI997WOgmtZArEySzBiO3JQTUbryU7jCOzhZAHxpK9kxuwjV4P9ddagyqYmKo2gbcdo5B6fE8gaNslOEgOge9mjEKarpLPOZAMZAiZADgEDLS3PLgaN1FnCSWxsO3i1lBLCMQfk1JLZA2SYd6H9ZCYVqNmGf2oO9kYeblk3GvDC',
    creative: {
      object_id: 940491929413698
    },
  }
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (values) => {
    const tmp = _.omit(values, ['ad_account', 'inventory']);
    dispatch(loadFacebookAdsPreview(values.ad_account, tmp));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryAdsPreviewForm);
