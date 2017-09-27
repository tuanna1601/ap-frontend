import { connect } from 'react-redux';
import * as _ from 'lodash';
import { listAdAccounts, resetAdAccounts } from '@/store/common';
import AdAccountField from './AdAccountField';

const mapStateToProps = (state) => ({
  options: _.chain(state.common.adAccounts)
    .orderBy(['name'], ['asc'])
    .map((account) => ({
      value: account.accountId,
      label: `${account.name}`,
      account
    }))
    .value(),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  listOptions: (business = ownProps.business) => dispatch(listAdAccounts(business)),
  resetOptions: () => dispatch(resetAdAccounts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdAccountField);
