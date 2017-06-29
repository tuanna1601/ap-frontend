import { connect } from 'react-redux';
import * as _ from 'lodash';
import { listAdCampaign } from '@/store/common';
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
  listOptions: () => dispatch(listAdCampaign(ownProps.account)),
  resetOptions: () => dispatch(listAdCampaign(ownProps.account)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdCampaignField);
