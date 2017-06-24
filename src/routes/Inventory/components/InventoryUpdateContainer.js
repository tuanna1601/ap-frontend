import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import Alert from 'react-s-alert';
import * as _ from 'lodash';
import InventoryUpdateForm from './InventoryUpdateForm';
import {
  updateInventory, getInventory
} from '../redux/inventory';

function formatData(inventory) {
  return _.reduce(inventory, (values, value, key) => {
    if (value instanceof Array) {
      const formatted = _.map(value, val => ({
        value: val
      }));
      return Object.assign({}, values, {
        [key]: formatted
      });
    }
    return Object.assign({}, values, {
      [key]: value
    });
  }, {});
}

const mapStateToProps = (state, ownProps) => ({
  form: 'inventory-update',
  isLoading: state.inventory.isLoadingCreate,
  initialValues: formatData(state.inventory.inventories[ownProps.id]),
  newMedias: formValueSelector('inventory-update')(state, 'newMedias'),
  medias: formValueSelector('inventory-update')(state, 'medias') ?
    formValueSelector('inventory-update')(state, 'medias') :
    formatData(state.inventory.inventories[ownProps.id]).medias,
  headlines: formValueSelector('inventory-update')(state, 'headlines') ?
    formValueSelector('inventory-update')(state, 'headlines') :
    formatData(state.inventory.inventories[ownProps.id]).headlines,
  descriptions: formValueSelector('inventory-update')(state, 'descriptions') ?
    formValueSelector('inventory-update')(state, 'descriptions') :
    formatData(state.inventory.inventories[ownProps.id]).descriptions,
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
