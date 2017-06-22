import { connect } from 'react-redux';
import * as _ from 'lodash';
import { listInventories } from '@/store/common';
import InventoryField from './InventoryField';

const mapStateToProps = (state) => ({
  options: _.chain(state.common.inventories)
    .orderBy(['name'], ['asc'])
    .map((inventory) => ({
      value: inventory.id,
      label: `${inventory.name}`,
      data: inventory
    }))
    .value(),
});

const mapDispatchToProps = (dispatch) => ({
  listOptions: () => dispatch(listInventories()),
  resetOptions: () => dispatch(listInventories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryField);
