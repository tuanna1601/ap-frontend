import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { formValueSelector } from 'redux-form';
import Alert from 'react-s-alert';
import * as _ from 'lodash';
import InventoryReviewForm from './InventoryReviewForm';
import {
  reviewInventory, getInventory
} from '../redux/inventory';

const mapStateToProps = (state, ownProps) => ({
  form: 'inventory-review',
  isLoadingCreate: state.inventory.isLoadingCreate,
  isLoadingList: state.inventory.isLoadingList,
  initialValues: (() => {
    const inventory = state.inventory.inventories[ownProps.id] ?
      state.inventory.inventories[ownProps.id] : {};
    if (inventory.text &&
      inventory.headlines &&
      inventory.medias &&
      inventory.descriptions) {
      inventory.text.reviews = undefined;
      _.each(inventory.headlines, (headline, index) => {
        inventory.headlines[index].reviews = undefined;
      });
      _.each(inventory.medias, (media, index) => {
        inventory.medias[index].reviews = undefined;
      });
      _.each(inventory.descriptions, (description, index) => {
        inventory.descriptions[index].reviews = undefined;
      });
    }
    return inventory;
  })(),
  enableReinitialize: true,
  department: state.inventory.inventories[ownProps.id] ?
    state.inventory.inventories[ownProps.id].department : '',
  criteria: state.inventory.criteria,
});

const mapDispatchToProps = (dispatch) => ({
  navigateToList: () => {
    dispatch(push('/inventory/reviewer?status=assigned'));
  },
  onComponentMounted: (id) => {
    dispatch(getInventory(id));
  },
  onFieldArrayRemoved: (fields, index) => {
    fields.remove(index);
  },
  onSubmit: (values) => dispatch(reviewInventory(values, (data) => {
    Alert.success(`${data.name} đã được duyệt thành công`);
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryReviewForm);
