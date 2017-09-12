import { connect } from 'react-redux';
import * as _ from 'lodash';
import { listAdAccount } from '@/store/common';
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

const mapDispatchToProps = (dispatch) => ({
  listOptions: () => dispatch(listAdAccount()),
  resetOptions: () => dispatch(listAdAccount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdAccountField);
