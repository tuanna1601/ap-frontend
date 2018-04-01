import { connect } from 'react-redux';
import { get, chain } from 'lodash';

import { listAdAccounts } from '@/store/common';

import AdAccountField from './AdAccountField';

const mapDispatchToProps = (dispatch, ownProps) => ({
  listOptions: async (business = ownProps.business) => dispatch(listAdAccounts(business)),
  transformData: (data, callback) => {
    const options = chain(get(data, 'payload.rows', []))
      .orderBy(['name'], ['asc'])
      .map(account => ({
        value: account.accountId,
        label: `${account.name}`,
        account,
      }))
      .value();
    callback(options);
  },
});

export default connect(null, mapDispatchToProps)(AdAccountField);
