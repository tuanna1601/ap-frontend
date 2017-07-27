import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Alert from 'react-s-alert';
import { cloneDeep, each, map, find } from 'lodash';
import InventoryReviewForm from './InventoryReviewForm';
import {
  reviewInventory, getInventory
} from '../redux/inventory';

const mapReviewedItems = (inventory) => {
  const inv = cloneDeep(inventory);
  if (inv && inv.latestReview) {
    const review = inv.latestReview;
    // if latest reviewed is the current version, get the current inventory
    const latestReviewedVer = inv.versions[review.version] || inv;
    const keys = ['headlines', 'descriptions', 'medias'];
    each(keys, key => {
      inv[key] = map(inv[key], item => {
        const reviewed = find(latestReviewedVer[key], tmp => tmp._id === item._id);
        if (reviewed) {
          return {
            ...item,
            reviewed: true
          };
        }
        return item;
      });
    });
  }
  return inv;
};

const mapStateToProps = (state, ownProps) => ({
  form: 'inventory-review',
  isLoadingCreate: state.inventory.isLoadingCreate,
  isLoadingList: state.inventory.isLoadingList,
  initialValues: mapReviewedItems(state.inventory.inventories[ownProps.id]),
  enableReinitialize: true,
  department: state.inventory.inventories[ownProps.id] ?
    state.inventory.inventories[ownProps.id].department.id : '',
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
