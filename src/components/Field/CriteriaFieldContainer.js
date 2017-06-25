import { connect } from 'react-redux';
import * as _ from 'lodash';
import { listCriteria } from '@/store/common';
import InventoryField from './InventoryField';

const mapStateToProps = (state) => ({
  options: _.chain(state.common.criteria)
    .orderBy(['name'], ['asc'])
    .map((criteria) => ({
      value: criteria.id,
      label: `${criteria.name}`,
      data: criteria
    }))
    .value(),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  listOptions: () => dispatch(listCriteria(ownProps.department)),
  resetOptions: () => dispatch(listCriteria(ownProps.department)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryField);
