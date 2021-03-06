import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';
import Alert from 'react-s-alert';
import { cloneDeep, each, map, find } from 'lodash';
import { getCurrentStepCriteria, getCurrentStepDepartment } from '@/helpers/helper';
import InventoryReviewForm from './InventoryReviewForm';
import {
  reviewInventory, getInventory, reloadList,
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
  department: getCurrentStepDepartment(state.inventory.inventories[ownProps.id]),
  criteria: getCurrentStepCriteria(state.inventory.inventories[ownProps.id]),
  enableReinitialize: true,
});

const mapDispatchToProps = (dispatch) => ({
  navigateToList: () => {
    dispatch(push('/inventory/reviewer?status=assigned'));
  },
  resetInventories: () => dispatch(reloadList([], 0)),
  onComponentMounted: (id) => {
    dispatch(getInventory(id));
  },
  onFieldArrayRemoved: (fields, index) => {
    fields.remove(index);
  },
  onSubmit: (values) => dispatch(reviewInventory(values, (data) => {
    Alert.success(`${data.name} đã được duyệt thành công`);
    dispatch(reset('inventory-review'));
    dispatch(push('/inventory/reviewer?status=assigned'));
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryReviewForm);
