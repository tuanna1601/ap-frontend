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
  isLoading: state.inventory.isLoadingCreate,
  initialValues: state.inventory.inventories[ownProps.id],
  newMedias: formValueSelector('inventory-update')(state, 'newMedias'),
  medias: formValueSelector('inventory-update')(state, 'medias') ||
    state.inventory.inventories[ownProps.id].medias ? state.inventory.inventories[ownProps.id].medias : [],
  headlines: formValueSelector('inventory-update')(state, 'headlines') ||
    state.inventory.inventories[ownProps.id].headlines ? state.inventory.inventories[ownProps.id].headlines : [],
  descriptions: formValueSelector('inventory-update')(state, 'descriptions') ||
    state.inventory.inventories[ownProps.id].descriptions ? state.inventory.inventories[ownProps.id].descriptions : [],
  enableReinitialize: true
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
