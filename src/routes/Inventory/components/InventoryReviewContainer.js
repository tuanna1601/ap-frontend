import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import Alert from 'react-s-alert';
import * as _ from 'lodash';
import InventoryReviewForm from './InventoryReviewForm';
import {
  reviewInventory, getInventory
} from '../redux/inventory';

const mapStateToProps = (state, ownProps) => ({
  form: 'inventory-review',
  isLoading: state.inventory.isLoadingCreate,
  initialValues: state.inventory.inventories[ownProps.id] ?
   state.inventory.inventories[ownProps.id] : {},
  enableReinitialize: true,
  department: state.inventory.inventories[ownProps.id] ?
   state.inventory.inventories[ownProps.id].department : '',
  criteria: state.inventory.criteria,
});

const mapDispatchToProps = (dispatch) => ({
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
