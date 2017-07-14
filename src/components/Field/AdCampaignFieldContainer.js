import { connect } from 'react-redux';
import * as _ from 'lodash';
import { listAdCampaign, resetAdCampaigns } from '@/store/common';
import AdCampaignField from './AdCampaignField';

const mapStateToProps = (state) => ({
  options: _.chain(state.common.adCampaigns)
    .orderBy(['name'], ['asc'])
    .map((campaign) => ({
      value: campaign.id,
      label: `${campaign.name}`,
      campaign
    }))
    .value(),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  listOptions: (account = ownProps.account) => dispatch(listAdCampaign(account)),
  resetOptions: () => dispatch(resetAdCampaigns()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdCampaignField);
