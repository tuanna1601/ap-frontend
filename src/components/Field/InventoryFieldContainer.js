import { connect } from 'react-redux';
import * as _ from 'lodash';
import { listInventories } from '@/routes/Inventory/redux/inventory';
import InventoryField from './InventoryField';

const mapStateToProps = (state) => ({
  options: _.chain(state.inventory.inventories)
    .orderBy(['name'], ['asc'])
    .map((inventory) => ({
      value: inventory.id,
      label: `${inventory.name}}`,
      inventory
    }))
    .value(),
});

const mapDispatchToProps = (dispatch) => ({
  listOptions: (keyword) => dispatch(listInventories({ name: keyword })),
  resetOptions: () => dispatch(listInventories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryField);
