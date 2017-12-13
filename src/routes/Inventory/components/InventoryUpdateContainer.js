import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { formValueSelector, SubmissionError } from 'redux-form';
import Alert from 'react-s-alert';
import { chain, each, groupBy } from 'lodash';

import { getCurrentStepCriteria, getCurrentStepDepartment } from '@/helpers/helper';
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
  initialValues: {
    ...state.inventory.inventories[ownProps.id],
    department: state.inventory.inventories[ownProps.id] ?
      state.inventory.inventories[ownProps.id].department.id : ''
  },
  criteria: getCurrentStepCriteria(state.inventory.inventories[ownProps.id]),
  department: getCurrentStepDepartment(state.inventory.inventories[ownProps.id]),
});

const mapDispatchToProps = (dispatch) => ({
  onComponentMounted: (id) => {
    dispatch(getInventory(id));
  },
  navigateToList: () => {
    dispatch(push('/inventory'));
  },
  onFieldArrayRemoved: (fields, index) => {
    fields.remove(index);
  },
  onSubmit: async (values) => {
    try {
      const data = await dispatch(updateInventory(values));
      if (data && data.payload && data.payload.name) {
        Alert.success(`${data.payload.name} đã được sửa thành công`);
        dispatch(push('/inventory'));
      }
      if (data && data.payload && typeof data.payload === 'string') {
        Alert.warning(data.payload);
      }
    } catch (err) {
      if (err && err.error &&
        err.error.response &&
        err.error.response.data &&
        err.error.response.data.dta) {
        const errData = err.error.response.data.data;
        const error = {};
        const groupData = groupBy(errData, 'name');

        each(groupData, (group, key) => {
          if (key === 'text') {
            const taboos = chain(group)
              .map((item) => item.text)
              .uniq()
              .value()
              .join(', ');
            error.text = {
              text: `Không được chứa các từ "${taboos}"`,
            };
          } else {
            const groupByIndex = groupBy(group, 'index');
            each(groupByIndex, (items, index) => {
              const taboos = chain(items)
                .map(item => item.text)
                .uniq()
                .value()
                .join(', ');
              if (!error[key]) {
                error[key] = [];
              }
              error[key][index] = {
                text: `Không được chứa các từ "${taboos}"`,
              };
            });
          }
          return group;
        });
        throw new SubmissionError(error);
      } else {
        Alert.danger(JSON.stringify(err));
      }
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryUpdateForm);
