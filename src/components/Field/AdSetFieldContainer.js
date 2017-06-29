import { connect } from 'react-redux';
import * as _ from 'lodash';
import { listAdSet } from '@/store/common';
import AdSetField from './AdSetField';

const mapStateToProps = (state) => ({
  options: _.chain(state.common.adSets)
    .orderBy(['name'], ['asc'])
    .map((set) => ({
      value: set.id,
      label: `${set.name}`,
      set
    }))
    .value(),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  listOptions: () => dispatch(listAdSet(ownProps.account, ownProps.campaign)),
  resetOptions: () => dispatch(listAdSet(ownProps.account, ownProps.campaign)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdSetField);
