import { connect } from 'react-redux';
import { chain, get } from 'lodash';

import { listAdSets } from '@/store/common';

import AdSetField from './AdSetField';

const mapDispatchToProps = (dispatch, { business, campaign }) => ({
  listOptions: async (campaignId = campaign, businessId = business) =>
    dispatch(listAdSets(campaignId, businessId)),
  transformData: (data, callback) => {
    const options = chain(get(data, 'payload.data', []))
      .orderBy(['name'], ['asc'])
      .map(set => ({
        value: set.id,
        label: `${set.name}`,
        set,
      }))
      .value();
    callback(options);
  },
});

export default connect(null, mapDispatchToProps)(AdSetField);
