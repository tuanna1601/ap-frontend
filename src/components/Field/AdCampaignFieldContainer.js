import { connect } from 'react-redux';
import { chain, get } from 'lodash';

import { listAdCampaigns } from '@/store/common';

import AdCampaignField from './AdCampaignField';

const mapDispatchToProps = (dispatch, { account, business }) => ({
  listOptions: async (accountId = account, businessId = business) =>
    dispatch(listAdCampaigns(accountId, businessId)),
  transformData: (data, callback) => {
    const options = chain(get(data, 'payload.data', []))
      .orderBy(['name'], ['asc'])
      .map(campaign => ({
        value: campaign.id,
        label: `${campaign.name}`,
        campaign
      }))
      .value();
    callback(options);
  },
});

export default connect(null, mapDispatchToProps)(AdCampaignField);
