import { connect } from 'react-redux';
import * as _ from 'lodash';
import { listAdSets, resetAdSets } from '@/store/common';
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
  listOptions: (campaign = ownProps.campaign) =>
    dispatch(listAdSets(campaign)),
  resetOptions: () => dispatch(resetAdSets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdSetField);
