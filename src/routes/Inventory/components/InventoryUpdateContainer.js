import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import Alert from 'react-s-alert';
import * as _ from 'lodash';
import InventoryUpdateForm from './InventoryUpdateForm';
import {
  updateInventory, getInventory
} from '../redux/inventory';

const mapStateToProps = (state, ownProps) => ({
  form: 'inventory-update',
  isLoadingCreate: state.inventory.isLoadingCreate,
  isLoadingList: state.inventory.isLoadingList,
  newMedias: formValueSelector('inventory-update')(state, 'newMedias'),
  headlines: formValueSelector('inventory-update')(state, 'headlines'),
  descriptions: formValueSelector('inventory-update')(state, 'descriptions'),
  text: formValueSelector('inventory-update')(state, 'text'),
  enableReinitialize: true,
  initialValues: state.inventory.inventories[ownProps.id] ?
    state.inventory.inventories[ownProps.id] : {},
  department: state.inventory.inventories[ownProps.id] ?
    state.inventory.inventories[ownProps.id].department : '',
});

const mapDispatchToProps = (dispatch) => ({
  onComponentMounted: (id) => {
    dispatch(getInventory(id));
  },
  onFieldArrayRemoved: (fields, index) => {
    fields.remove(index);
  },
  onSubmit: (values) => dispatch(updateInventory(values, (data) => {
    Alert.success(`${data.name} đã được sửa thành công`);
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryUpdateForm);
